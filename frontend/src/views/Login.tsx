import React from 'react'
import { Button } from '../components/general/ButtonCVA.tsx';

const Login = ({ isVisible, handleVisibility }) => {
  if (!isVisible) return; // Only render when required

  return (
    <div className='absolute w-screen h-screen inset-0 bg-slate-800 text-white z-50'>
      <div className='w-full flex items-start justify-between px-11 pt-7'>
        <span onClick={() => handleVisibility(false)}>X</span>
        <Button variant='loginTransparent' size='info' className='w-36'>Register</Button>
      </div>
      <div className='mt-2 w-full flex flex-col items-center'>
        <h1 className='text-2xl font-bold'>Log in</h1>
        <form className='mt-10 space-y-5'>
            <div className='w-80 h-10 flex items-center bg-gray-600 border border-slate-400 rounded-xl px-5'>
                <input type='text' placeholder='Username or e-mail' className='w-full h-full bg-transparent focus:outline-none'/>
            </div>
            <div className='w-80 h-10 flex items-center bg-gray-600 border border-slate-400 rounded-xl px-5'>
                <input type='password' placeholder='Password' className='w-9/12 h-full bg-transparent focus:outline-none'/>
                <span className='w-3/12 h-full tracking-wide text-md flex items-center uppercase mr-5'>
                    forgotten?
                </span>
            </div>
            <Button type='submit' variant='loginPrimary' size='info' className='w-80'>Log in</Button>
        </form>
        <div className='relative mt-5 w-80 flex justify-center items-center'>
            <span className='absolute -top-2  bg-slate-800 text-white uppercase tracking-wide w-10 text-center'>Or</span>
            <div className='h-1 w-80 border-t-2 border-slate-500 mt-1'/>
        </div>
        <div className='mt-5 flex items-center space-x-4'>
            <Button type='button' variant='loginTransparent' className='w-36'>Google</Button>
            <Button type='button' variant='loginTransparent' className='w-36'>Apple</Button>
        </div>
      </div>
    </div>
  )
}

export default Login
