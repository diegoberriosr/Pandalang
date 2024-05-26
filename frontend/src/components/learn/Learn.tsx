import React from 'react';

// Icon imports
import { IoMdArrowBack } from "react-icons/io";

// Component imports
import { Button } from '../general/ButtonCVA.tsx';
import { Header } from './HeaderCVA.tsx';
import Section from './Section.tsx';


type Lesson = {
  id : number,
  number_in_course : number,
  variant : string,
  review : boolean
};

type SectionType = {
  id : number,
  number_in_course : number,
  description : string,
  lessons : Lesson[]
};

const TEST_SECTIONS : SectionType[] = [
  {

      id : 1,
      number_in_course : 1,
      description : 'Learn basic words',
      variant : 'secondary',
      lessons : [
          { id : 1, number_in_course : 1, review : false},
          { id : 2, number_in_course : 2, review : false},
          { id : 3, number_in_course : 3, review : false},
          { id : 4, number_in_course : 4, review : false},
          { id : 5, number_in_course : 5, review : true},
      ]
  },
  {

    id : 2,
    number_in_course : 2,
    description : 'Learn more basic words',
    variant : 'primary',
    lessons : [
        { id : 6, number_in_course : 6, review : false},
        { id : 7, number_in_course : 7, review : false},
        { id : 8, number_in_course : 8, review : false},
        { id : 9, number_in_course : 9, review : false},
        { id : 10, number_in_course : 10, review : true},
    ]
},
{

  id : 3,
  number_in_course : 3,
  description : 'Learn family words',
  variant : 'tertiary',
  lessons : [
      { id : 11, number_in_course : 11, review : false},
      { id : 12, number_in_course : 12, review : false},
      { id : 13, number_in_course : 13, review : false},
      { id : 14, number_in_course : 14, review : false},
      { id : 15, number_in_course : 15, review : true},
  ]
},
];


const Learn = () => {

  return (
    <main className='w-screen absolute top-14 md:relative md:top-auto py-5 md:pt-10 pb-20 md:pb-0 flex-1 flex flex-col items-center space-y-5 px-10'>
      <header className='relative w-full h-10 flex justify-center border-b-2 text-slate-500 font-bold'>
        <IoMdArrowBack className='absolute left-0 text-xl cursor-pointer'/>
        Russian
      </header>
      { TEST_SECTIONS.map( section => <Section section={section}/>)}
    </main>
  )
}

export default Learn
