import { Link, Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <>
      <header>
        <Link to="/">Home</Link>
        <Link to="/vacancies">Vacancies</Link>
      </header>

      <main className="container">
        <Outlet/>
      </main>

      <footer className="container">&copy; Vac Vac project 2024</footer>
    </>
  )
}

export default Layout