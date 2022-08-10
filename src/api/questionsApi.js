import axiosInstance from './axiosApi';

export async function getQuestionListApi() {

    try {
        const response = await axiosInstance.get('/question/');
    
        return response;
    } catch (error) {
        throw error;
    }
}

export async function createQuestionApi(props) {

    try {
        const response = await axiosInstance.post('/question/',{
            category: props.category,
            content: props.content,
        });
        
        return response;
    } catch (error) {
        throw error;
    }
}

export async function getQuestionDetailApi(id) {
    
    try {
        const response = await axiosInstance.get('/question/' + id);
        
        return response;
    } catch (error) {
        throw error;
    }
}

export async function updateQuestionDetailApi(id, props) {
    
    try {
        const response = await axiosInstance.put('/question/' + id,{
            category: props.category,
            content: props.content,
        });
        
        return response;
    } catch (error) {
        throw error;
    }
}

export async function deleteQuestionDetailApi(id) {
    
    try {
        const response = await axiosInstance.delete('/question/' + id);
        
        return response;
    } catch (error) {
        throw error;
    }
}

