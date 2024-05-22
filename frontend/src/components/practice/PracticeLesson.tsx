import React from 'react';

// Icon imports
import Heart from '../../assets/elements/heart.png';

// Component imports
import { Button } from '../general/ButtonCVA.tsx';

const PracticeLesson = ({ setPracticeLessonModal }) => {
  return (
    <div className='w-screen h-screen sm:w-[500px] sm:h-auto px-10 py-5 flex flex-col items-center justify-center bg-white rounded-xl'>
        <img src={Heart} alt='panda' className='w-20 h-20'/>
        <h3 className='mt-2.5 text-2xl text-slate-800 font-bold text-center'>Practice lesson</h3>
        <p className='mt-2.5 text-slate-500 text-center'>Use practice lessons to regain hearts. You cannot loose hearts in practice lessons</p>
      <div className='w-full mt-10 space-y-2.5'>
        <Button variant='primary' className='w-full' onClick={() => setPracticeLessonModal(false)}> I understand </Button>
      </div>
    </div>
  )
}

export default PracticeLesson
