import { useState } from 'react'
import { Link } from 'react-router-dom'
import { getAuth, sendPasswordResetEmail } from 'firebase/auth'
import { toast } from 'react-toastify'

function ForgotPassword() {
  const [email, setEmail] = useState('')

  const onChange = (e) => setEmail(e.target.value)

  const onSubmit = async (e) => {
    e.preventDefault()
    try {
      const auth = getAuth()
      await sendPasswordResetEmail(auth, email)
      toast.success("Email jo'natildi")
    } catch (error) {
      toast.error("Qayta tiklash xatini yuborib bo'lmadi")
    }
  }

  return (
    <>
      <header className="text-5xl sm:text-6xl font-extrabold text-center my-6">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-500 text-shadow-lg">
          Parolni Tiklash
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
          <label className="label justify-end">
            <Link to="/sign-in" className="label-text-alt text-lg">
              Tizimga kirish
            </Link>
          </label>

          <button className="btn btn-block btn-primary mt-14">
            Qayta tiklash xatini yuborish
          </button>
        </form>
      </div>
    </>
  )
}

export default ForgotPassword
