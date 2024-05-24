import React from 'react'
import { useNavigate } from 'react-router-dom';

// Icon imports
import { CiSquarePlus } from "react-icons/ci";
import Russian from '../../assets/languages/russian.png';
import French from '../../assets/languages/french.png';
import German from '../../assets/languages/german.png';
import Arabic from '../../assets/languages/arabic.png';

const CourseToggler = () => {
  const navigate = useNavigate();

  const handleAddCourse = (e) => {
    e.stopPropagation();
    navigate('/enroll');
  };

  return (
    <div className='w-full sm:w-[200px]'>
      <h5 className='px-4 py-2 uppercase text-slate-500 font-bold border-b-2 border-gray-300 text-sm'>
        My courses
      </h5>
      <ul className='w-full max-h-[150px] overflow-y-auto'>
        <li className='flex items-center justify-start space-x-2 bg-sky-200/90 text-sky-400 font-bold h-14 hover:bg-sky-200 cursor-pointer'>
            <img src={Russian} alt='russian flag' className='ml-4 w-8 h-8 rounded-sm'/>
            <span>Russian</span>
        </li>
        <li className='flex items-center justify-start space-x-2 text-slate-500 h-14 hover:bg-slate-200 cursor-pointer font-bold'>
            <img src={French} alt='french flag' className='ml-4 w-8 h-8 rounded-sm'/>
            <span>French</span>
        </li>
        <li className='flex items-center justify-start space-x-2 text-slate-500 h-14 hover:bg-slate-200 cursor-pointer font-bold'>
            <img src={German} alt='french flag' className='ml-4 w-8 h-8 rounded-sm'/>
            <span>German</span>
        </li>
        <li className='flex items-center justify-start space-x-2 text-slate-500 h-14 hover:bg-slate-200 cursor-pointer font-bold'>
            <img src={Arabic} alt='french flag' className='ml-4 w-8 h-8 rounded-sm'/>
            <span>Arabic</span>
        </li>
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
