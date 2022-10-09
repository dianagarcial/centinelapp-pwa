import { Input } from "../input"
import { Navbar } from "../navbar"
import Button from '@mui/material/Button'
import "../../styles/boton.css"
import "../../styles/styles.css"
import "../../styles/login.css"
import { useForm, useRamasStore, usePublicacionStore } from "../../Hooks"
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import { Header } from "../header"
import { useEffect } from 'react'
import { Select } from "../select"
import { TextArea } from "../textArea"
import { useSelector } from 'react-redux';

const Publicacion = {
    titulo: '',
    descripcion: '',
    
  
  }
export const AddPublicacion = () => {
    
    
      const { titulo, descripcion, onInputChange } = useForm(Publicacion);
      const { user } = useSelector(state => state.auth);
    
    
      const { startCrearPublicacion } = usePublicacionStore();
      const { startListarRamas } = useRamasStore();
      const navigate = useNavigate();
    
      function redirect(e) {
        e.preventDefault();
        navigate(`/publicaciones`)
      }
    
      const onSubmit = (e) => {
        e.preventDefault();
        let linkImagen='no tiene'
        let autor=user?.uid
        console.log(user)
        let date = new Date();
        let fecha= date.toLocaleDateString();
        console.log(fecha)
        console.log(descripcion)
        
    
        if (titulo === '' || descripcion === '' ) {
          swal({
            title: "Ingrese los campos obligatorios",
            icon: "warning"
    
          });
    
          return;
    
        }else{
          
              startCrearPublicacion({ titulo, descripcion, linkImagen, autor, fecha })
              navigate(`/home`)
            }
            
    
       
          
        }
    
        
    
    
        //console.log({nombre, apellido, correo, fechaNacimiento, celular})
        
      useEffect(() => {
        startListarRamas();
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [])
    
      return (
        <div className="contenido">
          <div className="conte-general">
            <Header />
            <div className="conte-imp">
              <h1>Crear una publicación</h1>
              <h2>En este formulario puedes crear una nueva publicación</h2>
              <form onSubmit={onSubmit}>
                <h3>Rama del mensaje*</h3>
                <Select id='rama' placeholder="Selecciona una opción" />
                <h3>Titulo de la publicación*</h3>
                <Input name='titulo' value={titulo} onChange={onInputChange} placeholder="Apellido del scout" type="text" />
                <h3>Mensaje*</h3>
                <TextArea name='descripcion' value={descripcion} onChange={onInputChange} placeholder="Correo" type="text" />
                 <br/>             
      
                <Button type="submit" variant="contained" color="primary">Crear</Button>
                <Button variant="outlined" color="primary" onClick={redirect}>Cancelar</Button>
              </form>
            </div>
          </div>
          <Navbar />
        </div>
)}
