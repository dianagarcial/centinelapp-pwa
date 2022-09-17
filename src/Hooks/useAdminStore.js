import { CentinelApi } from "../Api"
import swal from 'sweetalert';

export const useAdminStore = () => {
  
    const startCrearAdmin = async ({ nombre, apellido, email,ramasAsignadas}) => {
        console.log({ nombre, apellido, email, ramasAsignadas})
      
        try {
            const { data } = await CentinelApi.post('admin/create-admin',{ nombre, apellido, email, ramasAsignadas})
            console.log(data)
            
                swal({
                    title: "El usuario ha sido creado con exito!",
                    icon: "success",
                  });
            
           
            
            //Alertas con el ok que viene en la data if(data.ok === true )

        } catch (error) {
            console.log(error.request.status)
            if(error.request.status === 400){
                swal({
                    title: "El usuario no ha sido creado",
                    text: "Recuerde ingresar todos los campos obligatorios",
                    icon: "error",
                  });
            }
            
            
            console.log(error)
        }

    }

    return { startCrearAdmin }
}
