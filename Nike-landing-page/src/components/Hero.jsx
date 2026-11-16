import React from 'react'
import shoe from '../../public/shoe_image.png'
import flipkart from '../../public/flipkart.png'
import amazon from '../../public/amazon.png'

const Hero = () => {
  return (
    <div className=' w-[80%] mt-10 mx-auto flex  min-w-[600px] max-w-[1100px]'>
        <div className=' w-[50%]'>
            <h1 className='text-7xl font-extrabold'>YOUR FEET DESERVE THE BEST</h1>
            <p className='mt-10 text-xl font-extralight'>Discover footwear that defines your personality. From everyday essentials to statement-making sneakers, find your perfect pair and walk with confidence.</p>
            <div className='mt-4 flex gap-10'>
                <button className='cursor-pointer font-semibold text-white bg-orange-600 px-3 py-0.5'>Shop Now</button>
                <button className='cursor-pointer font-semibold text-black bg-gray-300 px-3 py-0.5'>Category</button>
            </div>
            <div className='mt-4 mb-10'>
                <p className='mb-2'>Also available on </p>
                <div className='flex gap-6 size-5'>
                    <img className='cursor-pointer' src={flipkart} />
                    <img className='cursor-pointer' src={amazon} />

                </div>
            </div>

        </div>


        <div className='w-[50%] flex justify-center items-center'>
            <img src={shoe} alt="" />
        </div>
    </div>
  )
}

export default Hero