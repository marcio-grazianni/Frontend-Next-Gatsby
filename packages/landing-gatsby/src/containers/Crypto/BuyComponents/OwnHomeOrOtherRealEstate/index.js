import React, { useState } from 'react';
import { connect } from 'react-redux';
import { navigate } from 'gatsby';
import { useStaticQuery, graphql } from 'gatsby';
//import 'antd/dist/antd.css';
import {
  Form,
  Input,
  InputNumber,
  Tooltip,
  Cascader,
  Select,
  Row,
  Col,
  Checkbox,
  /* Button, */
  AutoComplete,
} from 'antd';
import ContactFromWrapper, { SectionMainWrapper } from '../../contact.style';
import Button from 'common/src/components/Button';
import PropTypes from 'prop-types';
import Box from 'common/src/components/Box';
import Text from 'common/src/components/Text';
import Heading from 'common/src/components/Heading';
import Container from 'common/src/components/UI/Container';
import FeatureBlock from 'common/src/components/FeatureBlock';
import { updateUserInfo } from '../../../../actions';
import RadioGroup from 'common/src/components/RadioGroup';
import Radio from 'common/src/components/Radio';
import Cleave from 'cleave.js/react';
// import styles from "./reasons.module.css"
import './buyProcess.css';
//import { Radio } from 'antd';

const { Option } = Select;
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 2,
    },
  },
};

