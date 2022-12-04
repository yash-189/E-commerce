import React from 'react'

const Btn3 = ({name,width, height,css, onClick}) => {
  return (
    <button className={`btn3  text-gray-700 bg-gray-200 border-0 ${css} px-2 focus:outline-none  hover:bg-gray-300 rounded-xl ${width} ${height}`} onClick={onClick}>{name}</button>
  )
}

Btn3.defaultProps = {
  // css: "ml-4",
  // type: "button",
  // height: "40px"
}

export default Btn3