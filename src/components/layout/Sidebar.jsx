import { Link } from 'react-router-dom'
import { useContext } from 'react'
import CategoryContext from '../../context/CategoryContext'

function Sidebar() {
  const { gamesCategory, mobileCategory, softwareCategory } =
    useContext(CategoryContext)

  return (
    <>
      <div className="collapse w-80 border  border-base-300 collapse-arrow">
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
              <Link to="/software-apps">Hammasi</Link>
            </li>
            {softwareCategory.map((category) => (
              <li key={softwareCategory.indexOf(category)}>
                <Link
                  to={`/mobile-apps/${
                    category.toLowerCase() === 'brauzerlar'
                      ? 'browsers'
                      : category.toLowerCase() === 'emulatorlar'
                      ? 'emulators'
                      : category.toLowerCase() === 'aloqa'
                      ? 'communication'
                      : category.toLowerCase() === "ta'lim"
                      ? 'education'
                      : category.toLowerCase() === 'grafik-tahrirchilar'
                      ? 'graphic-editors'
                      : category.toLowerCase() === 'matn-tahrirchilar'
                      ? 'text-editors'
                      : category.toLowerCase()
                  }`}
                >
                  {category.replace(/-/g, ' ')}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="collapse w-80 border border-base-300 collapse-arrow">
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
              <Link to="/software-games">Hammasi</Link>
            </li>
            {gamesCategory.map((category) => (
              <li key={gamesCategory.indexOf(category)}>
                <Link
                  to={`/software-games/${
                    category.toLowerCase() === 'sarguzasht'
                      ? 'adventure'
                      : category.toLowerCase() === 'arkada'
                      ? 'arcade'
                      : category.toLowerCase() === 'taxta'
                      ? 'board'
                      : category.toLowerCase() === 'karta'
                      ? 'card'
                      : category.toLowerCase() === 'tasodifiy'
                      ? 'cusual'
                      : category.toLowerCase() === "ta'limiy"
                      ? 'educational'
                      : category.toLowerCase() === 'boshqotirma'
                      ? 'puzzle'
                      : category.toLowerCase() === 'poyga'
                      ? 'racing'
                      : category.toLowerCase() === 'simulyator'
                      ? 'simulator'
                      : category.toLowerCase() === 'strategiya'
                      ? 'simulator'
                      : category.toLowerCase() === 'sport'
                      ? 'sports'
                      : category.toLowerCase()
                  }`}
                >
                  {category.replace(/-/g, ' ')}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="collapse w-80 border border-base-300 collapse-arrow">
        <input type="checkbox" />
        <div className="collapse-title text-xl font-medium">Mobil ilovalar</div>
        <div className="collapse-content">
          <ul className="menu py-3 shadow-lg bg-base-100 rounded-box">
            <li className="menu-title">
              <span>Mobil ilovalar</span>
            </li>
            <li>
              <Link to="/mobile-apps">Hammasi</Link>
            </li>
            {mobileCategory.map((category) => (
              <li key={mobileCategory.indexOf(category)}>
                <Link
                  to={`/mobile-apps/${
                    category.toLowerCase() === "san'at-&-dizayn"
                      ? 'art-&-design'
                      : category.toLowerCase() === "kitob-&-ma'lumot"
                      ? 'books-&-reference'
                      : category.toLowerCase() === 'aloqa'
                      ? 'communication'
                      : category.toLowerCase() === "ta'lim"
                      ? 'education'
                      : category.toLowerCase() === 'grafik-tahrirchilar'
                      ? 'graphic-editors'
                      : category.toLowerCase() === 'matn-tahrirchilar'
                      ? 'text-editors'
                      : category.toLowerCase()
                  }`}
                >
                  {category.replace(/-/g, ' ')}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="collapse w-80 border border-base-300 collapse-arrow">
        <input type="checkbox" />
        <div className="collapse-title text-xl font-medium">Mobil o'yinlar</div>
        <div className="collapse-content">
          <ul className="menu py-3 shadow-lg bg-base-100 rounded-box">
            <li className="menu-title">
              <span>Mobil o'yinlar</span>
            </li>
            <li>
              <Link to="/mobile-games">Hammasi</Link>
            </li>
            {gamesCategory.map((category) => (
              <li key={gamesCategory.indexOf(category)}>
                <Link
                  to={`/software-games/${
                    category.toLowerCase() === 'sarguzasht'
                      ? 'adventure'
                      : category.toLowerCase() === 'arkada'
                      ? 'arcade'
                      : category.toLowerCase() === 'taxta'
                      ? 'board'
                      : category.toLowerCase() === 'karta'
                      ? 'card'
                      : category.toLowerCase() === 'tasodifiy'
                      ? 'cusual'
                      : category.toLowerCase() === "ta'limiy"
                      ? 'educational'
                      : category.toLowerCase() === 'boshqotirma'
                      ? 'puzzle'
                      : category.toLowerCase() === 'poyga'
                      ? 'racing'
                      : category.toLowerCase() === 'simulyator'
                      ? 'simulator'
                      : category.toLowerCase() === 'strategiya'
                      ? 'simulator'
                      : category.toLowerCase() === 'sport'
                      ? 'sports'
                      : category.toLowerCase()
                  }`}
                >
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
