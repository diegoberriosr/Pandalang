import React from 'react';
import ShopImg from '../assets/elements/shop.png';
import Heart from '../assets/elements/heart.png';
import BlueHeart from '../assets/elements/blue_heart.png';
import Thunder from '../assets/elements/thunder.png';

import { Button } from '../components/general/ButtonCVA.tsx';

import { AuthContext } from '../context/AuthContext.tsx';

const Shop = () => {
  const { user, setUser } = React.useContext(AuthContext);
  
  const handleRefill = (hearts_refilled, xp_amount) => {
    if (user.available_xp < xp_amount || user.hearts + hearts_refilled > 5) return;
    setUser({...user, hearts : user.hearts + hearts_refilled, available_xp : user.available_xp - xp_amount});
  };

  const updateMembershipStatus = () => {
    setUser({...user, isPremium: !user.isPremium});
  };

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
                <Button size='sm' disabled={ user.hearts === 5 || user.available_xp < 50}
                    onClick = {() => handleRefill(5- user.hearts, 50)}>
                    { user.hearts === 5 ? 'Full' : <span className='flex items-center space-x-1'>
                            <img src={Thunder} alt='thunder' className='w-3 h-3'/>
                            <span>50 XP</span>
                        </span>}
                </Button>
            </li>
            <li className='flex justify-between items-center border-2 border-t-2 border-b-0 border-l-0 border-r-0 border-slate-200 py-5 px-4'>
                <div className='flex items-center'>
                    <img src={Heart} alt='heart' className='w-12 h-12'/>
                    <span className='text-slate-700 text-lg font-semibold ml-5'>Refill 1 heart</span>
                </div>
                <Button size='sm' disabled={ user.hearts === 5 || user.available_xp < 20}
                onClick = {() => handleRefill(1, 20)}>    
                    { user.hearts === 5 ? 'Full' : <span className='flex items-center space-x-1'>
                            <img src={Thunder} alt='thunder' className='w-3 h-3'/>
                            <span>20 XP</span>
                        </span>}
                </Button>
            </li>
            <li className='flex justify-between items-center border-2 border-t-2 border-b-0 border-l-0 border-r-0 border-slate-200 py-5 px-4'>
                <div className='flex items-center'>
                    <img src={BlueHeart} alt='heart' className='w-12 h-12'/>
                    <span className='text-slate-700 text-lg font-semibold ml-5'>Get unlimited hearts</span>
                </div>
                <Button size='sm'
                onClick={updateMembershipStatus}>
                    { user.isPremium ? 'Cancel' : 'Upgrade'}
                </Button>
            </li>
        </ul>
    </div>
  )
}
export default Shop
