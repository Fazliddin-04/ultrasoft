import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

import Explore from './pages/Explore'
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import ForgotPassword from './pages/ForgotPassword';
import Profile from './pages/Profile'
import Category from './pages/Category';
import PrivateRoute from './components/PrivateRoute';
import CreateListing from './pages/CreateListing';
import EditListing from './pages/EditListing';
import Listing from './pages/Listing';
import { CategoryProvider } from './context/CategoryContext';


function App() {
  return (
    <CategoryProvider>
      <Router>
        <div className='flex flex-col items-center justify-between min-h-screen'>
          <Navbar />

          <main className='container mx-auto py-16'>
            <Routes>
              <Route path='/' element={<Explore />} />
              <Route path='/:categoryType' element={<Category />} />
              <Route path='/:categoryType/:categoryName/:listingId' element={<Listing />} />
              <Route path='/profile' element={<PrivateRoute />}>
                <Route path='/profile' element={<Profile />} />
              </Route>
              <Route path='/sign-in' element={<SignIn />} />
              <Route path='/sign-up' element={<SignUp />} />
              <Route path='/forgot-password' element={<ForgotPassword />} />
              <Route path='/create-listing' element={<CreateListing />} />
              <Route path='/edit-listing/:listingId' element={<EditListing />} />
            </Routes>
          </main>

          <Footer />
        </div>
      </Router>

      <ToastContainer />
    </CategoryProvider>
  );
}

export default App;
