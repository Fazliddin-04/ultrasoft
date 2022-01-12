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
    <div className="navbar mb-2 shadow-lg bg-neutral text-neutral-content fixed top-0 w-full z-50">
      <div className="px-2 mx-2 navbar-start">
        <Link
          to="/"
          className="text-2xl sm:text-3xl lg:text-4xl font-extrabold"
        >
          <span className="bg-clip-text uppercase text-transparent bg-gradient-to-r from-pink-500 to-purple-500">
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
            Bosh sahifa
          </Link>
          <Link to="/files" className="btn btn-ghost btn-sm rounded-btn">
            <div className="inline-block w-5 mr-2 stroke-current">
              <i className="far fa-folder"></i>
            </div>
            Fayllarim
          </Link>
          <div className="dropdown dropdown-end px-0">
            <div tabIndex="0" className="btn btn-ghost rounded-btn btn-sm">
              <div className="inline-block w-5 mr-2 stroke-current">
                <i className="fal fa-globe"></i>
              </div>
              Til
            </div>
            <ul
              tabIndex="0"
              className="p-2 shadow menu dropdown-content bg-base-100 rounded-box w-52"
            >
              {/* <li>
                <Link to="/">English</Link>
              </li>
              <li>
                <Link to="/">Russian</Link>
              </li> */}
              <li>
                <Link to="/">Uzbek</Link>
              </li>
            </ul>
          </div>
          <select
            data-choose-theme
            className="bg-transparent appearance-none btn btn-sm"
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
          {/* <div className="dropdown dropdown-end px-0">
            <div tabindex="0" className="btn btn-ghost rounded-btn btn-sm">
              <div className="inline-block w-5 mr-2 stroke-current">
                <i className="far fa-diamond"></i>{' '}
              </div>{' '}
              Fon
            </div>
            <ul
              tabindex="0"
              className="p-2 shadow menu dropdown-content bg-base-100 rounded-box w-52"
            >
              <li>
                <a
                  href="#!"
                  tabindex="0"
                  data-set-theme="light"
                  data-act-className="active"
                  onClick={themeChange}
                >
                  🌝 light
                </a>
              </li>
              <li>
                <a
                  href="#!"
                  tabindex="0"
                  data-set-theme="dark"
                  data-act-className="active"
                >
                  🌚 dark
                </a>
              </li>
              <li>
                <a
                  href="#!"
                  tabindex="0"
                  data-set-theme="cupcake"
                  data-act-className="active"
                >
                  🧁 cupcake
                </a>
              </li>
              <li>
                <a
                  href="#!"
                  tabindex="0"
                  data-set-theme="emerald"
                  data-act-className="active"
                >
                  ✳️ Emerald
                </a>
              </li>
              <li>
                <a
                  href="#!"
                  tabindex="0"
                  data-set-theme="bumblebee"
                  data-act-className="active"
                >
                  🐝 bumblebee
                </a>
              </li>
              <li>
                <a
                  href="#!"
                  tabindex="0"
                  data-set-theme="synthwave"
                  data-act-className="active"
                >
                  🌃 synthwave
                </a>
              </li>
              <li>
                <a
                  href="#!"
                  tabindex="0"
                  data-set-theme="cyberpunk"
                  data-act-className="active"
                >
                  🤖 cyberpunk
                </a>
              </li>
              <li>
                <a
                  href="#!"
                  tabindex="0"
                  data-set-theme="halloween"
                  data-act-className="active"
                >
                  🎃 halloween
                </a>
              </li>
              <li>
                <a
                  href="#!"
                  tabindex="0"
                  data-set-theme="pastel"
                  data-act-className="active"
                >
                  🖍 pastel
                </a>
              </li>
              <li>
                <a
                  href="#!"
                  tabindex="0"
                  data-set-theme="wireframe"
                  data-act-className="active"
                >
                  📝 Wireframe
                </a>
              </li>
              <li>
                <a
                  href="#!"
                  tabindex="0"
                  data-set-theme="halloween"
                  data-act-className="active"
                >
                  🎃 halloween
                </a>
              </li>
            </ul>
          </div> */}
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
          shaxsiy Hisob
        </button>
      </div>
    </div>
  )
}

Navbar.defaultProps = {
  title: 'Ultrasoft.uz',
}

Navbar.propTypes = {
  title: PropTypes.string,
}

export default Navbar
