import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';

// Icon imports
import { CiSquarePlus } from "react-icons/ci";

// Context imports
import { StatusContext } from '../../context/StatusContext.tsx';

const CourseToggler = () => {
  const [loading, setLoading] = useState(false);
  const { status, handleChangeActiveCourse } = useContext(StatusContext);
  const navigate = useNavigate();

  const handleAddCourse = (e) => {
    e.stopPropagation();
    navigate('/enroll');
  };

  
  return (
    <div className='w-full md:w-[200px]'>
      <h5 className='px-4 py-2 uppercase text-slate-500 font-bold border-b-2 border-gray-300 text-sm'>
        My courses
      </h5>
      <ul className='w-full max-h-[150px] overflow-y-auto'>
        <li className='flex items-center justify-start space-x-2 bg-sky-200/90 text-sky-400 font-bold h-14 hover:bg-sky-200 cursor-pointer'>
            <img src={status.active_course.flag} alt='russian flag' className='ml-4 w-8 h-8 rounded-sm'/>
            <span>{status.active_course.title}</span>
        </li>
        {
          status.enrolled_courses.filter( course => course.id !== status.active_course.id).map( course => 
            <li key={course.id} className='flex items-center justify-start space-x-2 text-slate-500 h-14 hover:bg-slate-200 cursor-pointer font-bold'
            onClick={() => handleChangeActiveCourse(course.id, setLoading)}>
            <img src={course.flag} alt='french flag' className='ml-4 w-8 h-8 rounded-sm'/>
            <span>{course.title}</span>
            {loading && <span className='text-[3px]'>loading</span>}
             </li>
          )
        }
      </ul>
      <button className='w-full h-12 flex items-center justify-start space-x-2.5 pl-4 hover:bg-slate-200 transition-colors uppercase
       text-slate-500 text-sm font-bold border-t-2 border-gray-300 rounded-b-lg'
       onClick={(e) => handleAddCourse(e)}>
        <CiSquarePlus className='text-xl text-slate-400'/>
        <span>Add a new course</span>
      </button>
    </div>
  )
}


export default CourseToggler
