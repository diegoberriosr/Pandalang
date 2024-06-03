import React, { useState, useContext, useEffect } from 'react'
import { useNavigate, } from 'react-router-dom';

// SFX imports
import Win from '../../assets/sounds/win.mp3';

// Icon imports 
import Thunder from '../../assets/elements/thunder.png'
import Heart from '../../assets/elements/heart.png';
import Dart from '../../assets/elements/dart.png';

// Component imports
import FinishCard from './FinishCard.tsx';
import { Button } from '../general/ButtonCVA.tsx';
import { MoonLoader } from 'react-spinners';

// Context imports
import { StatusContext } from '../../context/StatusContext.tsx';

const LessonCompleted = ({ practice, lessonId, attempts, correctAnswers }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [xp, setXp] = useState<number>(0); // Total xp gained from completing the lesson.
  const { status, handleCompleteLesson } = useContext(StatusContext); 


  const accuracy = correctAnswers/attempts; // Used to compute total xp learned from lesson ( accuracy * base xp).
  const winSFX = new Audio(Win);
  const navigate = useNavigate();
  
  useEffect( () => {
    handleCompleteLesson(practice, practice ? -1 : lessonId, accuracy, setXp, setLoading, winSFX);
  }, []);

  return (
    <div className='relative w-screen h-screen bg-white flex flex-col justify-center items-center text-slate-800 font-bold text-2xl pb-14'> 
    { loading && 
      <div className='absolute inset-0 w-full h-full bg-white flex items-center justify-center'>
        <MoonLoader loading={loading} size={window.innerHeight /2} color='#22c55e'/>
      </div>
    }
      <h5 className='text-8xl'>🎊</h5>
      <h5 className='mt-2.5'>Great job!</h5>
      <h5 className='mt-2.5'>You've completed the lesson.</h5>
      <div className='mt-10 flex flex-wrap gap-10 justify-center items-center'>
        <FinishCard color='bg-yellow-500' title='Total xp'>
            <img src={Thunder} alt='thunder' className='w-5 h-5'/>
            <span className='text-yellow-500'>{xp}</span>
        </FinishCard>
        <FinishCard color='bg-red-500' title='Remaining hearts'>
            <img src={Heart} alt='heart' className='w-5 h-5'/>
            <span className='text-red-500'>{status.hearts}</span>
        </FinishCard>
        <FinishCard color='bg-sky-400' title='Accuracy'>
            <img src={Dart} alt='dart' className='w-5 h-5'/>
            <span className='text-sky-400'>{ Math.ceil(accuracy * 100)}%</span>
        </FinishCard>
      </div>
      <footer className='fixed bottom-0 w-screen flex flex-row-reverse items-center justify-between h-24 border-t-2 border-slate-200 px-2.5 sm:px-10 md:px-20 lg:px-40'>
        <Button variant='secondary' onClick={() => navigate('/learn')}>Continue</Button>
        <Button>Practice again</Button>
      </footer>
    </div>
  )
}

export default LessonCompleted
