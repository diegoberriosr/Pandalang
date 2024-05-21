import React from 'react'

const Register = ({ isVisible, handleVisibility }) => {
  if (!isVisible) return;

  return (
    <div className='absolute w-screen h-screen inset-0 bg-slate-800 text-white z-50'>
      <button onClick={() => handleVisibility(false)}>Close</button>
    </div>
  )
}

export default Register
