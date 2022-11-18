import { Input } from "../../input"
import { Navbar } from "../../navbar"
import Button from '@mui/material/Button'
import "../../../styles/boton.css"
import "../../../styles/styles.css"
import "../../../styles/login.css"
import swal from 'sweetalert';
import React from "react";

import { Header } from "../../header"
import { useForm, useAcudienteStore } from '../../../Hooks';


import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
// import { SelectScout } from "../../select-scout";
// import AddIcon from '@mui/icons-material/Add';



export const ActAcudiente = () => {
  const navigate = useNavigate();
  const { user } = useSelector(state => state.auth);

  const { startListAcudientes, startUpdateAcudiente } = useAcudienteStore();
  const { acudientes } = useSelector(state => state.acudiente);
  const acudienteActual = acudientes.find(acudiente => acudiente._id === (user?.uid));
  function capitalizar(str) {
    return str.replace(/\w\S*/g, function(txt){
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }


  let { nombre = '', apellido = '', email = '', fecha_nacimiento = '', celular = '', onInputChange } = useForm(acudienteActual);
  //fecha_nacimiento=reformatDateString(fecha_nacimiento);

  //document.querySelector('#rama').value=ramaIdScout
  const fecha = new Date();
  let hoy=(fecha.toISOString()).toString().split('T')[0]


  
  const onSubmit = (e) => {
    e.preventDefault();
    const id = user?.uid
    let nombrex = capitalizar(nombre)
    let apellidox = capitalizar(apellido)
    
    nombre=nombrex
    apellido=apellidox
    
    
    if (nombre.trim() === '' || apellido.trim() === '' || email.trim() === '' || fecha_nacimiento.trim() === '' || celular.trim() === '') {
      swal(
        'Error',
        'No puede enviar el contenido o el titulo en blanco',
        'error'
      )
    } else {
      startUpdateAcudiente({ id, nombre, apellido, fecha_nacimiento, celular })
      navigate(`/perfil`)
    }
  }


  const RegreNoG = (e) => {
    e.preventDefault();
    swal({
      title: "Salir sin guardar",
      text: "Si acepta salir, no se guardara la informacion modificada",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          navigate(`/adminacudiente`)
        } else {
          swal("Continua editando");
        }
      });
  }
  // const mostrar1= (e) =>{
  //   e.preventDefault();
  //   document.getElementById('scout2').style.display="flex"
      
  // }

  useEffect(() => {
    startListAcudientes()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <div className="contenido">
      <div className="conte-general">
        <Header />
        <div className="conte-imp">
        <div className="conte-marg-form">
          <h1>Actualizar datos</h1>
          <h2>Aqui estan tus datos personales</h2>
          <form onSubmit={onSubmit}>
          <div className="form-div">
            <h3>Nombre</h3>
            <Input name='nombre' value={nombre} type="text" onChange={onInputChange} />
          </div>

          <div className="form-div">
            <h3>Apellido</h3>
            <Input name='apellido' value={apellido} type="text" onChange={onInputChange} />
          </div>
          <div className="form-div">
            <h3>Email</h3>
            <Input name='email' value={email} type="email" onChange={onInputChange} disabled/>
          </div>

          <div className="form-div">
            <h3>Fecha de nacimiento</h3>
            <Input name='fecha_nacimiento' value={fecha_nacimiento} type="date" onChange={onInputChange} max={hoy}/>
          </div>

          <div className="form-div">
            <h3>Numero de celular</h3>
            <Input name='celular' value={celular} type="text" onChange={onInputChange} />
          </div>
            

            <Button type="submit" variant="contained" color="primary">Guardar</Button>

            <Button variant="outlined" color="primary" onClick={RegreNoG}>Regresar</Button>
          </form>
        </div>

      </div>
      </div>
      <Navbar />
    </div>


  )
}