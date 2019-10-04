import { SET_SEARCH_DATA, GET_SEARCH_OPTIONS, CHANGE_SELECTED_TAGS } from './types';
import axios from 'axios';

export const getSearchOptions = async () => {
    const token = window.localStorage.getItem('token');
    
    const tags = await axios.post('http://localhost:5000/api/info/getalltags', { token:token });

    if (tags.data.error)
        return ;
    return {
        type:GET_SEARCH_OPTIONS,
        payload:tags.data
    };
};

export const changeSelectedTags = async (tags) => {
    return {
        type:CHANGE_SELECTED_TAGS,
        payload:tags
    }
}

export const searchRequest = async (info) => {
    const token = window.localStorage.getItem('token');

    console.log(info);
    let res = await axios.post('http://localhost:5000/api/search/search', { ...info, token });
    console.log(res);
    return {
        type:SET_SEARCH_DATA,
        payload:res.data
    };
};