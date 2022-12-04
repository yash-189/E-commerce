import React from 'react'

const Colorbtn = ({color}) => {
  return (
    <button className="border-2 border-gray-300 ml-1 bg-indigo-500 rounded-full w-6 h-6 focus:outline-none">
        {color}
    </button>
  )
}

export default Colorbtn