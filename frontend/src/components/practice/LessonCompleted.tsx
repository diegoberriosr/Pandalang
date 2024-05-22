import React, { useContext } from 'react'

// Icon imports 
import Thunder from '../../assets/elements/thunder.png'
import Heart from '../../assets/elements/heart.png';
import Dart from '../../assets/elements/dart.png';

// Component imports
import FinishCard from './FinishCard.tsx';

// Context imports
import { AuthContext } from '../../context/AuthContext.tsx';

const LessonCompleted = ({ attempts, correctAnswers}) => {
  const { user } = useContext(AuthContext);

  return (
    <div className='w-screen h-screen bg-white flex flex-col items-center text-slate-800 font-bold'>
      <h5>:confetti_ball:</h5>
      <h5>Great job!</h5>
      <h5>You've completed the lesson.</h5>
      <div className='mt-10 flex flex-wrap gap-10 justify-center items-center'>
        <FinishCard color='bg-yellow-500' title='Total xp'>
            <img src={Thunder} alt='thunder' className='w-5 h-5'/>
            <span className='text-yellow-500'>80</span>
        </FinishCard>
        <FinishCard color='bg-red-500' title='Remaining hearts'>
            <img src={Heart} alt='heart' className='w-5 h-5'/>
            <span className='text-red-500'>{user.hearts}</span>
        </FinishCard>
        <FinishCard color='bg-sky-400' title='Accuracy'>
            <img src={Dart} alt='dart' className='w-5 h-5'/>
            <span className='text-sky-400'>100%</span>
        </FinishCard>
      </div>
    </div>
  )
}

export default LessonCompleted
