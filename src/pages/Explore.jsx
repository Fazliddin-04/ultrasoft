import { useEffect, useState } from 'react'
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
import ListingItemXL from '../components/ListingItemXL'
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
      <div className="flex items-stretch justify-around flex-wrap mt-10">
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
            <ListingItemXL key={id} listing={data} id={id} />
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
          <div className="flex flex-wrap justify-center gap-10 my-10">
            {listings.map(
              ({ data, id }) =>
                data.recommended && (
                  <ListingItem
                    listing={data}
                    id={id}
                    key={id}
                    classes="image-full w-60 sm:w-72"
                    bodyClasses="justify-end bg-dark-30 items-center max-w-60 text-center"
                    cardFigureClass="h-60"
                  />
                )
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default Explore
