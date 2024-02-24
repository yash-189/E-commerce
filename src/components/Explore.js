import React, { useState, useEffect } from 'react'
import { useGlobalContext } from './CartContext';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import ProductItem from './Items/ProductItem';
import Loader from './Loader';

const Explore = () => {
    const { data, setdata, addToCart, addToWishlist, getProduct, searchData, SearchDataApi, menuData, isLoading, cartLoading, ExploreData } = useGlobalContext();

    const [filteredData, setfilteredData] = useState([])

    // console.log(SearchDataApi);

    useEffect(() => {






        setfilteredData(ExploreData)
        // console.log(filteredData);


    }, [ExploreData])


    const Navigate = useNavigate()
    const [active, setactive] = useState(1)



    const filterByPrice = (value) => {
        if (value == 'LowToHigh') {
            const numAscending = [...filteredData].sort((a, b) => (a.shades ? a.shades[0].price : a.price) - (b.shades ? b.shades[0].price : b.price));
            console.log(numAscending);
            setactive(2)

            setfilteredData(numAscending, 'filterrrrrrrrrrrrrrrrrrrrrrrrrrrrrr')
            console.log(value);
        }
        if (value == 'HightoLow') {
            const HighToLow = [...filteredData].sort((a, b) => (b.shades ? b.shades[0].price : b.price) - (a.shades ? a.shades[0].price : a.price));
            setactive(3)

            console.log(HighToLow);
            setfilteredData(HighToLow)
            console.log(value);
        }
        return ExploreData;

    }
    // console.log(menuData);




    const [num, setnum] = useState(2)


    return (
        <>
            <section className=" body-font mt-4  pt-20 sm:pt-0 sm:mb-0 mb-16">
                <div className='grid grid-cols-5'>
                    <div className='col-span-1 shadow-sm border ml-2 py-4 px-6 sm:block hidden rounded'>
                        <div className=' flex px-5 mb-1'>
                            <h2 className="text-gray-900 mb-3 sm:mx-0 mx-6 sm:text-2xl    ">Filters</h2>
                        </div>
                        <hr />

                        <div className='  flex  container px-5 mb-3 mx-auto'>
                            <div className='py-2  flex flex-col justify-end mr-4'>
                                <h1 className='text-sm font-medium uppercase mb-3'>category</h1>
                                <div className='ml-4 flex flex-col'>
                                    <button className='text-sm mb-2'>category1 </button>
                                    <button className='text-sm' >category2</button>
                                </div>
                            </div>
                        </div>
                        <div className='  flex  container px-5 mb-3 mx-auto'>
                            <div className='py-2  flex flex-col justify-end mr-4'>
                                <h1 className='text-sm font-medium uppercase mb-3'>brands</h1>
                                <div className='ml-4 flex flex-col'>
                                    <button className='text-sm mb-2' >brand1 </button>
                                    <button className='text-sm' >brand2</button>
                                </div>
                            </div>
                        </div>

                        {/* <div className='  flex  container px-5 mx-auto'>
                            <div className='py-2  flex flex-col justify-end mr-4'>
                                <h1 className='text-base uppercase mb-3'>Sort by</h1>
                                <div className='ml-4 flex flex-col'>
                                <button className='text-sm mb-2' onClick={() => filterByPrice('LowToHigh')}>Low To High </button>
                                <button className='text-sm' onClick={() => filterByPrice('HightoLow')}>High to Low</button>
                                </div>
                            </div>
                        </div> */}





                    </div>

                    <div className='sm:col-span-4 w col-span-5 sm:shadow-sm sm:border sm:rounded mx-2'>


                        <div className=''>
                            <div className="container px-5 sm:py-10 py-5  mx-auto ">
                                {isLoading &&
                                    <div className={`flex justify-center items-center w-full h-full  shadow-md bg-[#00000080] top-0 left-0 fixed  z-40 `} >

                                        <Loader /></div>
                                }

                                {
                                    <>

                                        <h2 className="text-gray-900 sm:text-start text-center mb-3 sm:mx-0 mx-6 sm:text-2xl  text-2xl  ">Trending</h2>




                                        <div class=" md:overflow-x-hidden   overflow-x-scroll md:block md:w-auto" >

                                            <ul class="flex w-[38rem] md:w-auto md:overflow-x-hidden overflow-x-scroll sm:flex-col py-4 ml-1 p sm:mt-4  sm:rounded-lg sm:border sm:border-gray-100 md:flex-row justify-evenly md:justify-start md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 bg-white md:dark:bg-gray-900 ">

                                                <li>
                                                    <h1 class="block py-2 pr-4 sm:pl-3  rounded md:bg-transparent md:p-0 " > Sort By</h1>
                                                </li>
                                                <li>
                                                    <a href="#" class={`block py-2 pr-2 pl-1 ${active == 1 ? 'text-indigo-500' : 'md:text-gray-700 text-gray-400'} rounded hover:bg-white md:hover:bg-transparent md:border-0 md:hover:text-indigo-500 md:p-0   md:dark:hover:bg-transparent active:text-indigo-500`} onClick={() => filterByPrice('Popularity')}>Popularity</a>
                                                </li>
                                                <li>
                                                    <a href="#" class={`block py-2 pr-2 pl-1 ${active == 2 ? 'text-indigo-500' : 'md:text-gray-700 text-gray-400'} rounded hover:bg-white md:hover:bg-transparent md:border-0 md:hover:text-indigo-500 md:p-0   md:dark:hover:bg-transparent active:text-indigo-500`} onClick={() => filterByPrice('LowToHigh')}>Price -- Low To High</a>
                                                </li>
                                                <li>
                                                    <a href="#" class={`block py-2 pr-2 pl-1 ${active == 3 ? 'text-indigo-500' : 'md:text-gray-700 text-gray-400'} rounded hover:bg-white md:hover:bg-transparent md:border-0 md:hover:text-indigo-500 md:p-0   md:dark:hover:bg-transparent active:text-indigo-500`} onClick={() => filterByPrice('HightoLow')}>Price -- High to Low</a>
                                                </li>
                                                <li>
                                                    <a href="#" class={`block py-2 pr-2 pl-1 ${active == 4 ? 'text-indigo-500' : 'md:text-gray-700 text-gray-400'} rounded hover:bg-white md:hover:bg-transparent md:border-0 md:hover:text-indigo-500 md:p-0   md:dark:hover:bg-transparent active:text-indigo-500`} onClick={() => filterByPrice('Newest')}>Newest First</a>
                                                </li>

                                            </ul>
                                        </div>

                                        <hr className='' />
                                        <br />
                                        <div className=" flex flex-wrap sm:justify-center w-full justify-center ">
                                            {isLoading &&
                                                <div className='h-screen'>   <Loader /></div>
                                            }
                                            {!isLoading && filteredData?.map((elem) => {
                                                return <ProductItem colpadding={'py-8 px-4'} css={"m-2"} title={elem.title}
                                                    id={elem.id}






                                                    shades={elem.shades}







                                                    price={elem.price} category={elem.category} image={elem.image}
                                                    colwidth={' xl:w-[23.5%] lg:w-[22%] md:w-1/4 sm:w-2/4 w-full'} textareah={'h-40'}
                                                />


                                            })
                                            }
                                        </div>
                                    </>


                                }


                            </div>
                        </div>
                    </div>

                </div>



            </section >

        </>
    )
}

export default Explore