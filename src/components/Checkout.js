import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthContext } from './AuthContext';
import Btn from './Btn';
import Btn2 from './Btn2';
import { useGlobalContext } from './CartContext';
import check from '../images/check.png'


const Checkout = () => {
    const navigate = useNavigate()

    const { token, onSubmitCheckout, onChangeCheckout, onCheckoutClick, AddressData, addAddress, setaddAddress, clicked, checkout } = useAuthContext()
    const { cartData } = useGlobalContext()

    // const Navigate = useNavigate();
    const [error, seterror] = useState({});
    const [alert, setalert] = useState(true)


    const [sendAddress, setsendAddress] = useState({})
    // const [addAddress, setaddAddress] = useState(false)

    // const getInitialState = () => {
    //     const value = "Home";
    //     return value;
    // };

    const [value, setValue] = useState('');

    const handleChange = (e) => {
        setValue(e.target.value);
    };




    const [addressValue, setaddressValue] = useState({
    })
    const Api = "http://68.183.90.227:8080/register";


    const [data, setdata] = useState([])

    // const getAddress = () => {

    //     axios.post('http://68.183.90.227:8080/profile/address', { 'token': token })
    //         .then((res) => {
    //             console.log(res);
    //             const data = res.data.result;
    //             setdata(data)
    //             // const address = {
    //             //     title: data?.title,
    //             //     street: data?.value.street,
    //             //     house: data.value.house,
    //             //     city: data.value.city,
    //             //     state: data.value.state,
    //             //     pin: data.value.pin,
    //             //     custom: data.value.custom
    //             // }
    //             // console.log(address);
    //             // setsendAddress(address)
    //         })
    //         .catch((err) => {
    //             console.log(err);
    //         })
    // }

    // 
    // useEffect(() => {
    //     getAddress()
    //     console.log(data);

    // }, [])


    // const onSubmitCheckout = async (e) => {
    //     e.preventDefault()
    //     console.log('submit');

    //     await axios.post('http://68.183.90.227:8080/profile/add/address', { 'token': token, 'address': addressValue })
    //         .then((res) => {
    //             console.log(res);

    //             setaddAddress((prev) => !prev)
    //             getAddress()

    //         })
    //         .catch((err) => {
    //             console.log(err)


    //         });


    // }
    // const checkout = () => {

    //     axios.post('http://68.183.90.227:8080/profile/add/address', { 'token': token, 'address': addressValue })
    //         .then((res) => {
    //             console.log(res);
    //             const address = {
    //                 title: data?.title,
    //                 street: data?.value.street,
    //                 house: data.value.house,
    //                 city: data.value.city,
    //                 state: data.value.state,
    //                 pin: data.value.pin,
    //                 custom: data.value.custom
    //             }
    //             setsendAddress(address)
    //             setaddAddress((prev) => !prev)
    //             getAddress()

    //         })
    //         .catch((err) => {
    //             console.log(err)


    //         });

    // }

    // const onChangeCheckout = (e) => {
    //     setaddressValue({ ...addressValue, [e.target.id]: e.target.value })
    //     console.log(addressValue);
    // }



    const [currentRadioValue, setCurrentRadioValue] = useState()

    const handleRadioChange = (e) => {
        setCurrentRadioValue(e.target.value);
        console.log(currentRadioValue);
    };






    console.log(sendAddress);


    // const onClick = (id, street, house, city, state, pin) => {
    //     console.log(id);
    //     const object = {
    //         id: id,
    //         street: street,
    //         house: house,
    //         city: city,
    //         state: state,
    //         pin: pin,
    //     }
    //     console.log(object);
    //     setaddAddress(object)
    //     console.log(addressValue);
    // }



    // const [clicked, setClicked] = useState({total: 0});
    // console.log(AddressData);

    // useEffect(() => {
    //     onCheckoutClick(AddressData.title, AddressData.value.street, AddressData.value.house, AddressData.value.city, AddressData.value.state, AddressData.value.pin, 0)
    // }, [])

    const [disable, setdisable] = useState(true)


    const total = cartData.reduce((acc, item) => acc + item.quantity * item.price, 0)
    console.log(total)

    const [addressSelect, setaddressSelect] = useState(false)
    const [pay, setpay] = useState(false)




    return (
        <>
            {addAddress ? <>
                <div className=' w-full h-full  overflow-hidden  fixed overscroll-none flex justify-center items-center top-0  backdrop-opacity-10 backdrop-invert bg-black/40 z-30'>
                    <form onSubmit={onSubmitCheckout} className={`w-11/12 sm:w-3/4 md:w-2/5 p-6 mt-6  bg-white rounded-lg border-2 border-black-500 `}>
                        <div className='flex  mb-6 justify-between '>

                            <p className=" text-center font-bold sm:w-3/12 w-5/12 mt-1   border border-gray-200 text-sm outline-none text-gray-700 py-1 rounded-xl bg-gray-100 px-3 leading-8 transition-colors duration-200 ease-in-out">Address Type</p>
                            {/* <input type="text" required id="title" name="title" onChange={onChangeCheckout} value={addressValue.title} className="md:w-3/4 w-2/3   mt-1   border border-gray-200 text-sm outline-none text-gray-700 py-1 rounded-xl bg-gray-200 px-3 leading-8 transition-colors duration-200 ease-in-out" placeholder='Home / Work / etc' /> */}


                            <select required id="title" onChange={onChangeCheckout} value={addressValue.title} class="sm:w-8/12 w-6/12 mt-1  border border-gray-200 text-sm outline-none text-gray-700 py-1 px-3 rounded-xl bg-gray-200 leading-8 transition-colors duration-200 ease-in-out ">Select
                                {/* <option className='' selected  >Select</option> */}
                                <option className='' selected value={"Home"} >Home</option>
                                <option value="Work">Work</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>


                        <div className=" mb-6">
                            <input required type="text" id="street" name="street" onChange={onChangeCheckout} value={addressValue.street} className="w-full mt-1  border border-gray-200 text-sm outline-none text-gray-700 py-1 px-3 rounded-xl bg-gray-200 leading-8 transition-colors duration-200 ease-in-out" placeholder='Street' />
                        </div>
                        <div className=" mb-6">
                            <input required type="text" id="house" name="house" onChange={onChangeCheckout} value={addressValue.house} className="w-full mt-1  border border-gray-200 text-sm outline-none text-gray-700 py-1 px-3 rounded-xl bg-gray-200 leading-8 transition-colors duration-200 ease-in-out" placeholder='Apartment, suite, etc. ' />
                        </div>
                        <div className='flex  mb-6 justify-between'>
                            <input required type="text" id="city" name="city" onChange={onChangeCheckout} value={addressValue.city} className="w-[30%] mt-1  border border-gray-200 text-sm outline-none text-gray-700 py-1 rounded-xl bg-gray-200 px-3 leading-8 transition-colors duration-200 ease-in-out " placeholder='City' />

                            <input required placeholder="State" value={addressValue.state} onChange={onChangeCheckout} autocomplete="shipping address-level1" autocorrect="off" data-backup="province" class="w-[30%] mt-1  border border-gray-200 text-sm outline-none text-gray-700 py-1 rounded-xl bg-gray-200 px-3 leading-8 transition-colors duration-200 ease-in-out " aria-required="true" name="state" id="state" />



                            <input required value={addressValue.pin} onChange={onChangeCheckout} name='pin' id='pin' placeholder="PIN code" autocomplete="shipping postal-code" autocorrect="off" data-backup="zip" data-autocomplete-trigger="true" data-autocomplete-title="Suggestions" data-autocomplete-single-item="1 item available" data-autocomplete-multi-item="{{number}} items available" data-autocomplete-item-selection="{{number}} of {{total}}" data-autocomplete-close="Close suggestions" class="field__input field__input--zip" aria-required="true" size="30" type="text" inputmode="numeric" className='w-[30%] mt-1  border border-gray-200 text-sm outline-none text-gray-700 py-1 rounded-xl bg-gray-200 px-3 leading-8 transition-colors duration-200 ease-in-out' />


                        </div>
                        <Btn2 name='Add' width='w-full' height={'h-10'} type={'submit'} />


                    </form>
                    <div className='absolute top-6 right-8 cursor-pointer' onClick={() => setaddAddress((prev) => !prev)}>
                        <svg width="25" height="25" className='text-white' viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"> <path fill-rule="evenodd" clip-rule="evenodd" d="M12.8536 2.85355C13.0488 2.65829 13.0488 2.34171 12.8536 2.14645C12.6583 1.95118 12.3417 1.95118 12.1464 2.14645L7.5 6.79289L2.85355 2.14645C2.65829 1.95118 2.34171 1.95118 2.14645 2.14645C1.95118 2.34171 1.95118 2.65829 2.14645 2.85355L6.79289 7.5L2.14645 12.1464C1.95118 12.3417 1.95118 12.6583 2.14645 12.8536C2.34171 13.0488 2.65829 13.0488 2.85355 12.8536L7.5 8.20711L12.1464 12.8536C12.3417 13.0488 12.6583 13.0488 12.8536 12.8536C13.0488 12.6583 13.0488 12.3417 12.8536 12.1464L8.20711 7.5L12.8536 2.85355Z" fill="currentColor" /> </svg>
                    </div>
                </div>
            </> : ''}























            <div className='container mx-auto mb-6 h-[85vh]' >
                <h2 className="text-gray-900 mb-3 sm:mx-0 mx-6 sm:text-2xl font-semibold uppercase sm:mt-16 mt-8 ">select Shipping address</h2>


                <hr className='' />
                <div className='grid grid-cols-5 sm:mb-0  overscroll-none pb-16 sm:pb-0	'>
                    <div className='md:col-span-3 col-span-5   sm:py-10'>
                        <div className=' px-6 sm:px-0  h-auto flex justify-between bg-white'>
                            {/* {alert ? <ErrorAlert name='error' alert={alert} setalert={setalert} /> : null} */}
                            <div className="lg:w-10/12 md:w-10/12 sm:w-3/4 flex flex-col justify-center w-full mt-8 md:mt-0">
                                {/* <h1 className='text-center text-lg mb-2'>Name/Icon</h1> */}




                                <form className='w-full mt-4'>
                                    <div className='grid grid-cols-6 gap-3 '>
                                        {pay && <h1>pay....</h1>}

                                        {!pay &&
                                            <>

                                                {AddressData?.map((elem, idx) => {
                                                    return <>


                                                        <div className={`sm:col-span-3 col-span-6 shadow-sm py-4 sm:mb-0 mb-2 sm:mt-2 rounded-lg border border-black-500   cursor-pointer hover:bg-gray-100/60  ${clicked[idx] ?
                                                            'bg-gray-100' : ''} `} key={idx}
                                                            onClick={() => {
                                                                onCheckoutClick(elem.title, elem.value.street, elem.value.house, elem.value.city, elem.value.state, elem.value.pin, idx)
                                                                setdisable(clicked[idx] ? true : false)


                                                            }}>
                                                            <div className='flex justify-between'>
                                                                <h1 className="py-1 px-6 font-semibold text-base w-full mt-">{elem.title}</h1>
                                                                {clicked[idx] ? <img src={check} className='h-6 w-6 mr-3 mt-1' alt='selected'></img> : ''}
                                                            </div>
                                                            <hr />
                                                            <div className='px-6 py-2'>
                                                                <p className="w-full mt-">{elem.value.street}</p>
                                                                <p className="w-full mt-1">{elem.value.house}</p>
                                                                <p className="w-full mt-1 ">{elem.value.city}, {elem.value.state}, {elem.value.pin}
                                                                </p>
                                                            </div>


                                                        </div>



                                                    </>
                                                })}

                                                <div className={`sm:col-span-3 col-span-6 shadow-md py-2 sm:mb-0 mb-2 rounded-lg border-2 border-black-500 border-dotted   cursor-pointer hover:bg-gray-100/50 sm:mt-2`}>

                                                    <div className='flex flex-col justify-center items-center sm:py-4 py-6' onClick={() => setaddAddress((prev) => !prev)}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" className='sm:h-1/4 sm:w-1/4 h-1/5 w-1/5 
    text-gray-300 bi bi-plus-lg' fill="currentColor" viewBox="0 0 16 16"> <path fill-rule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z" /> </svg>
                                                        <button className='text-gray-400 font-semibold text-2xl' >Add address</button>
                                                    </div>

                                                </div>
                                            </>}
                                    </div>

                                </form>




















                            </div>


                        </div>



                    </div>

                    <div className='md:col-span-2 col-span-5 px-6  border-l  h-auto  py-10  '>
                        {/* <hr /> */}
                        <div className='flex flex-col justify-between  mt-8 sm:px-6'>
                            <div>




                                <div className='mt-4'>







                                    {cartData?.map((elem) => {
                                        return <>
                                            <div key={elem.id} className={`rounded-md flex w-full pb-4  mt-4 mb-4 border-b p-2  `}>

                                                <div className='mx-2'>
                                                    <img src={`http://68.183.90.227:8080/${elem.image}`} height={'70'} width={'70'} className='p-2' alt='image'></img>
                                                </div>
                                                <div className='w-full pl-2 sm:pl-10'>

                                                    <h1 className='text-base font-normal '>{(elem.title)}</h1>
                                                    {/* <h2>Price:{elem.price}</h2> */}
                                                    <h2 className='text-base font-normal'>{elem.shade}</h2>
                                                    <div className='flex  justify-between'>

                                                        <h2 className='text-base'>Quantity: {elem.quantity}</h2>
                                                        <h1 className='text-base font-medium text-gray-700'><span className='mr-1 text-gray-700'>₹</span>{elem.price}</h1>


                                                    </div>


                                                </div>

                                            </div>
                                        </>

                                    })}
                                </div>
                            </div>

                            <div className='sm:mt-20 mt-16'>




                                <div className='flex justify-between py-2'>
                                    <p className='text-lg'>Subtotal</p>
                                    <p className='text-lg font-medium'>₹ {total}</p>
                                </div>
                                <div className='flex justify-between py-2'>
                                    <p className='text-lg'>Shipping</p>
                                    <p className='text-gray-700 text-lg font-medium'>₹ 50</p>
                                </div>
                                <hr className='mt-2' />
                                <div className='flex justify-between py-4 mt-2'>
                                    <p className='text-xl font-medium'>Total</p>
                                    <h1 className='text-xl font-medium'>₹ {total + 50} </h1>
                                </div>
                                <div className={`flex items-end ${disable ? 'cursor-not-allowed pointer-events-none opacity-60' : ''}`}>

                                    <Btn2 name={!disable ? 'Use this address' : 'Select address'} width=' w-full' height={'h-10'} onClick={() => checkout()} />

                                </div>




                            </div>

                        </div>
                    </div>

                </div>























            </div>

        </>


    )
}

export default Checkout