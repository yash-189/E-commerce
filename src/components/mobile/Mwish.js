import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Btn2 from '../Btn2'
import Btn3 from '../Btn3'
import { useGlobalContext } from '../CartContext'

const Mwish = () => {




    const { wishlistdata, removeWishlist, addToCart, data, handleClick } = useGlobalContext();

    const navigate = useNavigate()


    const total = wishlistdata.reduce((acc, item) => acc + item.quantity * item.price, 0)
    console.log(total)


    return (
        <>


            <div className="flex flex-col  w-9/12 h-full shadow-md bg-white fixed top-0 z-30 overflow-y-scroll" id='cartslide'>
                <div className='flex flex-col justify-between h-full'>
                    <div>
                    <div className='pt-6 pb-2 '>
                            <div className="  px-6">
                                {/* <h1 className='text-lg font-semibold'>My wishist</h1> */}
                                <h1 className='text-xl font-medium'>My wishist</h1>
                                
                            </div>




                        </div>
                        <hr />
                        {/* <div>
                            <div className="pt-4 pb-2 px-6">
                                <h1 className='text-xl font-semibold'>My wishist</h1>
                            </div>
                            <hr />




                        </div> */}

                        {wishlistdata == '' ? <div  className={`rounded-md  my-4 border-b px-2 pt-6 pb-8 text-center  flex items-center justify-center`}>
                            <h1 className='text-lg text-center font-norma'>Wishlist empty... </h1>

                        </div> : ''}
                        <div className='mt-4'>







                            {wishlistdata?.map((elem) => {
                                return <div key={elem.id} className={`rounded-md flex w-full  mt-4 border-b px-2 py-4 font-semibold relative`}>
                                    <Link to={'/details'} onClick={() => handleClick(elem.product_id) + window.scrollTo(0, 0)}>
                                        <div className='mx-2'>
                                            <img src={`http://68.183.90.227:8080/${elem.image}`} height={'70'} width={'70'} className='p-2' alt='image'></img>
                                        </div>
                                    </Link>
                                    <div className='w-full'>
                                        <Link to={'/details'} onClick={() => handleClick(elem.product_id) + window.scrollTo(0, 0)}>
                                            <h1 className='text-base font-normal' >{(elem.title).slice(0, 25)}...</h1>
                                        </Link>
                                        {/* <h2>Price:{elem.price}</h2> */}
                                        <h2 className='text-base font-normal' >{'shade'}</h2>

                                        <div className=' absolute top-0 right-1' >


                                            <button className='mx-4  hover:text-violet-500 active:text-violet-500 focus:outline-none focus:text-violet-500 ' onClick={() => removeWishlist(elem.product_id, elem.title, elem.shade, elem.quantity, elem.price)} >


                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 512 512"><title>ionicons-v5-e</title><path d="M112,112l20,320c.95,18.49,14.4,32,32,32H348c17.67,0,30.87-13.51,32-32l20-320" style={{ fill: "none", stroke: "#000", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "32px" }} /><line x1="80" y1="112" x2="432" y2="112" style={{ stroke: "#000", strokeLinecap: "round", strokeMiterlimit: "10", strokeWidth: "32px" }} /><path d="M192,112V72h0a23.93,23.93,0,0,1,24-24h80a23.93,23.93,0,0,1,24,24h0v40" style={{ fill: "none", stroke: "#000", StrokeLinecap: "round", StrokeLinejoin: "round", strokeWidth: "32px" }} />
                                                    <line x1="256" y1="176" x2="256" y2="400" style={{ fill: "none", stroke: "#000", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "32px" }} /><line x1="184" y1="176" x2="192" y2="400" style={{ fill: "none", stroke: "#000", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "32px" }} /><line x1="328" y1="176" x2="320" y2="400" style={{ fill: "none", stroke: "#000", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "32px" }} /></svg>
                                            </button>
                                        </div>
                                        <div className='flex justify-between w-full mt-1'>
                                        <h1 className='text-base font-medium'><span className='mr-1'>₹</span>{elem.price}</h1>
                                            <div className='flex mr-3'>
                                            {/* <button className='mr-2'>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16"> <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/> <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/> </svg>
                                                </button> */}
                                                <button className='hover:text-violet-500 active:text-violet-500 focus:outline-none focus:text-violet-500 text-violet-400
                                                ' onClick={() => addToCart(elem.product_id, elem.title, elem.shade, elem.quantity, elem.price)}>
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        height={'16'}
                                                        width="16"
                                                        fill="currentColor"
                                                        className="bi bi-cart3 mx-auto z-10"
                                                        viewBox="0 0 16 16"
                                                    >
                                                        {" "}
                                                        <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l.84 4.479 9.144-.459L13.89 4H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />{" "}
                                                    </svg>
                                                </button>
                                              
                                            </div>


                                        </div>


                                    </div>
                                    {/* <div className='flex justify-end sm:justify-center items-center'>


                                <button onClick={() => removeItem(elem.product_id, elem.title, elem.shade, elem.quantity, elem.price)} >


                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 512 512"><title>ionicons-v5-e</title><path d="M112,112l20,320c.95,18.49,14.4,32,32,32H348c17.67,0,30.87-13.51,32-32l20-320" style={{ fill: "none", stroke: "#000", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "32px" }} /><line x1="80" y1="112" x2="432" y2="112" style={{ stroke: "#000", strokeLinecap: "round", strokeMiterlimit: "10", strokeWidth: "32px" }} /><path d="M192,112V72h0a23.93,23.93,0,0,1,24-24h80a23.93,23.93,0,0,1,24,24h0v40" style={{ fill: "none", stroke: "#000", StrokeLinecap: "round", StrokeLinejoin: "round", strokeWidth: "32px" }} />
                                        <line x1="256" y1="176" x2="256" y2="400" style={{ fill: "none", stroke: "#000", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "32px" }} /><line x1="184" y1="176" x2="192" y2="400" style={{ fill: "none", stroke: "#000", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "32px" }} /><line x1="328" y1="176" x2="320" y2="400" style={{ fill: "none", stroke: "#000", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "32px" }} /></svg>
                                        </button>
                            </div> */}

                                </div>
                            })}
                        </div>
                    </div>

                    {/* <div>

                        <div className=' mx-auto text-center  py-10'>
                            <h2 className='my-4  font-semibold mb-4'> Subtotal: ₹<span className='text-lg font-semibold'>{total} </span> </h2>




                            <Btn2 name={'Checkout'} width={'px-4'} height={'h-10'} onClick={() => navigate('/checkout')} />



                            <Btn3 name={'View cart'} onClick={() => navigate('/cart')} width={'px-4'} height={'h-10'} />


                        </div>
                    </div> */}

                </div>
            </div>


        </>
    )
}

export default Mwish