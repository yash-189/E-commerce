import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from "react-router-dom";
import Button from './Button';
import axios from 'axios'
import ErrorAlert from './ErrorAlert';
import Btn from './Btn';
import Vector from './Vector';
import { useAuthContext } from './AuthContext';
import Loader from './Loader';
import { useGlobalContext } from './CartContext';

const Login = ({ setshowSignup, setOpenTab }) => {
    // const { login, error, onChange, onSubmitLogin, isLoading, alert, setalert } = useAuthContext();
    const { pathName } = useGlobalContext()

    const Navigate = useNavigate();

    const [login, setlogin] = useState({
        email: '',
        password: ''
        // errors: {}
    })

    const [error, seterror] = useState({});
    const [alert, setalert] = useState(false)
    const [loading, setloading] = useState(false)
 


const Api = "http://127.0.0.1:5001/auth-b22cc/us-central1/app/api/users/login";


    const onSubmitLogin = async (e) => {
        e.preventDefault()
        setloading(true)

        axios.post(Api, {email:login.email,
        password:login.password})
        .then((response)=> {
            console.log(login)
            console.log(response);
    
            localStorage.setItem('user', JSON.stringify(response?.data));
            localStorage.setItem('logged', true);
            
            window.location.href = "/"
        setloading(false)

        })
        .catch((error)=>{
            console.log(login)
               

            seterror(error)
            setloading(false)
      

        });


    }

    const onChange = (e) => {
        setlogin({ ...login, [e.target.id]: e.target.value })
        // console.log(login);
    }

    setTimeout(() => {
        setalert(false)

    }, 5000);



    return (
        <>
            <div className='   sm:h-screen h-screen flex justify-between bg-white'>
                {alert ? <ErrorAlert name={error.error} alert={alert} setalert={setalert} /> : null}
                <div className="lg:w-7/12 md:w-7/12 sm:w-3/4 flex flex-col items-center justify-center mx-auto w-full md:py-8 mt-0 ">
                    {/* <h1 className='text-center text-lg mb-2'>Name/Icon</h1> */}
                    <h2 className="text-gray-900 sm:mb-5  text-3xl font-bold ">Login</h2>



                    <form onSubmit={onSubmitLogin} className='lg:w-2/4 sm:w-3/4 md:w-2/3 p-6 shadow-lg bg-white rounded-lg'>



                        <div className=" mb-6">
                            <label htmlFor="email" className="leading-7 mb-4 text-md text-gray-800 font-bold">Email</label>
                            <input type="email" id="email" name="email" onChange={onChange} value={Login.email} className="w-full mt-1  border border-gray-200 text-sm outline-none text-gray-700 py-1 px-3 rounded-xl bg-gray-200 leading-8 transition-colors duration-200 ease-in-out" />
                        </div>
                        <div className=" mb-6">
                            <label htmlFor="password" className="leading-7 mb-4 text-md text-gray-800  font-bold">Password</label>
                            <input type="password" id="password" name="Password" onChange={onChange} value={Login.password} className="w-full mt-1  border border-gray-200 text-sm outline-none text-gray-700 py-1 rounded-xl bg-gray-200 px-3 leading-8 transition-colors duration-200 ease-in-out " />
                        </div>


                        <Btn name='Login' width='100' isLoading={loading}  />
                        <div className=''>

                            <p className="leading-7 text-sm text-gray-600  mt-2 ml-1">
                                Forgot password?
                                <Link to={pathName.includes('/') ? '/' : ''} onClick={() => pathName.includes('/') ? setOpenTab(3) : ''}><span style={{
                                    fontSize: "16px",
                                    background: "-webkit-linear-gradient(#b388eb, #8093f1)",
                                    webkitBackgroundClip: "text",
                                    webkitTextFillColor: "transparent"
                                }}> Reset</span></Link>
                            </p>
                            <p className="leading-7 text-sm text-gray-600 mb-2  ml-1">
                                Don't have an account?
                                <Link to={pathName.includes('/') ? '/register' : '/register'} onClick={() => pathName.includes('/') ? setshowSignup(true) : ''}><span style={{
                                    fontSize: "16px",
                                    background: "-webkit-linear-gradient(#b388eb, #8093f1)",
                                    WebkitBackgroundClip: "text",
                                    WebkitTextFillColor: "transparent"
                                }}> Signup</span></Link></p>
                        </div>
                    </form>
                </div>

                <div className=' bg-purple-300  w-1/3 sm:flex pl-6 hidden'>
                    <Vector styles={'self-center relative xl:right-40 lg:right-56 md:right-40 sm:right-28 mb-14'} />

                </div>
            </div>

        </>
    )
}

export default Login