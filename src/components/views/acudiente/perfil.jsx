
import { Navbar } from "../../navbar"
import Button from '@mui/material/Button'
import "../../../styles/boton.css"
import "../../../styles/styles.css"
import "../../../styles/login.css"


import { Header } from "../../header"
import { useAuthStore} from "../../../Hooks/useAuthStore"

import React, { useEffect } from 'react'
import { useAcudienteStore } from "../../../Hooks"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"

export const PerfilAcudiente= ()=>{
    const { startLogout } = useAuthStore();
    const {user} = useSelector(state=>state.auth);
    console.log(user)
    const { acudientes } = useSelector(state => state.acudiente);
    const acudienteActual = acudientes.find(acudiente => acudiente._id === user.uid);
    console.log(acudienteActual)
    const { acudienteScout } = useSelector(state => state.acudiente);
   
    const { startListAcudientes, startListScoutsAcudienteUser } = useAcudienteStore();
    

  
    const navigate = useNavigate();
    
    function actualizar(e){ 
        e.preventDefault();
        navigate(`/act-perfil`)
    }
    function contrasena(e){ 
        e.preventDefault();
        navigate(`/updatepassword`)
    }
    useEffect(() => {
        startListAcudientes()
        // eslint-disable-next-line react-hooks/exhaustive-deps
        startListScoutsAcudienteUser(user?.uid)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
   
  
    
    return(
        <div className="contenido">
        <div className="conte-general">
        <Header/>
        <div className="conte-imp">
        <div className="conte-marg-form">
        <h1>Hola, {acudienteActual?.nombre}</h1>
        <h2>Aqui estan tus datos personales</h2>

        {/* AQUI VA LA FOTO DEL USUARIO */}
        <img src={ acudienteActual?.link_imagen } className='foto' alt="foto"/>
        <div className="form-div">
        <h3>Nombre</h3>
        <h5>{acudienteActual?.nombre}</h5>
        </div>

        <div className="form-div">
        <h3>Apellido</h3>
        <h5>{acudienteActual?.apellido}</h5>
        </div>
        
        <div className="form-div">
        <h3>Email</h3>
        <h5>{acudienteActual?.email}</h5>
        </div>

        <div className="form-div">
        <h3>Fecha de nacimiento</h3>
        <h5>{acudienteActual?.fecha_nacimiento}</h5>
        </div>

        <div className="form-div">
        <h3>Numero de celular</h3>
        <h5>{acudienteActual?.celular}</h5>
        </div>

        <div className="form-div">
        <h3>Scout asociado</h3>
                    <div className="conte-ramas">
                    <ul>
                 
                    {                       
                        acudienteScout.map(acu =>{
                        return(
                            <li id="scou">{`${acu?.nombre} ${acu?.apellido} `}</li>
                        )
                       
                    })
                    } 
                    </ul>
                    </div>

        </div>
        <Button variant="contained" color="primary" onClick={contrasena}>Cambiar contraseña</Button>
        <Button type="submit" variant="contained" color="primary" onClick={actualizar}>Actualizar datos</Button>
        <Button variant="outlined" color="primary" onClick={startLogout}>Cerrar sesión</Button>
      
        </div>
        </div>
        </div>
        <Navbar/>
        </div>
        
 
    )
}