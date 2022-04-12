import React from 'react';
import PropTypes from 'prop-types';
import { useStaticQuery, graphql } from 'gatsby';
import Fade from 'react-reveal/Fade';
import Box from 'common/src/components/Box';
import Image from 'common/src/components/Image';
import Text from 'common/src/components/Text';
import Heading from 'common/src/components/Heading';
import FeatureBlock from 'common/src/components/FeatureBlock';
import Container from 'common/src/components/UI/Container';
import { BetaSectionWrapper, FeatureSection } from './betaSection.style';
import ReactPlayer from 'react-player';

const BetaSection = ({
  row,
  col,
  title,
  description,
  featureTitleStyle,
  featureDescriptionStyle,
}) => {
  const Data = useStaticQuery(graphql`
    query {
      cryptoJson {
        BETA_FEATURE {
          title
          des
          image {
            publicURL
          }
        }
      }
    }
  `);

  return (
    <BetaSectionWrapper id="betasection">
      <Container>
        <Box className="row" {...row}>
          <Box className="colleft" {...col} style={{ flexDirection: 'column' }}>
            {/* <ReactPlayer
            		className='react-player fixed-bottom'
            		url={ExplainerVideoFile}
					playing={true}
					loop={true}
					muted={true}
					width='100%'
            		height='100%'
            		controls = {false}
					playsinline
            	/> */}
          </Box>
          <Box
            className="colright"
            {...col}
            style={{
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <FeatureBlock
              title={<Heading {...title} />}
              description={<Text {...description} />}
            />
          </Box>

          <FeatureSection>
            {Data.cryptoJson.BETA_FEATURE.map((item, index) => (
              <Fade up key={`feature-${index}`}>
                <div className="featureWrapper">
                  <Image src={item.image.publicURL} alt={item.title} />
                  <Box className="contextPortion">
                    <Heading
                      as="h3"
                      content={item.title}
                      {...featureTitleStyle}
                    />

                    <Text content={item.des} {...featureDescriptionStyle} />
                  </Box>
                </div>
              </Fade>
            ))}
          </FeatureSection>
        </Box>
      </Container>
    </BetaSectionWrapper>
  );
};

// Transactions style props
BetaSection.propTypes = {
  sectionHeader: PropTypes.object,
  sectionTitle: PropTypes.object,
  row: PropTypes.object,
  featureTitleStyle: PropTypes.object,
  featureDescriptionStyle: PropTypes.object,
};

// Trusted default style
BetaSection.defaultProps = {
  // Trusted section row default style
  row: {
    flexBox: true,
    flexWrap: 'wrap',
    ml: '-15px',
    mr: '-15px',
  },

  col: {
    pr: '15px',
    pl: '15px',
    width: [1, 1 / 2, 1 / 2, 1 / 2, 1 / 2],
    flexBox: true,
    alignSelf: 'center',
  },

  title: {
    content: "We're fixing homeownership",
    fontSize: ['24px', '26px', '30px', '36px', '40px'],
    lineHeight: ['30px', '32px', '40px', '50px', '55px'],
    fontWeight: '700',
    color: '#32325d',
    letterSpacing: '-0.010em',
    mb: '20px',
    textAlign: ['center', 'center'],
  },

  description: {
    content: '',
    fontSize: '16px',
    fontWeight: '400',
    color: '#525f7f',
    lineHeight: '28px',
    mb: ['25px', '25px', '30px', '30px', '45px'],
    textAlign: ['center', 'center'],
  },
  featureTitleStyle: {
    fontSize: ['18px', '18px', '20px', '20px', '20px'],
    lineHeight: ['1', '1', '1', '1', '1'],
    fontWeight: '500',
    color: '#32325d',
    letterSpacing: '-0.010em',
    mb: '10px',
    textAlign: ['left', 'left'],
  },
  // Trusted section description default style
  featureDescriptionStyle: {
    fontSize: '16px',
    fontWeight: '400',
    color: '#525f7f',
    lineHeight: '27px',
    textAlign: ['left', 'left'],
  },
};

export default BetaSection;
