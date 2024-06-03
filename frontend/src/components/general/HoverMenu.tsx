import React from "react";
const HoverMenu = ({children, menuItems, alignment, trianglePosition}) => {

  const [isHovered, setIsHovered] = React.useState(false); // Keep track of pop-up menu visibility

  return (
    <div className={`relative flex md:flex-col ${alignment} z-50 cursor-pointer`}
    onMouseEnter={() => { if(window.innerWidth > 768) setIsHovered(true)}} // Hover functionality is only available when screen width is over 768px
    onMouseLeave={() => { if(window.innerWidth > 768) setIsHovered(false)}} 
    onClick={() => setIsHovered(!isHovered)}>
      <div className='flex items-start md:hover:bg-slate-200 rounded-xl px-4 py-2.5'> 
        {children}  
      </div>
      { // Pop up menu
        isHovered &&
        <div className='fixed left-0 top-12 md:left-auto md:top-20 bg-white border-b-2 md:border-2 border-gray-200 md:rounded-xl w-screen md:w-auto z-50'>
          <div className={`absolute -top-2 ${trianglePosition} border-x-8 border-b-8 border-x-transparent border-slate-200`}/>
          {menuItems}
        </div>
      }
    </div>
  )
}

export default HoverMenu
