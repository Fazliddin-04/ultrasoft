import { React, useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

import { getDoc, doc } from 'firebase/firestore'
import { db } from '../firebase.config'
import Spinner from '../components/Spinner'

import SwiperCore, {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Zoom,
} from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/swiper-bundle.css'
SwiperCore.use([Zoom, Navigation, Pagination, Scrollbar, A11y])

function Listing() {
  const [listing, setListing] = useState(null)
  const [loading, setLoading] = useState(true)
  // eslint-disable-next-line
  const [shareLinkCopied, setShareLinkCopied] = useState(false)

  const navigate = useNavigate()
  const params = useParams()

  useEffect(() => {
    const fetchListing = async () => {
      const docRef = doc(db, 'listings', params.listingId)
      const docSnap = await getDoc(docRef)

      if (docSnap.exists()) {
        setListing(docSnap.data())
        setLoading(false)
      }
    }

    fetchListing()
  }, [navigate, params.listingId])

  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]

  let year
  let month
  let day

  if (!loading) {
    let date = new Date(listing.timestamp.seconds * 1000)
    year = date.getFullYear()
    month = date.getMonth()
    day = date.getDate()
  }

  if (loading) {
    return <Spinner />
  }

  return (
    <>
      <div className="text-sm breadcrumbs">
        <ul className="flex flex-wrap">
          <li>
            <Link to="/">Bosh sahifa</Link>
          </li>
          <li>
            <Link to={`/${listing.type}`} className="capitalize">
              {listing.type === 'software-apps'
                ? 'Kompyuter ilovalar'
                : listing.type === 'software-games'
                ? "Kompyuter o'yinlar"
                : listing.type === 'mobile-apps'
                ? 'Mobil ilovalar'
                : listing.type === 'mobile-games'
                ? "Mobil o'yinlar"
                : listing.type.toUpperCase().replace('-', ' ')}
            </Link>
          </li>
          <li>
            <Link
              to={`/${listing.type}/${listing.category}`}
              className="capitalize"
            >
              {listing.category.replace('-', ' ')}
            </Link>
          </li>
          <li>{listing.name}</li>
        </ul>
      </div>
      <div className="flex flex-wrap gap-5 items-center justify-center sm:justify-between my-5 w-4/5 mx-auto">
        <div className="flex flex-wrap items-center">
          <span className="h-40 w-40 bg-base-300 mask mask-squircle flex items-center mr-5">
            <img src={listing.iconUrl[0]} alt="icon" className="object-cover" />
          </span>
          <div>
            <h2 className="text-5xl font-bold mb-5">{listing.name}</h2>
            <div className="flex flex-row">
              <span>{listing.ageLimit}+</span>
              <div className="divider divider-vertical"></div>
              <span>{listing.category}</span>
              <div className="divider divider-vertical"></div>
              <span>
                <span className="inline-block h-4 w-4 bg-accent mask mask-star-2"></span>
                <span className="inline-block h-4 w-4 bg-accent mask mask-star-2"></span>
                <span className="inline-block h-4 w-4 bg-accent mask mask-star-2"></span>
                <span className="inline-block h-4 w-4 bg-accent mask mask-star-2"></span>
                <span className="inline-block h-4 w-4 bg-accent mask mask-star-2"></span>
              </span>
            </div>
          </div>
        </div>
        <div className="ml-auto">
          <a
            href={listing.linkToDownload}
            className="btn btn-wide btn-lg btn-animate"
            download={`${listing.name}_${listing.version}.exe`}
          >
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            Yuklab olish
          </a>
          <div className="dropdown dropdown-end">
            <div
              tabIndex="0"
              className="btn btn-circle btn-ghost btn-xs text-info"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline w-5 h-5 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
            </div>
            <div
              tabIndex="0"
              className="shadow card compact dropdown-content bg-base-100 rounded-box w-52"
            >
              <div className="card-body">
                <h2 className="card-title">
                  Yuklab olish uchun linklar xavfsiz sahifada!
                </h2>
                <p>
                  Ba'zi bir sabablarga ko'ra, vaqtinchalik shu holatda
                  foydalanib turishingizni iltimos qilamiz. Nosozliklar uchun
                  uzr so'raymiz
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-base-300 rounded-t-xl py-10 mt-10 listing-slide-container">
        <Swiper
          slidesPerView={1}
          zoom={true}
          navigation={true}
          pagination={{ clickable: true }}
          className="w-5/6 "
          loop={true}
          style={{
            '--swiper-navigation-color': '#fff',
            '--swiper-pagination-color': '#fff',
          }}
        >
          {listing.imageUrls.map((url, index) => (
            <SwiperSlide key={index}>
              <div className="swiper-zoom-container h-full w-full relative">
                <img src={`${url}`} alt="pic" />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="alert alert-info mb-10 rounded-t-none">
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
          <label>Yaqinlashtirish uchun, rasm ustiga 2 marta bosing</label>
        </div>
      </div>
      <div className="flex justify-around my-5">
        <div>
          <h2 className="text-3xl font-medium mb-5">Umumiy sharh</h2>
          <p className="text-xl">{listing.overview}</p>
        </div>
        <div className="w-max">
          <h2 className="text-3xl font-medium mb-5">Qo'shimcha ma'lumotlar</h2>
          <p className="text-xl font-medium">Versiya</p>
          <p className="text-xl mb-5">{listing.version}</p>
          <p className="text-xl font-medium">O'lchami</p>
          <p className="text-xl mb-5">{listing.size} </p>
          <p className="text-xl font-medium">Yangilandi</p>
          <p className="text-xl mb-5">
            {day} {months[month]} {year}
          </p>
          <p className="text-xl font-medium">Operatsion Sistema</p>
          <p className="text-xl mb-5">{listing.os}</p>
          <p className="text-xl font-medium">
            {listing.os.includes('Windows')
              ? 'CPU'
              : listing.os.includes('MacOS')
              ? 'CPU'
              : listing.os.includes('iOS')
              ? "iOS'ning talab qilingan versiyasi"
              : listing.os.includes('Android')
              ? "iOS'ning talab qilingan versiyasi"
              : "OS'ning talab qilingan versiyasi"}
          </p>
          <p className="text-xl mb-5">{listing.cpu}</p>
          <p className="text-xl font-medium">Tillar</p>
          <p className="text-xl mb-5">{listing.languages}</p>
        </div>
      </div>
    </>
  )
}

export default Listing
