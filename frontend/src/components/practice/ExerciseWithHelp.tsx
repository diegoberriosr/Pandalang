import React from 'react'

// Component imports
import { Button } from '../general/ButtonCVA.tsx';

const ExerciseWithHelp = ({ exercise, state, selected, setSelected }) => {
  return (
    <>
        <h3 className='text-2xl text-slate-800 font-bold'>Select the correct meaning for "{exercise.answer.translation}"</h3>
        <div className='mt-10 flex flex-wrap justify-center gap-10'>
        {
            exercise.words.map( (word, index) => {
                if ( state !== 'waiting' && exercise.answer.id === word.id) {
                    return <Button key={index} variant='correct' className='mt-2.5 relative w-full h-14' onClick={() => setSelected(word)}>
                    <div className='absolute left-2.5 px-2.5 py-1.5 border-2 border-gray-300 rounded-xl'>
                        {index + 1}
                    </div>
                    <span className='normal-case text-slate-800 font-semibold'>{word.word}</span>
                  </Button>              
                  }
                  else if( state === 'incorrect' && selected === word) {
                    return <Button key={index} variant='incorrect' className='mt-2.5 relative w-full h-14' onClick={() => setSelected(word)}>
                    <div className='absolute left-2.5 px-2.5 py-1.5 border-2 border-gray-300 rounded-xl'>
                        {index + 1}
                    </div>
                    <span className='normal-case text-slate-800 font-semibold'>{word.word}</span>
                  </Button>
                  }
                  else return <Button key={index} className='mt-2.5 relative w-full h-14' onClick={() => setSelected(word)}>
                    <div className='absolute left-2.5 px-2.5 py-1.5 border-2 border-gray-300 rounded-xl'>
                        {index + 1}
                    </div>
                    <span className='normal-case text-slate-800 font-semibold'>{word.word}</span>
                  </Button>
            })
        }
        </div>
    </>
  )
}

export default ExerciseWithHelp
