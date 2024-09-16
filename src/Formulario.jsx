import { useState } from "react";


function Formulario({nuevaTarea}){

    let [textoTemporal,setTextoTemporal] = useState("que hay que hacer");
    let [inputTarea,setInputTarea] = useState(textoTemporal);
    let [count,setCount] = useState(true);

    
    return (
        <form
            onSubmit={ event => {
                event.preventDefault();
                fetch("https://ceidwfs24-esa-tareas-back.onrender.com/tareas/nueva", 
                    {
                        method :  "POST",
                        body : JSON.stringify({tarea : inputTarea}),
                        headers : {
                            "Content-type" : "application/json"
                        }
                    })
                    .then(respuesta => respuesta.json())
                    .then((id) => {
                        console.log(id);
                        nuevaTarea({ id : id, tarea : inputTarea });
                    })

                setInputTarea(textoTemporal);
                setCount(true);
            }}
        >

            <input type="text" value={inputTarea}
                onClick={ event => {
                    if( count ){
                        setCount(!count);
                        setInputTarea("");
                    }
                }}
                onChange={ event => {
                    setInputTarea(event.target.value)
                }}
            />

            <input type="submit" defaultValue="crear tarea"/>

        </form>
    )
}


export default Formulario