import { Link } from "react-router-dom";

const NavbarLink = ({displayText, element, currentUrl}) => {
  return (
    <li className={`uppercase font-bold text-sm border-2
    ${currentUrl === element.path ? 'bg-sky-100  border-sky-300 text-blue-400' : 'text-gray-500 hover:bg-slate-100 border-transparent'} rounded-xl`}>
        <Link to={element.path}>
        <div className='md:mt-2 px-4 py-2.5 sm:py-1 md:py-2.5 flex items-center'>
            <figure className='mx-auto w-10 h-10 sm:w-14 sm:h-14 md:w-8 md:h-8 lg:mx-0'>
            <img src={element.slug} alt={element.slugAlt} className='w-full h-full object-fit'/>
            </figure>
            { displayText && <span className='hidden lg:block lg:ml-5'>{element.name}</span> }
        </div>
    </Link>
    </li>
  )
}

export default NavbarLink
