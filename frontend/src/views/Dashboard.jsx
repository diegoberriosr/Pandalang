import {Routes, Route} from 'react-router-dom'
import { useLocation } from 'react-router-dom';

import Sidebar from '../components/general/Sidebar';
import Bottombar from '../components/general/Bottombar';
import UserStatus from '../components/general/UserStatus';

import AuthProvider from '../context/AuthContext';

const Dashboard = () => {
  
  // Get current path
  const location = useLocation();
  const currentUrl = location.pathname;
  
  return (
    <AuthProvider>
      <div className='flex w-screen md:pr-36'>
        <Sidebar currentUrl={currentUrl}/>
          <Routes>
            <Route path='learn'/>
            <Route path='practice'/>
            <Route path='leaderboard'/>
            <Route path='shop'/>
          </Routes>
        <UserStatus/>
        <Bottombar currentUrl={currentUrl}/>
      </div>
    </AuthProvider>
  )
}

export default Dashboard
