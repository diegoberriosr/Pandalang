
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
import { StatusContext } from '../../context/StatusContext.tsx';

const Shop = () => {
  const [loading, setLoading] = useState(false);
  const { status, handleTransaction } = React.useContext(StatusContext); // Call the StatusContext to dinamically display/modify user status data

  const navigate = useNavigate();
  

  return (
    <GeneralView header='Shop' subheader='Refill your hearts with xp' icon={ShopImg} >
        <ul className='w-10/12'>
            <ViewListElement>
                <div className='flex items-center'>
                    <img src={Heart} alt='heart' className='w-12 h-12'/>
                    <span className='text-slate-700 text-lg font-semibold ml-5'>Refill Hearts</span>
                </div>
                <Button size='sm' disabled={ status.hearts === 5 || status.available_xp < 50 || status.isPremium}
                    onClick = {() => handleTransaction(50, 5- status.hearts, setLoading)}>
                    { status.hearts === 5 ? 'Full' : <span className='flex items-center space-x-1'>
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
                <Button size='sm' disabled={ status.hearts === 5 || status.available_xp < 20 || status.isPremium}
                onClick = {() => handleRefill(20, 1, setLoading)}>    
                    { status.hearts === 5 ? 'Full' : <span className='flex items-center space-x-1'>
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
                onClick={() => navigate('/premium')}>
                    { status.isPremium ? 'Cancel' : 'Upgrade'}
                </Button>
            </ViewListElement>
        </ul>
    </GeneralView>

  )
}
export default Shop
