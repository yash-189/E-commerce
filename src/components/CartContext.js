import React, { createContext, useContext, useReducer, useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { confirm } from "react-confirm-box";

const CartContext = createContext();

const Context = ({ children }) => {

    const location = useLocation();
    const pathName = location.pathname




    const navigate = useNavigate();

    const token = localStorage.getItem("token");
    console.log(token);

    // const [decode, setdecode] = useState({})



    // const decodeToken = () => {
    //     // Define the string
    //     const encodedStringAtoB = token;

    //     const string = encodedStringAtoB.split('.');
    //     const newString = string[1]
    //     console.log(string[1]);

    //     // Decode the String
    //     const decoded = atob(newString);
    //     setdecode(decode)

    //     console.log(decoded, "decodwe");
    //     return decoded
    // }





    // useEffect(() => {


    //     const checkAuth = decodeToken()

    //     const parsedCheckAuth = JSON.parse(checkAuth)

    //     console.log(parsedCheckAuth);
    //     setdecode(parsedCheckAuth)


    // }, [])

    // console.log(decode);




    useEffect(() => {
        if (pathName == '/' || pathName == '/') {
            sessionStorage.clear()
        }
    }, [pathName])













    const [cartActive, setcartActive] = useState(false)



    const [data, setdata] = useState([]);
    const [updatedCart, setupdatedCart] = useState([])
    const [wishlist, setwishlist] = useState([])
    // const [product, setproduct] = useState([])




    // const url = 'https://fakestoreapi.com/products?limit=5'









    const getData = async (url) => {
        axios.get('https://fakestoreapi.com/products?limit=20')
            .then((res) => {
                console.log(res, 'llllll');
                setdata(res.data)
            })
            .catch((err) => {
                console.log(err);
            })

    }
    // console.log(data);


    const ApiData = async () => {
        axios.post('http://68.183.90.227:8080/product/menu')
            .then((res) => {
                console.log(res);
                // set(res.data)
            })
            .catch((err) => {
                console.log(err);
            })

    }

















    // const getProduct = async (id) => {
    //     setloading(true)
    //     console.log(id);
    //     console.log('prod');
    // const filter = data.filter((elem) => {
    //     return elem.id == id
    // })
    //     // console.log(filter);
    //     // setproduct(filter)
    //     // console.log(product);


    //     const getData =  (id) => {
    //         axios.get(`http://192.168.68.114:8000/product/productid/${id}`)
    //             .then((res) => {

    //                 console.log(res);

    //                 console.log(id);
    //                 setproduct(res.data.result)
    //                 // console.log(productData);
    //                 setloading(false)




    //                 // setproduct(res.data)
    //             })
    //             .catch((err) => {
    //                 console.log(err);
    //             })

    //     }
    //     getData(id)
    //     navigate('/details')

    // }



    // useEffect(() => {
    //     localStorage.setItem('items', JSON.stringify(updatedCart));
    //   }, [updatedCart]);


    // useEffect(() => {
    //     const items = JSON.parse(localStorage.getItem('items'));
    //     const wishlist = JSON.parse(localStorage.getItem('wishlist'));
    //     if (items) {
    //         setupdatedCart(items);
    //     }
    //     if (wishlist) {
    //         setwishlist(wishlist)
    //     }
    // }, []);

    // console.log(updatedCart);














    // update quantity


    // const [quantity, setQuantity] = useState(1);
    // const [Id, setId] = useState('')


    // const increase = (id) => {

    //     setQuantity(quantity + 1);
    //     console.log('quantity')
    //     console.log(id);
    //     const updateQuantity = async (id) => {
    //         dispatch({ type: 'is_Loading' })
    //         console.log('updating quantity');

    //         await axios.post(quantityApi, { 'token': token, item: { id: id, quantity: quantity + 1 } })
    //             .then((res) => {
    //                 console.log(res.data);
    //                 getCartData()

    //             })
    //             .catch((err) => {
    //                 console.log(err);
    //             })


    //     }
    //     updateQuantity(id)


    // };

    // const decrease = (id) => {
    //     if (quantity > -1) {
    //         setQuantity(quantity - 1);
    //         console.log(id);
    //         const updateQuantity = async (id) => {
    //             dispatch({ type: 'is_Loading' })
    //             console.log('updating quantity');

    //             await axios.post(quantityApi, { 'token': token, item: { id: id, quantity: quantity - 1 } })
    //                 .then((res) => {
    //                     console.log(res.data);
    //                     getCartData()

    //                 })
    //                 .catch((err) => {
    //                     console.log(err);
    //                 })


    //         }

    //         updateQuantity(id)

    //     }
    //     if(quantity==0){
    //         console.log('quantity 0');
    //         prompt()

    //         removeItem()
    //     }
    // };



    // const updateQuantity = async (id) => {
    //     dispatch({ type: 'is_Loading' })
    //     console.log('updating quantity');

    //  await   axios.post(quantityApi, { 'token': token, item: { id: id, quantity: quantity } })
    //         .then((res) => {
    //             console.log(res.data);
    //             getCartData()

    //         })
    //         .catch((err) => {
    //             console.log(err);
    //         })


    // }



    // const updateQ = (id) => {
    //     console.log('quantity');
    //     // setid(id)
    //     console.log(id);
    //     updateQuantity(id)

    // }



























    // search  //

    const [SearchState, setSearchState] = useState({
        // search,name,category,brand 
    })




    // useEffect(() => {

    //     const category = async () => {
    //         await axios.post(menuApi)
    //             .then((res) => {

    //                 console.log(res);

    //                 // navigate('/explore')


    //             })
    //             .catch((err) => {
    //                 console.log(err);
    //             })

    //     }
    //     category()
    // }, [])





    // const submitHandler = (e) => {
    //     e.preventDefault();

    //     console.log(query);
    //     setsearch(query)

    //     console.log(search);


    //     const getsearchdata = async () => {


    //         axios.post(searchApi, search)
    //             .then((res) => {

    //                 console.log(res);
    //                 setSearchDataApi(res.data.result)
    //                 console.log(SearchDataApi);
    //                 navigate('/explore')


    //             })
    //             .catch((err) => {
    //                 console.log(err);
    //             })
    //     }
    //     getsearchdata()

    // }

    // const [menuData, setmenuData] = useState([])

    // useEffect(() => {
    //     const getdata = async () => {

    //         axios.post(searchApi, { category: "eye" })
    //             .then((res) => {
    //                 console.log(res);
    //                 setmenuData(res.data.result)
    //                 console.log(menuData);


    //             })
    //             .catch((err) => {
    //                 console.log(err);
    //             })
    //     }
    //     getdata()
    // }, [])





















    const initialState = {
        isLoading: false,
        noLoading: false,
        cartLoading: true,
        addToCartLoading: true,
        searchLoading: true,
        Data: [],
        productData: [],
        cartData: [],
        cartDataLogout: [],
        wishlistdata: [],
        SearchDataApi: [],
        HomeData: [],
        ExploreData: [],
        OfferData: []
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
                    isLoading: false,
                    cartLoading: false,
                    searchLoading: false
                }
            }
            case 'Add_To_Loading': {
                return {
                    ...state,
                    cartLoading: true
                }
            }
            case 'Search_Loading': {
                return {
                    ...state,
                    searchLoading: true
                }
            }
            case 'Api_Data': {
                return {
                    ...state,
                    isLoading: false,
                    Data: action.payload.Api
                }
            }
            case 'Cart_Data': {
                return {
                    ...state,
                    isLoading: false,
                    cartData: action.payload.cartdata
                }
            }
            case 'Product_Data': {
                return {
                    ...state,
                    isLoading: false,
                    productData: action.payload.Data
                }
            }
            case 'Add_To_Cart': {
                return {
                    ...state,
                    isLoading: false,
                    addCart: action.payload.addCart
                }
            }
            case 'Wishlist_Data': {
                return {
                    ...state,
                    isLoading: false,
                    wishlistdata: action.payload.wishlistdata
                }
            }
            case 'Search_Data': {
                return {
                    ...state,
                    isLoading: false,
                    searchLoading: false,
                    SearchDataApi: action.payload.SearchDataApi
                }
            }
            case 'Explore_Data': {
                return {
                    ...state,
                    isLoading: false,
                    searchLoading: false,
                    ExploreData: action.payload.ExploreData
                }
            }
            case 'Offer_Data': {
                return {
                    ...state,
                    isLoading: false,
                    OfferData: action.payload.OfferData
                }
            }
            case 'Home_Data': {
                return {
                    ...state,
                    isLoading: false,
                    HomeData: action.payload.HomeData
                }
            }
            case 'Menu_Data': {
                return {
                    ...state,
                    isLoading: false,
                    MenuData: action.payload.MenuData
                }
            }
            case 'Cart_Data_Logout': {
                return {
                    ...state,
                    isLoading: false,
                    cartDataLogout: action.payload.cartDataLogout
                }
            }

            default:
                break;

        }
        return

    }




    const [state, dispatch] = useReducer(reducer, initialState)










    // home data



    const getHomeData = async () => {
        dispatch({ type: 'is_Loading' })
        await axios.get('https://fakestoreapi.com/products?limit=20')
            .then((res) => {
                console.log(res, 'lll');
                setdata(res.data)
                dispatch({
                    type: 'Home_Data',
                    payload: {
                        HomeData: res.data
                    }
                })
            })
            .catch((err) => {
                console.log(err);

                dispatch({ type: 'no_Loading' })
            })
        dispatch({ type: 'no_Loading' })

    }

    useEffect(() => {
        getHomeData()
    }, [])




    // trending


    const trendingData = async () => {
        dispatch({ type: 'is_Loading' })
        await axios.get('https://fakestoreapi.com/products?limit=20')
            .then((res) => {

                console.log(res, 'trending');
                dispatch({
                    type: 'Explore_Data',
                    payload: {
                        ExploreData: res.data
                    }
                })
                window.sessionStorage.setItem("trend", JSON.stringify(res.data));
                // setSearchDataApi(res.data.result)
                // console.log(SearchDataApi);
                // navigate('/explore')
                // setquery((prev) => prev)


            })
            .catch((err) => {
                console.log(err);

                dispatch({ type: 'no_Loading' })
            })




    }
    const [searchValue, setsearchValue] = useState('')

    const onchangeSearch = (e) => {
        setsearchValue(e.target.value)
        console.log('dd', searchValue);
        // window.sessionStorage.setItem("query", searchValue);
        searchFilter(e)

    }

    const searchFilter = (e) => {
        e.preventDefault()
        // console.log(value, 'search on');

        dispatch({ type: 'is_Loading' })

      const data =    JSON.parse(window.sessionStorage.getItem("trend"))
        let results = data?.filter((x) => {

            return x.title.toLocaleLowerCase().includes((searchValue.toLocaleLowerCase()))
        })
        console.log(results, data, 'lllll');

        if (searchValue == '') {
            dispatch({ type: 'no_Loading' })
        }
        else {
            dispatch({
                type: 'Explore_Data',
                payload: {
                    ExploreData: results
                }
            })
            dispatch({ type: 'no_Loading' })
        }
        navigate('/explore')
        dispatch({ type: 'no_Loading' })
    }

    // useEffect(() => {
    //     searchFilter(searchValue)
    // }, [searchValue])









    // const [SearchDataApi, setSearchDataApi] = useState([])
    const [query, setquery] = useState('');

    const [searchPara, setsearchPara] = useState({
        search: '',
        name: '',
        category: '',
        brand: ''
    })

    const [search, setsearch] = useState({ search: "" })

    const SearchProduct = (searchValue) => {
        dispatch({ type: 'is_Loading' })




        // console.log(query);
        console.log(searchValue, 'event');
        setquery(searchValue)


        let updatedValue = {};
        updatedValue = { search: searchValue };
        setsearch(search => ({
            ...search,
            ...updatedValue
        }));
        console.log(search);


        if (pathName.includes('/')) {
            getsearchdata(searchValue)
        } else {
            // if(searchValue.length==1){
            //     return
            //             }else{
            getsearchdata(searchValue)
            // }
        }



    }






    const offersData = async () => {
        // dispatch({ type: 'is_Loading' })
        // await axios.get(offers)
        //     .then((res) => {

        //         console.log(res, 'offerss......');
        //         dispatch({
        //             type: 'Offer_Data',
        //             payload: {
        //                 OfferData: res.data.result
        //             }
        //         })
        //         window.sessionStorage.setItem("category", JSON.stringify(res.data));



        //     })
        //     .catch((err) => {
        //         console.log(err);

        //         dispatch({ type: 'no_Loading' })
        //     })



    }


    useEffect(() => {

        offersData()



    }, [])








    const getsearchdata = async (searchValue) => {
        dispatch({ type: 'is_Loading' })
        // if (search === '') {
        //     console.log('blank search');


        //     await axios.post(TrendingApi)
        //     .then((res) => {

        //         console.log(res);
        //         dispatch({
        //             type: 'Search_Data',
        //             payload: {
        //                 SearchDataApi: res.data.result
        //             }
        //         })
        //         // setSearchDataApi(res.data.result)
        //         // console.log(SearchDataApi);
        //         // navigate('/explore')
        //         setquery((prev) => prev)


        //     })
        //     .catch((err) => {
        //         console.log(err);

        //         dispatch({ type: 'no_Loading' })
        //     })








        dispatch({ type: 'Search_Loading' })


        console.log('not blank');

        await axios.post(searchApi, { search: searchValue })
            .then((res) => {

                console.log(res);
                if (res.data.error) {

                    if (pathName.includes('/')) {
                        // navigate('/explore')
                        window.sessionStorage.setItem("search", '');
                        // window.scrollTo(0, 0)
                    } else {
                        // navigate('/explore')
                        window.sessionStorage.setItem("search", '');
                        // window.scrollTo(0, 0)

                    }
                    dispatch({ type: 'no_Loading' })

                } else {

                    dispatch({
                        type: 'Search_Data',
                        payload: {
                            SearchDataApi: res.data.result
                        }
                    })
                    // console.log(JSON.stringify(res.data.result))
                    window.sessionStorage.setItem("search", JSON.stringify(res.data.result));
                    // setSearchDataApi(res.data.result)
                    // console.log(SearchDataApi);
                    if (pathName.includes('/')) {
                        navigate('/search')
                        window.scrollTo(0, 0)
                    } else {
                        navigate('/search')
                        window.scrollTo(0, 0)

                    }
                    setquery((prev) => prev)

                }
            })

            .catch((err) => {
                console.log(err);

                dispatch({ type: 'no_Loading' })
            })

    }






    // search 
    const submitHandler = (e) => {

        e.preventDefault();
        dispatch({ type: 'Search_Loading' })
        dispatch({ type: 'is_Loading' })

        console.log(query);
        // if (!query == '') {
        window.sessionStorage.setItem("query", JSON.stringify(query));

        // }
        // setquery((prev)=>prev)

        console.log(search);
        // if(search===''){
        //     setsearch((prev)=>prev)
        //     console.log(search);
        // }






        getsearchdata(query)

    }

    useEffect(() => {
        if (!(window.sessionStorage.getItem("search") === null || window.sessionStorage.getItem("search") === 'undefined' || window.sessionStorage.getItem("search") === '')) {
            dispatch({
                type: 'Search_Data',
                payload: {
                    SearchDataApi: (JSON.parse(window.sessionStorage.getItem("search")))
                }
            })
        }
        if (!(window.sessionStorage.getItem("query") === null || window.sessionStorage.getItem("query") === 'undefined')) {
            setquery(JSON.parse(window.sessionStorage.getItem("query")));

        }
        if (!(window.sessionStorage.getItem("trend") === null || window.sessionStorage.getItem("trend") === 'undefined')) {
            dispatch({
                type: 'Explore_Data',
                payload: {
                    ExploreData: (JSON.parse(window.sessionStorage.getItem("trend")))
                }
            })

        }
        // console.log(initialState.SearchDataApi);
        trendingData()

    }, []);




    const [menuData, setmenuData] = useState([])

    useEffect(() => {
        // const getdata = async () => {

        //     axios.post(searchApi, { category: "eye" })
        //         .then((res) => {
        //             console.log(res);

        //             setmenuData(res.data.result)
        //             console.log(menuData);


        //         })
        //         .catch((err) => {
        //             console.log(err);

        //             dispatch({ type: 'no_Loading' })
        //         })
        // }
        // getdata()
    }, [])





    // category /  menu

    const getMenuData = async () => {
        dispatch({ type: 'is_Loading' })
        await axios.get(menuApi)
            .then((res) => {
                console.log(res);
                setdata(res.data)
                dispatch({
                    type: 'Menu_Data',
                    payload: {
                        MenuData: res.data
                    }
                })
            })
            .catch((err) => {
                console.log(err);

                dispatch({ type: 'no_Loading' })
            })

    }





    // category

    const getCategoryData = async (value) => {
        dispatch({ type: 'is_Loading' })
        console.log(value, 'vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv');
        await axios.post(searchApi, { search: value })
            .then((res) => {

                console.log(res);
                dispatch({
                    type: 'Search_Data',
                    payload: {
                        SearchDataApi: res.data.result
                    }
                })
                console.log(JSON.stringify(res.data.result))
                window.sessionStorage.setItem("search", JSON.stringify(res.data.result));
                if (pathName.includes('/')) {
                    navigate('/search')
                } else {
                    navigate('/search')

                }
                setquery((prev) => prev)


            })
            .catch((err) => {
                console.log(err);

                dispatch({ type: 'no_Loading' })
            })

    }
















































    // Fetching data from api for page 1

    const getApiData = (url) => {
        dispatch({ type: 'is_Loading' })

        axios.get(url)
            .then((res) => {
                // console.log(res.data);
                dispatch({
                    type: 'Api_Data',
                    payload: {
                        Api: res.data
                    }
                })

            })
            .catch((err) => {
                console.log(err);

                dispatch({ type: 'no_Loading' })
            })

    }

    const [cart, setcart] = useState(JSON.parse(localStorage.getItem('cart')) || [])



    // get cart data
    const getCartData = async () => {
        dispatch({ type: 'is_Loading' })

        await axios.post(CartApi, { 'token': token })
            .then((res) => {
                console.log(res.data);
                dispatch({
                    type: 'Cart_Data',
                    payload: {
                        cartdata: res.data.result
                    }
                })
                dispatch({ type: 'no_Loading' })
                setcart(res.data.result)


            })
            .catch((err) => {
                console.log(err);

                dispatch({ type: 'no_Loading' })
            })
        console.log(initialState.cartData);
    }
    useEffect(() => {
        // getData(`url`)
        // getCartData()

    }, [])



    // add to cart

    // const [addCCart, setaddCCart] = useState({
    //     product_id: '',
    //     title: '',
    //     shade: '',
    //     quantity: 1,
    //     price: ''
    // })


    const [clicked, setclicked] = useState(0)

    const addProductCart = async (item) => {
        // dispatch({ type: 'is_Loading' })


        dispatch({ type: 'Add_To_Loading' })







        await axios.post(AddCartApi, { 'token': token, item })
            //  console.log(addcart)
            .then((res) => {
                console.log(res);
                // dispatch({
                //     type: 'Add_To_Cart',
                //     payload: {
                //         cartdata: res.data
                //     }
                // })
                getCartData();
                // setcartActive(true)


            })
            .catch((err) => {
                console.log(err);

                dispatch({ type: 'no_Loading' })
            })


        dispatch({ type: 'no_Loading' })

    }

    const [available, setavailable] = useState(false)

    let checkProduct = ''




    const checkShade = (id, shades) => {

        if (cart?.some(pid => pid.product_id == id && cart.some(shad => shad.shade == shades))) {
            console.log('same');
            setavailable(true)
            checkProduct = 'available'


        } else {
            checkProduct = ''
            setavailable(false)
        }




    }




    // const addToCart = (id, title, shades, quantity, price, index) => {
    //     setclicked(prev => ({ [index]: !prev[index] }))
    //     // checkProduct = 'available'
    //     setavailable(true)
    //     // getCartData()

    //     dispatch({ type: 'Add_To_Loading' })
    //     dispatch({ type: 'is_Loading' })
    //     console.log('cart')
    //     const object = {
    //         product_id: id,
    //         title: title,
    //         shade: shades,
    //         quantity: 1,
    //         price: price
    //     }

    //     console.log(cart, 'cart');

    //     if (cart.some(pid => pid.product_id == id && cart.some(shad => shad.shade == shades))) {
    //         console.log('same');
    //         checkProduct = ''


    //         // addProductCart(object)
    //         // increase(id)
    //         removeItem(id, title, shades, quantity, price, index)
    //         setavailable(false)


    //     } else {

    //         console.log(checkProduct);

    //         // setavailable(true)

    //         console.log(object);

    //         addProductCart(object)
    //     }

    // }





    const addToCart = (id, title, shades, quantity, price, image, index) => {
        setclicked(prev => ({ [index]: !prev[index] }))
        // checkProduct = 'available'
        setavailable(true)
        // getCartData()

        dispatch({ type: 'Add_To_Loading' })
        dispatch({ type: 'is_Loading' })
        console.log('cart')
        const object = {
            product_id: id,
            title: title,
            shade: shades,
            quantity: 1,
            price: price,
            image: image
        }

        console.log(cart, 'cart');
        let array = []

        if (cart.some(pid => pid.product_id == id)) {
            console.log('same');
            checkProduct = ''


            // addProductCart(object)
            // increase(id)
            // removeItem(id, title, shades, quantity, price, index)
            const remove = async () => {
                dispatch({ type: 'Add_To_Loading' })
                const filter = cart?.filter((elem) => {
                    return elem.product_id !== id
                })
                console.log(filter, 'hhhhhhhhh');
                setcart(filter)
                dispatch({ type: 'no_Loading' })

            }
            remove()
            setavailable(false)



        } else {

            console.log(checkProduct, 'not sammmmmmmm');

            // setavailable(true)

            console.log(object);

            const add = async () => {
                dispatch({ type: 'Add_To_Loading' })
                setcart([...cart, object])
                dispatch({ type: 'no_Loading' })

            }
            add()
        }
        dispatch({ type: 'no_Loading' })



        console.log(cart, object, 'edit');
    }

    // const [first, setfirst] = useState(second)


    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart))




    }, [cart])





    // buy now 
    // buyNow




    const buyNow = (id, title, shades, quantity, price, image, index) => {
        setclicked(prev => ({ [index]: !prev[index] }))
        setavailable(true)
        // getCartData()
        console.log('cart')
        const object = {
            product_id: id,
            title: title,
            shade: shades,
            quantity: 1,
            price: price
        }

        if (cart.some(pid => pid.product_id == id)) {
            console.log('same');
            setavailable(false)
            // increase(id)
            // removeItem(id, title, shades, quantity, price, index)

        } else {




            console.log(object);

            addProductCart(object)
        }

    }


    const buynowbutton = async (id, title, shades, quantity, price, image, index) => {
        addToCart(id, title, shades, quantity, price, image, index)
        navigate(pathName == '/details' ? '/cart' : '/cart')
    }


    const remove = async (id) => {
        dispatch({ type: 'Add_To_Loading' })
        const filter = cart?.filter((elem) => {
            return elem.product_id !== id
        })
        console.log(filter, 'hhhhhhhhh');
        setcart(filter)
        dispatch({ type: 'no_Loading' })

    }

    const updateQuantity = async (id, type) => {

        dispatch({ type: 'is_Loading' })


        if (type == 'increment') {
            const data = cart?.map((elem) => {
                if (elem.product_id == id) {
                    console.log('match qqqqq', id);
                    let quantityy = elem.quantity + 1
                    console.log('match qqqqq', quantityy);
                    dispatch({ type: 'no_Loading' })
                    return {
                        ...elem,
                        quantity: quantityy
                    }
                }
                else {

                    dispatch({ type: 'no_Loading' })
                    return elem
                }

            })
            console.log(data, 'qqqqqqq');
            return setcart(data)
        }


        if (type == 'decrement') {
            let qauntiti = null
            const data = cart?.map((elem) => {
                if (elem.product_id == id) {
                    console.log('match qqqqq', id);

                    let quantityy = elem.quantity - 1
                    if (quantityy <= 0) {
                        dispatch({ type: 'no_Loading' })
                        return qauntiti = 0
                    } else {

                        console.log('match qqqqq', quantityy);
                        dispatch({ type: 'no_Loading' })
                        return {
                            ...elem,
                            quantity: quantityy
                        }
                    }
                } else {
                    dispatch({ type: 'no_Loading' })
                    return elem
                }
            })
            console.log(data, 'qqqqqqq');
            if (qauntiti == 0) {
                remove(id)
            } else {
                dispatch({ type: 'no_Loading' })
                return setcart(data)

            }
        }

        dispatch({ type: 'no_Loading' })


    }


    // remove from cart

    // const [removecart, setremovecart] = useState({
    //     product_id: '',
    //     title: '',
    //     shade: '',
    //     quantity: 1,
    //     price: ''
    // })

    const removeProductCart = (item) => {
        dispatch({ type: 'is_Loading' })
        dispatch({ type: 'Add_To_Loading' })

        axios.post(removeCartApi, { 'token': token, item })
            // console.log(removecart)
            .then((res) => {
                console.log(res.data);
                // dispatch({
                //     type: 'Cart_Data',
                //     payload: {
                //         cartdata: res.data
                //     }
                // })
                getCartData()
                dispatch({ type: 'no_Loading' })

            })
            .catch((err) => {
                console.log(err);

                dispatch({ type: 'no_Loading' })
            })




    }


    const removeItem = (id, title, shade, quantity, price) => {
        dispatch({ type: 'Add_To_Loading' })
        console.log('remove');
        const object = {
            product_id: id,
            title: title,
            shade: shade,
            quantity: 1,
            price: price
        }

        console.log(object);

        removeProductCart(object)
        // return dispatch({
        //     type: 'REMOVE_ITEM',
        //     payload: id
        // })
        // const filter = updatedCart.filter((elem) => {
        //     return elem.id !== id
        // })
        // console.log(filter);
        // let items = JSON.parse(localStorage.getItem("items"));
        // items = items.filter((item) => item.id !== id);
        // localStorage.setItem("items", JSON.stringify(items));
        // if (items.length === 0) {
        //     localStorage.removeItem("items");
        // }
        // setupdatedCart(items)
        // console.log(updatedCart);

        dispatch({ type: 'no_Loading' })
    }




    // addlocalcart 















    // add to wishlist

    const [wishlistt, setwishlistt] = useState([])


    const getwishlistData = async () => {
        dispatch({ type: 'is_Loading' })

        await axios.post(wishlistApi, { 'token': token, wishlist: true })
            .then((res) => {
                console.log(res.data);
                dispatch({
                    type: 'Wishlist_Data',
                    payload: {
                        wishlistdata: res.data.result
                    }
                })
                setwishlistt(res.data.result)


            })
            .catch((err) => {
                console.log(err);

                dispatch({ type: 'no_Loading' })
            })
        console.log(initialState.wishlistdata);
    }
    useEffect(() => {
        // getData(`url`)
        // getwishlistData()

    }, [])








    const [addedtowishlist, setaddedtowishlist] = useState(false)

    let alreadyWishlist = ''


    const checkwishlist = (id, shades) => {

        if (initialState.wishlistdata.some(pid => pid.product_id == id)) {
            console.log('same wwwwwwwwwwwww already');
            setaddedtowishlist(true)
            alreadyWishlist = true


        } else {
            checkProduct = ''
            setaddedtowishlist(false)
        }




    }









    const wishlistProduct = (item) => {
        dispatch({ type: 'is_Loading' })
        console.log(item);
        axios.post(addwishlistApi, { 'token': token, item, wishlist: true })
            .then((res) => {
                console.log(res.data);


                // dispatch({
                //     type: 'Cart_Data',
                //     payload: {
                //         cartdata: res.data
                //     }
                // })
                getwishlistData()
            })
            .catch((err) => {
                console.log(err);

                dispatch({ type: 'no_Loading' })
            })


    }



    const addToWishlist = (id, title, shades, quantity, price) => {
        console.log(shades, 'wwwwwwwwwishist');

        const object = {
            product_id: id,
            title: title,
            shades: shades,
            quantity: 1,
            price: price
        }
        console.log(object);

        checkwishlist(id, shades)
        if (initialState.wishlistdata.some(pid => pid.product_id == id)) {
            console.log('removed product from wishlist');

            removeWishlist(id, title, shades, quantity, price)

            // increase(id)




        } else {




            console.log(object);
            wishlistProduct(object)



        }





    }





    // remove wishlist





    const RemovewishlistProduct = (item) => {
        dispatch({ type: 'is_Loading' })

        axios.post(removewishlistApi, { 'token': token, item, wishlist: true })
            .then((res) => {
                console.log(res.data);

                getwishlistData()
                // dispatch({
                //     type: 'Cart_Data',
                //     payload: {
                //         cartdata: res.data
                //     }
                // })

            })
            .catch((err) => {
                console.log(err);

                dispatch({ type: 'no_Loading' })
            })


    }



    const removeWishlist = (id, title, shades, quantity, price) => {
        console.log('remove wishlist');
        const object = {
            product_id: id,
            title: title,
            shades: shades,
            quantity: 1,
            price: price
        }

        console.log(object);
        RemovewishlistProduct(object)


    }






























    // quantity 



    const [quantity, setQuantity] = useState(1);
    const [Id, setId] = useState('')


    const increase = (id, quantity, shade) => {

        // setQuantity(quantity + 1);
        console.log('quantity')
        console.log(id);
        console.log(quantity);


        const updateQuantity = async (id, quantity, shade) => {
            dispatch({ type: 'is_Loading' })
            console.log('updating quantity');

            await axios.post(quantityApi, { 'token': token, item: { id: id, quantity: quantity + 1, shade } })
                .then((res) => {
                    console.log(res.data);
                    getCartData()

                })
                .catch((err) => {
                    console.log(err);

                    dispatch({ type: 'no_Loading' })
                })


        }
        updateQuantity(id, quantity)


    };

    const decrease = (id, title, shade, quantity, price) => {
        if (quantity > 1) {
            // setQuantity(quantity - 1);
            console.log('quantity')
            console.log(id);
            console.log(quantity);



            const updateQuantity = async (id, quantity, shade) => {
                dispatch({ type: 'is_Loading' })
                console.log('updating quantity');

                await axios.post(quantityApi, { 'token': token, item: { id: id, quantity: quantity - 1, shade } })
                    .then((res) => {
                        console.log(res.data);
                        getCartData()

                    })
                    .catch((err) => {
                        console.log(err);

                        dispatch({ type: 'no_Loading' })
                    })


            }

            updateQuantity(id, quantity, shade)

        }
        if (quantity == 1) {
            console.log('quantity 1');
            // prompt()

            // if (confirm('Are you sure you want to remove from cart?')) {

            //     removeItem(id, title, shade, quantity, price)

            // } else {
            //     console.log('removing');
            // }



            confirm('Are you sure?', {
                description: 'Would you like to remove this item from the list?',
                confirmLabel: 'Yes',
                abortLabel: 'No'
            })
                .then(function () {
                    return console.log('yes');
                })
                .fail(function () {
                    return console.log('no');
                });

            // var response = confirm("Do you want to proceed with this book?  Click OK to proceed otherwise click Cancel.");
            // if (response == true) {
            //     alert("A fine choice!")
            // } else {
            //     alert("A not fine choice!")
            // }

        }
    };



























    // Product details page 2 //

    const [ProductId, setProductId] = useState(null)
    const previousValue = useRef(null);


    useEffect(() => {
        previousValue.current = ProductId;
    }, [ProductId]);





    // console.log(id,'iddd');

    const handleClick = async (productId) => {

        // console.log(productId);

        dispatch({ type: 'is_Loading' })

        // console.log();
        localStorage.setItem('Pid', productId);

        // setquery((prev) => prev)
        setProductId(productId)
        console.log(ProductId);
        console.log(previousValue);


        await axios.get(`https://fakestoreapi.com/products/${productId}`)
            .then((res) => {
                console.log(res.data)
                dispatch({
                    type: "Product_Data",
                    payload: {
                        Data: res.data
                    }
                })
                    // navigate('/details')

                    .catch((err) => {
                        console.log(err);

                        dispatch({ type: 'no_Loading' })
                    })
            })
        dispatch({ type: 'no_Loading' })

    }




    // useEffect(() => {
    //     handleClick()
    // }, [])











    return (
        <CartContext.Provider value={{
            ...state, removeItem, data, setdata, increase, decrease,
            quantity, SearchProduct, submitHandler, query, setquery, updatedCart, addToCart, wishlist,
            addToWishlist, removeWishlist, menuData, getCartData, search,
            ...state, handleClick, cartActive, setcartActive, clicked, available,
            setavailable, buyNow, checkProduct, checkShade, pathName, getCategoryData,
            addedtowishlist, checkwishlist, alreadyWishlist,
            buynowbutton, cart, remove, updateQuantity, onchangeSearch,
            searchFilter
        }}>
            {children}
        </CartContext.Provider>
    )


}


const useGlobalContext = () => {
    return useContext(CartContext)
}


export { Context, CartContext, useGlobalContext };
