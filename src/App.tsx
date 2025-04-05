import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Products from './components/pages/Menu';
import { AdminDashboard } from './components/pages/AdminDashboard';
import LoginAdmin from './components/pages/LoginAdmin';
import Page404 from './components/pages/Page404';
function App() {

  return (
  <>
    <Router>
      <Routes>
        <Route path="/" element={<Products  />}  />
        <Route path="/*" element={<Page404 />} />
        <Route path="/auth/login" element={<LoginAdmin />} />
        <Route path="/admindashboard" element={<AdminDashboard />} />
      </Routes>
    </Router>
  </>
  );
}

export default App;
