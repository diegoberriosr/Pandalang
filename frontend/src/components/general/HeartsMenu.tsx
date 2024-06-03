import React, { useContext , useState} from 'react';
import { useNavigate } from 'react-router-dom';

// UI icon imports
import Heart from '../../assets/elements/heart.png';
import BlueHeart from '../../assets/elements/blue_heart.png';
import Thunder from '../../assets/elements/thunder.png';

// Component imports
import { Button } from './ButtonCVA.tsx';
import { MoonLoader } from 'react-spinners';

// Status improts
import { StatusContext } from '../../context/StatusContext.tsx';

const HeartsMenu = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { status, handleTransaction } = useContext(StatusContext);
  
  const navigate = useNavigate();

  const heartsArray = Array.from({length : status.hearts}, (_, index) => (
    <img src={Heart} alt='red heart' className='h-6 w-6'/>
  ));

  return (
    <div className='w-full md:top-auto h-full rounded-xl bg-white md:w-[350px] border border-slate-200 flex flex-col items-center p-5 space-y-3'>
      <h3 className='text-slate-800 font-bold text-lg'>Hearts</h3>
      <div className='w-full flex justify-center space-x-2.5'>
        { status.is_premium ?
        <img src={BlueHeart} alt='blue heart' className='w-10 h-10'/>
        :
        heartsArray
        }
      </div>
      <h4 className='text-slate-800 font-bold text-lg'>
         You have 
         { status.is_premium ? ' infinite ' : status.hearts === 5 ? ' full '  : ` ${status.hearts} `} 
         hearts
      </h4>
      <p className='text-slate-400 text-md'>Keep on learning</p>
        {
            !status.is_premium && <>
      <Button disabled={ loading || status.hearts === 5 || status.available_xp < 50 } className='w-full h-12'
      onClick={() => handleTransaction(50, 5 - status.hearts, setLoading)}>
        {
            loading ?
            <MoonLoader loading={loading} color='#22c55e' size={10}/>
            :
            <div className='w-full flex items-center justify-between'>
                <div className='flex items-center space-x-2.5'>
                    <img src={Heart} alt='red heart' className='w-5 h-5'/>
                    <span>Refill hearts</span>
                </div>
                <div className='flex items-center space-x-2.5'>
                    <img src={Thunder} alt='thunder' className='w-5 h-5'/>
                    <span>50</span>        
                </div>
            </div>
        }
      </Button>
      <Button className='w-full h-12'>
        <div className='w-full flex items-center justify-start'>
            <div className='flex items-center space-x-2.5'>
                <img src={Heart} alt='red heart' className='w-5 h-5'/>
                <span>Practice to earn hearts</span>
            </div>    
        </div>
      </Button>
            </>
        }
    </div>
  )
}

export default HeartsMenu
