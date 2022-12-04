import React, { useState } from 'react'
import Btn2 from '../Btn2'
import image from '../../images/BG.png'
import { useGlobalContext } from '../CartContext'
import { motion } from 'framer-motion'
import image1 from '../../images/tshirt.jpg'
import image2 from '../../images/banner.webp'
import image5 from '../../images/image5.jpg'
const Item1 = () => {
    const { data } = useGlobalContext();




    const [isHovering, setIsHovering] = useState(false);

    const handleMouseOver = () => {
        setIsHovering(true);
    };

    const handleMouseOut = () => {
        setIsHovering(false);
    };


    return (
        <>
            <section className="text-gray-600 body-font">
                <div className="container px-5 py-24 mx-auto flex flex-wrap">

                    <div className="lg:w-full w-full mx-auto grid gap-4 sm:grid-cols-2 grid-cols-1 justify-center items-center ">
                        {/* {data.slice(0, 1).map((element) => {

                            return <> */}
                                <motion.div className={`w-full h-full bg-gray-100 py-16 px-10 relative border-gray-200 border-opacity-60 rounded-2xl`}
                                    initial={{ opacity: 0, y: -50 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ type: 'spring', duration: 0.5 }}
                                >
                                    <img alt="gallery" className="w-full object-cover h-full object-center block  absolute inset-0 rounded-2xl hover:scale-[1.02] cursor-pointer transition-transform" src={image2} />
                                    {/* <div className={` hover:border-solid hover:border-4 hover:border-white hover:rounded-md hover:scale-[1.02] cursor-pointer transition-transform mx-auto px-4 relative z-10 w-full h-full flex justify-center flex-col`}
                                    >
                                        <h2 className="text-2xl text-gray-900 font-medium title-font mb-2">{element.title}</h2>
                                        <p className="leading-relaxed">{element.description}</p>
                                        <a className="mt-3 text-indigo-500 inline-flex items-center">{'link'}
                                            <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-4 h-4 ml-2" viewBox="0 0 24 24">
                                                <path d="M5 12h14M12 5l7 7-7 7"></path>
                                            </svg>
                                        </a>
                                    </div> */}
                                </motion.div>
                                <div className="flex flex-wrap -mx-2">
                                    <div className="px-2 w-full mb-4 h-2/4 ">
                                        <div className="flex flex-wrap w-full bg-gray-100 sm:py-24 py-16 sm:px-10 px-6 relative border-gray-200 border-opacity-60 rounded-2xl ">
                                            <div className='w-full h-full rounded-2xl'>
                                                <img alt="gallery" className="w-full object-cover h-full object-center block rounded-2xl  absolute inset-0 hover:scale-[1.02] cursor-pointer transition-transform" src={image5}/>

                                            </div>
                                            <div className="text-center relative z-10 w-full">
                                                <h2 className="text-xl text-gray-900 font-medium title-font mb-2">

                                                </h2>
                                                <p className="leading-relaxed">
                                                    </p>
                                                <a className="mt-3 text-indigo-500 inline-flex items-center">{}
                                                    <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-4 h-4 ml-2" viewBox="0 0 24 24">
                                                        <path d="M5 12h14M12 5l7 7-7 7"></path>
                                                    </svg>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="px-2 w-full  h-full">
                                        <div className="flex flex-wrap w-full bg-gray-100 sm:py-24 py-16 sm:px-10 px-6 relative border-gray-200 border-opacity-60 rounded-2xl">
                                            <img alt="gallery" className="w-full object-cover h-full object-center block rounded-2xl absolute inset-0 hover:scale-[1.02] cursor-pointer transition-transform" src={image1} />
                                            <div className="text-center relative z-10 w-full">
                                                <h2 className="text-xl text-gray-900 font-medium title-font mb-2">
                                                    </h2>
                                                <p className="leading-relaxed">
                                                    </p>
                                                <a className="mt-3 text-indigo-500 inline-flex items-center">
                                                    {}
                                                    <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-4 h-4 ml-2" viewBox="0 0 24 24">
                                                        <path d="M5 12h14M12 5l7 7-7 7"></path>
                                                    </svg>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            {/* </>
                        })} */}

                    </div>
                </div>
            </section>

        </>
    )
}

export default Item1