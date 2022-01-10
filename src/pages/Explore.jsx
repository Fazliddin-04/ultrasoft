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
        <div>
          <p className="text-2xl sm:text-3xl uppercase font-extrabold p-4 text-center">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-500 text-shadow-lg">
              Kategoriyalar
            </span>
          </p>
          <Sidebar />
        </div>
        <div className="flex-1 flex flex-col items-center px-4">
          <p className="text-2xl sm:text-3xl uppercase font-extrabold p-4 text-center">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-500 text-shadow-lg">
              Eng so'ngilari
            </span>
          </p>
          {listings.map(({ data, id }) => (
            <div
              className="card card-compact lg:card-side w-full card-bordered mb-5 shadow-xl"
              key={id}
            >
              <figure className="explore-card-figure p-5 bg-gradient-to-br from-black via-base-100 to-transparent">
                <img
                  src={data.iconUrl[0]}
                  alt={data.name}
                  className="object-cover w-60"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">
                  {data.name}
                  {new Date(data.timestamp.seconds * 1000).getDate() >=
                    new Date().getDate() - 7 && (
                    <div className="badge mx-2 uppercase">yangi</div>
                  )}
                </h2>
                <p>{data.overview}</p>
                <div className="card-actions">
                  <a
                    href={data.linkToDownload}
                    className="btn btn-primary"
                    download={`${data.name}_${data.version}.exe`}
                  >
                    Yuklab olish
                  </a>
                  <Link to={`/${data.type}/${data.category}/${id}`}>
                    <button className="btn btn-ghost">Ko'proq ma'lumot</button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
          <br />
          <br />
          {lastFetchedListing && (
            <p className="mx-auto btn btn-ghost" onClick={onFetchMoreListings}>
              Ko'proq yuklash
            </p>
          )}
        </div>
        <div>
          <p className="text-2xl sm:text-3xl uppercase font-extrabold p-4 text-center">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-500 text-shadow-lg">
              Tavsiya etiladi
            </span>
          </p>
          {listings.map(
            ({ data, id }) =>
              data.recommended && (
                <span key={id}>
                  <ListingItem
                    listing={data}
                    id={id}
                    key={id}
                    classes="image-full max-w-60"
                    bodyClasses="justify-end bg-dark-30 items-center max-w-60"
                  />
                  <div className="mb-5"></div>
                </span>
              )
          )}
        </div>
      </main>
    </>
  )
}
// <div className="grid m-10 gap-10 sm:grid-cols-2 grid-rows-2 w-11/12 mx-auto">
//   <div className="card shadow-xl image-full">
//     <figure>
//       <div className="h-full uigradient-1"></div>
//     </figure>
//     <div className="justify-end card-body items-center text-center">
//       <h2 className="card-title text-4xl">Kompyuter ilovalar</h2>
//       <div className="card-actions">
//         <Link to="/category/software-apps">
//           <button className="btn btn-outline">Sahifaga o'tish</button>
//         </Link>
//       </div>
//     </div>
//   </div>
//   <div className="card shadow-xl image-full">
//     <figure>
//       <div className="h-full uigradient-2"></div>
//     </figure>
//     <div className="justify-end card-body items-center text-center">
//       <h2 className="card-title text-4xl">Mobil ilovalar</h2>
//       <div className="card-actions">
//         <Link to="/category/mobile-apps">
//           <button className="btn btn-outline">Sahifaga o'tish</button>
//         </Link>
//       </div>
//     </div>
//   </div>
//   <div className="card shadow-xl image-full">
//     <figure>
//       <div className="h-full uigradient-3"></div>
//     </figure>
//     <div className="justify-end card-body items-center text-center">
//       <h2 className="card-title text-4xl">Kompyuter o'yinlar</h2>
//       <div className="card-actions">
//         <Link to="/category/software-games">
//           <button className="btn btn-outline">Sahifaga o'tish</button>
//         </Link>
//       </div>
//     </div>
//   </div>
//   <div className="card shadow-xl image-full">
//     <figure>
//       <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500"></div>
//     </figure>
//     <div className="justify-end card-body items-center text-center">
//       <h2 className="card-title text-4xl">Mobil o'yinlar</h2>
//       <div className="card-actions">
//         <Link to="/category/mobile-games">
//           <button className="btn btn-outline">Sahifaga o'tish</button>
//         </Link>
//       </div>
//     </div>
//   </div>
// </div>
export default Explore
