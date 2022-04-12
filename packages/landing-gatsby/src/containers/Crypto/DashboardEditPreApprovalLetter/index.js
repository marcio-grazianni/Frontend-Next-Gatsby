import React, { useEffect, useState } from 'react';
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
import Cleave from 'cleave.js/react';
import Container from 'common/src/components/UI/Container';
import { SectionHeader } from '../appModern.style';
import {
  Form,
  Input,
  /* Button, */
  AutoComplete,
  InputNumber,
} from 'antd';
import SectionWrapper, {
  ButtonGroup,
  PricingArea,
  InnerWrapper,
  PricingCard,
} from './pricingPolicy.style';
import { updateUserInfo, getMortechRates, updatePreApprovalLetter, showLoader, hideLoader } from '../../../actions';
import GoogleAddressSearch from '../GoogleAutoComplete';
import crown from 'common/src/assets/image/appModern/crown.svg';
import { pricing } from 'common/src/data/Crypto';
import { FaBlackberry } from 'react-icons/fa';
import { TwinkleValues } from 'tsparticles/Options/Classes/Particles/Twinkle/TwinkleValues';
import FullPageLoader from '../FullPageLoader/FullPageLoader';

const LoanCard = ({
  currentUser,
  userToken,
  showLoader,
  hideLoader,
  loading,
  updatePreApprovalLetter,
  description,
  title,
  button,
  getMortechRates,
}) => {
  const [form] = Form.useForm();
  const [purchasePrice, setPurchasePrice] = useState(null);
  const [downPayment, setDownPayment] = useState(null);
  const [loanAmount, setLoanAmount] = useState(null);
  const [googleAddress, setGoogleAddress] = useState(null);
  const [propertyAddress, setPropertyAddress] = useState(null);
  const [stateCode, setStateCode] = useState(null);
  const [city, setCity] = useState(null);
  const [postalCode, setpostalCode] = useState(null);
  const [LTV, setLTV] = useState(null);
  const [ratesGotten, setRatesGotten] = useState(null);
  const [downPaymentTooHigh, setDownPaymentTooHigh] = useState(null);
  const [downPaymentTooLow, setDownPaymentTooLow] = useState(null);
  const [purchasePriceTooHigh, setPurchasePriceTooHigh] = useState(null);
  const [downPaymentPercentage, setDownPaymentPercentage] = useState(null);
  const [minDownPaymentRequired, setMinDownPaymentRequired] = useState(null);
  

  const handlePropertyAddress = (e) => {
    console.log('propertyAddress', e.target.value);
    setPropertyAddress(e.target.value);
  };

  const handleStateCode = (e) => {
    console.log('state', e);
    setStateCode(e);
  };

  const handleCity = (e) => {
    console.log('city', e.target.value);
    setCity(e.target.value);
  };

  const handlepostalCode = (e) => {
    console.log('zip code', e.target.value);
    setpostalCode(e.target.value);
  };

/*   const handleLTV = (e) => {
	console.log("handle LTV, downpayment, purchase Price beforeset", downPayment, purchasePrice)
	if(!downPayment){
		setDownPayment(currentUser.loan.termsOfLoan.downPayment)
	}
	if(!purchasePrice){
		setPurchasePrice(currentUser.loan.termsOfLoan.purchasePrice)
	}
	console.log("handle LTV, downpayment, purchase Price after set", downPayment, purchasePrice)
	setLTV(downPayment/purchasePrice*100.00)
	console.log("ltv", LTV)
  }; */

  const onGoogleAddressChangeValue = (val) => {
    console.log('on change val', val);
    console.log('on change val.state', val.state);
    setGoogleAddress(val);
    setPropertyAddress(val.street_address + ' ' + val.route);
    handleStateCode(val.state);
    setCity(val.city);
    setpostalCode(val.zip_code);

    setDownPayment(downPayment || currentUser.loan.termsOfLoan.downPayment);
	setPurchasePrice(purchasePrice || currentUser.loan.termsOfLoan.purchasePrice);
	setLoanAmount(loanAmount || currentUser.loan.termsOfLoan.baseLoanAmount)
	setLTV(LTV || currentUser.loan.termsOfLoan.ltv)
    /* form.setFieldsValue({
		  //propertyAddress: val.street_address + ' ' + val.route,
		  state: val.state,
		  city: val.city,
		  postalCode: val.zip_code,
		}); */
  };

  const handlePurchasePrice = (e) => {
	const purchasePriceNumber = parseFloat(e.target.value.replace(/,/g, ''))
	console.log("currentUser", currentUser)
	console.log("currentUser, postalCode", currentUser.subjectProperty.address)
    setPurchasePrice(purchasePriceNumber);
	if (!downPayment) {
		setDownPayment(currentUser.loan.termsOfLoan.downPayment)
      setLoanAmount(purchasePriceNumber - downPayment);
    } else {
      setLoanAmount(purchasePriceNumber - downPayment);
    }
	/* if(postalCode != "undefined"){
		setpostalCode(postalCode)
	} */
	if(postalCode == "undefined" || postalCode == null) { 
		setpostalCode(currentUser.subjectProperty.address.postalCode)
	}
	else{ setpostalCode(postalCode) }
	if(stateCode == "undefined" || stateCode == null) { 
		setStateCode(currentUser.subjectProperty.address.stateCode)
	}
	else{  
		setStateCode(stateCode) 
	}
};

  const handleDownPayment = (e) => {
	const purchaseDownPayment = parseFloat(e.target.value.replace(/,/g, ''))
    setDownPayment(purchaseDownPayment);
    if (!purchasePrice) {
      setLoanAmount(
        currentUser.loan.termsOfLoan.purchasePrice - purchaseDownPayment);
		setPurchasePrice(currentUser.loan.termsOfLoan.purchasePrice)	
    } else {
      setLoanAmount(purchasePrice - purchaseDownPayment);
    }
	if(postalCode == "undefined" || postalCode == null) { 
		setpostalCode(currentUser.subjectProperty.address.postalCode)
	}
	else{ setpostalCode(postalCode) }
	if(stateCode == "undefined" || stateCode == null) { 
		setStateCode(currentUser.subjectProperty.address.stateCode)
	}
	else{  
		setStateCode(stateCode) 
	}
  };

  const handleLoanAmount = (e) => {
    setLoanAmount(e.target.value);
  };

/*   const handleRatesGotten = (e) => {
	  setRatesGotten(e.target.value);
  } */

  const onUpdate = async (values) => {
	  console.log("down payment in update", downPayment)
	  console.log("down payment percentage", downPaymentPercentage)
	  console.log("ltv", currentUser.loan.preApproval.preApprovalLTV)
	if(purchasePrice > currentUser.loan.preApproval.preApprovalMaxPurchasePrice + 1) {
		setPurchasePriceTooHigh(true)
		return
	}
	await handleMinDownPaymentRequired(purchasePrice)
	
	if(downPayment > currentUser.loan.preApproval.preApprovalDownPayment + 1 ) {
		console.log("set downpayment to too high")
		setDownPaymentTooHigh(true)
		return
	}
	if(downPaymentPercentage < minDownPaymentRequired ) {
		console.log("in down payment too low")
		setDownPaymentTooLow(true)
		return
	}

	else{
		setDownPaymentTooLow(false)
		setPurchasePriceTooHigh(false)
		setDownPaymentTooHigh(false)


	
    console.log(
      'values',
      postalCode,
      loanAmount,
      downPayment,
      LTV,
      purchasePrice,

    );
    Object.assign(currentUser.subjectProperty.address, 
        	{
          		postalCode: postalCode,
		  		//stateCode: stateCode
        	},
	)
	Object.assign(currentUser.loan.termsOfLoan, 	
    	{
          		baseLoanAmount: loanAmount,
          		downPayment: downPayment,
          		ltv: LTV,
          		purchasePrice:	purchasePrice,
    	});
	Object.assign(currentUser, 
		{ mortech: { 	
			targetPrice: "-999",
			}
		});	

    //call mortech and get rates back */
    console.log('currentUser to send to mortech', currentUser);
	//showLoader();
    await getMortechRates(currentUser, userToken);
	//hideLoader();
	//handleRatesGotten(true)
	}
  };

  const cancelEdit = async (e) => {
    //navigate('/Dashboard/editPreApprovalLetter/');
  };

  const looksGood = async () => {
	updatePreApprovalLetter(currentUser, userToken);  
    navigate('/Dashboard/preApprovalLetter/');
  };

  const handleMinDownPaymentRequired = async (purchasePrice) => {
	  console.log("in handle mindownpayment requried", purchasePrice, currentUser.loan.preApproval.preApprovalAmounts[0])
	  console.log("in handle mindownpayment requried", purchasePrice, currentUser.loan.preApproval.preApprovalAmounts[3])
	  for (let i =0; i < (currentUser.loan.preApproval.preApprovalAmounts).length; i++) {
	  	if (purchasePrice < currentUser.loan.preApproval.preApprovalAmounts[i]) {
			  console.log("in loop")
			setMinDownPaymentRequired(1.00 - purchasePrice*currentUser.loan.preApproval.preApprovalAmounts[i+1])
	  	}
	  }
	  if(downPayment < minDownPaymentRequired) {
		setDownPaymentTooHigh(true) 
	  }
	  else{
		  setDownPaymentTooHigh(false) 
	  }
  }

  useEffect(() => {
	setLTV(downPayment/purchasePrice*100.00)
	console.log("ltv", LTV)
	setDownPaymentPercentage((downPayment/purchasePrice*100.00).toFixed(1))
	//handleMinDownPaymentRequired(purchasePrice)
	console.log("downPayment Percentage", downPaymentPercentage)
	console.log("values in useEffect: loanAmount, downPayment, purchasePrice, LTV, city, state, postalCode,  minDownPaymentRequired", loanAmount, downPayment, purchasePrice, LTV, city, stateCode, postalCode, minDownPaymentRequired)
}, [loanAmount, downPayment, purchasePrice, LTV, city, stateCode, postalCode, minDownPaymentRequired])


  return (
    <SectionWrapper id="pricing">
      <Container className="containerClass">
        <SectionHeader></SectionHeader>
        <PricingArea>
          <Form
            //{...formItemLayout}
            form={form}
            layout="vertical"
            name="register"
            //onFinish={onFinish}
            scrollToFirstError
            style={{ width: '90%' }}
          >
            <Heading
              content={'Edit your pre-approval letter'}
              {...title}
              fontWeight="bold"
            />
            <Heading
              content={
                'You can afford up to ' +
                '$' +
                currentUser?.loan.preApproval.preApprovalMaxPurchasePrice?.toLocaleString() +
                ' ' +
                'but you don’t want to show sellers your max. Start low so you have room to negotiate after.'
              }
              fontWeight=""
              {...description}
            />
            <p></p>

            <Form.Item
              name="propertyAddress"
              label="City, State, Zip Code"
              //initialValue="44"//{currentUser.subjectProperty.address.postalCode}
              /* rules={[
                    {
                      required: true,
                      message: '*Required',
                    },
                  ]} */
            >
              <GoogleAddressSearch
                onChangeValue={onGoogleAddressChangeValue}
                initialValue={currentUser?.subjectProperty.address.postalCode}
                /* componentRestrictions={{ country: "us" }}
					options={{
					  types: ["cities"], 
					}}*/
              />
            </Form.Item>
			
            <p></p>
            <Form.Item
              name="displayAmount"
              label="Purchase price"
              initialValue={currentUser?.loan.termsOfLoan.purchasePrice}
              onChange={handlePurchasePrice}
              rules={[
                {
                  required: true,
                  message: '*Required',
                },
              ]}
            >
              <Cleave
                className="ant-input"
                placeholder={'$' + purchasePrice}
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
				{/* <div>
					Max estimate purchase price {currentUser.loan.preApproval.preApprovalMaxLoan}.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
				</div> */}

				{purchasePriceTooHigh && (
					"Purchase price must be lower than" + " " + "$" + currentUser.loan.preApproval.preApprovalMaxLoan.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
				)}
            <Form.Item
              name="downPayment"
              label="Down payment"
              initialValue={currentUser?.loan.termsOfLoan.downPayment}
              onChange={handleDownPayment}
              rules={[
                {
                  required: true,
                  message: '*Required',
                },
/* 				{
					type: 'integer',
            		min: 0,
					max: currentUser.loan.preApproval.preApprovalMaxDownPayment,
					message: "Your maximum down payment is " + currentUser.loan.preApproval.preApprovalDownPayment + " " + "based on your assets given"
				}, */
              ]}
            >
              <Cleave
                className="ant-input"
                placeholder={'$' + currentUser?.loan.termsOfLoan.downPayment}
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
			{downPaymentTooHigh && (
					"Down payment must be lower than" + " " + "$" + currentUser.loan.preApproval.preApprovalDownPayment.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
				)}
			{downPaymentTooLow && (
					"Down payment percentage must be at least" + " " + (minDownPaymentRequired).toFixed(0) + "%"
				)}	

            <p></p>
			
			
		{/* 	<Form.Item
              name="LTV"
              label="Down payment %"
              //initialValue={100.00-((currentUser.loan.termsOfLoan.ltv).toFixed(2)) + "%"}
			  value={LTV}
              //onChange={handleLTV}
              rules={[
                {
                  required: true,
                  message: '*Required',
                },
			{
					type: 'integer',
            		min: 0,
					max: currentUser.loan.preApproval.preApprovalMaxDownPayment,
					message: "Your maximum down payment is " + currentUser.loan.preApproval.preApprovalDownPayment + " " + "based on your assets given"
				}, 
              ]}
            >
              <Cleave
                className="ant-input"
                //placeholder={'$' + currentUser.loan.termsOfLoan.downPayment}
				value={LTV || currentUser.loan.termsOfLoan.ltv}
                options={{
                  numeral: true,
				  numeralDecimalScale: 2,
                  numeralPositiveOnly: true,
                  //prefix: '$',
                  signBeforePrefix: true,
                  stripLeadingZeroes: true,
                }}
              />
            </Form.Item> */}
			Down payment percentage {downPaymentPercentage}
            <p></p>

            <Form.Item
              label="Loan amount"
              initialValue={currentUser?.loan.termsOfLoan.baseLoanAmount}
              value={loanAmount}
              onChange={handleLoanAmount}
              rules={[
                {
                  required: true,
                  message: '*Required',
                },
/* 				{
					type: 'integer',
            		min: 0,
					max: currentUser.loan.preApproval.preApprovalMaxLoan,
					message: "Maximum purchase price is " + currentUser.loan.preApproval.preApprovalMaxLoan,
				}, */
              ]}
            >
              <Cleave
                className="ant-input"
                placeholder={'$'}
				value={loanAmount || currentUser?.loan.termsOfLoan.baseLoanAmount}
                disabled={true}
                options={{
                  numeral: true,
                  numeralIntegerScale: 7,
                  numeralPositiveOnly: true,
                  //prefix: '$',
                  signBeforePrefix: true,
                  stripLeadingZeroes: true,
                }}
              />
			 {/*  <Input value={loanAmount} /> */}
            </Form.Item>
            <p></p>

            <div className="containerClassBuyProcess">
              <Button
                type="primary"
                title="Update"
                htmlType="submit"
                {...button}
				disabled={!postalCode && !loanAmount && !downPayment && !purchasePrice}
                onClick={onUpdate}
              ></Button>
           &nbsp;
              <Button
                type="primary"
                title="Cancel"
                htmlType="submit"
                {...button}
                onClick={cancelEdit}
              ></Button>
            </div>
          </Form>
          <p></p>
          <Heading
            content={'Your updated loan product:'}
            fontWeight=""
            {...description}
          />
		  <p></p>
		   {currentUser?.loan.preApproval.ratesReturned[5] &&
           <Heading
            content={
              "Term:" + ' ' + currentUser?.loan.preApproval.ratesReturned[5].term
            }
            fontWeight=""
            {...description}
          	/>}
			 <p></p>
			{currentUser?.loan.preApproval.ratesReturned[5] &&
           <Heading
            content={
				"Rate:" + ' ' + currentUser?.loan.preApproval.ratesReturned[5].rate + '%'
            }
            fontWeight=""
            {...description}
          	/>}
 			<p></p>
			{currentUser?.loan.preApproval.ratesReturned[5] &&
           <Heading
            content={
				"Rebate:" + ' ' + currentUser?.loan.preApproval.ratesReturned[5].points
            }
            fontWeight=""
            {...description}
          	/>}
 			<p></p>
			{currentUser?.loan.preApproval.ratesReturned[5] &&
           <Heading
            content={
			  "Monthly payment:" + ' ' + '$' + currentUser?.loan.preApproval.ratesReturned[5].piti
            }
            fontWeight=""
            {...description}
          	/>}
			  
          <p></p>
          <Heading
            content={
              "Based on that new info, here's an updated rate and loan you might like.  You can choose other rates at the rates menu.  Click 'Looks Good' to update your letter."
            }
            fontWeight=""
            {...description}
          />
          <p></p>
		 	
			
            <p></p>
			 <div className="containerClassBuyProcess">
              <Button
                type="primary"
                title="Cancel"
                htmlType="submit"
                {...button}
				disabled={!postalCode && !loanAmount && !downPayment && !purchasePrice}
                onClick={onUpdate}
              ></Button>
			&nbsp;
              <Button
                type="primary"
                title="Looks Good"
                htmlType="submit"
                {...button}
                onClick={looksGood}
              ></Button>
            </div>
          <p></p>
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
  loading: state.root.loading,
});

const mapDispatchToProps = (dispatch) => {
  return {
    updateUserInfo: (currentUser, userToken) =>
      dispatch(updateUserInfo(currentUser, userToken)),
    getMortechRates: (currentUser, userToken) =>
      dispatch(getMortechRates(currentUser, userToken)),
	showLoader: () => dispatch(showLoader()),
	hideLoader: () => dispatch(hideLoader()),
	updatePreApprovalLetter: (currentUser, userToken) =>
		dispatch(updatePreApprovalLetter(currentUser, userToken)),
  };
};

const LoanCardRedux = connect(mapStateToProps, mapDispatchToProps)(LoanCard);

export default LoanCardRedux;
