import { SUGGESTIONS_SORT_COMMON_TAGS } from './types';

export const sortAge = (order, type) => {

	return {
		type,
		payload: order
	}
}

export const sortDistance = (order, type) => {

	return {
		type,
		payload: order
	}
}

export const sortFame = (order, type) => {

	return {
		type,
		payload: order
	}
}

export const sortCommonTags = (order) => {

	return {
		type: SUGGESTIONS_SORT_COMMON_TAGS,
		payload: order
	}
}