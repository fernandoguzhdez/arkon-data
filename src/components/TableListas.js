import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import '../styles/TableListas.css';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import ProgressBar from 'react-bootstrap/ProgressBar';
import CloseButton from 'react-bootstrap/CloseButton';
import Badge from 'react-bootstrap/Badge';
import {
    Timer,
    Countdown,
    Buttons,
  } from "../components/styles";

export function TableListas({ setTareas, eliminarTarea, realizarTarea, toggleTimer, resetTimer, getTime, initialTime, isActive, tarea }) {

    const [index, setIndex] = useState([]);
    const [show, setShow] = useState(false);
    const [botonCerrar, setBotonCerrar] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const now = 60;

    const rellenarCompletado = (TiempoRestante, TiempoDefinido) => {
        TiempoRestante = parseInt(TiempoRestante.charAt(0)) + parseInt(TiempoRestante.charAt(1)) * 3600 + parseInt(TiempoRestante.charAt(3) + TiempoRestante.charAt(4)) * 60 + parseInt(TiempoRestante.charAt(6) + TiempoRestante.charAt(7));
        TiempoDefinido = parseInt(TiempoDefinido.charAt(0)) + parseInt(TiempoDefinido.charAt(1)) * 3600 + parseInt(TiempoDefinido.charAt(3) + TiempoDefinido.charAt(4)) * 60;

        return parseInt(100 - (TiempoRestante * 100) / TiempoDefinido);
    }

    return (
        <Container className='contenedor-table'>
            <Tab.Container id="list-group-tabs-example">
                <Row className='m-5'>
                    {
                        setTareas.map((tar) =>
                            <Col sm={4} key={tar.id}>
                                <Container className='m-3'>

                                    <ListGroup >
                                        <ListGroup.Item action href={'#' + tar.id} className='m-2'>
                                            <div onClick={() => { setIndex(tar); handleShow(); realizarTarea(tar) }}>
                                                <strong>{tar.Titulo}</strong>
                                                <ProgressBar now={rellenarCompletado(tar.TiempoRestante, tar.TiempoDefinido)} label={`${rellenarCompletado(tar.TiempoRestante, tar.TiempoDefinido)}%`} />
                                            </div>

                                            <CloseButton variant="black" className='boton-cerrar' onClick={(event) => eliminarTarea(tar.id, event)} />
                                        </ListGroup.Item>
                                    </ListGroup>
                                </Container>
                            </Col>
                        )
                    }
                </Row>
            </Tab.Container>

            <Offcanvas show={show} onHide={handleClose} eventKey={'#' + index.id} placement='bottom' backdrop='false' className='contenedor-canvas'>
                <Offcanvas.Header closeButton>
                    <Row className='titulo-canvas'>
                        <Col><Offcanvas.Title>{index.Titulo}</Offcanvas.Title></Col>
                        <Col>{index.Estado}</Col>
                    </Row>

                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Row>
                        <Col>{index.Descripcion}</Col>
                        <Col><Badge pill bg="secondary">{index.TiempoDefinido}</Badge></Col>
                        <Col><Badge pill bg="info">{index.TiempoRestante}</Badge></Col>
                        <Col><Badge pill bg="warning">{index.TipoDuracion}</Badge></Col>
                    </Row>
                    <Row>
                        <Timer initialTime={initialTime}>
                            <Countdown>
                                <h3>
                                    {getTime()}
                                </h3>
                            </Countdown>
                            <Buttons>
                                <button onClick={toggleTimer} >{isActive ? 'stop' : 'start'}</button>
                                <button onClick={() => {resetTimer(); console.log(setTareas)}}>Detener y guardar</button>
                            </Buttons>
                        </Timer>
                    </Row>
                </Offcanvas.Body>
                <Button className='rounded-0' onClick={() => realizarTarea(index)}>Realizar Tarea</Button>
            </Offcanvas>
        </Container >
    );
}

export default TableListas;