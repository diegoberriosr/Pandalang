from django.db import models

from django.contrib.auth.base_user import AbstractBaseUser, BaseUserManager
from django.contrib.auth.models import PermissionsMixin

from django.core.validators import MinValueValidator, MaxValueValidator

# Create your models here.
class UserManager(BaseUserManager):

    def create_user(self, email, username, password, **other_args):
        """Create and return a regular user with email, username, password, and other possible arguments"""
        if not email:
            raise ValueError('An email direction is required.')
        if not password:
            raise ValueError('A password is required.')
        if not username:
            raise ValueError('An username is required.')
        
        email = self.normalize_email(email)

        user = self.model(email=email, username=username, **other_args)
        user.set_password(password)
        user.save()

        return user
    

    def create_superuser(self, email, username, password, **other_args):
        """Create and return a superuser with email, username and password"""
        if not email:
            raise ValueError('An email direction is required.')
        if not password:
            raise ValueError('A password is required.')
        if not username:
            raise ValueError('An username is required.')
        
        user = self.create_user(email, username, password, **other_args)
        user.is_superuser = True   
        user.is_staff = True
        user.save()  
        
        return user
    
class User(AbstractBaseUser, PermissionsMixin):
    """ A model representing an user's account."""

    id = models.AutoField(primary_key=True)
    is_staff = models.BooleanField(default=False)
    email = models.EmailField(max_length=50, unique=True)
    username = models.CharField(max_length=15, unique=True)
    date_joined = models.DateField(auto_now_add=True)
    pfp = models.TextField(null=True) # User profile pic.
    hearts = models.SmallIntegerField(validators=[MinValueValidator(0), MaxValueValidator(5)], default=5) # Represents user remaining attempts (Between 0 and 5).
    xp = models.PositiveIntegerField(validators=[MinValueValidator(0)], default=0) # Accumulated user xp (must be bigger than 0).
    available_xp = models.PositiveIntegerField(validators=[MinValueValidator(0)], default=0) # Available spendable xp (must be bigger than 0).
    on_streak = models.BooleanField(default=False) # Represent's an user streak in completing lessons daily.
    current_streak = models.PositiveIntegerField(null=True) # Current day streak (if applicable).
    largest_streak = models.PositiveIntegerField(null=True) # Largest historical streak (if applicable).
    is_premium = models.BooleanField(default=False)  # Indicates whether user has a paid membership or not.
    active_course = models.ForeignKey('Course', null=True, on_delete=models.PROTECT, db_index=True, related_name='active_users') # Represents the current active course (can be null).
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']
    objects = UserManager()


    def __str__(self):
        return f'{self.id}.{self.username} ({self.email})'


    def update_hearts(self, amount : int) -> None:
        """Update the number of remaining hearts/attempts
        
        Increases increments the `hearts` attribute from an `User` instance
        by an specified `amount` which can be positive or negative. The object
        is then saved to the database.

        Args:
            amount (int) :The amount to increment the `hearts` attribute by.
        
        Returns:
            None
        """

        self.hearts += amount
        self.save()


    def update_xp(self, amount : int) -> None:
        """Update xp and available xp

        Increases the attributes `xp` and `available_xp` from an `User` instance by a certain  `amount`.
        `Amount` must be an integer value bigger than 0.

        Args:
            amount (int) : The amount of total xp to be increased.
        
        Returns:
            None
        
        Raises:
            ValueError: If the amount is not positive.
        """
        if amount < 0:
            raise ValueError('Amount must be positive.')
        self.xp += amount
        self.available_xp += amount
        self.save()


    def consume_available_xp(self, amount : int) -> None:     
        """Decrease the number of available/spendable xp

        Decreases the `available_xp` attribute of an `User` instance by an specified `amount`,
        which must be an integer value bigger than 0.

        Args:
            amount (int) : The amount of available xp to be consumed.
            
        Returns:
            None
        
        Raises:
            ValueError : If the amount is not positive or the amount is bigger than the user's available spendable xp.
        """   
        if amount > self.available_xp:
            raise ValueError(f'{self.username} has not enough available xp.')
        if amount < 0:
            raise ValueError('Amount to spend must be positive.')
        
        self.available_xp -= amount
        self.save()


    def update_membership_status(self) -> None:
        """Alters the premium mebership status

        Updates the `is_premium` attribute of an `User` instance by negating the current its current value.

        Returns:
            None
        """
        self.is_premium = not self.is_premium
        self.save()


    def serialize(self, request, current_lesson):
    
        return {
            'hearts' : self.hearts,
            'xp' : self.xp,
            'available_xp' : self.available_xp,
            'active_course' : self.active_course.serialize(request.user, current_lesson, request) if self.active_course else None,
            'enrolled_courses' : [course.profile_serialize(request) for course in self.enrolled_courses.all()],
            'is_premium' : self.is_premium
        }


    def leaderboard_serialize(self, accum_xp):
        return {
            'id' : self.id,
            'username' : self.username,
            'xp' : accum_xp if accum_xp else self.xp
        }


