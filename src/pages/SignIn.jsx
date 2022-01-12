import { useState } from 'react'
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

  return (
    <>
      <header className="text-5xl sm:text-6xl font-extrabold text-center my-10">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-500 text-shadow-lg">
          Qaytib kelganingizdan xursandmiz!
        </span>
      </header>
      <div className=" card bg-base-200 mx-auto p-5 w-11/12 sm:w-9/12 sm:p-10">
        <form className="form-control" onSubmit={onSubmit}>
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
          <label className="label justify-end">
            <Link to="/forgot-password" className="label-text-alt text-lg">
              Parolni unutdingizmi?
            </Link>
          </label>

          <button className="btn btn-block btn-primary mt-14">
            Tizimga kirish
          </button>
        </form>

        <div className="flex flex-col w-full mt-10">
          <div className="grid h-25 pb-5 card rounded-box place-items-center">
            <OAuth />
          </div>
          <div className="divider">YOKI</div>
          <div className="grid h-20 card rounded-box place-items-center">
            <Link
              to="/sign-up"
              className="text-center font-bold text-purple-400 my-10"
            >
              Ro'yxatdan o'ting
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default SignIn
