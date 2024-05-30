import React from 'react';

// UI Icon imports
import Heart from '../../assets/elements/heart.png';
import BlueHeart from '../../assets/elements/blue_heart.png';
import Thunder from '../../assets/elements/thunder.png';
import BlueInfinity from '../../assets/elements/infinity_blue.png';

// Component imports
import HoverMenu from './HoverMenu.tsx';
import CourseToggler from './CourseToggler.tsx';

// Context imports
import { StatusContext } from '../../context/StatusContext.tsx';

const UserStatus = () => {
  const { status } = React.useContext(StatusContext) // Get user information to dynamically render information like remaining hearts and active language/course
  if (status.active_course === undefined || status.enrolled_courses.length === 0) return null;

  return (
    <div className='md:left-auto mt-0 md:mt-6 w-screen md:w-[300px] md:ml-auto h-14 flex items-center justify-between z-50'>
      <HoverMenu menuItems={<CourseToggler/>}>
        <figure className='w-10 h-10 md:w-8 md:h-8'>
            <img src={status.active_course.flag} alt='active language flag' className='w-full h-full object-fit'/>
        </figure>
      </HoverMenu>
      <HoverMenu menuItems={undefined}>
        <figure className='w-8 h-8 md:w-6 md:h-6'>
            <img src={Thunder} alt='heart icon' className='w-full-h-full'/>
        </figure>
        <span className='text-lg md:text-sm text-yellow-500 ml-2.5 font-bold'>{status.available_xp}</span>
      </HoverMenu>
      <HoverMenu menuItems={undefined}>
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
