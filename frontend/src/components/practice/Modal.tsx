import React from 'react'

const Modal = ( { isVisible, children }) => {
  if (!isVisible) return null;

  return (
    <div className='fixed inset-0 w-screen h-screen backdrop-blur-md bg-slate-800 bg-opacity-50 z-50 flex items-center justify-center'>
      {children}
    </div>
  )
}

export default Modal
