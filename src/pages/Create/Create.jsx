import React from 'react'
import classes from './Create.module.css'

import Form from '../../components/Form/Form'
import { Container } from 'react-bootstrap'

const Create = () => {
    return (
        <Container className={classes.container}>
            <Form />
        </Container>
    )
}

export default Create