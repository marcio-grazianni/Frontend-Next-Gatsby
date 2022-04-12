import React, { useState, useEffect } from 'react';
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
import { updateUserInfo, getPreApproval, showLoader, hideLoader } from '../../../../actions';
import RadioGroup from 'common/src/components/RadioGroup';
import Radio from 'common/src/components/Radio';
import Cleave from 'cleave.js/react';
import FullPageLoader from '../../FullPageLoader/FullPageLoader';
// import styles from "./reasons.module.css"
import './reason.css';
import { saturate } from 'polished';
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

const AssetsComponent = ({
  sectionWrapper,
  row,
  contactForm,
  secTitleWrapper,
  button,
  note,
  title,
  refiReasons,
  description,
  currentUser,
  updateUserInfo,
  getPreApproval,
  userToken,
  showLoader,
  hideLoader,
  loading,
}) => {
  const [form] = Form.useForm();
  const [showCheckingAndSavingsTextBox, setShowCheckingAndSavingsTextBox] = useState(false);
  const [SavingsAccount, setSavingsAccount] = useState(null)
  const [showRetirementFundTextBox, setShowRetirementFundTextBox] = useState(null)
  const [RetirementFund, setRetirementFund] = useState(null)
  const [showStockBox, setShowStockBox] = useState(null)
  const [Stock, setStock] = useState(null)
  const [ProceedsFromSecuredLoan, setProceedsFromSecuredLoan] = useState(null)
  const [showGiftTextBox, setShowGiftTextBox] = useState(false);
  const [GiftOfPropertyEquity, setGiftOfPropertyEquity] = useState(null)
  const [showLoanAmountTextBox, setShowLoanAmountTextBox] = useState(false);
  const [showOtherTextBox, setShowOtherTextBox] = useState(false);
  const [other, setOther] = useState(null)
  const [formSubmitted, setFormSubmitted] = useState(false);

  let assetsArray = []

  const handleShowCheckingAndSavingsTextBox = (e) => {
    setShowCheckingAndSavingsTextBox(e.target.checked);
  };

  const handleSavingsAccount = (e) => {
    setSavingsAccount(e.target.value);
	console.log("savings account", SavingsAccount)
  };

  const handleShowRetirementFundTextBox = (e) => {
    setShowRetirementFundTextBox(e.target.checked);
  };

  const handleRetirementFund = (e) => {
    setRetirementFund(e.target.value);
  };

  const handleShowStockBox = (e) => {
    setShowStockBox(e.target.checked);
  };

  const handleStock = (e) => {
    setStock(e.target.value);
  };

  const handleGiftChange = (e) => {
    setShowGiftTextBox(e.target.checked);
  };

  const handleGiftOfPropertyEquity = (e) => {
    setGiftOfPropertyEquity(e.target.value);
  };

  const handleLoanAmountTextBox = (e) => {
    setShowLoanAmountTextBox(e.target.checked);
  };

  const handleProceedsFromSecuredLoan = (e) => {
    setProceedsFromSecuredLoan(e.target.value);
  };

  const handleOtherAmountTextBox = (e) => {
    setShowOtherTextBox(e.target.checked);
  };

  const handleOther = (e) => {
    setOther(e.target.value);
  };


  const onFinish = async () => {
	var totalLiquidAssets = 0
	if(SavingsAccount) {
		totalLiquidAssets += parseInt(SavingsAccount.replace(/,/g, ''))
		assetsArray.push({
			assetAccountIdentifier: null,
			assetCashOrMarketValueAmount: SavingsAccount, 
			assetType: "SavingsAccount",
		})
	 } 
	 if(RetirementFund) {
		totalLiquidAssets += parseInt(RetirementFund.replace(/,/g, ''))
		assetsArray.push({
			assetAccountIdentifier: null,
			assetCashOrMarketValueAmount: RetirementFund, 
			assetType: "RetirementFund",
		})
	 } 
	 if(Stock) {
		totalLiquidAssets += parseInt(Stock.replace(/,/g, ''))
		assetsArray.push({
			assetAccountIdentifier: null,
			assetCashOrMarketValueAmount: Stock, 
			assetType: "Stock",
		})
	 } 
	 if(GiftOfPropertyEquity) {
		totalLiquidAssets += parseInt(GiftOfPropertyEquity.replace(/,/g, ''))
		assetsArray.push({
			assetAccountIdentifier: null,
			assetCashOrMarketValueAmount: GiftOfPropertyEquity, 
			assetType: "GiftOfPropertyEquity",
		})
	 } 
	 if(ProceedsFromSecuredLoan) {
		totalLiquidAssets += parseInt(ProceedsFromSecuredLoan.replace(/,/g, ''))
		assetsArray.push({
			assetAccountIdentifier: null,
			assetCashOrMarketValueAmount: ProceedsFromSecuredLoan, 
			assetType: "ProceedsFromSecuredLoan",
		})
	 } 
	 if(other) {
		totalLiquidAssets += parseInt(other.replace(/,/g, ''))
		assetsArray.push({
			assetAccountIdentifier: null,
			assetCashOrMarketValueAmount: other, 
			assetType: "TrustAccount",
		})
	 } 
	 console.log("asset array", assetsArray)
	 console.log("totalAssets", totalLiquidAssets)
	 console.log("current User assets", currentUser.assets)
	if(currentUser.assets !== undefined) {
		 console.log("in if assets")
		currentUser.assets.accounts = assetsArray
		currentUser.assets.totalLiquidAssets = totalLiquidAssets
	 }
	 
	 else{
		 console.log("in else")
		 console.log()
		 Object.assign(
			 currentUser, { assets: {
				totalLiquidAssets: totalLiquidAssets,
				accounts: 
						assetsArray
			 }}
		 )
	 }
	 Object.assign(	
		currentUser, { credit: {
			statedCreditScore: 721,
			}}
		)
	Object.assign(	
		currentUser.miscellaneous, 
			{ 
				tasksLeft: 9,
			}
		)		 
	
    console.log('assets onFinish values ', currentUser);
	if(currentUser.miscellaneous === "signedPurchaseContract"){
		updateUserInfo(currentUser, userToken)
		navigate('/buy-pages/contractPrice/');
	}
	else{
		showLoader();
 		setFormSubmitted(true);
    	await getPreApproval(currentUser, userToken);
    	//updateUserInfo(currentUser, userToken);
		console.log("did i await preapproval?")
    	hideLoader();
    	navigate('/buy-pages/preApprovalApproved/');
	}
  };

  useEffect(() => {
    hideLoader();
  }, []); // <-- empty dependency array

  //   require('./reasons.module.css');//
  return (
    <SectionMainWrapper>
	
      <Box {...sectionWrapper}>
        <Container>
			
          <Box {...row}>
		  {loading ? (
        <FullPageLoader />
      ) : formSubmitted ? (
        ''
      ) : (  
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
                content={"Last one-we'll check your pre-approval next"}
                fontWeight="bold"
                {...title}
              />

              <div className="homeValue">

			  <Form.Item
                    name="savingsAccountBox"
                    valuePropName="checked"
                    initialValue={false}
                  >
                    <Checkbox
                      onChange={handleShowCheckingAndSavingsTextBox}
                    >
                      Checking and savings accounts
                    </Checkbox>
                  </Form.Item>

				  {showCheckingAndSavingsTextBox && (
                    <Form.Item
                      name="savingsAccount"
                      label="Total balances"
					  onChange={handleSavingsAccount}
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

				<Form.Item
                    name="retirement"
                    valuePropName="checked"
                    initialValue={false}
                  >
                    <Checkbox
                      onChange={handleShowRetirementFundTextBox}
                    >
                      Retirement accounts
                    </Checkbox>
                  </Form.Item>

                  {showRetirementFundTextBox && (
                    <Form.Item
                      name="retirementFund"
                      label="Total balances"
					  onChange={handleRetirementFund}
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

                  <Form.Item
                    name="seperateMaintenance"
                    valuePropName="checked"
                    initialValue={false}
                  >
                    <Checkbox
                      onChange={handleShowStockBox}
                    >
                      Stocks and bonds (brokerage account)
                    </Checkbox>
                  </Form.Item>

                  {showStockBox && (
                    <Form.Item
                      name="stock"
                      label="Total balances"
					  onChange={handleStock}
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
 
 				<Form.Item
                    name="Gift"
                    valuePropName="checked"
                    initialValue={false}
                  >
                    <Checkbox
                      checked={showGiftTextBox}
                      onChange={handleGiftChange}
                    >
                    	Gifts from relatives
                    </Checkbox>
                  </Form.Item>

				{showGiftTextBox && (
                    <Form.Item
                      name="Gift"
                      label="Total gifts"
					  onChange={handleGiftOfPropertyEquity}
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
				  	
 				<Form.Item
                    name="loan"
                    valuePropName="checked"
                    initialValue={false}
                  >
                    <Checkbox
                      onChange={handleLoanAmountTextBox}
                    >
                      Loan amount
                    </Checkbox>
                  </Form.Item>

				  {showLoanAmountTextBox && (
                    <Form.Item
                      name="loanAmount"
                      label="Additional loans"
					  onChange={handleProceedsFromSecuredLoan}
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

				<Form.Item
                    name="other"
                    valuePropName="checked"
                    initialValue={false}
                  >
                    <Checkbox
                      onChange={handleOtherAmountTextBox}
                    >
                      Other (trust, business accounts, etc.)
                    </Checkbox>
                  </Form.Item>

				  {showOtherTextBox && (
                    <Form.Item
                      name="other"
                      label="Available assets"
					  onChange={handleOther}
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
              </div>

              <Form.Item {...tailFormItemLayout}>
                <p></p>
                <p></p>
                <div className="containerClassReasons">
                  <Button
                    type="primary"
                    title="Next"
                    htmlType="submit"
                    {...button}
                    onClick={onFinish}
                    /* disabled={
                     !statedCreditScore ||
                      !annualIncome
                    } */
                  ></Button>
                </div>
              </Form.Item>
            </Form>
			)}
          </Box>
        </Container>
      </Box>
  	
    </SectionMainWrapper>
  );
};

AssetsComponent.propTypes = {
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

AssetsComponent.defaultProps = {
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
    fontSize: ['18px', '28px', '32px', '32px', '37px'],
    fontWeight: '600',
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
      "Tell us about the assets you have available, even if you don't plan on spending them. This helps us understand what you can use towards your down payment, closing costs, and potential reserve requirements",
    fontSize: ['10px', '12px', '18px', '18px', '20px'],
    fontWeight: '400',
    color: '#525f7f',
    lineHeight: '28px',
    mb: ['25px', '25px', '30px', '30px', '45px'],
    //textAlign: ['center', 'center'],
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
	  getPreApproval: (currentUser, userToken) =>
		dispatch(getPreApproval(currentUser, userToken)),
	  showLoader: () => dispatch(showLoader()),
	  hideLoader: () => dispatch(hideLoader()),
	};
  };

const AssetsComponentRedux = connect(
  mapStateToProps,
  mapDispatchToProps
)(AssetsComponent);

export default AssetsComponentRedux;
