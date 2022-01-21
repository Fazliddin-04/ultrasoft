import { Link, useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'

function Navbar({ title }) {
  const navigate = useNavigate()

  function themeSelect() {
    ;(function (theme = localStorage.getItem('theme')) {
      if (localStorage.getItem('theme')) {
        document.documentElement.setAttribute('data-theme', theme)
        var optionToggler = document.querySelector(
          "select[data-choose-theme] [value='" + theme.toString() + "']"
        )
        if (optionToggler) {
          ;[
            ...document.querySelectorAll(
              "select[data-choose-theme] [value='" + theme.toString() + "']"
            ),
          ].forEach((el) => {
            el.selected = true
          })
        }
      }
    })()
    if (document.querySelector('select[data-choose-theme]')) {
      ;[...document.querySelectorAll('select[data-choose-theme]')].forEach(
        (el) => {
          el.addEventListener('change', function () {
            document.documentElement.setAttribute('data-theme', this.value)
            localStorage.setItem(
              'theme',
              document.documentElement.getAttribute('data-theme')
            )
            ;[
              ...document.querySelectorAll(
                "select[data-choose-theme] [value='" +
                  localStorage.getItem('theme') +
                  "']"
              ),
            ].forEach((el) => {
              el.selected = true
            })
          })
        }
      )
    }
  }

  function themeChange(attach = true) {
    if (attach === true) {
      document.addEventListener('DOMContentLoaded', function (event) {
        themeSelect()
      })
    } else {
      themeSelect()
    }
  }

  themeChange()

  return (
    <div className="w-full navbar bg-neutral text-neutral-content fixed top-0 left-0 z-50">
      <div className="flex-none lg:hidden">
        <label htmlFor="my-drawer-3" className="btn btn-square btn-ghost">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block w-6 h-6 stroke-current"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </label>
      </div>
      <div className="flex-1 px-2 mx-2">
        <Link
          to="/"
          className="flex items-start text-2xl sm:text-3xl lg:text-4xl font-extrabold uppercase"
        >
          <span className="text-primary">{title}</span>
          <span className="ml-1 rounded-md text-sm px-1 text-white h-max bg-primary">
            .uz
          </span>
        </Link>
      </div>
      <div className="flex-none hidden lg:block">
        <ul className="menu horizontal">
          <li>
            <Link to="/" className="btn btn-ghost rounded-none">
              <div className="inline-block w-5 mr-2">
                <i className="far fa-home"></i>
              </div>
              Bosh sahifa
            </Link>
          </li>
          <li>
            <Link to="/files" className="btn btn-ghost rounded-none">
              <div className="inline-block w-5 mr-2">
                <i className="far fa-folder"></i>
              </div>
              Fayllarim
            </Link>
          </li>
          <li>
            <select
              data-choose-theme
              className="appearance-none btn btn-ghost rounded-none mr-5 px-1"
            >
              <option value="light">🌝 Yorqin</option>
              <option value="dark">🌚 Tun</option>
              <option value="cupcake">🧁 Cupcake</option>
              <option value="halloween">🎃 Halloween</option>
              <option value="bumblebee">🐝 Bumblebee</option>
              <option value="synthwave">🌃 Synthwave</option>
              <option value="cyberpunk">🤖 Cyberpunk</option>
              <option value="wireframe">📝 Qo'lyozma</option>
            </select>
          </li>
          <li>
            <button
              className="btn btn-primary"
              onClick={() => navigate('/profile')}
            >
              Profil
            </button>
          </li>
        </ul>
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
