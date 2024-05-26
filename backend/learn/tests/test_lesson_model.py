from django.test import TestCase
from ..models import Language, Flag, Course, Section, Lesson

class TestLessonModel(TestCase):
    def setUp(self):
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

        # Set test section
        self.section = Section(course = self.course, description='Test description', level='A1')
        self.section.save()

        # Set the test lesson
        self.lesson = Lesson(section=self.section)
        self.lesson.save()

    
    def test_lesson_creation(self):
        """Test the creation of a lesson instance"""

        self.assertEquals(Lesson.objects.count(), 1) # Check that the section was succesfully created.
        self.assertEquals(self.lesson.section, self.section) # Assert that the created lesson is associated with the correct section.
        self.assertEquals(self.lesson.number_in_course, 1) # Assert that the created lesson has a correct number in course position value.


