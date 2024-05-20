import React from 'react';

// UI Icon Imports
import Mage from '../../assets/elements/mage.png';
import {Button} from './ButtonCVA.tsx';

// Context imports
import { AuthContext } from '../../context/AuthContext.js';


const Info = () => {
  const { user } = React.useContext(AuthContext); // Get user to dinamically render some UI-elements/promotions

  return (
    <div className='mt-10 w-[375px] hidden md:block'>
        { !user.isPremiunm && // If user is not a premium member, promote it
        <article className='relative w-full border-2 border-slate-200 rounded-xl px-4 py-3'>
            <img src={Mage} alt='mage' className='absolute top-4 right-6 w-20 h-20'/>
            <h4 className='text-slate-700 font-bold text-lg'>Become a Language Sage</h4>
            <p className='w-9/12 mt-2 text-md text-slate-500 font-semibold'>No ads, unlimited courses, and unlimited hearts!</p>
            <Button variant='primary' size='lg' className='w-full mt-6'>
                Unlock Sage Mode
            </Button>
        </article>
        }
    </div>
  )
}

export default Info
