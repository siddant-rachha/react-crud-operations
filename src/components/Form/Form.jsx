import React, { useEffect, useState } from 'react'
import classes from './Form.module.css'
import { createPerson, updatePerson } from '../../api';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


import { toast } from 'react-toastify';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { useLocation, useNavigate } from 'react-router-dom';
import { Image } from 'react-bootstrap';

const FORM = ({ editPerson }) => {

    const [name, setName] = useState(null)
    const [nameValid, setNameValid] = useState(false)

    const [email, setEmail] = useState(null)
    const [emailValid, setEmailValid] = useState(false)

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
            setEmailValid(true)
            setNameValid(true)
        }
    }, [])


    const handleFile = (e) => {
        toast.dismiss()
        //check if png or jpg
        const file = e.target.files[0];
        if (file && (file.type === "image/jpeg" || file.type === "image/png")) {


            //check size
            const MAX_FILE_SIZE = 300000; // 300KB
            if (file.size > MAX_FILE_SIZE) {
                toast.error("Upload less than 300KB");
                e.target.value = null; // Reset the input field
                return;
            }

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
            e.target.value = null;
            toast.error("Please select a JPEG/PNG image.");
        }


    }

    const handleEmail = (e) => {
        toast.dismiss()

        const inputEmail = e.target.value;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (emailRegex.test(inputEmail)) {
            setEmail(inputEmail);
            setEmailValid(true);
        } else {
            if (e.type == "blur") {
                toast.error("Please enter a valid email address.");
            }
            if (e.type == "change") {
                setEmailValid(false)
            }
        }
    }

    const handleName = (e) => {
        toast.dismiss()
        const inputName = e.target.value.trim();
        if (inputName.length > 3) {
            setName(inputName)
            setNameValid(true)
        }
        else {
            if (e.type == "blur") {
                toast.error("Please enter a name input");
            }

            if (e.type == "change") {
                setNameValid(false)
            }

        }

    }

    const handleCountry = (e) => {
        toast.dismiss()
        const inputCountry = e.target.value;
        if (inputCountry == "") {
            toast.error("Please enter a country input");
        }

    }

    const handleDob = (e) => {
        toast.dismiss()
        const inputDob = e.target.value;
        if (inputDob == "") {
            toast.error("Please enter a Dob input");
        }

    }

    const handleSubmit = (e) => {
        e.preventDefault()
        debugger

        if (nameValid == false && emailValid == false
            && dob == null && country == null && file == null) {
            toast.error("Please enter all inputs correctly");
            return
        }
        else {

            //create
            if (id == null) {
                const person = { name, email, dob, country, avatar: file }
                createPerson(person)
                navigate("/")
                toast.success("Person Added")
            }
            //update
            else {
                const person = { name, email, dob, country, avatar: file }
                updatePerson(person, id)
                navigate("/")
                toast.success("Person Updated")
            }

        }
    }



    return (
        <Form className={classes.form}>
            {console.log(name)}
            <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label>Name</Form.Label>
                <FontAwesomeIcon icon={faCheckCircle} className={`${classes.icon}` + " " + `${nameValid ? classes.active : ""}`} />
                <Form.Control type="text" placeholder="Enter Name" onChange={(e) => handleName(e)} onBlur={(e) => handleName(e)} defaultValue={name ? name : ""} />

            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <FontAwesomeIcon icon={faCheckCircle} className={`${classes.icon}` + " " + `${emailValid ? classes.active : ""}`} />
                <Form.Control type="email" placeholder="Enter email" onChange={(e) => handleEmail(e)} onBlur={(e) => handleEmail(e)} defaultValue={email ? email : ""} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicDob">
                <Form.Label>Date of Birth</Form.Label>
                <FontAwesomeIcon icon={faCheckCircle} className={`${classes.icon}` + " " + `${dob ? classes.active : ""}`} />
                <Form.Control type="date" onChange={(e) => setDob(e.target.value)} defaultValue={dob ? dob : ""} onBlur={(e) => handleDob(e)} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicCountry">
                <Form.Label>Country</Form.Label>
                <FontAwesomeIcon icon={faCheckCircle} className={`${classes.icon}` + " " + `${country ? classes.active : ""}`} />
                <Form.Control type="text" placeholder="Enter Country" onChange={(e) => setCountry(e.target.value)} onBlur={(e) => handleCountry(e)} defaultValue={country ? country : ""} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicAvatar">
                <Form.Label>Avatar</Form.Label>
                <FontAwesomeIcon icon={faCheckCircle} className={`${classes.icon}` + " " + `${file ? classes.active : ""}`} />
                <Form.Control type="file" onChange={(e) => handleFile(e)} />
                <Form.Text className="text-muted">
                    Select less than 300KB jpeg/png. Select Square image for best results.
                </Form.Text>
            </Form.Group>

            {
                file ?
                    <Form.Group className="mb-3" controlId="formBasicAvatar">
                        <Form.Label>Preview Avatar</Form.Label>
                        <Image src={file} className={classes.cardImg} roundedCircle />
                    </Form.Group> : null
            }


            <Button variant="primary" type="submit" className={classes.submit} onClick={(e) => handleSubmit(e)}>
                {id == null ? "Create" : "Update"}
            </Button>

        </Form>
    )
}

export default FORM