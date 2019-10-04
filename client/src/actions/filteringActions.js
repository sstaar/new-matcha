import { SUGGESTIONS_FILTER } from './types';

export const filterSuggestion = (info) => {
    return {
        type: SUGGESTIONS_FILTER,
        payload: info
    }
}