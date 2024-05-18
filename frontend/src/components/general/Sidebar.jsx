import { Link, useLocation } from "react-router-dom"
import House from '../../assets/elements/house.png';
import Dart from '../../assets/elements/dart.png';
import Medal from '../../assets/elements/medal.png';
import Shop from '../../assets/elements/shop.png';


const URLS = [
    {
        path : '/learn',
        name : 'Learn',
        slug : House,
        slugAlt : 'house'
    },
    {
        path : '/practice',
        name : 'Practice',
        slug : Dart,
        slugAlt : 'dart practice'
    },
    {
        path : '/quests',
        name : 'Quests',
        slug : Medal,
        slugAlt : 'medal'
    },
    {
        path : '/shop',
        name : 'Shop',
        slug : Shop,
        slugAlt : 'store'
    }
]

const Sidebar = () => {
  
  // Get current path
  const location = useLocation();
  const currentUrl = location.pathname;

  return (
    <aside className='hidden pt-6 md:block md:sticky md:inset-0 md:w-[87px] md:px-2 lg:w-[255px] lg:px-4 h-screen border-r-2 border-gray-200 '>
      <h4 className='hidden lg:block ml-3 text-2xl font-bold tracking-wide text-slate-800'>Pandalang</h4>
      <nav>
        <ul>
            { URLS.map( url => <li key={url.path} className={`px-3 py-3.5 uppercase font-bold text-sm
            ${currentUrl === url.path ? 'bg-sky-100 border-2 border-sky-300 text-blue-400' : 'text-gray-500 hover:bg-slate-100'} rounded-xl`}>
                <Link to={url.path}>
                  <div className='flex items-center'>
                      <figure className='mx-auto w-8 h-8 lg:mx-0'>
                        <img src={url.slug} alt={url.slugAlt} className='w-full h-full object-fit'/>
                      </figure>
                      <span className='hidden lg:block lg:ml-5'>{url.name}</span>
                  </div>
                </Link>
            </li>)}
        </ul>
      </nav>
    </aside>
  )
}

export default Sidebar
