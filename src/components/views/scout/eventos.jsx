
import { Navbar } from "../../navbar"

import "../../../styles/boton.css"
import "../../../styles/styles.css"
import "../../../styles/login.css"
import { Header } from "../../header"
import { SelectCreacion } from "../../selectCreacion"
import { useRamasStore, useScoutStore } from "../../../Hooks"
import { useSelector } from 'react-redux';
import { useEffect } from 'react'


import { useNavigate } from 'react-router-dom';

export const EventoGeneralScout = () => {


    const {user} = useSelector(state=>state.auth);
 
    const { ramas } = useSelector(state => state.rama);
 
    const { ramaIdScout } = useSelector(state => state.rama);
    const ramascoutes = ramas.find(rama => rama._id === ramaIdScout);

    const navigate = useNavigate();
    const {startListarRamaIDValue, startListarRamas}= useRamasStore();
    const { startListScouts } = useScoutStore();

    const publi = (idrama) => (e) => {
        e.preventDefault();
        navigate(`/evento-rama/${ idrama }`)
      }

      function general(e) {
        e.preventDefault();
         
         navigate(`/evento-General`)
    }
    
    
      

    
    useEffect(() => {
        startListarRamas();
        startListScouts()
        // eslint-disable-next-line react-hooks/exhaustive-deps
        startListarRamaIDValue(user?.uid)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className="contenido">
            <div className="conte-general-rela">
                <Header />
                <div className="conte-imp">
                <div className="conte-marg-form">
                    <h1>Eventos</h1>
                    <h3>Selecciona una rama para ver sus eventos</h3>
                    <SelectCreacion  nombre="General" desc="Publicaciones para todos" onClick={general}/>
                  

                     <SelectCreacion key ={ramascoutes?._id} nombre={ramascoutes?.nombre} desc={ramascoutes?.edadMin + "-" + ramascoutes?.edadMax + " años"} onClick={publi(ramascoutes?._id)}/>


                          
                    

                    
                </div>
            </div>
            </div>
            <Navbar />
        </div>


    )
}