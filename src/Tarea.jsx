import { useState } from "react";


function Tarea({id,tarea,estado,borrarTarea,estadoTarea,editarTarea}){

    let [estadoEditar,setEstadoEditar] = useState(false);
    let [texto,setTexto] = useState(tarea);
    let [textoTemporal, setTextoTemporal] = useState(tarea);


    return (
        <div className="tarea">
            <h3 className={ !estadoEditar ? "visible" : ""}>{tarea}</h3>

            <input type="text" value={ textoTemporal }
                className={ estadoEditar ? "visible" : ""}
                onChange={ event => {
                    setTextoTemporal(event.target.value);
                }}
            />



            <button className={ `boton ${ estadoEditar ? "borrar" : "cancelar"}`}
                onClick={ event => {
                    console.log(estadoEditar,id);

                    if( !estadoEditar){
                        fetch("https://ceidwfs24-esa-tareas-back.onrender.com/tareas/borrar", 
                            {
                                method : "DELETE",
                                body : JSON.stringify({id}),
                                headers : {
                                    "Content-type" : "application/json"
                                }
                            }
                        )
                        .then( respuesta => respuesta.json() )
                        .then( respuesta => {
                            //console.log(respuesta);
                            borrarTarea(id);
                        });

                    } else if( estadoEditar ){
                        //console.log("click");
                        setEstadoEditar(false);
                        setTextoTemporal(texto);
                    }
                }}
            >{ !estadoEditar ? "borrar" : "cancelar"}</button>



            <button className={ `boton ${ estadoEditar == false ? "editar" : "editando" }` }
                onClick={event => {
                    setEstadoEditar(!estadoEditar);
                    if( estadoEditar ){
                        fetch("https://ceidwfs24-esa-tareas-back.onrender.com/tareas/actualizar/texto",
                            {
                                method : "PUT",
                                body : JSON.stringify({id}),
                                headers : {
                                    "Content-type" : "application/json"
                                }
                            }
                        )
                        .then( respuesta => respuesta.json())
                        .then( respuesta => {
                            console.log(respuesta);
                            editarTarea(id);
                        })
                        setTexto(textoTemporal);
                    }
                }}
            >{!estadoEditar ? "editar" : "OK"}</button>



            <button
                onClick={ event => {
                    fetch("https://ceidwfs24-esa-tareas-back.onrender.com/tareas/actualizar/estado",
                        {
                            method : "PUT",
                            body : JSON.stringify({id}),
                            headers : {
                                "Content-type" : "application/json"
                            }
                        }
                    )
                    .then( respuesta => respuesta.json())
                    .then( respuesta => {
                        //console.log(respuesta);
                        estadoTarea(id);
                        console.log(estado);
                    })
                    
                    }}
                className={ `boton estado ${ estado ? "terminada" : "" }` }
            ><span></span></button>



            <p className={ !estadoEditar ? "" : "visible"}>editando...</p>

        </div>
    )
}


export default Tarea