import './App.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import TableListas from './components/TableListas';
import NavBar from './components/NavBar';
import axios from "axios";
import React, { useState, useEffect } from "react";


const baseURL = "http://localhost:3000/api/tareas";


function App() {

  let [tareas, setTareas] = useState();
  let [tarea, setTarea] = useState();
  const [time, setTime] = useState(0); // time in seconds
  const [isActive, setIsActive] = useState(false);
  const [initialTime, setInitialTime] = useState(time);



  useEffect((e) => {
    if (time === 0 && isActive) return finalizarTarea();
    cargarDatos();

    if (time > 0 && isActive) {
      const interval = setInterval(() => {
        setTime(time - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [time, isActive]);

  const cargarDatos = () => {
    axios.get(baseURL).then((response) => {
      setTareas(response.data);
      console.log(tareas)
    });
  }

  if (!tareas) return null;

  const agregarTarea = (titulo, descripcion, tiempoDefinido) => {
    axios
      .post(baseURL, {
        Titulo: titulo,
        Descripcion: descripcion,
        TiempoDefinido: tiempoDefinido,
      })
      .then((response) => {
        cargarDatos();
      });
  }

  const eliminarTarea = (id, e) => {
    e.preventDefault();
    axios
      .delete(`${baseURL}/${id}`)
      .then(() => {
        alert("Tarea Eliminada!");
        setTareas(tareas.filter(tarea => tarea.id !== id));
      });
  }

  const getTime = () => {
    const hours = Math.floor(time / 3600);
    const minutes = parseInt((time % 3600) / 60);
    const seconds = parseInt((time % 60));
    return `${hours < 10 ? "0" + hours : hours}:${minutes < 10 ? "0" + minutes : minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
  }

  const toggleTimer = () => {
    if (tarea != null) {
      setIsActive(!isActive);
    } else {
      setTarea(null)
    }
  }

  const resetTimer = () => {
    if (tarea != null) {
      setTime(initialTime);
      setIsActive(false);
      actualizarTarea();
    } else {
      setTarea(null)
    }
  }

  const realizarTarea = (tarea) => {
    setTarea(tarea);
    setTime(parseInt(tarea.TiempoRestante.charAt(0)) + parseInt(tarea.TiempoRestante.charAt(1)) * 3600 + parseInt(tarea.TiempoRestante.charAt(3) + tarea.TiempoRestante.charAt(4)) * 60 + parseInt(tarea.TiempoRestante.charAt(6) + tarea.TiempoRestante.charAt(7)));
  }

  const actualizarTarea = () => {
    axios
      .put(`${baseURL}/${tarea.id}`, {
        Titulo: tarea.Titulo,
        Descripcion: tarea.Descripcion,
        TiempoDefinido: tarea.TiempoDefinido,
        TiempoRestante: getTime(),
        Estado: tarea.Estado || 'Pendiente',
        TipoDuracion: tarea.TipoDuracion
      })
      .then((response) => {
        cargarDatos();
        setTarea();
      });
  }

  const finalizarTarea = () => {
    console.log('Finalizando' + ' ' + tarea.id + ' ' + getTime())
    axios
      .put(`${baseURL}/${tarea.id}`, {
        Titulo: tarea.Titulo,
        Descripcion: tarea.Descripcion,
        TiempoDefinido: tarea.TiempoDefinido,
        TiempoRestante: getTime(),
        Estado: tarea.Estado = 'Finalizado',
        TipoDuracion: tarea.TipoDuracion
      })
      .then((response) => {
        cargarDatos();
        setTarea();
      });

  }

  return (
    <div className="App">
      <NavBar agregarTarea={agregarTarea} />
      <Container fluid>
        <Row>
          <TableListas
            setTareas={tareas}
            eliminarTarea={eliminarTarea}
            realizarTarea={realizarTarea}
            toggleTimer={toggleTimer}
            resetTimer={resetTimer}
            getTime={getTime}
            initialTime={initialTime}
            isActive={isActive}
            tarea={tarea}
          />
        </Row>
      </Container>
    </div>
  );
}

export default App;
