import React, { useState } from 'react';
import { connect } from 'react-redux';
//import Link from 'gatsby';
//import Link from 'common/src/components/Link';
import { navigate } from 'gatsby';
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
import { pricing } from 'common/src/data/Crypto';

const DisclosuresContainer = ({ currentUser }) => {
  const { slogan, title, monthly, annualy } = pricing;
  const [state, setState] = useState({
    active: 'monthly',
    pricingPlan: monthly,
  });

  const renderDoc = async (e) => {
    //retrieve document by user id, doc id, then render
    //in new tab
    console.log("userId", currentUser?.user._id)
    
    //navigate(currentUser?.user.applicationStep);
  };
  

  {/*
  const handlePricingPlan = (plan) => {
    if (plan === 'annualy') {
      setState({
        ...state,
        active: 'annualy',
        pricingPlan: annualy,
      });
    } else {
      setState({
        ...state,
        active: 'monthly',
        pricingPlan: monthly,
      });
    }
  };
*/}

  return (
    <SectionWrapper id="pricing">
      <Container>
        <SectionHeader>
          <br>
          </br>
          <br>
          </br>
          <br>
          </br>
          <Heading as="h5" content='Disclosures' />
          {/*<Heading content={title} />*/}
        </SectionHeader>
        <PricingArea>
          <InnerWrapper>
            {/*{state.pricingPlan.map((item) => ( */}
            <PricingCard >
              <div className="card-body">
              <Text style={{float: 'left'}} 
                content={`Homeownership counseling organizations.........................................`} />
                <Button
                  style={{float: 'right'}} 
                  title={
                    'Download'
                  }
                  //go to last completed step
                  onClick={renderDoc}
                />
              </div>
            </PricingCard>
            <PricingCard >
              <div className="card-body">
              <Text style={{float: 'left'}} 
                content={`GLBA Privacy Notice Form`} />
                <Button
                  style={{float: 'right'}} 
                  title={
                    'Download'
                  }
                  //go to last completed step
                  onClick={renderDoc}
                />
              </div>
            </PricingCard>
            <PricingCard >
              <div className="card-body">
              <Text style={{float: 'left'}} 
                content={`Initial TILA Disclosure`} />
                <Button
                  style={{float: 'right'}} 
                  title={
                    'Download'
                  }
                  //go to last completed step
                  onClick={renderDoc}
                />
              </div>
            </PricingCard>
            <PricingCard >
              <div className="card-body">
              <Text style={{float: 'left'}} 
                content={`FBI Mortgage Fraud Notice`} />
                <Button
                  style={{float: 'right'}} 
                  title={
                    'Download'
                  }
                  //go to last completed step
                  onClick={renderDoc}
                />
              </div>
            </PricingCard>
            <PricingCard >
              <div className="card-body">
              <Text style={{float: 'left'}} 
                content={`Prequalification Property Valuation Notice`} />
                <Button
                  style={{float: 'right'}} 
                  title={
                    'Download'
                  }
                  //go to last completed step
                  onClick={renderDoc}
                />
              </div>
            </PricingCard>
            <PricingCard >
              <div className="card-body">
              <Text style={{float: 'left'}} 
                content={`CFPB HELOC Booklet`} />
                <Button
                  style={{float: 'right'}} 
                  title={
                    'Download'
                  }
                  //go to last completed step
                  onClick={renderDoc}
                />
              </div>
            </PricingCard>
            <PricingCard >
              <div className="card-body">
              <Text style={{float: 'left'}} 
                content={`Home Secured Loan Notice`} />
                <Button
                  style={{float: 'right'}} 
                  title={
                    'Download'
                  }
                  //go to last completed step
                  onClick={renderDoc}
                />
              </div>
            </PricingCard>
            <PricingCard >
              <div className="card-body">
              <Text style={{float: 'left'}} 
                content={`Notice to Home Applicant`} />
                <Button
                  style={{float: 'right'}} 
                  title={
                    'Download'
                  }
                  //go to last completed step
                  onClick={renderDoc}
                />
              </div>
            </PricingCard>
            <PricingCard >
              <div className="card-body">
              <Text style={{float: 'left'}} 
                content={`Fair Lending Notice`} />
                <Button
                  style={{float: 'right'}} 
                  title={
                    'Download'
                  }
                  //go to last completed step
                  onClick={renderDoc}
                />
              </div>
            </PricingCard>
            <PricingCard >
              <div className="card-body">
              <Text style={{float: 'left'}} 
                content={`Additional Mortgage Disclosures`} />
                <Button
                  style={{float: 'right'}} 
                  title={
                    'Download'
                  }
                  //go to last completed step
                  onClick={renderDoc}
                />
              </div>
            </PricingCard>
            <PricingCard >
              <div className="card-body">
              <Text style={{float: 'left'}} 
                content={`Privacy Notice`} />
                <Button
                  style={{float: 'right'}} 
                  title={
                    'Download'
                  }
                  //go to last completed step
                  onClick={renderDoc}
                />
              </div>
            </PricingCard>
            <PricingCard >
              <div className="card-body">
              <Text style={{float: 'left'}} 
                content={`Hazard Disclosure`} />
                <Button
                  style={{float: 'right'}} 
                  title={
                    'Download'
                  }
                  //go to last completed step
                  onClick={renderDoc}
                />
              </div>
            </PricingCard>
          </InnerWrapper>
        </PricingArea>
      </Container>
    </SectionWrapper>
  );
};


const mapStateToProps = (state) => ({
  currentUser: state.root.currentUser,
});

const mapDispatchToProps = (dispatch) => {
  return {
    updateUserInfo: (currentUser, userToken) =>
      dispatch(updateUserInfo(currentUser, userToken)),
  };
};

const DisclosuresContainerRedux = connect(
  mapStateToProps,
  mapDispatchToProps
)(DisclosuresContainer);


export default DisclosuresContainerRedux;
