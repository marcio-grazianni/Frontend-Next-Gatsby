import React, {useEffect, useState, useCallback } from 'react';
import { PlaidLink, usePlaidLink } from 'react-plaid-link';
import PropTypes from 'prop-types';
import Box from 'common/src/components/Box';
import Card from 'common/src/components/Card';
import Image from 'common/src/components/Image';
import Text from 'common/src/components/Text';
import Heading from 'common/src/components/Heading';
import Button from 'common/src/components/Button';
import Link from 'common/src/components/Link';
import FeatureBlock from 'common/src/components/FeatureBlock';
import Container from 'common/src/components/UI/Container';
import PartnerHistoryWrapper, { CounterUpArea } from './partnerHistory.style';

const TaxReturnConnect = ({
  row,
  col,
  cardStyle,
  title,
  description,
  description1,
  btnStyle,
  sectionSubTitle,
  cardArea,
}) => {

  const [linkToken, setLinkToken] = useState('');
  const [accessToken, setAccessToken] = useState('');

  useEffect(() => {
    (async() => {
      try {
        const res = await fetch('http://localhost:3000/api/create_link_token');
        const {link_token} = await res.json();
        setLinkToken(link_token);
      } catch(err) {
        console.log('err occured===>>', err)
      }
    })();
  }, []); 

  const onSuccess = async (token, metadata) => {
    console.log('tokennn==>>>', token, 'metada==>', metadata)
    try {
      await fetch('http://localhost:3000/api/set_access_token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({publicToken: token})
      });
      //const {access_token} = await res.json();
      //setAccessToken(access_token);
    } catch(err) {
      console.log('err occured===>>', err)
    }
  }


{/*
  //hook attempt
  const onSuccess = useCallback((token, metadata) => {
    // send token to server
    console.log('tokennn==>>>', token, 'metada==>', metadata)
    try {
      fetch('http://localhost:3000/api/set_access_token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({publicToken: token})
      });
      //const {access_token} = await res.json();
      //setAccessToken(access_token);
    } catch(err) {
      console.log('err occured===>>', err)
    }
  }, []);

  const config = {
    token: {linkToken},
    onSuccess,
    // ...
  };

  const { open, ready, error } = usePlaidLink(config);
*/}  



  return (
    <PartnerHistoryWrapper id="partners">
      <Container>
        <Box className="row" {...row}>
          <Box className="col" {...col} style={{ flexDirection: 'column' }}>
            <Text {...sectionSubTitle} />
            <FeatureBlock
              
              description={<Text {...description} />  }
              button={<Button //onClick={() => open()} 
                              //disabled={!ready} 
                              title="LINK TAX RETURNS" {...btnStyle} />}
            />
            {linkToken && <PlaidLink
             token={linkToken}
             onSuccess={onSuccess}
             >
               Link tax returns
             </PlaidLink>
            }
            </Box>
            </Box>
      </Container>
    </PartnerHistoryWrapper>
  );
};

export default TaxReturnConnect;

// Partner default style
TaxReturnConnect.defaultProps = {
  // Partner section row default style
  row: {
    flexBox: true,
    flexWrap: 'wrap',
    ml: '-15px',
    mr: '-15px',
  },
  // Partner section col default style
  col: {
    pr: '15px',
    pl: '15px',
    width: [1, 1 / 2, 1 / 2, 1 / 2, 1 / 2],
    flexBox: true,
    alignSelf: 'center',
  },
  // Card default style
  cardStyle: {
    p: '53px 40px 35px',
    borderRadius: '10px',
    boxShadow: '0px 8px 20px 0px rgba(16, 66, 97, 0.07)',
  },
  // Partner section title default style
  title: {
    content: '',
    fontSize: ['24px', '26px', '30px', '36px', '48px'],
    fontWeight: '300',
    color: '#0f2137',
    letterSpacing: '-0.010em',
    mb: '20px',
    maxWidth: ['100%', '100%', '100%', '490px', '490px'],
    textAlign: ['center', 'left'],
  },
  // Partner section description default style
  description: {
    content:
      'Connect your IRS.gov account or tax service.  This provides your gross income in a few easy steps.',
    fontSize: '16px',
    color: '#343d48cc',
    lineHeight: '2.1',
    mb: '33px',
    textAlign: ['center', 'left'],
  },
  sectionSubTitle: {
    content: 'Connect your tax returns',
    as: 'span',
    textAlign: 'left',
    fontSize: '14px',
    letterSpacing: '0.13em',
    fontWeight: '700',
    color: '#1a73e8',
    mb: '10px',
    textAlign: ['center', 'left'],
  },
  // Button default style
  btnStyle: {
    minWidth: '156px',
    fontSize: '14px',
    fontWeight: '500',
  },
  cardArea: {
    pl: [0, 0, '40px', 0, 0],
  },
};


  {/*
    <Container>
      <Heading content="Link checking account"/>
        <Text content="Enter your login info to link your account"/>
    
    {linkToken && <PlaidLink
      token={linkToken}
      onSuccess={onSuccess}
      
    >
      Connect a bank account
    </PlaidLink>}
    </Container>  
    */}