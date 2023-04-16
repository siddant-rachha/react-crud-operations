import React, { useEffect, useState } from 'react'
import classes from './Home.module.css'
import { deletePerson, getListPerson } from '../../api'


//bootstrap
import { Container, Spinner } from 'react-bootstrap'
import Card from '../../components/Card/Card'
//

import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'


const Home = ({ handleEdit }) => {

    const [listPersons, setListPersons] = useState(null)

    const navigate = useNavigate()


    const getPersonList = async () => {

        const list = await getListPerson()
        setListPersons(list)
    }
    useEffect(() => {

        getPersonList()

    }, [])


    const handleDelete = async (id) => {
        try {
            await deletePerson(id)
            getPersonList()
            toast.success("Person Deleted")
        }
        catch (e) {
            console.log("Error while deleting: ", e)
        }
    }

    return (
        <>
            <Container className={classes.container}>

                {
                    //show spinner till null
                    listPersons == null ? <Spinner variant='primary' />
                        :

                        //if array person found
                        (listPersons.length > 0) ?
                            listPersons.map((person) => {
                                return <Card handleEdit={handleEdit} key={person.id} handleDelete={() => handleDelete(person.id)}
                                    name={person.name} dob={person.dob} country={person.country} avatar={person.avatar}
                                    email={person.email} id={person.id} />
                            })

                            :
                            //if array empty
                            <h4 className='mt-5'>No Persons found. Add a Person</h4>
                }
            </Container>
        </>
    )
}

export default Home