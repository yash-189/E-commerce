import React, { useState, useEffect } from 'react'
import Button from './Button'
import axios from 'axios';
import Btn from './Btn';
import profile from '../images/pp.jpg'
import vector from '../images/vector.png'
import Btn2 from './Btn2';
import Btn3 from './Btn3';
import { useAuthContext } from './AuthContext';
import { EditText, EditTextarea } from 'react-edit-text';
import 'react-edit-text/dist/index.css';
import CardProfile from './CardProfile';
import { FilePond, registerPlugin } from 'react-filepond';

// Import FilePond styles
import 'filepond/dist/filepond.min.css';
import { useGlobalContext } from './CartContext';

const Profile = () => {

    const api = "http://68.183.90.227:8080/profile";
    const apiupdate = "http://68.183.90.227:8080/profile/update";

    const { pathName } = useGlobalContext()

    const [profileData, setprofileData] = useState([])
    const [profile, setprofile] = useState({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        verification: ""
    })

    const getProfile = () => {
        // console.log(sid);
        axios.post(api, { "token": token })
            .then((res) => {
                console.log(res);
                setprofileData(res.data)
                // setprofile({
                //     firstname:res.data.firstname,
                //     lastname:res.data.lastname,
                //     email:res.data.email,
                //     password:'',
                //     verification:''
                // })
            })
            .catch((err) => console.log(err))
    }



    useEffect(() => {
        getProfile();


    }, [])

    const Login = ''



    // profile update


    const onChange = (e) => {
        console.log('onchange');
        setprofile({ ...profile, [e.target.id]: e.target.value })
        // console.log(profile);
    }

    const { Data, token } = useAuthContext();




    // const [token, settoken] = useState("")
    // const token = localStorage.getItem("token");
    // console.log(token);

    // const [sid, setsid] = useState({})
    useEffect(() => {

        // settoken(token)
    }, [])

    const [data, setdata] = useState([])

    const [image, setImage] = useState(null);
    const [file, setfile] = useState(null)




    // const onSubmit = (e) => {
    //     e.preventDefault()

    //     axios.post(apiupdate, { profile, "token":token}) 
    //         .then((response) => {
    //             console.log(profile)
    //             console.log(response);


    //         })
    //         .catch((error) => {
    //             // console.log(signup)
    //             console.log(error);


    //         });


    // }

    const updateProfile = (e) => {
        e.preventDefault()
        console.log(profile);

        if (profile.password === '' && profile.verification === '') {
            console.log('cannot be blank');
            alert('password cannot be blank')
        } else {


            axios.post(apiupdate, { "token": token, profile })
                .then((res) => {
                    console.log(res);
                    // setprofileData(res.data)
                })
                .catch((err) => console.log(err))
        }


        // }




    }




    const handleClick = (img) => {
        const formData = new FormData();
        formData.append('my-image-file', img);
        // setImage(formData);
        console.log(img);
        console.log(formData);
        console.log('upload');
        axios.post(api, { "token": token, image })
            .then(res => {
                console.log('Axios response: ', res)
            })
        console.log(file);
    }


    const handleFileInput = (e) => {
        setfile(e.target.files[0])
        const img = e.target.files[0]
        // console.log('handleFileInput')
        // console.log(e.target.files[0]);
        // const formData = new FormData();
        // formData.append('my-image-file', e.target.files[0], e.target.files[0].name);
        // setImage(formData);
        // console.log(formData);
        // console.log('upload');
        handleClick(img);
        // console.log(image);
    }


    return (
        <>
            {/* <CardProfile/> */}

            {/* <section className=' p-4  h-screen flex justify-center justify-self-center bg-slate-100'>
                <div className="lg:w-3/5 md:w-3/5 sm:w-4/5 flex justify-between  w-full md:py-8 mt-8 md:mt-0 px-20 md:px-10">
                    <div className='flex flex-col'>
                        <h2 className='my-3' >Name:</h2>
                        <h2 className='my-3' >Email:</h2>
                        <h2 className='my-3' >Password:</h2>
                        <p className='my-3' >
                            <a href='#!'>Change password</a>

                        </p>
                        <Button name='save' width='w-fit mt-3'></Button>

                    </div>
                    <div className=' flex justify-center'>
                        <img src='' alt='profile'></img><div />
                        <div>
                            <h4>Image Upload</h4>

                            <button onClick={handleClick}>Upload!</button>
                            <input type="file" onChange={handleFileInput} />
                        </div>
                    </div>
                </div>
            </section> */}


            <div className='   sm:h-screen h-[85vh] flex justify-between bg-white'>
                {/* {alert ? <ErrorAlert name='error' alert={alert} setalert={setalert} /> : null} */}
                <div className="lg:w-7/12 md:w-7/12 sm:w-3/4 flex flex-wrap  sm:justify-around mx-auto w-full md:py-8  md:mt-0">

                    {/* <form onSubmit={updateProfile} className='flex flex-col self-center md:w-7/12 w-11/12 order-2 md:order-1'>


                        <h2 className="text-gray-900 mb-5  text-3xl font-bold ">User Details</h2>



                        <div className="flex items-center justify-between mb-2 ">
                            <h2 className="leading-7  text-md text-gray-800 font-bold">First name:
                            </h2>
                            <EditText className='text-gray-700 py-0 bg-gray-200 rounded-lg' style={{ height: '2rem', width: '15rem', padding:'4px 0.7rem' }} defaultValue={profileData.firstname}  value={profile.firstname} id="firstname" name="firstname" type='name' onChange={onChange} />
                           
                        </div>
                        <div className="flex items-center justify-between mb-2">
                        <h2 className="leading-7  text-md text-gray-800 font-bold ">Last name:
                            </h2>
                            <EditText className='text-gray-700 py-0 bg-gray-200 rounded-lg' style={{ height: '2rem', width: '15rem' , padding:'4px 0.7rem'}} defaultValue={profileData.lastname} value={profile.lastname} id="lastname" name="lastname" type='name' onChange={onChange} />
                           
                        </div>



                        <div className="flex items-center justify-between mb-2 ">
                            <h2 className="leading-7  text-md text-gray-800 font-bold">Email:</h2>
                            <EditText className='text-gray-700 py-0 bg-gray-200 rounded-lg' style={{ height: '2rem', width: '15rem', padding:'4px 0.7rem' }} defaultValue={profileData.email} value={profile.email} id="email" name="email" type='email' onChange={onChange} />
                        </div>
                        <div className="flex items-center justify-between  mb-2">
                            <h2 className="leading-7  text-md text-gray-800  font-bold">Password:</h2>
                            <EditText className='text-gray-700 py-0 bg-gray-200 rounded-lg' style={{ height: '2rem', width: '15rem', padding:'4px 0.7rem' }} value={profile.verification} name={'verification'} id='verification' onChange={onChange} />

                        </div>
                        <div className="flex items-center mb-4 justify-between  ">
                            <h2 className="leading-7  text-md text-gray-800  font-bold">Change password:</h2>
                            <EditText className='text-gray-700 py-0 bg-gray-200 rounded-lg' style={{ height: '2rem', width: '15rem', padding:'4px 0.7rem' }} value={profile.password} name={'password'} id='password' onChange={onChange} />
                        </div>
                        <Btn2 name='Save' width='w-28' height={'h-8'} type='submit' />
                      


                    </form> */}










                    <form onSubmit={updateProfile} className='lg:w-2/4 sm:w-3/4 md:w-2/3 w-full p-6  bg-white rounded-lg flex flex-col order-2 md:order-1'>

                        {pathName.includes('/') ?
                            ''
                            : <h2 className="text-gray-900 mb-10  text-3xl font-bold ">User Details</h2>}
                        <div className=" mb-2">
                            <label htmlFor="name" className="leading-7   text-gray-800 text-sm">Firstname</label>
                            <EditText className='text-gray-700 py-0 border-b outl rounded-lg' style={{ height: '2rem', width: '100%', padding: '4px 0.7rem' }} defaultValue={profileData.firstname} value={profile.firstname} id="firstname" name="firstname" type='name' onChange={onChange} />
                        </div>
                        <div className=" mb-2">
                            <label htmlFor="name" className="leading-7   text-gray-800  text-sm">Lastname</label>
                            <EditText className='text-gray-700 py-0 border-b outl rounded-lg' style={{ height: '2rem', width: '100%', padding: '4px 0.7rem' }} defaultValue={profileData.lastname} value={profile.lastname} id="lastname" name="lastname" type='name' onChange={onChange} />
                        </div>







                        <div className=" mb-2">
                            <label htmlFor="" className="leading-7   text-gray-800 text-sm">Email</label>
                            <EditText className='text-gray-700 py-0 border-b outl rounded-lg' style={{ height: '2rem', width: '100%', padding: '4px 0.7rem' }} defaultValue={profileData.email} value={profile.email} id="email" name="email" type='email' onChange={onChange} />
                        </div>





                        <div className=" mb-2">
                            <label htmlFor="" className="leading-7   text-gray-800  text-sm">Password</label>
                            <EditText className='text-gray-700 py-0 border-b outl rounded-lg' style={{ height: '2rem', width: '100%', padding: '4px 0.7rem' }} value={profile.verification} name={'verification'} id='verification' onChange={onChange} />
                        </div>

                        <div className=" mb-2">
                            <label htmlFor="" className="leading-7   text-gray-800  text-sm">Change Password</label>
                            <EditText className='text-gray-700 py-0 border-b  rounded-lg' style={{ height: '2rem', width: '100%', padding: '4px 0.7rem' }} value={profile.password} name={'password'} id='password' onChange={onChange} />
                        </div>


                        <Btn2 name='Save' width='w-28' height={'h-8'} type='submit' />
                    </form>


















                    <div className='flex flex-col self-center justify-center items-center md:w-1/4 w-full  h-52 order-1 md:order-2 '>
                        <div className='rounded-md'>
                            <img src={`http://68.183.90.227:8080/${profileData.profile}`} height='100rem' width='100rem' alt='profile' className='bg-gray-400 mr-2 rounded-md'>

                            </img>
                            <div className='flex flex-col w-auto justify-center items-center '>
                                {/* <h4>Upload Image</h4> */}
                                <div>
                                    <label for="file" className='bg-slate-400  absolute -mt-8 -ml-8 '>Choose</label>
                                    <input type="file" id='file' className='my-6 file hidden ' onChange={handleFileInput} />
                                </div>
                            </div>

                        </div>
                        {/* <button className='ml-4 text-gray-700 bg-gray-200 border-0 py-2 px-2 focus:outline-none  hover:bg-gray-300 rounded-lg ' onClick={handleClick}>Upload</button> */}
                    </div>
                </div>


                <div className=' bg-purple-300  w-1/3 sm:flex pl-6 hidden'>
                    <img src={vector} alt='vector' className='self-end relative xl:right-40 lg:right-56 md:right-40 sm:right-28 mb-14 h-max w-full' />

                </div>
            </div>

        </>
    )
}

export default Profile