class Flag(models.Model):
    """Represents a flag associated with a language"""
    id = models.AutoField(primary_key=True)
    country = models.CharField(max_length=56) # Name of the country/entity the flag is associated to
    flag = models.ImageField(upload_to='flags/')

    def __str__(self):
        return f'{self.id}. {self.country}'


class Language(models.Model):
    """Represents an available language in the app"""

    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=25, unique=True) # Name of the language
    flag = models.ForeignKey(Flag, on_delete=models.CASCADE, related_name='associated_languages')

    def __str__(self):
        return f'{self.id}. {self.name}'    


class Course(models.Model):
    """Represents an app's course"""

    id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=25, null=True)
    description = models.CharField(max_length=100, null=True, blank=True) # A small description of the course (not required).
    target_language = models.ForeignKey(Language, on_delete=models.CASCADE, related_name='target_language_in') # The language teached in the course.
    origin_language = models.ForeignKey(Language, on_delete=models.CASCADE, related_name='origin_language_in') # The language through which the course is taught.
    enrolled_users = models.ManyToManyField(User, related_name='enrolled_courses', null=True, blank=True, db_index=True) # Users associated/enrolled in an specific course.

    def __str__(self):
        return f'{self.id}. {self.target_language} - {self.origin_language}'
    

    def serialize(self, user, current_lesson, request):
        return {
            'id' : self.id,
            'title' : self.title,
            'flag' : request.build_absolute_uri(self.target_language.flag.flag.url),
            'sections' : [section.serialize(user) for section in self.sections.all()],
            'current_lesson' : current_lesson
        }


    def card_serialize(self, request):
        return {
            'id' : self.id,
            'title' : self.title,
            'flag' : request.build_absolute_uri(self.target_language.flag.flag.url),
            'learners' : self.enrolled_users.count()
        }
    
    def profile_serialize(self, request):
        return {
            'id' : self.id,
            'title' : self.title,
            'flag' : request.build_absolute_uri(self.target_language.flag.flag.url)
        }

class Section(models.Model):
    """Represents a courses' section"""

    LEVELS = [ # Common European Framework of Reference levels for Languages
        ( 'A1', 'A1'), # Beginner
        ( 'A2', 'A2'), # Elementary
        ( 'B1', 'B1'), # Intermediate
        ( 'B2', 'B2'), # Upper Intermeadiate
        ( 'C1', 'C1'), # Advanced
        ( 'C2', 'C2')  # Proficient
    ]

    VARIANTS = [
        ('primary', 'primary'),
        ('secondary', 'secondary'),
        ('tertiary', 'tertiary'),
        ('yellow', 'yellow'),
        ('red', 'red'),
        ('indigo', 'indigo')
    ]

    id = models.AutoField(primary_key=True)
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='sections') # The course a section is associated to.
    description = models.CharField(max_length=35) # A brief description of a course's section.
    level = models.CharField(max_length=2, choices=LEVELS) # Represent's the difficulty of a section's vocabulary according to the CEFR.
    variant = models.CharField(max_length=10, default='primary', choices=VARIANTS)
    number_in_course = models.PositiveIntegerField(default=0) # A number representing the order/position of a section inside a course.
  
    def __str__(self):
        return f'{self.id}. {self.course.title} - {self.number_in_course}'
    
    
    def get_number_in_course(self):
        """Computes the number in course a lesson should have
        
        This function computes the number inside the course a section should have by adding 1 to the highest number a lesson
        of a course has.
        
        Returns:
            highest_number_in_course (int) : A non-zero number which represents the highest current position of a lesson inside a course.
        """
        highest_section = self.course.sections.order_by('-number_in_course').first() # Get the number in course of the most recent section of a given course.
        highest_number_in_course = 0

        if highest_section is not None: # If the course has more than one section, set the highest number to the one of the last section.
            highest_number_in_course = highest_section.number_in_course

        return highest_number_in_course + 1 # Return the current highest number in course.
    

    def save(self, *args, **kwargs):
        self.number_in_course = self.get_number_in_course()
        super().save(*args, **kwargs)


    def serialize(self, user):
        return {
            'id' : self.id,
            'description' : self.description,
            'variant' : self.variant,
            'number_in_course' : self.number_in_course,
            'lessons' : [lesson.serialize(user) for lesson in self.lessons.all()]
        }


