import React from 'react'

const Wish = ({onClick,css,svgcss, added}) => {
    return (
        <>
            <button className={`hover:scale-105 visited:bg-gray-800 rounded-full  bg-gray-200  border-0 inline-flex items-center justify-center   ${css}`} onClick={onClick}>
                <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className={`${svgcss} `} viewBox="0 0 24 24">
                    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                </svg>
                
            </button>

        </>
    )
}

export default Wish