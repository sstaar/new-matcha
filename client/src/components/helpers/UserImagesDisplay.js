import React from 'react'

import { makeStyles, useTheme } from '@material-ui/core/styles';
import MobileStepper from '@material-ui/core/MobileStepper';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import './helper.css'
const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 400,
    flexGrow: 1,
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    height: 50,
    paddingLeft: theme.spacing(4),
    backgroundColor: theme.palette.background.default,
  },
  img: {
    height: 200,
    width: 200,
    overflow: 'hidden',
    display: 'block',
    borderRadius: '50%',
    margin: '10px auto'
  },
}));

const UserImagesDisplay = ({ imgs, deleteImg }) => {

  const classes = useStyles();

  const theme = useTheme();

  const [activeStep, setActiveStep] = React.useState(0);

  const maxSteps = imgs.length;

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };




  return (
    <div>
      {imgs.length === 0 ?
        <img
          className={classes.img}
          src='/imgs/user.png'
        /> :
        <img
          className={classes.img}
          src={(imgs[activeStep] && imgs[activeStep].path)}
        />}
      <MobileStepper
        className="col-4 mx-auto bg-transparent"
        steps={maxSteps}
        position="static"
        variant="dots"
        activeStep={activeStep}
        nextButton={
          <Button size="small" onClick={handleNext} disabled={activeStep === maxSteps - 1}>

            {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
          </Button>
        }
      />
      {imgs.length > 0 && deleteImg && <Button
        variant="contained"
        color="secondary"
        className={classes.button}
        onClick={e => deleteImg(imgs[activeStep].id)}
      >
        <i className="fas fa-trash"></i>
      </Button>}
    </div>
  )
}

export default UserImagesDisplay
