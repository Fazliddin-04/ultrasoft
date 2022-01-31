import { useState, useRef, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { toast } from 'react-toastify'
import OAuth from '../components/OAuth'

function SignIn() {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const { email, password } = formData

  const navigate = useNavigate()

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }))
  }

  const onSubmit = async (e) => {
    e.preventDefault()

    const auth = getAuth()

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      )

      if (userCredential.user) {
        navigate('/')
      }
    } catch (error) {
      toast.error("Noto'g'ri hisob ma'lumotlari")
    }
  }

  const ref1 = useRef()
  const ref2 = useRef()
  useEffect(() => {
    ref1.current.innerHTML = ref1.current.innerText
      .split('')
      .map(
        (letter, idx) =>
          `<span className="label-text" style="transition-delay: ${
            idx * 50
          }ms;">${letter}</span>`
      )
      .join('')
  })
  useEffect(() => {
    ref2.current.innerHTML = ref2.current.innerText
      .split('')
      .map(
        (letter, idx) => letter !== '' &&
          `<span className="label-text" style="transition-delay: ${
            idx * 50
          }ms;">${letter}</span>`
      )
      .join('')
  })

  return (
    <>
      <div className="mx-auto bg-base-300 w-max max-w-full py-5 px-14 sm:my-10 sm:rounded">
        <p className="text-2xl sm:text-3xl font-bold capitalize max-w-xs text-center sm:my-5">
          <span className="text-accent">
            Ko'rib turganimizdan xursandmiz :)
          </span>
        </p>
        <div className="flex justify-center my-10">
          <OAuth />
        </div>
        <form className="form-control" onSubmit={onSubmit}>
          <div className="form-control-magic">
            <input
              className="input input-ghost w-full"
              type="email"
              id="email"
              value={email}
              onChange={onChange}
              required
            />
            <label className="label block" ref={ref1}>
              Email
            </label>
          </div>

          <div className="form-control-magic flex items-center justify-center">
            <input
              className="input input-ghost w-full"
              type={showPassword ? 'text' : 'password'}
              id="password"
              value={password}
              onChange={onChange}
              required
            />
            <label className="label block" ref={ref2}>
              Parol
            </label>

            <button
              type="button"
              className="btn btn-outline btn-square btn-sm absolute right-2"
              onClick={() => setShowPassword((prevState) => !prevState)}
            >
              <i className="far fa-eye"></i>
            </button>
          </div>

          <label className="label link link-hover justify-end">
            <Link to="/forgot-password" className="label-text-alt text-lg">
              Parolni unutdingizmi?
            </Link>
          </label>

          <button className="btn btn-block btn-primary mt-5 gap-3">
            Tizimga kirish
            <i className="far fa-arrow-right"></i>
          </button>
        </form>

        <div className="flex items-center justify-center flex-wrap gap-2 text-center mt-5">
          <span>Hisob mavjudmi emasmi?</span>
          <Link to="/sign-up" className="font-bold text-purple-400 ">
            Ro'yxatdan o'ting
          </Link>
        </div>
      </div>
    </>
  )
}

export default SignIn
