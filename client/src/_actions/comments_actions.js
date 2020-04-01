import axios from 'axios';
import {
    GET_COMMENTS,
    AFTER_POST_COMMENT
} from './types';
import { COMMENT_SERVER} from '../components/Config.js';

export function getComments(id){
    const request = axios.get(`${COMMENT_SERVER}/getComments?id=${id}`)
        .then(response => response.data);
    return {
        type: GET_COMMENTS,
        payload: request
    }
}
export function afterPostMessage(data){
    return {
        type: AFTER_POST_COMMENT,
        payload: data
    }
}

