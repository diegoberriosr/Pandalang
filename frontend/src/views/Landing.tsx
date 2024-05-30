import React, { useState } from 'react'

// Icon imports
import Earth from '../assets/elements/earth.png';

// Language flag icon imports
import English from '../assets/languages/english.png';
import Spanish from '../assets/languages/spanish.png';
import German from '../assets/languages/german.png';
import French from '../assets/languages/french.png';
import Russian from '../assets/languages/russian.png';
import Arabic from '../assets/languages/arabic.png';
import Mandarin from '../assets/languages/mandarin.png';

// Component imports
import { Button } from '../components/general/ButtonCVA.tsx'
import Login from './Login.tsx';
import Register from './Register.tsx';

type Languages = {
    title : string,
    flag : string
}

const AVAILABLE_COURSES : Languages[] = [ // List of available courses with their names and flags
    { title : 'English' , flag : English},
    { title : 'Spanish', flag : Spanish},
    { title : 'German', flag : German},
    { title : 'French', flag : French},
    { title : 'Russian', flag : Russian},
    { title : 'Arabic', flag : Arabic},
    { title : 'Mandarin', flag : Mandarin}
];

const Logo = () => {
    return (
        <figure className='relative my-10 lg:my-0'>
            <img src={Earth} alt='earth' className='w-40 lg:w-56 h-40 lg:h-56'/>
        </figure>
    )
}

const Landing = () => {
  const [loginModal, setLoginModal] = useState<boolean>(false); // Keeps track of the visibility of login menu
  const [registerModal, setRegisterModal] = useState<boolean>(false); // Keeps track of the visibility of the register menu

  return (
    <>
      { loginModal && <Login handleVisibility={setLoginModal} handleRegisterVisibily={setRegisterModal}/>}
      { registerModal && <Register handleVisibility={setRegisterModal} handleLoginVisibility={setLoginModal}/>}
      <header className='w-screen h-16 flex items-center justify-center md:justify-between lg:justify-between md:px-[5%] lg:px-[18%] pt-3'>
        <h1 className='text-2xl font-bold'>Pandalang</h1>
        <Button variant='secondary' className='w-36 hidden md:block lg:hidden'
        onClick={() => setLoginModal(true)}>
            Start
        </Button>
      </header>
      <main className='w-screen flex flex-col min-h-[500px] lg:flex-row justify-center items-center lg:justify-between md:px-[5%] lg:px-[18%]'
      style={{ height : 'calc(100vh - 144px)'}}>
        <Logo/>
        <div className='flex flex-col items-center'>
            <h2 className='text-3xl text-slate-700 font-bold w-7/12 text-center'>Learn, practice, and master new languages with Pandalang!</h2>
            <Button variant='secondary' size='info' className='mt-10 w-80'
            onClick={() => setRegisterModal(true)}>Start learning</Button>
            <Button variant='transparent' size='info' className='mt-5 w-80'
            onClick={() => setLoginModal(true)}>I already have an account</Button>
        </div>
      </main>
      <footer className='w-screen h-20 border-t-2 border-slate-300 md:px-[5%] lg:px-[18%] py-2.5 hidden xl:block'>
        <ul className='w-full h-full flex justify-start items-center space-x-20'>
            { AVAILABLE_COURSES.map( language => 
               <li key={language.title} className='flex items-center space-x-2'>
                <img src={language.flag} alt={language.title} className='w-6 h-6 lg:w-10 lg:h-10'/>
                <span className='text-slate-500 uppercase font-bold tracking-wide text-sm'>{language.title}</span>
               </li> 
            )}
        </ul>
      </footer>
    </>
  )
}

export default Landing
