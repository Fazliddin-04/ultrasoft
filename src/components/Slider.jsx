import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore'
import { db } from '../firebase.config'
import Spinner from './Spinner'

import SwiperCore, {
  Autoplay,
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
} from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/swiper-bundle.css'
SwiperCore.use([Autoplay, Navigation, Pagination, Scrollbar, A11y])

function Slider() {
  const [loading, setLoading] = useState(true)
  const [listings, setListings] = useState(null)

  const navigate = useNavigate()

  useEffect(() => {
    const fetchListings = async () => {
      const listingsRef = collection(db, 'listings')
      const q = query(listingsRef, orderBy('timestamp', 'desc'), limit(5))
      const querySnap = await getDocs(q)

      const listings = []

      querySnap.forEach((doc) => {
        listings.push({ id: doc.id, data: doc.data() })
      })
      setListings(listings)
      setLoading(false)
    }

    fetchListings()
  }, [])

  if (loading) {
    return <Spinner />
  }

if (listings.length === 0) {
  return <></>
}

  return (
    listings && (
      <>
        <p className="text-5xl sm:text-6xl font-extrabold my-6">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-500 text-shadow-lg">
            Recommended
          </span>
        </p>

        <Swiper
          slidesPerView={1}
          pagination={{ clickable: true }}
          className="bg-base-200 rounded-xl w-11/12"
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          loop={true}
        >
          {listings.map(({ data, id }) => (
            <SwiperSlide
              key={id}
              onClick={() => navigate(`/category/${data.type}/${id}`)}
            >
              <div
                style={{
                  background: `center / cover no-repeat url(${
                    data.imageUrls[data.imageUrls.length - 1]
                  })`,
                }}
                className="w-full h-full relative flex justify-end items-end "
              >
                <p className="text-5xl font-bold text-white backdrop-filter backdrop-blur-lg bg-white-20 mr-10 mb-10 w-90 p-4 shadow-2xl rounded-xl">
                  {data.overview}
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </>
    )
  )
}

export default Slider
