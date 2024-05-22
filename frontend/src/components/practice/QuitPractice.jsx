import React from 'react'
import { useNavigate } from 'react-router-dom';
// Icon imports
import Panda from '../../assets/elements/panda.png';

// Component imports
import { Button } from '../general/ButtonCVA.tsx';

const QuitPractice = ({ setQuitModal }) => {
  const navigate = useNavigate();
  return (
    <div className='w-screen h-screen sm:w-[500px] sm:h-auto px-10 py-5 flex flex-col items-center justify-center bg-white rounded-xl'>
        <img src={Panda} alt='panda' className='w-20 h-20'/>
        <h3 className='mt-2.5 text-2xl text-slate-800 font-bold text-center'>Already want to leave? :( </h3>
        <p className='mt-2.5 text-slate-500'>If you quit now, all progress in this lesson will be lost</p>
      <div className='w-full mt-10 space-y-2.5'>
        <Button variant='primary' className='w-full' onClick={() => setQuitModal(false)}> I want to continue </Button>
        <Button variant='incorrect' className='w-full' onClick={() => navigate('/learn')}>I want to quit</Button>
      </div>
    </div>
  )
}

export default QuitPractice
