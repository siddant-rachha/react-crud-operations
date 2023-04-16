import React, { useEffect, useState } from 'react'
import classes from './Home.module.css'
import { deletePerson, getListPerson } from '../../api'


//bootstrap
import { Container } from 'react-bootstrap'
import NavBar from '../../components/NavBar/NavBar'
import Card from '../../components/Card/Card'
//

import { useNavigate } from 'react-router-dom'  


const Home = ({ handleEdit }) => {

    const [listPersons, setListPersons] = useState(null)

    const navigate = useNavigate()

    useEffect(() => {

        const getPersonList = async () => {

            const list = await getListPerson()
            setListPersons(list)
        }
        getPersonList()

    }, [])


    const handleDelete = async (id) => {
        try {
            await deletePerson(id)
            navigate(0)
        }
        catch(e){
            console.log("Error while deleting: ", e)
        }
    }

    return (
        <>
            <Container className={classes.container}>

                {
                    listPersons == null ? <h1>Loading</h1>
                        :
                        listPersons.map((person) => {
                            return <Card handleEdit={handleEdit} key={person.id} handleDelete={() => handleDelete(person.id)}
                                name={person.name} dob={person.dob} country={person.country} avatar={person.avatar}
                                email={person.email} id={person.id} />
                        })
                }
            </Container>
        </>
    )
}

export default Home