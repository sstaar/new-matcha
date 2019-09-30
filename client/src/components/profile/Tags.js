import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { addTag, removeTag } from '../../actions/userActions';

import Chip from '@material-ui/core/Chip';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
	root: {
		display: 'flex',
		justifyContent: 'center',
		flexWrap: 'wrap',
	},
	chip: {
		margin: theme.spacing(1),
	},
	container: {
		display: 'flex',
		flexWrap: 'wrap',
	},
	textField: {
		marginLeft: theme.spacing(1),
		marginRight: theme.spacing(1),
	},
	dense: {
		marginTop: theme.spacing(2),
	},
	menu: {
		width: 200,
	},
}));

const Tags = () => {

	//Allows to use dispatch
	const dispatch = useDispatch();

	const [newTag, setNewTag] = useState('');

	const onChange = e => setNewTag(e.target.value );

	const tags = useSelector(state => state.user.tags);

	const classes = useStyles();




	return (
		<div className="container" style={{ margin: '50px auto' }}>
			<div className="card bg-light text-center card-cus" >
				<div className="card-body">

					<h5 className="card-title badge badge-primary">Tags</h5>
					<div className={classes.root}>

						{tags.map((tag) =>
							<Chip
								key={tag.tagid}
								label={tag.tagname}
								onDelete={async () => dispatch(await removeTag(tags, tag.tagid))}
								className={classes.chip}
								color="primary"
								variant="outlined"
							/>
						)}
					</div>
					<div className="input-group mb-3" style={{ width: '40%', margin: '1rem auto' }}>
						<input onChange={e => onChange(e)} value={newTag} name='newtag' type="text" className="form-control" placeholder="New Tag" aria-label="New Tag" aria-describedby="addTag" />
						<div className="input-group-append">
							<button onClick={async () => dispatch(await addTag(newTag))} className="btn btn-outline-secondary" type="button" id="addTag">Add a new tag</button>
						</div>
					</div>

				</div>
			</div>
		</div>
	)
}

export default Tags
