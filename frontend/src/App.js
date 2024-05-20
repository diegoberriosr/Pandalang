
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Dashboard from './views/Dashboard.jsx';
import Landing from './views/Landing.tsx';
function App() {
  return (
    <Router>
      <Routes>
          <Route element={<Dashboard/>} path='/*'/>
          <Route element={<Landing/>} path='/'/>
      </Routes>
    </Router>
  );
}

export default App;
