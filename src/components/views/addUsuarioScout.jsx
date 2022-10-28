import { Input } from "../input"
import { Navbar } from "../navbar"
import Button from '@mui/material/Button'
import { Done } from '@mui/icons-material';
import "../../styles/boton.css"
import "../../styles/styles.css"
import "../../styles/login.css"
import { Header } from "../header"
import { Select } from "../select"
import { useEffect, useRef, useState } from 'react'
import { useForm, useRamasStore, useScoutStore } from "../../Hooks"
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux"

import { UploadFile } from '@mui/icons-material';
import { CameraAlt } from '@mui/icons-material';
const Scout = {
  nombre: '',
  apellido: '',
  email: '',
  fechaNacimiento: '',
  celular: ''
}

export const AddUsuarioFicha = () => {

  const { isFileUploading } = useSelector(state => state.scout);

  const fileInputRef = useRef();
  const fileInputRefI = useRef();

  const { startUploadingFiles } = useScoutStore();
  const fecha = new Date();
  let hoy=(fecha.toISOString()).toString().split('T')[0]

  function capitalizar(str) {
    return str.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }
  let { nombre, apellido, email, fecha_nacimiento, celular, onInputChange } = useForm(Scout);

  let imagen, archivo;

  const { startCrearScout } = useScoutStore();
  const { startListarRamas } = useRamasStore();
  const [link_ficha_medica, setlink_ficha_medica] = useState('');
  const [link_imagen, setLinkImagen] = useState('');
  const navigate = useNavigate();

  const onFileInputChange = async ({ target }) => {
    if (target.files === 0) return;
    const link = await startUploadingFiles(target.files, 'Fichas-Medicas')
    setlink_ficha_medica(link);
    console.log(link.length)
    if(link.length > 0){
      document.getElementById("yes2").style.display="block"
      document.getElementById("check-arch").style.display="block"
      document.getElementById("arch-sel").style.display="none"
      document.getElementById("archivo").style.display="none"

      
      

    }
  }

  const onFileInputChangeI = async ({ target }) => {
    if (target.files === 0) return;
    const link = await startUploadingFiles(target.files, 'Imagenes')
    setLinkImagen(link);
    console.log(link.length)
    if(link.length > 0){
      document.getElementById("img-sel").style.display="none"
      document.getElementById("camaras").style.display="none"
      document.getElementById("yes").style.display="block"
      document.getElementById("check-img").style.display="block"      
      

    }
  }

  function redirect(e) {
    e.preventDefault();
    navigate(`/home`)
  }

  const onSubmit = (e) => {
    e.preventDefault();
    let nombrex = capitalizar(nombre)
    let apellidox = capitalizar(apellido)
    let emailx= email.toLowerCase()

    nombre = nombrex
    apellido = apellidox
    email=emailx
    const idRama = document.getElementById('rama').value;
    if (nombre === '' || apellido === '' || email === '' || fecha_nacimiento === '' || celular === '' || idRama === ''||link_imagen ===''||link_ficha_medica==='') {
      swal({
        title: "Ingrese los campos obligatorios",
        icon: "warning"

      });

      return;

    } else {
      if (celular <= 0) {
        swal({
          title: "Ingrese un número de celular válido",
          icon: "warning"

        });

      } else {
        startCrearScout({ nombre, apellido, email, fecha_nacimiento, celular, link_imagen, link_ficha_medica, idRama })
        navigate(`/home`)
      }
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
          <h1>Añadir un nuevo scout</h1>
          <h2>En este formulario puedes crear un nuevo usuario</h2>
          <form onSubmit={onSubmit}>
            <h3>Nombre*</h3>
            <Input name='nombre' value={nombre} onChange={onInputChange} placeholder="Nombre del scout" type="text" />
            <h3>Apellido*</h3>
            <Input name='apellido' value={apellido} onChange={onInputChange} placeholder="Apellido del scout" type="text" />
            <h3>Correo electrónico*</h3>
            <Input name='email' value={email} onChange={onInputChange} placeholder="Correo" type="email" />
            <h3>Asignar rama*</h3>
            <Select id='rama' placeholder="Selecciona una opción" />
            <h3>Fecha de nacimiento*</h3>
            <Input name='fecha_nacimiento' value={fecha_nacimiento} onChange={onInputChange} placeholder="Fecha de nacimiento" type="date" max={hoy}/>
            <h3>Número celular*</h3>
            <Input name='celular' value={celular} onChange={onInputChange} placeholder="Número de celular" type="number" />
            <h3>Ficha medica*</h3>

            <input
              type="file"
              onChange={onFileInputChange}
              value={archivo}
              ref={fileInputRef}
              style={{ display: 'none' }}
            />

            <button className='subir'
              onClick={(e) => {
                e.preventDefault();
                fileInputRef.current.click()
              }}
            >
              <UploadFile id='archivo' style={{ color: '#D5D5D5', fontSize: '35px' }} />
              <Done id='check-arch' style={{ display: 'none'}} />
              <h2 className="sel2" id="yes2">Archivo cargado</h2>
              <h2 className="sel" id="arch-sel" >Seleccione un archivo*</h2>
            </button>

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
            <br/>
            <Button type="submit" variant="contained" color="primary" disabled={isFileUploading} style={{fontFamily: 'Ubuntu'}}>Crear</Button>
            <Button variant="outlined" color="primary" onClick={redirect} style={{fontFamily: 'Ubuntu'}}>Cancelar</Button>
          </form>
        </div>
      </div>
      <Navbar />
    </div>


  )
}