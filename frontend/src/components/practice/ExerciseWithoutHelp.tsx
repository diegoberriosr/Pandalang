import React from 'react'

// Icon imports
import Panda from '../../assets/elements/panda.png';

// Component imports
import { Button } from '../general/ButtonCVA.tsx';

const ExerciseWithoutHelp = ({ exercise, setSelected}) => {
  return (
    <div className='mx-auto w-[90%] sm:w-[50%] flex flex-col justify-start items-start px-2.5'>
       <h3 className='text-2xl text-slate-800 font-bold'>Select the correct meaning</h3>
       <figure className='mt-5 w-full flex items-center space-x-3.5'>
            <img src={Panda} alt='red panda' className='w-20 h-20'/>
            <div className='px-3.5 py-2.5 border-2 border-gray-300 rounded-xl'>
                {exercise.answer.translation}
            </div>
       </figure>
       <div className='mt-5 w-full'>
        {
          exercise.words.map((word, index) => (
            <Button key={index} className='mt-2.5 relative w-full h-14' onClick={() => setSelected(word)}>
              <div className='absolute left-2.5 px-2.5 py-1.5 border-2 border-gray-300 rounded-xl'>
                  {index + 1}
              </div>
              <span className='normal-case text-slate-800 font-semibold'>{word.word}</span>
            </Button>
          ))
        }
       </div>
    </div>
  )
}

export default ExerciseWithoutHelp
