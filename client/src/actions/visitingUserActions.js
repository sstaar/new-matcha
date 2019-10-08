import { UNLIKE_USER, VISIT_USER, BLOCK_USER } from './types';
import axios from 'axios';

export const visitUser = async (target) => {
    const token = window.localStorage.getItem('token');

    const user = await axios.post('http://localhost:5000/api/search/getuser', { token, target });

    return {
        type: VISIT_USER,
        payload: user.data
    };
};

export const blockUser = async (target) => {
    const token = window.localStorage.getItem('token');

    await axios.post('http://localhost:5000/api/block/blockuser', { token, target });

    return {
        type: BLOCK_USER
    }
};


export const unLikeUser = async (target) => {
    const token = window.localStorage.getItem('token');

    try {
        await axios.post('http://localhost:5000/api/matching/unlike', { token, target });
    } catch (error) {
        console.log(error);
    }

    return {
        type: UNLIKE_USER
    }
};