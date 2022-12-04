import React from 'react'
import { useGlobalContext } from '../CartContext'
import ProductItem from './ProductItem'

const Item5 = () => {

    const {HomeData} = useGlobalContext()





  return (
    <>
     <section className="text-gray-600 body-font sm:mb-0 mb-16">
        <div className="container px-5 py-10 mx-auto">
          {/* <div className='flex justify-between '>
           <h1>Category</h1>
         <Link to={'/explore'}> <h1>See all</h1></Link>
          </div> */}
          <div className="flex flex-wrap -m-4">

            {HomeData?.slice(8,16).map(elem => {
              // alert("hi")
              // console.log(elem.shades,"heloo")
              
            // });((elem) => {
              // {elem.images.map((img)=>{

              // elem.images
              return <>
              <ProductItem css={'p-4'} colpadding={'p-8'} colwidth={'lg:w-1/4 sm:w-2/4 w-full'} textareah={'h-36'} title={elem.title} id={elem.id} price={elem.price} category={elem.category} image={elem.image} quantity={1} shades={elem.shades}  />
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

export default Item5