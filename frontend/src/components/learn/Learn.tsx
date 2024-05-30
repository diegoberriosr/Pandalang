import React, { useContext} from 'react';

// Icon imports
import { IoMdArrowBack } from "react-icons/io";

// Component imports
import Section from './Section.tsx';

// Context imports
import { StatusContext } from '../../context/StatusContext.tsx';

const Learn = () => {
  const { status } = useContext(StatusContext);

  if ( status.active_course === undefined) return; 

  return (
    <main className='w-screen absolute top-14 md:relative md:top-auto py-5 md:pt-10 pb-20 md:pb-0 flex-1 flex flex-col items-center space-y-5 px-10'>
      <header className='relative w-full h-10 flex justify-center border-b-2 text-slate-500 font-bold'>
        <IoMdArrowBack className='absolute left-0 text-xl cursor-pointer'/>
        { status.active_course.title }
      </header>
      { status.active_course.sections.map( section => <Section section={section}/>)}
    </main>
  )
}

export default Learn