const OwnHomeOrOtherRealEstateComponent = ({
  sectionWrapper,
  row,
  contactForm,
  secTitleWrapper,
  button,
  note,
  title,
  description,
  currentUser,
  updateUserInfo,
  userToken,
  showLoader,
  hideLoader,
  loading,
}) => {
  const [form] = Form.useForm();
  const [doYouOwnResidence, setDoYouOwnResidence] = useState(false);
  const [ownOtherRealEstate, setOwnOtherRealEstate] = useState(false);
  const [intendedOccupancy, setIntendedOccupancy] = useState(null)
  const [askingPrice, setAskingPrice] = useState(null);
  const [planToSellBeforePurchase, setPlanToSellBeforePurchase] = useState(null)
  const [makingPayments, setMakingPayments] = useState(null)
  const [liabilityHolder, setLiabilityHolder] = useState(null)
  const [monthlyPaymentAmount, setMonthlPaymentAmount] = useState(null)
  const [isPrimaryMortgage, setIsPrimaryMortgage] = useState(true)
  const [expectedRent, setExpectedRent] = useState(true)
  const [howHoldTitle, setHowHoldTitle] = useState(null)
  const [liabilityUnpaidBalanceAmount, setLiabilityUnpaidBalanceAmount] = useState(null)
  const [liabilityPaymentIncludesTaxesInsuranceIndicator, setLiabilityPaymentIncludesTaxesInsuranceIndicator] = useState(null)

  const handleDoYouOwnResidence = (e) => {
    console.log('else on title', e.target.value);
    setDoYouOwnResidence(e.target.value);
	setOwnOtherRealEstate(null)
	setIntendedOccupancy(null)
	setIsPrimaryMortgage(null)
	setMakingPayments(null)
  };

  const handleOwnOtherRealEstate = (e) => {
    console.log('own other real estate', e.target.value);
    setOwnOtherRealEstate(e.target.value);
  };

  const handleAskingPrice = (e) => {
    console.log('asking price', e.target.value);
    setAskingPrice(e.target.value);
  };

  const handleIntendedOccupancy = (e) => {
    console.log('asking price', e.target.value);
    setIntendedOccupancy(e.target.value);
  };

  const handlePlanToSellBeforePurchase = (e) => {
    console.log('asking price', e.target.value);
    setPlanToSellBeforePurchase(e.target.value);
  };

  const handleExpectedRent = (e) => {
    console.log('expected rent', e.target.value);
    setExpectedRent(e.target.value);
  };
  
  const handleHowHoldTitle = (e) => {
    console.log('how hold title', e.target.value);
    setHowHoldTitle(e.target.value);
  };
  
  const handleMakingPayments = (e) => {
    console.log('own other real estate', e.target.value);
    setMakingPayments(e.target.value);
  };

  const handleLiablilityHolder = (e) => {
    console.log('own other real estate', e.target.value);
    setLiabilityHolder(e.target.value);
  };

  const handleUnpaidLiabilityBalanceAmount = (e) => {
    console.log('own other real estate', e.target.value);
    setLiabilityUnpaidBalanceAmount(e.target.value);
  };

  const handleMonthlyPaymentAmount = (e) => {
    console.log('own other real estate', e.target.value);
    setMonthlPaymentAmount(e.target.value);
  };

  const handleIsPrimaryMortgage = (e) => {
    console.log('own other real estate', e.target.value);
    setIsPrimaryMortgage(e.target.value);
  };

  const handleLiabilityPaymentIncludesTaxesInsuranceIndicator = (e) => {
    console.log('own other real estate', e.target.value);
    setLiabilityPaymentIncludesTaxesInsuranceIndicator(e.target.value);
  };

  const onFinish = async (value) => {
	  
	if (doYouOwnResidence === 'true'){
		console.log("in currentUser address", currentUser)
		//currentUser.assets.realEstate[0] = 1;
		Object.assign(
			currentUser, 
				
				{assets: { 
					realEstate:
			 		[{
				   	address: {
						addressLineText: currentUser.borrower.addressLineText,
						addressUnitIdentifier: currentUser.borrower.addressUnitIdentifier,
						cityName: currentUser.borrower.cityName,
						postalCode: currentUser.borrower.postalCode,
						stateCode: currentUser.borrower.stateCode,
					   		},
						HowHoldTitle: howHoldTitle,
						ownedPropertySubjectIndicator: 'false', 
						propertyCurrentUsageType: "PrimaryResidence",
						propertyUsageType: intendedOccupancy,
						ownedPropertyDispositionStatusType: planToSellBeforePurchase,
		   				}],	  
			 	 	
					}}
		)}
	
	console.log("currentUser after address", currentUser)
	
	if (doYouOwnResidence === 'true' && intendedOccupancy === 'sell'){
		console.log("in sell")
		Object.assign(currentUser.assets.realEstate[0], { propertyEstimatedValueAmount: askingPrice }	)
	} 

	console.log("currentUser after sell or keep", currentUser)

	if (doYouOwnResidence === 'true' && intendedOccupancy === 'Investment'){
		console.log("in rent")
		Object.assign(currentUser.assets.realEstate[0], {ownedPropertyRentalIncomeGrossAmount: expectedRent})
	}		
	
	console.log("currentUser after rental income", currentUser)
	
	//sell before purchase new property?
	if (doYouOwnResidence === 'true' && makingPayments === 'true'){
		console.log("in make payments")
		Object.assign(currentUser,
			{liabilities: {
				liabilityType: "Mortgage",
				liabilityHolder: liabilityHolder,
				liabilityUnpaidBalanceAmount: liabilityUnpaidBalanceAmount,
				liabilityMonthlyPaymentAmount: monthlyPaymentAmount,
				liabilityPaymentIncludesTaxesInsuranceIndicator: liabilityPaymentIncludesTaxesInsuranceIndicator,
			}}
		)}

	console.log("currentUser after mortgage data", currentUser)

	updateUserInfo(currentUser, userToken);

	if(ownOtherRealEstate === "false") {
		navigate('/buy-pages/firstTimeHomebuyer/');
	}
	else{
		navigate('/buy-pages/additionalRealEstateYouOwn/')
	}

  };
/* 
  React.useEffect(() => {
    setElseOnTitle(elseOnTitle);
    console.log(elseOnTitle);
  }, [elseOnTitle]); */
  //   require('./reasons.module.css');//
  return (
    <SectionMainWrapper>
      <Box {...sectionWrapper}>
        <Container className="containerClassBuyProcess">
          <Box {...row}>
            <Form
              //{...formItemLayout}
              form={form}
              layout="vertical"
              name="register"
              onFinish={onFinish}
              scrollToFirstError
              style={{ width: '90%' }}
            >
              <Heading
                content={'Do you own ' + currentUser?.borrower.addressLineText + "?"}
                fontWeight="bold"
                {...title}
              />

              <div className="containerClassReasons">
                <li>
                  <span>
                    <label style={{ fontSize: '19px', cursor: 'pointer' }}>
                      <input
                        type="radio"
                        value="true"
                        name="radio"
                        id="radio1"
                        style={{ visibility: 'hidden' }}
						//BorrowerResidencyBasisType
                        onChange={handleDoYouOwnResidence}
                      />
                      <span>Yes</span>
                    </label>
                  </span>
                </li>

                <li>
                  <label style={{ fontSize: '19px', cursor: 'pointer' }}>
                    <input
                      type="radio"
                      value="false"
                      name="radio"
                      id="radio2"
                      style={{ visibility: 'hidden' }}
                      onChange={handleDoYouOwnResidence}
                    />
                    <span>No</span>
                  </label>
                </li>
                <p></p>
              </div>

			  {doYouOwnResidence == "false" && (

			  <Heading
                content={'Do you own any other real estate?'}
                fontWeight="bold"
                {...title}
              />
			  )}

			{doYouOwnResidence == "false" && (

              <div className="containerClassReasons">
                <li>
                  <span>
                    <label style={{ fontSize: '19px', cursor: 'pointer' }}>
                      <input
                        type="radio"
                        value="true"
                        name="ownOtherRealEstate"
                        id="radio1"
                        style={{ visibility: 'hidden' }}
                        onChange={handleOwnOtherRealEstate}
                      />
                      <span>Yes</span>
                    </label>
                  </span>
                </li>

                <li>
                  <label style={{ fontSize: '19px', cursor: 'pointer' }}>
                    <input
                      type="radio"
                      value="false"
                      name="ownOtherRealEstate"
                      id="radio2"
                      style={{ visibility: 'hidden' }}
                      onChange={handleOwnOtherRealEstate}
                    />
                    <span>No</span>
                  </label>
                </li>
                <p></p>
              </div>
				 )}

              {doYouOwnResidence == 'true' && (
                <div className="homeValue">
                  <Heading
                    content={"What are your plans for this property?"}
                    fontWeight="bold"
                    {...title}
                  />

                  <div className="containerClassReasons">
                <li>
                  <span>
                    <label style={{ fontSize: '19px', cursor: 'pointer' }}>
                      <input
                        type="radio"
                        value="sell"
                        name="radio1"
                        id="radio1"
                        style={{ visibility: 'hidden' }}
                        onChange={handleIntendedOccupancy}
                      />
                      <span>Sell it</span>
                    </label>
                  </span>
                </li>
             
                <li>
                  <label style={{ fontSize: '19px', cursor: 'pointer' }}>
                    <input
                      type="radio"
                      value="Investment"
                      name="radio1"
                      id="radio2"
                      style={{ visibility: 'hidden' }}
                      onChange={handleIntendedOccupancy}
                    />
                    <span>Rent it out</span>
                  </label>
                </li>	
			
				<li>
                  <label style={{ fontSize: '19px', cursor: 'pointer' }}>
                    <input
                      type="radio"
                      value="PrimaryResidence"
                      name="radio1"
                      id="radio2"
                      style={{ visibility: 'hidden' }}
                      onChange={handleIntendedOccupancy}
                    />
                    <span>Continue to occupy it</span>
                  </label>
                </li>	

				<li>
                  <label style={{ fontSize: '19px', cursor: 'pointer' }}>
                    <input
                      type="radio"
                      value="SecondHome"
                      name="radio1"
                      id="radio2"
                      style={{ visibility: 'hidden' }}
                      onChange={handleIntendedOccupancy}
                    />
                    <span>Keep it as an additonal home</span>
                  </label>
                </li>	
				</div>
				</div>
			)}

				{doYouOwnResidence == 'true' && intendedOccupancy == 'sell' && (
				<Heading
                    content={"Expected asking price"}
                    fontWeight="bold"
                    {...title}
                  />
				  )}

				{doYouOwnResidence == 'true' && intendedOccupancy == 'sell' && (
                    <Form.Item
                      name="other"
                      label=""
					  onChange={handleAskingPrice}
                      rules={[
                        {
                          required: true,
                          message: '*Required',
                        },
                      ]}
                    >
                      <Cleave
                        className="ant-input"
                        placeholder="$"
                        options={{
                          numeral: true,
                          numeralIntegerScale: 7,
                          numeralPositiveOnly: true,
                          //prefix: '$',
                          signBeforePrefix: true,
                          stripLeadingZeroes: true,
                        }}
                      />
                    </Form.Item>
                  )}

 				{doYouOwnResidence == 'true' && intendedOccupancy == 'Investment' && (
				<Heading
                    content={"Expected monthly rental income"}
                    fontWeight="bold"
                    {...title}
                  />
				  )}

				{doYouOwnResidence == 'true' && intendedOccupancy == 'Investment' && (
                    <Form.Item
                      name="rent"
                      label=""
					  onChange={handleExpectedRent}
                      rules={[
                        {
                          required: true,
                          message: '*Required',
                        },
                      ]}
                    >
                      <Cleave
                        className="ant-input"
                        placeholder="$"
                        options={{
                          numeral: true,
                          numeralIntegerScale: 7,
                          numeralPositiveOnly: true,
                          //prefix: '$',
                          signBeforePrefix: true,
                          stripLeadingZeroes: true,
                        }}
                      />
                    </Form.Item>
                  )}

				{doYouOwnResidence == 'true' && intendedOccupancy == 'sell' && (
                <div className="homeValue">
                  <Heading
                    content={"Do you plan to sell " + currentUser?.borrower.addressLineText + " before you purchase your new home?"}
                    fontWeight="bold"
                    {...title}
                  />

                  <div className="containerClassReasons">
                <li>
                  <span>
                    <label style={{ fontSize: '19px', cursor: 'pointer' }}>
                      <input
                        type="radio"
                        value="PendingSale"
                        name="radio2"
                        id="radio1"
                        style={{ visibility: 'hidden' }}
                        onChange={handlePlanToSellBeforePurchase}
                      />
                      <span>Yes</span>
                    </label>
                  </span>
                </li>
             

                <li>
                  <label style={{ fontSize: '19px', cursor: 'pointer' }}>
                    <input
                      type="radio"
                      value="Retain"
                      name="radio2"
                      id="radio2"
                      style={{ visibility: 'hidden' }}
                      onChange={handlePlanToSellBeforePurchase}
                    />
                    <span>No</span>
                  </label>
                </li>	
				<p></p>			
              	</div>
                </div>
              )}

				{doYouOwnResidence == 'true' && (
                <div className="homeValue">
                  <Heading
                    content={"How do you hold title to this property?"}
                    fontWeight="bold"
                    {...title}
                  />
                  <div className="containerClassReasons">
                <li>
                  <span>
                    <label style={{ fontSize: '19px', cursor: 'pointer' }}>
                      <input
                        type="radio"
                        value="true"
                        name="radio3"
                        id="radio1"
                        style={{ visibility: 'hidden' }}
                        onChange={handleHowHoldTitle}
                      />
                      <span>By yourself</span>
                    </label>
                  </span>
                </li>
					<p></p>
                <li>
                  <label style={{ fontSize: '19px', cursor: 'pointer' }}>
                    <input
                      type="radio"
                      value="false"
                      name="radio3"
                      id="radio2"
                      style={{ visibility: 'hidden' }}
                      onChange={handleHowHoldTitle}
                    />
                    <span>Jointly with spouse</span>
                  </label>
                </li>
				<p></p>

				<li>
                  <label style={{ fontSize: '19px', cursor: 'pointer' }}>
                    <input
                      type="radio"
                      value="false"
                      name="radio3"
                      id="radio2"
                      style={{ visibility: 'hidden' }}
                      onChange={handleHowHoldTitle}
                    />
                    <span>Jointly with another person</span>
                  </label>
                </li>

				<p></p>			
              	</div>
                </div>
              )}


				{doYouOwnResidence == 'true' && (
                <div className="homeValue">
                  <Heading
                    content={"Are you currently making monthly payments on this property?"}
                    fontWeight="bold"
                    {...title}
                  />
                  <div className="containerClassReasons">

					  
                <li>
                  <span>
                    <label style={{ fontSize: '19px', cursor: 'pointer' }}>
                      <input
                        type="radio"
                        value="true"
                        name="radio4"
                        id="radio1"
                        style={{ visibility: 'hidden' }}
                        onChange={handleMakingPayments}
                      />
                      <span>Yes</span>
                    </label>
                  </span>
                </li>
					<p></p>
                <li>
                  <label style={{ fontSize: '19px', cursor: 'pointer' }}>
                    <input
                      type="radio"
                      value="false"
                      name="radio4"
                      id="radio2"
                      style={{ visibility: 'hidden' }}
                      onChange={handleMakingPayments}
                    />
                    <span>No</span>
                  </label>
                </li>
				<p></p>
		
              	</div>
                </div>
              )}

			{doYouOwnResidence == 'true' && makingPayments == 'true' && (
			  <Heading
                    content={"Please list the mortgage information for this property"}
                    fontWeight="bold"
                    {...title}
                  />
				  )}

			{doYouOwnResidence == 'true' && makingPayments == 'true' && (
				<Form.Item
                    name="mortgageCompany"
                    label="Company you write the check to"
					onChange={handleLiablilityHolder}
                    //onChange={handleChangeFirstName}
                    /* rules={[
                        {
                          required: true,
                          message: '*Required',
                        },
                      ]} */
                  >
                    <Input />
                  </Form.Item>
				  )}

				{doYouOwnResidence == 'true' && makingPayments == 'true' && (
                    <Form.Item
                      name="balance"
                      label="Balance"
					  onChange={handleUnpaidLiabilityBalanceAmount} 
                      rules={[
                        {
                          required: true,
                          message: '*Required',
                        },
                      ]}
                    >
                      <Cleave
                        className="ant-input"
                        placeholder="$"
                        options={{
                          numeral: true,
                          numeralIntegerScale: 7,
                          numeralPositiveOnly: true,
                          //prefix: '$',
                          signBeforePrefix: true,
                          stripLeadingZeroes: true,
                        }}
                      />
                    </Form.Item>
                  )}



				{doYouOwnResidence == 'true' && makingPayments == 'true' && (
                    <Form.Item
                      name="mortgagePayment"
                      label="Payment"
					  onChange={handleMonthlyPaymentAmount}
                      rules={[
                        {
                          required: true,
                          message: '*Required',
                        },
                      ]}
                    >
                      <Cleave
                        className="ant-input"
                        placeholder="$"
                        options={{
                          numeral: true,
                          numeralIntegerScale: 7,
                          numeralPositiveOnly: true,
                          //prefix: '$',
                          signBeforePrefix: true,
                          stripLeadingZeroes: true,
                        }}
                      />
                    </Form.Item>
                  )}

			{doYouOwnResidence == 'true' && makingPayments == 'true' && (
                <div className="homeValue">
                  <Heading
                    content={"Is this the primary mortgage on this property?"}
                    fontWeight="bold"
                    {...title}
                  />
                  <div className="containerClassReasons">

					  
                <li>
                  <span>
                    <label style={{ fontSize: '19px', cursor: 'pointer' }}>
                      <input
                        type="radio"
                        value="true"
                        name="radio5"
                        id="radio1"
                        style={{ visibility: 'hidden' }}
                        onChange={handleIsPrimaryMortgage}
                      />
                      <span>Yes</span>
                    </label>
                  </span>
                </li>
					<p></p>
                <li>
                  <label style={{ fontSize: '19px', cursor: 'pointer' }}>
                    <input
                      type="radio"
                      value="false"
                      name="radio5"
                      id="radio2"
                      style={{ visibility: 'hidden' }}
                      onChange={handleIsPrimaryMortgage}
                    />
                    <span>No</span>
                  </label>
                </li>
				<p></p>
		
              	</div>
                </div>
              )}


			{doYouOwnResidence == 'true' && makingPayments == 'true' &&  (
                <div className="homeValue">
                  <Heading
                    content={"Do you pay taxes and insurance as part of your monthly payment?"}
                    fontWeight="bold"
                    {...title}
                  />
                  <div className="containerClassReasons">

					  
                <li>
                  <span>
                    <label style={{ fontSize: '19px', cursor: 'pointer' }}>
                      <input
                        type="radio"
                        value="true"
                        name="radio6"
                        id="radio1"
                        style={{ visibility: 'hidden' }}
                        onChange={handleLiabilityPaymentIncludesTaxesInsuranceIndicator}
                      />
                      <span>Yes</span>
                    </label>
                  </span>
                </li>
					<p></p>
                <li>
                  <label style={{ fontSize: '19px', cursor: 'pointer' }}>
                    <input
                      type="radio"
                      value="false"
                      name="radio6"
                      id="radio2"
                      style={{ visibility: 'hidden' }}
                      onChange={handleLiabilityPaymentIncludesTaxesInsuranceIndicator}
                    />
                    <span>No</span>
                  </label>
                </li>
				<p></p>
		
              	</div>
                </div>
              )}


			{doYouOwnResidence == 'true' && makingPayments == 'true' && isPrimaryMortgage == 'false' && (
			  <Heading
                    content={"Please add the additional mortgage information"}
                    fontWeight="bold"
                    {...title}
                  />
				  )}

			{doYouOwnResidence == 'true' && makingPayments == 'true' && isPrimaryMortgage == 'false' &&(
				<Form.Item
                    name="mortgageCompany"
                    label="Company you write the check to"
                    onChange={handleLiablilityHolder}
                    /* rules={[
                        {
                          required: true,
                          message: '*Required',
                        },
                      ]} */
                  >
                    <Input />
                  </Form.Item>
				  )}

				{doYouOwnResidence == 'true' && makingPayments == 'true' && isPrimaryMortgage == 'false' &&(
                    <Form.Item
                      name="mortgageBalance"
                      label="Balance"
					  onChange={handleUnpaidLiabilityBalanceAmount}
                      rules={[
                        {
                          required: true,
                          message: '*Required',
                        },
                      ]}
                    >
                      <Cleave
                        className="ant-input"
                        placeholder="$"
                        options={{
                          numeral: true,
                          numeralIntegerScale: 7,
                          numeralPositiveOnly: true,
                          //prefix: '$',
                          signBeforePrefix: true,
                          stripLeadingZeroes: true,
                        }}
                      />
                    </Form.Item>
                  )}



				{doYouOwnResidence == 'true' && makingPayments == 'true' && isPrimaryMortgage == 'false' &&(
                    <Form.Item
                      name="other"
                      label="Payment"
					  onChange={handleMonthlyPaymentAmount}
                      rules={[
                        {
                          required: true,
                          message: '*Required',
                        },
                      ]}
                    >
                      <Cleave
                        className="ant-input"
                        placeholder="$"
                        options={{
                          numeral: true,
                          numeralIntegerScale: 7,
                          numeralPositiveOnly: true,
                          //prefix: '$',
                          signBeforePrefix: true,
                          stripLeadingZeroes: true,
                        }}
                      />
                    </Form.Item>
                  )}

			{doYouOwnResidence == 'true' && makingPayments == 'true' && isPrimaryMortgage == 'false' &&(
                <div className="homeValue">
                  <Heading
                    content={"Is this the primary mortgage on this property?"}
                    fontWeight="bold"
                    {...title}
                  />
                  <div className="containerClassReasons">

					  
                <li>
                  <span>
                    <label style={{ fontSize: '19px', cursor: 'pointer' }}>
                      <input
                        type="radio"
                        value="true"
                        name="radio7"
                        id="radio1"
                        style={{ visibility: 'hidden' }}
                        //onChange={}
                      />
                      <span>Yes</span>
                    </label>
                  </span>
                </li>
					<p></p>
                <li>
                  <label style={{ fontSize: '19px', cursor: 'pointer' }}>
                    <input
                      type="radio"
                      value="false"
                      name="radio7"
                      id="radio2"
                      style={{ visibility: 'hidden' }}
                      //onChange={}
                    />
                    <span>No</span>
                  </label>
                </li>
				<p></p>
		
              	</div>
                </div>
              )}

              <Form.Item {...tailFormItemLayout}>
                <p></p>
                <div className="containerClassBuyProcess">
                  <Button
                    type="primary"
                    title="Next"
                    htmlType="submit"
                    {...button}
                    onClick={onFinish}
                    disabled={!doYouOwnResidence}
                  ></Button>
                </div>
              </Form.Item>
            </Form>
          </Box>
        </Container>
      </Box>
    </SectionMainWrapper>
  );
};

