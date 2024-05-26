from django.test import TestCase
from ..models import User, Language, Flag, Course

class TestCourseModel(TestCase):
    def setUp(self):

        # Set test users.
        self.user1 = User.objects.create_user(username='testuser', email='testuser@mail.com', password='12345')
        self.user2 = User.objects.create_user(username='testuser2', email='testuser2@mail.com', password='12345')

        # Set test flags.
        self.flag = Flag(country='UK')
        self.flag.save()
        self.flag2 = Flag(country='Germany')
        self.flag2.save()

        # Set test languages.
        self.language = Language(name='English', flag=self.flag)
        self.language.save()
        self.language2 = Language(name='German', flag=self.flag2)
        self.language2.save()

        # Set test course.
        self.course = Course(title='German', target_language=self.language2, origin_language=self.language2)
        self.course.save()


    def test_course_creation(self):
        """Test creating a course object"""
        self.assertEquals(Course.objects.count(), 1) # Check that course objects are created without any issues.
        self.assertEquals(self.course.enrolled_users.all().count(), 0) # Verify that newly created courses have 0 users enrolled.


    def test_enroll_users(self):
        """Test enrolling users into an existing course. Simulates course interaction"""
        self.assertEquals(self.course.enrolled_users.all().count(), 0) # Verify that the test course has 0 users enrolled

        # Enroll test users in course
        self.course.enrolled_users.add(self.user1, self.user2)

        self.assertEquals(self.course.enrolled_users.all().count(), 2)