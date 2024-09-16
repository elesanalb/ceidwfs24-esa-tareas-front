import { useEffect, useState } from 'react'
import Formulario from './Formulario.jsx';
import Tarea from './Tarea.jsx';
import './App.css'

function App() {

    let [tareas,setTareas] = useState([]);

    useEffect( () => {
        fetch("https://ceidwfs24-esa-tareas-back.onrender.com/tareas")
        .then(respuesta => respuesta.json())
        .then(tarea => {
            setTareas(tarea);
            //console.log(tarea);
        })
    }, []);
  

    function nuevaTarea(tarea){
        setTareas([...tareas,tarea]);
    }

    function borrarTarea(id){
        setTareas(tareas.filter( tarea => { return tarea.id != id }));
    }

    function estadoTarea(id){
        setTareas(tareas.map( tarea => {
            if( tarea.id == id){
                tarea.estado = !tarea.estado;
            }
            return tarea;
        }));
        
        console.log(id);
    }

    function editarTarea(id,tarea){
        setTareas(tareas.map( tarea => {
            return tarea;
        }));
        console.log(tareas);
    }

    
    return (<>

        <Formulario nuevaTarea={nuevaTarea}/>

        <section className='tareas'>
            { tareas.map( ({id,tarea,estado}) => { 
                return <Tarea 
                    key={id} id={id} tarea={tarea} estado={estado}
                    borrarTarea={borrarTarea} 
                    estadoTarea={estadoTarea}
                    editarTarea={editarTarea}
                /> 
            })}
        </section>

    </>)
}

export default App