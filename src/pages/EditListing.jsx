import { useState, useEffect, useRef, useContext } from 'react'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage'
import { doc, updateDoc, getDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '../firebase.config'
import { useNavigate, useParams } from 'react-router-dom'
import Spinner from '../components/Spinner'
import CategoryContext from '../context/CategoryContext'
import { toast } from 'react-toastify'
import { v4 as uuidv4 } from 'uuid'

function EditListing() {
  const { gamesCategory, mobileCategory, softwareCategory, windowsCategory } =
    useContext(CategoryContext)

  const [loading, setLoading] = useState(false)
  const [listing, setListing] = useState(null)
  const [formData, setFormData] = useState({
    ageLimit: 0,
    category: '',
    cpu: '',
    icon: [],
    images: [],
    languages: '',
    linkToDownload: '',
    name: '',
    os: '',
    overview: '',
    recommended: false,
    size: '',
    type: '',
    version: '',
    userRef: '',
  })

  const {
    ageLimit,
    cpu,
    icon,
    images,
    languages,
    linkToDownload,
    name,
    os,
    overview,
    recommended,
    size,
    type,
    version,
  } = formData

  const auth = getAuth()
  const navigate = useNavigate()
  const params = useParams()
  const isMounted = useRef(true)

  // Fetch listing to edit
  useEffect(() => {
    setLoading(true)
    const fetchListing = async () => {
      const docRef = doc(db, 'listings', params.listingId)
      const docSnap = await getDoc(docRef)
      if (docSnap.exists()) {
        setListing(docSnap.data())
        setFormData({ ...docSnap.data() })
        setLoading(false)
      } else {
        navigate('/')
        toast.error("Ro'yxat aniqlanmadi")
      }
    }

    fetchListing()
  }, [params.listingId, navigate])

  // Redirect if listing isn't user's
  useEffect(() => {
    if (listing && listing.userRef !== auth.currentUser.uid) {
      toast.error("Siz bu ro'yxatni o'zgartirolmaysiz!")
      navigate('/')
    }
  })

  // userRef ni tizimga kirgan foydalanuvchiga o'rnatadi
  useEffect(() => {
    if (isMounted) {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setFormData({ ...formData, userRef: user.uid })
        } else {
          navigate('/sign-in')
        }
      })
    }

    return () => {
      isMounted.current = false
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMounted])

  const onMutate = (e) => {
    let boolean = null

    if (e.target.value === 'true') {
      boolean = true
    }
    if (e.target.value === 'false') {
      boolean = false
    }
    // Files
    if (e.target.files) {
      setFormData((prevState) => ({
        ...prevState,
        [e.target.id]: e.target.files,
      }))
    }

    // text/numbers
    if (!e.target.files) {
      setFormData((prevState) => ({
        ...prevState,
        [e.target.id]: boolean ?? e.target.value,
      }))
    }
  }

  const onSubmit = async (e) => {
    e.preventDefault()

    setLoading(true)

    if (images.length > 6) {
      setLoading(false)
      toast.error("Max 6 sur'at")
      return
    }

    if (icon.length > 1) {
      setLoading(false)
      toast.error('Max 1 ikonka')
      return
    }

    // Store image in firebase
    const storeImage = async (image) => {
      return new Promise((resolve, reject) => {
        const storage = getStorage()
        const fileName = `${auth.currentUser.uid}-${image.name}-${uuidv4()}`

        const storageRef = ref(storage, 'images/' + fileName)

        const uploadTask = uploadBytesResumable(storageRef, image)

        uploadTask.on(
          'state_changed',
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            console.log('Upload is ' + progress + '% done')
            switch (snapshot.state) {
              case 'paused':
                console.log('Upload is paused')
                break
              case 'running':
                console.log('Upload is running')
                break
              default:
                break
            }
          },
          (error) => {
            reject(error)
          },
          () => {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              resolve(downloadURL)
            })
          }
        )
      })
    }

    const imageUrls = await Promise.all(
      [...images].map((image) => storeImage(image))
    ).catch(() => {
      setLoading(false)
      toast.error('Suratlar yuklanmadi')
      return
    })

    const iconUrl = await Promise.all(
      [...icon].map((image) => storeImage(image))
    ).catch(() => {
      setLoading(false)
      toast.error('Ikonka yuklanmadi')
      return
    })

    const formDataCopy = {
      ...formData,
      imageUrls,
      iconUrl,
      timestamp: serverTimestamp(),
    }

    delete formDataCopy.images
    delete formDataCopy.icon

    // Update Listing
    const docRef = doc(db, 'listings', params.listingId)
    await updateDoc(docRef, formDataCopy)
    setLoading(false)
    toast.success("Ro'yxat saqlandi")
    navigate(`/category/${formDataCopy.type}/${docRef.id}`)
  }

  if (loading) {
    return <Spinner />
  }

  return (
    <>
      <p className="text-2xl sm:text-4xl lg:text-5xl uppercase font-extrabold p-4 text-center">
        <span className="text-accent">Ro'yxatni O'zgartirish</span>
      </p>

      <main className="mx-auto border-4 rounded-xl border-base-300 p-5 w-11/12 sm:w-9/12 sm:p-10">
        <form onSubmit={onSubmit} className="form-control">
          <div className="btn-group mx-auto my-5 justify-center">
            <input
              type="radio"
              name="type"
              value="software-apps"
              id="type"
              data-title="software apps"
              className={`btn rounded-none ${
                'software-apps' === formData.type ? 'btn-active' : ''
              }`}
              onClick={onMutate}
              required
            />
            <input
              type="radio"
              name="type"
              value="mobile-apps"
              id="type"
              data-title="mobile apps"
              className={`btn rounded-none ${
                'mobile-apps' === formData.type ? 'btn-active' : ''
              }`}
              onClick={onMutate}
              required
            />
            <input
              type="radio"
              name="type"
              value="software-games"
              id="type"
              data-title="software games"
              className={`btn rounded-none ${
                'software-games' === formData.type ? 'btn-active' : ''
              }`}
              onClick={onMutate}
              required
            />
            <input
              type="radio"
              name="type"
              value="mobile-games"
              id="type"
              data-title="mobile games"
              className={`btn rounded-none ${
                'mobile-games' === formData.type ? 'btn-active' : ''
              }`}
              onClick={onMutate}
              required
            />
            <input
              type="radio"
              name="type"
              value="windows-os"
              id="type"
              data-title="windows os"
              className={`btn rounded-none ${
                'windows-os' === formData.type ? 'btn-active' : ''
              }`}
              onClick={onMutate}
              required
            />
          </div>

          <div className="btn-group mx-auto my-5 justify-center">
            {type === 'software-games' || type === 'mobile-games' ? (
              gamesCategory.map((category) => (
                <input
                  type="radio"
                  name="category"
                  value={category.toLowerCase()}
                  id="category"
                  data-title={category}
                  className={`btn rounded-none ${
                    category.toLowerCase() === formData.category
                      ? 'btn-active'
                      : ''
                  }`}
                  key={gamesCategory.indexOf(category)}
                  onClick={onMutate}
                  required
                />
              ))
            ) : type === 'software-apps' ? (
              softwareCategory.map((category) => (
                <input
                  type="radio"
                  name="category"
                  value={category.toLowerCase()}
                  id="category"
                  data-title={category}
                  className={`btn rounded-none ${
                    category.toLowerCase() === formData.category
                      ? 'btn-active'
                      : ''
                  }`}
                  key={softwareCategory.indexOf(category)}
                  onClick={onMutate}
                  required
                />
              ))
            ) : type === 'mobile-apps' ? (
              mobileCategory.map((category) => (
                <input
                  type="radio"
                  name="category"
                  value={category.toLowerCase()}
                  id="category"
                  data-title={category}
                  className={`btn rounded-none ${
                    category.toLowerCase() === formData.category
                      ? 'btn-active'
                      : ''
                  }`}
                  key={mobileCategory.indexOf(category)}
                  onClick={onMutate}
                  required
                />
              ))
            ) : type === 'windows-os' ? (
              windowsCategory.map((category) => (
                <input
                  type="radio"
                  name="category"
                  value={category.toLowerCase()}
                  id="category"
                  data-title={category.replace('-', ' ')}
                  className={`btn rounded-none ${
                    category.toLowerCase() === formData.category
                      ? 'btn-active'
                      : ''
                  }`}
                  key={windowsCategory.indexOf(category)}
                  onClick={onMutate}
                  required
                />
              ))
            ) : (
              <></>
            )}
          </div>

          <label className="label">
            <span className="label-text">Nomi</span>
          </label>
          <input
            type="text"
            name="name"
            id="name"
            value={name}
            onChange={onMutate}
            className="input input-bordered"
            placeholder="Ilova nomi"
            required
          />

          <div className="grid grid-cols-2 lg:grid-cols-3 sm:grid-rows-2 items-end gap-2">
            <div className="lg:pr-10">
              <label className="label">
                <span className="label-text">Versiya</span>
              </label>
              <input
                type="text"
                name="version"
                value={version}
                onChange={onMutate}
                id="version"
                className="input input-bordered w-full"
                placeholder="Ilova Versiyasi"
                required
              />
            </div>
            <div className="lg:pr-10">
              <label className="label">
                <span className="label-text">Yosh Chegarasi</span>
              </label>
              <input
                type="number"
                name="ageLimit"
                id="ageLimit"
                className="input input-bordered w-full"
                placeholder="Yosh Chegarasi"
                value={ageLimit}
                onChange={onMutate}
                min="0"
                max="100"
                required
              />{' '}
            </div>
            <div>
              <label className="label">
                <span className="label-text">Operatsion Sistema (OS)</span>
              </label>
              <input
                type="text"
                name="os"
                id="os"
                value={os}
                onChange={onMutate}
                className="input input-bordered w-full"
                placeholder="Windows 7, Windows 10"
                required
              />
            </div>
            <div className="lg:pr-10">
              <label className="label">
                <span className="label-text">
                  {os.includes('Windows')
                    ? 'CPU'
                    : os.includes('MacOS')
                    ? 'CPU'
                    : os.includes('iOS')
                    ? "iOS'ning talab qilingan versiyasi"
                    : os.includes('Android')
                    ? "iOS'ning talab qilingan versiyasi"
                    : "OS'ning talab qilingan versiyasi"}
                </span>
              </label>
              <input
                type="text"
                name="cpu"
                id="cpu"
                value={cpu}
                onChange={onMutate}
                className="input input-bordered w-full"
                placeholder={
                  os.includes('Windows')
                    ? '32-bit, 64-bit, 86-bit'
                    : os.includes('MacOS')
                    ? '32-bit, 64-bit, 86-bit'
                    : os.includes('iOS')
                    ? '10.0<'
                    : os.includes('Android')
                    ? '11<'
                    : '3.1<'
                }
                required
              />
            </div>
            <div className="lg:pr-10">
              <label className="label">
                <span className="label-text">O'lcham</span>
              </label>
              <input
                type="text"
                name="size"
                id="size"
                value={size}
                onChange={onMutate}
                className="input input-bordered w-full"
                placeholder="Umumiy o'lchamni MB yoki GB orqali ko'rsating"
                required
              />
            </div>
            <div>
              <label className="label">
                <span className="label-text">Yuklash uchun Link</span>
              </label>
              <input
                type="text"
                name="linkToDownload"
                id="linkToDownload"
                value={linkToDownload}
                onChange={onMutate}
                className="input input-bordered w-full"
                placeholder="https://. . ."
                required
              />
            </div>
          </div>
          <label className="label">
            <span className="label-text">Tillar</span>
          </label>
          <input
            type="text"
            name="languages"
            id="languages"
            value={languages}
            onChange={onMutate}
            className="input input-bordered w-full"
            placeholder="Ilovada mavjud tillar"
            required
          />
          <label className="label">
            <span className="label-text">Umumiy sharh</span>
          </label>
          <textarea
            className="textarea textarea-bordered h-24"
            value={overview}
            type="text"
            id="overview"
            onChange={onMutate}
            placeholder=". . ."
            required
          ></textarea>
          <label className="label">Ikonka (ilova belgisi)</label>
          <input
            className="formInputFile bg-base-200 rounded-t-lg p-2"
            type="file"
            id="icon"
            onChange={onMutate}
            max="1"
            accept=".jpg,.png,.jpeg"
            required
          />
          <div className="alert alert-info rounded-t-none">
            <div className="flex-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="w-6 h-6 mx-2 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              <label>
                Ikonka uchun Max 1 surat (.png format tavsiya etiladi)
              </label>
            </div>
          </div>
          <label className="label">Suratlar</label>

          <input
            className="formInputFile bg-base-200 rounded-t-lg p-2"
            type="file"
            id="images"
            onChange={onMutate}
            max="6"
            accept=".jpg,.png,.jpeg"
            multiple
            required
          />
          <div className="alert alert-info rounded-t-none">
            <div className="flex-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="w-6 h-6 mx-2 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              <label>Max 6 surat</label>
            </div>
          </div>
          <div className="p-6 w-max mx-auto">
            <label className="formLabel">
              Tavsiya etiladimi? (rekomendatsiya)
            </label>
            <div className="btn-group w-max mt-5 mx-auto">
              <button
                className={recommended ? 'btn btn-active' : 'btn'}
                type="button"
                id="recommended"
                value={true}
                onClick={onMutate}
              >
                Ha
              </button>
              <button
                className={
                  !recommended && recommended !== null
                    ? 'btn btn-active'
                    : 'btn'
                }
                type="button"
                id="recommended"
                value={false}
                onClick={onMutate}
              >
                Yo'q
              </button>
            </div>
          </div>
          <button type="submit" className="btn btn-primary mt-10">
            O'zgartirish
          </button>
        </form>
      </main>
    </>
  )
}

export default EditListing
