import { Link, Routes, Route } from 'react-router-dom'
import { useLocation } from 'react-router-dom'

import SoftwareCategory from './SoftwareCategory'
import MobileCategory from './MobileCategory'
import SoftwareGamesCategory from './SoftwareGamesCategory'
import MobileGamesCategory from './MobileGamesCategory'

function Sidebar() {
  const location = useLocation()

  const pathMatchRoute = (route) => {
    if (route === location.pathname) {
      return true
    }
  }

  return (
    <div className="bg-accent-focus w-80 p-3">
      <div className="p-4 artboard artboard-demo bg-base-200">
        <ul
          className="menu py-3 shadow-lg bg-base-100 rounded-box w-full"
          id="main-menu"
        >
          <li className={pathMatchRoute('/software-category') && 'bordered'}>
            <Link to="/software-category">Software</Link>
          </li>
          <li className={pathMatchRoute('/mobile-category') && 'bordered'}>
            <Link to="/mobile-category">Mobile</Link>
          </li>
          <li
            className={pathMatchRoute('/software-games-category') && 'bordered'}
          >
            <Link to="/software-games-category">Software Games</Link>
          </li>
          <li
            className={pathMatchRoute('/mobile-games-category') && 'bordered'}
          >
            <Link to="/mobile-games-category">Mobile Games</Link>
          </li>
        </ul>
      </div>
      <div className="p-4 artboard artboard-demo bg-base-200 mt-2">
        <ul className="menu py-3 shadow-lg bg-base-100 rounded-box w-full">
          <li className="menu-title">
            <span>Categories</span>
          </li>
          <Routes>
            <Route
              path="/software-category/*"
              element={<SoftwareCategory funcHandler={pathMatchRoute} />}
            />
            <Route
              path="/mobile-category/*"
              element={<MobileCategory funcHandler={pathMatchRoute} />}
            />
            <Route
              path="/software-games-category/*"
              element={<SoftwareGamesCategory funcHandler={pathMatchRoute} />}
            />
            <Route
              path="/mobile-games-category/*"
              element={<MobileGamesCategory funcHandler={pathMatchRoute} />}
            />
          </Routes>
        </ul>
      </div>
    </div>
  )
}

export default Sidebar
