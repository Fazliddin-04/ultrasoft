import { createContext, useState } from 'react'

const CategoryContext = createContext()

export const CategoryProvider = ({ children }) => {
  // eslint-disable-next-line
  const [softwareCategory, setSoftwareCategory] = useState([
    'Adobe',
    'Aloqa',
    'Antivirus',
    'Brauzerlar',
    'Emulatorlar',
    'Grafik-tahrirchilar',
    'Media',
    'Matn-tahrirchilar',
    'Ta\'lim',
    'Utilitalar',
    'Fayl Menejer'
  ])

  // eslint-disable-next-line
  const [mobileCategory, setMobileCategory] = useState([
    'Aloqa',
    'Grafik-tahrirchilar',
    'Kitob-&-ma\'lumot',
    'Media',
    'Matn-tahrirchilar',
    'San\'at-&-Dizayn',
    'Ta\'lim',
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

  const [checkedSoftwareCategory, setCheckedSoftwareCategory] = useState(
    new Set(['software-apps'])
  )
  const [checkedSoftwareGamesCategory, setCheckedSoftwareGamesCategory] =
    useState(new Set(['software-games']))
  const [checkedWindowsCategory, setCheckedWindowsCategory] = useState(
    new Set(['windows-os'])
  )
  const [checkedMobileCategory, setCheckedMobileCategory] = useState(
    new Set(['mobile-apps'])
  )
  const [checkedMobileGamesCategory, setCheckedMobileGamesCategory] = useState(
    new Set(['mobile-games'])
  )

  return (
    <CategoryContext.Provider
      value={{
        gamesCategory, 
        mobileCategory,
        softwareCategory,
        windowsCategory, 
        checkedSoftwareCategory, 
        checkedSoftwareGamesCategory, 
        checkedWindowsCategory, 
        checkedMobileCategory, 
        checkedMobileGamesCategory, 
        setCheckedSoftwareCategory, 
        setCheckedSoftwareGamesCategory,
        setCheckedWindowsCategory,
        setCheckedMobileCategory,
        setCheckedMobileGamesCategory
      }}
    >
      {children}
    </CategoryContext.Provider>
  )
}

export default CategoryContext
