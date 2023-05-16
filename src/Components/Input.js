import React from 'react'

const Input = ({...props}) => {
    return (
        // <input className={`${style.inp}`} {...props}/>
        <input {...props}/>
    )
}

export default Input