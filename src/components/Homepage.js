import React, { useEffect } from 'react'
import { useAuthContext } from './AuthContext'
import { useGlobalContext } from './CartContext'
import Item1 from './Items/Item1'
import Item2 from './Items/Item2'
import Item3 from './Items/Item3'
import Item5 from './Items/Item5'
import Mloader from './mobile/Mloader'
import MainSlider from './Sliders/MainSlider'

const Homepage = () => {

  const { refreshPage } = useAuthContext()
  const { pathName, cartLoading, wishLoading, removeLoading } = useGlobalContext()




  // useEffect(() => {



  //   refreshPage()

  // }, [])





  return (
    <>
    {/* {removeLoading && <div className={`flex justify-center items-center w-full h-full  shadow-md bg-[#00000080] top-0 left-0 fixed  z-40 `} >
        <Mloader name={'Removing...'} />
      </div>
      } */}
      {wishLoading && <div className={`flex justify-center items-center w-full h-full  shadow-md bg-[#00000080] top-0 left-0 fixed  z-40 `} >
        <Mloader  />
      </div>
      }
      {cartLoading && <div className={`flex justify-center items-center w-full h-full  shadow-md bg-[#00000080] top-0 left-0 fixed  z-40 `} >
        <Mloader  />
      </div>
      }

      
      <MainSlider />

      <Item3 />
      <Item1 />

      <Item2 />
      <Item5 />
    </>
  )
}

export default Homepage