class Lesson(models.Model):
    """Represents a lesson inside a course"""
    
    TYPES = [
        ('normal', 'normal'),
        ('final', 'final')
    ]

    id = models.AutoField(primary_key=True)
    section = models.ForeignKey(Section, on_delete=models.CASCADE, related_name='lessons') # Represents the section a lesson is associated to.
    type = models.CharField(max_length=6, default='normal', choices=TYPES) # Represents the lesson type
    number_in_course = models.PositiveIntegerField(default=0) # Indicates the position of a lesson inside a course.
    granted_xp = models.PositiveIntegerField(default=10) # Number of xp granted for completing a lesson with 100% accuracy(0 mistakes).
    cycles = models.PositiveIntegerField(default=3) # Indicated how many times a lesson must be completed to be mastered.
    completed_by = models.ManyToManyField(User, blank=True, null=True, related_name='completed_lessons')

    def __str__(self):
        return f'{self.id}. {self.section.course.title} - ({self.section.number_in_course}-{self.number_in_course})'


    def get_number_in_course(self):
        """Computes the number in course a lesson should have
        
        This function computes the number inside the course a lesson should have by adding 1 to the highest number a lesson
        of a course has.
        
        Returns:
            highest_number_in_course (int) : A non-zero number which represents the highest current position of a lesson inside a course.
        """
        highest_lesson = Lesson.objects.filter(section__course=self.section.course).order_by("-number_in_course").first()
        
        if highest_lesson:
            return highest_lesson.number_in_course + 1

        return 1
    

    def save(self, *args, **kwargs):
        self.number_in_course = self.get_number_in_course()
        super().save(*args, **kwargs)


    def serialize(self, user):
        return {
            'id' : self.id,
            "type" : self.type,
            'number_in_course' : self.number_in_course,
        }
    

class Session(models.Model):
    """Represents a study session where the user completed a lesson"""

    id = models.AutoField(primary_key=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='sessions', db_index=True) # The user associated with the session.
    lesson = models.ForeignKey(Lesson, on_delete=models.CASCADE, related_name='sessions', db_index=True) # The lesson associated with the session.
    earned_xp = models.PositiveIntegerField(default=10) # Amount of xp earned on this session.
    timestamp = models.DateTimeField(auto_now=True) # The timestamp associated with the session.

    def __str__(self):
        return f'{self.id}. {self.user.id}-{self.lesson.id} ({self.timestamp})'


class Word(models.Model):
    """Represents a word in a language"""
    id = models.AutoField(primary_key=True) 
    language = models.ForeignKey(Language, on_delete=models.CASCADE, related_name='words') # Specifies the language of the word.
    word = models.TextField() # The word itself.
    sound = models.TextField(null=True, blank=True) # A reference to the audio file containing its pronounciation.
    slug = models.TextField(null =True, blank=True) # A reference to an image depiction of the word.
    
    def __str__(self):
        return f'{self.id}. {self.word} ({self.language.name})'
    
    def serialize(self, translation):
        return {
            'id' : self.id,
            'word' : self.word,
            'translation' : translation,
            'sound' : self.sound,
            'slug' : self.slug
        }


class Translation(models.Model):
    """Represents a pair translation of words"""
    id = models.AutoField(primary_key=True)
    lesson = models.ManyToManyField(Lesson, related_name='translations') # Represents the lessons associated with the translation.
    target = models.ForeignKey(Word, on_delete=models.CASCADE, related_name='target_translations', db_index = True) # The meaning of the word in the target language
    origin = models.ForeignKey(Word, on_delete= models.CASCADE, related_name='origin_translations', db_index = True) # The meaning of the word in the origin language
    seen_by = models.ManyToManyField(User, related_name='seen_translations', blank=True, null=True, db_index=True) # Represents how many users have seen/encountered this word in a leson. 
    
    def __str__(self):
        return f'{self.id}.{self.target.word} ({self.target.language.name}) -> {self.origin.word} ({self.origin.language.name})'
    
    def serialize(self, reverse):
        return {
            'id' : self.id,
            'word' : self.target.word if not reverse else self.origin.word,
            'translation' : self.origin.word if not reverse else self.target.word,
            'type' : self.type
        }
