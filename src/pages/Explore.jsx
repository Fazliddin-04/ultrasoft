import { Link } from 'react-router-dom'
import Slider from '../components/Slider'

function Explore() {
  return (
    <>
      <Slider />
      <header className="text-5xl sm:text-6xl font-extrabold mt-12 mb-6">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-500 text-shadow-lg">
          Categories
        </span>
      </header>
      <div className="grid m-10 gap-10 sm:grid-cols-2 grid-rows-2 w-11/12 mx-auto">
        <div className="card shadow-xl image-full">
          <figure>
            <div className="h-full uigradient-1"></div>
          </figure>
          <div className="justify-end card-body items-center text-center">
            <h2 className="card-title text-4xl">Software Apps</h2>
            <div className="card-actions">
              <Link to="/category/software-apps">
                <button className="btn btn-outline">Explore</button>
              </Link>
            </div>
          </div>
        </div>
        <div className="card shadow-xl image-full">
          <figure>
            <div className="h-full uigradient-2"></div>
          </figure>
          <div className="justify-end card-body items-center text-center">
            <h2 className="card-title text-4xl">Mobile Apps</h2>
            <div className="card-actions">
              <Link to="/category/mobile-apps">
                <button className="btn btn-outline">Explore</button>
              </Link>
            </div>
          </div>
        </div>
        <div className="card shadow-xl image-full">
          <figure>
            <div className="h-full uigradient-3"></div>
          </figure>
          <div className="justify-end card-body items-center text-center">
            <h2 className="card-title text-4xl">Software Games</h2>
            <div className="card-actions">
              <Link to="/category/software-games">
                <button className="btn btn-outline">Explore</button>
              </Link>
            </div>
          </div>
        </div>
        <div className="card shadow-xl image-full">
          <figure>
            <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500"></div>
          </figure>
          <div className="justify-end card-body items-center text-center">
            <h2 className="card-title text-4xl">Mobile Games</h2>
            <div className="card-actions">
              <Link to="/category/mobile-games">
                <button className="btn btn-outline">Explore</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Explore
