import { Input } from "../input"
import { Navbar } from "../navbar"
import Button from '@mui/material/Button'
import "../../styles/boton.css"
import "../../styles/styles.css"
import "../../styles/login.css"
import { Header } from "../header"
import { Select } from "../select"
import { useEffect, useRef } from 'react'
import { useForm, useRamasStore, useScoutStore } from "../../Hooks"

const Scout = {
  nombre: '', 
  apellido: '', 
  email: '',  
  fechaNacimiento: '', 
  celular: ''
}

export const AddUsuarioFicha= ()=>{
    
    const { nombre, apellido, email, fechaNacimiento, celular, onInputChange } = useForm(Scout);
    const fileInputRef = useRef()

    const { startCrearScout } = useScoutStore();
    const { startListarRamas } = useRamasStore();

    const onSubmit = (e)=>{
      e.preventDefault();
      //console.log({nombre, apellido, correo, fechaNacimiento, celular})
      const rama = document.getElementById('rama').value;
      startCrearScout({nombre, apellido, email, fechaNacimiento, celular, rama})
    }

    useEffect(() => {
      startListarRamas();
    },[])

    return(
        <div className="contenido">
        <div className="conte-general">
        <Header/>
        <div className="conte-imp">
        <h1>Añadir scout</h1>
        <h2>En este formulario puedes crear un nuevo usuario</h2>
        <form onSubmit={ onSubmit }> 
          <h3>Nombre</h3>
          <Input name='nombre' value={ nombre } onChange={ onInputChange } placeholder="Nombre del scout" type="text" />
          <h3>Apellido</h3>
          <Input name='apellido' value={ apellido } onChange={ onInputChange } placeholder="Apellido del scout" type="text" />
          <h3>Correo electronico</h3>
          <Input name='email' value={ email } onChange={ onInputChange } placeholder="Correo" type="email" />
          <h3>Ficha medica</h3>
          
          <div className='btn-file-30'>
              
              <input
                type="file"
                
                
                ref = { fileInputRef }
                style={{ display : 'none' }}
              />

              <button className='subir-imagen'
                
                onClick = { ()=> fileInputRef.current.click() }
              >
                <img classname="imgbtn" src='./images/boton/upload.svg' onerror="this.onerror=null; this.src='upload.png'"  alt='*'/>
                <h2>Seleccione un archivo*</h2>
              </button>
              </div>
          <h3>Asignar rama</h3>
          <Select id='rama' placeholder="Selecciona una opción" />
          <h3>Fecha de nacimiento</h3>
          <Input name='fechaNacimiento' value={ fechaNacimiento } onChange={ onInputChange } placeholder="Fecha de nacimiento" type="date" />
          <h3>Numero celular</h3>
          <Input name='celular' value={ celular } onChange={ onInputChange } placeholder="Numero de celular" type="number" />
          <Button type="submit" variant="contained" color="primary">Crear</Button>
          <Button variant="outlined" color="primary">Cancelar</Button>
        </form>
        </div>
        </div>
        <Navbar/>
        </div>
        
 
    )
}