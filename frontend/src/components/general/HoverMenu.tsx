import React from "react";
const HoverMenu = ({children, hoverMenu}) => {

  const [isHovered, setIsHovered] = React.useState(false); // Keep track of pop-up menu visibility

  return (
    <div className='md:relative flex md:flex-col items-center'>
      <div className='flex items-start md:hover:bg-slate-200 rounded-xl px-4 py-2.5'
      onMouseEnter={() => { if(window.innerWidth > 768) setIsHovered(true)}} // Hover functionality is only available when screen width is over 768px
      onMouseLeave={() => { if(window.innerWidth > 768) setIsHovered(false)}} 
      onClick={() => setIsHovered(!isHovered)}> 
        {children}  
      </div>
      { // Pop up menu
        isHovered &&
        <div className='absolute left-0 md:left-auto md:absolute top-14 md:top-auto md:-bottom-24 border-b-2 md:border-2 border-gray-200 md:rounded-xl w-screen md:w-20 md:h-20'>
          <div className='absolute -top-2 right-1/2 border-x-8 border-b-8 border-x-transparent border-slate-200'/>
        </div>
      }
    </div>
  )
}

export default HoverMenu
