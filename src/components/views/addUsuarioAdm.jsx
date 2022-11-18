
import { Navbar } from "../navbar"
import { Input } from "../input"
import Button from '@mui/material/Button'
import "../../styles/boton.css"
import "../../styles/styles.css"
import "../../styles/login.css"
import swal from 'sweetalert';
import { Header } from "../header"
import { Done } from '@mui/icons-material';
import React from "react";
import { useForm, useRamasStore, useAdminStore } from "../../Hooks"
import { useEffect, useState, useRef } from 'react'

import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { CameraAlt } from "@mui/icons-material"

const Admin = {
  nombre: '',
  apellido: '',
  email: '',
  ramasAsignadas: []

}
export const AddUsuario = () => {

  const { isFileUploading } = useSelector(state => state.admin);
  const fileInputRefI = useRef();

  const { startUploadingFiles } = useAdminStore();

  function capitalizar(str) {
    return str.replace(/\w\S*/g, function(txt){
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }

  let { nombre, apellido, email, ramasAsignadas, onInputChange } = useForm(Admin);
  let imagen;
  
  
  
  
  const { startCrearAdmin } = useAdminStore();
  const { startListarRamas } = useRamasStore();
  const [link_imagen, setLinkImagen] = useState('');
  const { ramas } = useSelector(state => state.rama);

  const navigate = useNavigate();

  function redirect(e) {
    e.preventDefault();
    navigate(`/home`)
  }

  const onFileInputChangeI = async ({ target }) => {
    if (target.files === 0) return;
    const link = await startUploadingFiles(target.files, 'Imagenes')
    setLinkImagen(link);
    
    if(link.length > 0){
      document.getElementById("img-sel").style.display="none"
      document.getElementById("camaras").style.display="none"
      document.getElementById("yes").style.display="block"
      document.getElementById("check-img").style.display="block"      
      

    }
  }

  // const verificarcheck =(e)=>{
  //     e.preventDefault();
  //     ramas.map(rama => {
  //     if(document.getElementById(rama._id)){
  //         ramasAsignadas.push(rama._id)
  //     }

  //     })
  // }

  const onSubmit = (e) => {
    e.preventDefault();
    //verificarcheck();
    let nombrex = capitalizar(nombre)
    let apellidox = capitalizar(apellido)
    let emailx= email.toLowerCase()
    
    nombre=nombrex
    apellido=apellidox
    email=emailx
    ramas.forEach(rama => {
      if (document.getElementById(rama._id).checked) {

        ramasAsignadas.push(rama._id)
      }
    })
    if (nombre === '' || apellido === '' || email === '' || ramasAsignadas.length === 0 ||link_imagen ==='') {
      swal({
        title: "Ingrese los campos obligatorios",
        icon: "warning"

      });

      return;

    }else{
      
      startCrearAdmin({ nombre, apellido, email, ramasAsignadas, link_imagen })
      navigate(`/home`)
    }




  
    
  }
  useEffect(() => {
    startListarRamas();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <div className="contenido">
      <div className="conte-general">
        <Header />
        <div className="conte-imp">
        <div className="conte-marg-form">
          <h1>Añadir un nuevo administrador</h1>
          <h2>En este formulario puedes crear un nuevo usuario</h2>
          <form onSubmit={onSubmit}>
          <div className="form-div">
            <h3>Nombre*</h3>
            <Input name='nombre' value={nombre} onChange={onInputChange} placeholder="Nombre del administrador" type="text" />
            </div>
            <div className="form-div">
            <h3>Apellido*</h3>
            <Input name='apellido' value={apellido} onChange={onInputChange} placeholder="Apellido del administrador" type="text" />
            </div>
            <div className="form-div">
            <h3>Correo electrónico*</h3>
            <Input name='email' value={email} onChange={onInputChange} placeholder="Correo" type="email" />
            </div>
            <div className="form-div">
            <h3>Asignar rama*</h3>

            <div className="rama-in">
              {
                ramas.map(rama => {
                  return (

                    <label className="la-rama" key={rama._id}><input className="rama" type='checkbox' key={rama._id} id={rama._id} value={rama._id} /><h3>{rama.nombre}</h3></label>
                    //<FormControlLabel value={rama._id} control={<Checkbox />} label={rama.nombre} />

                  )


                })
              }


            </div>
            </div>
            <div className="form-div">
            <h3>Foto*</h3>
            <input
              type="file"
              accept="image/*"
              onChange={onFileInputChangeI}
              value={imagen}
              ref={fileInputRefI}
              style={{ display: 'none' }}
            />

            <button className='subir'
              onClick={(e) => {
                e.preventDefault();
                fileInputRefI.current.click()
              }}
            >
              <CameraAlt style={{ color: '#D5D5D5', fontSize: '35px' }} id="camaras"/>
              <Done id='check-img' style={{ display: 'none'}}/>
              <h2 className="sel2" id="yes" >Archivo cargado</h2>
              <h2 className="sel" id="img-sel">Seleccione una foto de perfil*</h2>
            </button>
            </div>
            <br/>

            <Button type="submit" variant="contained" color="primary" disabled={isFileUploading} >Crear</Button>
            <Button variant="outlined" color="primary" onClick={redirect}>Cancelar</Button>
          </form>
        </div>
      </div>
      </div>
      <Navbar />
    </div>


  )
}