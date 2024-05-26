import React, { useContext } from 'react';

// Icon imports
import { SlNotebook } from "react-icons/sl";

// Component imports
import { Header } from './HeaderCVA.tsx';
import { Button } from '../general/ButtonCVA.tsx';
import LessonButton from './LessonButton.tsx';

// Context imports
import { AuthContext } from '../../context/AuthContext.tsx';

const Section = ({ section }) => {
    const { user } = useContext(AuthContext);
    const odd : boolean = (section.number_in_course % 2 ) > 0;
    console.log(user.active_course.current_lesson);
  
  return (
    <section className='w-full flex flex-col items-center justify-center'>
        <Header variant={section.variant}>
            <div className='flex flex-col items-start'>
                <p className='uppercase text-md'>Section {section.number_in_course}</p>
                <p className='font-bold text-lg'>{section.description}</p>
            </div>
            <Button variant={section.variant} className='space-x-2.5'>
                <SlNotebook className='text-2xl'/>
                <span>Notebook</span>
            </Button>
        </Header>
        <ul className='w-full flex flex-col items-center'>
            { section.lessons.map( (lesson, index) =>
                <LessonButton id={lesson.id} styling={`
                ${ (index + 1)  === 1 ? 'mt-6' : ''}
                ${ (index + 1) % 2 === 0 ? `mt-6 ${odd ? 'ml-20' : 'mr-20'} ` : ''}
                ${ (index + 1) % 3 === 0 ? `mt-6 ${odd ? 'ml-32' : ' mr-32'} ` : ''} 
                ${ (index + 1) % 5 === 0 ? 'mt-6' : ''}
                `} variant={lesson.number_in_course > user.active_course.current_lesson ? 'unavailable' : section.variant} disabled={lesson.number_in_course > user.active_course.current_lesson} 
                current={lesson.number_in_course === user.active_course.current_lesson} review={lesson.review}/>
             )}
        </ul>
    </section>
  )
}

export default Section
