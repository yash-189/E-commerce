import React, { useState, useEffect } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { useGlobalContext } from "./CartContext";
import Homepage from "./Homepage";
import Mcart from "./mobile/Mcart";
import Mloader from "./mobile/Mloader";
import Mprofile from "./mobile/Mprofile";
import Mwish from "./mobile/Mwish";
import Sidebar from "./mobile/Sidebar";
import Login from "./Login"
import Navbar from "./mobile/Mnavbar";
import Mnavbar from "./mobile/Mnavbar";
import { useAuthContext } from "./AuthContext";
import Signup from "./Signup";

const Nav = () => {

    const { cart, isLoading, wishlistdata, cartLoading, decode,setquery } = useGlobalContext()
    const { user } = useAuthContext()


    console.log(decode);

    const [openTab, setOpenTab] = useState(3);
    const [collapse, setcollapse] = useState(0)

    const [showSignup, setshowSignup] = useState(false)

const [alert, setalert] = useState(false)


    const navigate = useNavigate()

    const location = useLocation();
    const pathName = location.pathname



    console.log(user);




    useEffect(() => {
        setTimeout(() => {
      setalert()
            
        }, 1000);
    }, [alert])
    

    return (






        <div>


            {alert && <div className=' absolute top-[50%] left-[50%]  translate-x-[-50%] translate-y-[-50%] bg-gray-100 py-2 px-3 rounded-xl z-40'>
                <p className="text-lg">
                    You're not logged in!
                </p>
            </div>
            }




            <div className={`container mx-auto   ${pathName !== '/nav' ? '' : 'h-screen'} `}>
                <div className={`px-3  bg-white ${pathName !== '/nav' ? '' : 'border'}`}>
                    <div className={openTab === 1 ? "block w-full" : " hidden"} >
                        {" "}
                        <div className={`w-full h-full shadow-md bg-[#00000080] top-0 left-0 fixed opc z-30 `} onClick={() => setOpenTab(3)} >
                            <div className="absolute right-4 top-4">
                                <svg width="30" height="30" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"> <path fill-rule="evenodd" clip-rule="evenodd" d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z" fill="white" /> </svg>
                            </div>
                        </div>
                        <Sidebar setOpenTab={setOpenTab} />

                    </div>
                    <div className={openTab === 2 ? "block" : "hidden"}>
                        <div className={`w-full h-full  shadow-md bg-[#00000080] top-0 left-0 fixed opc z-30 `} onClick={() => setOpenTab(3)} >
                            <div className="absolute right-4 top-4">
                                <svg width="30" height="30" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"> <path fill-rule="evenodd" clip-rule="evenodd" d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z" fill="white" /> </svg>
                            </div>

                        </div>
                        {isLoading && <div className={`flex justify-center items-center w-full h-full  shadow-md bg-[#00000080] top-0 left-0 fixed  z-40 `} >
                            <Mloader />
                        </div>
                        }

                        <Mcart setOpenTab={setOpenTab} setalert={setalert}/>
                    </div>
                    <div className={`${openTab === 3 ? "block" : ""} `} >
                        {/* <Mnavbar />
                        <Homepage /> */}
                    </div>
                    <div className={openTab === 4 ? "block" : "hidden"}>
                        <div className={`w-full h-full shadow-md bg-[#00000080] top-0 left-0 fixed opc z-30 overflow-y-hidden`} onClick={() => setOpenTab(3)} >

                            
                            <div className="absolute left-4 top-4">
                                <svg width="30" height="30" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"> <path fill-rule="evenodd" clip-rule="evenodd" d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z" fill="white" /> </svg>
                            </div>
                        </div>
                        {isLoading && <div className={`flex justify-center items-center w-full h-full  shadow-md bg-[#00000080] top-0 left-0 fixed  z-40 `} >
                            <Mloader name={'Removing...'} />
                        </div>
                        }
                        {cartLoading && <div className={`flex justify-center items-center w-full h-full  shadow-md bg-[#00000080] top-0 left-0 fixed  z-40 `} >
                            <Mloader name={'Adding to cart...'} />
                        </div>
                        }
                        <Mwish />
                        
                    </div>
                     
                    <div className={openTab === 5 ? "block" : "hidden"}>

                        {!user ?
                            <>
                                <div className={`w-full h-full  shadow-md bg-[#00000080] top-0 left-0 fixed opc z-30 `} onClick={() => setOpenTab(3)} >
                                    <div className="absolute left-4 top-4">
                                        <svg width="30" height="30" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"> <path fill-rule="evenodd" clip-rule="evenodd" d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z" fill="white" /> </svg>
                                    </div>

                                </div>
                                <div className="flex flex-col w-10/12 h-full shadow-md bg-white fixed top-0 z-30 overflow-y-scroll" id='cartslide'>
                                    <div className='flex flex-col justify-between h-full'>
                                        {showSignup ?
                                            <Signup setshowSignup={setshowSignup} setOpenTab={setOpenTab} />
                                            :

                                            <Login setshowSignup={setshowSignup} setOpenTab={setOpenTab} />
                                        }

                                    </div>
                                </div>

                            </>

                            :
                            <>
                                <div className={`w-full h-full  shadow-md bg-[#00000080] top-0 left-0 fixed opc z-30 `} onClick={() => setOpenTab(3)} >
                                    <div className="absolute left-4 top-4">
                                        <svg width="30" height="30" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"> <path fill-rule="evenodd" clip-rule="evenodd" d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z" fill="white" /> </svg>
                                    </div>

                                </div>
                                {isLoading && <div className={`flex justify-center items-center w-full h-full  shadow-md bg-[#00000080] top-0 left-0 fixed  z-40 `} >
                                    <Mloader />
                                </div>
                                }
                                <Mprofile />
                            </>
                        }
                    </div>
                </div>
                <div className="flex flex-col items-center justify-center w-full fixed bottom-0 drop-shadow bg-white z-20">

                    <ul className="flex space-x-2 w-full ">
                        <li className="w-1/5 text-center">
                            <a
                                // href="#"
                                onClick={() => setOpenTab(1)}
                                className={` ${openTab === 1 ? "bg-gray-100 text-white" : ""} inline-block py-4 text-gray-600 bg-white rounded  w-full`}
                            >
                                <svg className="mx-auto" xmlns="http://www.w3.org/2000/svg" width="24"
                                    height="24" viewBox="0 0 24 24"> <g> <path fill="none" d="M0 0h24v24H0z" /> <path d="M3 4h18v2H3V4zm0 7h18v2H3v-2zm0 7h18v2H3v-2z" /> </g> </svg>
                            </a>
                        </li>
                        <li className="w-1/5 text-center">
                            <a
                                // href="#"
                                onClick={() => setOpenTab(2)}
                                className={` ${openTab === 2 ? "bg-gray-100 text-white" : ""} inline-block py-4 px-2 text-gray-600 bg-white rounded  w-full`}


                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    fill="currentColor"
                                    className="bi bi-cart3 mx-auto z-10"
                                    viewBox="0 0 16 16"
                                >
                                    {" "}
                                    <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l.84 4.479 9.144-.459L13.89 4H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />{" "}
                                </svg>
                                <span class="inline-flex justify-center items-center absolute top-2 z-1 w-4 h-4 text-xs font-semibold  bg-[#8093f1] text-white rounded-full">
                                    {cart?.length}
                                </span>
                            </a>
                        </li >
                        <li className="w-1/5 text-center">
                            <div
                                onClick={() => {
                                    setOpenTab(3)
                                    navigate('/')
                                    sessionStorage.clear()
                                    setquery('')
                                    localStorage.clear();
                                    window.scrollTo(0, 0)
                                }}
                                className={` ${openTab === 3 ? "bg-gray-100 text-white" : ""} inline-block py-4 px-2 text-gray-600 bg-white rounded mx-auto w-full`}


                            >
                                <svg className="mx-auto" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24"> <g> <path fill="none" d="M0 0h24v24H0z" /> <path d="M19 21H5a1 1 0 0 1-1-1v-9H1l10.327-9.388a1 1 0 0 1 1.346 0L23 11h-3v9a1 1 0 0 1-1 1zM6 19h12V9.157l-6-5.454-6 5.454V19zm2-4h8v2H8v-2z" /> </g> </svg>
                            </div>
                        </li>
                        <li className="w-1/5 mx-auto">
                            
                            <a
                                // href="#"
                                onClick={() => user? setOpenTab(4) : setalert(true) + setOpenTab(5)}
                                className={` ${openTab === 4 ? "bg-gray-100 text-white" : ""} inline-block py-4 px-2 text-gray-600 bg-white rounded  w-full relative`}


                            >
                                <svg className="mx-auto bi bi-hear" xmlns="http://www.w3.org/2000/svg" width="24" fill="currentColor" viewBox="0 0 16 16"> <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" /> </svg>
                               {user &&  <span class="inline-flex justify-center items-center absolute top-2 z-1 w-4 h-4 text-xs font-semibold bg-[#8093f1] text-white rounded-full right-[25%]">
                                    {wishlistdata.length}
                                </span>
}
                            </a>
                        </li>
                        <li className="w-1/5 mx-auto">
                            <a
                                //  href="#" 
                                onClick={() => {
                                    setOpenTab(5)
                                        (decode.type == 'guest' ? navigate('/login') : '')

                                }}

                                className={` ${openTab === 5 ? "bg-gray-100 text-white" : ""} inline-block  py-4 px-2 text-gray-600 bg-white rounded  w-full`}


                            >
                                <svg className="mx-auto" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24"> <g> <path fill="none" d="M0 0h24v24H0z" /> <path d="M20 22h-2v-2a3 3 0 0 0-3-3H9a3 3 0 0 0-3 3v2H4v-2a5 5 0 0 1 5-5h6a5 5 0 0 1 5 5v2zm-8-9a6 6 0 1 1 0-12 6 6 0 0 1 0 12zm0-2a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" /> </g> </svg>
                            </a>
                        </li>
                    </ul>

                </div>
            </div>
        </div>
    );
}

export default Nav