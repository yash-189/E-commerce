import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import success from '../images/success.png'
import { useAuthContext } from './AuthContext';
import { useGlobalContext } from './CartContext';

const Success = () => {

    const { refreshPage } = useAuthContext()
    const {pathName} = useGlobalContext()


    const navigate = useNavigate()


    useEffect(() => {
        setTimeout(() => {
            if (pathName.includes('/')) {
             navigate('/')
            } else {
               navigate('/')

            }
            refreshPage()
        }, 3000);

    }, [navigate])





    return (
        <>
            <div className='grid grid-cols-5 h-auto sm:px-2 px-6'>
                <div className='md:col-span-5 col-span-5 py-10'>
                    <div className='   h-auto flex justify-between  bg-white'>
                        <div className="lg:w-10/12 md:w-10/12 sm:w-3/4 flex flex-col  items-center justify-center mx-auto w-full md:py-8 mt-8 md:mt-0">

                            <div className='py-10 text-center'>


                                <h2 className="text-gray-900 mb-5  text-3xl font-bold ">Your order has been <span className='text-green-500'>successfully</span>  placed.</h2>
                            </div>
                            <img src={success} alt='success'></img>






                        </div>


                    </div>



                </div>
            </div>



        </>
    )
}

export default Success