import { useLocation, useNavigate } from 'react-router-dom'
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '../firebase.config'
import { toast } from 'react-toastify'
import googleIcon from '../assets/svg/googleIcon.svg'

function OAuth() {
  const navigate = useNavigate()
  const location = useLocation()

  const onGoogleClick = async () => {
    try {
      const auth = getAuth()
      const provider = new GoogleAuthProvider()
      const result = await signInWithPopup(auth, provider)
      const user = result.user

      // check for user
      const docRef = doc(db, 'users', user.uid)
      const docSnap = await getDoc(docRef)

      // if user does not exists, create user
      if (!docSnap.exists) {
        await setDoc(doc(db, 'users', user.uid), {
          name: user.displayName,
          email: user.email,
          tiemstamp: serverTimestamp(),
        })
      }
      navigate('/')
    } catch (error) {
      toast.error("Google bilan avtorizatsiya qilib bo'lmadi")
    }
  }

  return (
    <button
      className="btn btn-outline p-2 gap-2 text-sm lowercase w-full"
      onClick={onGoogleClick}
    >
      <img src={googleIcon} alt="google" className="object-cover max-h-full mr-1" />
      <span className='capitalize'>Google</span> orqali{' '}
      {location.pathname === '/sign-up'
        ? "ro'yxatdan o'ting"
        : 'tizimga kiring'}
    </button>
  )
}

export default OAuth
