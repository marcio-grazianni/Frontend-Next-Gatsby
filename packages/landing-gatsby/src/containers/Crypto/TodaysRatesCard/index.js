import React, { useState } from 'react';
import { connect } from 'react-redux';
//import Link from 'gatsby';
//import Link from 'common/src/components/Link';
import { navigate } from 'gatsby';
import { Icon } from 'react-icons-kit';
import { checkmarkCircled } from 'react-icons-kit/ionicons/checkmarkCircled';
import Text from 'common/src/components/Text';
import Heading from 'common/src/components/Heading';
import Button from 'common/src/components/Button';
import Box from 'common/src/components/Box';
import Container from 'common/src/components/UI/Container';
import { SectionHeader } from '../appModern.style';
import SectionWrapper, {
  ButtonGroup,
  PricingArea,
  InnerWrapper,
  PricingCard,
} from './pricingPolicy.style';
import { updateUserInfo } from '../../../actions';

import crown from 'common/src/assets/image/appModern/crown.svg';

import { pricing } from 'common/src/data/Crypto';

const LoanCard = ({ currentUser , row, col, cardArea, }) => {
  const { slogan, title, monthly, annualy } = pricing;
  const [state, setState] = useState({
    active: 'monthly',
    pricingPlan: monthly,
  });

  const continueApplication = async (e) => {
    navigate('/refi-pages/refi-application/');
  };

  return (
	  <div>
    {/* <SectionWrapper id="pricing"> */}
      {/* <Container className="containerClass"> */}
        {/* <PricingArea> */}
          {/* <InnerWrapper> */}
				<PricingCard>
              <div className="card-header">
			  	{/* <Heading content={`Today's best rates`} fontWeight='bold' /> */}
				<Text content={`Purchase Rate/APR`} />
				<Text content={`30 yr fixed`} />
				<Heading content={`2.500% / 2.663%`} fontWeight='bold' />
				<Text content={``} />
				<Heading content={``} fontWeight='bold' />

				<Text content={`Purchase Rate/APR`} />
				<Text content={`20 yr fixed`} />
				
				<Heading content={`2.375% / 2.523%`} fontWeight='bold' />
              
			  	<Text content={`Purchase Rate/APR`} />
				  <Text content={`15 Yr fixed`} />
				<Heading content={`2.000% / 2.187%`} fontWeight='bold' />
              </div>
            </PricingCard>		
          {/* </InnerWrapper> */}
      {/*   </PricingArea> */}
      {/* </Container> */}
    {/*  </SectionWrapper> */}
	</div>
  );
};

LoanCard.defaultProps = {
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
};

const mapStateToProps = ({ root: { currentUser } }) => ({
  currentUser: currentUser?.user,
  userToken: currentUser?.token,
});

const mapDispatchToProps = (dispatch) => {
  return {
    updateUserInfo: (currentUser, userToken) =>
      dispatch(updateUserInfo(currentUser, userToken)),
  };
};

const LoanCardRedux = connect(mapStateToProps, mapDispatchToProps)(LoanCard);

export default LoanCardRedux;
