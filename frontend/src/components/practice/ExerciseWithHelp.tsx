import React from 'react'

// Component imports
import { Button } from '../general/ButtonCVA.tsx';

import Panda from '../../assets/elements/panda.png';

const ExerciseWithHelp = ({ exercise, setSelected }) => {
  return (
    <>
        <h3 className='text-2xl text-slate-800 font-bold'>Select the correct meaning for "{exercise.answer.translation}"</h3>
        <div className='mt-10 flex flex-wrap justify-center gap-10'>
        {
            exercise.words.map( (word, index) => 
                <Button key={index} variant='course' className='w-32 h-36 md:w-48 md:h-52' onClick={() => setSelected(word)}>
                    <div className='flex flex-col items-center space-y-5 normal-case'>
                        <img src={Panda} alt='word graphical representation' className='w-[80px] h-[80px]'/>
                        <div className='flex w-full items-center space-between space-x-2.5'>
                            <span>{word.word}</span>
                            <span className='px-2.5 py-1 border-2 border-gray-200 rounded-xl text-center'>{index + 1}</span>
                        </div>
                    </div>
                </Button>
            )
        }
        </div>
    </>
  )
}

export default ExerciseWithHelp
