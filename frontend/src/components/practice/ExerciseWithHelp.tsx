import React from 'react'

import Panda from '../../assets/elements/panda.png';

// Component imports
import { Button } from '../general/ButtonCVA.tsx';

const ExerciseWithHelp = ({ exercise, state, selected, setSelected }) => {
  console.log(exercise);
  return (
    <>
        <h3 className='text-2xl text-slate-800 font-bold'>Select the correct meaning for "{exercise.answer.translation}"</h3>
        <div className='mt-10 flex flex-wrap justify-center gap-10'>
        {
            exercise.words.map( (word, index) => {
                  return <Button key={index} className='mt-2.5 relative w-32 h-40 md:w-36 md:h-40 lg:w-56 lg:h-60 py-6' onClick={() => setSelected(word)}>
                    <div className='flex flex-col items-center space-y-5'>
                      <img src={word.slug ? word.slug : Panda} alt='panda' className='w-20 lg:w-28 h-20 lg:h-28'/>
                      <div className='w-full flex items-center justify-center space-x-2.5'>
                        <div className='px-2.5 py-1.5 border-2 border-gray-300 rounded-xl'>
                          {index + 1}
                        </div>
                        <span className='normal-case text-slate-800 font-semibold lg:text-lg'>{word.word}</span>

                      </div>
                    </div>
                  </Button>
            })
        }
        </div>
    </>
  )
}

export default ExerciseWithHelp
