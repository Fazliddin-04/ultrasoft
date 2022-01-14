import { useEffect, useState } from 'react'
import { getAuth, updateProfile } from 'firebase/auth'
import {
  doc,
  updateDoc,
  collection,
  getDocs,
  query,
  where,
  orderBy,
  deleteDoc,
} from 'firebase/firestore'
import { db } from '../firebase.config'
import { toast } from 'react-toastify'
import { useNavigate, Link } from 'react-router-dom'
import ListingItem from '../components/ListingItem'

function Profile() {
  const auth = getAuth()
  const [menuListings, setMenuListings] = useState(false)
  const [changeDetails, setChangeDetails] = useState(false)
  const [loading, setLoading] = useState(true)
  const [listings, setListings] = useState(null)
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  })

  const { name, email } = formData

  const navigate = useNavigate()

  useEffect(() => {
    const fetchUserListings = async () => {
      const listingsRef = collection(db, 'listings')

      const q = query(
        listingsRef,
        where('userRef', '==', auth.currentUser.uid),
        orderBy('timestamp', 'desc')
      )

      const querySnap = await getDocs(q)

      let listings = []

      querySnap.forEach((doc) => {
        listings.push({
          id: doc.id,
          data: doc.data(),
        })
      })

      setListings(listings)
      setLoading(false)
    }

    fetchUserListings()
  }, [auth.currentUser.uid])

  const onLogout = () => {
    auth.signOut()
    navigate('/')
  }

  const onDelete = async (listingId) => {
    if (window.confirm("O'chirishni xohlaganingizga ishonchingiz komilmi?")) {
      await deleteDoc(doc(db, 'listings', listingId))
      const updatedListings = listings.filter(
        (listing) => listing.id !== listingId
      )
      setListings(updatedListings)
      toast.success("Ro'yxat muvaffaqiyatli o'chirildi")
    }
  }

  const onEdit = (listingId) => navigate(`/edit-listing/${listingId}`)

  const onSubmit = async () => {
    try {
      if (auth.currentUser.displayName !== name) {
        // update display name in fb
        await updateProfile(auth.currentUser, {
          displayName: name,
        })

        // update in firestore
        const userRef = doc(db, 'users', auth.currentUser.uid)
        await updateDoc(userRef, { name })
      }
    } catch (error) {
      toast.error("Shaxsiy ma'lumotlarni o'zgartirib bo'lmadi")
    }
  }

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }))
  }

  return (
    <div>
      <div className="text-6xl bg-base-300 p-8 font-bold my-3 flex flex-wrap items-center justify-between gap-5 rounded-xl">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-500 text-shadow-lg">
          Salom {name.split(' ')[0]}!
        </span>

        <button className="btn btn-secondary" type="button" onClick={onLogout}>
          Chiqish
        </button>
      </div>

      <div className="bg-base-300 rounded-xl p-8 mb-90">
        <div className="p-1 rounded-xl flex  items-start justify-between w-full h-full flex-col xl:flex-row">
          <div className="p-4 bg-base-200 rounded-xl flex-1 w-full">
            <ul
              className="menu py-3 shadow-lg bg-base-100 rounded-box w-full"
              id="main-menu"
            >
              <li
                className={!menuListings ? 'bordered' : ''}
                onClick={() => {
                  setMenuListings(false)
                }}
              >
                <span>Shaxsiy ma'lumotlar</span>
              </li>
              {auth.currentUser.uid === 'Hcmq9D3NnRbp2NrDTF499tNCU2H2' ? (
                <li
                  className={menuListings ? 'bordered' : ''}
                  onClick={() => {
                    setMenuListings(true)
                  }}
                >
                  <span>Ro'yxatlar</span>
                </li>
              ) : auth.currentUser.uid === 'jU9RlhVGJqVfqHi0GSlURRFGdKC2' ? (
                <li
                  className={menuListings ? 'bordered' : ''}
                  onClick={() => {
                    setMenuListings(true)
                  }}
                >
                  <span>Ro'yxatlar</span>
                </li>
              ) : (
                <></>
              )}
            </ul>
          </div>
          <div className="p-4 bg-base-200 flex-1 rounded-xl h-full w-full xl:ml-2">
            <ul className="p-4 shadow-lg bg-base-100 rounded-box h-full">
              {!menuListings ? (
                <>
                  <div className="flex items-center justify-between flex-wrap gap-5">
                    <p className="text-xl">Shaxsiy ma'lumotlar</p>
                    <button
                      className="btn btn-active"
                      onClick={() => {
                        changeDetails && onSubmit()
                        setChangeDetails((prevState) => !prevState)
                      }}
                    >
                      {changeDetails ? 'Bajarildi' : "O'zgartirish"}
                    </button>
                  </div>

                  <form className="form-control">
                    <label className="label">
                      <span className="label-text">Ism</span>
                    </label>
                    <input
                      type="text"
                      placeholder="username"
                      className="input input-bordered"
                      value={name}
                      id="name"
                      disabled={!changeDetails ? 'disabled' : ''}
                      onChange={onChange}
                    />
                    <label className="label">
                      <span className="label-text">Email</span>
                    </label>
                    <input
                      type="email"
                      placeholder="Email"
                      className="input input-bordered"
                      id="email"
                      value={email}
                      disabled={!changeDetails ? 'disabled' : ''}
                      onChange={onChange}
                    />
                  </form>
                </>
              ) : (
                <div className="max-h-90 overflow-y-auto h-full">
                  <div className="w-full h-12">
                    <Link
                      to="/create-listing"
                      className="btn btn-primary float-right"
                    >
                      <span className="mr-2">
                        <i className="far fa-plus"></i>
                      </span>
                      Ro'yxat yaratish
                    </Link>
                  </div>
                  {!loading && listings?.length > 0 && (
                    <div className="p-4 sm:p-0">
                      <h2 className="text-3xl my-4 font-bold">
                        Sizning Ro'yxatlar
                      </h2>
                      <ul className="flex flex-wrap items-center p-0 gap-10">
                        {listings.map((listing) => (
                          <ListingItem
                            key={listing.id}
                            listing={listing.data}
                            id={listing.id}
                            onDelete={() => onDelete(listing.id)}
                            onEdit={() => onEdit(listing.id)}
                            classes="card-compact lg:card-side"
                            cardFigureClass="explore-card-figure p-5"
                          />
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
