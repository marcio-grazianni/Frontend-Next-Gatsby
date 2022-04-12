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
import LoanCard from '../TodaysRatesCard';
import BannerBG from 'common/src/assets/image/crypto/shutterstock_1106309045.jpg';
import BannerWrapper, {
  BgImageWrapper,
} from '../BannerSection/bannerSection.style';
import companyComparisonTable from 'common/src/assets/image/crypto/companyComparisonTable.png';

import { TransactionsWrapper, FeatureSection } from './transaction.style';

const MagazineLogos = ({
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
  return (
    <TransactionsWrapper id="transactions">
      <Container className="containerClass">
        <Box
          className="row"
          {...row}
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around',
            paddingBottom: '30px',
          }}
        >
          <Text
            content={'How Harris is changing the mortgage business'}
            style={{
              fontSize: '24px',
              fontWeight: '600',
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
            }}
          />
          {/*  <Box className="colleft" {...col} style={{ flexDirection: 'column' }}> */}
          <Image src={companyComparisonTable} width="900" height="200" />

          {/*  </Box> */}
          {/*  <Box
            className="colright"
            {...col}
            style={{
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
          </Box> */}
        </Box>
      </Container>
    </TransactionsWrapper>
  );
};

// Transactions style props
MagazineLogos.propTypes = {
  sectionHeader: PropTypes.object,
  sectionTitle: PropTypes.object,
  sectionSubTitle: PropTypes.object,
  row: PropTypes.object,
  col: PropTypes.object,
  featureTitleStyle: PropTypes.object,
  featureDescriptionStyle: PropTypes.object,
};

// Transactions default style
MagazineLogos.defaultProps = {
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
    color: '#000000',
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

export default MagazineLogos;
