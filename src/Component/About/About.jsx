import React from "react";
import { Container, Row, Col } from "reactstrap";
import Helmet from "../About/Helmet";
import CommonSection from "../About/CommonSection";
import AboutSection from "../About/AboutSection";

import "../About/about.css";
import strings from "../../lang/lang";


const About = () => {
  return (
		<Helmet title='About'>
			<CommonSection title={strings.navbar.about}/>
			<AboutSection aboutClass='aboutPage' />

			<section className='about__page-section'>
				<Container>
					<Row>
						<Col lg='6' md='6' sm='12'>
							
						</Col>

						<Col lg='6' md='6' sm='12'>
							<div className='about__page-content'>
								<h2 className='section__title'>
								</h2>
								{['desc-1', 'desc-2'].map((_, index) => {
									return (
										<p className='section__description' key={index}>
											
										</p>
									);
								})}

								<div className=' d-flex align-items-center gap-3 mt-4'>
									<span className='fs-4'>
										<i class='ri-phone-line'></i>
									</span>

									
								</div>
							</div>
						</Col>
					</Row>
				</Container>
			</section>


			<section>
				<Container>
					<Row>
						<Col lg='12' className='mb-5 text-center'>
							
						</Col>
					</Row>
				</Container>
			</section>
		</Helmet>
	);
};

export default About;
