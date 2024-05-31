import React, { useState, useContext } from 'react'
import { Button } from '../general/ButtonCVA.tsx';
import { StatusContext } from '../../context/StatusContext.tsx';

const CourseCard = ({ course, setLoading}) => {
  const { handleEnrollCourse } = useContext(StatusContext);
  return (
    <Button variant='course' className='w-44 h-48' onClick={() => handleEnrollCourse(course.id, setLoading)}>
        <div className='space-y-3 flex flex-col items-center normal-case'>
            <img src={course.flag} alt='course flag' className='w-16 h-16'/>
            <h4 className='font-bold'>{course.title}</h4>
            <h5 className='text-sm text-slate-500'>{course.learners}  learners</h5>
        </div>
    </Button>
  )
}

export default CourseCard
