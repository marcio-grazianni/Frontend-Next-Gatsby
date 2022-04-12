import React from 'react';
import PropTypes from 'prop-types';
import { useStaticQuery, graphql } from 'gatsby';
import Image from 'gatsby-image';
import Box from 'common/src/components/Box';
import Text from 'common/src/components/Text';
import Heading from 'common/src/components/Heading';
import Container from 'common/src/components/UI/Container';
import GlideCarousel from 'common/src/components/GlideCarousel';
import GlideSlide from 'common/src/components/GlideCarousel/glideSlide';
import TestimonialSecWrapper, {
  ImageWrapper,
  TestimonialItem,
} from './bannerSlider.style';

import { TESTIMONIALS } from 'common/src/data/Crypto';

const TestimonialSlider = ({
  reviewStyle,
  TestimonialMeta,
  nameStyle, 
  designationStyle,
}) => {
  //Carousel Options
  const carouselOptions = {
    type: 'carousel',
    autoplay: 6000,
	gap: 30,
    perView: 2,
    animationDuration: 500,
  };

  const Data = useStaticQuery(graphql`
    query {
      cryptoJson {
        TESTIMONIALS {
          name
          designation
          reviewTitle
		  review
          avatar {
            childImageSharp {
              fluid(quality: 100) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
  `);

  return (
    <TestimonialSecWrapper id="testimonial_section">
      <Container>
		  <Box>
        {/* <div style={{ width: '440px' }}> */}
          <GlideCarousel
            options={carouselOptions}
            bullets={true}
            numberOfBullets={4}
            controls={false}
          >
            <>
              {Data.cryptoJson.TESTIMONIALS.map((slideItem, index) => (
				/* {TESTIMONIALS.map((slideItem, index) => ( */
                <GlideSlide key={`testimonial-slide-${index}`}>
                  <TestimonialItem className="testimonial_item">
				  <Text content={slideItem.reviewTitle}  {...reviewStyle} fontWeight="bold" color=""/>
                    <Text content={slideItem.review} {...reviewStyle} />
                    <Box {...TestimonialMeta}>
                      <ImageWrapper>
                        <Image
							/* src={slideItem.avatar} */
                          fluid={
                            (slideItem.avatar !== null) | undefined
                              ? slideItem.avatar.childImageSharp.fluid
                              : {}
                          }
                          alt={`reviewer-image-${index}`}
                        />
                      </ImageWrapper>
                      <Box>
                        <Heading content={slideItem.name} {...nameStyle} />
                        <Text
                          content={slideItem.designation}
                          {...designationStyle}
                        />
                      </Box>
                    </Box>
                  </TestimonialItem>
                </GlideSlide>
              ))}
            </>
          </GlideCarousel>
       {/*  </div> */}
		</Box>
      </Container>
    </TestimonialSecWrapper>
  );
};

TestimonialSlider.propTypes = {
  reviewStyle: PropTypes.object,
  TestimonialMeta: PropTypes.object,
  nameStyle: PropTypes.object,
  designationStyle: PropTypes.object,
};

TestimonialSlider.defaultProps = {
  reviewStyle: {
    fontSize: ['16px', '16px', '16px', '16px', '16px'],
    fontWeight: '400',
    color: 'rgb(82, 95, 127)',
    lineHeight: '1.74',
    mb: ['30px', '30px', '30px', '30px', '40px'],
  },
  TestimonialMeta: {
    flexBox: true,
    alignItems: 'center',
  },
  nameStyle: {
    as: 'h3',
    fontSize: ['16px', '17px', '18px', '18px', '20px'],
    fontWeight: '500',
    color: 'rgb(50, 50, 93)',
    mb: '5px',
    fontFamily: 'Poppins',
  },
  designationStyle: {
    fontSize: '16px',
    fontWeight: '400',
    color: 'rgb(82, 95, 127)',
    mb: '0',
    fontFamily: 'Poppins',
  },
};

export default TestimonialSlider;
