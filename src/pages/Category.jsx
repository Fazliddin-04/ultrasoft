import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  startAfter,
} from 'firebase/firestore'
import { db } from '../firebase.config'
import { toast } from 'react-toastify'
import Spinner from '../components/Spinner'
import ListingItem from '../components/ListingItem'

function Category() {
  const [listings, setListings] = useState(null)
  const [loading, setLoading] = useState(true)
  const [lastFetchedListing, setLastFetchedListing] = useState(null)

  const params = useParams()

  useEffect(() => {
    const fetchListings = async () => {
      try {
        // Get referense
        const listingsRef = collection(db, 'listings')

        // create a query
        const q = query(
          listingsRef,
          where('type', '==', params.categoryType),
          orderBy('timestamp', 'desc'),
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

        setListings(listings)
        setLoading(false)
      } catch (error) {
        toast.error("Ro'yhatlarni olib kelib bo'lmadi")
      }
    }

    fetchListings()
  }, [params.categoryType])

  // Pagination / Load More
  const onFetchMoreListings = async () => {
    try {
      // Get referense
      const listingsRef = collection(db, 'listings')

      // create a query
      const q = query(
        listingsRef,
        where('type', '==', params.categoryType),
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

  return (
    <div className='mb-5'>
      <div className="bg-base-300 p-4 rounded-b-xl">
        <p className="text-3xl sm:text-center font-bold tracking-wide">
          {params.categoryType === 'software-apps'
            ? 'Kompyuter ilovalar'
            : params.categoryType === 'software-games'
            ? "Kompyuter o'yinlar"
            : params.categoryType === 'mobile-apps'
            ? 'Mobil ilovalar'
            : params.categoryType === 'mobile-games'
            ? "Mobil o'yinlar"
            : params.categoryType.toUpperCase().replace('-', ' ')}
        </p>
      </div>

      {loading ? (
        <Spinner />
      ) : listings && listings.length > 0 ? (
        <>
          <div className="my-10">
            <ul className="p-0 flex flex-wrap gap-10">
              {listings.map((listing) => (
                <ListingItem
                  listing={listing.data}
                  id={listing.id}
                  key={listing.id}
                  classes="w-60 md:w-72 card-compact lg:card-normal"
                  bodyClasses="bg-base-200"
                  cardFigureClass="h-60 pt-2"
                />
              ))}
            </ul>
          </div>

          <br />
          <br />
          {lastFetchedListing && (
            <button
              className="mx-auto btn btn-outline block"
              onClick={onFetchMoreListings}
            >
              Ko'proq yuklash
            </button>
          )}
        </>
      ) : (
        <p className="text-center mx-auto my-10 w-max">
          {params.categoryType === 'software-apps'
            ? 'Kompyuter ilovalar'
            : params.categoryType === 'software-games'
            ? "Kompyuter o'yinlar"
            : params.categoryType.toUpperCase().replace('-', ' ')}{' '}
          uchun ro'yxatlar yo'q
        </p>
      )}
    </div>
  )
}

export default Category
