//cash back refi select-offer

import React, { Fragment, useState, useEffect } from 'react';
import { navigate } from 'gatsby';
import { connect } from 'react-redux';
import Heading from 'common/src/components/Heading';
import Button from 'common/src/components/Button';
import Text from 'common/src/components/Text';
import Container from 'common/src/components/UI/Container';
import { updateUserInfo } from '../../../../actions';
import { loadState } from '../../../../store';
import { Table, Modal } from 'antd';
//get offer details back from heroku backend node.js (max amount and terms)
//side bar with loan flow
import SectionWrapper, {
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
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [APRSelected, setAPRSelected] = useState();
  const [pointsSelected, setPointsSelected] = useState();
  const [monthlyPaymentSelected, setMonthlyPaymentSelected] = useState();

  const showModal = (text) => {
    console.log(text);
    console.log(text.APR);
    setAPRSelected(text.APR);
    setPointsSelected(text.points);
    setMonthlyPaymentSelected(text.piti);

    console.log('in show modal');
    setIsModalVisible(true);
  };

  const handleOk = (currentUser, userToken) => {
    setIsModalVisible(false);

    //send loanSelected to store and Database
    //action to send data

    currentUser.applicationStep = '/refi-pages/tasks/';
    currentUser.APRSelected = APRSelected;
    currentUser.pointsSelected = pointsSelected;
    currentUser.monthlyPaymentSelected = monthlyPaymentSelected;

    updateUserInfo(currentUser, userToken);
    //update user model with loanAmountSelected */
    navigate('/refi-pages/tasks/');
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  //dynamically create data depending on amount in preQualOffer array

  const columns = [
    {
      title: 'Rate/APR',
      dataIndex: 'rate',
      render: (text) => (
        <a>
          <b>{text}%</b>
        </a>
      ),
    },
    {
      title: 'Points',
      dataIndex: 'points',
      render: (text) => (
        <a>
          <b>${text}</b>
        </a>
      ),
    },
    {
      title: 'Monthly payment',
      dataIndex: 'piti',
      render: (text) => (
        <a>
          <b>${text}</b>
        </a>
      ),
    },
    {
      //title: 'Action',//render modal onClick with terms in modal
      key: 'action',
      render: (text) => (
        <Button
          style={{ float: 'right' }}
          title={'Select'}
          onClick={() => showModal(text)}
        />
      ),
    },
  ];

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        'selectedRows: ',
        selectedRows
      );
    },
  };
  //fixed
  const data = currentUser?.ratesReturned;

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
  //var maxLoanPossible = localState?.root.currentUser.user.maxLoanPossible;

  //save and continue button and action

  useEffect(() => {
    // make api call first time u come to the page or do a browser reload
  }, []);

  return (
    <SectionWrapper>
      <Container>
        <PricingArea>
          <InnerWrapper>
            <PricingCard display="flex">
              <div className="card-header">
                <Heading
                  as="h3"
                  content={'See what rates you can get today'}
                  textAlign="center"
                  fontFamily={'Sans'}
                  fontWeight="bold"
                />
              </div>

              <div className="card-body">
                <ul className="feature-list">
                  <Text content="Personalize your loan"></Text>

                  <Text
                    content="Harris lending allows you to tailor your loan for 
                              what you need. Simply select your loan amount, select 
                              your origination fee, term length and you're all set. A 
                              higher origination fee will give you a lower rate."
                  ></Text>
                  <p></p>
                  <Text content="Select your loan term"></Text>
                </ul>
              </div>
            </PricingCard>

            <PricingCard>
              <Table columns={columns} dataSource={data} pagination={false} />
              <p></p>
              <Text
                style={{ float: 'left' }}
                content={`Money saved per month`}
              />
            </PricingCard>
            <Modal
              visible={isModalVisible}
              onOk={() => handleOk(currentUser, userToken)}
              onCancel={handleCancel}
            >
              <Heading
                as="h3"
                content={'Does this rate look good?'}
                textAlign="center"
                fontFamily={'Sans'}
                fontWeight="bold"
              />
              <Text content="If it does, we'll automatically update your loan costs on your Loan Estimate page."></Text>
              <Text content={'RATE ' + APRSelected}></Text>
              <Text content={'Rate term 30 yr fixed '}></Text>
              <Text content={'Points ' + pointsSelected}></Text>
              <Text
                content={
                  'Per month (principal and interest) ' + monthlyPaymentSelected
                }
              ></Text>
            </Modal>
          </InnerWrapper>
        </PricingArea>
      </Container>
    </SectionWrapper>
  );
}
/* 
const mapStateToProps = ({ root: { currentUser } }) => ({
  currentUser: currentUser?.user,
  userToken: currentUser?.token,
}) */ const mapStateToProps = ({ root: { currentUser } }) => ({
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
