import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import logo from '../../images/wakemakeup.png'
import { useGlobalContext } from "../CartContext";
import { useAuthContext } from "../AuthContext";


const Mnavbar = () => {

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
    LoginData
  } = useAuthContext();
  const { cartData, SearchProduct, query, submitHandler, pathName } = useGlobalContext();

  const { decode } = useAuthContext()




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














  const token = localStorage.getItem("token");
  console.log(token);

  // const [decode, setdecode] = useState({})



  // const decodeToken = () => {
  //   // Define the string
  //   const encodedStringAtoB = token;

  //   const string = encodedStringAtoB.split('.');
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

  console.log(decode);









  return (
    <header className="text-gray-600 body-font top-0  px-4 fixed bg-white z-20 w-full" >
      <div className="container  mx-auto flex flex-wrap  flex-row md:flex-row justify-around">
        <motion.div

          className="flex title-font font-medium items-center w-1/5 text-gray-900  md:mb-0"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.1 }}
          transition={{ type: "spring", duration: 0.5 }}
        >
          <Link to={'/'}>
            <img src={logo} className="   h-16  order-1"></img>
          </Link>



        </motion.div>

        <motion.div
          className="  w-3/5 flex"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", duration: 0.5 }}
        >
          <form onSubmit={submitHandler} className=" m-auto flex ">
            <input
              type="search"
              placeholder="Search here"
              className="outline-none  	 px-2 	w-full rounded-lg"
              value={query}
              onChange={(e) => SearchProduct(e.target.value)}
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

        <div
          className="flex justify-center items-center w-1/6 pl-5 "
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", duration: 0.5 }}
        >



          {/* <!-- Dropdown menu --> */}
          {/* <button
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
                width="26"
                height="26"
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
            </button> */}

          {/* <div
              id="dropdown"
              className={`${dropdown == true ? "block" : "hidden"
                } absolute  z-10 w-36 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 top-16 right-2`}
              data-popper-reference-hidden=""
              data-popper-escaped=""
              data-popper-placement="bottom"
            >
              <ul
                className="py-1 text-sm text-gray-700 dark:text-gray-200"
                aria-labelledby="dropdownDefault"
              >
                {first !=='' ? (
                  <>
                    <a
                      href="#"
                      className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      onClick={() => setDropdown(false)}
                    >{`${first?.firstname} ${first?.lastname}`}</a>
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
                          localStorage.removeItem("token");
                          localStorage.removeItem("user");
                          localStorage.removeItem("logged");
                          setDropdown(false);
                          setTimeout(() => {
                            if(pathName.includes('/')){
                              window.location.href = "/"

                          }else{
                            window.location.href = "/login"

                  
                          }
                          }, 500);

                        }}
                        className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Logout
                      </a>
                    </Link>
                  </>
                ) : (
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
                )}
          
              </ul>
            </div> */}
            <Link to={'/offers'}>

          <svg width="24" height="24" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M18.1336 11C18.7155 16.3755 21 18 21 18H3C3 18 6 15.8667 6 8.4C6 6.70261 6.63214 5.07475 7.75736 3.87452C8.88258 2.67428 10.4087 2 12 2C12.3373 2 12.6717 2.0303 13 2.08949" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" /> <path d="M19 8C20.6569 8 22 6.65685 22 5C22 3.34315 20.6569 2 19 2C17.3431 2 16 3.34315 16 5C16 6.65685 17.3431 8 19 8Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" /> <path d="M13.73 21C13.5542 21.3031 13.3019 21.5547 12.9982 21.7295C12.6946 21.9044 12.3504 21.9965 12 21.9965C11.6496 21.9965 11.3054 21.9044 11.0018 21.7295C10.6982 21.5547 10.4458 21.3031 10.27 21" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" /> </svg>
          </Link>

        </div>

      </div>
    </header>
  )
}

export default Mnavbar