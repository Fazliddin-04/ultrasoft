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
  const [imgFullScreen, setImgFullScreen] = useState(false)
  const [imgSrc, setImgSrc] = useState('')

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
    'Yanvar',
    'Fevral',
    'Mart',
    'Aprel',
    'May',
    'Iyun',
    'Iyul',
    'Avgust',
    'Sentabr',
    'Oktabr',
    'Noyabr',
    'Dekabr',
  ]

  let year
  let month
  let day
  const viewFullScreen = (e) => {
    setImgSrc(e.target.src)
    setImgFullScreen(true)
  }

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
      <div className={`view ${imgFullScreen && 'active'}`}>
        <img src={imgSrc} alt="pic" />
        <div className="view__close" onClick={() => setImgFullScreen(false)}>
          <i className="fas fa-times"></i>
        </div>
      </div>
      <div className="text-sm breadcrumbs px-5">
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
        <div className="flex items-center">
          <span className="h-40 w-40 md:h-40 md:w-40 lg:h-52 lg:w-52 xl:h-60 xl:w-60 bg-base-300 mask mask-squircle flex items-center mr-5">
            <img
              src={listing.iconUrl[0]}
              alt="icon"
              className="object-cover object-top"
              onClick={viewFullScreen}
            />
          </span>
          <div>
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-5">
              {listing.name}
            </h2>
          </div>
        </div>
        <div className="flex flex-row">
          <span>{listing.ageLimit}+</span>
          <div className="divider divider-vertical"></div>
          <span className="capitalize">{listing.category}</span>
          <div className="divider divider-vertical"></div>
          <span>
            <span className="inline-block h-4 w-4 bg-accent mask mask-star-2"></span>
            <span className="inline-block h-4 w-4 bg-accent mask mask-star-2"></span>
            <span className="inline-block h-4 w-4 bg-accent mask mask-star-2"></span>
            <span className="inline-block h-4 w-4 bg-accent mask mask-star-2"></span>
            <span className="inline-block h-4 w-4 bg-accent mask mask-star-2"></span>
          </span>
        </div>
        <div className="ml-auto flex items-start">
          <a
            href={listing.linkToDownload}
            className="btn btn-wide btn-lg btn-animate"
          >
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            Yuklab olish
          </a>
          <div className="dropdown dropdown-end ml-3">
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
      <div className="bg-base-200 rounded-t-xl py-5 mt-10 listing-slide-container">
        <Swiper
          slidesPerView={1}
          navigation={true}
          pagination={{ clickable: true }}
          className="w-5/6"
          loop={true}
          style={{
            '--swiper-navigation-color':
              'hsla(var(--p) / var(--tw-bg-opacity, 1))',
            '--swiper-pagination-color': '#fff',
          }}
        >
          {listing.imageUrls.map((url, index) => (
            <SwiperSlide key={index}>
              <div className="swiper-zoom-container h-full w-full relative">
                <img src={`${url}`} alt="pic" onClick={viewFullScreen} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="flex justify-around gap-10 my-10 px-5">
        <div className="w-2/3">
          <h2 className="text-xl md:text-2xl lg:text-3xl font-medium mb-5">
            Umumiy sharh
          </h2>
          <p className="md:text-xl">{listing.overview}</p>
        </div>
        <div className="w-max">
          <h2 className="text-xl md:text-2xl lg:text-3xl font-medium mb-5">
            Qo'shimcha ma'lumotlar
          </h2>
          <p className="md:text-xl font-medium">Versiya</p>
          <p className="md:text-xl mb-5">
            {listing.version.replace(/[`~!@#$%^&*()_|+=?;:'",\][<>{}]/gi, ' ')}
          </p>
          <p className="md:text-xl font-medium">O'lchami</p>
          <p className="md:text-xl mb-5">
            {listing.size
              .replace(/[`~!@#$%^&*()_|+=?;:'",<>{}]/gi, ' ')
              .toUpperCase()}
          </p>
          <p className="md:text-xl font-medium">Yangilandi</p>
          <p className="md:text-xl mb-5">
            {day} {months[month]} {year}
          </p>
          <p className="md:text-xl font-medium">Operatsion Sistema</p>
          <p className="md:text-xl mb-5">{listing.os}</p>
          <p className="md:text-xl font-medium">
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
          <p className="md:text-xl mb-5">
            {listing.cpu.replace(/[`~!@#$%^&*()_|+=?;:'",.<>{}]/gi, ' ')}
          </p>
          <p className="md:text-xl font-medium">Tillar</p>
          <p className="md:text-xl mb-5 capitalize">
            {listing.languages.replace(/[`~!@#$%^&*()_|+=?;:'"/<>{}]/gi, ', ')}
          </p>
        </div>
      </div>
    </>
  )
}

export default Listing
