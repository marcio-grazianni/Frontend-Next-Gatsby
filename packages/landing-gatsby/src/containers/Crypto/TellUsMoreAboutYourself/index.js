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

const RefinanceTellUsMore = ({
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
  /* const data = useStaticQuery(graphql`
    query {
      cryptoJson {
        paymentPolicy {
          id
          title
          value
        }
        currencyOptions {
          id
          title
          value
        }
      }
    }
  `); */

  const [form] = Form.useForm();

  /* const [state, setState] = useState({
    price: '',
    currency: 'usd',
    policy: 'oneTime',
  }); */

  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [mobilePhone, setMobilePhone] = useState(null);
  const [socialSecurityNumberOrTIN, setSocialSecurityNumberOrTIN] = useState(
    null
  );
  const [statedCreditScore, setStatedCreditScore] = useState(null);
  const [statedMortgageDebt, setStatedMortgageDebt] = useState(null);
  const [annualIncome, setAnnualIncome] = useState(null);

  /* const handleFormData = (value, name) => {
    setState({
      ...state,
      [name]: value,
    });
  }; */

  const handleChangeFirstName = (e) => {
    console.log('residence radio checked', e.target.value);
    setFirstName(e.target.value);
  };

  const handleChangeLastName = (e) => {
    console.log('property radio checked', e.target.value);
    setLastName(e.target.value);
  };

  const handleChangeMobilePhone = (e) => {
    console.log('Value', e.target.value);
    setMobilePhone(e.target.value);
  };

  const handleChangeSocialSecurityNumberOrTIN = (e) => {
    console.log('Value', e.target.value);
    setSocialSecurityNumberOrTIN(e.target.value);
  };

  const handleChangeAnnualIncome = (e) => {
    console.log('Value', e.target.value);
    setAnnualIncome(e.target.value);
  };

  const handleChangeStatedCreditScore = (e) => {
    console.log('Value', e.target.value);
    setStatedCreditScore(e.target.value);
  };

  const handleChangeStatedMortgageDebt = (e) => {
    console.log('Value', e.target.value);
    setStatedMortgageDebt(e.target.value);
  };

  const onFinish = async () => {
    userToken = JSON.parse(localStorage.getItem('jwt'));
    currentUser.firstName = firstName;
    currentUser.mobilePhone = mobilePhone;
    currentUser.statedCreditScore = statedCreditScore;
    currentUser.statedMortgageDebt = statedMortgageDebt;
    currentUser.annualIncome = annualIncome;
    console.log('onFinish values ', currentUser);
    updateUserInfo(currentUser, userToken);
    navigate('/refi-pages/selectOfferRefiRateTerm/');
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
                content={'Tell us about yourself'}
                fontWeight="bold"
                {...title}
              />

              <Text fontWeight="bold" {...description} />

              <div className="homeValue">
                <Form.Item
                  name="firstName"
                  label="First name"
                  onChange={handleChangeFirstName}
                  /* rules={[
                        {
                          required: true,
                          message: '*Required',
                        },
                      ]} */
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  name="lastName"
                  label="Last name"
                  onChange={handleChangeLastName}
                  /* rules={[
                        {
                          required: true,
                          message: '*Required',
                        },
                      ]} */
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  name="mobilePhone"
                  label="Mobile phone"
                  onChange={handleChangeMobilePhone}
                  /* rules={[
                        {
                          required: true,
                          message: '*Required',
                        },
                      ]} */
                >
                  <Cleave
                    className="ant-input"
                    placeholder="888 888 8888"
                    options={{ phone: true, phoneRegionCode: 'US' }}
                  />
                </Form.Item>

                <Form.Item
                  name="annualIncome"
                  label="Annual gross household salary income including bonus"
                  onChange={handleChangeAnnualIncome}
                  /* rules={[
                        {
                          required: true,
                          message: '*Required',
                        },
                      ]} */
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

                <Form.Item
                  name="statedCreditScore"
                  label="Your credit score"

                  /* rules={[
                        {
                          required: true,
                          message: '*Required',
                        },
                      ]} */
                >
                  <Select
                    placeholder="Select"
                    allowClear
                    onChange={(value) => {
                      console.log('Value', value);
                      setStatedCreditScore(value);
                    }}
                  >
                    <Option value={600}>Poor ≤619</Option>
                    <Option value={650}>Fair 620-679</Option>
                    <Option value={700}>Good 680-719</Option>
                    <Option value={730}>Excellent ≥ 720 </Option>
                  </Select>
                </Form.Item>

                <Form.Item
                  name="statedMortgageDebt"
                  label="Give a rough estimate of the amount left on your mortgage"
                  onChange={handleChangeStatedMortgageDebt}
                  /* rules={[
                        {
                          required: true,
                          message: '*Required',
                        },
                      ]} */
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

                {/* <Form.Item
        				name="socialSecurityNumberOrTIN"
        				label="Social security number or individual taxpayer identification number"
        				onChange={handleChangeSocialSecurityNumberOrTIN}
						rules={[
          					{
            				required: true,
            				message: '*Required',
          					},
        				]}
      					>
        				<Cleave
        				className='ant-input'
        				options={{  delimiters: ['-', '-'],
                    		numericOnly: true,
                    		uppercase: true,
                    		blocks: [3, 2, 4]}}
        				/>
					</Form.Item> */}
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
                    disabled={
                      !firstName ||
                      !lastName ||
                      !mobilePhone ||
                      !statedCreditScore ||
                      !statedMortgageDebt ||
                      !annualIncome
                    }
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

RefinanceTellUsMore.propTypes = {
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

RefinanceTellUsMore.defaultProps = {
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
      'We will use this information so that we can provide you with real, accurate loan options.',
    fontSize: ['10px', '12px', '18px', '18px', '20px'],
    fontWeight: '400',
    color: '#525f7f',
    lineHeight: '28px',
    mb: ['25px', '25px', '30px', '30px', '45px'],
    //textAlign: ['center', 'center'],
  },
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

const RefinanceTellUsMoreRedux = connect(
  mapStateToProps,
  mapDispatchToProps
)(RefinanceTellUsMore);

export default RefinanceTellUsMoreRedux;
