
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Dashboard from './views/Dashboard.tsx';
import Landing from './views/Landing.tsx';
import Practice from './views/Practice.tsx';

// Provider imports
import AuthProvider from './context/AuthContext.tsx';
import { StatusProvider } from './context/StatusContext.tsx';

function App() {
  return (
    <Router>
      <StatusProvider>
      <AuthProvider>
            <Routes>
                <Route element={<Dashboard/>} path='/*'/>
                <Route element={<Landing/>} path='/'/>
                <Route element={<Practice practice/>} path='/practice'/>
                <Route element={<Practice/>} path='/lesson/:lessonId'/>
            </Routes>
       </AuthProvider>
      </StatusProvider>
    </Router>
  );
}

export default App;
