import React from 'react'
import classes from './Card.module.css'

//bootstrap
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { Image } from 'react-bootstrap';
//

import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';


const CARD = ({ name, email, dob, country, avatar, id, handleEdit, handleDelete }) => {

  const handleEditClick = () => {
    handleEdit(name, email, dob, country, avatar, id)
  }

  const handleDeleteClick = () => {
    handleDelete(id)
  }

  return (
    <>
      <Card className={`${classes.card}` + " shadow"}>
        <Card.Body className={classes.cardBody}>
          <Image src={avatar} className={classes.cardImg} roundedCircle />
          <Card.Body className={classes.icons}>
            <Card.Link as={Link} to="/update" onClick={(e) => handleEditClick(e)}><FontAwesomeIcon className={classes.editIcon} icon={faEdit} /></Card.Link>
            <Card.Link as={Link} onClick={(e) => handleDeleteClick(e)} ><FontAwesomeIcon className={`${classes.deleteIcon}` + " text-danger"} icon={faTrash} /></Card.Link>
          </Card.Body>

        </Card.Body>
        <ListGroup className="list-group-flush">
          <ListGroup.Item>Name: {name}</ListGroup.Item>
          <ListGroup.Item>Email: {email}</ListGroup.Item>
          <ListGroup.Item>Dob: {dob}</ListGroup.Item>
          <ListGroup.Item>Country: {country}</ListGroup.Item>
        </ListGroup>

      </Card>


    </>
  )
}

export default CARD