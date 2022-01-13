import { Link, useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'

function DrawerSide({ title }) {
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
    <ul className="p-4 overflow-y-auto menu w-80 bg-base-100">
      <div className="w-max p-2 mx-auto mb-2">
        <Link
          to="/"
          className="text-2xl sm:text-3xl lg:text-4xl font-extrabold"
        >
          <span className="bg-clip-text uppercase text-transparent bg-gradient-to-r from-pink-500 to-purple-500">
            {title}
          </span>
        </Link>
      </div>
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
          className="appearance-none btn btn-ghost rounded-none"
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
          shaxsiy Hisob
        </button>
      </li>
    </ul>
  )
}

DrawerSide.defaultProps = {
  title: 'Ultrasoft.uz',
}

DrawerSide.propTypes = {
  title: PropTypes.string,
}

export default DrawerSide
