import React from 'react';
import URLS from '../../constants';

import NavbarLink from './NavbarLink.tsx';
const Bottombar = ({ currentUrl }) => {
  return (
    <footer className='fixed bottom-0 md:hidden w-screen h-20 border-t-2 bg-white border-gray-200 py-2'>
      <nav>
        <ul className='flex items-center justify-evenly px-1'>
            {URLS.map( url => <NavbarLink key={url.name} element={url} currentUrl={currentUrl} displayText={false}/>)}
        </ul>
      </nav>
    </footer>
  )
}

export default Bottombar
