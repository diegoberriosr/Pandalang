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
    is_premium = models.BooleanField(default=False)  # Indicates whether user has a paid membership or not.

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
    description = models.CharField(max_length=100, null=True, blank=True) # A small description of the course (not required)
    target_language = models.ForeignKey(Language, on_delete=models.CASCADE, related_name='target_language_in') # The language teached in the course.
    origin_language = models.ForeignKey(Language, on_delete=models.CASCADE, related_name='origin_language_in') # The language through which the course is taught.
    enrolled_users = models.ManyToManyField(User, related_name='enrolled_coursers', db_index=True) # Users associated/enrolled in an specific course

    def __str__(self):
        return f'{self.id}. {self.target_language} - {self.origin_language}'

