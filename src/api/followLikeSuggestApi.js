import axiosInstance from './axiosApi';

export async function getFollowCountApi() {

    try {
        const response = await axiosInstance.get('/num_follow/');
    
        return response;
    } catch (error) {
        throw error;
    }
}

export async function createFollowCountApi(user, props) {

    try {
        const response = await axiosInstance.post('/num_follow/',{
            follower: user.user,
            user: props.user,
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

export async function getUserLikeStatusApi(id) {

    try {
        const response = await axiosInstance.get('/num_like/' + id);
    
        return response;
    } catch (error) {
        throw error;
    }
}

export async function getUserFollowStatusApi(id) {

    try {
        const response = await axiosInstance.get('/num_follow/' + id);
    
        return response;
    } catch (error) {
        throw error;
    }
}

export async function getUserSearchApi(name) {

    try {
        const response = await axiosInstance.get('/user_search/' + name);
    
        return response;
    } catch (error) {
        throw error;
    }
}
