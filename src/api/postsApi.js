import axiosInstance from './axiosApi';

async function getPostsApi() {
    
    try {
        const response = await axiosInstance.get('/post/');
        
        
        
        return response;
    } catch (error) {
        throw error;
    }
}

export default getPostsApi;

export async function getSelfPostsApi() {
    
    try {
        const response = await axiosInstance.get('/self_post/');
        
        
        return response;
    } catch (error) {
        throw error;
    }
}