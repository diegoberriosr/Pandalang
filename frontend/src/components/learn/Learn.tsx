import React from 'react';

// Icon imports
import { IoMdArrowBack } from "react-icons/io";
import { FaStar } from "react-icons/fa";
import { FaCrown } from "react-icons/fa";

// Component imports
import { Button } from '../general/ButtonCVA.tsx';


const Learn = () => {

  return (
    <main className='flex flex-col items-center flex-1 py-10 px-10'>
      <header className='relative w-full h-10 flex justify-center border-b-2 text-slate-500 font-bold'>
        <IoMdArrowBack className='absolute left-0 text-xl cursor-pointer'/>
        Russian
      </header>
      <div className='mt-5 w-full h-20 rounded-xl bg-green-500'>

      </div>
      <Button variant='secondary' size='rounded' className='mt-20 h-20 w-20'> 
        <FaStar className='text-2xl'/>
      </Button>
      <Button variant='secondary' size='rounded' className='mt-5 ml-28 h-20 w-20'>
        <FaStar className='text-2xl'/>
      </Button>
      <Button variant='secondary' size='rounded' className='mt-5 ml-28 h-20 w-20'>
        <FaStar className='text-2xl'/>
      </Button>
      <Button variant='secondary' size='rounded' className='mt-5 h-20 w-20'>
        <FaStar className='text-2xl'/>
      </Button>
      <Button disabled={true} variant='unavailable' size='rounded' className='mt-5 -ml-28 h-20 w-20'>
        <FaStar className='text-2xl'/>
      </Button>
      <Button disabled={true} variant='unavailable' size='rounded' className='mt-5 h-20 w-20'>
        <FaCrown className='text-2xl'/>
      </Button>
    </main>
  )
}

export default Learn
