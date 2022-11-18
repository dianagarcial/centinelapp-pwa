
import { Navbar } from "../../navbar"
import React from "react";
import "../../../styles/boton.css"
import "../../../styles/styles.css"
import "../../../styles/login.css"
import { Header } from "../../header"
// import { SelectCreacion } from "../../selectCreacion"
import { useRamasStore } from "../../../Hooks"
// import { useSelector } from 'react-redux';
import { useEffect } from 'react'
// import { BotonFlotante } from "../../btn-flotante"
 import { useNavigate, useParams } from 'react-router-dom';
import { Button } from "@mui/material"
import { useSelector } from "react-redux"
import swal from 'sweetalert';


export const RamaSel = () => {
    const navigate = useNavigate();
    const params = useParams();
    const { startListarRamas, startDeleteRama} = useRamasStore();
    const { ramas } = useSelector(state => state.rama);
    const ramaActual= ramas.find(rama => rama._id ===params._id)
    

    const actualizar = (idrama) => (e) => {
        e.preventDefault();
        navigate(`/act-rama/${ idrama }`)
    }
    function eliminar(e) {
        e.preventDefault();


        swal({
            title: "Borrar rama",
            text: "¿Esta seguro de borrar todo el contenido de la rama?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    startDeleteRama();


                } else {
                    return
                }
            });
    }

    // const publi = (idrama) => (e) => {
    //     e.preventDefault();
    //     navigate(`/rama/${ idrama }`)
    //   }

      
    
    
      

    
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
                    <h1>{ramaActual?.nombre}</h1>
                    
                
                </div>
                <Button variant="contained" color="primary" onClick={actualizar(ramaActual?._id)} >Actualizar</Button>
                <Button variant="outlined" color="primary" onClick={eliminar} >Eliminar</Button>

            </div>
            </div>
            <Navbar />
        </div>


    )
}