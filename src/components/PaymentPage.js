import axios from 'axios';
import { useCallback, useEffect, useState } from "react";
import useRazorpay from "react-razorpay";
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from './AuthContext';
import Btn2 from './Btn2';
import { useGlobalContext } from './CartContext';
import logo from '../images/wakemakeup.png'
import Gateway from './Gateway';
import codImage from '../images/cod.png'
import rImage from '../images/rz.svg'


const PaymentPage = () => {
    const { token, first, AddressData, AddressDetail, pathName } = useAuthContext()
    const { getCartData } = useGlobalContext()
    console.log(first);
    console.log(AddressData);

    // const navigate = useNavigate()

    const cod = () => {




        axios.post('http://68.183.90.227:8080/checkout/payment/offline', { 'token': token })
            //  console.log(addcart)
            .then((res) => {
                console.log(res);
                if (pathName.includes('/')) {
                    navigate('/success')
                } else {
                    navigate('/success')

                }



            })
            .catch((err) => {
                console.log(err);
            })
    }

    const [currentRadioValue, setCurrentRadioValue] = useState()

    const handleRadioChange = (e) => {
        setCurrentRadioValue(e.target.value);
        console.log(currentRadioValue);
    };









    const Razorpay = useRazorpay();

    const navigate = useNavigate()

    const [resFromRazor, setResFromRazor] = useState("");
    const [double, setDouble] = useState(false);

    const [isLoading, setIsLoading] = useState(false);






    const handlePayment = useCallback(async () => {


        let order;
        setDouble(true);
        setTimeout(() => {
            setDouble(false);
        }, 10000);

        const OrderUserDetails = JSON.parse(localStorage.getItem("user"));
        console.log(OrderUserDetails.name, "order user details");
        // alert("user order");

        setIsLoading(false);

        await axios
            .post("http://68.183.90.227:8080/checkout/payment/online/order", {

                payment: {
                    "receipt": 1,
                    "title": AddressDetail.title
                },
                token: token

            })

            .then((res) => {
                console.log(res, "create order api");
                // console.log(res.data.order.id, "order id");
                // console.log(res.data.status, "order with status");
                // setIsLoading(true);

                order = res.data.order.id;
                if (res.data.status == false) {
                    alert("failed ");
                } else {
                    console.log("pass");

                    const options = {
                        key: "rzp_test_MEUQ82ejpdGjUU",
                        amount: "",
                        currency: "INR",
                        name: 'WakeupMakeup',
                        description: "Online transaction",
                        image: logo, // logo
                        order_id: order,

                        prefill: {
                            name: first.firstname + first.lastname,
                            email: first.email,
                            contact: "9999999999",
                        },
                        notes: {
                            address: "Razorpay Corporate Office", // address
                        },
                        theme: {
                            color: "#90a0ec",
                        },

                        handler: (res) => {
                            // console.log(res,"res from razor");
                            setResFromRazor(res);

                            axios
                                .post("http://68.183.90.227:8080/checkout/payment/online/verify", {
                                    response: res,
                                    token: token

                                    //   name: OrderUserDetails.name,
                                    //   email: OrderUserDetails.email,
                                })
                                .then((res) => {
                                    console.log(res, "send verify");
                                    // console.log(res.data, "send for verify");
                                    // alert("send for verify");
                                    console.log(res.data.status);
                                    if (pathName.includes('/')) {
                                        navigate('/success')
                                    } else {
                                        navigate('/success')

                                    }







                                })
                                .catch((err) => {
                                    console.log(err, "this is error order");
                                });
                        },
                    };

                    console.log(options);

                    const rzpay = new Razorpay(options);
                    rzpay.open();
                }
            })
            .catch((err) => {
                console.log(err, "this is error order");
            });

        // console.log(OrderUserDetails.username, "username order time");

        //console.log(id_pay,"id_pay")
    }, [Razorpay]);

    console.log(resFromRazor, "res usest");


    // const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    //   resFromRazor;














    const onClick = (value) => {
        if (value == 'offline') {
            setdisable(true)

            cod()
            setclick(2)
            console.log('cod');
        } else {
            setdisable(true)

            handlePayment();
            setclick(1)
            console.log('online');
        }
    }

    const [click, setclick] = useState(0)
    const [disable, setdisable] = useState(false)

    const [alert, setalert] = useState(false)





    const { cartData } = useGlobalContext()
    const total = cartData.reduce((acc, item) => acc + item.quantity * item.price, 0)
    console.log(total)



    return (
        <div className='container mx-auto mb-6 h-[85vh]' >
 <h2 className="text-gray-900 mb-3  sm:text-2xl font-semibold uppercase sm:mt-16 mt-8 mx-6 sm:mx-0">Select payment Method</h2>
                            <hr/>
            <div className='grid grid-cols-5 h-full  sm:mb-0'>
                <div className='md:col-span-3 col-span-5 py-10'>
                    <div className='   sm:h-full h-auto flex justify-between  bg-white'>
                        <div className="lg:w-10/12 md:w-10/12 sm:w-3/4 flex flex-col items-start  justify-center w-full sm:mb-40  md:mt-0">
                           


                            <div className='py-4 mx-2 sm:mx-0'>
                                <div className={` border border-white flex sm:justify-center sm:items-center py-2 px-4 rounded-md  `}>
                                    <input className='cursor-pointer'
                                        id="radio-item-1"
                                        name="radio-item-1"
                                        type="radio"
                                        value="online"
                                        onChange={handleRadioChange}
                                        checked={currentRadioValue === 'online'}
                                    />
                                    <label htmlFor="radio-item-1" className='sm:text-xl px-2 flex  py-2 font-medium justify-center items-center cursor-pointer'>
                                    <img src={rImage} className='mx-2 h-10 w-16' alt='image'></img>
                                    Payment Gateway</label>

                                </div>
                                <div className={`  border border-white flex sm:justify-center sm:items-center py-2 px-4 rounded-md  `}>
                                    
                                    <input
                                        className='cursor-pointer'
                                        id="radio-item-2"
                                        name="radio-item-2"
                                        type="radio"
                                        value="offline"
                                        onChange={handleRadioChange}
                                        checked={currentRadioValue === 'offline'}
                                    />
                                    <label htmlFor="radio-item-2" className='sm:text-xl px-2 flex  py-2 font-medium justify-center items-center cursor-pointer '>
                                    <img src={codImage} className='mx-2 h-10 w-16' alt='image'></img>
                                        Cash on delivery
                                    </label>
                                </div>


                            </div>


                            {/* <div className='flex w-full'>

                                <div className={`w-2/5 mr-2 shadow-sm py-2 sm:mb-0 mb-2 rounded-lg border-2 border-black-500   cursor-pointer hover:bg-gray-100 ${click==1?'bg-gray-400':''}`}>
                                    <div className='my-4  text-center' >
                                        
                                       <button onClick={()=>onClick('online') }>Payment Gateway</button>

                                    </div>

                                </div>

                                <div className={`w-2/5 shadow-md py-2 sm:mb-0 mb-2 rounded-lg border-2 border-black-500   cursor-pointer hover:bg-gray-100 ${click==2?'bg-gray-400':''} `}>
                                    <div className='my-4 text-center' >
                                          
                                    <button onClick={()=>onClick('offline')}>Cash on Delivery</button>
                                    </div>
                                </div>
                            </div> */}

                            {/* <div className='mt-10'>
                               
                                <Btn2 name='Checkout' width='w-24' height={'h-10'} onClick={() => onClick(currentRadioValue)} />

                            </div> */}




                        </div>


                    </div>



                </div>
                <div className='md:col-span-2 col-span-5 px-6 sm:px-6  border-l py-10 h-full'>
                    <h4 className='mb-4 sm:text-lg font-semibold sm:mt-10 uppercase'>Order Summary</h4>
                    <hr className='mb-2' />
                    <div className=''>
                        {cartData?.map((elem) => {
                            return <div className='py-2 '>
                                <h4>{elem.quantity} × {elem.title} {elem.shade ? '(' : ''} {elem.shade} {elem.shade ? ')' : ''}</h4>
                                {/* <h5>COLOR</h5> */}
                            </div>
                        })}




                    </div>
                    <hr className='mt-4' />


                    <div className='mt-2'>




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
                        {/* <div className={`flex items-end ${disable ? 'cursor-not-allowed pointer-events-none opacity-60' : ''}`}>

                            <Btn2 name='Proceed' width='sm:w-20 w-full' height={'h-10'} onClick={() => checkout()} />

                        </div> */}


                        {/* <div className={`mt-6 `}> */}
                        <div className={`mt-6 relative cursor-pointer`} onMouseOver={() => currentRadioValue == null ? setalert(true) : ''} onMouseOut={() => setalert(false)}>


                            <Btn2 name='Place your order ' css={currentRadioValue == null ? 'cursor-not-allowed pointer-events-none opacity-60' : ''} width=' w-full ' height={'h-10'} onClick={() => onClick(currentRadioValue)} />
                            {alert && <div className=' absolute -top-8 sm:left-[25%] left-[15%]  bg-gray-100 py-2 px-3 rounded-xl'>
                                <p>
                                    Please choose payment method!
                                </p>
                            </div>
                            }
                        </div>




                    </div>


                </div>
            </div>



        </div>
    )
}

export default PaymentPage