OwnHomeOrOtherRealEstateComponent.propTypes = {
  sectionWrapper: PropTypes.object,
  secTitleWrapper: PropTypes.object,
  row: PropTypes.object,
  contactForm: PropTypes.object,
  secHeading: PropTypes.object,
  secText: PropTypes.object,
  button: PropTypes.object,
  note: PropTypes.object,
  title: PropTypes.object,
  description: PropTypes.object,
  colornote: PropTypes.object,
};

OwnHomeOrOtherRealEstateComponent.defaultProps = {
  sectionWrapper: {
    id: 'contact_section',
    as: 'section',
    pt: ['8px', '80px', '80px', '80px'],
    pb: ['0', '80px', '80px', '80px', '80px'],
  },
  secTitleWrapper: {
    mb: ['40px', '40px', '40px'],
    p: ['0 15px', 0, 0, 0, 0],
  },
  secText: {
    as: 'span',
    display: 'block',
    textAlign: 'center',
    fontSize: `${2}`,
    letterSpacing: '0.15em',
    fontWeight: `${6}`,
    color: 'primary',
    mb: `${3}`,
  },
  secHeading: {
    textAlign: 'center',
    fontSize: [`${6}`, `${8}`],
    fontWeight: '400',
    color: 'headingColor',
    letterSpacing: '-0.025em',
    mb: `${0}`,
  },
  row: {
    flexBox: true,
    justifyContent: 'center',
  },
  contactForm: {
    width: [1, 1, 1, 1 / 2],
  },
  button: {
    type: 'button',
    fontSize: `${20}`,
    fontWeight: '600',
    //borderRadius: '4px',
    pl: '22px',
    pr: '22px',
    colors: 'primaryWithBg',
    height: `${10}`,
  },
  note: {
    fontSize: '16px',
    fontWeight: '400',
    color: '#525f7f',
    lineHeight: '28px',
    mb: ['25px', '25px', '30px', '30px', '45px'],
    textAlign: ['center', 'center'],
  },
  colornote: {
    fontSize: '16px',
    fontWeight: '500',
    color: 'rgb(106, 82, 253)',
    lineHeight: '28px',
    mb: ['25px', '25px', '30px', '30px', '45px'],
    textAlign: ['center', 'center'],
  },
  title: {
    fontSize: ['26px', '34px', '42px', '42px', '42px'],
    fontWeight: '500',
    color: '#000000',
    letterSpacing: '-0.025em',
    mb: ['20px', '25px'],
    lineHeight: '1.31',
  },
  btnStyle: {
    minWidth: '156px',
    fontSize: '14px',
    fontWeight: '500',
  },
  label: {
    fontSize: '28px',
  },

  description: {
    content:
      "This means your assets and income will be counted together. If you want to remove a co-borrower later, you'll have to start a new application",
    fontSize: '16px',
    fontWeight: '400',
    color: '#525f7f',
    lineHeight: '28px',
    mb: ['25px', '25px', '30px', '30px', '45px'],
    /* textAlign: ['center', 'center'], */
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
  
const OwnHomeOrOtherRealEstateComponentRedux = connect(
  mapStateToProps,
  mapDispatchToProps
)(OwnHomeOrOtherRealEstateComponent);

export default OwnHomeOrOtherRealEstateComponentRedux;
