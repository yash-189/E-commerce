import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useGlobalContext } from "./CartContext";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "./AuthContext";
import logo from '../images/hh.png'

const Navbar = () => {
  const {
    first,
    login,
    error,
    onChange,
    onSubmitLogin,

    Data,
    logindata,
    isLoading,
    getProfile,
    datalogin,
    LoginData,

    logged, auth,setAuth, user, setUser, logout
  } = useAuthContext();
  const { cartData,cart,onchangeSearch,
    searchFilter } = useGlobalContext();
  const {decode } = useAuthContext()
  console.log(LoginData);
  console.log(datalogin);
  console.log(cartData.length, "cartData");
  // useEffect(() => {
  //     getProfile()

  // }, [])

  const { SearchProduct, query, submitHandler, getCategoryData } = useGlobalContext();
  const [dropdown, setDropdown] = useState(false);
  const [search, setsearch] = useState(false);
  const [nav, setnav] = useState(false);
  const ref = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    const closeDropDown = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        // setnav(false)
        setDropdown(false);
      }
      // console.log(e);
    };

    document.body.addEventListener("click", closeDropDown);

    return () => document.body.removeEventListener("click", closeDropDown);
  }, []);

  const sid = localStorage.getItem("sid");



console.log(decode);










  const token = localStorage.getItem("token");
  console.log(token);

  // const [decode, setdecode] = useState({})



  // const decodeToken = () => {
  //   // Define the string
  //   const encodedStringAtoB = token;

  //   const string = encodedStringAtoB?.split('.');
  //   const newString = string[1]
  //   console.log(string[1]);

  //   // Decode the String
  //   const decoded = atob(newString);
  //   setdecode(decode)

  //   console.log(decoded, "decodwe");
  //   return decoded
  // }





  // useEffect(() => {


  //   const checkAuth = decodeToken()

  //   const parsedCheckAuth = JSON.parse(checkAuth)

  //   console.log(parsedCheckAuth);
  //   setdecode(parsedCheckAuth)


  // }, [])

  // console.log(decode);








