import React from 'react'
import classes from './Update.module.css'

import Form from '../../components/Form/Form'
import { Container } from 'react-bootstrap'

const Update = ({editPerson}) => {
    return (
        <Container className={classes.container}>
            <Form editPerson={editPerson} />
        </Container>
    )
}

export default Update