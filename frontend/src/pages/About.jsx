import React from 'react'
import { assets } from '../assets/frontend_assets/assets'
import Title from '../components/Title'
import Newsletterbox from '../components/Newsletterbox'

export default function About() {
  return (
    <div>
      <div className=' text-2xl text-center pt-8 border-t'>
        <Title text1={'ABOUT'} text2={'US'} />
      </div>

      <div className='my-10 flex flex-col md:flex-row gap-16'>
        <img className='w-full md:max-w-[450px]' src={assets.about_img} alt="" />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-[#5A3A31]/80'>
          <p>Vacci was born out of a passion for modern aesthetics, clean monoline design, and a desire to elevate everyday wardrobe essentials. Our journey began with a clear mission: to offer premium, thoughtfully crafted garments that blend effortless comfort with timeless style.</p>
          <p>Since our inception, we've worked tirelessly to curate a refined selection of high-quality apparel that caters to contemporary tastes. From everyday classics to modern statement pieces, we focus on superior craftsmanship and durable materials.</p>
          <b className='text-[#5A3A31] font-bold'>Our Mission</b>
          <p>Our mission at Vacci is to empower individuals with confidence through versatile, minimalist fashion. We are committed to providing an exceptional online shopping experience from discovery to delivery.</p>
        </div>
      </div>

      <div className=' text-xl py-4'>
        <Title text1={'WHY'} text2={'CHOOSE US'} />
      </div>

      <div className='flex flex-col md:flex-row text-sm mb-20'>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Quality Assurance:</b>
          <p className='text-gray-600'>We meticulously select and vet each product to ensure it meets our stringent quality standards.</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5 md:border-x-0 border-t-0 md:border-t'>
          <b>Convenience:</b>
          <p className='text-gray-600'>With our user-friendly interface and hassle-free ordering process, shopping has never been easier.</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5 md:border-l-0 border-t-0 md:border-t'>
          <b>Exceptional Customer Service:</b>
          <p className='text-gray-600'>Our team of dedicated professionals is here to assist you all the way, ensuring your satisfaction is our top priority.</p>
        </div>
      </div>

      <Newsletterbox />
    </div>
  )
}
