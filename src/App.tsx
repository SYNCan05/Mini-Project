import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Products from './components/pages/Products';
import { AdminDashboard } from './components/pages/AdminDashboard';
import LoginAdmin from './components/pages/LoginAdmin';
function App() {

  return (
  <>
    <Router>
      <Routes>
        <Route path="/" element={<Products  />}  />
        {/* <Route path="/products:id" element={<Products />} /> */}
        <Route path="/loginadmin" element={<LoginAdmin />} />
        <Route path="/admindashboard" element={<AdminDashboard />} />
      </Routes>
    </Router>
  </>
  );
}

export default App;
