import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

import Explore from './pages/Explore'
import About from './pages/About';
import Navbar from './components/layout/Navbar';
import DrawerSide from './components/layout/DrawerSide';
import Footer from './components/layout/Footer';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import ForgotPassword from './pages/ForgotPassword';
import Profile from './pages/Profile'
import Category from './pages/Category';
import SingleCategory from './pages/SingleCategory';
import PrivateRoute from './components/PrivateRoute';
import CreateListing from './pages/CreateListing';
import EditListing from './pages/EditListing';
import Listing from './pages/Listing';
import NotFound from './pages/NotFound';
import { CategoryProvider } from './context/CategoryContext';


function App() {
  return (
    <CategoryProvider>
      <Router>
        <div className="drawer">
          <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
          <div className="flex flex-col justify-between min-h-screen drawer-content">
            <Navbar />

            <main className='container flex-1 mx-auto mt-16'>
              <Routes>
                <Route path='/' element={<Explore />} />
                <Route path='/about' element={<About />} />
                <Route path='/*' element={<NotFound />} />
                <Route path='/category/:categoryType' element={<Category />} />
                <Route path='/category/:categoryType/:categoryName' element={<SingleCategory />} />
                <Route path='/category/:categoryType/:categoryName/:listingId' element={<Listing />} />
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
          <div className="drawer-side">
            <label htmlFor="my-drawer-3" className="drawer-overlay"></label>
            <DrawerSide />
          </div>
        </div>
      </Router>

      <ToastContainer />
    </CategoryProvider>
  );
}

export default App;
