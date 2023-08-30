import React, { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MobileStepper from '@mui/material/MobileStepper';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import { useNavigate } from 'react-router';
import Modal from 'react-bootstrap/Modal';

import "./style.css";
import strings from '../../lang/lang';
const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const images = [
  {
    label: strings.services.nearestStationHeader,
    imgPath:
      '/ServiceImages/map.jpeg',
  },
  {
    label: strings.services.chargingCarHeader,
    imgPath:
      '/ServiceImages/charge.jpg',
  },
  {
    label:strings.services.paymentHeader,
    imgPath:
      '/ServiceImages/pay1.jpg',
  }
];

function SwipeableTextMobileStepper() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = images.length;

  const handleNext = () => {
    // setTimeout(()=>{
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    // },3000);
  };

  const handleBack = () => {
    // setTimeout(()=>{
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    // },3000);
  };

  const handleStepChange = (step) => {
    
    // setTimeout(()=>{
        setActiveStep(step);
    // },3000);
  };
  let navigate = useNavigate();

  const handleNearestStation=()=>{
    navigate("/nearestStation");
  }

  return (
    <div style={{textAlign:"center",margin:"auto"}}>
    <Box sx={{ maxWidth: 800, flexGrow: 1 }} style={{margin:"auto",backgroundColor:"rgb(234, 231, 177)",marginTop:"4vh",marginBottom:"6vh"}}>
      <Paper
        square
        elevation={0}
        sx={{
          display: 'flex',
          alignItems: 'center',
          height: 50,
          pl: 2,
          bgcolor: 'background.default',
        }}
      >
        <h5 style={{color:"rgb(45, 159, 124)",fontFamily:"Lucida Calligraphy",fontWeight:"bolder"}}>{images[activeStep].label}</h5>
      </Paper>
      <AutoPlaySwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
      >
        {images.map((step, index) => (
         <div className="card-container">
          <div key={step.label} className="float-layout" >
            {Math.abs(activeStep - index) <= 2 ? (
              <Box
                component="img"
                sx={{
                  height: "300px",
                  display: 'inline',
                  maxWidth: "400px",
                  overflow: 'hidden',
                  backgroundColor:"black",
                  float:"right",
                  width: '60%',
                  marginRight:"0px"
                }}
                src={step.imgPath}
                alt={step.label}
                className="card-image"
              />
            ) : null}
            
           { images[activeStep].label===strings.services.nearestStationHeader?
            <div className='card-desc' style={{display:"block",width:"50%"}}>
                <p className='ServiceDescription' >
                {strings.services.nearestStationDescription}            
                 </p>
                <button onClick={handleNearestStation} className='btnTag btn btn-primary btn-lg sendBtn '>{strings.services.nearestStationBtn}</button>

            </div>
:""}
{
  images[activeStep].label===strings.services.chargingCarHeader?
  <div style={{display:"inline"}}>
                <p className='ServiceDescription'>
                {strings.services.chargingCarDescription}
                </p>
                <button onClick={handleShow}  className='btnTag btn btn-primary btn-lg sendBtn text-white py-1 px-4' >{strings.services.chargingCarBtn}</button>
        

            </div>:""
}

{ images[activeStep].label===strings.services.paymentHeader?
            <div style={{display:"inline"}}>
                <p className='ServiceDescription'>
              {strings.services.paymentDescription}
                </p>

            </div>
:""}
          </div>
          </div>
        ))}
      </AutoPlaySwipeableViews>
      <MobileStepper
        steps={maxSteps}
        position="static"
        activeStep={activeStep}
        nextButton={
          <Button
            size="small"
            onClick={handleNext}
            disabled={activeStep === maxSteps - 1}
            style={{color: "rgb(45, 159, 124)"}}
          >
            {strings.services.next}
            {theme.direction === 'rtl' ? (
              <KeyboardArrowLeft />
            ) : (
              <KeyboardArrowRight />
            )}
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0} style={{color: "rgb(45, 159, 124)"}}>
            {theme.direction === 'rtl' ? (
              <KeyboardArrowRight />
            ) : (
              <KeyboardArrowLeft />
            )}
            {strings.services.previous}
          </Button>
        }
      />
    </Box>
    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{strings.services.chargingCarBtn}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{strings.services.callNowDescription}</Modal.Body>
        <Modal.Footer>
          <button className='btn btn-secondary' onClick={handleClose}>
            {strings.close}
          </button>
     
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default SwipeableTextMobileStepper;