import { CentinelApi } from "../Api"
import swal from 'sweetalert';
import { onListPublicaciones } from "../store";
import { useDispatch } from "react-redux"
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export const usePublicacionStore = () => {
  const dispatch = useDispatch()
  const params = useParams();
  const navigate = useNavigate();
const startCrearPublicacion = async ({ titulo, descripcion, ramaAsignada, linkImagen, autor, fecha  }) => {
    
    console.log({ titulo, descripcion, ramaAsignada, linkImagen, autor, fecha})

    


    try {
      await CentinelApi.post('publicaciones/create-publicacion', { titulo, descripcion, ramaAsignada, linkImagen, autor, fecha})
      // console.log(data)

      swal({
        title: "La publicacion ha sido creado con éxito!",
        icon: "success",
      });



      //Alertas con el ok que viene en la data if(data.ok === true )

    } catch (error) {
      // console.log(error.request.status)
        alert(error)
        // swal({
        //   title: "Error",
        //   text: "El correo ya se encuentra registrado!",
        //   icon: "error",
        // });
      


      console.log(error)
    }

  }
  const startListPublicacion= async() => {

    try {
      
      const { data } = await CentinelApi.get(`publicaciones/byBranch/${params._id}`);
      console.log(data.publicaciones_)
      dispatch( onListPublicaciones( data.publicaciones_) )

    } catch (error) {
      console.log(error.request.status)
      if(error.request.status===404){
        document.getElementById('nohay').innerHTML=''
        swal({
          
          title: "No existen publicaciones actualmente para esta rama",
          icon: "warning",
        });  
        navigate('/publicaciones')

      }
    }

  }
  const startListPublicacionGeneral= async() => {

    try {
      
      const { data } = await CentinelApi.get(`publicaciones/allPublicaciones`);
      console.log(data.publicaciones_)
      dispatch( onListPublicaciones( data.publicaciones_) )

    } catch (error) {
      console.log(error.request.status)
      if(error.request.status===404){
        document.getElementById('nohay').innerHTML=''
        swal({
          
          title: "No existen publicaciones actualmente para esta rama",
          icon: "warning",
        });  
        navigate('/publicaciones')

      }
    }

  }

  const startListLastPublicacion= async() => {

    try {
      
      const { data } = await CentinelApi.get(`publicaciones/lastTwoPubli`);
      console.log(data.publicaciones_)
      dispatch( onListPublicaciones( data.publicaciones_) )

    } catch (error) {
      console.log(error)
      
    }

  }

  const startListLastPublicacionRama= async(ramaIdScout) => {
    
    try {
      
      
      const { data } = await CentinelApi.get(`publicaciones/lastTwoPubliByBranch/${ramaIdScout}`);
      console.log(data.publicaciones_)
      dispatch( onListPublicaciones( data.publicaciones_) )

    } catch (error) {
      console.log(error)
      
    }

  }

  

  


  return { startCrearPublicacion, startListPublicacionGeneral, startListPublicacion, startListLastPublicacion, startListLastPublicacionRama}
}
