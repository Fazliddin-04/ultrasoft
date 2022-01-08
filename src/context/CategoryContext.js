import { createContext, useState } from 'react'

const CategoryContext = createContext()

export const CategoryProvider = ({ children }) => {
  // eslint-disable-next-line
  const [softwareCategory, setSoftwareCategory] = useState([
    'Adobe',
    'Antivirus',
    'Browsers',
    'Communication',
    'Education',
    'Emulators',
    'Graphic-editors',
    'Media',
    'Text-editors',
  ])

  // eslint-disable-next-line
  const [mobileCategory, setMobileCategory] = useState([
    'Art-&-Design',
    'Books-&-Reference',
    'Communication',
    'Education',
    'Graphic-editors',
    'Media',
    'Text-editors',
  ])

  // eslint-disable-next-line
  const [gamesCategory, setGamesCategory] = useState([
    'Action',
    'Adventure',
    'Arcade',
    'Board',
    'Card',
    'Cusual',
    'Educational',
    'Puzzle',
    'Racing',
    'Simulation',
    'Strategy',
    'Sports',
  ])

  return (
    <CategoryContext.Provider
      value={{
        gamesCategory,
        mobileCategory,
        softwareCategory
      }}
    >
      {children}
    </CategoryContext.Provider>
  )
}

export default CategoryContext