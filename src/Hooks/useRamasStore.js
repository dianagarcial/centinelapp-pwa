import { useDispatch } from "react-redux";
import { CentinelApi } from "../Api"
import { ListarRamas, ListarRamaScout, ListarIDRamaScout, ListarRamasSel} from "../store";
import swal from 'sweetalert';
import { useNavigate, useParams } from "react-router-dom";
export const useRamasStore = () => {
    const params = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const startCrearRama = async ({ nombre, edadMax, edadMin}) => {
      

        try {
            await CentinelApi.post('rama/create-Rama',{ nombre, edadMax, edadMin})
            
            
                swal({
                    title: "La rama ha sido creada con éxito!",
                    icon: "success",
                  });
            
           navigate('/')
            
            //Alertas con el ok que viene en la data if(data.ok === true )

        } catch (error) {
            if(error.request.status === 400){
                swal({
                    title: "Error",
                    text: "Esta rama ya ha sido creada anteriormente!",
                    icon: "error",
                  });
            }
           
            
            console.log(error)
        }

    }

    const startListarRamas = async() => {

        try {
            
            const { data } = await CentinelApi.get('rama/AllRamas');
            dispatch(ListarRamas(data.ramas_));
            
            

        } catch (error) {
          console.log(error);  
        }

    }
    const startListarRamasSel = async() => {

        try {
            
            const { data } = await CentinelApi.get(`rama/${params._id}`);
            
            dispatch(ListarRamasSel(data.rama_));
            
            

        } catch (error) {
          console.log(error);  
        }

    }
    const startListarRamaID= async(id) => {
      
        

        try {
            
            const { data } = await CentinelApi.get(`scouts/scoutBranch/${id}`);
           
            dispatch(ListarRamaScout(data.branch.nombre));
                      
  
        } catch (error) {
          console.log(error);  
        }
  
    }
    const startListarRamaIDValue= async(id) => {
        
        
        try {
            
            const { data } = await CentinelApi.get(`scouts/scoutBranch/${id}`);
        
            dispatch(ListarIDRamaScout(data.branch._id));
        
  
        } catch (error) {
          console.log(error);  
        }
  
    }
    const startUpdateRama= async({nombre, edadMax, edadMin}) => {

        try {
          
          await CentinelApi.put(`rama/${params._id}`,{nombre, edadMax, edadMin});
          
          navigate(`/ramas`)
          
    
        } catch (error) {
          console.log(error)
          
        }
    
      }
      const startDeleteRama = async() => {

        try {
          
          await CentinelApi.delete(`rama/${params._id}`);
          
          
          navigate(`/ramas`)
          swal({
            title: "Eliminado correctamente",
            text: "Esta rama ha sido eliminada correctamente!",
            icon: "success",
          });
        } catch (error) {
          console.log(error)
        }
    
      }
    

    

    return{ startCrearRama, startListarRamas, startListarRamaID, startListarRamaIDValue, startListarRamasSel, startUpdateRama, startDeleteRama}
}
