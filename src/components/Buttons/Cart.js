import React,{useState} from 'react'
import { useGlobalContext } from '../CartContext'

const Cart = ({onClick, css, svgcss,id,checkItem}) => {
const {updatedCart, itemInCart,cartActive, clicked} = useGlobalContext();


// const [check, setcheck] = useState([])
// const [itemInCart, setitemInCart] = useState(false)

// const checkcartItem = (id)=>{
//     console.log('check');
//     console.log(id);

//     const items = JSON.parse(localStorage.getItem('items'));
//     if (items) {
//         setcheck(items);
//     }


    
//     const filter = check.filter((elem) => {
//         if( elem.id == id){
//             setitemInCart(true)
//         }
//     })

//     console.log(filter);

//     console.log(check);
// }



  return (
    <>

<button className={`hover:scale-105 rounded-full w-10 h-10  p-0 border-0 inline-flex items-center justify-center text-gray-500 ${css}`} onClick={onClick}>
               

               {checkItem? <svg xmlns="http://www.w3.org/2000/svg"className={`bi bi-cart3  ${svgcss}`} fill="currentColor" viewBox="0 0 16 16"> <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l.84 4.479 9.144-.459L13.89 4H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" /> </svg>
                :

                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cart-check-fill" viewBox="0 0 16 16"> <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-1.646-7.646-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L8 8.293l2.646-2.647a.5.5 0 0 1 .708.708z"/> </svg>
  }
                
            </button>
    
    
    
    
    
    </>
  )
}

export default Cart