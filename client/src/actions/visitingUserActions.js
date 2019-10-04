import { VISIT_USER, BLOCK_USER } from './types';
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