import React, { useContext, useEffect } from 'react';
import {Routes, Route} from 'react-router-dom'
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

// Component imports
import Sidebar from '../components/general/Sidebar.tsx';
import Bottombar from '../components/general/Bottombar.tsx';
import UserStatus from '../components/general/UserStatus.tsx';
import Info from '../components/general/Info.tsx';
import Learn from '../components/learn/Learn.tsx';
import Shop from '../components/shop/Shop.tsx';
import Quests from '../components/quests/Quests.tsx';
import Leaderboard from '../components/leaderboard/Leaderboard.tsx';
import Courses from '../components/courses/Courses.tsx';

// Context imports
import { AuthContext } from '../context/AuthContext.tsx';


const Dashboard = () => {

  // Get current path
  const location = useLocation();
  const currentUrl = location.pathname;
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  useEffect( () => {
    if (user.enrolled_courses.length === 0 && currentUrl !== '/enroll') navigate('/enroll');
  }, [currentUrl])

  return (
      <div className='flex w-screen xl:pr-36 md:pr-10'>
        <Sidebar currentUrl={currentUrl}/>
          <Routes>
            <Route path='learn' element={<Learn/>}/>
            <Route path='quests' element={<Quests/>}/>
            <Route path='shop' element={<Shop/>}/>
            <Route path='leaderboard' element={<Leaderboard/>}/>
            <Route path='enroll' element={<Courses/>}/>
          </Routes>
        { currentUrl !== '/enroll' && 
        <div>
          <UserStatus/>
          <Info/>
        </div>
        }
        <Bottombar currentUrl={currentUrl}/>
      </div>
  )
}

export default Dashboard
