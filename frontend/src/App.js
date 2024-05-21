
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Dashboard from './views/Dashboard.tsx';
import Landing from './views/Landing.tsx';
import Practice from './views/Practice.tsx';

// Provider imports
import AuthProvider from './context/AuthContext.tsx';

function App() {
  return (
    <AuthProvider>
        <Router>
          <Routes>
              <Route element={<Dashboard/>} path='/*'/>
              <Route element={<Landing/>} path='/'/>
              <Route element={<Practice/>} path='/practice/*'/>
          </Routes>
        </Router>
    </AuthProvider>
  );
}

export default App;
