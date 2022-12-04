import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';

import { useGlobalContext } from '../CartContext';
import ProductItem from './ProductItem';

const Item3 = () => {

  const { data, addToCart, addToWishlist , HomeData} = useGlobalContext();



  const [isHovering, setIsHovering] = useState(false);
  const [cartDisplayed, setcartDisplayed] = useState(false)

  const handleMouseOver = () => {
    setIsHovering(true);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
  };

  useEffect(() => {
    if (cartDisplayed) {
      document.body.style.overflow = "hidden !important";
    } else {
      document.body.style.overflow = "scroll !important";
    }
  }, [cartDisplayed])
  console.log(data);

  
  return (
    <>
      <section className="text-gray-600 body-font sm:mb-0 mb-16">
        <div className="container  py-10 mx-auto">
          {/* <div className='flex justify-between '>
           <h1>Category</h1>
         <Link to={'/explore'}> <h1>See all</h1></Link>
          </div> */}
          <div className="flex flex-wrap md:-m-4">

            {HomeData?.slice(0,8).map(elem => {
              // console.log("hi")z
              // console.log(elem.shades,"elem shades")
            // });((elem) => {
              // {elem.images.map((img)=>{

              // elem.images
              return <>
              <ProductItem css={'p-4'}  textareah={'h-36'} title={elem.title} id={elem.id} price={elem.price} category={elem.category}
               image={elem.image} quantity={1}   />
              {/* {console.log(imamges)} */}
              </> 
            })}
          {/* })} */}



          </div>
        </div>
      </section>
    </>
  )
}

export default Item3