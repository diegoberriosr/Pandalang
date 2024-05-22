import React, { useState, useContext } from 'react'

// Component imports
import { Button } from '../general/ButtonCVA.tsx';

// Context imports
import { AuthContext } from '../../context/AuthContext.tsx';

const PracticeFooter = ({ selected, exercises, setExercises, setAttempts, setCorrectAnswers }) => {
  
  const[state, setState] = useState<string>('waiting'); // Keeps track of footer state( waiting for submission, correct submission, and wrong submission);
  const { setUser } = useContext(AuthContext);
  
  const handleSubmitAnswers = () => {
    // Check if the answer was correct
    if (selected.id === exercises[0].answer.id) {
        setCorrectAnswers(prevState => prevState + 1); // Increase the number of correct answers by one.
        setAttempts(prevState => prevState + 1); // Increase the number of attempts by one.
        setState('correct'); // Update footer status to correct.
        return;
    };
    
    // Process incorrect answers
    setState('incorrect'); // Update footer status to incorrect.
    setUser( prevStatus => ({...prevStatus, hearts : prevStatus.hearts - 1})); // Substract one heart per failed attempt.
    setAttempts(prevState => prevState + 1); // Increase the number of attempts by one.
  };

  const handleContinue = () => {
    setExercises( prevStatus => {

        // Check if attempt was successful.
        if ( state === 'correct') return prevStatus.slice(1, prevStatus.length - 1); // Remove question from the array.

        // If not, alter the exercises array appropriately.
        let updatedStatus = [...prevStatus]; // Send failed question to the end of the array for further review.
        if (updatedStatus.length === 1) return updatedStatus;
        updatedStatus = [...updatedStatus, updatedStatus[0]]
        return updatedStatus.slice(1, updatedStatus.length - 1); // Remove the same failed question from the top of the array.    
      });

    setState('waiting') // Wait for a new submission.
  };

  return (
    <footer className={`${state === 'correct' ? 'bg-green-500/90' : ''} ${state === 'incorrect' ? 'bg-red-400/90' : ''} 
    fixed bottom-0 w-screen flex flex-row-reverse items-center justify-between h-24 border-t-2 border-slate-200 px-40`}>
        { state === 'waiting' ?
            <Button disabled={ selected === undefined } variant='secondary' onClick={handleSubmitAnswers}> 
                Check
            </Button>
            :
            <Button variant={state === 'correct' ? 'correct' : 'incorrect'} onClick={handleContinue}>
                Continue
            </Button>
        }
        { state !== 'waiting' &&
            <span className={`text-2xl font-bold ${state === 'correct' ? 'text-green-800' : 'text-red-800'}`}>
                {state === 'correct' ? 'Great job! :)' : 'Try it again :('}
            </span>
        }
    </footer>
  )
}

export default PracticeFooter
