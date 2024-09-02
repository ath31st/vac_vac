import { Routes, Route } from 'react-router-dom';
import Signup from './pages/Signup';
import NotFoundPage from './pages/NotFoundPage';
import Layout from './components/Layout';
import Vacancies from './pages/Vacancies';
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import PrivateRoute from './components/PrivateRoute';
import CreateVacancy from './pages/CreateVacancy';
import ActiveVacancies from './pages/ActiveVacancies';
import MyVacancies from './pages/MyVacancies';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/vacancies"
            element={<PrivateRoute element={<Vacancies />} />} />
          <Route path="/my-vacancies"
            element={<PrivateRoute element={<MyVacancies />} />} />
          <Route path="/active-vacancies"
            element={<PrivateRoute element={<ActiveVacancies />} />} />
          <Route path="/create-vacancy"
            element={<PrivateRoute element={<CreateVacancy />} />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
