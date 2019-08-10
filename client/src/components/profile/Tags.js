import React from 'react';
import Chip from '@material-ui/core/Chip';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

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
	const classes = useStyles();

	const handleDelete = () => {

	}

	const handleChange = () => {

	}

	return (
		<div className="container" style={{ margin: '50px auto' }}>
			<div className="card bg-light text-center card-cus" >
				<div className="card-body">

					<h5 className="card-title badge badge-primary">Tags</h5>
					<div className={classes.root}>
						<Chip
							label="Deletable Primary Chip"
							onDelete={handleDelete}
							className={classes.chip}
							color="primary"
							variant="outlined"
						/>
					</div>
					<div className="input-group mb-3" style={{width: '40%', margin: '1rem auto'}}>
						<input type="text" className="form-control" placeholder="New Tag" aria-label="New Tag" aria-describedby="addTag" />
						<div className="input-group-append">
							<button className="btn btn-outline-secondary" type="button" id="addTag">Add a new tag</button>
						</div>
					</div>

				</div>
			</div>
		</div>
	)
}

export default Tags
