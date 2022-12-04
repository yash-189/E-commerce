import React from 'react'

const Btn2 = ({width,name,css,height, onClick,type}) => {
    const style = {
        background: "linear-gradient(90deg, #b388eb, #8093f1)",
        color: "white",
        borderRadius: "12px",

        // width: `${width}%`,
        // height: ``,
        overflow: "hidden",
        textDecoration: "none",
        transition: ".2s transform ease-in-out",
        willChange: "transform",
        zIndex: "0",
        // fontFamily: "Roboto, sans-serif"
    }
    return (
        <>
            {/* <a href={props.link}> */}
            <button type={type} className={`${width} ${height} btn2 font-medium ${css}`} onClick={onClick} style={style}>{name}</button>
            {/* </a> */}
        </>
    )
}


Btn2.defaultProps = {
    width: "110px",
    type: "button",
    // height: "40px"
}
    

export default Btn2