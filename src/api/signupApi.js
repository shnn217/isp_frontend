import 'axios';
import axiosInstance from "./axiosApi";

async function signupApi(props) {
    try {
        const response = await axiosInstance.post('/signup/', {
            username: props.username,
            password: props.password,
            password2: props.password2,
            email: props.email,
        });
        
        
        return response;
    } catch (error) {
        if (error.response.statuscode === 400){
            alert(error.response.data.message)
        }
        throw error;
    }
}

export default signupApi;