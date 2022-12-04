import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useGlobalContext } from '../CartContext'

const Moffer = ({setOpenTab, setalert}) => {


    const { removeItem, increase, decrease, cartData, handleClick, isLoading, pathName, OfferData } = useGlobalContext()

    const navigate = useNavigate()


    const total = cartData.reduce((acc, item) => acc + item.quantity * item.price, 0)
    console.log(total)


    const isLogged =     localStorage.getItem("logged") || false
console.log(isLogged);


console.log(OfferData);

  return (
    <>

<div className="flex flex-col w-full h-full shadow-md bg-white  top-0 " >
                <div className='flex flex-col justify-between h-full'>
                    <div>


                        <div>
                            <div className="pt-6 pb-2 ' px-6">
                                <h1 className='text-xl font-semibold'>Offers</h1>
                               



                            </div>
                            <hr />
                           





                        </div>

                     { !OfferData==''? <div  className={`rounded-md flex flex-col justify-center items-center  my-4 border-b px-2 pt-6 pb-8 text-center `}>
                        <h1 className='text-lg font-medium text-gray-400 mt-2'>No offers! </h1>

                        </div>:''}
                        <div className='mt-4'>







                            { cartData?.map((elem) => {
                                return <>
                                <div key={elem.id} className={`rounded-md flex w-full  mt-4 border-b p-2 font-semibold`}>
                                    <Link to={'/'} onClick={() => window.scrollTo(0, 0)}>
                                        <div className='mx-2'>
                                            <img src={`http://68.183.90.227:8080/${'elem.image'}`} height={'70'} width={'70'} className='p-2' alt='image'></img>
                                        </div>
                                    </Link>
                                    <div className='w-full'>
                                        <Link to={'/'} onClick={() =>  + window.scrollTo(0, 0)}>
                                            <h1  className='text-base font-medium'>{('Offer name')}</h1>
                                        </Link>
                                        {/* <h2>Price:{elem.price}</h2> */}
                                        <h2 className='text-base font-normal'>{'Offer details'}</h2>
                                     

                                        <div className='flex w-full  justify-between ' >
                                          
                                        <h1 className='text-base font-normal'>time</h1>
                                            {/* <button className='mx-4 hover:text-violet-500 active:text-violet-500 focus:outline-none focus:text-violet-500 ' onClick={() => removeItem(elem.product_id, elem.title, elem.shade, elem.quantity, elem.price)} >


                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 512 512"><title>ionicons-v5-e</title><path d="M112,112l20,320c.95,18.49,14.4,32,32,32H348c17.67,0,30.87-13.51,32-32l20-320" style={{ fill: "none", stroke: "#000", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "32px" }} /><line x1="80" y1="112" x2="432" y2="112" style={{ stroke: "#000", strokeLinecap: "round", strokeMiterlimit: "10", strokeWidth: "32px" }} /><path d="M192,112V72h0a23.93,23.93,0,0,1,24-24h80a23.93,23.93,0,0,1,24,24h0v40" style={{ fill: "none", stroke: "#000", StrokeLinecap: "round", StrokeLinejoin: "round", strokeWidth: "32px" }} />
                                                    <line x1="256" y1="176" x2="256" y2="400" style={{ fill: "none", stroke: "#000", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "32px" }} /><line x1="184" y1="176" x2="192" y2="400" style={{ fill: "none", stroke: "#000", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "32px" }} /><line x1="328" y1="176" x2="320" y2="400" style={{ fill: "none", stroke: "#000", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "32px" }} /></svg>
                                            </button> */}
                                        </div>

                                        
                                    </div>
                                  
                                </div>
                                </>

                            })}
                        </div>
                    </div>

                    <div>

                     
                    </div>

                </div>




               
            </div>
    
    
    
    </>
  )
}

export default Moffer