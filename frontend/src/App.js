import { Routes, Route, Link } from 'react-router-dom'
import Signup from './pages/Signup'
import NotFoundPage from './pages/NotFoundPage'

function App () {
  return (
    <div className="App">
      <Routes>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="*" element={<NotFoundPage/>}/>
      </Routes>
    </div>
  )
}

export default App
