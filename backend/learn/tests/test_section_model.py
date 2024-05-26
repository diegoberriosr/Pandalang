from django.test import TestCase
from ..models import Language, Flag, Course, Section

class TestSectionModel(TestCase):
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

        # Set test sections
        self.section = Section(course = self.course, description='Test description', level='A1')
        self.section.save()
        
        self.section2 = Section(course = self.course, description='Test description', level='A2')
        self.section2.save()

    def test_section_creation(self):
        """Test the creation of a section instance"""

        self.assertEquals(Section.objects.count(), 2) # Check that the section was succesfully created.
        self.assertEquals(self.course.sections.first(), self.section) # Assert that the created section is associated with the correct course.
        self.assertEquals(self.section.number_in_course, 1) # Check the validity of the number in course of section 1
        self.assertEquals(self.section2.number_in_course, 2) # Check the validity of the number in course of section 2

