import 'axios';
import axiosInstance from "./axiosApi";

async function loginApi(props) {
    try {
        const response = await axiosInstance.post('/login/', {
            username: props.username,
            password: props.password? props.password:'',
        });
        axiosInstance.defaults.headers['Authorization'] = "JWT " + JSON.parse(response.data).access;
        localStorage.setItem('access_token', JSON.parse(response.data).access);
        localStorage.setItem('refresh_token', JSON.parse(response.data).refresh);
        
        return response;
    } catch (error) {
        throw error;
    }
}

export default loginApi;

export async function profileInfoApi (id) {
    try {
        const response = await axiosInstance.get('/profile/');
        // axiosInstance.defaults.headers['Authorization'] = "JWT " + response.data.access;
        // localStorage.setItem('access_token', JSON.parse(response.data).access);
        // localStorage.setItem('refresh_token', JSON.parse(response.data).refresh);
        
        return response;
    } catch (error) {
        throw error;
    }
}