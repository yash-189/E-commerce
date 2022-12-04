import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Btn2 from './Btn2';
import Btn3 from './Btn3';
import { useGlobalContext } from './CartContext';
import Item3 from './Items/Item3';

const Order = () => {
    const {pathName} = useGlobalContext()
    const navigate = useNavigate()

    const [quantity, setQuantity] = useState(0);

    const increase = () => {
        setQuantity(count => count + 1);
    };

    const decrease = () => {
        if (quantity > 0) {
            setQuantity(count => count - 1);
        }
    };

    return (
        <>
            <section className=" body-font pt-16 sm:pt-0">
                <div className='bg-gradient-to-r from-[#ba94eb] to-[#90a0ec] md:py-28 sm:py-24 py-10 flex justify-center items-center flex-col text-white'>
                    <h1 className='md:text-5xl sm:text-3xl text-2xl w-max sm:w-auto'>Your Orders</h1>
                    <h3 className='sm:mt-10 mt-4 md:text-2xl sm:text-xl text-base '>Home / orders</h3>
                </div>
                <div className="container px-5 md:py-24 sm:py-20 py-10 mx-auto flex flex-wrap ">

                    <div className="w-full mx-auto  justify-center items-center bg-white">
                    <h1 className='text-2xl mb-10'>Your Orders</h1>
{/* 
                        <div className='col-span-3 bg-gray-100 px-6 py-4 border shadow-sm flex justify-between items-center'>
                            <div className='flex'>
                                <h3>Order placed <br/>:date</h3>
                                <h3 className='ml-4'>Total<br/> :amount</h3>

                            </div>
                            <div >
                            <h3>#order id</h3>
                            </div>
                        </div>
                        <div className='col-span-3'>
                            <div className='grid gap-2 grid-cols-3 border py-10 px-5'>
                                <div className=''>
                                    <img src='' alt='image'></img>
                                </div>
                                <div className=''>
                                    <h1>Name</h1>
                                    <h2>Details</h2>
                                    <h2>Color</h2>
                                   
                                </div>
                                

                            </div>
                        </div> */}




<div className='  px-6 py-4 border shadow-sm w-full justify-between items-center border-b-2 rounded-md'>
    <div className=''>
    <div className='flex justify-between'>
        <h1>Order Name</h1>
        <h1>Status</h1>
    </div>
    <div className='flex my-2'>
        <h1>Amount</h1>
    </div>
    </div>
    <div className='border-t-2 border-dotted py-2 text-gray-500'>
    <h1>Product Details</h1>
    <h1>Date/Time</h1>
    
    </div>
    <div className='my-4 flex justify-between'>
 
   <Btn2 name={'REORDER'}  onClick={()=>pathName.includes('/') ? navigate('/cart') : navigate('/cart')} width={'w-2/4 sm:w-1/6'} height={'h-10 text-md'} />
    
    <Btn3 name={'RATE'} css='ml-4'  width={'w-2/4 sm:w-1/6'} height={'h-10 text-md'} />
    </div>
    <div>
    <div className='flex justify-between'>
        <h1>Your Rating</h1>
        <h1>Rating..</h1>
    </div>
    </div>
</div>


                        
                        {/* <div className='mt-10 py-10 ml-4'>
                            <h1 className='text-2xl'>Order summary</h1>
                            <h2 className='my-4'> Subtotal: Rs. {"Amount"}</h2>

                            <Btn2 name={'Proceed to checkout'} height={'40px'} width={'70'}></Btn2>
                            <p className='mx-32 my-1'>or</p>
                            <Btn2 name={'Continue shopping'} height={'40px'} width={'70'}></Btn2>
                        </div> */}


                    </div>


                </div>
                {/* <div className=' bg-purple-300  w-1/3 sm:flex pl-6 hidden'>
                    <img src={vector} alt='vector' className='self-end relative xl:right-40 lg:right-56 md:right-40 sm:right-28 mb-14 h-max w-full' />

                </div> */}
                <div className='container px-5 sm:py-24 mx-auto'>
                    <h1 className='my-4 text-2xl'>Related to items you viewed</h1>
                    <Item3 />

                </div>
            </section>

        </>
    )
}

export default Order