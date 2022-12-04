import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useGlobalContext } from '../CartContext'
import profile from '../../images/pp.jpg'
import { useAuthContext } from '../AuthContext'

const Sidebar = ({setOpenTab}) => {

  const {pathName,getCategoryData} = useGlobalContext()
  const {first} = useAuthContext()



  const [collapse, setcollapse] = useState(0)
  const [user, setuser] = useState(JSON.parse(localStorage.getItem('user')) || false)
  console.log(user,'kkk');
  return (
    <>

      <div className="flex flex-col justify-between w-3/5 h-full shadow-md bg-white fixed top-0 z-30 overflow-y-scroll" id='slide'>
        <div>
          <div className="pt-4 pb-2 px-6">
            <a href="#!">
              <div className="flex items-center">
                <div className="shrink-0">
                  <img src={profile} className="rounded-full w-10" alt="Avatar" />
                </div>
                <div className="grow ml-3">
                  <p className="text-sm font-semibold text-[#8093f1] capitalize">{user?user?.user.name:'Hey! Userr'}</p>
                </div>
              </div>
            </a>
          </div>
          <hr />



          <ul className="relative px-1 my-4">
            <li className="relative">

              <Link to={pathName.includes('/')?'/explore':'/explore'} onClick={()=> setOpenTab(3)} className="flex items-center  py-4 px-6 h-12 overflow-hidden text-ellipsis whitespace-nowrap rounded hover:text-blue-600 hover:bg-blue-50 transition duration-300 ease-in-out" href="#!">
                <span className=''>Trending</span>

              </Link>

            </li>

            {/* <li className={`relative bg-white h-12 ${collapse === 1 ? 'nav' : ''}`} onClick={() => setcollapse(prev => prev === 1 ? 0 : 1)} >
              <a className="flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-blue-600 hover:bg-blue-50 transition duration-300 ease-in-out cursor-pointer" >


                <span >Categories</span>



                <svg className="w-3 h-3 ml-auto" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                  <path fill="currentColor" d="M207.029 381.476L12.686 187.132c-9.373-9.373-9.373-24.569 0-33.941l22.667-22.667c9.357-9.357 24.522-9.375 33.901-.04L224 284.505l154.745-154.021c9.379-9.335 24.544-9.317 33.901.04l22.667 22.667c9.373 9.373 9.373 24.569 0 33.941L240.971 381.476c-9.373 9.372-24.569 9.372-33.942 0z"></path>
                </svg>
              </a>
              <ul className={collapse === 1 ? " block " : " hidden"} >
                <li className="relative ">
                  <a href="#!" className="flex items-center text-xs py-4 pl-12 pr-6 h-6 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-blue-600 hover:bg-blue-50 transition duration-300 ease-in-out"
                  >Link 1</a>
                </li>
                <li className="relative">
                  <a href="#!" className="flex items-center text-xs py-4 pl-12 pr-6 h-6 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-blue-600 hover:bg-blue-50 transition duration-300 ease-in-out" >Link 2</a>
                </li>
              </ul>
            </li> */}




            <li className={`relative bg-white h-12 ${collapse === 2 ? 'nav' : ''} ${collapse === 0 ? '' : ''}`} onClick={() => setcollapse(prev => prev === 2 ? 0 : 2)}>
              <a className="flex items-center  py-4 px-6 h-12 overflow-hidden  text-ellipsis whitespace-nowrap rounded hover:text-blue-600 hover:bg-blue-50 transition duration-300 ease-in-out cursor-pointer" >


                <span>Categories</span>



                <svg className="w-3 h-3 ml-auto" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                  <path fill="currentColor" d="M207.029 381.476L12.686 187.132c-9.373-9.373-9.373-24.569 0-33.941l22.667-22.667c9.357-9.357 24.522-9.375 33.901-.04L224 284.505l154.745-154.021c9.379-9.335 24.544-9.317 33.901.04l22.667 22.667c9.373 9.373 9.373 24.569 0 33.941L240.971 381.476c-9.373 9.372-24.569 9.372-33.942 0z"></path>
                </svg>
              </a>
              <ul className={`${collapse === 2 ? "relative block " : " hidden"}`}  >
                <li className="relative">
                  <a href="#" onClick={()=>getCategoryData('eye') + setOpenTab(3)} className="flex items-center text-xs py-4 pl-12 pr-6 h-6 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-blue-600 hover:bg-blue-50 transition duration-300 ease-in-out" data-mdb-ripple="true" data-mdb-ripple-color="primary">

                    <span>Eye</span>
                  </a>
                </li>
                <li className="relative">
                  <a href="#!" className="flex items-center text-xs py-4 pl-12 pr-6 h-6 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-blue-600 hover:bg-blue-50 transition duration-300 ease-in-out" data-mdb-ripple="true" data-mdb-ripple-color="primary">

                    <span>Categories 2</span>
                  </a>
                </li>
                <li className="relative">
                  <a href="#!" className="flex items-center text-xs py-4 pl-12 pr-6 h-6 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-blue-600 hover:bg-blue-50 transition duration-300 ease-in-out" data-mdb-ripple="true" data-mdb-ripple-color="primary">

                    <span>Categories 3</span>
                  </a>
                </li>
                <li className="relative">
                  <a href="#!" className="flex items-center text-xs py-4 pl-12 pr-6 h-6 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-blue-600 hover:bg-blue-50 transition duration-300 ease-in-out" data-mdb-ripple="true" data-mdb-ripple-color="primary">

                    <span>Categories 4</span>
                  </a>
                </li>
                <li className="relative">
                  <a href="#!" className="flex items-center text-xs py-4 pl-12 pr-6 h-6 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-blue-600 hover:bg-blue-50 transition duration-300 ease-in-out" data-mdb-ripple="true" data-mdb-ripple-color="primary">

                    <span>Categories 5</span>
                  </a>
                </li>
                <li className="relative">
                  <a href="#!" className="flex items-center text-xs py-4 pl-12 pr-6 h-6 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-blue-600 hover:bg-blue-50 transition duration-300 ease-in-out" data-mdb-ripple="true" data-mdb-ripple-color="primary">

                    <span>Categories 6</span>
                  </a>
                </li>
              </ul>
            </li>
            <li className="relative">

<a className="flex items-center  py-4 px-6 h-12 overflow-hidden text-ellipsis whitespace-nowrap rounded hover:text-blue-600 hover:bg-blue-50 transition duration-300 ease-in-out" href="#!">
  <span className=''>Offers</span>

</a>

</li>


          </ul>
        </div>

        <hr className="my-2" />

        <div className="text-center bottom-0 absolute w-full">
          <hr className="m-0" />
        </div>




        <div className=" bg-opacity-75 mb-8">
          <div className="container mx-auto py-2 px-12 flex flex-wrap flex-col sm:flex-row">

            <span className="inline-flex  sm:mt-0 mt-2 justify-center sm:justify-start">
              <a className="text-gray-400">
                <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                  <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                </svg>
              </a>
              <a className="ml-3 text-gray-400">
                <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                  <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                </svg>
              </a>
              <a className="ml-3 text-gray-400">
                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
                </svg>
              </a>
              <a className="ml-3 text-gray-400">
                <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0" className="w-5 h-5" viewBox="0 0 24 24">
                  <path stroke="none" d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"></path>
                  <circle cx="4" cy="4" r="2" stroke="none"></circle>
                </svg>
              </a>
            </span>
          </div>
        </div>
      </div>




    </>
  )
}

export default Sidebar