import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
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

const LoanCard = ({ currentUser, description, title, button }) => {
  const onFinish = async (e) => {
    window.open(currentUser.loan.preApproval.preApprovalLetterURL);
  };

  const editLetter = async (e) => {
    navigate('/Dashboard/editPreApprovalLetter/');
  };

  const navigateToDisclosures = () => {
    navigate('/Dashboard/disclosures/');
  };
  useEffect(() => {
    console.log('currentuser', currentUser);
  });

  return (
    <SectionWrapper id="pricing">
      <Container className="containerClass">
        <SectionHeader></SectionHeader>
        <PricingArea>
          <Heading
            content={
              'Your current loan amount is $' +
              currentUser?.loan.termsOfLoan.baseLoanAmount.toLocaleString()
            }
            {...title}
            fontWeight="bold"
          />
          <Heading
            content={
              "You can edit the purchase price and down payment amounts on your letter so that it is personalized to a specific property when you're making offers. Learn about pre-approval letters"
            }
            fontWeight=""
            {...description}
          />
          <p></p>
          <div className="containerClassBuyProcess">
            <Button
              type="primary"
              title="View letter"
              htmlType="submit"
              {...button}
              onClick={onFinish}
            ></Button>
          </div>
          <p></p>
          <Heading
            content={'Looking at homes?'}
            fontWeight="bold"
            {...description}
          />
          <p></p>
          <p></p>
          <Heading
            content={
              'A letter with your highest pre-approved amount can help your agent find potential homes.'
            }
            fontWeight=""
            {...description}
          />
          <p></p>
          <div className="containerClassBuyProcess">
            <Button
              type="primary"
              title="Edit letter"
              htmlType="submit"
              {...button}
              onClick={editLetter}
            ></Button>
          </div>

          <p></p>
          <Heading
            content={'Making an offer?'}
            fontWeight="bold"
            {...description}
          />
          <p></p>
          <p></p>
          <Heading
            content={
              'Easily customize your pre-approval letter to match your offer amount.'
            }
            fontWeight=""
            {...description}
          />
          <p></p>
          <div className="containerClassBuyProcess">
            <Button
              type="primary"
              title="Edit letter"
              htmlType="submit"
              {...button}
              onClick={editLetter}
            ></Button>
          </div>
        </PricingArea>
      </Container>
    </SectionWrapper>
  );
};

LoanCard.propTypes = {
  title: PropTypes.object,
  btnStyle: PropTypes.object,
  description: PropTypes.object,
  contentStyle: PropTypes.object,
  discountText: PropTypes.object,
  discountAmount: PropTypes.object,
  outlineBtnStyle: PropTypes.object,
};

LoanCard.defaultProps = {
  row: {
    flexBox: true,
    flexWrap: 'wrap',
    ml: '-15px',
    mr: '-15px',
  },
  row2: {
    flexBox: true,
    flexWrap: 'wrap',
    ml: '-30px',
    mr: '-15px',
  },
  imageAreaRow: {
    flexDirection: 'row-reverse',
  },
  col: {
    pr: '15px',
    pl: '15px',
    width: [1, 1 / 2, 1 / 2, 1 / 2, 1 / 2],
    flexBox: true,
    alignSelf: 'center',
  },
  imageArea: {
    width: ['0%', '0%', '21%', '17%', '25%'],
    ml: 'auto',
  },
  title: {
    fontSize: ['26px', '34px', '42px', '42px', '47px'],
    fontWeight: '600',
    color: '#000000',
    letterSpacing: '-0.025em',
    mb: ['20px', '25px'],
    lineHeight: '1.31',
  },
  description: {
    fontSize: ['14px', '16px', '18px', '18px', '20px'],
    color: '#000000',
    lineHeight: '30px',
    mb: '0',
    maxWidth: '550px',
  },
  btnStyle: {
    minWidth: ['120px', '156px'],
    fontSize: '15px',
    fontWeight: '700',
    borderRadius: '6px',
  },
  outlineBtnStyle: {
    minWidth: ['130px', '156px'],
    fontSize: '16px',
    fontWeight: '700',
    color: '#fff',
    p: '5px 10px',
  },
};

const mapStateToProps = (state) => ({
  currentUser: state.root.currentUser?.user,
  userToken: state.root.currentUser?.token,
});

const mapDispatchToProps = (dispatch) => {
  return {
    updateUserInfo: (currentUser, userToken) =>
      dispatch(updateUserInfo(currentUser, userToken)),
  };
};

const LoanCardRedux = connect(mapStateToProps, mapDispatchToProps)(LoanCard);

export default LoanCardRedux;
