import React from "react";
import { Container, Row, Col } from "reactstrap";
import aboutImg from "../About/charge.png";
import "../About/about-section.css";
import { Button } from "@mui/material";
import { Link } from 'react-router-dom';

import "./style.css"
import strings from "../../lang/lang";

const AboutSection = ({ aboutClass }) => {
  return (
		<section
			className='about__section'
			style={
				aboutClass === 'aboutPage'
					? { marginTop: '0px' }
					: { marginTop: '280px' }
			}
		>
			<Container>
				<Row>
					<Col lg='6' md='6'>
	
							<h2 className='section__title'>{strings.about.header}</h2>
							<p className='section__description'>
								&#9734;		{strings.about.list1}
							</p>
							<div>&#9734; 	{strings.about.list2}</div>
							<div>&#9734; 	
							{strings.about.list3}</div>
							<div>&#9734; 	
						{strings.about.list4} </div>
							<Link to='/'>
								<div style={{textAlign:"center",marginTop:"3rem"}}>

        {/* <Button variant="contained" className="btnTagg" style={{borderRaduis:"30px"}}>Back to home</Button> */}
		{/* <button className="btnTagg">Bac</button> */}
								</div>
      </Link>
					</Col>

					<Col lg='6' md='6'>
						<div className='about__img'>
							<img src={aboutImg} alt='about' className='w-100' />
						</div>
					</Col>
				</Row>
			</Container>
		</section>
	);
};

export default AboutSection;
