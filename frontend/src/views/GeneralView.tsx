import React from "react";

const Leaderboard = ({header, subheader, icon, children}) => {
  return (
    <div className='absolute top-14 md:relative md:top-auto py-5 w-full md:w-7/12 flex flex-col items-center space-y-5'>
        <img src={icon} alt='shop' className='w-16 h-16'/>
        <h4 className='text-2xl text-slate-800 font-bold'>{header}</h4>
        <h5 className='text-lg text-slate-500'>{subheader}</h5>
        {children}
    </div>
  )
}

export default Leaderboard
