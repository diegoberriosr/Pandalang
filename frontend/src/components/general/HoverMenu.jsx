import { useState } from 'react';

const HoverMenu = ({children, hoverMenu}) => {

  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className='md:relative flex md:flex-col items-center'>
      <div className='flex items-start md:hover:bg-slate-200 rounded-xl px-4 py-2.5' 
      onMouseEnter={() => setIsHovered(true)} 
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => setIsHovered(!isHovered)}>
        {children}
      </div>
      {
        isHovered &&
        <div className='absolute left-0 md:left-auto md:absolute top-14 md:top-auto md:-bottom-20 border-b-2 md:border-2 border-gray-200 md:rounded-xl w-screen md:w-20 md:h-20'>
          TO-DO
        </div>
      }
    </div>
  )
}

export default HoverMenu
