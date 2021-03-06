import React, { useState } from 'react';
import Input from '../helpers/Input';
import { useDispatch, useSelector } from 'react-redux';

import { removeImg, addImg } from '../../actions/userActions';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Paper from '@material-ui/core/Paper';
import Draggable from 'react-draggable';
import UserImagesDisplay from '../helpers/UserImagesDisplay';


function PaperComponent(props) {
	return (
		<Draggable cancel={'[class*="MuiDialogContent-root"]'}>
			<Paper {...props} />
		</Draggable>
	);
}


const EditUserImages = () => {
	const [open, setOpen] = useState(false);

	//Allows to use dispatch
	const dispatch = useDispatch();

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	//Getting the token from the redux store
	const imagesStore = useSelector(state => state.user.info.images);

	const deleteImg = async (id) => {
		dispatch(await removeImg(id));
	};

	//On submit we send the informations to the back-end server
	//To save it on the database and after that uses the function
	//Update to update the informations in the parent component
	const handleSave = async e => {
		setOpen(false);
	}

	const onChange = async e => {
		if (imagesStore.length < 5) {
			let formData = new FormData();
			formData.append('image', e.target.files[0]);
			dispatch(await addImg(formData));
		}
	};

	return (

		<div >
			<Button variant="outlined" color="primary" onClick={handleClickOpen}>
				Edit Your images
      		</Button>
			<Dialog
				open={open}
				onClose={handleClose}
				PaperComponent={PaperComponent}
				aria-labelledby="draggable-dialog-title"
			>
				<DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
					Edit Your Images
        		</DialogTitle>
				<DialogContent>
					<UserImagesDisplay imgs={imagesStore} deleteImg={deleteImg} />
					<Input onChange={e => onChange(e)} type="file" name="avatar" />
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose} color="primary">
						Cancel
          			</Button>
					<Button onClick={handleSave} color="primary">
						Save
          			</Button>
				</DialogActions>
			</Dialog>
		</div>
	)
}

export default EditUserImages
