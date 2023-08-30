import Carousel from 'react-bootstrap/Carousel';
import strings from '../../../lang/lang';


import "./styleSilder.css";

const Silder = () => {
    return (
        <Carousel onLoad={()=>{
if (strings.getLanguage() == 'ar') {
  
  let previous = document.querySelector('.carousel-control-prev-icon')
  let next = document.querySelector('.carousel-control-next-icon')
  previous.classList.replace('carousel-control-prev-icon','carousel-control-next-icon')
  next.classList.replace('carousel-control-next-icon','carousel-control-prev-icon')
  
}
} } className={strings.getLanguage() == 'en'|| 'rtl'} dir={strings.getLanguage() == 'en'|| 'rtl'} >
          <Carousel.Item interval={2000}>
            <img
              className="d-block w-100"
              src="/Images/5.jpeg"
              alt="First slide"
              style={{width:"80%",height:"500px",opacity: "0.8"}}
            />
            <Carousel.Caption>
              <h3 className='text-white w-75 m-auto'>{strings.home.caption1}</h3>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item interval={2000}>
            <img
              className="d-block w-100"
              src="/Images/4.jpeg"
              alt="Second slide"
              style={{width:"80%",height:"500px",opacity: "0.8"}}
            />
            <Carousel.Caption>
            <h3 className='text-white w-75 m-auto'>{strings.home.caption2}</h3>       
            </Carousel.Caption>
          </Carousel.Item >
          <Carousel.Item interval={2000}>
            <img
              className="d-block w-100"
              src="/Images/7.jpg"
              alt="Third slide"
              style={{width:"80%",height:"500px",opacity: "0.8"}}
            />
            <Carousel.Caption>
            <h3 className='text-white w-75 m-auto'>{strings.home.caption3}</h3>       
             
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      );
};

export default Silder;