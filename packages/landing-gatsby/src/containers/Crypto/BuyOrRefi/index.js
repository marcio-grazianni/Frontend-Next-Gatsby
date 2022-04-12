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
//import { TransactionsWrapper, FeatureSection } from './transaction.style';
import ContactFromWrapper, { SectionMainWrapper } from './contact.style';

const BuyOrRefi = ({
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

  const buy = async () => {
	localStorage.setItem('loanPurposeType', JSON.stringify("Purchase"));
    navigate('/buy-pages/buy-process/');
  };
  const onFinish = async () => {
	localStorage.setItem('loanPurposeType', JSON.stringify("Refinance"));
    navigate('/refi-pages/refinance-reasons/');
  };

  return (
    <SectionMainWrapper>
      <Container>
        <Box className="row" {...row}>
          <Box
            className="colleft"
            {...col}
            style={{ flexDirection: 'column', paddingBottom: '90px' }}
          >
            {/* <FeatureSection> */}

            <FeatureBlock
              title={<Heading content="Are you buying?" {...title} />}
              /* description={
                <Text
                  content="Apply 100% online in minutes.  No need to wait for traditional 
				  lenders or banks. With Harris, you can apply from the comfort of your home. 
				  With our streamlined application process, we’ll automatically and securely 
				  gather the necessary information."
                  {...description}
                />
              } */
              button={<Button onClick={buy} title="See rates" {...btnStyle} />}
            />
          </Box>
          <Box
            className="colright"
            {...col}
            style={{
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              paddingBottom: '90px',
            }}
          >
            <FeatureBlock
              title={
                <Heading content="Or are you refinancing a home?" {...title} />
              }
              /* description={
                <Text
                  content="Apply 100% online in minutes.  No need to wait for traditional 
				  lenders or banks. With Harris, you can apply from the comfort of your home. 
				  With our streamlined application process, we’ll automatically and securely 
				  gather the necessary information."
                  {...description}
                />
              } */
              button={
                <Button onClick={onFinish} title="See rates" {...btnStyle} />
              }
            />
          </Box>
        </Box>
      </Container>
    </SectionMainWrapper>
  );
};

// Transactions style props
BuyOrRefi.propTypes = {
  sectionHeader: PropTypes.object,
  sectionTitle: PropTypes.object,
  sectionSubTitle: PropTypes.object,
  row: PropTypes.object,
  col: PropTypes.object,
  featureTitleStyle: PropTypes.object,
  featureDescriptionStyle: PropTypes.object,
};

// Transactions default style
BuyOrRefi.defaultProps = {
  // Transactions section row default style
  row: {
    flexBox: true,
    flexWrap: 'wrap',
    marginTop: '200px',
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
    color: '#32325d',
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

export default BuyOrRefi;
