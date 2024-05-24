import React from 'react'

const ProgressBar = ({ width, percentage}) => {
  
  return (
    <div className={`h-5 rounded-full bg-slate-200 ${width} transition-all duration-300`}>
      <div className={`h-full bg-green-500 rounded-full ${percentage < 100 ? 'rounded-r-none' : ''}`}
      style={{ width : `${percentage}%`}}/>
    </div>
  )
}

export default ProgressBar
