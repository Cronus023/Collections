import {
    GET_COMMENTS,
    AFTER_POST_COMMENT
} from '../_actions/types';
 

export default function(state={},action){
    switch(action.type){
        case GET_COMMENTS:
            return {...state, comments: action.payload }
        case AFTER_POST_COMMENT:
            return {...state, comments: state.comments.concat(action.payload) }
        default:
            return state;
    }
}