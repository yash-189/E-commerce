import React, { useState, useEffect } from 'react'
import Slider from "react-slick";
import axios from 'axios';
import bg from '../../images/BG.png'
import Btn2 from '../Btn2';
import { useGlobalContext } from '../CartContext';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';


const MainSlider = () => {
  const { data,decode, pathName } = useGlobalContext();

console.log(decode);


  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false
  };




  return (
    <>
      <Slider {...settings}>
        
        {data?.slice(0, 1).map((Element) => {
          return <motion.div className='mt-10 sm:mt-0'

            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}


          >
            <img className='absolute w-screen md:h-auto h-full object-cover' src={bg} alt='Background' ></img>

            <div className='w-full h-3/5 relative sm:py-56 sm:px-36 px-14 md:py-40 py-20 justify-around' >
              <div>
                <motion.p className='sm:text-lg text-base font-normal'
                  initial={{ opacity: 0, scale: 0, x: 200 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  transition={{ duration: 1, type: 'spring' }}

                >New Arrivals</motion.p>
                <motion.h1 className='sm:text-6xl text-2xl pt-1 md:pb-8 pb-4 '
                  initial={{ opacity: 0, scale: 0, x: -200 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  transition={{ duration: 1, type: 'spring' }}


                >Collections</motion.h1>
              </div>
              <motion.div
                initial={{ opacity: 0, scale: 0, x: -200 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                transition={{ duration: 1, type: 'spring' }}
              >
                 <Link to={pathName.includes('/') ? ('/explore') : ('/explore')}>
                  <Btn2 name='Explore' width={'sm:w-40 md:w-20 w-20'} height={'md:h-10 h-8'} />

                </Link>
              </motion.div>

            </div>
          </motion.div>
        })}



      </Slider>





    </>
  )
}

export default MainSlider