const [userr, setuserr] = useState(JSON.parse(localStorage.getItem('user')) || false)



  return (
    <>
      <div className="  bg-white">
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
      <hr />
      <header className="text-gray-600 body-font bg-white">
        <div className="container  mx-auto flex flex-wrap px-5  flex-row md:flex-row sm:justify-center justify-evenly  sm:items-center">
          <motion.div
            to={"/"}
            className="flex title-font font-medium items-center text-gray-900  md:mb-0"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", duration: 0.3 }}
          >
            {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full" viewBox="0 0 24 24">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
      </svg> */}
            <img src={logo} className="  md:ml-3 h-16 w-20 order-1"></img>
            
          </motion.div>
          <motion.nav
            className="lg:ml-8 lg:mr-auto flex flex-wrap items-center text-base justify-center md:order-2  sm:mx-none mx-auto "
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", duration: 0.3 }}
          >
            <Link to="/" className="md:mr-5 mr-2 hover:text-gray-900">
              Home
            </Link>
            {/* <div class="p-20"> */}
            <div class="group inline-block relative">
              <button class="md:mr-5 mr-2  group-hover:text-gray-900 inline-flex items-center">
                <span className="mr-0 sm:mr-2 flex  hover:text-gray-900">
                  Category
                </span>
                <svg
                  class="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </button>

              <div
                className={`absolute hidden   top-7  z-10 grid-cols-2 w-auto text-sm bg-white rounded-lg border border-gray-100 shadow-md dark:border-gray-700 md:grid-cols-3 dark:bg-gray-700 group-hover:block`}
              >
                <div className="p-4 pb-0 text-gray-900 md:pb-4 dark:text-white group-hover:block w-44 pl-6">
                  <ul
                    className="space-y-4"
                    aria-labelledby="mega-menu-dropdown-button"
                  >
                    {/* <Link to={"/explore"} onClick={()=>SearchProduct('eye')}> */}
                      <a
                        href="#" onClick={()=>getCategoryData('eye')}
                        className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-500"
                      >
                        eye
                      </a>
                    {/* </Link> */}
                    <li>
                      <a
                        href="#"
                        className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-500"
                      >
                        Library
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-500"
                      >
                        Resources
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-500"
                      >
                        Pro Version
                      </a>
                    </li>
                  </ul>
                  <ul className="space-y-4">
                    <li>
                      <a
                        href="#"
                        className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-500"
                      >
                        Blog
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-500"
                      >
                        Newsletter
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-500"
                      >
                        Playground
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-500"
                      >
                        License
                      </a>
                    </li>
                  </ul>
                  <ul className="space-y-4">
                    <li>
                      <a
                        href="#"
                        className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-500"
                      >
                        Contact Us
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-500"
                      >
                        Support Center
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-500"
                      >
                        Terms
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <Link to="/contact">
              <a href="#" className="md:mr-5 mr-0 hover:text-gray-900">
                Contact
              </a>
            </Link>
          </motion.nav>
          <motion.div
            className="lg:order-3 order-4 lg:mt-0 mt-4"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", duration: 0.3 }}
          >
            <form onSubmit={searchFilter} className=" m-auto flex">
              <input
                type="search"
                placeholder="Search here"
                className="outline-none sm:w-[32rem] md:w-96 w-auto	 px-2 	 rounded-lg"
                // value={query}
                onChange={onchangeSearch}
              />
              <button className="" type="submit">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-search ml-2"
                  viewBox="0 0 16 16"
                >
                  {" "}
                  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />{" "}
                </svg>
              </button>
            </form>
          </motion.div>

          <motion.div
            className="flex justify-center items-center lg:order-4  order-3"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", duration: 0.3 }}
          >
            {/* <form onSubmit={submitHandler} className=' m-auto flex '>

                            {search ?
                                <input type='search' placeholder='Search here' className='outline-none sm:w-[32rem] md:w-96 w-auto	 px-4 	 rounded-lg' value={query}
                                    onChange={(e) => SearchProduct(e.target.value)} />
                                // <button className="" type='submit'>
                                //     <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search ml-2" viewBox="0 0 16 16"> <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" /> </svg>

                                // </button>


                                : ""}
                            <button type='submit' onClick={() => { setsearch((prev) => !prev) }}>

                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16"> <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" /> </svg>
                            </button>

                        </form> */}

            {/* <button type='button' onClick={() => { setsearch(true) }}>

                            {search ?
                                <form onSubmit={submitHandler} className='order-3 md:order-2 m-auto'>
                                    <input type='search' placeholder='Search here' className='outline-none sm:w-[32rem] md:w-96 w-auto	 px-2 	 rounded-lg' value={query}
                                        onChange={(e) => SearchProduct(e.target.value)} />
                                    <button className="" type='submit'>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search ml-2" viewBox="0 0 16 16"> <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" /> </svg>

                                    </button>


                                </form> :
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16"> <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" /> </svg>}

                        </button> */}

            {/* <button type='button' onClick={() => { setsearch(true) }}> */}

            {/* <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16"> <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" /> </svg> */}

            {/* </button> */}

            <Link to={"/cart"}>
              <div className="flex flex-row justify-center items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-cart3 mx-4 z-10"
                  viewBox="0 0 16 16"
                >
                  {" "}
                  <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l.84 4.479 9.144-.459L13.89 4H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />{" "}
                </svg>
                <span class="inline-flex justify-center items-center absolute top-[50px] z-1 w-4 h-4 text-xs font-semibold  text-[#8093f1] rounded-full">
                  {cart?.length}
                </span>

              </div>
            </Link>

            {/* <!-- Dropdown menu --> */}
            <button
              id="dropdownDefault"
              data-dropdown-toggle="dropdown"
              className=""
              ref={ref}
              // aria-expanded={dropdown ? "true" : "false"}
              onClick={() => setDropdown((prev) => !prev)}
              type="button"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-person-circle"
                viewBox="0 0 16 16"
              >
                {" "}
                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />{" "}
                <path
                  fillRule="evenodd"
                  d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
                />{" "}
              </svg>
            </button>

            <div
              id="dropdown"
              className={`${dropdown == true ? "block" : "hidden"
                } absolute  z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 top-24 sm:right-12 right-4`}
              data-popper-reference-hidden=""
              data-popper-escaped=""
              data-popper-placement="bottom"
            >
              <ul
                className="py-1 text-sm text-gray-700 dark:text-gray-200"
                aria-labelledby="dropdownDefault"
              >
                {/* {isLoading && 'loadingg'} */}
                {!userr? (
                   <>
                   <Link to={"/login"}>
                     <a
                       href="#"
                       className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                     >
                       Login
                     </a>
                   </Link>
                   <Link to={"/register"}>
                     <a
                       href="#"
                       className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                     >
                       Signup
                     </a>
                   </Link>
                 </>




                 
                ) : (
                  <>
                    <a
                      href="#"
                      className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      onClick={() => setDropdown(false)}
                    >{userr?.user?.name}</a>
                    <Link to={"/profile"}>
                      <a
                        href="#"
                        className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        onClick={() => setDropdown(false)}
                      >
                        Edit Profile
                      </a>
                    </Link>

                    <Link to={"/"}>
                      <a
                        href="#"
                        onClick={() => {
                          logout()
                          setDropdown(false);
                          
                            // navigate("/");
                        }}
                        className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Logout
                      </a>
                    </Link>
                  </>
                )}
                {/* <li>
                                    <a href="#" className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Earnings</a>
                                </li>
                                <li>
                                    <a href="#" className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Sign out</a>
                                </li> */}
              </ul>
            </div>

            {/* <button className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0">Button
                            <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-4 h-4 ml-1" viewBox="0 0 24 24">
                                <path d="M5 12h14M12 5l7 7-7 7"></path>
                            </svg>
                        </button> */}
          </motion.div>
        </div>
      </header>
    </>
  );
};

export default Navbar;
