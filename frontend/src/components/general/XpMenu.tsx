import React, { useContext} from 'react'
import { useNavigate } from 'react-router-dom';
// UI icon imports
import Thunder from '../../assets/elements/thunder.png';

// Component imports
import { Button } from './ButtonCVA.tsx';

// Context imports
import { StatusContext } from '../../context/StatusContext.tsx';

const XpMenu = () => {
  
  const {status} = useContext(StatusContext);
  const navigate = useNavigate();

  return (
    <div className='w-full md:w-[280px] rounded-xl border border-slate-300 bg-white p-5 flex flex-col items-center space-y-3'>
      <img src={Thunder} alt='thunder' className='w-14 h-14'/>
      <h3 className='text-slate-800 font-bold text-lg'>Available XP</h3>
      <p className='text-slate-400 font-md text-center'>You can spend up to {status.available_xp} points.</p>
      <Button variant='noOutline' onClick={() => navigate('/shop')}>Go to shop</Button>
    </div>
  )

}

export default XpMenu 
