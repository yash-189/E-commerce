import React,{useState}from 'react'
import image from '../../images/BG.png'
import { useGlobalContext } from '../CartContext'
import image1 from '../../images/image2.jpg'

const Item2 = () => {
    
const {data} = useGlobalContext();


  return (
    <section className="text-gray-600 body-font h-2/3">
    <div className="container px-5 py-2 mx-auto flex flex-wrap">

        <div className="w-full sm:shadow-none shadow-md mx-auto grid gap-4 sm:grid-cols-2 grid-cols-1 justify-center items-center">
{/* {data.slice(0,1).map((elem)=>{
    return <>  */}
    <div className={`w-full h-full bg-gray-100 py-16 px-10 relative border-gray-200 border-opacity-60 rounded-2xl`}>
                <img alt="gallery" className="w-full object-cover  h-full object-center block  absolute inset-0 rounded-2xl cursor-pointer hover:scale-[1.02] transition-transform" src={image1} />
                {/* <div className={` pl-52  relative z-10 w-full h-full flex justify-center flex-col`}
             >
                    <h2 className="text-2xl text-gray-900 font-medium title-font mb-2">Shooting Stars</h2>
                    <p className="leading-relaxed">Skateboard +1 mustache fixie paleo lumbersexual.</p>
                    <a className="mt-3 text-indigo-500 inline-flex items-center">Learn More
                        <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-4 h-4 ml-2" viewBox="0 0 24 24">
                            <path d="M5 12h14M12 5l7 7-7 7"></path>
                        </svg>
                    </a>
                </div> */}
            </div>
            <div className={`w-full h-full bg-white sm:py-16 sm:px-10 relative `}>
                {/* <img alt="gallery" className="w-full object-cover h-full object-center block  absolute inset-0" src={image} /> */}
                <div className={` sm:pl-20 py-8 relative z-10 px-6 sm:px-2 w-full h-full flex  flex-col`}
             >
                    <h2 className="md:text-5xl  text-3xl text-gray-900 font-normal title-font mb-2">Shop what you love!</h2>
                    <p className="leading-relaxed sm:py-10 py-2 "> description </p>
                    <a className="mt-3 text-indigo-500 inline-flex items-center">Learn More
                        <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-4 h-4 ml-2" viewBox="0 0 24 24">
                            <path d="M5 12h14M12 5l7 7-7 7"></path>
                        </svg>
                    </a>
                </div>
            </div>
            {/* </>
           })} */}
        </div>
    </div>
</section>

  )
}

export default Item2