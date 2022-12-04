import React from 'react'
import { useGlobalContext } from '../CartContext'
import { Link } from 'react-router-dom';

const Item4 = () => {

    const {data} = useGlobalContext();


  return (
    <>
 <section className="text-gray-600 body-font sm:mb-0 mb-16">
        <div className="container px-5 py-10 mx-auto">
          <div className="flex flex-wrap -m-4 justify-between">
    {data?.map((elem)=>{
        return <div className="md:w-1/5 h-32 p-1 md:mx-1 mx-2 bg-white rounded-2xl border-2 border-gray-200 border-opacity-60  ">
                <Link to='/details' className="block relative h-48 rounded overflow-hidden" onClick={''}>
                    <img alt="ecommerce" className="object-contain object-center  h-full block mx-auto" src={elem.image} />
                </Link>
                <div className="mt-4 text-center sm:text-left">
                    <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">{elem.category}</h3>
                    <h2 className="text-gray-900 title-font text-lg font-medium">{elem.title}...</h2>
                    <p className="mt-1">Price: {elem.price}</p>
                </div>
                <div className="flex items-center flex-wrap  mt-4">
                      <a className="text-indigo-500 inline-flex items-center md:mb-2 lg:mb-0">Buy Now
                        <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
                          <path d="M5 12h14"></path>
                          <path d="M12 5l7 7-7 7"></path>
                        </svg>
                      </a>


                    </div>
            </div>
    })}
    </div>
    </div>
    </section>

    
    </>
  )
}

export default Item4