import React,{useEffect, useState} from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuthContext } from "./AuthContext";
import { useGlobalContext } from "./CartContext";

export const ProtectedRoute = ({ children }) => {

    const {decode, pathName, auth, user} = useGlobalContext()

const isLogged =     localStorage.getItem("logged") || false
console.log(isLogged);

// useEffect(() => {
//   first

//   return () => {
//     second
//   }
// }, [third])



// console.log(user);


const location = useLocation()

    if (!isLogged) {
        // user is not authenticated
       
            return <Navigate to="/login" state={{path: location.pathname}} />;

        
    }



    // if (decode.type==='guest') {
    //     // user is not authenticated
    //     if(pathName.includes('/')){
    //         return <Navigate to="/login" />;
    //     }else{
    //         return <Navigate to="/login" />;

    //     }
    // }
    return children;
};