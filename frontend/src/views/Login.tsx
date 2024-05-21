import React, { useState }from 'react'
import { useFormik } from 'formik';

// Icon imports
import { IoIosClose } from "react-icons/io";

// Component imports
import { Button } from '../components/general/ButtonCVA.tsx';

const Login = ({ handleVisibility, handleRegisterVisibily }) => {

  const [loading, setLoading] = useState<boolean>(false);

  const { values, handleChange, handleBlur} = useFormik({
    initialValues : {
        'username' : '',
        'password' : ''
    }
  });

  const handleSubmit = (guest) => {
    
    if (guest) { // Attempt to log as a guest if guest == True.
      console.log({ username : 'username'});
      return;
    };

    if ( values.username.length === 0 || values.password.length === 0) return; // Only make a request if username and password fields are not null
    setLoading(true);
    console.log(values);
    setLoading(false);
  };

  return (
    <div className='absolute w-screen h-screen inset-0 bg-gray-900 text-white z-50'>
      <div className='w-full flex items-start justify-between px-5 pt-7'>
        <IoIosClose className='text-4xl text-slate-600 font-bold cursor-pointer ' onClick={() => { handleVisibility(false)}}/>
        <Button variant='loginTransparent' size='info' className='w-36 hidden sm:block'
        onClick={() => { handleRegisterVisibily(true); handleVisibility(false);}}>Register</Button>
      </div>
      <div className='mt-8 w-full bg-gray-900 pb-5 flex flex-col items-center '>
        <h1 className='text-2xl font-bold'>Log in</h1>
        <form className='mt-9 w-full md:w-auto px-8 md:px-0' onSubmit={() => handleSubmit(false)}>
            <div className='w-full md:w-80 h-11 flex items-center bg-gray-800 border border-slate-600 rounded-xl px-5'>
                <input 
                value={values.username} name='username'
                type='text' placeholder='Username or e-mail' className='w-full h-full bg-transparent focus:outline-none placeholder-slate-200'
                onChange={handleChange} onBlur={handleBlur}/>
            </div>
            <div className='mt-4 w-full md:w-80 h-11 flex items-center bg-gray-800 border border-slate-600 rounded-xl px-5'>
                <input 
                value={values.password} name='password'
                type='password' placeholder='Password' className='w-9/12 h-full bg-transparent focus:outline-none placeholder-slate-200'
                onChange={handleChange} onBlur={handleBlur}/>
                <span className='w-3/12 h-full tracking-wide text-sm text-slate-600 hover:text-slate-300 font-bold flex items-center uppercase cursor-pointer'>
                    forgot?
                </span>
            </div>
            <Button disabled={values.username.length === 0 || values.password.length === 0 || loading } type='submit' variant='loginPrimary' size='info' className='w-full md:w-80 mt-7'>Log in</Button>
        </form>
        <Button disabled={loading} type='submit' variant='loginPrimary' size='info' className='w-full md:w-80 mt-7'>Log in as guest</Button>
        <div className='relative mt-7 w-full md:w-80 flex justify-center items-center px-9 md:px-0'>
            <span className='absolute -top-2  bg-gray-900 text-slate-600 font-bold uppercase tracking-wide w-10 text-center'>Or</span>
            <div className='h-1 w-full border-t-2 border-slate-600 mt-1'/>
        </div>
        <div className='mt-7 flex items-center space-x-4'>
           <Button type='button' variant='loginTransparent' size='info' className='w-36 sm:w-72 md:w-36'>
              <img src="https://devicon-website.vercel.app/api/facebook/original.svg" alt='apple logo' className='w-6 h-6 mt-1'/>
              <span className='ml-2.5'>Facebook</span>
              </Button>
            <Button type='button' variant='loginTransparent' size='info' className='w-36 sm:w-72 md:w-36'>
              <img src="https://devicon-website.vercel.app/api/google/original.svg" className='w-5 h-5 mt-1' alt='google logo'/>
              <span className='ml-2.5'>Google</span>
              </Button>
        </div>
        <p className='mt-10 text-slate-600 text-sm text-center w-[70%] sm:w-[50%] lg:w-[400px]'>By signing to Pandalang you agree to our <a className='font-bold' href='#' target='_blank'>Terms</a> and <a className='font-bold' href='#' target='_blank'>Privacy Policy</a>.</p>
        <p className='mt-5 text-slate-600 text-sm text-center w-[60%] sm:w-[45%] lg:w-[350px]'>This site is protected by reCAPTCHA Enterprise and the Google Privacy Policy and the Terms of Service apply.</p>
        <p className='font-bold text-lg mt-5 sm:hidden'>Don't have an account? <span className='uppercase tracking-wide text-sky-400' onClick={() => { handleRegisterVisibily(true); handleVisibility(false);}}>Register</span></p>
      </div>
    </div>
  )
}

export default Login
