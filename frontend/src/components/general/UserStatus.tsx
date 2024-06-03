import React from 'react';

// UI Icon imports
import Heart from '../../assets/elements/heart.png';
import BlueHeart from '../../assets/elements/blue_heart.png';
import Thunder from '../../assets/elements/thunder.png';
import BlueInfinity from '../../assets/elements/infinity_blue.png';
import Flame from '../../assets/elements/flame.png';
import GrayFlame from '../../assets/elements/gray_flame.png';

// Component imports
import HoverMenu from './HoverMenu.tsx';
import CourseToggler from './CourseToggler.tsx';
import HeartsMenu from './HeartsMenu.tsx';
import XpMenu from './XpMenu.tsx';
import StreakMenu from './StreakMenu.tsx';

// Context imports
import { StatusContext } from '../../context/StatusContext.tsx';

const UserStatus = () => {
  const { status } = React.useContext(StatusContext) // Get user information to dynamically render information like remaining hearts and active language/course
  if (status.active_course === undefined || status.enrolled_courses.length === 0) return null;

  return (
    <div className='md:left-auto mt-0 md:mt-6 w-screen md:w-[350px] md:ml-auto h-14 flex items-center justify-between z-50'>
      <HoverMenu menuItems={<CourseToggler/>} alignment='items-center' trianglePosition='right-1/2'>
        <figure className='w-10 h-10 md:w-8 md:h-8'>
            <img src={status.active_course.flag} alt='active language flag' className='w-full h-full object-fit'/>
        </figure>
      </HoverMenu>
      <HoverMenu menuItems={<StreakMenu/>} alignment='items-center' trianglePosition='right-1/2'>
        <figure className='w-10 h-10 md:w-8 md:h-8'>
            <img src={status.on_streak ? Flame : GrayFlame} alt='flame' className='w-full h-full object-fit'/>
        </figure>
        <span className={`${status.on_streak ? 'text-orange-500' : 'text-slate-500'} font-bold mt-0.5`}>{status.current_streak}</span>
      </HoverMenu>
      <HoverMenu menuItems={<XpMenu/>} alignment='items-center' trianglePosition='right-1/2'>
        <figure className='w-8 h-8 md:w-6 md:h-6'>
            <img src={Thunder} alt='heart icon' className='w-full-h-full'/>
        </figure>
        <span className='text-lg md:text-sm text-yellow-500 ml-2.5 font-bold'>{status.available_xp}</span>
      </HoverMenu>
      <HoverMenu menuItems={<HeartsMenu/>} alignment='fixed left-0 md:items-end' trianglePosition='right-5'>
        <figure className='w-8 h-8 md:w-6 md:h-6'>
            <img src={ status.isPremium ? BlueHeart : Heart} alt='heart icon' className='w-full-h-full'/>
        </figure>
        <span className={`text-lg md:text-sm ${ status.is_premium ? 'text-indigo-600' : 'text-red-500'} ml-2.5 font-bold`}>
            { status.is_premium ? 
            <img src={BlueInfinity} alt='infinity' className='w-5 h-5'/>
            : 
            status.hearts}
          </span>
      </HoverMenu>
    </div>
  )
}

export default UserStatus
