import React, { useState, useContext } from 'react'

// SFX imports
import Correct from '../../assets/sounds/correct.wav';
import Incorrect from '../../assets/sounds/wrong.mp3';

// Component imports
import { Button } from '../general/ButtonCVA.tsx';
import { MoonLoader } from 'react-spinners';

// Context imports
import { StatusContext } from '../../context/StatusContext.tsx';

const PracticeFooter = ({ practice, selected, exercises, setExercises, state, setState, setAttempts, setCorrectAnswers }) => {
  const [loading, setLoading] = useState<Boolean>(false);
  const { status, handleUpdateHearts} = useContext(StatusContext);
  const correctSFX = new Audio(Correct);
  const incorrectSFX = new Audio(Incorrect);

  const handleSubmitAnswers = () => {
    // Check if the answer was correct
    if (selected.id === exercises[0].answer.id) {
        setCorrectAnswers(prevState => prevState + 1); // Increase the number of correct answers by one.
        setAttempts(prevState => prevState + 1); // Increase the number of attempts by one.
        setState('correct'); // Update footer status to correct.
        correctSFX.play()
        return;
    };
    
    // Process incorrect answers
    setState('incorrect'); // Update footer status to incorrect.
    if (!practice && !status.isPremium) handleUpdateHearts(-1, setLoading); // Substract one heart per failed attempt (only when it is a regular lesson, not a practice lesson, and when user is not premium).
    setAttempts(prevState => prevState + 1); // Increase the number of attempts by one.
    incorrectSFX.play();
  };

  const handleContinue = () => {
    setExercises( prevStatus => {

        let updatedStatus = [...prevStatus];
        const exercise = updatedStatus.shift();

        if (state === 'correct') return updatedStatus.slice();

        return updatedStatus.concat([exercise]);
      
      });

    setState('waiting') // Wait for a new submission.
  };

  return (
    <footer className={`${state === 'correct' ? 'bg-green-500/90' : ''} ${state === 'incorrect' ? 'bg-red-400/90' : ''} 
    fixed bottom-0 w-screen flex flex-row-reverse items-center justify-between h-24 border-t-2 border-slate-200 px-2.5 sm:px-10 md:px-20 lg:px-40`}>
        { state === 'waiting' ?
            <Button disabled={ selected === undefined || loading } variant='secondary' onClick={handleSubmitAnswers}> 
                { loading ? <MoonLoader loading={loading} color="#FFFFFF" size={50}/> : 'Check'}
            </Button>
            :
            <Button variant={state === 'correct' ? 'correct' : 'incorrect'} onClick={handleContinue}>
                Continue
            </Button>
        }
        { state !== 'waiting' &&
            <span className={`text-lg sm:text-2xl font-bold ${state === 'correct' ? 'text-green-800' : 'text-red-800'}`}>
                {state === 'correct' ? 'Great job! :)' : 'Try it again :('}
            </span>
        }
    </footer>
  )
}

export default PracticeFooter
