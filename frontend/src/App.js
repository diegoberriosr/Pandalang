import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Dashboard from './views/Dashboard.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Dashboard/>} path='/*'/>
      </Routes>
    </Router>
  );
}

export default App;
