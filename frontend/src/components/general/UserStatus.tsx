import React from 'react';

// UI Icon imports
import Heart from '../../assets/elements/heart.png';
import BlueHeart from '../../assets/elements/blue_heart.png';
import Thunder from '../../assets/elements/thunder.png';
import BlueInfinity from '../../assets/elements/infinity_blue.png';

// Language flag icon imports
import English from '../../assets/languages/english.png';
import Spanish from '../../assets/languages/spanish.png';
import French from '../../assets/languages/french.png';
import German from '../../assets/languages/german.png';
import Russian from '../../assets/languages/russian.png';
import Arabic from '../../assets/languages/arabic.png';
import Mandarin from '../../assets/languages/mandarin.png';

// Component imports
import HoverMenu from './HoverMenu.tsx';
import CourseToggler from './CourseToggler.tsx';
// Context imports
import { AuthContext } from '../../context/AuthContext.tsx';

const LANGUAGE_FLAGS = { // A list of language flags in .png format
    'english' : English,
    'spanish' : Spanish,
    'french' : French,
    'german' : German,
    'russian' : Russian,
    'arabic' : Arabic,
    'mandarin' : Mandarin
};

const UserStatus = () => {
  const { user } = React.useContext(AuthContext) // Get user information to dynamically render information like remaining hearts and active language/course

  return (
    <div className='md:left-auto mt-0 md:mt-6 w-screen md:w-[300px] md:ml-auto h-14 flex items-center justify-between z-50'>
      <HoverMenu menuItems={<CourseToggler/>}>
        <figure className='w-10 h-10 md:w-8 md:h-8'>
            <img src={LANGUAGE_FLAGS[user.active_course.title]} alt='active language flag' className='w-full h-full object-fit'/>
        </figure>
      </HoverMenu>
      <HoverMenu menuItems={undefined}>
        <figure className='w-8 h-8 md:w-6 md:h-6'>
            <img src={Thunder} alt='heart icon' className='w-full-h-full'/>
        </figure>
        <span className='text-lg md:text-sm text-yellow-500 ml-2.5 font-bold'>{user.available_xp}</span>
      </HoverMenu>
      <HoverMenu menuItems={undefined}>
        <figure className='w-8 h-8 md:w-6 md:h-6'>
            <img src={ user.isPremium ? BlueHeart : Heart} alt='heart icon' className='w-full-h-full'/>
        </figure>
        <span className={`text-lg md:text-sm ${ user.isPremium ? 'text-indigo-600' : 'text-red-500'} ml-2.5 font-bold`}>
            { user.isPremium ? 
            <img src={BlueInfinity} alt='infinity' className='w-5 h-5'/>
            : 
            user.hearts}
          </span>
      </HoverMenu>
    </div>
  )
}

export default UserStatus
