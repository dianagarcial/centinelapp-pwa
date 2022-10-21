
import { Navbar } from "../../navbar"

import "../../../styles/boton.css"
import "../../../styles/styles.css"
import "../../../styles/login.css"
import { Header } from "../../header"
//import { SelectCreacion } from "../../selectCreacion"
import { useAdminStore, usePublicacionStore, useRamasStore, useSuperAdminStore } from "../../../Hooks"
import { useSelector } from 'react-redux';
import { useEffect } from 'react'
//import swal from 'sweetalert';
import { BotonFlotante } from "../../btn-flotante"
import { useNavigate } from 'react-router-dom';
import { Publicacion } from "../publicacioncompo"


export const PublicacionRama = () => {
    
    const {startListPublicacion}=usePublicacionStore();
    const {startListarRamasSel}=useRamasStore();
    const { startListSuperAdmin } = useSuperAdminStore();
    const { startListAdmin } = useAdminStore();
    
    
    const {ramaSel}=useSelector(state => state.rama)
    const {publicaciones}=useSelector(state => state.publicacion)
    
    
    const navigate = useNavigate();

    function redireccion(e) {
        e.preventDefault();
        navigate(`/add-publicacion`)
    }
    const rediPublicacion = (id) => (e) => {
        e.preventDefault();
        navigate(`/verPublicacion/${id}`)
    }

    

    
    useEffect(() => {
        startListarRamasSel();
        // eslint-disable-next-line react-hooks/exhaustive-deps
        startListPublicacion();
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
                    <h3>Aqui estan los mensajes de la rama {ramaSel?.nombre}</h3>
                    
                   
                    {
                        
                            publicaciones.map(publi =>{
                            let fechaes = (publi?.fecha).toString()
                            fechaes=fechaes.split('T')[0]
                            
                                
                        return(
                            <Publicacion 
                            key={publi?._id}
                            titulo={publi?.titulo}
                            conte={publi?.descripcion}
                            persona={`${publi?.autor.nombre} ${publi?.autor.apellido} `}
                            calendario={fechaes} 
                            onClick={rediPublicacion(publi?._id)}
                            />
                        )
                    
                    })

                        
                        
                        

                    }
                    
                    
                    
                    <BotonFlotante onClick={redireccion}/>

                    
                </div>
            </div>
            <Navbar />
        </div>


    )
}