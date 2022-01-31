import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <div className='hero h-full'>
      <div className='text-center hero-content'>
        <div className='max-w-lg'>
          <h1 className='text-8xl font-bold mb-8'>Voy!</h1>
          <p className='text-5xl mb-8'>404 - Sahifa Topilmadi:(</p>
          <Link className='btn btn-primary btn-lg gap-3' to='/'>
            <i className='fas fa-home'></i>
            Bosh sahifaga qaytish
          </Link>
        </div>
      </div>
    </div>
  )
}

export default NotFound
