import React from 'react'

import { makeStyles, useTheme } from '@material-ui/core/styles';
import MobileStepper from '@material-ui/core/MobileStepper';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';

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
      height: 255,
      maxWidth: 400,
      overflow: 'hidden',
      display: 'block',
      width: '100%',
      borderRadius: '2%',
      margin: '10px auto'
    },
  }));

const UserImagesDisplay = ({ imgs }) => {

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


    if (imgs.length === 0)
      return (<div>
        <img
            className={classes.img}
            src='/imgs/user.png'
        />
        </div>)
    return (
        <div>
            <img
                className={classes.img}
                src={imgs[activeStep].path}
            />
            <MobileStepper
                steps={maxSteps}
                position="static"
                variant="text"
                activeStep={activeStep}
                nextButton={
                    <Button size="small" onClick={handleNext} disabled={activeStep === maxSteps - 1}>
                        Next
                        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                    </Button>
                }
                backButton={
                    <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
                        Back
                    </Button>
                }
            />
        </div>
    )
}

export default UserImagesDisplay
