import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import TagOptionsList from './TagOptionsList';
import { getSearchOptions, changeSelectedTags } from '../../actions/searchActions';

const TagSelection = () => {
	const searchDataStore = useSelector(state => state.search.searchData);

	const [selectedTags, setSelectedTags] = useState([]);

	//Allows to use dispatch
	const dispatch = useDispatch();

	useEffect(() => {

		const test = async () => {
			dispatch(await getSearchOptions());
		};

		test();
	}, [dispatch]);

	const handleToggle = (value) => async () => {
		const currentIndex = selectedTags.indexOf(value);
		const newChecked = [...selectedTags];

		if (currentIndex === -1)
			newChecked.push(value);
		else
			newChecked.splice(currentIndex, 1);

		setSelectedTags(newChecked);
		dispatch(await changeSelectedTags(newChecked));
	};

	if (searchDataStore.loading === true)
		return (<div></div>);
	else
		return (
			<div className="w-100">
				<TagOptionsList selectedTags={selectedTags} handleToggle={handleToggle} items={searchDataStore.tags} />
			</div>
		)
}

export default TagSelection
