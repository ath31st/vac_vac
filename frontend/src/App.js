import { Routes, Route, Link } from 'react-router-dom'
import Signup from './pages/Signup'
import NotFoundPage from './pages/NotFoundPage'
import Layout from './components/Layout'
import Vacancies from './pages/Vacancies'
import HomePage from './pages/HomePage'

function App () {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route index element={<HomePage/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/vacancies" element={<Vacancies/>}/>
          <Route path="*" element={<NotFoundPage/>}/>
        </Route>
      </Routes>
    </div>
  )
}

export default App
