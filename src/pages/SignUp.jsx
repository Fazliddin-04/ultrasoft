import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth'
import { doc, setDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '../firebase.config'
import { toast } from 'react-toastify'
import OAuth from '../components/OAuth'

function SignUp() {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  })

  const { name, email, password } = formData

  const navigate = useNavigate()

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }))
  }

  const onSubmit = async (e) => {
    e.preventDefault()

    try {
      const auth = getAuth()

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      )

      const user = userCredential.user

      updateProfile(auth.currentUser, { displayName: name })

      const formDataCopy = { ...formData }
      delete formDataCopy.password
      formDataCopy.timestamp = serverTimestamp()

      await setDoc(doc(db, 'users', user.uid), formDataCopy)

      navigate('/')
    } catch (error) {
      toast.error("Ro'yxatdan o'tishda nimadir xato ketdi")
    }
  }

  const ref1 = useRef()
  const ref2 = useRef()
  const ref3 = useRef()
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
        (letter, idx) =>
          letter !== '' &&
          `<span className="label-text" style="transition-delay: ${
            idx * 50
          }ms;">${letter}</span>`
      )
      .join('')
  })
  useEffect(() => {
    ref3.current.innerHTML = ref3.current.innerText
      .split('')
      .map(
        (letter, idx) =>
          letter !== '' &&
          `<span className="label-text" style="transition-delay: ${
            idx * 50
          }ms;">${letter}</span>`
      )
      .join('')
  })

  return (
    <>
      <div className="mx-auto bg-base-300 w-max max-w-full py-5 px-14 sm:my-10 sm:rounded">
        <p className="text-3xl sm:text-4xl font-bold capitalize max-w-xs text-center my-5">
          <span className="text-accent">Xush kelibsiz!</span>
        </p>
        <div className="flex justify-center mt-10 mb-5">
          <OAuth />
        </div>
        <form className="form-control" onSubmit={onSubmit}>
          <div className="form-control-magic">
            <input
              className="input input-ghost w-full"
              type="name"
              id="name"
              value={name}
              onChange={onChange}
              required
            />
            <label className="label block" ref={ref1}>
              Ism
            </label>
          </div>
          <div className="form-control-magic">
            <input
              className="input input-ghost w-full"
              type="email"
              id="email"
              value={email}
              onChange={onChange}
              required
            />
            <label className="label block" ref={ref2}>
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
            <label className="label block" ref={ref3}>
              <span className="label-text text-xl">Parol</span>
            </label>
            <button
              type="button"
              className="btn btn-outline btn-square btn-sm absolute right-2"
              onClick={() => setShowPassword((prevState) => !prevState)}
            >
              <i className="far fa-eye"></i>
            </button>
          </div>

          <button className="btn btn-block btn-primary mt-5 gap-3">
            Ro'yxatdan o'tish
            <i className="far fa-arrow-right"></i>
          </button>
        </form>

        <div className="flex items-center justify-center flex-wrap gap-2 text-center mt-5">
          <span>Hisob mavjudmi?</span>
          <Link to="/sign-in" className="font-bold text-purple-400">
            Tizimga kiring
          </Link>
        </div>
      </div>
    </>
  )
}

export default SignUp
