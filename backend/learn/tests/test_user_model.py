from django.test import TestCase
from ..models import User
from datetime import date

class UserModelTest(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(email = 'test@mail.com', username='testuser', password='12345')
    
    def test_user_creation(self):
        """Test that user was created successfully"""
        self.assertEquals(User.objects.count(), 1) # Assert that user was created.
        self.assertEquals(self.user.username, 'testuser') # Assert that the provided username is correct.
        self.assertEquals(self.user.email, 'test@mail.com') # Assert that the provided email is correct.
        self.assertEquals(self.user.date_joined, date.today()) # Assert that the date joined is the same as the current date by default.
        self.assertEquals(self.user.hearts,  5) # Assert that the number of hearts is set to 5 by default for new users.
        self.assertEquals(self.user.xp, 0) # Assert that the xp is set to 0 by default for new users.
        self.assertEquals(self.user.available_xp, 0) # Assert that the available xp is set to 0 by default for new users.
        self.assertFalse(self.user.is_premium) # Assert that the premium membership status is set to 0 by default for new users.

    def test_update_hearts(self):
        """Test altering the `hearts` attribute. Simulates making a mistake/replenishing hearts"""
        self.user.update_hearts(-2) # Decrease the number of hearts by 2.
        self.assertEquals(self.user.hearts, 3) # Check that the updated number of hearts is 3.

        self.user.update_hearts(2) # Increase the number of hearts by 2.
        self.assertEquals(self.user.hearts, 5) # Check that the final number of hearts is 5.

    def test_update_xp(self):
        """Test increasing the `xp` and `available_xp` attributes. Simulates completing a lesson."""
        self.user.update_xp(15) # Update xp by 15 points.
        self.assertEquals(self.user.xp, 15) # Make sure that the total xp was incremented by 15.
        self.assertEquals(self.user.available_xp, 15) # Make sure that the amount of available_xp was incremented by 15 as well.

    def test_consume_available_xp(self):
        """Test consuming/spending available xp (`available_xp`). Simulates making a transaction at the shop."""
        self.user.update_xp(15)  # Update `xp`` and `available_xp` by 15 points

        self.user.consume_available_xp(15) # Spend 15 xp
        self.assertEquals(self.user.available_xp, 0) # Check that 15 points where substracted from the available xp amount.
        self.assertEquals(self.user.xp, 15) # Assert that the total amount of xp was left untouched.

    def test_update_membership_status(self):
        """Test updating an user's membership status. Simulates updating membership tier."""
        self.user.update_membership_status() # Update user membership status
        self.assertTrue(self.user.is_premium) # Assert that membership status was indeed updated.