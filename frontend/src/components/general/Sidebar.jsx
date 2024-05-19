import URLS from '../../constants.js';
import NavbarLink from "./NavbarLink.jsx";

const Sidebar = ({ currentUrl }) => {
  

  return (
    <aside className='hidden pt-6 md:block md:sticky md:inset-0 md:w-[87px] md:px-2 lg:w-[255px] lg:px-4 h-screen border-r-2 border-gray-200 '>
      <h4 className='hidden lg:block ml-3 text-2xl font-bold tracking-wide text-slate-800'>Pandalang</h4>
      <nav className='mt-8'>
        <ul>
          { URLS.map( url => <NavbarLink element={url} currentUrl={currentUrl} displayText/>)}
        </ul>
      </nav>
    </aside>
  )
}

export default Sidebar
