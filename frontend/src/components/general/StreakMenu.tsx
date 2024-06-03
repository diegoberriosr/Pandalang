import React, { useContext } from 'react'

// UI icon imports
import Flame from '../../assets/elements/flame.png';
import GrayFlame from '../../assets/elements/gray_flame.png';
// Context imports
import { StatusContext } from '../../context/StatusContext.tsx';


const StreakMenu = () => {
  const {status} = useContext(StatusContext);

  return (
    <div className={`w-full md:w-[350px] ${status.current_streak > 0 ? 'bg-yellow-200/90' : 'bg-white' } p-5 rounded-xl border border-slate-300 flex items-center space-x-5`}>
        <div className='w-[60%] space-y-1'>
            <h3 className={`${status.current_streak > 0 ? 'text-yellow-600' : 'text-slate-800'} font-bold text-2xl`}>0 dray streak</h3>
            <p className={`${ status.current_streak > 0 ? 'text-slate-700' : 'text-slate-400'} text-sm`}>
                { status.current_streak > 0 ?
                'Complete a lesson every day to maintain your streak!'
                :
                'Complete a lesson to start a new streak!'
                }
                </p>
        </div>
        <img src={status.current_streak > 0 ? Flame : GrayFlame} alt='flame' className='w-24 h-24'/>
    </div>
  )
}

export default StreakMenu
