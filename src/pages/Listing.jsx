import { React, useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

import { getDoc, doc } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { db } from '../firebase.config'
import Spinner from '../components/Spinner'

import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/swiper-bundle.css'
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y])

function Listing() {
  const [listing, setListing] = useState(null)
  const [loading, setLoading] = useState(true)
  // eslint-disable-next-line
  const [shareLinkCopied, setShareLinkCopied] = useState(false)

  const navigate = useNavigate()
  const params = useParams()
  const auth = getAuth()

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
        <ul>
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
      <div className="flex items-center justify-between my-5">
        <div className="flex items-center">
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
        <div>
          <a
            href={listing.linkToDownload}
            className="btn btn-primary"
            download={`${listing.name}_${listing.version}.exe`}
          >
            Yuklab olish
          </a>
        </div>
      </div>
      <div className="bg-base-300 rounded-xl py-10 my-10 listing-slide-container">
        <Swiper
          slidesPerView={1}
          navigation={true}
          pagination={{ clickable: true }}
          className="w-5/6 "
        >
          {listing.imageUrls.map((url, index) => (
            <SwiperSlide key={index}>
              <div
                style={{
                  background: `center / contain no-repeat url(${url})`,
                }}
                className="h-full w-full relative"
              ></div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="flex justify-around my-5">
        <div>
          <h2 className="text-3xl font-medium mb-5">Umumiy sharh</h2>
          <p className="text-xl">{listing.overview}</p>
        </div>
        <div>
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
