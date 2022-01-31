import { Link, useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'
import { useState } from 'react'
import { getAuth } from 'firebase/auth'

function DrawerSide({ title }) {
  const [authSinc, setAuthSinc] = useState(null)
  const navigate = useNavigate()
  const auth = getAuth()

  setTimeout(() => {
    console.log(auth.currentUser)
    setAuthSinc(auth.currentUser)
  }, 2000)

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
    <ul className="p-4 overflow-y-auto menu w-80 bg-neutral text-neutral-content">
      <div className="w-max p-2 mx-auto mb-4">
        <Link
          to="/"
          className="flex items-start text-4xl font-black uppercase"
        >
          <span className="text-primary">
            <div className="glitch" data-text={title}>
              {title}
            </div>
          </span>
          <span className="ml-1 rounded-md text-sm px-1 text-white h-max bg-primary">
            .uz
          </span>
        </Link>
      </div>
      <li>
        <Link to="/" className="btn btn-ghost mt-5">
          <div className="inline-block w-5 mr-2">
            <i className="far fa-home"></i>
          </div>
          Bosh sahifa
        </Link>
      </li>
      <li>
        <select
          data-choose-theme
          className="appearance-none btn btn-ghost mt-5"
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

      {authSinc !== null ? (
        <li>
          <button
            className="btn btn-primary mt-5"
            onClick={() => navigate('/profile')}
          >
            Profil
          </button>
        </li>
      ) : (
        <>
          <li>
            <button
              className="btn btn-ghost mt-5"
              onClick={() => navigate('/sign-in')}
            >
              Tizimga kirish
            </button>
          </li>
          <li>
            <button
              className="btn btn-primary mt-5"
              onClick={() => navigate('/sign-up')}
            >
              Ro'yxatdan o'tish
            </button>
          </li>
        </>
      )}
    </ul>
  )
}

DrawerSide.defaultProps = {
  title: 'Ultrasoft',
}

DrawerSide.propTypes = {
  title: PropTypes.string,
}

export default DrawerSide
