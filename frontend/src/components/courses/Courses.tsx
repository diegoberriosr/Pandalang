import React from 'react'

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

const TEST_COURSES : Course[] = [
    {
        id : 1,
        title : 'English',
        flag : English
    },
    {
        id : 2,
        title : 'Spanish',
        flag : Spanish
    },
    {
        id : 3,
        title : 'French',
        flag : French
    },
    {
        id : 4,
        title : 'German',
        flag : German
    },
    {
        id : 5,
        title : 'Russian',
        flag : Russian
    },
    {
        id : 6,
        title : 'Arabic',
        flag : Arabic
    },
    {
        id : 7,
        title : 'Mandarin',
        flag : Mandarin
    }
];

const Courses = () => {
  return (
    <main className='py-5 flex-1 flex flex-col px-32'>
      <h3 className='text-2xl font-bold text-slate-800'>Language Courses</h3>
      <div className='mt-5 flex flex-wrap gap-10'>
        {TEST_COURSES.map( course => 
            <CourseCard key={course.title} course={course}/>
        )}
      </div>
    </main>
  )
}

export default Courses
