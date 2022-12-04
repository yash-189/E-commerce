import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import vector from '../images/vector.png'
import Btn2 from './Btn2';
import { useGlobalContext } from './CartContext';
import Item3 from './Items/Item3';

const Wishlist = () => {
    const { wishlistdata, removeWishlist, addToCart, data, handleClick, pathName } = useGlobalContext();
    console.log(wishlistdata);
    const [quantity, setQuantity] = useState(1);

    // const increase = () => {
    //     setQuantity(count => count + 1);
    // };

    // const decrease = () => {
    //     if (quantity > 1) {
    //         setQuantity(count => count - 1);
    //     }
    // };

    return (
        <>
            <section className=" body-font pt-16 sm:pt-0">
                <div className='bg-gradient-to-r from-[#ba94eb] to-[#90a0ec] md:py-28 sm:py-24 py-10 flex justify-center items-center flex-col text-white'>
                    <h1 className='md:text-5xl sm:text-3xl text-2xl w-max sm:w-auto'>Your Wishlist</h1>
                    <h3 className='sm:mt-10 mt-4 md:text-2xl sm:text-xl text-base '>Home / Wishlist</h3>
                </div>
                <div className="container px-5 md:py-24 sm:py-20 py-10 mx-auto flex flex-wrap ">

                    <div className="w-full mx-auto grid gap-4 grid-cols-2 justify-center items-center bg-white">
                        <div className='col-span-2'>
                            <h1 className='text-2xl mb-8'>Your Items</h1>
{wishlistdata==''?
<div key={'elem.id'} className='rounded-md  mt-8 border shadow-md py-16 px-5'>
                                <h1 className='text-xl '>Wishlist empty... </h1>

                            </div> :
                            <>

                            {pathName.includes('/') ?
                                <>
                                    {wishlistdata?.map((elem) => {
                                        return <div key={elem.id} className={`rounded-md flex w-full  mt-4 border shadow-md px-2 py-8 font-semibold relative`}>
                                            <Link to={'/details'} onClick={() => handleClick(elem.product_id
) + window.scrollTo(0, 0)}>
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

                                                <div className=' absolute top-8 right-1' >


                                                    <button className='mx-4  hover:text-violet-500 active:text-violet-500 focus:outline-none focus:text-violet-500 ' onClick={() => removeWishlist(elem.product_id, elem.title, elem.shade, elem.quantity, elem.price)} >


                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 512 512"><title>ionicons-v5-e</title><path d="M112,112l20,320c.95,18.49,14.4,32,32,32H348c17.67,0,30.87-13.51,32-32l20-320" style={{ fill: "none", stroke: "#000", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "32px" }} /><line x1="80" y1="112" x2="432" y2="112" style={{ stroke: "#000", strokeLinecap: "round", strokeMiterlimit: "10", strokeWidth: "32px" }} /><path d="M192,112V72h0a23.93,23.93,0,0,1,24-24h80a23.93,23.93,0,0,1,24,24h0v40" style={{ fill: "none", stroke: "#000", StrokeLinecap: "round", StrokeLinejoin: "round", strokeWidth: "32px" }} />
                                                            <line x1="256" y1="176" x2="256" y2="400" style={{ fill: "none", stroke: "#000", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "32px" }} /><line x1="184" y1="176" x2="192" y2="400" style={{ fill: "none", stroke: "#000", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "32px" }} /><line x1="328" y1="176" x2="320" y2="400" style={{ fill: "none", stroke: "#000", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "32px" }} /></svg>
                                                    </button>
                                                </div>
                                                <div className='flex justify-between w-full mt-1'>
                                                    <h1 className='text-base font-medium'><span className='mr-1'>₹</span>{elem.price}</h1>
                                                    <div className='flex mr-3'>

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


                                        </div>
                                    })}
                                </>
                                :
                                <>
                                    {wishlistdata?.map((elem) => {
                                        return <div className='grid gap-2 sm:grid-cols-3 grid-cols-2 mt-4 border shadow-md py-10 px-5 relative'>

                                            <div className='text-center'>
                                                <img src={`http://68.183.90.227:8080/${elem.image}`} height={'100'} width={'100'} alt='image'></img>
                                            </div>
                                            <div className=''>
                                                <h1>{elem.title}</h1>
                                                <h2 className='my-2'>₹ {elem.price}</h2>
                                                <h2 className=''>Color</h2>


                                                <div className='absolute top-4 right-4'>
                                                    <a href='#' onClick={() => removeWishlist(elem.product_id, elem.title, elem.shade, elem.quantity, elem.price)} ><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 512 512"><title>ionicons-v5-e</title><path d="M112,112l20,320c.95,18.49,14.4,32,32,32H348c17.67,0,30.87-13.51,32-32l20-320" style={{ fill: "none", stroke: "#000", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "32px" }} /><line x1="80" y1="112" x2="432" y2="112" style={{ stroke: "#000", strokeLinecap: "round", strokeMiterlimit: "10", strokeWidth: "32px" }} /><path d="M192,112V72h0a23.93,23.93,0,0,1,24-24h80a23.93,23.93,0,0,1,24,24h0v40" style={{ fill: "none", stroke: "#000", StrokeLinecap: "round", StrokeLinejoin: "round", strokeWidth: "32px" }} />
                                                        <line x1="256" y1="176" x2="256" y2="400" style={{ fill: "none", stroke: "#000", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "32px" }} /><line x1="184" y1="176" x2="192" y2="400" style={{ fill: "none", stroke: "#000", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "32px" }} /><line x1="328" y1="176" x2="320" y2="400" style={{ fill: "none", stroke: "#000", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "32px" }} /></svg>
                                                    </a>
                                                </div>

                                            </div>
                                            <div className='flex flex-col'>
                                                <Btn2 name={'Add to cart'} onClick={() => addToCart(elem.product_id, elem.title, elem.shade, elem.quantity, elem.price)} css={"my-2"} width={'sm:w-40'} height={'h-10'}></Btn2>
                                                <Link to={'/details'} onClick={() => handleClick(elem.product_id
)}>
                                                    <Btn2 name={'View'} css={"my-2"} width={'sm:w-40 '} height={'h-10'}></Btn2>
                                                </Link>

                                            </div>

                                        </div>
                                    })}

                                </>




                            }
                            </>

}
                        </div>




                    </div>


                </div>

                <div className='container px-5 sm:py-24 mx-auto '>
                    <h1 className='my-4 text-2xl'>Related to items you viewed</h1>
                    <Item3 />

                </div>
            </section>

        </>
    )
}

export default Wishlist