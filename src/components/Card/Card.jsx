import React from 'react'
import classes from './Card.module.css'

//bootstrap
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { Image } from 'react-bootstrap';
//

import { Link } from 'react-router-dom';

const CARD = ({ name, email, dob, country, avatar, id, handleEdit, handleDelete }) => {

  const handleEditClick = () => {
    handleEdit(name, email, dob, country, avatar, id)
  }

  const handleDeleteClick = () => {
    handleDelete(id)
  }

  return (
    <>
      <Card className={classes.card}>
        <Card.Body className={classes.cardBody}>
          <Image src={avatar} className={classes.cardImg} roundedCircle />
          <Card.Title className={classes.cardTitle}>{name}</Card.Title>

        </Card.Body>
        <ListGroup className="list-group-flush">
          <ListGroup.Item>{email}</ListGroup.Item>
          <ListGroup.Item>{dob}</ListGroup.Item>
          <ListGroup.Item>{country}</ListGroup.Item>
        </ListGroup>
        <Card.Body>
          <Card.Link as={Link} to="/update" onClick={(e) => handleEditClick(e)}>Edit</Card.Link>
          <Card.Link as={Link} onClick={(e) => handleDeleteClick(e)} >Delete</Card.Link>
        </Card.Body>
      </Card>


    </>
  )
}

export default CARD