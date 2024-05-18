import {Routes, Route} from 'react-router-dom'

import Sidebar from '../components/general/Sidebar';

const Dashboard = () => {
  return (
    <div className='flex w-screen'>
      <Sidebar/>
      <Routes>
        <Route path='learn'/>
        <Route path='practice'/>
        <Route path='leaderboard'/>
        <Route path='shop'/>
      </Routes>
    </div>
  )
}

export default Dashboard
