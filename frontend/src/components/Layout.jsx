import { Outlet } from 'react-router-dom'
import CustomLink from './CustomLink'

const Layout = () => {
  return (
    <>
      <header>
        <CustomLink to="/">Home</CustomLink>
        <CustomLink to="/vacancies">Vacancies</CustomLink>
      </header>

      <main className="container">
        <Outlet/>
      </main>

      <footer className="container">&copy; Vac Vac project 2024</footer>
    </>
  )
}

export default Layout