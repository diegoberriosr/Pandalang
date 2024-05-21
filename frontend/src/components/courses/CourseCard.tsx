import React from 'react'
import { Button } from '../general/ButtonCVA'


const CourseCard = ({ course }) => {
  return (
    <Button variant='course'>
        <div className='space-y-3'>
            <img src={course.flag} alt='course flag' className='w-10 h-10'/>
            <h4 className='font-bold'>{course.title}</h4>
        </div>
    </Button>
  )
}

export default CourseCard
