import axiosInstance from './axiosApi';

export async function getPostCommentListApi(id) {

    try {
        const response = await axiosInstance.get('/post_comment/' + id);
    
        return response;
    } catch (error) {
        throw error;
    }
}

export async function getQuestionCommentListApi(id) {

    try {
        const response = await axiosInstance.get('/question_comment/' + id);
    
        return response;
    } catch (error) {
        throw error;
    }
}

export async function createPostCommentApi(props, text) {

    try {
        const response = await axiosInstance.post('/post_comment/',{
            post: props,
            comment: text,
        });
    
        return response;
    } catch (error) {
        throw error;
    }
}

export async function createQuestionCommentApi(props, text) {

    try {
        const response = await axiosInstance.post('/question_comment/',{
            question: props,
            comment: text,
        });
    
        return response;
    } catch (error) {
        throw error;
    }
}