import Form from "react-bootstrap/Form";
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router';
import "./styleStation.css";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import mapboxgl from 'mapbox-gl';
import StarRating from './RatingStar';
import strings from "../../lang/lang";
var token=[]
mapboxgl.accessToken =token[Math.floor(Math.random()*2)]

const Station = () => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [station, setStation] = useState({});
  let { stationId } = useParams();
  console.log(stationId)
  let chargerPrice = {AC:1.69,DC:3.75}
  const [totalPrice, setTotalPrice] = useState(169)
  const [show, setShow] = useState(false);
const [formData, setFormData] = useState({quantity:50,plug:'AC',stationID:stationId})
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  let navigate=useNavigate()

const  handleQuanitity =(e)=>{
if (e.target.value<1) return;
setFormData({...formData,quantity:e.target.value})
setTotalPrice(e.target.value*chargerPrice[formData.plug])
}
const  handleCharger =(e)=>{

  setFormData({...formData,plug:e.target.value})
  setTotalPrice(formData.quantity*chargerPrice[e.target.value])
  }
  const  handleSubmit =(e)=>{
e.preventDefault()
axios.post('https://backend-ecocharge-v9vw.onrender.com/api/payment/create-checkout-session',formData,{
  headers: {
    'Authorization': 'Bearer ' + localStorage.getItem('userToken')
  }
}).then(res=>{
  window.open(res.data.url,'_self')
})
    }
  useEffect(() => {

    axios
      .get(`https://backend-ecocharge-v9vw.onrender.com/api/stations/station/${stationId}`)
      .then((res) => {
        setStation(res.data.data)
        if (map.current) return;

        setTimeout(() => {

          map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v12',
            center: [res.data.data.longitude, res.data.data.latitude],
            zoom: 9
          });
          map.current.addControl(new mapboxgl.FullscreenControl());

          new mapboxgl.Marker()
            .setLngLat([res.data.data.longitude, res.data.data.latitude])
            .addTo(map.current);


        }, 3000)
      })
    // console.log(mapContainer);

  }, [stationId]);

  if (Object.keys(station).length > 0) {
    return (
      <section >
        <div className="container">
          <div className="row d-flex w-100">
            <div className="col-md-5 mt-3 mb-3  ">
              <div className="station-imge ">
                <img src={station.photo} alt=""></img>
              </div>
              <div className="station-content  p-3">
              <div style={{ marginBottom: "9px" }}>
                  <h5 className="stationName text-center d-block " >
                    {strings.getLanguage() == 'ar'?station.station_AR:station.station_name}
                  </h5>
                  <h4 className=' adress p-2'>
                  <i className="fas fa-star"></i>
{strings.card.rating}                    <span style={{marginLeft:"1.2rem"}}>
                    <StarRating stationId={stationId}/>
                    </span>
                  </h4>
                    

                </div>
                <p className="text-dark p-2"><i className="fa-solid fa-location-dot"></i> <span className='adress'>{strings.card.address}:</span> {strings.getLanguage() == 'ar'?station.address_AR:station.address}</p>
                {(station.Plugs)?.map((plug, i) =>
                (
                  <div key={i}>
                    <p className='p-2 pt-0 text-dark'><i className="fa-solid fa-plug"> </i> <span className='adress'>{strings.card.plug}:</span> {plug}</p>

                  </div>
                ))}
                <p className="p-2 pt-0 text-dark"><i className="fa-solid fa-hashtag"></i><span className='adress'>{strings.card.noOfPlugs} :</span> {station.number_of_Plugs}</p>
                <p className="p-2 pt-0 text-dark"><i className="fa-solid fa-clock"></i> {station.availability}</p>
                <p className="p-2 pt-0 text-dark"> {strings.getLanguage() == 'ar'?station.Description_AR:station.Description}</p>

                <Button variant="primary" className='submit fa-' onClick={handleShow}>
                <i style={{color:'white'}} className="fa fa-credit-card"> </i>   {strings.services.paymentHeader}
      </Button>
                 {
                   localStorage.getItem("userToken")?
                   <Modal show={show} onHide={handleClose}>
        <Form onSubmit={handleSubmit} >
        <Modal.Header closeButton>
          <Modal.Title>{strings.payment.paymentHeader}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
                <Form.Group className="mb-3 mt-1">
                <Form.Label>{strings.payment.quantity}</Form.Label>
                  <input
                  value={formData.quantity}
                    className="form-control"
            min={50}
                    name="quantity"
                    required
                    id="quantity"
                    
                    placeholder="Enter Quanitity"
                    type="number"
                    onChange={handleQuanitity}
                    />
              
                </Form.Group>
                <Form.Group>
                <Form.Check 
            type={'radio'}
            
            value={'AC'}
            name='charger'
            id={`default-radio`}
            onChange={handleCharger}
            checked={formData.plug === 'AC'?true:false}
            label={`AC`}
          />
                 <Form.Check 
                checked={formData.plug === 'DC'?true:false}
          name="charger"
          type={'radio'}
            onChange={handleCharger}
            value={'DC'}
            id={`default-radio2`}
            label={`DC`}
          />
                </Form.Group>
                <h4>{strings.payment.totalprice}: {totalPrice} {strings.payment.egp}</h4>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            {strings.close}
          </Button>
          <Button className='submit' type="submit" onClick={handleClose}>
          <i style={{color:'white'}} class="fa fa-credit-card"> </i>   {strings.payment.pay}
          </Button>
        </Modal.Footer>
                    </Form>
      </Modal>:<Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{strings.payment.paymentHeader}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{strings.payment.signinMsg}</Modal.Body>
        <Modal.Footer>
          <button className='btn btn-secondary' onClick={handleClose}>
            Close
          </button>
          <button className='btn btn-success' onClick={
                () => navigate("/signin")
            }>
           {strings.navbar.signin}
          </button>
     
        </Modal.Footer>
      </Modal>

                    
                 }
                   
      

              </div>
            </div>
            <div className='col-md-7 mt-3 mb-3' style={{ minHeight: '400px' }} ref={mapContainer}>
            </div>
          </div>
        </div>

      </section>
    );
  } else {
    return <div className='d-flex justify-content-center align-items-center'>
      <div className="lds-grid"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
    </div>
  }
};

export default Station;