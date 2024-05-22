import React, { useContext } from 'react';

// Icon imports
import { IoIosClose } from "react-icons/io";
import Heart from '../../assets/elements/heart.png';
import BlueHeart from '../../assets/elements/blue_heart.png';
import Infinity from '../../assets/elements/infinity_red.png';
import InfinityBlue from '../../assets/elements/infinity_blue.png';

// Component imports
import ProgressBar from '../general/ProgressBar.tsx';

// Context imports
import { AuthContext } from '../../context/AuthContext.tsx';

const PracticeHeader = ({ practice, progress, setQuitModal}) => {
  
  const { user } = useContext(AuthContext);

  return (
    <header className='w-screen flex items-center justify-between h-10 px-2.5 sm:px-10 md:px-20 lg:px-40'>
        <IoIosClose className='text-4xl text-gray-400' onClick={() => setQuitModal(true)}/>
        <ProgressBar width='w-[70%] sm:w-[90%]' percentage={progress}/>
        <figure className='flex items-center space-x-2.5'>
            <img src={ user.isPremium ? BlueHeart : Heart} alt='heart' className='w-5 h-5'/>
            { user.isPremium ?
                <img src={InfinityBlue} alt='infinity' className='w-5 h-5'/>
                :
                <span className='text-red-500'>
                    { practice ?
                    <img src={Infinity} alt='infinity' className='w-5 h-5'/>
                    :
                    user.hearts
                    }
                </span>
            }
        </figure>
    </header>
  )
}

export default PracticeHeader
