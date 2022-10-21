
import { Navbar } from "../../navbar"

import "../../../styles/boton.css"
import "../../../styles/styles.css"
import "../../../styles/login.css"
import { Header } from "../../header"
//import { SelectCreacion } from "../../selectCreacion"
import { useAdminStore, useRamasStore, useSuperAdminStore } from "../../../Hooks"
import { useSelector } from 'react-redux';
import { useEffect} from 'react'
//import swal from 'sweetalert';
//import { BotonFlotante } from "../../btn-flotante"
import {useNavigate, useParams } from 'react-router-dom';
import { useEventoStore } from "../../../Hooks/useEventoStore"
import { Eventos } from "../../eventos"


export const EventoRamaView = () => {
    const params = useParams();
    const navigate = useNavigate();
    const {startListEvento}=useEventoStore();
    const {startListarRamasSel}=useRamasStore();
    const { startListSuperAdmin } = useSuperAdminStore();
    const { startListAdmin } = useAdminStore();
     
    const {ramaSel}=useSelector(state => state.rama)
    const {eventos}=useSelector(state => state.evento)
 
    
    let idRama= params._id
      
    var meses = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Di"];

    function convertir(mes) {    
    let res
    var numeroMes = parseInt(mes);
    if(! isNaN(numeroMes) && numeroMes >= 1  && numeroMes <= 12 ) {
        res = meses[numeroMes - 1];
    }
    return res
    }
    
    //const {user} = useSelector(state=>state.auth);
   
    
    const rediEventos = (id) => (e) => {
        e.preventDefault();
        navigate(`/verEvento/${id}`)
    }
    

    
    useEffect(() => {
        startListarRamasSel();
        // eslint-disable-next-line react-hooks/exhaustive-deps
        startListEvento(idRama);
        // eslint-disable-next-line react-hooks/exhaustive-deps
        
        startListAdmin();
        // eslint-disable-next-line react-hooks/exhaustive-deps
        startListSuperAdmin();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className="contenido">
            <div className="conte-general-rela">
                <Header />
                <div className="conte-imp" id="conte-sel">
                    <h1>Rama:{ramaSel?.nombre}</h1>
                    <h3>Aqui estan los eventos de la rama {ramaSel?.nombre}</h3>
                    
                   
                    {
                        
                        eventos.map(evento =>{
                            let fecha = (evento?.fechaYHoraInicio).toString();
                            let mes= fecha.substring(5, 7)
                            let dia= fecha.substring(8, 10)
                            
                                
                        return(
                            <Eventos nombre={evento?.titulo} 
                            dia={dia}
                            
                            mes= {convertir(mes)}
                            onClick={rediEventos(evento?._id)}
                             />
                        )
                    
                    })

                        
                        
                        

                    }
                    
                    
                    
                   

                    
                </div>
            </div>
            <Navbar />
        </div>


    )
}