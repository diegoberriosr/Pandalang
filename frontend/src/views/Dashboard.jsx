import {Routes, Route} from 'react-router-dom'
import { useLocation } from 'react-router-dom';

// Component imports
import Sidebar from '../components/general/Sidebar.tsx';
import Bottombar from '../components/general/Bottombar.tsx';
import UserStatus from '../components/general/UserStatus.tsx';
import Info from '../components/general/Info.tsx';
import Learn from './Learn.tsx';
import Shop from './Shop.tsx';
import Quests from './Quests.tsx';
import Leaderboard from './Leaderboard.tsx';

// Provider imports
import AuthProvider from '../context/AuthContext';

const Dashboard = () => {
  
  // Get current path
  const location = useLocation();
  const currentUrl = location.pathname;
  
  return (
    <AuthProvider>
      <div className='flex w-screen xl:pr-36 md:pr-10'>
        <Sidebar currentUrl={currentUrl}/>
          <Routes>
            <Route path='learn' element={<Learn/>}/>
            <Route path='quests' element={<Quests/>}/>
            <Route path='shop' element={<Shop/>}/>
            <Route path='leaderboard' element={<Leaderboard/>}/>
          </Routes>
        <div>
          <UserStatus/>
          <Info/>
        </div>
        <Bottombar currentUrl={currentUrl}/>
      </div>
    </AuthProvider>
  )
}

export default Dashboard
