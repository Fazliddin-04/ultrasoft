import { Link } from 'react-router-dom'
import { useContext } from 'react'
import CategoryContext from '../../context/CategoryContext'
import Spinner from '../Spinner'

function Sidebar() {
  const {
    loadingCon,
    softwareGamesCategory,
    softwareCategory,
    windowsCategory,
  } = useContext(CategoryContext)

  if (loadingCon) {
    return <Spinner />
  }
  return (
    <>
      <div className="collapse w-80 border capitalize border-base-300 collapse-arrow">
        <input type="checkbox" />
        <div className="collapse-title text-xl font-medium">
          Kompyuter ilovalar
        </div>
        <div className="collapse-content">
          <ul className="menu py-3 shadow-lg bg-base-100 rounded-box">
            <li className="menu-title">
              <span>Kompyuter ilovalar</span>
            </li>
            <li>
              <Link to="/category/software-apps">Hammasi</Link>
            </li>
            {softwareCategory.map((category) => (
              <li
                key={softwareCategory.indexOf(category)}
                className="capitalize"
              >
                <Link to={`/category/software-apps/${category.toLowerCase()}`}>
                  {category.replace(/-/g, ' ')}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="collapse w-80 border capitalize border-base-300 collapse-arrow">
        <input type="checkbox" />
        <div className="collapse-title text-xl font-medium">
          Kompyuter o'yinlar
        </div>
        <div className="collapse-content">
          <ul className="menu py-3 shadow-lg bg-base-100 rounded-box">
            <li className="menu-title">
              <span>Kompyuter o'yinlar</span>
            </li>
            <li>
              <Link to="/category/software-games">Hammasi</Link>
            </li>
            {softwareGamesCategory.map((category) => (
              <li key={softwareGamesCategory.indexOf(category)}>
                <Link to={`/category/software-games/${category.toLowerCase()}`}>
                  {category.replace(/-/g, ' ')}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="collapse w-80 border capitalize border-base-300 collapse-arrow">
        <input type="checkbox" />
        <div className="collapse-title text-xl font-medium">Windows OS / Aktivatorlar</div>
        <div className="collapse-content">
          <ul className="menu py-3 shadow-lg bg-base-100 rounded-box">
            <li className="menu-title">
              <span>Operatsion Sistemalar</span>
            </li>
            <li>
              <Link to="/category/windows-os">Hammasi</Link>
            </li>
            {windowsCategory.map((category) => (
              <li key={windowsCategory.indexOf(category)}>
                <Link to={`/category/windows-os/${category.toLowerCase()}`}>
                  {category.replace(/-/g, ' ')}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  )
}

export default Sidebar
