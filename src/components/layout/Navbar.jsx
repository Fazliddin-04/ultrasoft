import { Link } from 'react-router-dom'
import { getAuth } from 'firebase/auth'
import PropTypes from 'prop-types'
import { useState } from 'react'

function Navbar({ title }) {
  // eslint-disable-next-line no-unused-vars
  const [authSync, setAuthSync] = useState(null)
  const auth = getAuth()

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
  setTimeout(() => {
    setAuthSync(auth.currentUser)
  }, 2000)

  return (
    <div className="w-full navbar bg-neutral text-neutral-content fixed top-0 left-0 z-50">
      <div className="flex-none">
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
      <p className="mx-2 flex-1 flex items-center justify-end">
        <a
          href="https://t.me/UltraSoft_uz"
          target="_blank"
          rel="noreferrer"
          className="btn btn-ghost gap-x-3"
        >
          <i className="fab fa-telegram fa-2x"></i>
          <span className="hidden sm:inline">obuna bo'ling</span>
        </a>
      </p>
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
