import React from 'react'
import { useNavigate } from 'react-router-dom';

// Component imports
import { Button } from '../general/ButtonCVA.tsx';

// Icon imports
import { FaStar } from "react-icons/fa";
import { FaCrown } from "react-icons/fa";
import StartAlert from './StartAlert.tsx';

const LessonButton = ({ id, styling, variant, disabled, current, final}) => {
  const navigate = useNavigate();

  return (
    <div className={`${styling} relative`}>
      <Button disabled={disabled} variant={variant} size='rounded' className='h-20 w-20' onClick={() => navigate(`/lesson/${id}`)}>
          { current && <StartAlert />}
          { final ? <FaCrown className='text-2xl'/> : <FaStar className='text-2xl'/>}
       </Button>
    </div>
  )
}

export default LessonButton
