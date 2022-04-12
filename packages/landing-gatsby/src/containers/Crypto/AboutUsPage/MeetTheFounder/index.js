import React from 'react';
import { navigate } from 'gatsby';
import PropTypes from 'prop-types';
import { useStaticQuery, graphql } from 'gatsby';
import Box from 'common/src/components/Box';
import Fade from 'react-reveal/Fade';
import Text from 'common/src/components/Text';
import Heading from 'common/src/components/Heading';
import Button from 'common/src/components/Button';
import Image from 'common/src/components/Image';
import FeatureBlock from 'common/src/components/FeatureBlock';
import Container from 'common/src/components/UI/Container';
//import AppVideoFile from 'common/src/assets/image/Chrisharrisglob-04.mp4'//import AppVideoFile from 'common/src/assets/image/Chrisharrisglob.m4v'
import AppVideoFile from 'common/src/assets/image/Chrisharrisglob-042.gif'; //import AppVideoFile from 'common/src/assets/image/Chrisharrisglob.m4v'
import founderPhoto from 'common/src/assets/image/Photo_nasa_resize.jpg';

import { TransactionsWrapper, FeatureSection } from './transaction.style';

const AppVideo = ({
  row,
  col,
  title,
  description,
  btnStyle,
  sectionSubTitle,
  cardArea,
  featureTitleStyle,
  featureDescriptionStyle,
}) => {
  const Data = useStaticQuery(graphql`
    query {
      cryptoJson {
        TRANSACTIONS_FEATURE {
          title
          des
          image {
            publicURL
          }
        }
      }
    }
  `);

  const onFinish = async () => {
    navigate('/refi-pages/refi-application/');
  };

  return (
    <TransactionsWrapper id="MortgagesDontHaveToBeDifficult">
      <Container>
        <Box className="row" {...row}>
          <Box className="colleft" {...col} style={{ flexDirection: 'column' }}>
            {/* <FeatureSection> */}

            <FeatureBlock
              title={<Heading content="Why I started Harris" {...title} />}
              description={
                <Text
                  content="The homebuying process is complex and stressful.  Most companies run on old processes, which 
				  makes getting a mortgage outrageously expensive.  Shopping around for a mortgage is even more difficult, 
				  and you don't know what you can afford until the end.  Whether you've 
				  submitted an offer, or are just getting started, Harris's technology and team of home experts
				  will provide you with the tools and information to help you experience an
				  easier home buying or refinancing journey, right from the start."
                  {...description}
                />
              }
              /* button={
                <Button
                  onClick={onFinish}
                  title="See today's rates"
                  {...btnStyle}
                />
              } */
            />
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
            {/*  <ReactPlayer
            className='react-player fixed-bottom'
            url={AppVideoFile}
			playing={true}
			loop={true}
			muted={true}
			width='60%'
            height='60%'
			playsinline
            controls = {false}
            /> */}
            <FeatureBlock
              description={
                <Text
                  content="Founder - Chris Harris"
                  {...description}
                  fontWeight="600px"
                />
              }
              /* button={
                <Button
                  onClick={onFinish}
                  title="See today's rates"
                  {...btnStyle}
                />
              } */
            />
            <img src={founderPhoto} width="80%" height="80%" />
            {/* </FeatureSection> */}
          </Box>
        </Box>
      </Container>
    </TransactionsWrapper>
  );
};

// Transactions style props
AppVideo.propTypes = {
  sectionHeader: PropTypes.object,
  sectionTitle: PropTypes.object,
  sectionSubTitle: PropTypes.object,
  row: PropTypes.object,
  col: PropTypes.object,
  featureTitleStyle: PropTypes.object,
  featureDescriptionStyle: PropTypes.object,
};

// Transactions default style
AppVideo.defaultProps = {
  // Transactions section row default style
  row: {
    flexBox: true,
    flexWrap: 'wrap',
    ml: '-15px',
    mr: '-15px',
  },
  // Transactions section col default style
  col: {
    pr: '15px',
    pl: '15px',
    width: [1, 1 / 2, 1 / 2, 1 / 2, 1 / 2],
    flexBox: true,
    alignSelf: 'center',
  },
  // Transactions section title default style
  title: {
    fontSize: ['24px', '26px', '30px', '36px', '40px'],
    lineHeight: ['30px', '32px', '40px', '50px', '55px'],
    fontWeight: '700',
    color: '#000000',
    letterSpacing: '-0.010em',
    mb: '20px',
    maxWidth: ['100%', '100%', '100%', '100%', '415px'],
  },
  // Transactions section description default style
  description: {
    fontSize: '16px',
    fontWeight: '400',
    color: '#525f7f',
    lineHeight: '28px',
    mb: ['30px', '30px', '40px', '40px', '55px'],
    maxWidth: ['100%', '100%', '100%', '100%', '430px'],
  },
  sectionSubTitle: {
    as: 'span',
    fontSize: ['16px', '16px', '18px', '20px', '20px'],
    fontFamily: 'Poppins',
    fontWeight: '600',
    lineHeight: '27px',
    color: '#525f7f',
  },
  // Button default style
  btnStyle: {
    minWidth: '156px',
    fontSize: '14px',
    fontWeight: '500',
  },
  featureTitleStyle: {
    fontSize: ['18px', '18px', '20px', '20px', '20px'],
    lineHeight: ['25px', '27px', '27px', '27px', '27px'],
    fontWeight: '500',
    color: '#32325d',
    letterSpacing: '-0.010em',
    mb: '10px',
  },
  // Transactions section description default style
  featureDescriptionStyle: {
    fontSize: '16px',
    fontWeight: '400',
    color: '#525f7f',
    lineHeight: '27px',
  },
};

export default AppVideo;
