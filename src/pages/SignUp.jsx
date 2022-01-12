import { useState } from 'react'
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

  return (
    <>
      <header className="text-5xl sm:text-6xl font-extrabold text-center my-6">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-500 text-shadow-lg">
          Xush kelibsiz!
        </span>
      </header>
      {/* artboard phone-5 horizontal */}
      <div className="card bg-base-200 mx-auto p-5 w-11/12 sm:w-9/12 sm:p-10">
        <form className="form-control" onSubmit={onSubmit}>
          <label className="label mt-4">
            <span className="label-text text-xl ">Ism</span>
          </label>
          <input
            placeholder="Ism"
            className="input input-primary input-bordered text-lg"
            type="name"
            id="name"
            value={name}
            onChange={onChange}
            required
          />
          <label className="label mt-4">
            <span className="label-text text-xl ">Email</span>
          </label>
          <input
            placeholder="Email"
            className="input input-primary input-bordered text-lg"
            type="email"
            id="email"
            value={email}
            onChange={onChange}
            required
          />
          <label className="label mt-4">
            <span className="label-text text-xl">Parol</span>
          </label>
          <div className="relative flex items-center justify-center">
            <input
              placeholder="Parol"
              className="input input-primary input-bordered text-lg flex-1"
              type={showPassword ? 'text' : 'password'}
              id="password"
              value={password}
              onChange={onChange}
              required
            />

            <button
              type="button"
              className="btn btn-outline btn-square btn-sm absolute right-2"
              onClick={() => setShowPassword((prevState) => !prevState)}
            >
              <i className="far fa-eye"></i>
            </button>
          </div>

          <button className="btn btn-block btn-primary mt-14">Ro'yxatdan o'tish</button>
        </form>

        <div className="flex flex-col w-full mt-10">
          <div className="grid h-25 pb-5 card rounded-box place-items-center">
            <OAuth />
          </div>
          <div className="divider">YOKI</div>
          <div className="grid h-20 card rounded-box place-items-center">
            <Link
              to="/sign-in"
              className="text-center font-bold text-purple-400 my-10"
            >
              Tizimga kiring
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default SignUp
