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
import Container from 'common/src/components/UI/Container';
import { SectionHeader } from '../appModern.style';
import SectionWrapper, {
  ButtonGroup,
  PricingArea,
  InnerWrapper,
  PricingCard,
} from './pricingPolicy.style';
import { updateUserInfo } from '../../../actions';
import BannerWrapper, {
  BgImageWrapper,
} from '../BannerSection/bannerSection.style';
import BannerBG from 'common/src/assets/image/crypto/shutterstock_1106309045.jpg';

import crown from 'common/src/assets/image/appModern/crown.svg';

import { pricing } from 'common/src/data/Crypto';

const LoanCard = ({ currentUser }) => {
  const { slogan, title, monthly, annualy } = pricing;
  const [state, setState] = useState({
    active: 'monthly',
    pricingPlan: monthly,
  });

  const goToBuy = async (e) => {
    navigate('/buy-pages/buy-process/');
  };

  const goToRefi = async (e) => {
    navigate('/refi-pages/refinance-reasons/');
  };

  return (
    <SectionWrapper id="pricing">
      <Container className="containerClass">
        <PricingArea>
          <InnerWrapper>
            {/*{state.pricingPlan.map((item) => ( */}
            <PricingCard>
              <div className="card-header">
                <Heading as="h3" content={`Mortgage: Purchase a home`} />
                <Text content={`Search for the lowest rate`} />
              </div>
              <div className="card-body">
                <ul className="feature-list">
                  {/* <li key={`${state.active}-feature--key${1}`}>
                    <Icon icon={checkmarkCircled} /> 15 and 30 yr fixed and
                    adjustable term options
                  </li> */}
                  <li key={`${state.active}-feature--key${2}`}>
                    <Icon icon={checkmarkCircled} />
                    Custom rate and payment options
                  </li>
                  {/* <li key={`${state.active}-feature--key${3}`}>
                    <Icon icon={checkmarkCircled} />
                    Jumbo Loans Available
                  </li> */}
                  <li key={`${state.active}-feature--key${4}`}>
                    <Icon icon={checkmarkCircled} /> See the lowest rate in a
                    few clicks
                  </li>
                </ul>
              </div>
              <div className="card-footer">
                {/* <strong>
                  <span>${currentUser?.user.loanAmountSelected}</span>
                </strong> */}
                {/* <Button
                  title={'Disclosures'}
                  //go to last completed step
                  onClick={navigateToDisclosures}
                /> */}
                <Button
                  title={'See the lowest rates'}
                  //go to last completed step
                  onClick={goToBuy}
                />
              </div>
            </PricingCard>
            <PricingCard>
              <div className="card-header">
                <Heading as="h3" content={`Mortgage: Lower my payment`} />
                <Text content={`Search for the lowest payment`} />
              </div>
              <div className="card-body">
                <ul className="feature-list">
                  {/* <li key={`${state.active}-feature--key${1}`}>
                    <Icon icon={checkmarkCircled} /> 15 and 30 yr fixed and
                    adjustable term options
                  </li> */}
                  <li key={`${state.active}-feature--key${2}`}>
                    <Icon icon={checkmarkCircled} />
                    $0 closing cost options available
                  </li>
                  <li key={`${state.active}-feature--key${3}`}>
                    <Icon icon={checkmarkCircled} />
                    Custom rate and payment options
                  </li>
                  {/*  <li key={`${state.active}-feature--key${4}`}>
                    <Icon icon={checkmarkCircled} /> Jumbo Loans Available
                  </li> */}
                  <li key={`${state.active}-feature--key${5}`}>
                    <Icon icon={checkmarkCircled} /> See your rate in a few
                    clicks and online application
                  </li>
                </ul>
              </div>
              <div className="card-footer">
                {/* <strong>
                  <span>${currentUser?.user.loanAmountSelected}</span>
                </strong> */}
                {/* <Button
                  title={'Disclosures'}
                  //go to last completed step
                  onClick={navigateToDisclosures}
                /> */}
                <Button
                  title={'See the lowest payment'}
                  //go to last completed step
                  onClick={goToRefi}
                />
              </div>
            </PricingCard>

            {/*{state.pricingPlan.map((item) => ( */}
            <PricingCard>
              <div className="card-header">
                <Heading as="h3" content={`Mortgage: Get cash out`} />
                <Text content={`Search for the cheapest cash out`} />
              </div>
              <div className="card-body">
                <ul className="feature-list">
                  <li key={`${state.active}-feature--key${1}`}>
                    <Icon icon={checkmarkCircled} />
                    Get cash deposited into your account upon closing
                  </li>
                  {/* <li key={`${state.active}-feature--key${2}`}>
                    <Icon icon={checkmarkCircled} />
                    15 and 30 yr fixed and adjustable term options
                  </li> */}
                  <li key={`${state.active}-feature--key${3}`}>
                    <Icon icon={checkmarkCircled} />
                    Custom rate and payment options
                  </li>
                  <li key={`${state.active}-feature--key${4}`}>
                    <Icon icon={checkmarkCircled} /> See your rate in a few
                    clicks and online application
                  </li>
                </ul>
              </div>
              <div className="card-footer">
                {/* <strong>
                  <span>${currentUser?.user.loanAmountSelected}</span>
                </strong> */}
                {/* <Button
                  title={'Disclosures'}
                  //go to last completed step
                  onClick={navigateToDisclosures}
                /> */}
                <Button
                  title={'Get cash out'}
                  //go to last completed step
                  onClick={goToRefi}
                />
              </div>
            </PricingCard>
          </InnerWrapper>
        </PricingArea>
      </Container>
    </SectionWrapper>
  );
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
