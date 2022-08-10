import axiosInstance from './axiosApi';

export async function getPostsApi() {
    
    try {
        const response = await axiosInstance.get('/post/');
        
        return response;
    } catch (error) {
        throw error;
    }
}

export async function getOtherUserPostsApi(id) {
    
    try {
        const response = await axiosInstance.get('/post/' + id);
        
        return response;
    } catch (error) {
        throw error;
    }
}

export async function getSelfPostsApi() {
    
    try {
        const response = await axiosInstance.get('/self_post/');
        
        return response;
    } catch (error) {
        throw error;
    }
}

export async function createPostApi(props) {
    
    try {
        const response = await axiosInstance.post('/post/', {
            caption: props.caption,
            image: props.image ? props.image:'',
        });
        
        return response;
    } catch (error) {
        throw error;
    }
}

export async function getPostDetailApi(id) {

    try {
        const response = await axiosInstance.get('/post/' + id);
        
        
        return response;
    } catch (error) {
        throw error;
    }
}

export async function updatePostDetailApi(id, props) {

    try {
        const response = await axiosInstance.put('/post/' + id, {
            caption: props.caption,
            image: props.image ? props.image:'',
        });
        
        
        return response;
    } catch (error) {
        throw error;
    }
}

export async function deletePostDetailApi(id) {

    try {
        const response = await axiosInstance.delete('/post/' + id);
        
        
        return response;
    } catch (error) {
        throw error;
    }
}