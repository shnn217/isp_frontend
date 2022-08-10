import axiosInstance from './axiosApi';

export async function getFollowCountApi() {

    try {
        const response = await axiosInstance.get('/num_follow/');
    
        return response;
    } catch (error) {
        throw error;
    }
}

export async function createFollowCountApi(props) {

    try {
        const response = await axiosInstance.post('/num_follow/',{
            follower: props.follower,
            user: {
                id: props.user.id
            }
        });
    
        return response;
    } catch (error) {
        throw error;
    }
}

export async function createLikePostApi(props) {

    try {
        const response = await axiosInstance.post('/num_like/',{
            post: props.id
        });
    
        return response;
    } catch (error) {
        throw error;
    }
}

export async function getUniSuggestionApi() {

    try {
        const response = await axiosInstance.get('/user_suggestion/uni/');
    
        return response;
    } catch (error) {
        throw error;
    }
}

export async function getDepSuggestionApi() {

    try {
        const response = await axiosInstance.get('/user_suggestion/dep/');
    
        return response;
    } catch (error) {
        throw error;
    }
}