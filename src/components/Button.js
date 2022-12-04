import React from 'react'

const Button = ({name,width}) => {
  return (
    <button className={`text-white bg-sky-400 border-0 py-2 px-5 focus:outline-none hover:bg-sky-600 rounded text-md ${width}`}>{name}</button>
  )
}

export default Button