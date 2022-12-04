import React, { createContext, useContext, useReducer, useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from "react-router-dom";
import Cookies from 'universal-cookie'
import { useGlobalContext } from './CartContext';

const cookies = new Cookies();

const AuthContext = createContext();

const AContext = ({ children }) => {

    const { getCartData } = useGlobalContext()

    const location = useLocation();
    const pathName = location.pathname















    

    // const token = localStorage.getItem("token");
    // console.log(token);


    // useEffect(() => {
    //     const token = localStorage.getItem("token");
    //     console.log(token);
    // }, [third])





    const [decode, setdecode] = useState({})



    // const decodeToken = () => {
    //   // Define the string
    //   const encodedStringAtoB = token;

    //   const string = encodedStringAtoB?.split('.');
    //   const newString = string[1]
    //   console.log(string[1]);

    //   // Decode the String
    //   const decoded = atob(newString);
    //   setdecode(decode)

    //   console.log(decoded, "decodwe");
    //   return decoded
    // }





    // useEffect(() => {


    //   const checkAuth = decodeToken()

    //   const parsedCheckAuth = JSON.parse(checkAuth)

    //   console.log(parsedCheckAuth);
    //   setdecode(parsedCheckAuth)


    // }, [])

    // console.log(decode);






    const [logged, setlogged] = useState(false)







    const gettoken = async () => {

        if (token === null) {

            console.log('null');

            await axios.post('http://68.183.90.227:8080/')
                .then((res) => {
                    console.log(res);
                    const token = res.data.token

                    // const decodeToken = () => {
                    //     // Define the string
                    //     const encodedStringAtoB = token;

                    //     const string = encodedStringAtoB?.split('.');
                    //     const newString = string[1]
                    //     console.log(string[1]);

                    //     // Decode the String
                    //     const decoded = atob(newString);
                    //     setdecode(decode)

                    //     console.log(decoded, "decodwe");
                    //     return decoded
                    // }

                    // const checkAuth = decodeToken()

                    // const parsedCheckAuth = JSON.parse(checkAuth)

                    // console.log(parsedCheckAuth);
                    // setdecode(parsedCheckAuth)




                    localStorage.setItem('token', token);
                })
                .catch((err) => {
                    console.log(err);
                })
        }



        console.log(decode);

    }








    useEffect(() => {


        gettoken()


    }, [])


    const token = localStorage.getItem("token");
    console.log(token);



















    const navigate = useNavigate();






    const [first, setfirst] = useState([])









    const initialState = {
        isLoading: false,
        Data: [],
        ProfileData: [],
        productData: [],
        AddressData: [],
        AddressDetail: [],
        SignupData: []
    }


    const reducer = (state, action) => {

        switch (action.type) {
            case 'is_Loading': {
                return {
                    ...state,
                    isLoading: true
                }
            }

            case 'no_Loading': {
                return {
                    ...state,
                    isLoading: false
                }
            }
            case 'Login_Data': {
                return {
                    ...state,
                    isLoading: false,
                    LoginData: action.payload.LoginData
                }
            }
            case 'Signup_Data': {
                return {
                    ...state,
                    isLoading: false,
                    SignupData: action.payload.SignupData
                }
            }
            case 'Profile_Data': {
                return {
                    ...state,
                    isLoading: false,
                    ProfileData: action.payload.Data
                }
            }
            case 'Address_Data': {
                return {
                    ...state,
                    isLoading: false,
                    AddressData: action.payload.AddressData
                }
            }
            case 'Address_Detail': {
                return {
                    ...state,
                    isLoading: false,
                    AddressDetail: action.payload.AddressDetail
                }
            }
            // case 'Product_Data': {
            //     return {
            //         ...state,
            //         isLoading: false,
            //         productData: action.payload.Data
            //     }
            // }

            default:
                break;

        }
        return

    }




    const [state, dispatch] = useReducer(reducer, initialState)









    const refreshPage = () => {
        window.location.reload();
    }















    const [auth, setAuth] = useState(null);
    const [user, setUser] = useState(null);

    // useEffect(() => {
    //   const isAuth = async () => {
    //     try {
    //       const res =  await  axios.post("http://68.183.90.227:8080/profile", { token })

    //       setUser( await res.data);
    //       console.log(user);
    //     } catch(error) {
    //       setUser(null);
    //     };
    //   };

    //   isAuth();
    // }, [auth]);


































    const Navigate = useNavigate();

    const [login, setlogin] = useState({
        email: '',
        password: '',
        expires: false
        // errors: {}
    })


    const [logindata, setlogindata] = useState([])


    const getProfile = async () => {
        // console.log(sid);
        dispatch({ type: 'is_Loading' })
        await axios.post("http://68.183.90.227:8080/profile", { token })
            .then((res) => {
                console.log(res)
                dispatch({
                    type: "Profile_Data",
                    payload: {
                        Data: res.data
                    }

                })
                const logindata = res.data
                setlogindata(logindata)
            })
            .catch((err) => {
                console.log(err)
                dispatch({ type: 'no_Loading' })
            })
    }





    const getUser = () => {
        const user = localStorage.getItem("user");
        const parseduser = JSON.parse(user)
        console.log(parseduser);
        setfirst(parseduser)
        console.log(first);
        // return parseduser

    }




    const [datalogin, setdatalogin] = useState([])


    const [error, seterror] = useState({});
    const [alert, setalert] = useState(false)

    const Api = "http://68.183.90.227:8080/auth/signin";

    const locationn = useLocation()
    const redirectpath = location.state?.path || ''
    //axios.defaults.withCredentials = true;
    const onSubmitLogin = async (e) => {

        e.preventDefault()
        setlogged(true)
        dispatch({ type: 'is_Loading' })

        await axios.post(Api, { login }
        )
            .then((response) => {

                console.log(login)
                console.log(response);

                dispatch({
                    type: "Login_Data",
                    payload: {
                        LoginData: response.data
                    }
                })
                dispatch({ type: 'logg' })
                const lg = response.data
                localStorage.setItem('user', JSON.stringify(lg));

                console.log("successfully");
                const token = response.data.token

                localStorage.setItem('logged', true);
                // getProfile()
                localStorage.setItem('token', token);
                console.log(token);
                // settoken(token)
                getUser()

                getCartData()



                const res = response.data
                setdatalogin(res)
                getProfile()
                navigate(redirectpath, {replace:true})
                if (pathName.includes('/')) {
                    if (pathName.includes('/login')) {
                        window.location.href = '/'
    
                    } else {
                    window.location.href = pathName
                    }

                } else {
                    if (pathName.includes('/login')) {
                        window.location.href = '/'
    
                    } else {
                    window.location.href = pathName
                    }
                }


            })
            .catch((error) => {
                console.log(login)
                setalert(true)

                console.log(error);
                dispatch({ type: 'no_Loading' })
                const errors = error.response.data
                seterror(errors)

            });
        console.log(token);
        // getProfile()


    }












    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("logged");
        setUser(false);
        console.log(user);

        if (pathName.includes('/')) {
            window.location.href = "/"

        } else {
            setTimeout(() => {
                window.location.href = "/"
            }, 500);
            // window.location.href = "/"


        }

    }






    const onChange = (e) => {
        setlogin({ ...login, [e.target.id]: e.target.value })
        // console.log(login);
    }

    useEffect(() => {
        setTimeout(() => {
            setalert(false)

        }, 5000);
    }, [alert])









    // update password 


    const updatePassword = async () => {
        axios.put(`api`, { login })
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
                dispatch({ type: 'no_Loading' })
            })


    }





    // const initialState = {

    // }









    // const [error, seterror] = useState(second)

    const [signup, setsignup] = useState({
        firstname: '',
        lastname: '',
        email: '',
        password: ''
    })
    const rApi = "http://68.183.90.227:8080/auth/register";

    const onSignupSubmit = async (e) => {
        dispatch({ type: 'is_Loading' })

        e.preventDefault()

        await axios.post(rApi, { signup })
            .then((response) => {
                console.log(signup)
                console.log(response);
                dispatch({
                    type: "Signup_Data",
                    payload: {
                        SignupData: response.data
                    }

                })
                const token = response.data.token
                localStorage.setItem('logged', true);
                localStorage.setItem('token', token);
                const lg = response.data
                localStorage.setItem('user', JSON.stringify(lg));
                console.log(token);
                // Navigate('/')

                // settoken(token)
                getUser()

                getCartData()
                getProfile()




                if (pathName.includes('/')) {
                    window.location.href = "/"
                } else {
                    window.location.href = "/"

                }
                

            })
            .catch((error) => {
                // console.log(signup)
                console.log(error);

                const erro = error.response.data
                seterror(erro)
                console.log('noot');
                dispatch({ type: 'no_Loading' })
                setalert(true)




            });


    }
    console.log(error);


    const onSignupChange = (e) => {
        setsignup({ ...signup, [e.target.id]: e.target.value })
    }














    useEffect(() => {
        const isAuth = async () => {

            const res = localStorage.getItem('logged')

            setUser(res);
            console.log(user);
            // getUser()

        }

        isAuth();


    }, [onSubmitLogin, onSignupSubmit])



    useEffect(() => {
        const isAuth = async () => {

            const res = localStorage.getItem('logged')

            setUser(res);
            console.log(user);

        }

        isAuth();


        getUser()

    }, [])
    useEffect(() => {
        const isAuth = async () => {

            const res = localStorage.getItem('logged')

            setUser(res);
            console.log(user);
            // getUser()

        }

        isAuth();


    }, [onSubmitLogin, onSignupSubmit])



    useEffect(() => {
        const isAuth = async () => {

            const res = localStorage.getItem('logged')

            setUser(res);
            console.log(user);

        }

        isAuth();


        getUser()

    }, [])





























    // checkout / payment

    const [addAddress, setaddAddress] = useState(false)
    const [addressValue, setaddressValue] = useState({
        street:'',
        house:'',
        city:'',
        state:'',
        pin:'',
        title:'Home'
    })

    const getAddress = async () => {

        await axios.post('http://68.183.90.227:8080/profile/address', { 'token': token })
            .then((res) => {
                console.log(res);
                const data = res.data.result;
                dispatch({
                    type: "Address_Data",
                    payload: {
                        AddressData: res.data.result
                    }

                })
            })
            .catch((err) => {
                console.log(err);
            })
        console.log(initialState.AddressData);
    }
    useEffect(() => {
        // getAddress()
    }, [])



    const onSubmitCheckout = async (e) => {
        e.preventDefault()
        console.log('submit');

        await axios.post('http://68.183.90.227:8080/profile/add/address', { 'token': token, 'address': addressValue })
            .then((res) => {
                console.log(res);

                setaddAddress((prev) => !prev)
                getAddress()

            })
            .catch((err) => {
                console.log(err)


            });


    }






    const onChangeCheckout = (e) => {
        setaddressValue({ ...addressValue, [e.target.id]: e.target.value })
        
        console.log(addressValue,'adressss');
    }


    // const [clicked, setclicked] = useState({total: 0})
    const [clicked, setclicked] = useState(0)
    // const getClass = idx => (`item ${clicked[idx] ? 'selected' : 'unselected'}`);


    const onCheckoutClick = (title, street, house, city, state, pin, idx) => {
        setclicked(prev => ({ [idx]: !prev[idx] }))
        console.log(title);
        const object = {
            title: title,
            street: street,
            house: house,
            city: city,
            state: state,
            pin: pin,
        }

        console.log(object);
        dispatch({
            type: "Address_Detail",
            payload: {
                AddressDetail: object
            }

        })
        console.log(initialState.AddressDetail);


    }




    const checkout = () => {
        if (pathName.includes('/')) {
            navigate('/payment')
        } else {
            navigate('/payment')

        }

    }












    return (
        <AuthContext.Provider value={{ ...state, login, error, onChange, onSubmitLogin, token, logindata, getProfile, first, getAddress, onSubmitCheckout, checkout, onCheckoutClick, onChangeCheckout, addAddress, setaddAddress, clicked, refreshPage, onSignupChange, onSignupSubmit, signup, setalert, alert, error, decode, logged, auth, setAuth, user, setUser, logout,pathName }}>
            {children}
        </AuthContext.Provider>
    )


}


const useAuthContext = () => {
    return useContext(AuthContext)
}


export { AContext, AuthContext, useAuthContext };