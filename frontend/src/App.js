import { Routes, Route } from 'react-router-dom'
import Signup from './pages/Signup'
import NotFoundPage from './pages/NotFoundPage'
import Layout from './components/Layout'
import Vacancies from './pages/Vacancies'
import HomePage from './pages/HomePage'
import Login from './pages/Login'

function App () {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route index element={<HomePage/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/vacancies" element={<Vacancies/>}/>
          {/*<Route path="/vacancies/:id" element={<SingleVacancy/>}/>*/}
          {/*<Route path="/employee-vacancies" element={<EmployeeVacancies/>}/>*/}
          {/*<Route path="/employer-vacancies" element={<EmployerVacancies/>}/>*/}
          {/*<Route path="/vacancies/new" element={<CreateVacancy/>}/>*/}
          <Route path="*" element={<NotFoundPage/>}/>
        </Route>
      </Routes>
    </div>
  )
}

export default App
