import React, { useState } from "react";
import Cross from "./Cross";



const Index = ({alert,setalert, name}) => {
    return (
        <div className="absolute w-full ">
        
        <div className="w-96 mx-auto sm:mx-36 md:mx-40 lg:mx-auto bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
  <strong className="font-bold">{name}!</strong>
  {/* <span className="block sm:inline">{name}</span> */}
  <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
    <svg className="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
  </span>
</div>
        
        
        
        </div>
        // <div className="absolute">

        //     <div className="flex items-center justify-center px-4 sm:px-0 ">
        //         <div id="alert" className={alert ? " bg-white transition duration-150 ease-in-out  shadow rounded-md  flex justify-between items-center  top-0 mt-12 mb-8  " : "lg:w-10/12 transition duration-150 ease-in-out  shadow rounded-md  md:flex justify-between items-center  top-0 mt-12 mb-8 py-4 px-4 translate-hidden "}>
        //             <div className="sm:flex items-center">
        //                 <div className="flex items-center">
        //                     <div className="mr-2  sm:mt-0 bg-red-600 p-3 shadow rounded-l-md ">
        //                         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={22} height={22} fill="white">
        //                             <path className="heroicon-ui" d="M12 2a10 10 0 1 1 0 20 10 10 0 0 1 0-20zm0 2a8 8 0 1 0 0 16 8 8 0 0 0 0-16zm0 9a1 1 0 0 1-1-1V8a1 1 0 0 1 2 0v4a1 1 0 0 1-1 1zm0 4a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" />
        //                         </svg>
        //                     </div>
        //                     <p className="pl-2 text-base font-bold ">{name}</p>
        //                 </div>
        //                 {/* <div className="h-1 w-1 bg-yellow-500 rounded-full mr-2 hidden xl:block" />
        //                 <p className="text-base ">{name}</p> */}
        //             </div>
        //             <div className="flex justify-end  md:pl-4 ">
        //                 {/* <span className="text-sm mr-4 font-bold cursor-pointer text-white">Details</span> */}
        //                 <span onClick={() => setalert(false)} className="text-sm cursor-pointer ">
        //                     <Cross/>
                            
        //                 </span>
        //             </div>
        //         </div>
        //     </div>

        //     <style>
        //         {`
        //         .translate-show{
        //             transform : translateY(0%);
        //         }
        //         .translate-hide{
        //             transform : translateY(18vh);
        //         }
        //         `}
        //     </style>
        // </div>
    );
};
export default Index;
