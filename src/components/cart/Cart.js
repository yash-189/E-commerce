import React, { useState } from 'react'
import Btn2 from '../Btn2';
import vector from '../../images/vector.png'
import Item3 from '../Items/Item3';
import { useGlobalContext } from '../CartContext';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import Loader from '../Loader';
import EmptyCart from './EmptyCart';

const Cart = () => {

    const { remove, data, item, quantity, increase, decrease, updatedCart, updateQ, isLoading, handleClick, pathName,cart, updateQuantity } = useGlobalContext();


    // const [data, setdata] = useState([])

    // const [cart, setcart] = useState([])
    // useEffect(() => {
    //   first
    
    //   return () => {
    //     second
    //   }
    // }, [c])

    // const [cart, setcart] = useState(JSON.parse(localStorage.getItem('cart')) || [])

    console.log(cart);
    const navigate = useNavigate()



    // const [quantity, setQuantity] = useState(0);

    // const increase = () => {
    //     setQuantity(count => count + 1);
    // };

    // const decrease = () => {
    //     if (quantity > 0) {
    //         setQuantity(count => count - 1);
    //     }
    // };

    const total = cart?.reduce((acc, item) => acc + item?.quantity * item?.price, 0)
    console.log(total)




    // const updateQuantity = () => {

    // }

    return (
        <>
            <section className=" body-font pt-16 sm:pt-0">
                <div className='bg-gradient-to-r from-[#ba94eb] to-[#90a0ec] md:py-28 sm:py-24 py-10 flex justify-center items-center flex-col text-white'>
                    <h1 className='md:text-5xl sm:text-3xl text-2xl w-max sm:w-auto'>Shopping cart</h1>
                    <h3 className='sm:mt-10 mt-4 md:text-2xl sm:text-xl text-base '>Home / cart</h3>
                </div>
                <div className="container px-5 md:py-12 sm:py-20 py-10 mx-auto   ">
                <h1 className='sm:text-2xl font-medium text-gray-600  mb-2'>Your Shopping Cart</h1>

                {cart == '' ? 
                            <div key={'elem.product_id'} className='rounded-md flex col flex-col justify-center items-center mt-8   py-8 px-5 '>
                               
                                <EmptyCart w={'220'} h={''}/>
                                <h1 className='text-2xl font-medium text-gray-400 my-4  '>Your cart is empty! </h1>
                                <Btn2 name={'Shop now'} width={'sm:w-52 w-full'} height={'sm:h-10 h-12'}  onClick={() => pathName.includes('/')? navigate('/'):navigate('/') + window.scrollTo(0, 0)}></Btn2>

                            </div> : ''}
                    <div className="lg:w-full mx-auto grid sm:gap-4 grid-cols-3 justify-center items-center bg-white">
                        <div className={`sm:col-span-2 col-span-3 ${isLoading ? 'animate-pulse' : ''}`}>
                            {isLoading && <Loader />}

                           










                            {cart?.map((elem) => {
                                return <div key={elem.product_id} className={`rounded-md grid gap-2 grid-cols-3 mt-2 border shadow-md py-10 px-5 font-semibold`}>
                                    <Link to={'/details'} onClick={() => handleClick(elem.product_id) + window.scrollTo(0, 0)}>
                                        <div className=''>
                                            <img src={`${elem.image}`} height={'100'} width={'100'} alt='image'></img>
                                        </div>
                                    </Link>
                                    <div className=''>
                                        <Link to={'/details'} onClick={() => handleClick(elem.product_id) + window.scrollTo(0, 0)}>
                                            <h1 className='text-gray-700 text-sm sm:text-lg' >{elem.title}</h1>
                                        </Link>
                                        {/* <h2>Price:{elem.price}</h2> */}
                                        <h2 className='text-sm sm:text-lg'>{elem.shade}</h2>
                                        <div className='flex my-4' >
                                            <button className='py-[0px] px-[8px]   bg-gray-200' onClick={() => updateQuantity(elem.product_id, 'decrement')}>-
                                            </button>
                                            <h2 className='mx-2 text-gray-700'>{elem.quantity}</h2>

                                            <button className='py-[0px] px-[8px]  bg-gray-200' onClick={() => updateQuantity(elem.product_id,'increment')}>+
                                            </button>
                                        </div>

                                        <h1 className='text-gray-700'>₹ {elem.price}</h1>
                                    </div>
                                    <div className='flex justify-end sm:justify-center items-center'>


                                        <button onClick={() => remove(elem.product_id)} >


                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 512 512"><title>ionicons-v5-e</title><path d="M112,112l20,320c.95,18.49,14.4,32,32,32H348c17.67,0,30.87-13.51,32-32l20-320" style={{ fill: "none", stroke: "#000", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "32px" }} /><line x1="80" y1="112" x2="432" y2="112" style={{ stroke: "#000", strokeLinecap: "round", strokeMiterlimit: "10", strokeWidth: "32px" }} /><path d="M192,112V72h0a23.93,23.93,0,0,1,24-24h80a23.93,23.93,0,0,1,24,24h0v40" style={{ fill: "none", stroke: "#000", StrokeLinecap: "round", StrokeLinejoin: "round", strokeWidth: "32px" }} />
                                                <line x1="256" y1="176" x2="256" y2="400" style={{ fill: "none", stroke: "#000", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "32px" }} /><line x1="184" y1="176" x2="192" y2="400" style={{ fill: "none", stroke: "#000", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "32px" }} /><line x1="328" y1="176" x2="320" y2="400" style={{ fill: "none", stroke: "#000", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "32px" }} /></svg></button>
                                    </div>

                                </div>
                            })}
                        </div>
                       {cart==''? '': <div className='sm:mt-0 mt-6 col-span-3 sm:col-span-1 sm:py-10 sm:ml-4 text-center sm:text-start self-start'>
                            <h1 className='text-2xl font-medium text-gray-600'>Order summary</h1>
                            <h2 className='my-4  font-medium text-gray-600'> Subtotal: Rs. <span className='text-lg font-semibold'>{Math.ceil(total)} </span> </h2>

                            <Btn2 name={'Proceed to checkout'} width={'sm:w-64 w-full'} height={'sm:h-10 h-12'} css={cart==''?'bg-gray-800 pointer-events-none opacity-60':''} onClick={() => pathName.includes('/')? navigate('/checkout'):navigate('/checkout') + window.scrollTo(0, 0)}></Btn2>
                            <p className='mx-32 my-1 w'>or</p>
                            <Btn2 name={'Continue shopping'} onClick={() => pathName.includes('/')? navigate('/checkout'):navigate('/') + window.scrollTo(0, 0)} width={'sm:w-64 w-full'} height={'sm:h-10 h-12'}></Btn2>
                        </div>}


                    </div>


                </div>
                {/* <div className=' bg-purple-300  w-1/3 sm:flex pl-6 hidden'>
                    <img src={vector} alt='vector' className='self-end relative xl:right-40 lg:right-56 md:right-40 sm:right-28 mb-14 h-max w-full' />

                </div> */}
                <div className='container px-5 sm:py-24 mx-auto '>
                    <h1 className='my-4 text-2xl font-medium text-gray-600'>Related to items you viewed</h1>
                    <Item3 />

                </div>
            </section>

        </>
    )
}

export default Cart