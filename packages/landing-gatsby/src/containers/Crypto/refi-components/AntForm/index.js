import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import 'cleave.js/dist/addons/cleave-phone.us';
import Cleave from 'cleave.js/react';
import { navigate } from 'gatsby';
import 'antd/dist/antd.css';
import './index.css';
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
  Button,
  AutoComplete,
  Radio,
} from 'antd';
import ContactFromWrapper, { SectionMainWrapper } from '../../contact.style';
import PropTypes from 'prop-types';
import Box from 'common/src/components/Box';
import Text from 'common/src/components/Text';
import Heading from 'common/src/components/Heading';
import Container from 'common/src/components/UI/Container';
import FeatureBlock from 'common/src/components/FeatureBlock';
import GoogleAddressSearch from '../../GoogleAutoComplete';
import {
  createUsers,
  getUser,
  showLoader,
  hideLoader,
} from '../../../../actions';
import FullPageLoader from '../../FullPageLoader/FullPageLoader';
import Pdf from '../../../../documents/termsOfService.pdf';
import PdfElectronicCommunicationPolicy from '../../../../documents/electronicCommunicationsPolicy.pdf';

const { Option } = Select;
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

const defaultValues = {
  loanNumber: 1048,
  loanType: 'Home equity line of credit',
  applicationStep: '/selectOffer/',
  propertyAddress: '123 Elm Street',
  apartmentNumber: '836',
  city: 'Lewisburg',
  state: 'OH',
  zipCode: '12412',
  primaryResidence: 'home',
  financingPurpose: 'Debt Consolidation',
  firstName: 'Mary',
  lastName: 'Johnson',
  suffix: 0,
  dateOfBirth: 1234,
  statedAnnualIncome: '0',
  otherIncome: '0',
  phoneNumber: '124-345-9845',
  email: 'asdfada@gmcail.com',
  password: '1234124',
  confirmPassword: '1234124',
  term: 15,
  apr: 6.4,
};

