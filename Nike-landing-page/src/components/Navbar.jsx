import logo from '../../public/brand_logo.png'

const Navbar = () => {
  return (
    <div className='flex w-full h-13 items-center justify-between'>
        <div className='ml-18'>
        <img src={logo} alt=""  className='w-12'/>
        </div>
        <div className='flex gap-15 text-sm font-semibold'>
            <button className='cursor-pointer'>MENU</button>
            <button className='cursor-pointer'>LOCATION</button>
            <button className='cursor-pointer'>ABOUT</button>
            <button className='cursor-pointer'>CONTACT</button>
        </div>
        <div className='mr-18'>
            <button className='bg-orange-500 px-3 text-white cursor-pointer py-0.5'>Login</button>
        </div>
    </div>
  )
}

export default Navbar