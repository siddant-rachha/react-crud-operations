import logo from './logo.svg';
import classes from './App.module.css'
import Home from './pages/Home/Home';
import NavBar from './components/NavBar/NavBar';
import Create from './pages/Create/Create';
import { Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import Toaster from './components/Toaster/Toaster';
import Update from './pages/Update/Update';
import Footer from './components/Footer/Footer';
import { Breadcrumb } from 'react-bootstrap';
import BreadCrump from './components/BreadCrump/BreadCrumb';



function App() {

  const [editPerson, setEditPerson] = useState(null)

  const handleEdit = (name, email, dob, country, avatar, id) => {
    setEditPerson({ name, email, dob, country, avatar, id })
  }

  return (
    <>
      <div className={classes.flexWrapper}>
        <NavBar />

        <BreadCrump />

        <Routes>
          <Route path="/" element={<Home handleEdit={handleEdit} />} />
          <Route path="/create" element={<Create />} />
          <Route path="/update" element={<Update editPerson={editPerson} />} />

          <Route path="*" element={<h1 className='text-center mt-5'>404 page not found</h1>} />
        </Routes>

        <Footer />

        <Toaster />

      </div>
    </>
  );
}

export default App;
