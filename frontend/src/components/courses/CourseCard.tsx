import React from 'react'
import { Button } from '../general/ButtonCVA.tsx';


const CourseCard = ({ course }) => {
  return (
    <Button variant='course' className='w-44 h-48'>
        <div className='space-y-3 flex flex-col items-center normal-case'>
            <img src={course.flag} alt='course flag' className='w-16 h-16'/>
            <h4 className='font-bold'>{course.title}</h4>
        </div>
    </Button>
  )
}

export default CourseCard
