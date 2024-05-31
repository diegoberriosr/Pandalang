import React, { useState, useEffect } from 'react'
import defaultInstance from '../../axios/defaultInstance.js';

// Language flag icon imports
import English from '../../assets/languages/english.png';
import Spanish from '../../assets/languages/spanish.png';
import French from '../../assets/languages/french.png';
import German from '../../assets/languages/german.png';
import Russian from '../../assets/languages/russian.png';
import Arabic from '../../assets/languages/arabic.png';
import Mandarin from '../../assets/languages/mandarin.png';

// Component imports
import CourseCard from './CourseCard.tsx';


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
            <span>Loading</span>
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
