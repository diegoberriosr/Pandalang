import React from 'react';
import ShopImg from '../assets/elements/shop.png';
import Heart from '../assets/elements/heart.png';
import BlueHeart from '../assets/elements/blue_heart.png';

import { Button } from '../components/general/ButtonCVA.tsx';

import { AuthContext } from '../context/AuthContext.js';

const Shop = () => {
  const { user } = React.useContext(AuthContext);
  return (
    <div className='absolute top-14 md:relative md:top-auto py-5 w-full md:w-7/12 flex flex-col items-center space-y-5'>
        <img src={ShopImg} alt='shop' className='w-16 h-16'/>
        <h4 className='text-2xl text-slate-800 font-bold'>Shop</h4>
        <h5 className='text-lg text-slate-500'>Refill your hearts with xp</h5>
        <ul className='w-10/12'>
            <li className='flex justify-between items-center border-2 border-t-2 border-b-0 border-l-0 border-r-0 border-slate-200 py-5 px-4'>
                <div className='flex items-center'>
                    <img src={Heart} alt='heart' className='w-12 h-12'/>
                    <span className='text-slate-700 text-lg font-semibold ml-5'>Refill Hearts</span>
                </div>
                <Button size='sm' disabled={ user.hearts === 5}>
                    { user.hearts === 5 ? 'Full' : 'Refill'}
                </Button>
            </li>
            <li className='flex justify-between items-center border-2 border-t-2 border-b-0 border-l-0 border-r-0 border-slate-200 py-5 px-4'>
                <div className='flex items-center'>
                    <img src={BlueHeart} alt='heart' className='w-12 h-12'/>
                    <span className='text-slate-700 text-lg font-semibold ml-5'>Get unlimited hearts</span>
                </div>
                <Button size='sm'>
                    Upgrade
                </Button>
            </li>
        </ul>
    </div>
  )
}

export default Shop
