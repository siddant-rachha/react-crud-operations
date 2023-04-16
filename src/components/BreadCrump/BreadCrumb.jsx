import React from 'react'
import classes from './BreadCrumb.module.css'
import { Breadcrumb } from 'react-bootstrap'
import { Link, useLocation } from 'react-router-dom'

const BreadCrump = () => {

    const location = useLocation()

    return (
        <nav aria-label="breadcrumb" className={classes.breadcrumb}>
            <ol className="breadcrumb">Location: &nbsp;
                <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                {location.pathname == "/create" && <li className="breadcrumb-item"><Link to="/create">Create</Link></li>}
                {location.pathname == "/update" && <li className="breadcrumb-item"><Link to="/update">Update</Link></li>}
            </ol>
        </nav>
    )
}

export default BreadCrump