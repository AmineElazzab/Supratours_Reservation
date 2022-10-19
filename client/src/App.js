import 'antd/dist/antd.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';
import PublicRoute from './components/PublicRoute';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <div className="App m-5">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ProtectedRoute> <Home /> </ProtectedRoute>} />
          <Route path="/Register" element={<PublicRoute> <Register /> </PublicRoute>} />
          <Route path="/Login" element={<PublicRoute> <Login /> </PublicRoute>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
