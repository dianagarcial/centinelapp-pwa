
import { Navbar } from "../../navbar"
import React from "react";
import "../../../styles/boton.css"
import "../../../styles/styles.css"
import "../../../styles/login.css"
import { Header } from "../../header"
import { SelectCreacion } from "../../selectCreacion"
import { useRamasStore } from "../../../Hooks"
import { useSelector } from 'react-redux';
import { useEffect } from 'react'
import { BotonFlotante } from "../../btn-flotante"
import { useNavigate } from 'react-router-dom';

export const RamasList = () => {

    const { startListarRamas } = useRamasStore();
    const { ramas } = useSelector(state => state.rama);
   
    const navigate = useNavigate();

    function redireccion(e) {
        e.preventDefault();
        navigate(`/addRama`)
    }

    const publi = (idrama) => (e) => {
        e.preventDefault();
        navigate(`/rama/${ idrama }`)
      }

      
    
    
      

    
    useEffect(() => {
        startListarRamas();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className="contenido">
            <div className="conte-general-rela">
                <Header />
                <div className="conte-imp">
                <div className="conte-marg">
                    <h1>Gestionar ramas</h1>
                    <h3>Selecciona una rama ver su informacion detallada</h3>
                   
                    {
                        ramas.map(rama => {
                            return (

                                <SelectCreacion key={rama._id} nombre={rama.nombre} desc={rama.edadMin + "-" + rama.edadMax + " años"} onClick={publi(rama._id)}/>


                                //<FormControlLabel value={rama._id} control={<Checkbox />} label={rama.nombre} />

                            )


                        })
                    }
                    <BotonFlotante onClick={redireccion}/>

                    
                </div>
                </div>
            </div>
            <Navbar />
        </div>


    )
}