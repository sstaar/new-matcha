import React, { useState } from 'react';
import Chip from '@material-ui/core/Chip';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import { useSelector } from 'react-redux';

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

const Tags = ({ tags }) => {

	const [newTag, setNewTag] = useState({
		newtag: ''
	});

	const newtag = newTag.newtag;

	const onChange = e => setNewTag({ ...newTag, [e.target.name]: e.target.value });

	const [oldTags, setOldTags] = useState(tags);

	const oldtags = oldTags;

	const token = useSelector(state => state.login).token;

	const classes = useStyles();

	const handleDelete = async (tagid) => {
		await axios.post('http://localhost:5000/api/info/removetag', { token, tagid: tagid });
		console.log(tagid);
		let newtags = [];
		oldtags.forEach(element => {
			if (element.tagid !== tagid)
				newtags = [...newtags, element]
		});
		setOldTags([...newtags]);
	}

	const addTag = async () => {
		let res = await axios.post('http://localhost:5000/api/info/addtag', { token, tag: newtag });

		console.log(res);
		if (!res.data.error) {
			let newer = {
				tagname: newtag,
				tagid: res.data.id
			};
			setOldTags([...oldtags, newer]);
			console.log(newer);
			setNewTag({ newtag: '' });
		}
	}

	return (
		<div className="container" style={{ margin: '50px auto' }}>
			<div className="card bg-light text-center card-cus" >
				<div className="card-body">

					<h5 className="card-title badge badge-primary">Tags</h5>
					<div className={classes.root}>

						{oldtags.map((oldtag) =>
							<Chip
								key={oldtag.tagid}
								label={oldtag.tagname}
								onDelete={tagid => handleDelete(oldtag.tagid)}
								className={classes.chip}
								color="primary"
								variant="outlined"
							/>
						)}
					</div>
					<div className="input-group mb-3" style={{ width: '40%', margin: '1rem auto' }}>
						<input onChange={e => onChange(e)} value={newtag} name='newtag' type="text" className="form-control" placeholder="New Tag" aria-label="New Tag" aria-describedby="addTag" />
						<div className="input-group-append">
							<button onClick={addTag} className="btn btn-outline-secondary" type="button" id="addTag">Add a new tag</button>
						</div>
					</div>

				</div>
			</div>
		</div>
	)
}

export default Tags
