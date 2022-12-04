import React, { useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Cart from "../Buttons/Cart";
import Wish from "../Buttons/Wish";
import { useGlobalContext } from "../CartContext";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { data } from "autoprefixer";
import Slider from "react-slick";
import right from "../../images/right.png";
import left from "../../images/left.png";

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block" }}
      onClick={onClick}
    >
      <img
        className="w-20px] h-[20px] bg-gray-500/10 mt-[-20px]"
        src={right}
        alt=""
      />
    </div>
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block" }}
      onClick={onClick}
    >
      <img className="w-20px] h-[20px] bg-gray-300/20 mt-[-20px]" src={left} alt="" />
    </div>
  );
}

const ProductItem = ({
  title,
  category,
  price,
  id,
  image,
  css,
  textareah,
  colwidth,
  colpadding,
  shades,
  qauntity,
}) => {
  const {
    addToCart,
    addToWishlist,
    getProduct,
    HomeData,
    handleClick,
    setcartActive,
    cartLoading
  } = useGlobalContext();

  const settings = {
    dots: false,
    infinite: false,
    slidesToShow: 3,
    slidesToScroll: 1,

    speed: 500,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };


  const location = useLocation();
  const pathName = location.pathname
  // console.log(pathName)




  const [shade, setshade] = useState()

  const onClick = (shade) => {
    setshade(shade)
    console.log(shade)
  }



  const inputRef = useRef(null);

  const handleeClick = () => {
    // 👇️ access input value
    setshade(inputRef.current.value)
    console.log(inputRef.current.value, 'value');
    console.log(shade, 'shade');
  }

  return (

/* <div class="border h-80 shadow rounded-md p-4  w-1/4 ">
                                                            <div class="animate-pulse  space-x-4 w-full mx-auto">
                                                                <div class=" bg-slate-300 h-40 w-full mx-auto"></div>
                                                                <div class="flex-1 space-y-6 ml-0 py-1 mx-auto mt-6">
                                                                    <div class="h-2 bg-slate-300 rounded "></div>
                                                                    <div class="space-y-3">
                                                                        <div class="grid grid-cols-3 gap-4">
                                                                            <div class="h-2 bg-slate-300 rounded col-span-2"></div>
                                                                            <div class="h-2 bg-slate-300 rounded col-span-1"></div>
                                                                        </div>
                                                                        <div class="h-2 bg-slate-300 rounded"></div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                         */
    <>
      <div
        className={`${css} ${colwidth} lg:w-1/4 md:w-1/3 sm:w-2/4 w-full group`}
        // initial={{ opacity: 0, scale: 0, y: 200 }}
        // animate={{ opacity: 1, scale: 1, y: 0 }}
        // transition={{ duration: 0.5, type: "spring" }}
      >
        <div
          className={`md:h-full  border-2 p-4 ${colpadding} border-gray-200  border-opacity-60 rounded-2xl overflow-hidden bg-blend-lighten  hover:shadow-md  transition-all ease-out`}
        >
          <Link to={pathName.includes('/') ? "/details" : '/details'}>

            <img
              className=" max-h-64 lg:h-48 md:h-36 sm:h-36 h-56 w-full object-contain px-4 py-2  mb-6 object-center hover:scale-105 transition-transform"
              src={`${image}`}
              alt="product image"
              onClick={() => handleClick(id) + window.scrollTo(0, 0)}
            />
          </Link>

          <div className={textareah} >
            <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
              {category}
            </h3>
            <Link to={pathName.includes('/') ? ('/details') : ('/details')} onClick={() => handleClick(id) + window.scrollTo(0, 0)}>
              <h1 className="text-base font-medium text-gray-600  h-20 hover:text-blue-600">
                {title.slice(0,57)} {title?.length >= 57 ? '...':''}
              </h1>
            </Link>

            
              
                <h2 className="title-font text-md  font-medium text-gray-600 mb-3">
                  ₹{price}
                </h2>
            
          </div>
          <div className="flex items-center flex-wrap  justify-between">
            <Link to={pathName.includes('/') ? ('/details') : ('/details')}>
              <div onClick={() => handleClick(id) + window.scrollTo(0, 0)}>
                <a
                  className=" text-indigo-500 inline-flex items-center md:mb-2 lg:mb-0
                              hover:scale-105"
                >
                  Buy Now
                  <svg
                    className="w-4 h-4 ml-2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14"></path>
                    <path d="M12 5l7 7-7 7"></path>
                  </svg>
                </a>
              </div>
            </Link>

            <div>

              <Cart
                css={"w-7 h-7 hover:scale-105"}
                onClick={() => {
                  addToCart(id, title, shades, qauntity, price,image)
                  setcartActive(true);
                }}
                svgcss={"w-4 h-4"}
              />

              <Wish
                css={"w-7 h-7 ml-2 hover:scale-105"}
                onClick={() =>
                  addToWishlist(id, title, shades, qauntity, price,image)
                }
                svgcss={"w-4 h-4"}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductItem;
