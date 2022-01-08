import { useState, useEffect, useRef, useContext } from 'react'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { db } from '../firebase.config'
import { useNavigate } from 'react-router-dom'
import Spinner from '../components/Spinner'
import CategoryContext from '../context/CategoryContext'
import { toast } from 'react-toastify'
import { v4 as uuidv4 } from 'uuid'

function CreateListing() {
  const { gamesCategory, mobileCategory, softwareCategory } =
    useContext(CategoryContext)

  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    ageLimit: 0,
    category: '',
    cpu: '',
    images: [],
    icon: [],
    languages: '',
    linkToDownload: '',
    name: '',
    overview: '',
    os: '',
    size: '',
    type: '',
    version: '',
    userRef: '',
  })

  const {
    ageLimit,
    cpu,
    images,
    icon,
    languages,
    linkToDownload,
    name,
    overview,
    os,
    size,
    type,
    version,
  } = formData

  const auth = getAuth()
  const navigate = useNavigate()
  const isMounted = useRef(true)

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
        [e.target.id]: e.target.value,
      }))
    }
  }

  const onSubmit = async (e) => {
    e.preventDefault()

    setLoading(true)

    if (images.length > 6) {
      setLoading(false)
      toast.error('Max 6 images')
      return
    }

    if (icon.length > 1) {
      setLoading(false)
      toast.error('Max 1 icon')
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
      toast.error('Images not uploaded')
      return
    })

    const iconUrl = await Promise.all(
      [...icon].map((image) => storeImage(image))
    ).catch(() => {
      setLoading(false)
      toast.error('Icon not uploaded')
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

    const docRef = await addDoc(collection(db, 'listings'), formDataCopy)
    setLoading(false)
    toast.success('Listing saved')
    navigate(`/category/${formDataCopy.type}/${docRef.id}`)
  }

  if (loading) {
    return <Spinner />
  }

  return (
    <>
      <header className="text-5xl sm:text-6xl font-extrabold text-center my-6">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-500 text-shadow-lg">
          Create Listing
        </span>
      </header>

      <main className=" card bg-base-300 mx-auto p-5 w-11/12 sm:w-9/12 sm:p-10">
        <form onSubmit={onSubmit} className="form-control">
          <div className="btn-group mx-auto my-5 justify-center">
            <input
              type="radio"
              name="type"
              value="software-apps"
              id="type"
              data-title="software apps"
              className="btn"
              onClick={onMutate}
            />
            <input
              type="radio"
              name="type"
              value="mobile-apps"
              id="type"
              data-title="mobile apps"
              className="btn"
              onClick={onMutate}
            />
            <input
              type="radio"
              name="type"
              value="software-games"
              id="type"
              data-title="software games"
              className="btn"
              onClick={onMutate}
            />
            <input
              type="radio"
              name="type"
              value="mobile-games"
              id="type"
              data-title="mobile games"
              className="btn"
              onClick={onMutate}
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
                  className="btn"
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
                  className="btn"
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
                  className="btn"
                  key={mobileCategory.indexOf(category)}
                  onClick={onMutate}
                  required
                />
              ))
            ) : (
              <></>
            )}
          </div>

          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input
            type="text"
            name="name"
            id="name"
            value={name}
            onChange={onMutate}
            className="input"
            placeholder="Application Name"
            required
          />

          <div className="grid grid-cols-3 grid-rows-2">
            <div className="pr-10">
              <label className="label">
                <span className="label-text">Version</span>
              </label>
              <input
                type="text"
                name="version"
                value={version}
                onChange={onMutate}
                id="version"
                className="input w-full"
                placeholder="Version"
              />
            </div>
            <div className="pr-10">
              <label className="label">
                <span className="label-text">Age Limit</span>
              </label>
              <input
                type="number"
                name="ageLimit"
                id="ageLimit"
                className="input w-full"
                placeholder="Age Limit"
                value={ageLimit}
                onChange={onMutate}
                min="0"
                max="100"
              />{' '}
            </div>
            <div>
              <label className="label">
                <span className="label-text">Operating System (OS)</span>
              </label>
              <input
                type="text"
                name="os"
                id="os"
                value={os}
                onChange={onMutate}
                className="input w-full"
                placeholder="Windows 7, Windows 10"
                required
              />
            </div>
            <div className="pr-10">
              <label className="label">
                <span className="label-text">
                  {os.includes('Windows')
                    ? 'CPU'
                    : os.includes('MacOS')
                    ? 'CPU'
                    : os.includes('iOS')
                    ? 'Required version iOS'
                    : os.includes('Android')
                    ? 'Required version Android'
                    : 'Required version OS'}
                </span>
              </label>
              <input
                type="text"
                name="cpu"
                id="cpu"
                value={cpu}
                onChange={onMutate}
                className="input w-full"
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
            <div className="pr-10">
              <label className="label">
                <span className="label-text">Size</span>
              </label>
              <input
                type="text"
                name="size"
                id="size"
                value={size}
                onChange={onMutate}
                className="input w-full"
                placeholder="Show the full size with MB or GB"
                required
              />
            </div>
            <div>
              <label className="label">
                <span className="label-text">Link to download</span>
              </label>
              <input
                type="text"
                name="linkToDownload"
                id="linkToDownload"
                value={linkToDownload}
                onChange={onMutate}
                className="input w-full"
                placeholder="Link to download"
              />
            </div>
          </div>
          <label className="label">
            <span className="label-text">Languages</span>
          </label>
          <input
            type="text"
            name="languages"
            id="languages"
            value={languages}
            onChange={onMutate}
            className="input w-full"
            placeholder="Languages"
            required
          />
          <label className="label">
            <span className="label-text">Overview</span>
          </label>
          <textarea
            className="textarea h-24"
            value={overview}
            type="text"
            id="overview"
            onChange={onMutate}
            placeholder=". . ."
            required
          ></textarea>
          <label className="label">Icon</label>
          <input
            className="formInputFile bg-base-100 rounded-xl p-2"
            type="file"
            id="icon"
            onChange={onMutate}
            max="1"
            accept=".jpg,.png,.jpeg"
            required
          />
          <div class="alert alert-info">
            <div class="flex-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                class="w-6 h-6 mx-2 stroke-current"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              <label>Max 1 image for icon</label>
            </div>
          </div>
          <label className="label">Images</label>

          <input
            className="formInputFile bg-base-100 rounded-xl p-2"
            type="file"
            id="images"
            onChange={onMutate}
            max="6"
            accept=".jpg,.png,.jpeg"
            multiple
            required
          />
          <div class="alert alert-info">
            <div class="flex-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                class="w-6 h-6 mx-2 stroke-current"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              <label>The first image will be the cover (max 6)</label>
            </div>
          </div>
          <button type="submit" className="btn btn-primary mt-10">
            Create Listing
          </button>
        </form>
      </main>
    </>
  )
}

export default CreateListing
