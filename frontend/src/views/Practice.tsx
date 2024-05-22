import React, { useState, useContext, useEffect } from 'react'

// Component imports
import PracticeHeader from '../components/practice/PracticeHeader.tsx';
import PracticeFooter from '../components/practice/PracticeFooter.tsx';
import Modal from '../components/practice/Modal.tsx';
import ExerciseWithoutHelp from '../components/practice/ExerciseWithoutHelp.tsx';
import OutOfHearts from '../components/practice/OutOfHearts.tsx';

// Context imports
import { AuthContext } from '../context/AuthContext.tsx';

type Word = {
    id : number,
    word : string,
    translation : string,
    language : string,
    slug ? : string
}

type Exercise = {
    words : Word[],
    answer : Word
};

const TEST_EXERCISES : Exercise [] = [
  {
    words : [
      {
        id : 1,
        word : 'Haus',
        translation : 'House',
        language : 'german',
        slug : ''
      },
      {
        id : 2,
        word : 'Kaese',
        translation : 'Cheese',
        language : 'german',
        slug : ''
      },
      {
        id : 3,
        word : 'Hund',
        translation : 'Dog',
        language : 'german',
        slug : ''
      },
    ],
    answer :       {
      id : 2,
      word : 'Kaese',
      translation : 'Cheese',
      language : 'german',
      slug : ''
    },
  }
]

const Practice = ({ practice }) => {
  
  const [loading, setLoading] = useState<boolean>(false); // Loading state.
  const [exercises, setExercises] = useState<Exercise[]>(TEST_EXERCISES); // A list of exercises.
  const [selected, setSelected] = useState<Word | undefined>(undefined); // Selected option on an exercise.
  const [progress, setProgress ] = useState<number>(0); // Overall progress.
  const [correctAnswers, setCorrectAnswers] = useState<number>(0); // Keeps track of correct answers (used to calculate lesson accuracy in the future) 
  const [attempts, setAttempts] = useState<number>(0); // Keeps track of total attempts (also used to calculate lesson accuracy).
  const [quitModal, setQuitModal] = useState<boolean>(false); // Used for displaying the exit confirmation modal.

  const { user } = useContext(AuthContext);
  useEffect( () => {
    if(!loading){
        setSelected(undefined);
        setProgress(((attempts)/(attempts + exercises.length)) * 100);
    }
  }, [exercises]);

  return (
    <>
    <Modal isVisible={user.hearts === 0}>
        <OutOfHearts/>
    </Modal>
    <Modal isVisible={quitModal}>
        Exit confirmation modal
    </Modal>
    <PracticeHeader practice={false} progress={progress}/>
    <main className='mt-20 w-screen flex-1 flex flex-col items-center justify-center px-2.5 md:px-5 lg:px-10'>
      { exercises.length > 0 && !loading ?
        <ExerciseWithoutHelp exercise={exercises[0]} setSelected={setSelected}/>
        :
        <span>Finished lesson</span>
      }
    </main>
    <PracticeFooter selected={selected} exercises={exercises} setExercises={setExercises} setCorrectAnswers={setCorrectAnswers} setAttempts={setAttempts}/>
    </>
  )
}

export default Practice
