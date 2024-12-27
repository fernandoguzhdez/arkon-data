import React from 'react';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useState } from 'react';
import '../styles/TableListas.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { TimePicker } from 'react-ios-time-picker';
import Alert from 'react-bootstrap/Alert';

export function NavBar({ agregarTarea }) {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);;
    const handleShow = () => setShow(true);
    let [hora, setHora] = useState(2);
    const [titulo, setTitulo] =useState('aqui va a ir el titulo');
    const [descripcion, setDescripcion] = useState('esta es una descripcion');
    const [value, setValue] = useState('02:00');

    const onChange = (timeValue) => {
        setValue(timeValue);
        setHora(parseInt(timeValue.charAt(0) + timeValue.charAt(1)));
        console.log(timeValue)
    }

    const nuevaTarea = () => {
        agregarTarea(titulo, descripcion, value)
        handleClose()
    }

    return (
        <Navbar bg="light" expand="lg">
            <Container fluid>
                <Navbar.Brand href="#">Tareas</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                    >
                        <Nav.Link onClick={handleShow}>Agregar Tarea</Nav.Link>

                    </Nav>
                    <Form className="d-flex">
                        <Form.Control
                            type="search"
                            placeholder="Search"
                            className="me-2"
                            aria-label="Search"
                        />
                        <Button variant="outline-success">Search</Button>
                    </Form>
                </Navbar.Collapse>

                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Agregar nueva tarea</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label>Titulo</Form.Label>
                                <Form.Control type="text" placeholder="Titulo de la tarea" onChange={(e) => {setTitulo(e.target.value)}}/>
                            </Form.Group>

                            <Form.Group className="mb-3" >
                                <Form.Label>Descripcion</Form.Label>
                                <Form.Control as="textarea" rows={3} placeholder="Descripcion de la tarea" onChange={(e) => {setDescripcion(e.target.value)}} />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Define un tiempo no mayor a 2 hrs.</Form.Label>
                                <TimePicker onChange={onChange} value={value} className="d-table" />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Cerrar
                        </Button>
                        { hora >'2' ? <strong>El tiempo seleccionado debe maximo 2hrs.</strong> : <Button variant="primary" onClick={nuevaTarea}>Agregar</Button>}
                    </Modal.Footer>
                </Modal>
            </Container>
        </Navbar>
    );
}

export default NavBar;