import React from 'react'

const Btn = ({ width, name, onClick, isLoading }) => {
    const style = {
        background: "linear-gradient(90deg, #b388eb, #8093f1)",
        color: "white",
        borderRadius: "12px",

        width: `${width}%`,
        height: "40px",
        overflow: "hidden",
        textDecoration: "none",
        transition: ".2s transform ease-in-out",
        willChange: "transform",
        zIndex: "0",
        fontFamily: "Roboto, sans-serif"
    }
    return (
        <>
            {/* <a href={props.link}> */}
            <button type={'submit'} className={`btn   ${isLoading ? ' pointer-events-none opacity-80  ' : ''}`} style={style} onClick={onClick}  >

                {isLoading ?
                    <div class="cssload-jumping">
                        <span></span><span></span><span></span><span></span><span></span>
                    </div>
                    :

                    name
                }


            </button>

            {/* </a> */}
        </>
    )
}


Btn.defaultProps = {
    width: "110px",
    type: "button"
}


export default Btn