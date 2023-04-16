import React from 'react'
import classes from './Footer.module.css'

const Footer = () => {
    return (
        <div className={`${classes.footer}` + " " + "bg-primary text-white"}><a href="https://github.com/siddant-rachha/react-crud-operations">Source code</a></div>
    )
}

export default Footer