import React,{useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Btn2 from '../Btn2'
import Btn3 from '../Btn3'
import EmptyCart from '../cart/EmptyCart'
import { useGlobalContext } from '../CartContext'
import Loader from '../Loader'
import Mloader from './Mloader'

const Mcart = ({setOpenTab, setalert}) => {

    const { removeItem, increase, decrease,updateQuantity, cartData, handleClick, isLoading, pathName ,cart} = useGlobalContext()

    const navigate = useNavigate()


    const total = cart.reduce((acc, item) => acc + item.quantity * item.price, 0)
    console.log(total)


    const isLogged =     localStorage.getItem("logged") || false
console.log(isLogged);



    return (
        <>


            <div className="flex flex-col w-9/12 h-full shadow-md bg-white fixed top-0 z-30 overflow-y-scroll" id='slide' >
                <div className='flex flex-col justify-between h-full'>
                    <div>


                        <div>
                            <div className="pt-6 pb-2 ' px-6">
                                <h1 className='text-xl font-semibold'>My cart</h1>
                               



                            </div>
                            <hr />
                            {/* {isLoading &&
                            <div className='absolute h-screen w-screen flex justify-center self-center items-center'>
                            
                            <Mloader />
                            </div>} */}





                        </div>

                        {cart == '' ? <div  className={`rounded-md flex flex-col justify-center items-center  my-4 border-b px-2 pt-6 pb-8 text-center `}>
                        <EmptyCart w={'150'} h={''}/>
                        <h1 className='text-lg font-medium text-gray-400 mt-2'>Your cart is empty! </h1>

                        </div> : ''}
                        <div className='mt-4'>







                            {cart?.map((elem) => {
                                return <>
                                <div key={elem.id} className={`rounded-md flex w-full  mt-4 border-b p-2 font-semibold`}>
                                    <Link to={'/details'} onClick={() => handleClick(elem.id) + window.scrollTo(0, 0)}>
                                        <div className='mx-2'>
                                            <img src={`${elem.image}`} height={'70'} width={'70'} className='p-2' alt='image'></img>
                                        </div>
                                    </Link>
                                    <div className='w-full'>
                                        <Link to={'/details'} onClick={() => handleClick(elem.product_id) + window.scrollTo(0, 0)}>
                                            <h1  className='text-base font-normal'>{(elem.title).slice(0, 25)}...</h1>
                                        </Link>
                                        {/* <h2>Price:{elem.price}</h2> */}
                                        <h2 className='text-base font-normal'>{elem.shade}</h2>
                                        <div className='flex my-3 '>
                                                <button className='py-0 px-1 text-base  bg-gray-100' onClick={() =>updateQuantity(elem.product_id, 'decrement')}>-
                                                </button>
                                                <h2 className='mx-2 text-base'>{elem.quantity}</h2>

                                                <button className='py-0 px-1 text-base  bg-gray-100' onClick={() => updateQuantity(elem.product_id, 'increment')}>+
                                                </button>
                                            </div>

                                        <div className='flex w-full  justify-between ' >
                                          
                                        <h1 className='text-base font-medium'><span className='mr-1'>₹</span>{elem.price}</h1>
                                            <button className='mx-4 hover:text-violet-500 active:text-violet-500 focus:outline-none focus:text-violet-500 ' onClick={() => removeItem(elem.id, elem.title, elem.shade, elem.quantity, elem.price)} >


                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 512 512"><title>ionicons-v5-e</title><path d="M112,112l20,320c.95,18.49,14.4,32,32,32H348c17.67,0,30.87-13.51,32-32l20-320" style={{ fill: "none", stroke: "#000", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "32px" }} /><line x1="80" y1="112" x2="432" y2="112" style={{ stroke: "#000", strokeLinecap: "round", strokeMiterlimit: "10", strokeWidth: "32px" }} /><path d="M192,112V72h0a23.93,23.93,0,0,1,24-24h80a23.93,23.93,0,0,1,24,24h0v40" style={{ fill: "none", stroke: "#000", StrokeLinecap: "round", StrokeLinejoin: "round", strokeWidth: "32px" }} />
                                                    <line x1="256" y1="176" x2="256" y2="400" style={{ fill: "none", stroke: "#000", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "32px" }} /><line x1="184" y1="176" x2="192" y2="400" style={{ fill: "none", stroke: "#000", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "32px" }} /><line x1="328" y1="176" x2="320" y2="400" style={{ fill: "none", stroke: "#000", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "32px" }} /></svg>
                                            </button>
                                        </div>

                                        
                                    </div>
                                    {/* <div className='flex justify-end sm:justify-center items-center'>


                                <button onClick={() => removeItem(elem.product_id, elem.title, elem.shade, elem.quantity, elem.price)} >


                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 512 512"><title>ionicons-v5-e</title><path d="M112,112l20,320c.95,18.49,14.4,32,32,32H348c17.67,0,30.87-13.51,32-32l20-320" style={{ fill: "none", stroke: "#000", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "32px" }} /><line x1="80" y1="112" x2="432" y2="112" style={{ stroke: "#000", strokeLinecap: "round", strokeMiterlimit: "10", strokeWidth: "32px" }} /><path d="M192,112V72h0a23.93,23.93,0,0,1,24-24h80a23.93,23.93,0,0,1,24,24h0v40" style={{ fill: "none", stroke: "#000", StrokeLinecap: "round", StrokeLinejoin: "round", strokeWidth: "32px" }} />
                                        <line x1="256" y1="176" x2="256" y2="400" style={{ fill: "none", stroke: "#000", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "32px" }} /><line x1="184" y1="176" x2="192" y2="400" style={{ fill: "none", stroke: "#000", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "32px" }} /><line x1="328" y1="176" x2="320" y2="400" style={{ fill: "none", stroke: "#000", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "32px" }} /></svg>
                                        </button>
                            </div> */}

                                </div>
                                </>

                            })}
                        </div>
                    </div>

                    <div>

                        <div className=' mx-auto text-center  py-10'>
                            {/* <h1 className='text-2xl'>Order summary</h1> */}
                            <h2 className='my-4  font-semibold mb-4'> Subtotal: ₹<span className='text-lg font-semibold'>{Math.ceil(total)} </span> </h2>




                            <Btn2 name={'Checkout'} css={cart==''?'bg-gray-800 pointer-events-none opacity-60':''} width={'px-4'} height={'h-10'} 
                            
                          
                            
                            onClick={() => !isLogged ? setOpenTab(5) + setalert(true) :navigate('/checkout') + setOpenTab(3) + window.scrollTo(0, 0)} />



                            <Btn3 name={'View cart'} css='ml-4' onClick={() => navigate('/cart') + setOpenTab(3) + window.scrollTo(0, 0)} width={'px-4'} height={'h-10'} />


                        </div>
                    </div>

                </div>




               
            </div>

        </>
    )
}

export default Mcart