import React, { useState, useEffect, useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Btn from './Btn'
import Btn2 from './Btn2'
import Btn3 from './Btn3'
import Wish from './Buttons/Wish'
import { useGlobalContext } from './CartContext'
import Item3 from './Items/Item3'
import Loader from './Loader'
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import Mloader from './mobile/Mloader'


const Details = () => {
    const { product, data, loading, SearchDataApi, productData, isLoading, addToCart, addToWishlist,handleClick,available,buynowbutton, setavailable, checkProduct,checkShade ,wishLoading, wishlistdata,checkwishlist,alreadyWishlist,addedtowishlist} = useGlobalContext();
    //  const {title, image, price, description, category} = product;
    console.log(product);
    console.log(productData);
    // console.log(data);


    const [Dta, setDta] = useState([])




    const Pid = localStorage.getItem("Pid");
    console.log(Pid)


    useEffect(() => {
        setDta(product)
        console.log(Dta);


    }, [product])

    const { id, title, qauntity } = productData


    const [image, setimage] = useState((productData?.color?.availability===true)?(productData?.color?.shades[0].image):(productData.images))

    const [price, setprice] = useState((productData?.color?.availability===true)?(productData?.color?.shades[0].price):(productData.price))
    const [shades, setshades] = useState((productData?.color?.availability===true)?(productData?.color?.shades[0].name):'')
    // const [Pid, setPid] = useState(id)
    const previousValue = useRef(null);
    // console.log(shades);



    useEffect(() => {
        setimage((productData?.color?.availability===true)?(productData?.color?.shades[0].image):(productData.images))
        setprice((productData?.color?.availability===true)?(productData?.color?.shades[0].price):(productData.price))
        setshades((productData?.color?.availability===true)?(productData?.color?.shades[0].name):'')
        // setPid(productData.id)
        // setavailable(false)

    }, [productData])


    useEffect(() => {
       handleClick(Pid)

    }, [])
    


    // useEffect(() => {
    //     if (Pid=='') {
    //         console.log('null pid');
    //         console.log(Pid);
            
    //     handleClick(previousValue)
    //     } else {
    //         console.log('null else');
    //         console.log(Pid);
    //         console.log(previousValue);
            
    //     handleClick(previousValue)
    //     }

    // }, [])
    

    const navigate = useNavigate();

    const [open, setOpen] = useState(false);
    useEffect(() => {
        setTimeout(() => {
            setOpen(false)
        }, 100);

    }, [open])



    useEffect(() => {
        checkShade(id,shades)
        console.log('shade fun');
    }, [productData,shades])


    useEffect(() => {
        checkwishlist(id,shades)
        console.log('samwwwwwwwwwwwwwww');
    }, [productData,shades])

    const location = useLocation();
  const pathName =location.pathname
    

  const [added, setadded] = useState(false)


//   const checkWishlistProduct = ()=>{
    
//     if (wishlistdata?.some(pid => pid.id == Pid)) {
//         console.log(Pid,'saggggggggggggggggggg')

//   }
// }

// console.log(wishlistdata);
// useEffect(() => {
//  checkWishlistProduct()
//  console.log(productData,Pid,'sameeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee')
// }, [])


    return (
        <>
            <section className="text-gray-600 body-font overflow-hidden ">
                <div className="container sm:px-5 px-3 sm:py-24 py-10 mx-auto">
                {isLoading &&
                                    <div className={`flex justify-center items-center w-full h-full  shadow-md bg-[#00000080] top-0 left-0 fixed  z-40 `} >

                                        <Loader /></div>
                                }

                    <div className="lg:w-5/6 mx-auto flex flex-wrap items-center justify-between">

                        {/* {productData?.map((elem) => { */}
                        {/* return <> */}
                        <img alt="ecommerce" className="lg:w-1/3 w-full lg:h-[30rem] h-64 object-contain object-center rounded mt-10 sm:mt-0" src={`${productData?.image}`} />
                        <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                            <h2 className="text-sm title-font text-gray-500 tracking-widest">{productData?.category}</h2>
                            <h1 className="text-gray-900 sm:text-3xl text-xl title-font font-medium mb-1">{productData?.title}</h1>
                            <div className="flex mb-4">
                                <span className="flex items-center">
                                    <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-indigo-500" viewBox="0 0 24 24">
                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                    </svg>
                                    <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-indigo-500" viewBox="0 0 24 24">
                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                    </svg>
                                    <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-indigo-500" viewBox="0 0 24 24">
                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                    </svg>
                                    <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-indigo-500" viewBox="0 0 24 24">
                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                    </svg>
                                    <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-indigo-500" viewBox="0 0 24 24">
                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                    </svg>
                                    <span className="text-gray-600 ml-3">{productData?.rating?.count} Reviews</span>
                                </span>

                            </div>
                            <p className="sm:leading-relaxed text-base ">{productData?.description}</p>
                            <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
                                {productData?.color?.availability === true ?
                                    <div className="flex">

                                        <span className="mr-3">Color</span>
                                        {productData?.color?.shades.map((elem, index) => {
                                            console.log(elem.code);
                                            return <>
                                                <button className={`border-2  ml-1 rounded-full w-6 h-6 focus:outline-none`} onClick={() => {
                                                    setprice(elem.price)
                                                    setshades(elem.name)
                                                    setimage(elem.image[0])
                                                 
                                                }} style={{ backgroundColor: `  ${elem.code[0]==='#'?'':'#'
                                            }${elem.code}` }}> </button>
                                            </>
                                        })}

                                    </div> : ''}

                            </div>
                            <div className="flex ">
                                <span className=" title-font font-medium sm:text-2xl text-xl text-gray-900">
                                    ₹{price}</span>



                                    {available?
                                    
                                     <Btn2 name={'Added'} height={''} css={'sm:px-4 px-2 ml-auto'} width={''} onClick={() => {
                                    { addToCart(id, title, shades, qauntity, price,productData?.image) }
                                    setOpen(true)
                                }} />
                                
                                
                                
                                :
                                <Btn2 name={'Add to cart'} height={''} css={'sm:px-4 px-2 ml-auto'} width={''} onClick={() => {
                                    { addToCart(id, title, shades, qauntity, price,productData?.image) }
                                    setOpen(true)
                                }} />


                            }
                                <Btn3 name={'Buy Now'} width={''} css={'sm:px-4 px-2 sm:ml-4 ml-2'} onClick={() => {
                                    buynowbutton(id, title, shades, qauntity, price,productData?.image)
                                    // navigate(pathName=='/details'?'/cart':'/cart')
                                }} />
                                {addedtowishlist?
                                
                                <Wish css={`sm:ml-4 sm:w-10 w-10 h-10 sm:h-10 py-2 sm:px-2 px-1 ml-1 text-[#8093f1]`} onClick={() => addToWishlist(id, title, shades, qauntity, price,productData?.image) + setadded(prev=>!prev)} svgcss={'"sm:w-6 w-5 h-5 sm:h-6"'} />
                                :
                                <Wish css={`sm:ml-4 sm:w-10 w-10 h-10 sm:h-10 py-2 sm:px-2 px-1  ml-1  text-gray-500`} onClick={() => addToWishlist(id, title, shades, qauntity, price,productData?.image) + setadded(prev=>!prev)} svgcss={'"sm:w-6 w-5 h-5 sm:h-6"'} />
                            }

                               
                            </div>
                        </div>
                        {/* </>
                        })} */}
                        {/* <Popup className='w-60' open={open} closeOnDocumentClick >
                            <h1 className='w-full'>Loading</h1>
                        </Popup> */}
                        {/* {isLoading && <Mloader name={'Add'}/>}
                        {wishLoading && <Mloader name={'Add'}/>} */}

                    </div>
                </div>
            </section>

            <section className=' mt-10'>
                <h2 className=" text-center title-font sm:text-4xl text-3xl sm:mb-4 my-2 font-medium text-gray-700 ">Explore More</h2>
                <div className='px-20'><hr /></div>
                <Item3 />

            </section>

        </>




    )
}

export default Details