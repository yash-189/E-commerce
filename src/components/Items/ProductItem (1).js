import React, { useRef } from "react";
import { Link } from "react-router-dom";
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

  return (
    <>
      <motion.div
        className={`${css} ${colwidth} group`}
        initial={{ opacity: 0, scale: 0, y: 200 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, type: "spring" }}
      >
        <div
          className={`md:h-full  border-2 ${colpadding} border-gray-200  border-opacity-60 rounded-2xl overflow-hidden bg-blend-lighten  hover:shadow-sm  transition-all ease-out`}
        >
          <Link to={pathName.includes('/m')?('/m/checkout'):('/checkout')}>

            <img
              className="lg:h-64 md:h-36 sm:h-36 h-72 w-full object-contain px-4 py-2  mb-2 object-center hover:scale-105 transition-transform"
              src={`http://68.183.90.227:8080/${image}`}
              alt="blog"
              onClick={() => handleClick(id) + window.scrollTo(0, 0)}
            />
          </Link>

          <div className={textareah}>
            <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
              {category}
            </h3>
            <Link to={pathName.includes('/m')?('/m/details'):('/details')}>
              <h1 className="title-font text-lg font-medium text-gray-900 mb-3 h-14 hover:text-blue-600">
                {title.slice(0, 40)}...
              </h1>
            </Link>

            {price ? (
              <>
                {" "}
                <h2 className="title-font text-md  font-medium text-gray-600 mb-3">
                  ₹{price}
                </h2>
              </>
            ) : (
              <>
                <div className=" flex flex-row justify-between  items-center ">
                  <div>
                    <h2 className="title-font text-md  font-medium text-gray-600 mb-3 pt-3">
                      ₹{shades[0].price}
                    </h2>
                  </div>
                  <div className=" w-[100px]  ">
                    <Slider {...settings}>
                      {
                        shades.map((show) => {
                          return (
                            <>
                              <button
                                style={{ backgroundColor: `${show.code}` }}
                                className={`border-2 border-gray-300 ml-1 rounded-full w-6 h-6 focus:outline-none`}
                              ></button>
                            </>
                          );
                        })



                      }





                    </Slider>
                    {/* {


                      shades.length>2 ?<>

                       <Slider {...settings}>
                       
             
                  {shades.map((show) => {
                   
                      return (
                      <>
                      
                        <button style={{backgroundColor:`${show.code}`}}
                          className={`border-2 border-gray-300 ml-1 rounded-full w-6 h-6 focus:outline-none`}
                        ></button>
                    
                      
                      </>
                      );
                  
                  })}
                    </Slider>
                      </>:
                      
                      
                      <>
                        {shades.map((show) => {
                   
                   return (
                   <>
                   
                     <button style={{backgroundColor:`${show.code}`}}
                       className={`border-2 border-gray-300 ml-1 rounded-full w-6 h-6 focus:outline-none`}
                     ></button>
                 
                   
                   </>
                   );
               
               })}
                      </>


} */}
                  </div>
                </div>
              </>
            )}
          </div>
          <div className="flex items-center flex-wrap  justify-between">
          <Link to={pathName.includes('/m')?('/m/details'):('/details')}>
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
                  addToCart(id, title, shades, qauntity, price);
                  setcartActive(true);
                }}
                svgcss={"w-4 h-4"}
              />

              <Wish
                css={"w-7 h-7 ml-2 hover:scale-105"}
                onClick={() =>
                  addToWishlist(id, title, shades, qauntity, price)
                }
                svgcss={"w-4 h-4"}
              />
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default ProductItem;
