import React, { useEffect, useState } from 'react'
import classes from './Form.module.css'
import { createPerson, updatePerson } from '../../api';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


import { toast } from 'react-toastify';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { useLocation, useNavigate } from 'react-router-dom';

const FORM = ({ editPerson }) => {

    const [name, setName] = useState(null)
    const [email, setEmail] = useState(null)
    const [dob, setDob] = useState(null)
    const [country, setCountry] = useState(null)
    const [file, setFile] = useState(null)
    const [id, setId] = useState(null)

    const navigate = useNavigate()
    const location = useLocation()


    //update
    useEffect(() => {

        //if user tries to visit update without edit options, then navigate
        if (editPerson == null && location.pathname == "/update") navigate("/create")

        if (editPerson != null) {
            setName(editPerson.name)
            setEmail(editPerson.email)
            setDob(editPerson.dob)
            setCountry(editPerson.country)
            setFile(editPerson.avatar)
            setId(editPerson.id)
        }
    }, [])


    const handleFile = (e) => {
        toast.dismiss()
        //check if png or jpg
        const file = e.target.files[0];
        if (file && (file.type === "image/jpeg" || file.type === "image/png")) {
            //base64 string
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                setFile(reader.result);
            };
            reader.onerror = (error) => {
                toast.error("Something went wrong");
            };
        } else {
            e.target.value = "";
            toast.error("Please select a JPEG/PNG image.");
        }


    }

    const handleEmail = (e) => {
        toast.dismiss()

        const inputEmail = e.target.value;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailRegex.test(inputEmail)) {
            setEmail(inputEmail);
        } else {
            toast.error("Please enter a valid email address.");
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if ((name && email && dob && country && file) == null) {
            toast.error("Please enter all inputs correctly");
        }
        else {

            //create
            if (id == null) {
                const person = { name, email, dob, country, avatar: file }
                createPerson(person)
            }
            //update
            else {
                const person = { name, email, dob, country, avatar: file}
                updatePerson(person, id)
            }

        }
    }



    return (
        <Form className={classes.form}>
            <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label>Name</Form.Label>
                {/* <FontAwesomeIcon icon={faCoffee} /> */}
                <Form.Control type="text" placeholder="Enter Name" onChange={(e) => setName(e.target.value)} defaultValue={name ? name : ""} />

            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" onBlur={(e) => handleEmail(e)} defaultValue={email ? email : ""} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicDob">
                <Form.Label>Date of Birth</Form.Label>
                <Form.Control type="date" onChange={(e) => setDob(e.target.value)} defaultValue={dob ? dob : ""} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicCountry">
                <Form.Label>Country</Form.Label>
                <Form.Control type="text" placeholder="Enter Country" onChange={(e) => setCountry(e.target.value)} defaultValue={country ? country : ""} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicAvatar">
                <Form.Label>Avatar</Form.Label>
                <Form.Control type="file" onChange={(e) => handleFile(e)} />
            </Form.Group>

            <Button variant="primary" type="submit" className={classes.submit} onClick={(e) => handleSubmit(e)}>
                Submit
            </Button>

        </Form>
    )
}

export default FORM