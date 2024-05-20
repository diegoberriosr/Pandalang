
import React from 'react';

// Icon imports
import ShopImg from '../../assets/elements/shop.png';
import Heart from '../../assets/elements/heart.png';
import BlueHeart from '../../assets/elements/blue_heart.png';
import Thunder from '../../assets/elements/thunder.png';

// Component imports
import { Button } from '../general/ButtonCVA.tsx';
import GeneralView from '../../views/GeneralView.tsx';
import ViewListElement from '../../views/ViewListElement.tsx';

// Context imports
import { AuthContext } from '../../context/AuthContext.tsx';

const Shop = () => {
  const { user, setUser } = React.useContext(AuthContext); // Call the Authcontext to dinamically display/modify user data
  
  // Refill a certain amount of hearts
  const handleRefill = (hearts_refilled, xp_amount) => { 
    if (user.available_xp < xp_amount || user.hearts + hearts_refilled > 5) return; // Only valid when user has enough available xp / heart counter is not full
    setUser({...user, hearts : user.hearts + hearts_refilled, available_xp : user.available_xp - xp_amount}); // Update user
  };

  // Updates membership status
  const updateMembershipStatus = () => { 
    setUser({...user, isPremium: !user.isPremium}); // Update user's membership status
  };

  return (
    <GeneralView header='Shop' subheader='Refill your hearts with xp' icon={ShopImg} >
        <ul className='w-10/12'>
            <ViewListElement>
                <div className='flex items-center'>
                    <img src={Heart} alt='heart' className='w-12 h-12'/>
                    <span className='text-slate-700 text-lg font-semibold ml-5'>Refill Hearts</span>
                </div>
                <Button size='sm' disabled={ user.hearts === 5 || user.available_xp < 50 || user.isPremium}
                    onClick = {() => handleRefill(5- user.hearts, 50)}>
                    { user.hearts === 5 ? 'Full' : <span className='flex items-center space-x-1'>
                            <img src={Thunder} alt='thunder' className='w-3 h-3'/>
                            <span>50 XP</span>
                        </span>}
                </Button>   
            </ViewListElement>
            <ViewListElement>
                <div className='flex items-center'>
                    <img src={Heart} alt='heart' className='w-12 h-12'/>
                    <span className='text-slate-700 text-lg font-semibold ml-5'>Refill 1 heart</span>
                </div>
                <Button size='sm' disabled={ user.hearts === 5 || user.available_xp < 20 || user.isPremium}
                onClick = {() => handleRefill(1, 20)}>    
                    { user.hearts === 5 ? 'Full' : <span className='flex items-center space-x-1'>
                            <img src={Thunder} alt='thunder' className='w-3 h-3'/>
                            <span>20 XP</span>
                        </span>}
                </Button>
            </ViewListElement>
            <ViewListElement>
                <div className='flex items-center'>
                    <img src={BlueHeart} alt='heart' className='w-12 h-12'/>
                    <span className='text-slate-700 text-lg font-semibold ml-5'>Get unlimited hearts</span>
                </div>
                <Button size='sm'
                onClick={updateMembershipStatus}>
                    { user.isPremium ? 'Cancel' : 'Upgrade'}
                </Button>
            </ViewListElement>
        </ul>
    </GeneralView>

  )
}
export default Shop
