import axios from "axios";

const CentinelApi = axios.create({
    
    baseURL: 'https://centinelapp.scoutscentinelas113cali.org:3001/api'
    //baseURL: 'https://192.99.247.71:3001/api/'
    //baseURL: 'https://scout-centinelas113-prueba1.herokuapp.com/api'
    //baseURL:'https://localhost:9001/api'
    
});

CentinelApi.interceptors.request.use( config => {

    config.headers = {
        ...config.headers,
        'x-token': localStorage.getItem('token'),
    }

    return config;

})


export default CentinelApi;
