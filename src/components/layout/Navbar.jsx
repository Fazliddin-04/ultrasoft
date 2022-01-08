import { Link, useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'

function Navbar({ title }) {
  const navigate = useNavigate()

  return (
    <div className="navbar mb-2 shadow-lg bg-neutral text-neutral-content fixed top-0 w-full z-50">
      <div className="px-2 mx-2 navbar-start">
        <Link to="/" className="text-4xl font-extrabold">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-500">
            {title}
          </span>
        </Link>
      </div>
      <div className="hidden px-2 mx-2 navbar-center lg:flex">
        <div className="flex items-stretch">
          <Link to="/" className="btn btn-ghost btn-sm rounded-btn">
            <div className="inline-block w-5 mr-2 stroke-current">
              <i className="far fa-home"></i>
            </div>
            Home
          </Link>
          <Link to="/likes" className="btn btn-ghost btn-sm rounded-btn">
            <div className="inline-block w-5 mr-2 stroke-current">
              <i className="far fa-heart"></i>
            </div>
            Likes
          </Link>
          <Link to="/files" className="btn btn-ghost btn-sm rounded-btn">
            <div className="inline-block w-5 mr-2 stroke-current">
              <i className="far fa-folder"></i>
            </div>
            Files
          </Link>
          <div className="dropdown dropdown-end px-0">
            <div tabIndex="0" className="btn btn-ghost rounded-btn btn-sm">
              <div className="inline-block w-5 mr-2 stroke-current">
                <i className="fal fa-globe"></i>
              </div>
              Language
            </div>
            <ul
              tabIndex="0"
              className="p-2 shadow menu dropdown-content bg-base-100 rounded-box w-52"
            >
              <li>
                <Link to="/en">English</Link>
              </li>
              <li>
                <Link to="/ru">Russian</Link>
              </li>
              <li>
                <Link to="/uz">Uzbek</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="navbar-end">
        {/* <button
          className="btn btn-ghost btn-sm mr-1"
          onClick={() => navigate('/sign-in')}
        >
          Sign in
        </button>
        <button
          className="btn btn-primary btn-sm"
          onClick={() => navigate('/sign-up')}
        >
          Sign up
        </button> */}
        <button
          className="btn btn-primary btn-sm"
          onClick={() => navigate('/profile')}
        >
          Profile
        </button>
      </div>
    </div>
  )
}

Navbar.defaultProps = {
  title: 'Ultrasoft',
}

Navbar.propTypes = {
  title: PropTypes.string,
}

export default Navbar
