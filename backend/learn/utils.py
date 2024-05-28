from random import randint
from datetime import datetime, timedelta

def assign_exercise_type(exercises):
    """Randomly assigns to each element of an Exercises list

    Assigns an exercise type (translation/listening) to every element
    of a list of exercises

    Args:
        exercises (Exercise[]) : A list containing exercises

    Returns:
        exercises (Exercise[]) : The same list of exercises, with one extra attribute (type)

    """

    # Randomly add a type to each exercise
    for exercise in exercises:
        i = randint(1,5)

        if i == 1:
            exercise.type = 'with_help_target' # Translate (easy) to target language.
        elif i == 2:
            exercise.type = 'without_help_target' # Translate (difficult) to target language.
        elif i == 3:
            exercise.type = 'with_help_origin' # Translate (easy) to origin language.
        elif i == 4:
            exercise.type = 'without_help_origin' # Translate (hard) to origin language.
        else:
            exercise.type = 'listening' # Listening practice in target language.

    return exercises

def get_last_sunday():
    """Returns the closest last sunday
    
    Computes the date of the most recent past sunday.

    Returns:
        last_sunday (datetime) : Last sunday at 18:00h 00:00s 
    """
    today = datetime.today()
    last_sunday = today - timedelta(days=today.weekday() + 1)

    return last_sunday.replace(hour=18, minute=0, second=0, microsecond=0) # Set last sunday's time at 18:00h 00:00s (resetting of each week's leaderboard).

def get_next_sunday():
    """Returns the current next sunday
    
    Computes the date of this week's next sunday.

    Returns:
        next_sunday (datetime) : Next sunday at 18:00h 00:00s 
    """
    today = datetime.today()

    # Compute days until sunday.
    days_until_sunday = timedelta(6 - today.weekday())

    # Check edge cases.
    if today.weekday() == 6:
        days_until_sunday = 7

    next_sunday = today + timedelta(days_until_sunday) # Get next sunday's date.

    return next_sunday.replace(hour=18, minute=0, second=0, microsecond=0) # Set the next sunday's time at 18:00h 00:00s (resetting of each week's leaderboard.)