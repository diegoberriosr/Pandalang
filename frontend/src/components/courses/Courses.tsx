import React, { useState, useEffect } from 'react'
import defaultInstance from '../../axios/defaultInstance.js';

// Component imports
import CourseCard from './CourseCard.tsx';
import { MoonLoader } from 'react-spinners';

type Course = {
    id : number,
    title : string,
    flag : string
};

const Courses = () => {
  const [courses, setCourses] = useState<Course>([]);
  const [loading, setLoading] = useState<boolean>(true);
  

  useEffect( () => {
    defaultInstance.get('courses')
    .then( res => {
        console.log(res.data);
        setCourses(res.data);
        setLoading(false);
    })
    .catch( err => {
        console.log(err);
        setLoading(false);
    });
  }, []);

  return (
    <main className='py-5 flex-1 flex flex-col px-32'>
      <h3 className='text-2xl font-bold text-slate-800'>Language Courses</h3>
      {
        loading ?
        <div className='w-full h-full flex items-center justify-center'>
            <MoonLoader loading={loading} size={75} color='#22c55e'/>
        </div>
        :
        <div className='mt-5 flex flex-wrap gap-10'>
            {courses.map( course => 
                <CourseCard key={course.title} course={course} setLoading={setLoading}/>
            )}
        </div>
      }
    </main>
  )
}

export default Courses
