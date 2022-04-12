//cash back refi select-offer

import React, { Fragment, useState, useEffect } from 'react';
import { navigate } from 'gatsby';
import { connect } from 'react-redux';
import Heading from 'common/src/components/Heading';
import ButtonPage from '../ActiveInactiveButtons/activeInactiveButtons';
import CheckableTable from '../CheckableTable';
import Button from 'common/src/components/Button';
import SliderAnt from 'common/src/components/SliderAnt';
import Text from 'common/src/components/Text';
import Container from 'common/src/components/UI/Container';
import { updateUserInfo } from '../../../actions';
import { loadState } from '../../../store';
//get offer details back from heroku backend node.js (max amount and terms)
//side bar with loan flow
import SectionWrapper, {
  ButtonGroup,
  PricingArea,
  InnerWrapper,
  PricingCard,
} from './pricingPolicy.style';
import { Router } from 'react-router';
//loan explanation

//option to add autopay at reduced fee

//get loan amount selected by user

//option to enroll in partner bank account or credit union
//const maxLoan = 50000;
//save and continue button
function SelectOfferContainer({ currentUser, userToken, updateUserInfo }) {
  useEffect(() => {
    // make api call first time u come to the page or do a browser reload
  }, []);

  // Router.push('/profilr')
  // window.location.href = '/profile'
  // if (localSorage)
  // localstorage
  //const [selectLoanAmountState, setSelectLoanAmountState] = useState(0);

  console.log('select offer currentUser', currentUser);
  //console.log(
  //  'currentUser.maxLoanPossible gotten from back end',
  //  currentUser?.maxLoanPossible
  //);
  console.log('select offer userToken=====>', userToken);
  //if maxloanpossible exists, check, if not, maxloan = 0
  var localState = loadState();
  //console.log(
  //  'localMaxLoanPossible',
  //  localState?.root.currentUser.user.maxLoanPossible
  //);
  var maxLoanPossible = localState?.root.currentUser.user.maxLoanPossible;

  //save and continue button and action
  const saveAndContinue = (currentUser, userToken) => {
    //send loanSelected to store and Database
    //action to send data

    currentUser.applicationStep = '/moreUserInfo/';
    console.log('save and continue currentUser', currentUser);
    updateUserInfo(currentUser, userToken);
    //update user model with loanAmountSelected
    navigate('/moreUserInfo/');
  };

  return (
    <SectionWrapper>
      <Container>
        <PricingArea>
          <InnerWrapper>
            <PricingCard>
              <div className="card-header">
                <Heading
                  as="h3"
                  content={'Select your loan amount by moving the slider'}
                  textAlign="center"
                />
              </div>

              <div className="card-body">
                <ul className="feature-list">
                  <SliderAnt
                    maxLoan={maxLoanPossible}
                    handlePricingChange={(value) => {
                      console.log('prop received into sliderant parent', value);
                      currentUser.loanAmountSelected = value;
                    }}
                  />

                  <Text content="Personalize your loan"></Text>

                  <Text
                    content="Juno lending allows you to tailor your loan for 
                              what you need. Simply select your loan amount, select 
                              your origination fee, term length and you're all set. A 
                              higher origination fee will give you a lower rate."
                  ></Text>

                  <ButtonPage //look at superProps saasModern for two buttons at bottom //saas classic pricing section
                  />
                  <p></p>
                  <Text content="Select your loan term"></Text>

                  <CheckableTable />
                  <p></p>
                  <Button
                    onClick={() => saveAndContinue(currentUser, userToken)}
                    //{...button}
                    title="Save and continue"
                  />
                </ul>
              </div>
            </PricingCard>
          </InnerWrapper>
        </PricingArea>
      </Container>
    </SectionWrapper>
  );
}

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

const SelectOfferContainerRedux = connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectOfferContainer);
export default SelectOfferContainerRedux;
//export default selectOfferContainer;
