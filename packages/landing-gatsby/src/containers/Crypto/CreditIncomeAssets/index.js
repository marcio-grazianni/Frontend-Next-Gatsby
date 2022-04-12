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
import ContactFromWrapper, { SectionMainWrapper } from '../contact.style';
import Button from 'common/src/components/Button';
import PropTypes from 'prop-types';
import Box from 'common/src/components/Box';
import Text from 'common/src/components/Text';
import Heading from 'common/src/components/Heading';
import Container from 'common/src/components/UI/Container';
import FeatureBlock from 'common/src/components/FeatureBlock';
import { updateUserInfo } from '../../../actions';
import RadioGroup from 'common/src/components/RadioGroup';
import Radio from 'common/src/components/Radio';
import Cleave from 'cleave.js/react';
// import styles from "./reasons.module.css"
import './reason.css';
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


const CreditIncomeAssetsComponent = ({
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
  userToken,
  showLoader,
  hideLoader,
  loading,
}) => {
  const [form] = Form.useForm();
  const [showSalaryTextBox, setShowSalaryTextBox] = useState(false);
  const [Base, setBase] = useState(null);
  const [Bonus, setBonus] = useState(null);
  const [DividendsInterest, setDividendsInterest] = useState(null);
  const [SelfEmploymentIncome, setSelfEmploymentIncome] = useState(null);
  const [PayMyselfEmploymentIncome, setPayMyselfEmploymentIncome] = useState(null);
  const [SocialSecurity, setSocialSecurity] = useState(null);
  const [ChildSupport, setChildSupport] = useState(null);
  const [Alimony, setAlimony] = useState(null);
  const [Other, setOther] = useState(null);
  const [showSelfEmploymentTextBox, setShowSelfEmploymentTextBox] = useState(false);
  const [showIssueMyselfPayTextBox, setShowIssueMyselfPayTextBox] = useState(false);
  const [showSocialSecurityTextBox, setShowSocialSecurityTextBox] = useState(false);
  const [showOtherTextBox, setShowOtherTextBox] = useState(false);
  const [annualIncome, setAnnualIncome] = useState(null);
  const [statedCreditScore, setStatedCreditScore] = useState(null);

  let incomeTypeArray = []

	//incomes
  const handleBase = (e) => {
    setBase(e.target.value);
  };

  const handleBonus = (e) => {
    setBonus(e.target.value);
  };

  const handleDividendsInterest = (e) => {
    setDividendsInterest(e.target.value);
  };

  const handleSelfEmploymentIncome = (e) => {
    setSelfEmploymentIncome(e.target.value);
  };

  const handlePayMyselfEmploymentIncome = (e) => {
    setPayMyselfEmploymentIncome(e.target.value);
  };

  const handleSocialSecurityIncome = (e) => {
    setSocialSecurity(e.target.value);
  };

  const handleChildSupportIncome = (e) => {
    setChildSupport(e.target.value);
  };

  const handleAlimonyIncome = (e) => {
    setAlimony(e.target.value);
  };

  const handleOther = (e) => {
    setOther(e.target.value);
  };


  //textboxes
  const handleSalaryTextBoxChange = (e) => {
    setShowSalaryTextBox(e.target.checked);
  };
  const handleSelfEmploymentTextBoxChange = (e) => {
    setShowSelfEmploymentTextBox(e.target.checked);
  };

  const handlePayMyselfTextBoxChange = (e) => {
    setShowIssueMyselfPayTextBox(e.target.checked);
  };

  const handleSocialSecurityTextBox = (e) => {
    setShowSocialSecurityTextBox(e.target.checked);
  };

  const handleOtherChange = (e) => {
    setShowOtherTextBox(e.target.checked);
  };

  const handleNotCUrrentlyEarningMoney = (e) => {
    //setShowOtherTextBox(e.target.checked);
  };

  const handleChangeStatedCreditScore = (e) => {
    console.log('Value', e.target.value);
    setStatedCreditScore(e.target.value);
  };

  const onFinish = async () => {
	var totalYearlyIncome = 0
	  //check each incomeType and see if is not an empty string: if build, build object, add to array
	 if(Base) {
		totalYearlyIncome += parseInt(Base.replace(/,/g, ''))
		incomeTypeArray.push({
			currentIncomeMonthlyTotalAmount: parseInt(Base.replace(/,/g, ''))/12,
			employmentIncomeIndicator: "true", //"true" "false"
			incomeType: "Base",
		})
	 } 
	 if(Bonus) {
		totalYearlyIncome += parseInt(Bonus.replace(/,/g, ''))
		incomeTypeArray.push({
			currentIncomeMonthlyTotalAmount: parseInt(Bonus.replace(/,/g, ''))/12,
			employmentIncomeIndicator: "true", //"true" "false"
			incomeType: "Bonus",
		})
	 } 
	 if(DividendsInterest) {
		totalYearlyIncome += parseInt(DividendsInterest.replace(/,/g, ''))
		incomeTypeArray.push({
			currentIncomeMonthlyTotalAmount: parseInt(DividendsInterest.replace(/,/g, ''))/12,
			employmentIncomeIndicator: "true", //"true" "false"
			incomeType: "DividendsInterest",
		})
	 } 
	 if(SelfEmploymentIncome) {
		totalYearlyIncome += parseInt(SelfEmploymentIncome.replace(/,/g, ''))
		incomeTypeArray.push({
			currentIncomeMonthlyTotalAmount: parseInt(SelfEmploymentIncome.replace(/,/g, ''))/12,
			employmentIncomeIndicator: "false", //"true" "false"
			incomeType: "SelfEmploymentIncome",
		})
	 } 
	 if(PayMyselfEmploymentIncome) {
		totalYearlyIncome += parseInt(PayMyselfEmploymentIncome.replace(/,/g, ''))
		incomeTypeArray.push({
			currentIncomeMonthlyTotalAmount: parseInt(PayMyselfEmploymentIncome.replace(/,/g, ''))/12,
			employmentIncomeIndicator: "false", //"true" "false"
			incomeType: "PaySelfSelfEmployed",
		})
	 } 
	 if(SocialSecurity) {
		totalYearlyIncome += parseInt(SocialSecurity.replace(/,/g, ''))
		incomeTypeArray.push({
			currentIncomeMonthlyTotalAmount: parseInt(SocialSecurity.replace(/,/g, ''))/12,
			employmentIncomeIndicator: "true", //"true" "false"
			incomeType: "SocialSecurity",
		})
	 } 
	 if(ChildSupport) {
		totalYearlyIncome += parseInt(ChildSupport.replace(/,/g, ''))
		incomeTypeArray.push({
			currentIncomeMonthlyTotalAmount: parseInt(ChildSupport.replace(/,/g, ''))/12,
			employmentIncomeIndicator: "true", //"true" "false"
			incomeType: "ChildSupport",
		})
	 } 
	 if(Alimony) {
		totalYearlyIncome += parseInt(Alimony.replace(/,/g, ''))
		incomeTypeArray.push({
			currentIncomeMonthlyTotalAmount: parseInt(Alimony.replace(/,/g, ''))/12,
			employmentIncomeIndicator: "true", //"true" "false"
			incomeType: "Alimony",
		})
	 } 
	 if(Other) {
		totalYearlyIncome += parseInt(Other.replace(/,/g, ''))
		incomeTypeArray.push({
			currentIncomeMonthlyTotalAmount: parseInt(Other.replace(/,/g, ''))/12,
			employmentIncomeIndicator: "true", //"true" "false"
			incomeType: "Other",
		})
	 } 
	 console.log("total yearly", totalYearlyIncome)
	 var totalMonthlyIncome = (totalYearlyIncome/12)
	 console.log("total monrthly", totalMonthlyIncome)
	console.log("current User.borrower", currentUser.borrower)
	Object.assign(	
		currentUser.borrower, { income: {
			totalMonthlyIncome: totalMonthlyIncome,
			income_details: 
				incomeTypeArray
			}}
		)

	
	 
	//currentUser.borrower.income.income_details = incomeTypeArray 

    currentUser.statedCreditScore = statedCreditScore;
    //currentUser.statedMortgageDebt = statedMortgageDebt;
    console.log('onFinish values ', currentUser);
    updateUserInfo(currentUser, userToken);
    navigate('/buy-pages/howComfortable/');
  };

  //   require('./reasons.module.css');//
  return (
    <SectionMainWrapper>
      <Box {...sectionWrapper}>
        <Container>
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
                content={'Tell us about your annual income.'}
                fontWeight="bold"
                {...title}
              />

              <Text fontWeight="bold" {...description} />

              <div className="homeValue">

			  <Form.Item
                    name="salaryBox"
                    valuePropName="checked"
                    initialValue={false}
                  >
                    <Checkbox
                      onChange={handleSalaryTextBoxChange}
                    >
                      Salary or hourly wages
                    </Checkbox>
                  </Form.Item>

				  {showSalaryTextBox && (
                    <Form.Item
                      name="Base"
                      label="Annual base pay"
					  onChange={handleBase}
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

				{showSalaryTextBox && (
                    <Form.Item
                      name="Bonus"
                      label="Overtime, commissions, bonuses"
					  onChange={handleBonus}
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

                  {showSalaryTextBox && (
                    <Form.Item
                      name="DividendsInterest"
                      label="Annual restricted stock unit (RSU) grant value"
					  onChange={handleDividendsInterest}	
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
                    name="selfEmploymentBox"
                    valuePropName="checked"
                    initialValue={false}
                  >
                    <Checkbox
                      onChange={handleSelfEmploymentTextBoxChange}
                    >
                      Self-employment
                    </Checkbox>
                  </Form.Item>

                  {showSelfEmploymentTextBox && (
                    <Form.Item
                      name="SelfEmploymentIncome"
                      label="Total share of profits (as on last year's taxes)"
                      onChange={handleSelfEmploymentIncome} 
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

			{showSelfEmploymentTextBox && (		
			<Form.Item
                    name="payToSelf"
                    valuePropName="checked"
                    initialValue={false}
                  >
                    <Checkbox
                      onChange={handlePayMyselfTextBoxChange}
                    >
                      I issue myself regular paychecks
                    </Checkbox>
                  </Form.Item>
				   )}

				{showSelfEmploymentTextBox && showIssueMyselfPayTextBox && (
                    <Form.Item
                      name="payToSelfAmount"
                      label="Annual pay to myself"
					  onChange={handlePayMyselfEmploymentIncome}
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
                    name="socialBox"
                    valuePropName="checked"
                    initialValue={false}
                  >
                    <Checkbox
                      onChange={handleSocialSecurityTextBox}
                    >
                      Social security, pension, or disability
                    </Checkbox>
                  </Form.Item>

                  {showSocialSecurityTextBox && (
                    <Form.Item
                      name="SocialSecurity"
                      label="Total Income"
					  onChange={handleSocialSecurityIncome}
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
                      checked={showOtherTextBox}
                      onChange={handleOtherChange}
                    >
                      Other
                    </Checkbox>
                  </Form.Item>

                  {showOtherTextBox && (
                    <Form.Item
                      name="ChildSupport"
                      label="Monthly Child Support"
					  onChange={handleChildSupportIncome}
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

				{showOtherTextBox && (
                    <Form.Item
                      name="Alimony"
                      label="Monthly alimony"
					  onChange={handleAlimonyIncome}
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

				{showOtherTextBox && (
                    <Form.Item
                      name="Other"
                      label="Annual other income"
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
				  	
 				<Form.Item
                    name="noCurrentlyEarningMoney"
                    valuePropName="checked"
                    initialValue={false}
                  >
                    <Checkbox
                      checked={showOtherTextBox}
                      onChange={handleNotCUrrentlyEarningMoney}
                    >
                      Not currently earning money
                    </Checkbox>
                  </Form.Item>

                <Form.Item
                  name="statedCreditScore"
                  label="Your credit score"

                 rules={[
                        {
                          required: true,
                          message: '*Required',
                        },
                      ]} 
                >
                  <Select
                    placeholder="Select"
                    allowClear
                    onChange={(value) => {
						console.log('Value', value);
						setStatedCreditScore(value);
					  }}
                  >
					<Option value={570}>Very Poor ≤580</Option>  
                    <Option value={600}>Poor 580-619</Option>
                    <Option value={650}>Fair 620-679</Option>
                    <Option value={700}>Good 680-719</Option>
                    <Option value={730}>Very good 720-759 </Option>
					<Option value={770}>Excellent ≥ 760 </Option>
                  </Select>
                
                </Form.Item>
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
              {/*  <li>
				<Button
				title={'Next'}
				onClick={onFinish}
				/>
</li> */}
            </Form>
          </Box>
        </Container>
      </Box>
    </SectionMainWrapper>
  );
};

CreditIncomeAssetsComponent.propTypes = {
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

CreditIncomeAssetsComponent.defaultProps = {
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
      '',
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
  });

const mapDispatchToProps = (dispatch) => {
  return {
    updateUserInfo: (currentUser, userToken) =>
      dispatch(updateUserInfo(currentUser, userToken)),
  };
};

const CreditIncomeAssetsComponentRedux = connect(
  mapStateToProps,
  mapDispatchToProps
)(CreditIncomeAssetsComponent);

export default CreditIncomeAssetsComponentRedux;
