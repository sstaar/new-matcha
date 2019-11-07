import React, { useState } from 'react';
import Input from '../helpers/Input';
import { useDispatch, useSelector } from 'react-redux';

import { updateInfo, removeImg, addImg } from '../../actions/userActions';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Paper from '@material-ui/core/Paper';
import Draggable from 'react-draggable';
import UserImagesDisplay from '../helpers/UserImagesDisplay';
import DeleteIcon from '@material-ui/icons/Delete';


function PaperComponent(props) {
    return (
        <Draggable cancel={'[class*="MuiDialogContent-root"]'}>
            <Paper {...props} />
        </Draggable>
    );
}

const useStyles = makeStyles(theme => ({
    center: {
        margin: '20px auto',
        textAlign: 'center',
    },
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    button: {
        margin: theme.spacing(1),
    },
}));

const getBase64 = (file) => {
	return new Promise((resolve, reject) => {
		let reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onloadend = async () => {
			resolve(reader.result);
		};
	})
}

const EditUserImages = () => {
    const classes = useStyles();

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
		    let base = await getBase64(e.target.files[0])
		    dispatch(await addImg(base));
        }
    };
    
    return (

        <div className={classes.center}>
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
                    Subscribe
        		</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        To subscribe to this website, please enter your email address here. We will send updates
						occasionally.
          			</DialogContentText>

                    <UserImagesDisplay imgs={imagesStore} deleteImg={deleteImg} />

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
          			</Button>
                    <Button onClick={handleSave} color="primary">
                        Save
          			</Button>
                      <input onChange={e => onChange(e)} type="file" name="avatar" />
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default EditUserImages
