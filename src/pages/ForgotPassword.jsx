import { useEffect, useRef, useState } from 'react'
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

  const ref1 = useRef()

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

  return (
    <>
      <div className="mx-auto bg-base-300 w-max max-w-full py-10 px-14 sm:my-10 sm:rounded">
        <p className="text-2xl sm:text-3xl font-bold capitalize max-w-xs text-center sm:my-5">
          <span className="text-accent">Parolni Tiklash</span>
        </p>
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
          <label className="label link link-hover justify-end">
            <Link to="/sign-in" className="label-text-alt text-lg">
              Tizimga kirish
            </Link>
          </label>

          <button className="btn btn-block btn-primary mt-5">
            Qayta tiklash xatini yuborish
          </button>
        </form>
      </div>
    </>
  )
}

export default ForgotPassword
