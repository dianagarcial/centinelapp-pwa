import { CentinelApi } from "../Api"
import swal from 'sweetalert';
import { onListScouts, onUploadFileScout } from "../store";
import { useDispatch } from "react-redux"
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { fileUpload } from "../Helpers";
export const useScoutStore = () => {
  const dispatch = useDispatch()
  const params = useParams();
  const navigate = useNavigate();
  const startCrearScout = async ({ nombre, apellido, email, fecha_nacimiento, celular, link_ficha_medica, link_imagen, idRama }) => {
    

    try {
      await CentinelApi.post('scouts/create-scout', { nombre, apellido, email, fecha_nacimiento, celular, idRama, link_ficha_medica, link_imagen })
      // console.log(data)

      swal({
        title: "El usuario ha sido creado con éxito!",
        icon: "success",
      });

      navigate(`/home`)


      //Alertas con el ok que viene en la data if(data.ok === true )

    } catch (error) {
      // console.log(error.request.status)
      if (error.request.status === 400) {
        swal({
          title: "Error",
          text: "El correo ya se encuentra registrado!",
          icon: "error",
        });
      }


      console.log(error)
    }

  }

  const startListScouts = async () => {

    try {

      const { data } = await CentinelApi.get('scouts/allScouts');

      dispatch(onListScouts(data.scouts_))

    } catch (error) {
      console.log(error)
    }

  }
  const startListScoutsAdmin = async (id) => {

    try {

      const { data } = await CentinelApi.get(`admin/getAdminBranchByScout/${id}`);
      //console.log(data.ScoutsBranchAdmin)
      dispatch(onListScouts(data.ScoutsBranchAdmin))

    } catch (error) {
      console.log(error)
    }

  }

  

  const startListarRamasSelect = async ({ id }) => {

    try {

      const { data } = await CentinelApi.get(`rama/getScoutsAsignados/${id}`);
     
      if (data.rama.Scout.length === 0) {
        
        document.getElementById("Noe").innerHTML="No existen scouts registrados en esta rama"
        dispatch(onListScouts(data.rama.Scout))
      }
      else {
        document.getElementById("Noe").innerHTML=""
        dispatch(onListScouts(data.rama.Scout))
      
    }
    } catch (error) {
      console.log(error);
    }

  }
  const startUpdateScoutSR = async ({ id, nombre, apellido, email, fecha_nacimiento, celular}) => {
    
    
    try {

      await CentinelApi.put(`scouts/${id}`, { id, nombre, apellido, email, fecha_nacimiento, celular});
      
      
      swal({
        title: "El usuario ha sido actualizado con éxito!",
        icon: "success",
      });
      navigate(`/perfil`)


    } catch (error) {
      console.log(error)
    }

  }

  
  const startUpdateScout = async ({ id, nombre, apellido, fecha_nacimiento, celular, idScout,idRama,idRamaNueva }) => {
    
    
    try {

      await CentinelApi.put(`scouts/${id}`, { id, nombre, apellido, fecha_nacimiento, celular});
      await CentinelApi.put(`rama/changeScoutBranch/${idRama}`, { idScout, idRamaNueva });
      
      swal({
        title: "El usuario ha sido actualizado con éxito!",
        icon: "success",
      });
      navigate(`/`)


    } catch (error) {
      console.log(error)
    }

  }

  const startDeleteScout = async () => {

    try {
       
   
      await CentinelApi.delete(`scouts/${params._id}`);

      
      navigate(`/adminscouts`)

    } catch (error) {
      console.log(error)
    }

  }
  const startUpdatePassword = async ({ newPassword,currentPassword,email}) => {
        
    
    try {

      await CentinelApi.post(`scouts/changePassword`, { newPassword,currentPassword,email });
      
      
      swal({
        title: "La contraseña ha sido actualizada con éxito!",
        icon: "success",
      });
      navigate("/perfil")


    } catch (error) {
      
      if(error.request.status===400){
        swal({
          title: "La contraseña actual es incorrecta!",
          icon: "error",
        });
      }
    }

  }

  const startUploadingFiles = async( files = [], tipo = '' ) => {

    dispatch(onUploadFileScout(true));

    try {
    
      const link = await fileUpload( files[0], tipo );
      dispatch(onUploadFileScout(false));
      return link;

    } catch (error) {
      return console.log(error)
    }
    
  }



  return { startCrearScout, startListScouts, startListarRamasSelect, startUpdateScout, startDeleteScout,startUpdatePassword, startUploadingFiles, startListScoutsAdmin, startUpdateScoutSR }
}
