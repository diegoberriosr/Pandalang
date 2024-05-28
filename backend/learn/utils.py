from random import randint
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