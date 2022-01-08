import { React, useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

import { getDoc, doc } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { db } from '../firebase.config'
import Spinner from '../components/Spinner'
import useFileDownloader from '../hooks/useFileDownloader'

import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/swiper-bundle.css'
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y])

function Listing() {
  const [listing, setListing] = useState(null)
  const [loading, setLoading] = useState(true)
  // eslint-disable-next-line
  const [shareLinkCopied, setShareLinkCopied] = useState(false)
  const [downloadFile, downloaderComponentUI] = useFileDownloader()

  // eslint-disable-next-line
  const download = (file) => downloadFile(file)

  const navigate = useNavigate()
  const params = useParams()
  const auth = getAuth()

  console.log(auth)

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
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to={`/category/${listing.type}`} className="capitalize">
              {listing.type.replace('-', ' ')}
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
            Download
          </a>
        </div>
        {downloaderComponentUI}
      </div>
      <div className="bg-base-300 rounded-xl py-10 my-10">
        <Swiper
          slidesPerView={1}
          navigation={true}
          pagination={{ clickable: true }}
          className="w-5/6"
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
          <h2 className="text-3xl font-medium mb-5">Overview</h2>
          <p className="text-xl">{listing.overview}</p>
        </div>
        <div>
          <h2 className="text-3xl font-medium mb-5">Additional informations</h2>
          <p className="text-xl font-medium">Version</p>
          <p className="text-xl mb-5">{listing.version}</p>
          <p className="text-xl font-medium">Size</p>
          <p className="text-xl mb-5">{listing.size} </p>
          <p className="text-xl font-medium">Updated</p>
          <p className="text-xl mb-5">
            {day} {months[month]} {year}
          </p>
          <p className="text-xl font-medium">Operating System</p>
          <p className="text-xl mb-5">{listing.os}</p>
          <p className="text-xl font-medium">
            {listing.os.includes('Windows')
              ? 'CPU'
              : listing.os.includes('MacOS')
              ? 'CPU'
              : listing.os.includes('iOS')
              ? 'Required version iOS'
              : listing.os.includes('Android')
              ? 'Required version Android'
              : 'Required version OS'}
          </p>
          <p className="text-xl mb-5">{listing.cpu}</p>
          <p className="text-xl font-medium">Languages</p>
          <p className="text-xl mb-5">{listing.languages}</p>
        </div>
      </div>
    </>
  )
}

export default Listing
