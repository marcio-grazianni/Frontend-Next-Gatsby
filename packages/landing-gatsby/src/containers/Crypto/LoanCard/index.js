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

import crown from 'common/src/assets/image/appModern/crown.svg';

import { pricing } from 'common/src/data/Crypto';

const LoanCard = ({ currentUser }) => {
  const { slogan, title, monthly, annualy } = pricing;
  const [state, setState] = useState({
    active: 'monthly',
    pricingPlan: monthly,
  });

  const continueApplication = async (e) => {
    navigate(currentUser?.applicationStep);
  };

  const navigateToDisclosures = () => {
    navigate('/Dashboard/disclosures/');
  };

  return (
    <SectionWrapper id="pricing">
      <Container className="containerClass">
        <SectionHeader>
          <Heading as="h5" content={slogan} />
          {/*<Heading content={title} />*/}
        </SectionHeader>
        <PricingArea>
          <InnerWrapper>
            {/*{state.pricingPlan.map((item) => ( */}
            <PricingCard>
              {/*{item.suggested && (*/}
              <span className="tag">
                <img src={crown} alt="Crown" /> Almost complete!
              </span>

              <div className="card-header">
                <Heading as="h3" content={currentUser?.loanType} />
                <Text content={`Application # ${currentUser?.loanNumber}`} />
              </div>
              <div className="card-body">
                <ul className="feature-list">
                  <li key={`${state.active}-feature--key${1}`}>
                    <Icon icon={checkmarkCircled} /> {currentUser?.firstName}{' '}
                    {currentUser?.lastName}
                  </li>
                  <li key={`${state.active}-feature--key${2}`}>
                    <Icon icon={checkmarkCircled} />{' '}
                    {currentUser?.propertyAddress}
                    {','} {currentUser?.city}
                    {','} {currentUser?.state}
                  </li>
                  <li key={`${state.active}-feature--key${3}`}>
                    <Icon icon={checkmarkCircled} /> {'APR: '}
                    {currentUser?.APRSelected}
                  </li>
                  <li key={`${state.active}-feature--key${4}`}>
                    <Icon icon={checkmarkCircled} /> {'Term: '}
                    {/*  {currentUser?.user.term} */}
                    {'30 yrs'}
                  </li>
                  <li key={`${state.active}-feature--key${5}`}>
                    <Icon icon={checkmarkCircled} /> {'Monthly Payment: '}
                    {currentUser?.monthlyPaymentSelected}
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
                  title={'Continue Application'}
                  //go to last completed step
                  onClick={continueApplication}
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
