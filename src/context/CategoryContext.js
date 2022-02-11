import { createContext, useState, useEffect } from 'react'
import {
  collection,
  getDocs,
  query,
  orderBy,
} from 'firebase/firestore'
import { db } from '../firebase.config'

const CategoryContext = createContext()

export const CategoryProvider = ({ children }) => {
  const [softwareCategory, setSoftwareCategory] = useState(null)

  const [softwareGamesCategory, setSoftwareGamesCategory] = useState(null)

  const [windowsCategory, setWindowsCategory] = useState(null)

  const [loadingCon, setLoadingCon] = useState(true)

  const [cTypes, setCTypes] = useState([])

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        // Get referense
        const categoriesRef = collection(db, 'categories')

        // create a query
        const q = query(categoriesRef, orderBy('timestamp', 'desc'))

        // Execute query
        const querySnap = await getDocs(q)


        querySnap.forEach((doc) => {
          setCTypes((prevState) => ([
            ...prevState,
            doc.id,
          ]))
          if (doc.id === 'software-games') {
            return setSoftwareGamesCategory(doc.data().categoryTypes)
          }
          if (doc.id === 'software-apps') {
            return setSoftwareCategory(doc.data().categoryTypes)
          }
          if (doc.id === 'windows-os') {
            return setWindowsCategory(doc.data().categoryTypes)
          }
        })

        setLoadingCon(false)
      } catch (error) {
        console.log(error);
      }
    }

    fetchCategories()

  }, [])

  return (
    <CategoryContext.Provider
      value={{
        cTypes,
        loadingCon,
        softwareGamesCategory,
        softwareCategory,
        windowsCategory,
      }}
    >
      {children}
    </CategoryContext.Provider>
  )
}

export default CategoryContext
