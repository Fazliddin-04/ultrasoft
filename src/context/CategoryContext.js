import { createContext, useState } from 'react'

const CategoryContext = createContext()

export const CategoryProvider = ({ children }) => {
  // eslint-disable-next-line
  const [softwareCategory, setSoftwareCategory] = useState([
    'Adobe',
    'Antivirus',
    'Brauzerlar',
    'Aloqa',
    'Ta\'lim',
    'Emulatorlar',
    'Grafik-tahrirchilar',
    'Media',
    'Matn-tahrirchilar',
  ])

  // eslint-disable-next-line
  const [mobileCategory, setMobileCategory] = useState([
    'San\'at-&-Dizayn',
    'Kitob-&-ma\'lumot',
    'Aloqa',
    'Ta\'lim',
    'Grafik-tahrirchilar',
    'Media',
    'Matn-tahrirchilar',
  ])

  // eslint-disable-next-line
  const [gamesCategory, setGamesCategory] = useState([
    'Action',
    'Sarguzasht',
    'Arkada',
    'Taxta',
    'Karta',
    'Tasodifiy',
    'Ta\'limiy',
    'Boshqotirma',
    'Poyga',
    'Simulyator',
    'Strategiya',
    'Sport',
  ])

  // eslint-disable-next-line
  const [windowsCategory, setWindowsCategory] = useState([
    'Windows-7',
    'Windows-8',
    'Windows-10',
    'Windows-11',
  ])



  return (
    <CategoryContext.Provider
      value={{
        gamesCategory,
        mobileCategory,
        softwareCategory,
        windowsCategory,
      }}
    >
      {children}
    </CategoryContext.Provider>
  )
}

export default CategoryContext
