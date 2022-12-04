import React from 'react'
import { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useAuthContext } from '../AuthContext';

const Mprofile = ({ setOpenTab }) => {

    const navigate = useNavigate()

    const token = localStorage.getItem("token");
    console.log(token);

    const { first, logout } = useAuthContext();
    const [user, setuser] = useState(JSON.parse(localStorage.getItem('user')) || false)

    return (
        <>
            <div className="flex flex-col w-9/12 h-full shadow-md bg-white fixed top-0 z-30 overflow-y-scroll" id='cartslide'>
                <div className='flex flex-col justify-between h-full'>
                    <div >

                        <div className='pt-8 pb-2 bg-gradient-to-r from-[#ba94eb] to-[#90a0ec] text-white'>
                            <div className="pt-4 pb-2 px-6">
                                <h1 className='text-lg font-semibold'>Hello, {user?.user?.name}</h1>
                                <h1 className='text-2xl font-semibold'>Your account</h1>
                            </div>




                        </div>
                        <hr />

                        {/* <div className=' px-6 mt-4 mb-8'>
                            <h1 className='text-xl font-semibold'>Orders</h1>
                        </div> */}

                        <div className=' px-6 mt-5 mb-4 flex items-center'>
                            <Link to={'/orders'} className='flex items-center hover:text-violet-500 active:text-violet-500 focus:outline-none focus:text-violet-500' onClick={() => setOpenTab(3)}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-box mr-3" viewBox="0 0 16 16"> <path d="M8.186 1.113a.5.5 0 0 0-.372 0L1.846 3.5 8 5.961 14.154 3.5 8.186 1.113zM15 4.239l-6.5 2.6v7.922l6.5-2.6V4.24zM7.5 14.762V6.838L1 4.239v7.923l6.5 2.6zM7.443.184a1.5 1.5 0 0 1 1.114 0l7.129 2.852A.5.5 0 0 1 16 3.5v8.662a1 1 0 0 1-.629.928l-7.185 2.874a.5.5 0 0 1-.372 0L.63 13.09a1 1 0 0 1-.63-.928V3.5a.5.5 0 0 1 .314-.464L7.443.184z" /> </svg>
                                <h1 className='text-base '>Orders</h1>
                            </Link>
                        </div>

                        <div className=' px-6 mt-4 mb-4 flex items-center'>
                            <Link to={'/wishlist'} className='flex items-center hover:text-violet-500 active:text-violet-500 focus:outline-none focus:text-violet-500' onClick={() => setOpenTab(3)}>
                                <svg className="mr-3 bi bi-hear" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"> <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" /> </svg>
                                <h1 className='text-base '>Wishlist</h1>
                            </Link>
                        </div>

                        <hr />


                        <div className=' px-6 mt-4 mb-4'>
                            <h1 className='text-lg font-semibold'>Account settings</h1>
                        </div>


                        <div className=' px-6 mt-2 mb-4 flex items-center'>

                            <Link to={'/profile'} className='flex items-center hover:text-violet-500 active:text-violet-500 focus:outline-none focus:text-violet-500 ' onClick={() => setOpenTab(3)}>
                                <svg className="mr-3" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"> <g> <path fill="none" d="M0 0h24v24H0z" /> <path d="M20 22h-2v-2a3 3 0 0 0-3-3H9a3 3 0 0 0-3 3v2H4v-2a5 5 0 0 1 5-5h6a5 5 0 0 1 5 5v2zm-8-9a6 6 0 1 1 0-12 6 6 0 0 1 0 12zm0-2a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" /> </g> </svg>
                                <h1 className='text-base '>Edit profile</h1>
                            </Link>
                        </div>

                        <div className='px-6 mt-2 mb-4 flex items-center'>
                        <Link to={'/address'} className='flex items-center hover:text-violet-500 active:text-violet-500 focus:outline-none focus:text-violet-500 ' onClick={() => setOpenTab(3)}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="mr-3" width="16" height="16" viewBox="0 0 512 512"> <path fill="var(--ci-primary-color, currentColor)" d="M253.924,127.592a64,64,0,1,0,64,64A64.073,64.073,0,0,0,253.924,127.592Zm0,96a32,32,0,1,1,32-32A32.037,32.037,0,0,1,253.924,223.592Z" /> <path fill="var(--ci-primary-color, currentColor)" d="M376.906,68.515A173.922,173.922,0,0,0,108.2,286.426L229.107,472.039a29.619,29.619,0,0,0,49.635,0L399.653,286.426A173.921,173.921,0,0,0,376.906,68.515Zm-4.065,200.444L253.925,451.509,135.008,268.959C98.608,213.08,106.415,138.3,153.571,91.142a141.92,141.92,0,0,1,200.708,0C401.435,138.3,409.241,213.08,372.841,268.959Z" class="ci-primary" /> </svg>
                            <h1 className='text-base '>Saved Addresses</h1>
                            </Link>
                        </div>
                        <hr />

                        <div className=' px-6 mt-4 mb-4'>
                            <h1 className='text-lg font-semibold'>My activity</h1>
                        </div>


                        <div className=' px-6 mt-2 mb-4 flex items-center'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square mr-3" viewBox="0 0 16 16"> <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" /><path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" /> </svg>
                            <h1 className='text-base '>Reviews</h1>
                        </div>

                        <div className=' px-6 mt-2 mb-4 flex items-center'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chat-left mr-3" viewBox="0 0 16 16"> <path d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H4.414A2 2 0 0 0 3 11.586l-2 2V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" /> </svg>
                            <h1 className='text-base '>Questions & Answers</h1>
                        </div>

                        <hr />

                        <div className=' px-6 mt-4 mb-4'>
                            <h1 className='text-lg font-semibold'>Feedback & Information</h1>
                        </div>


                        <div className=' px-6 mt-2 mb-4 flex items-center'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" className='mr-3' viewBox="0 0 256 256"><rect width="256" height="256" fill="none" /><path d="M168,224H56a8,8,0,0,1-8-8V72a8,8,0,0,1,8-8h80l40,40V216A8,8,0,0,1,168,224Z" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="12" /><path d="M80,64V40a8,8,0,0,1,8-8h80l40,40V184a8,8,0,0,1-8,8H176" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="12" /><line x1="88" y1="152" x2="136" y2="152" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="12" /><line x1="88" y1="184" x2="136" y2="184" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="12" /></svg>
                            <h1 className='text-base'>Terms, Policies and Licenses</h1>
                        </div>

                        <div className=' px-6 mt-2 mb-4 flex items-center'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-question-circle mr-3" viewBox="0 0 16 16"> <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" /> <path d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286zm1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94z" /> </svg>
                            <h1 className='text-base'>Browse FAQs</h1>
                        </div>
                        {/* <div className=' px-6 mt-4 mb-6'>
                            <h1 className='text-lg '>Your orders</h1>
                        </div> */}

                        <hr />
                        <div className=' px-6 mt-4 mb-4'>
                            <h1 className='text-lg font-semibold'>Settings</h1>
                        </div>

                        <div className=' px-6 mt-2 mb-4 flex items-center'>
                            <Link to={'/'} className='flex items-center hover:text-violet-500 active:text-violet-500 ' onClick={() => logout()}>
                                <svg xmlns="http://www.w3.org/2000/svg" className='mr-3 ' width="16" height="16" viewBox="0 0 24 24" fill="none"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h8m4-9-4-4m4 4-4 4m4-4H9" /></svg>

                                <h1 className='text-base '>Logout</h1>
                            </Link>
                        </div>


                        {/* {wishlistdata == '' ? <div  className={`rounded-md  mt-4 border-b px-2 py-6 text-center font-semibold`}>
                            <h1 className='text-xl text-center'>Wishlist empty </h1>

                        </div> : ''} */}
                        <div className='mt-4'>







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

export default Mprofile