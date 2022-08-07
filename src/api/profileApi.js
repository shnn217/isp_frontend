import 'axios';
import axiosInstance from "./axiosApi";

async function profileUpdateApi(props) {
    try {
        const response = await axiosInstance.put('/profile/'+props.id_user, {
            ...props
        });
    
        
        return response;
    } catch (error) {
        throw error;
    }
}

export default profileUpdateApi;

export async function profileInfoApi (id) {
    try {
        const response = await axiosInstance.get('/profile/' + id);
        // axiosInstance.defaults.headers['Authorization'] = "JWT " + response.data.access;
        // localStorage.setItem('access_token', JSON.parse(response.data).access);
        // localStorage.setItem('refresh_token', JSON.parse(response.data).refresh);
        
        return response;
    } catch (error) {
        throw error;
    }
}