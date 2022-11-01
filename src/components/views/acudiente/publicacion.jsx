
import { Navbar } from "../../navbar"

import "../../../styles/boton.css"
import "../../../styles/styles.css"
import "../../../styles/login.css"
import { Header } from "../../header"
import { SelectCreacion } from "../../selectCreacion"
import { useAcudienteStore, useAdminStore } from "../../../Hooks"
import { useSelector } from 'react-redux';
import { useEffect } from 'react'


import { useNavigate } from 'react-router-dom';


export const PublicacionGeneralAcudiente = () => {
    
    const {startListRamasAcudiente}=useAcudienteStore();
    const {acudienteRamas}=useSelector(state => state.acudiente)
    const {user} = useSelector(state=>state.auth);

    
    const navigate = useNavigate();

   
    function publigeneral (e){
        e.preventDefault();
        
         navigate(`/pub-General`)
        }
    const publi = (idrama) => (e) => {
        e.preventDefault();
        navigate(`/pub-rama/${ idrama }`)
        }
    
    useEffect(() => {
        startListRamasAcudiente(user?.uid);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className="contenido">
            <div className="conte-general-rela">
                <Header />
                <div className="conte-imp">
                    <h1>Publicaciones</h1>
                    <h3>Selecciona una rama para ver sus mensajes, en icono + púedes crear una nueva publicacion</h3>
                    <SelectCreacion nombre="General" desc="Publicaciones para todos" onClick={publigeneral}/>
                    {acudienteRamas.map(rama =>{
                        return(
                            <SelectCreacion nombre={rama.nombre} desc={rama.edadMin + "-" + rama.edadMax + " años"} onClick={publi(rama._id)}/>
                        )
                    })

                    }
                    
                    
                    
                

                    
                </div>
            </div>
            <Navbar />
        </div>


    )
}