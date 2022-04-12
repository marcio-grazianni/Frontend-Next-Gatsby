import React, {useEffect, useState, useCallback } from 'react';
import { PlaidLink, usePlaidLink } from 'react-plaid-link';
import Box from 'common/src/components/Box';
import Text from 'common/src/components/Text';
import Heading from 'common/src/components/Heading';
import Button from 'common/src/components/Button';
import FeatureBlock from 'common/src/components/FeatureBlock';
import Container from 'common/src/components/UI/Container';
import PartnerHistoryWrapper, { CounterUpArea } from './partnerHistory.style';


const LinkAccount = ({
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

  return (
    <PartnerHistoryWrapper id="partners">
      <Container>
        <Box className="row" {...row}>
          <Box className="col" {...col} style={{ flexDirection: 'column' }}>
            <Text {...sectionSubTitle} />
            <FeatureBlock
              title={<Heading {...title} />}
              description={<Text {...description} />  }
              //button={<Button //onClick={() => open()} 
              //                //disabled={!ready} 
              //                title="LINK CHECKING" {...btnStyle} />}
            />
            {linkToken && <PlaidLink
             token={linkToken}
             onSuccess={onSuccess}
             >
               Link checking account
             </PlaidLink>
            }
            </Box>
            </Box>
      </Container>
    </PartnerHistoryWrapper>
  );
};

export default LinkAccount;

// Partner default style
LinkAccount.defaultProps = {
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
    content: 'Enter your login info to connect your checking account.',
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
      "No more scanning documents. Simply enter your username and password into our secure platform, and you're all done!",
    fontSize: '16px',
    color: '#343d48cc',
    lineHeight: '2.1',
    mb: '33px',
    textAlign: ['center', 'left'],
  },
  sectionSubTitle: {
    content: 'Connect checking account',
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