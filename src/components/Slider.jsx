import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore'
import { db } from '../firebase.config'
import Spinner from './Spinner'
import ListingItem from './ListingItem'

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
      <div className="bg-base-300 pb-8 rounded-b-xl">
        <p className="text-2xl sm:text-3xl uppercase font-extrabold p-4">
          <span className="text-accent">
            Ommabop materiallar
          </span>
        </p>

        <Swiper
          slidesPerView={1}
          spaceBetween={30}
          navigation={true}
          pagination={{ clickable: true }}
          className="w-full "
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          loop={true}
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 30,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
            1280: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
          }}
        >
          {listings.map(({ data, id }) => (
            <SwiperSlide
              key={id}
              onClick={() => navigate(`/category/${data.type}/${id}`)}
              className="flex items-center justify-center"
            >
              <ListingItem
                listing={data}
                id={id}
                classes="w-60 sm:w-72 h-full card-compact lg:card-normal"
                bodyClasses="bg-base-200 h-48"
                cardFigureClass="h-60 pt-2"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    )
  )
}

export default Slider
