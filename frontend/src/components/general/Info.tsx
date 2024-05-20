import React from 'react';

// UI Icon Imports
import Mage from '../../assets/elements/mage.png';
import Thunder from '../../assets/elements/thunder.png';

// Component imports
import {Button} from './ButtonCVA.tsx';
import { Link } from 'react-router-dom';

// Context imports
import { AuthContext } from '../../context/AuthContext.tsx';

type Quest = {
  title : string,
  xp : number
}

const TEST_QUESTS : [Quest] = [
  { title : 'Earn 10 xp', xp : 10},
  { title : 'Earn 100 xp', xp : 100},
  { title : 'Earn 1000 xp', xp : 1000},
]

const Info = () => {
  const { user } = React.useContext(AuthContext); // Get user to dinamically render some UI-elements/promotions


  return (
    <div className='mt-10 w-[375px] hidden md:block'>
        { !user.isPremiunm && // If user is not a premium member, promote it
        <article className='relative w-full border-2 border-slate-200 rounded-xl px-4 py-3'>
            <img src={Mage} alt='mage' className='absolute top-4 right-6 w-20 h-20'/>
            <h4 className='text-slate-700 font-bold text-lg'>Become a Language Sage</h4>
            <p className='w-9/12 mt-2 text-md text-slate-500 font-semibold'>No ads, unlimited courses, and unlimited hearts!</p>
            <Button variant='indigo' size='info' className='w-full mt-6'>
                Unlock Sage Mode
            </Button>
        </article>
        }
        <article className='mt-5 w-full border-2 border-slate-200 rounded-xl px-4 py-3'>
          <div className='w-full flex justify-between items-center'>
            <h4 className='text-lg text-slate-800 font-bold'>Quests</h4>
            <Link to='/quests'>
              <Button variant='noOutline'>
                View all
              </Button>
            </Link>
          </div>
          <ul className='mt-2'>
              {TEST_QUESTS.map( (quest, index) => 
                <li key={index} className='w-full flex items-center px-4 py-2.5 space-x-2.5'>
                  <img src={Thunder} alt='thunder' className='w-8 h-8'/>
                  <div className='w-full'>
                    <h4 className='text-base text-slate-800 font-bold'>{quest.title}</h4>
                    <progress max={quest.xp} value={user.xp} className='w-full'/>
                  </div>
                </li>
              )}
          </ul>
        </article>
    </div>
  )
}

export default Info
