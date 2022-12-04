import React, { useState } from 'react'
import Button from './Button';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import ErrorAlert from './ErrorAlert';
import Btn from './Btn';
import vector from '../images/vector.png'



const Contact = () => {
    const Navigate = useNavigate();
    const [error, seterror] = useState({});
    const [alert, setalert] = useState(true)




    const [contact, setcontact] = useState({
        name: '',
        email: '',
        message: ''
    })
    const Api = "http://192.168.68.114:8000/register";

    const onSubmit = (e) => {
        e.preventDefault()

        axios.post(Api, { contact })
            .then((response) => {
                console.log(contact)
                console.log(response);
                Navigate('/')

            })
            .catch((error) => {
                console.log(contact)
                console.log(error);
                const data = error.response.data.error;
                setTimeout(() => {
                    setalert(true)

                }, 3000);
                seterror(data)
                console.log(data);

            });


    }
    console.log(error);


    const onChange = (e) => {
        setcontact({ ...contact, [e.target.id]: e.target.value })
    }


    return (
        <>
            <div className='   h-screen flex justify-between bg-white'>
                {/* {alert ? <ErrorAlert name='error' alert={alert} setalert={setalert} /> : null} */}
                <div className="lg:w-7/12 md:w-7/12 sm:w-3/4 flex flex-col items-center justify-center mx-auto w-full md:py-8 mt-0">
                    {/* <h1 className='text-center text-lg mb-2'>Name/Icon</h1> */}
                    <h2 className="text-gray-900 mb-5  text-3xl font-bold ">Contact Us</h2>



                    <form onSubmit={onSubmit} className='lg:w-2/4 sm:w-3/4 md:w-2/3 p-6  bg-white rounded-lg '>
                        <div className='flex  mb-6 '>
                            <div className="">
                                <label htmlFor="name" className="leading-7 mb-4 text-md text-gray-800 font-bold">Name</label>
                                <input type="name" id="firstname" name="firstname" onChange={onChange} value={contact.name} className="w-11/12 mr-4 mt-1 border border-gray-200   text-sm outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 rounded-xl  bg-gray-200 ease-in-out" />
                            </div>
                            <div className=" ">
                            <label htmlFor="email" className="leading-7 mb-4 text-md text-gray-800 font-bold">Email</label>
                            <input type="email" id="email" name="email" onChange={onChange} value={contact.email} className="w-full mt-1  border border-gray-200 text-sm outline-none text-gray-700 py-1 px-3 rounded-xl bg-gray-200 leading-8 transition-colors duration-200 ease-in-out" />
                        </div>
                        </div>


                            
                        <div className=" mb-6">
                            <label htmlFor="message" className="leading-7 mb-4 text-md text-gray-800  font-bold">Message</label>
                            <textarea  id="message" name="message" onChange={onChange} value={contact.message} className="w-full mt-1  border border-gray-200 text-sm outline-none text-gray-700 py-1 rounded-xl bg-gray-200 px-3 leading-8 transition-colors duration-200 ease-in-out " />
                        </div>
                        {/* <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="LgbsSe-Bz112c"><g><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path><path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path><path fill="none" d="M0 0h48v48H0z"></path></g></svg> */}

                        <Btn name='Send' width='100' />
                        
                    </form>




                    <hr />
                    {/* <div>
                        <div className='block'>
                            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="LgbsSe-Bz112c"><g><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path><path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path><path fill="none" d="M0 0h48v48H0z"></path></g></svg></div>
                    </div> */}




                </div>

             
            </div>

        </>
    )
}

export default Contact