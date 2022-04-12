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
import Cleave from 'cleave.js/react';
import GoogleAddressSearch from '../../GoogleAutoComplete';
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

const AdditionalRealEstateYouOwnComponent = ({
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
  const [googleAddress, setGoogleAddress] = useState(null);
  const [propertyAddress, setPropertyAddress] = useState(null);
  const [state, setState] = useState(null);
  const [city, setCity] = useState(null);
  const [zipCode, setZipCode] = useState(null);
  const [intendedOccupancy, setIntendedOccupancy] = useState(null)
  const [makingPayments, setMakingPayments] = useState(null)
  const [liabilityHolder, setLiabilityHolder] = useState(null)
  const [monthlyPaymentAmount, setMonthlPaymentAmount] = useState(null)
  const [isPrimaryMortgage, setIsPrimaryMortgage] = useState(true)
  const [expectedRent, setExpectedRent] = useState(true)
  const [howHoldTitle, setHowHoldTitle] = useState(null)
  const [liabilityUnpaidBalanceAmount, setLiabilityUnpaidBalanceAmount] = useState(null)
  const [liabilityPaymentIncludesTaxesInsuranceIndicator, setLiabilityPaymentIncludesTaxesInsuranceIndicator] = useState(null)

  const handlePropertyAddress = (e) => {
    console.log('propertyAddress', e.target.value);
    setPropertyAddress(e.target.value);
  };

  const handleState = (e) => {
    console.log('state', e.target.value);
    setState(e.target.value);
  };

  const handleCity = (e) => {
    console.log('city', e.target.value);
    setCity(e.target.value);
  };

  const handleZipCode = (e) => {
    console.log('zip code', e.target.value);
    setZipCode(e.target.value);
  };

  const onGoogleAddressChangeValue = (val) => {
    console.log('on change val', val);
    console.log('on change val.state', val.state);
    setGoogleAddress(val);
    setPropertyAddress(val.street_address + ' ' + val.route);
    setState(val.state);
    setCity(val.city);
    setZipCode(val.zip_code);
    form.setFieldsValue({
      propertyAddress: val.street_address + ' ' + val.route,
      state: val.state,
      city: val.city,
      zipCode: val.zip_code,
    });
  };

  const handleIntendedOccupancy = (e) => {
    console.log('asking price', e.target.value);
    setIntendedOccupancy(e.target.value);
	console.log(currentUser)
	console.log(currentUser.liabilities[0])
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
	var addressArray = []
		
	addressArray = {
		address: {
			addressLineText: propertyAddress,
			//addressUnitIdentifier: currentUser.borrower.addressUnitIdentifier,
			cityName: city,
			postalCode: zipCode,
			stateCode: state,
			},
		HowHoldTitle: howHoldTitle,
		ownedPropertySubjectIndicator: 'false', 
		propertyCurrentUsageType: intendedOccupancy,
		propertyUsageType: intendedOccupancy,
		ownedPropertyDispositionStatusType: "Retain",
		}	  
		
		if(currentUser.assets.realEstate[0] !== 'undefined'){
			currentUser.assets.realEstate.push(addressArray)
		}
		else{
			Object.assign(
				currentUser.assets.realEstate, addressArray)
			}

	//check if real estate exists
	if (intendedOccupancy === 'Investment'){
		console.log("in rent")
		currentUser.assets.realEstate[currentUser.assets['realEstate'].length-1].push({ownedPropertyRentalIncomeGrossAmount: expectedRent})
	}		
	
	console.log("currentUser after rental income", currentUser)
	
	//sell before purchase new property?
	//check if liabilities exists, make second array, if not, make first
	if (makingPayments === 'true'){
		console.log("in make payments")
		var liablitiesObj = {
				liabilityType: "Mortgage",
				liabilityHolder: liabilityHolder,
				liabilityUnpaidBalanceAmount: liabilityUnpaidBalanceAmount,
				liabilityMonthlyPaymentAmount: monthlyPaymentAmount,
				liabilityPaymentIncludesTaxesInsuranceIndicator: liabilityPaymentIncludesTaxesInsuranceIndicator,	
		}
		
		if(currentUser.liabilities[0] !== 'undefined'){
			currentUser.liabilities.push(liablitiesObj)
		}
		else{
			Object.assign(
				currentUser.liabilities, liablitiesObj)
			}	
		}
	console.log("currentUser after mortgage data", currentUser)

	updateUserInfo(currentUser, userToken);

	//if(ownOtherRealEstate === "false") {
	navigate('/buy-pages/firstTimeHomebuyer/');
	//}
	//else{
	//	navigate('/buy-pages/additionalRealEstateYouOwn/')
	//}

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
                content={"Tell us about the real estate you own"}
                fontWeight="bold"
                {...title}
              />

				<Form.Item
                  name="propertyAddress"
                  label=""
                  rules={[
                    {
                      required: true,
                      message: '*Required',
                    },
                  ]}
                >
                  <GoogleAddressSearch
                    onChangeValue={onGoogleAddressChangeValue}
                  />
                </Form.Item>

              {googleAddress !== null && (
                  <Form.Item
                    name="propertyAddress"
                    label="Street address"
                    rules={[
                      {
                        required: true,
                        message: '*Required',
                      },
                    ]}
                  >
                    <Input
                      autoComplete="new-password"
                      onChange={handlePropertyAddress}
                    />
                  </Form.Item>
                )}
              {googleAddress !== null && (
                  <Form.Item
                    name="apartmentNumber"
                    label="Apartment, Suite, Unit"
                  >
                    <Input autoComplete="new-password" />
                  </Form.Item>
                )}
              {googleAddress !== null && (
                  <Form.Item
                    name="city"
                    label="City"
                    rules={[
                      {
                        required: true,
                        message: '*Required',
                      },
                    ]}
                  >
                    <Input autoComplete="new-password" onChange={handleCity} />
                  </Form.Item>
                )}
              {googleAddress !== null && (
                  <Form.Item
                    name="state"
                    label="State abbreviation"
                    rules={[
                      {
                        required: true,
                        message: '*Required',
                      },
                      {
                        max: 2,
                        message: 'Please only use two characters',
                      },
                      {
                        min: 2,
                        message: 'Please input a valid state',
                      },
                      {
                        pattern: /[a-zA-Z]+/,
                        message: 'Letters only',
                      },
                    ]}
                  >
                    <Input autoComplete="new-password" onChange={handleState} />
                  </Form.Item>
                )}
              {googleAddress !== null && (
                  <Form.Item
                    name="zipCode"
                    label="Zip Code"
                    rules={[
                      {
                        required: true,
                        message: '*Required',
                      },
                      {
                        pattern: /^\d{5}(?:[-\s]\d{4})?$/,
                        message: 'Please enter a valid zip code',
                      },
                      {
                        min: 5,
                        message: '*Must be at least 5 digits',
                      },
                    ]}
                  >
                    <Input
                      autoComplete="new-password"
                      onChange={handleZipCode}
                    />
                  </Form.Item>
                )}

                <div className="homeValue">
                  <Heading
                    content={"How do you use this property?"}
                    fontWeight="bold"
                    {...title}
                  />

                  <div className="containerClassReasons">
                <li>
                  <span>
                    <label style={{ fontSize: '19px', cursor: 'pointer' }}>
                      <input
                        type="radio"
                        value="SecondHome"
                        name="radio1"
                        id="radio1"
                        style={{ visibility: 'hidden' }}
                        onChange={handleIntendedOccupancy}
                      />
                      <span>Second home</span>
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
                    <span>Investment</span>
                  </label>
                </li>	
				</div>
				</div>
				<p>
				</p>

 				{intendedOccupancy == 'Investment' && (
				<Heading
                    content={"Expected monthly rental income"}
                    fontWeight="bold"
                    {...title}
                  />
				  )}

				{intendedOccupancy == 'Investment' && (
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

			{makingPayments == 'true' && (
			  <Heading
                    content={"Please list the mortgage information for this property"}
                    fontWeight="bold"
                    {...title}
                  />
				  )}

			{makingPayments == 'true' && (
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

				{makingPayments == 'true' && (
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

				{makingPayments == 'true' && (
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

			{makingPayments == 'true' && (
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

			{makingPayments == 'true' &&  (
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

			{makingPayments == 'true' && isPrimaryMortgage == 'false' && (
			  <Heading
                    content={"Please add the additional mortgage information"}
                    fontWeight="bold"
                    {...title}
                  />
				  )}

			{makingPayments == 'true' && isPrimaryMortgage == 'false' &&(
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

				{makingPayments == 'true' && isPrimaryMortgage == 'false' &&(
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



				{makingPayments == 'true' && isPrimaryMortgage == 'false' &&(
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

			{makingPayments == 'true' && isPrimaryMortgage == 'false' &&(
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
                    //disabled={!doYouOwnResidence}
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

AdditionalRealEstateYouOwnComponent.propTypes = {
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

AdditionalRealEstateYouOwnComponent.defaultProps = {
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
  
const AdditionalRealEstateYouOwnComponentRedux = connect(
  mapStateToProps,
  mapDispatchToProps
)(AdditionalRealEstateYouOwnComponent);

export default AdditionalRealEstateYouOwnComponentRedux;
