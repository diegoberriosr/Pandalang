import React from 'react'

const FinishCard = ({ color, title, children}) => {
  return (
    <div className={`w-32 px-[2px] py-[2px] rounded-xl flex flex-col items-center ${color}`}>
      <span className='uppercase text-white font-bold text-xs'>{title}</span>
      <div className='mt-2.5 w-full h-6/12 bg-white flex items-center justify-center rounded-xl px-3 py-1.5 space-x-2.5'>
            {children}
      </div>
    </div>
  )
}

export default FinishCard
