import React, { useContext } from 'react'
import BrokenHeart from '../../assets/elements/broken_heart.png';

import { Button } from '../general/ButtonCVA.tsx';

import {AuthContext} from '../../context/AuthContext.tsx';

const OutOfHearts = () => {
  const { user, setUser } = useContext(AuthContext);

  
  const handleRefillHearts = (amount, xp) => {
    setUser({...user, hearts: user.hearts + amount, available_xp : user.available_xp - xp});
  }

  return (
    <div className='w-screen h-screen sm:w-[500px] sm:h-auto px-10 py-5 flex flex-col items-center justify-center bg-white rounded-xl'>
      <img src={BrokenHeart} alt='broken heart' className='w-20 h-20'/>
      <h3 className='text-2xl text-slate-800 font-bold'>You ran out of hearts!</h3>
      <p className='mt-2.5 text-slate-500'>Continue with the following options:</p>
      <div className='w-full mt-10 space-y-2.5'>
        <Button variant='indigo' className='w-full'>Get unlimited hearts</Button>
        { user.available_xp >= 20 &&
        <Button disabled={user.hearts === 5} className='w-full'
        onClick={() => handleRefillHearts(1, 20)}>Buy one heart (20 xp) </Button>
        }
        { user.available_xp >= 50 &&
        <Button disabled={user.hearts === 5} className='w-full'
        onClick={() => handleRefillHearts(5 - user.hearts, 50)}>Refill hearts (50 xp )</Button>
        }
      </div>
      <Button variant='noOutline' className='mt-5'> No thanks </Button>
    </div>
  )
}

export default OutOfHearts
