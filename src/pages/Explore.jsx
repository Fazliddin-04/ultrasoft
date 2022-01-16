import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  collection,
  getDocs,
  query,
  orderBy,
  limit,
  startAfter,
} from 'firebase/firestore'
import { db } from '../firebase.config'
import { toast } from 'react-toastify'
import Slider from '../components/Slider'
import Sidebar from '../components/layout/Sidebar'
import ListingItem from '../components/ListingItem'
import Spinner from '../components/Spinner'

function Explore() {
  const [listings, setListings] = useState(null)
  const [loading, setLoading] = useState(true)
  const [lastFetchedListing, setLastFetchedListing] = useState(null)

  useEffect(() => {
    const fetchListings = async () => {
      try {
        // Get referense
        const listingsRef = collection(db, 'listings')

        // create a query
        const q = query(listingsRef, orderBy('timestamp', 'desc'), limit(10))

        // Execute query
        const querySnap = await getDocs(q)

        const lastVisible = querySnap.docs[querySnap.docs.length - 1]
        setLastFetchedListing(lastVisible)

        const listings = []

        querySnap.forEach((doc) => {
          return listings.push({
            id: doc.id,
            data: doc.data(),
          })
        })

        setListings(listings)
        setLoading(false)
      } catch (error) {
        toast.error("Ro'yhatlarni olib kelib bo'lmadi")
      }
    }

    fetchListings()
  }, [])

  // Pagination / Load More
  const onFetchMoreListings = async () => {
    try {
      // Get referense
      const listingsRef = collection(db, 'listings')

      // create a query
      const q = query(
        listingsRef,
        orderBy('timestamp', 'desc'),
        startAfter(lastFetchedListing),
        limit(10)
      )

      // Execute query
      const querySnap = await getDocs(q)

      const lastVisible = querySnap.docs[querySnap.docs.length - 1]
      setLastFetchedListing(lastVisible)

      const listings = []

      querySnap.forEach((doc) => {
        return listings.push({
          id: doc.id,
          data: doc.data(),
        })
      })

      setListings((prevState) => [...prevState, ...listings])
      setLoading(false)
    } catch (error) {
      toast.error("Ro'yhatlarni olib kelib bo'lmadi")
    }
  }
  if (loading) {
    return <Spinner />
  }

  return (
    <>
      <Slider />
      <main className="flex items-stretch justify-around flex-wrap mt-10">
        <div className="mb-14">
          <p className="text-2xl sm:text-3xl uppercase font-extrabold p-4 text-center">
            <span className="text-accent">Kategoriyalar</span>
          </p>
          <Sidebar />
        </div>
        <div className="flex-1 flex flex-col items-center px-4 mb-14">
          <p className="text-2xl sm:text-3xl uppercase font-extrabold p-4 text-center">
            <span className="text-accent">Eng so'ngilari</span>
          </p>
          {listings.map(({ data, id }) => (
            <div
              className="card card-compact xl:card-side w-full card-bordered mb-5 shadow-xl"
              key={id}
            >
              <figure className="explore-card-figure p-5 bg-gradient-to-br from-black via-base-100 to-transparent">
                <img
                  src={data.iconUrl[0]}
                  alt={data.name}
                  className="object-cover w-60 mx-auto"
                />
              </figure>
              <div className="card-body justify-center">
                <h2 className="card-title">
                  {data.name}
                  {new Date(data.timestamp.seconds * 1000).getDate() >=
                    new Date().getDate() - 7 && (
                    <div className="badge mx-2 uppercase">yangi</div>
                  )}
                </h2>
                <p>
                  {data.overview.length > 130
                    ? data.overview.slice(0, 130) + '...'
                    : data.overview}
                </p>
                <div className="card-actions">
                  <a
                    href={data.linkToDownload}
                    className="btn btn-primary"
                    download={`${data.name}_${data.version}.exe`}
                  >
                    Yuklab olish
                  </a>
                  <Link to={`/${data.type}/${data.category}/${id}`}>
                    <button className="btn btn-outline">
                      Ko'proq ma'lumot
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
          <br />
          <br />
          {lastFetchedListing && (
            <p
              className="mx-auto btn btn-outline"
              onClick={onFetchMoreListings}
            >
              Ko'proq yuklash
            </p>
          )}
        </div>
        <div className="xl:w-1/4">
          <p className="text-2xl sm:text-3xl uppercase font-extrabold p-4 text-center">
            <span className="text-accent">Tavsiya etiladi</span>
          </p>
          <div className="flex flex-wrap justify-center gap-10">
            {listings.map(
              ({ data, id }) =>
                data.recommended && (
                  <ListingItem
                    listing={data}
                    id={id}
                    key={id}
                    classes="image-full w-60 sm:w-72"
                    bodyClasses="justify-end bg-dark-30 items-center max-w-60"
                    cardFigureClass="h-60"
                  />
                )
            )}
          </div>
        </div>
      </main>
    </>
  )
}

export default Explore