const ContactSection = ({
  sectionWrapper,
  row,
  contactForm,
  secTitleWrapper,
  button,
  note,
  title,
  description,
  createUsers,
  showLoader,
  hideLoader,
  loading,
}) => {
  const [form] = Form.useForm();
  const [googleAddress, setGoogleAddress] = useState(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [showHOATextBox, setShowHOATextBox] = useState(false);
  const [showCoBorrowerTextBox, setShowCoBorrowerTextBox] = useState(false);
  //const [coBorrowerGoogleAddress, setCoBorrowerGoogleAddress] = useState(null);

  const onFinish = async (values) => {
    values['applicationStep'] = '/refi-pages/selectOfferRefiRateTerm/';
    values['loanNumber'] = '1048';
    values['loanType'] = 'Refi';
    //remove commas from income, etc and change to integer

    console.log('stated annual income', values['statedAnnualIncome']);
    values['statedAnnualIncome'] = values['statedAnnualIncome'].replace(
      /,/g,
      ''
    );
    values['statedAnnualIncome'] = Number(values['statedAnnualIncome']);
    console.log('stated annual income', values['statedAnnualIncome']);
    console.log('statedPropertyValue', values['statedPropertyValue']);
    values['statedPropertyValue'] = values['statedPropertyValue'].replace(
      /,/g,
      ''
    );
    values['statedPropertyValue'] = Number(values['statedPropertyValue']);
    console.log('statedPropertyValue', values['statedPropertyValue']);
    console.log('stated mortgage debt', values['statedMortgageDebt']);
    values['statedMortgageDebt'] = values['statedMortgageDebt'].replace(
      /,/g,
      ''
    );
    values['statedMortgageDebt'] = Number(values['statedMortgageDebt']);
    console.log('statedMortgageDebt', values['statedMortgageDebt']);

    console.log('onFinish values ', values);

    //showLoader();
    setFormSubmitted(true);
    createUsers(values);

    //hideLoader();

    navigate('/refi-pages/refi-applicationPage2/');
  };

  const handleHOAchange = (e) => {
    console.log('in hoa change', e.target.value);
    if (e.target.value == 1) {
      console.log('in change box');
      setShowHOATextBox(true);
    } else setShowHOATextBox(false);
  };

  const handleCoBorrowerChange = (e) => {
    console.log('in coborrower change', e.target.value);
    if (e.target.value == 1) {
      console.log('in change box');
      setShowCoBorrowerTextBox(true);
    } else setShowCoBorrowerTextBox(false);
  };

  const onGoogleAddressChangeValue = (val) => {
    console.log('on change val', val);
    console.log('on change val.state', val.state);
    setGoogleAddress(val);
    form.setFieldsValue({
      propertyAddress: val.street_address + ' ' + val.route,
      state: val.state,
      city: val.city,
      zipCode: val.zip_code,
    });
  };

  //remove commas and turn to integer

  console.log('google address===>', googleAddress);

  useEffect(() => {
	  
	  const now = new Date();

	//   read date from local storage
	  const saved_item_str = localStorage.getItem("data");
	  console.log("Saved Item", saved_item_str);
	  if( saved_item_str )
	  { 
	  	const saved_item = JSON.parse(saved_item_str);
	  }
		  
	//   const item = {
	// 	address: "test address",
	// 	expirty: now.getTime() + 3600
	//   }

	//   localStorage.setItem("data", JSON.stringify(item));
	//   console.log("Just save");
	  
    hideLoader();
  }, []); // <-- empty dependency array

  return (
    <SectionMainWrapper>
      {loading ? (
        <FullPageLoader />
      ) : formSubmitted ? (
        ''
      ) : (
        <Box {...sectionWrapper}>
          <Container className="containerClass">
            <Box {...secTitleWrapper}>
              <FeatureBlock
                title={<Heading {...title} />}
                description={<Text {...description} />}
              />
            </Box>
            <Box {...row}>
              <Box {...contactForm}>
                <ContactFromWrapper>
                  <Form
                    //{...formItemLayout}
                    form={form}
                    layout="vertical"
                    name="register"
                    onFinish={onFinish}
                    scrollToFirstError
                    style={{ width: '80%' }}
                  >
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
						componentRestrictions={{ country: "us" }}
                      />
                    </Form.Item>
                    <p></p>
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
                        <Input autoComplete="new-password" />
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
                        <Input autoComplete="new-password" />
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
                        <Input autoComplete="new-password" />
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
                        <Input autoComplete="new-password" />
                      </Form.Item>
                    )}
                    <Form.Item
                      name="type"
                      label="Type"
                      rules={[
                        {
                          required: true,
                          message: '*Required',
                        },
                      ]}
                    >
                      <Select
                        placeholder="Select"
                        //onChange={onPrimaryResidenceChange}
                        allowClear
                      >
                        <Option value="singleFamily">Single Family</Option>
                        <Option value="townHome">Town Home</Option>
                        <Option value="condo">Condo</Option>
                        <Option value="other">Other</Option>
                      </Select>
                    </Form.Item>
                    <Form.Item
                      name="statedPropertyValue"
                      label="Market Price of your Home Today"
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
                    <Form.Item
                      name="statedMortgageDebt"
                      label="Give a rough estimate of the amount left on your mortgage"
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
                    {/*  <Form.Item
                      name="HOA"
                      label="Do you pay HOA fees?"
                      rules={[
                        {
                          required: true,
                          message: '*Required',
                        },
                      ]}
                    >
                      <Radio.Group onChange={handleHOAchange}>
                        <Radio value="1">Yes</Radio>
                        <Radio value="2">No</Radio>
                      </Radio.Group> 
                    </Form.Item> */}
                    {showHOATextBox && (
                      <Form.Item
                        name="monthlyHOAamount"
                        label="Monthly HOA amount"
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
                      name="primarySourceOfIncome"
                      label="Primary Source of Income"
                      rules={[
                        {
                          required: true,
                          message: '*Required',
                        },
                      ]}
                    >
                      <Select placeholder="Select" allowClear>
                        <Option value="employed">Employed</Option>
                        <Option value="retired">Retired</Option>
                        <Option value="selfEmployed">Self Employed</Option>
                        <Option value="childSupportAlimony">
                          Child Support/Alimony
                        </Option>
                        <Option value="rentalIncome">Rental Income</Option>
                        <Option value="otherIncome">Other Income</Option>
                      </Select>
                    </Form.Item>
                    <Form.Item
                      name="statedAnnualIncome"
                      label="Annual gross household salary income including bonus"
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
                      <Select placeholder="Select" allowClear>
                        <Option value={600}>Poor ≤619</Option>
                        <Option value={650}>Fair 620-679</Option>
                        <Option value={700}>Good 680-719</Option>
                        <Option value={730}>Excellent ≥ 720 </Option>
                      </Select>
                    </Form.Item>
                    {/* <Form.Item
                      name="phoneNumber"
                      label="Phone number"
                      rules={[
                        {
                          required: true,
                          message: '*Required',
                        },
                        {
                          min: 12,
                          message: '*Must be 10 digits',
                        },
                      ]}
                    >
                      <Cleave
                        className="ant-input"
                        placeholder="888 888 8888"
                        options={{ phone: true, phoneRegionCode: 'US' }}
                      />
                    </Form.Item> */}
                    {/* <Form.Item
                      name="coBorrower"
                      label="Do you want to add a co-borrower?"
                      rules={[
                        {
                          required: true,
                          message: '*Required',
                        },
                      ]}
                    >
                      <Radio.Group onChange={handleCoBorrowerChange}>
                        <Radio value="1">Yes</Radio>
                        <Radio value="2">No</Radio>
                      </Radio.Group>
                    </Form.Item> */}
                    {/* co-borrower stuff */}
                    {showCoBorrowerTextBox && (
                      <Form.Item
                        name="coBorrowerAddress"
                        label="Property home address"
                        rules={[
                          {
                            required: true,
                            message: '*Required',
                          },
                        ]}
                      >
                        <Input autoComplete="new-password" />
                      </Form.Item>
                    )}
                    {showCoBorrowerTextBox && (
                      <Form.Item
                        name="coBorrowerApartmentNumber"
                        label="Apartment, Suite, Unit"
                      >
                        <Input autoComplete="new-password" />
                      </Form.Item>
                    )}
                    {showCoBorrowerTextBox && (
                      <Form.Item
                        name="coBorrowerCity"
                        label="City"
                        rules={[
                          {
                            required: true,
                            message: '*Required',
                          },
                        ]}
                      >
                        <Input autoComplete="new-password" />
                      </Form.Item>
                    )}
                    {showCoBorrowerTextBox && (
                      <Form.Item
                        name="coBorrowerState"
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
                        <Input autoComplete="new-password" />
                      </Form.Item>
                    )}
                    {showCoBorrowerTextBox && (
                      <Form.Item
                        name="coBorrowerZipCode"
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
                        <Input autoComplete="new-password" />
                      </Form.Item>
                    )}
                    {showCoBorrowerTextBox && (
                      <Form.Item
                        name="coBorrowerFirstName"
                        label="Legal first name"
                        rules={[
                          {
                            required: true,
                            message: '*Required',
                          },
                        ]}
                      >
                        <Input />
                      </Form.Item>
                    )}
                    {showCoBorrowerTextBox && (
                      <Form.Item
                        name="coBorrowerLastName"
                        label="Legal last name"
                        rules={[
                          {
                            required: true,
                            message: '*Required',
                          },
                        ]}
                      >
                        <Input />
                      </Form.Item>
                    )}
                    {showCoBorrowerTextBox && (
                      <Form.Item name="coBorrowerSuffix" label="Suffix">
                        <Select placeholder="Select" allowClear>
                          <Option value="JR">Jr</Option>
                          <Option value="SR">Sr</Option>
                          <Option value="I">I</Option>
                          <Option value="II">II</Option>
                          <Option value="III">III</Option>
                          <Option value="IV">IV</Option>
                        </Select>
                      </Form.Item>
                    )}
                    {showCoBorrowerTextBox && (
                      <Form.Item
                        name="coBorrowerRelationship"
                        label="Relationship to primary borrower"
                      >
                        <Select placeholder="Select" allowClear>
                          <Option value="spouse">Spouse</Option>
                          <Option value="coOwner">Co-owner</Option>
                          <Option value="other">Other</Option>
                        </Select>
                      </Form.Item>
                    )}
                    {showCoBorrowerTextBox && (
                      <Form.Item
                        name="coBorrowerDateOfBirth"
                        label="Date of birth"
                        rules={[
                          {
                            required: true,
                            message: '*Required',
                          },
                        ]}
                      >
                        <Cleave
                          className="ant-input"
                          placeholder="01/01/1968"
                          options={{ date: true, datePattern: ['m', 'd', 'Y'] }}
                        />
                      </Form.Item>
                    )}
                    {showCoBorrowerTextBox && (
                      <Form.Item
                        name="coBorrowerPrimarySourceOfIncome"
                        label="Primary Source of Income"
                      >
                        <Select placeholder="Select" allowClear>
                          <Option value="employed">Employed</Option>
                          <Option value="retired">Retired</Option>
                          <Option value="selfEmployed">Self Employed</Option>
                          <Option value="childSupportAlimony">
                            Child Support/Alimony
                          </Option>
                          <Option value="rentalIncome">Rental Income</Option>
                          <Option value="otherIncome">Other Income</Option>
                        </Select>
                      </Form.Item>
                    )}
                    {showCoBorrowerTextBox && (
                      <Form.Item
                        name="coBorrowerAnnualIncome"
                        label="Annual gross household salary income including bonus"
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
                    {showCoBorrowerTextBox && (
                      <Form.Item
                        name="coBorrowerPhoneNumber"
                        label="Phone number"
                        rules={[
                          {
                            required: true,
                            message: '*Required',
                          },
                          {
                            min: 12,
                            message: '*Must be 10 digits',
                          },
                        ]}
                      >
                        <Cleave
                          className="ant-input"
                          placeholder="888 888 8888"
                          options={{ phone: true, phoneRegionCode: 'US' }}
                        />
                      </Form.Item>
                    )}
                    {showCoBorrowerTextBox && (
                      <Form.Item
                        name="coBorrowerEmail"
                        label="E-mail"
                        rules={[
                          {
                            type: 'email',
                            message: 'Please enter a valid E-mail',
                          },
                          {
                            required: true,
                            message: 'Please input your E-mail',
                          },
                        ]}
                      >
                        <Input />
                      </Form.Item>
                    )}
                    <Form.Item
                      name="email"
                      label="E-mail"
                      rules={[
                        {
                          type: 'email',
                          message: 'Please enter a valid E-mail',
                        },
                        {
                          required: true,
                          message: 'Please input your E-mail',
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      name="password"
                      label="Create password"
                      rules={[
                        {
                          required: true,
                          message: 'Please input your password',
                        },
                        {
                          min: 9,
                          message: 'Must be at least 9 characters',
                        },
                      ]}
                      hasFeedback
                    >
                      <Input.Password />
                    </Form.Item>
                    <Form.Item
                      name="confirmPassword"
                      label="Confirm Password"
                      dependencies={['password']}
                      hasFeedback
                      rules={[
                        {
                          required: true,
                          message: 'Please confirm your password',
                        },
                        {
                          min: 9,
                          message: 'Must be at least 9 characters',
                        },
                        ({ getFieldValue }) => ({
                          validator(_, value) {
                            if (!value || getFieldValue('password') === value) {
                              return Promise.resolve();
                            }

                            return Promise.reject(
                              'The two passwords that you entered do not match'
                            );
                          },
                        }),
                      ]}
                    >
                      <Input.Password />
                    </Form.Item>

                    <Form.Item {...tailFormItemLayout}>
                      <Button
                        //type="submit" or "primary" not sure
                        htmlType="submit"
                        color="white"
                        //onClick={blank()}
                        title="Continue"
                        {...button}
                      >
                        Continue
                      </Button>
                    </Form.Item>
                  </Form>
                </ContactFromWrapper>
              </Box>
            </Box>
          </Container>
        </Box>
      )}
    </SectionMainWrapper>
  );
};

ContactSection.propTypes = {
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

ContactSection.defaultProps = {
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
    fontSize: `${2}`,
    fontWeight: '600',
    //borderRadius: '4px',
    pl: '22px',
    pr: '22px',
    colors: 'primaryWithBg',
    height: `${4}`,
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
    content: 'Get started with 3 easy steps to find your rate.',
    fontSize: ['20px', '26px', '30px', '36px', '40px'],
    lineHeight: ['30px', '32px', '40px', '50px', '55px'],
    fontWeight: '700',
    color: '#32325d',
    letterSpacing: '-0.010em',
    mb: '20px',
    textAlign: ['center', 'center'],
  },

  description: {
    content: '',
    fontSize: '16px',
    fontWeight: '400',
    color: '#525f7f',
    lineHeight: '28px',
    mb: ['25px', '25px', '30px', '30px', '45px'],
    textAlign: ['center', 'center'],
  },
};

const mapStateToProps = ({ root: { currrentUser, loading } }) => ({
  currrentUser,
  loading,
});


const mapDispatchToProps = (dispatch) => {
  return {
    createUsers: (formVals) => dispatch(createUsers(formVals)),
    getUser: (userId) => dispatch(getUser(userId)),
    showLoader: () => dispatch(showLoader()),
    hideLoader: () => dispatch(hideLoader()),
  };
};

const ContactSectionRedux = connect(
  mapStateToProps,
  mapDispatchToProps
)(ContactSection);

export default ContactSectionRedux;
