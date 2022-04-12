import React, { useState } from 'react';
import { connect } from 'react-redux';
import { navigate } from 'gatsby';
import Cleave from 'cleave.js/react';
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
  Radio,
  Button,
  AutoComplete,
} from 'antd';
import ContactFromWrapper, { SectionMainWrapper } from '../../contact.style';
import PropTypes from 'prop-types';
import Box from 'common/src/components/Box';
import Text from 'common/src/components/Text';
import Heading from 'common/src/components/Heading';
import Container from 'common/src/components/UI/Container';
import FeatureBlock from 'common/src/components/FeatureBlock';
import { updateUserInfo } from '../../../../actions';

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

const RentalPropertyIncomeSection = ({
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
  const [showHOATextBox, setShowHOATextBox] = useState(false);
  const [showMortgagePaymentTextBox, setShowMortgagePaymentTextBox] = useState(
    false
  );

  const handleHOAchange = (e) => {
    console.log('in hoa change', e.target.value);
    if (e.target.value == 1) {
      console.log('in change box');
      setShowHOATextBox(true);
    } else setShowHOATextBox(false);
  };

  const handleMonthlyMortgageChange = (e) => {
    console.log('in monthly mortgage amount', e.target.value);
    if (e.target.value == 1) {
      console.log('in change box');
      setShowMortgagePaymentTextBox(true);
    } else setShowMortgagePaymentTextBox(false);
  };

  const onFinish = async (values) => {
    console.log('onFinish values ', values);

    currentUser.rentalIncomeMonthlyMortagePayment =
      values.rentalIncomeMonthlyMortagePayment;
    currentUser.rentalPropertyAddress = values.rentalPropertyAddress;
    currentUser.rentalPropertyApartmentNumber =
      values.rentalPropertyApartmentNumber;
    currentUser.rentalPropertyCity = values.rentalPropertyCity;
    currentUser.rentalPropertyMonthlyHOAamount =
      values.rentalPropertyMonthlyHOAamount;
    currentUser.rentalPropertyMonthlyInsurancePremium =
      values.rentalPropertyMonthlyInsurancePremium;
    currentUser.rentalPropertyMonthlyMortgagePayment =
      values.rentalPropertyMonthlyMortgagePayment;
    currentUser.rentalPropertyMonthlyPropertyTax =
      values.rentalPropertyMonthlyPropertyTax;
    currentUser.rentalPropertyMontlyIncome = values.rentalPropertyMontlyIncome;
    currentUser.rentalPropertyState = values.rentalPropertyState;
    currentUser.rentalPropertyStatus = values.rentalPropertyStatus;
    currentUser.rentalPropertyValue = values.rentalPropertyValue;
    currentUser.rentalPropertyZipCode = values.rentalPropertyZipCode;

    userToken = JSON.parse(localStorage.getItem('jwt'));

    console.log('currentUser with ownership updates', currentUser);

    //showLoader();
    updateUserInfo(currentUser, userToken);

    //hideLoader();
    if (currentUser.incomeChildSupportAlimonyMaintenanceIncome == true) {
      currentUser.applicationStep = '/refi-pages/childSupportAlimony/';
      updateUserInfo(currentUser, userToken);
      navigate('/refi-pages/childSupportAlimony/');
    } else if (currentUser.incomeAdditionalIncome == true) {
      currentUser.applicationStep =
        '/refi-pages/interestDividendsHousingGovernmentTrustOther/';
      updateUserInfo(currentUser, userToken);
      navigate('/refi-pages/interestDividendsHousingGovernmentTrustOther/');
    } else {
      currentUser.applicationStep = '/refi-pages/howLongCurrentAddress/';
      updateUserInfo(currentUser, userToken);
      navigate('/refi-pages/howLongCurrentAddress/');
    }
  };

  return (
    <SectionMainWrapper>
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
                  style={{ width: '60%' }}
                >
                  <Text
                    content={'Rental income information'}
                    fontWeight="bold"
                  />
                  <Form.Item
                    name="rentalPropertyAddress"
                    label="Address"
                    rules={[
                      {
                        required: true,
                        message: '*Required',
                      },
                    ]}
                  >
                    <Input autoComplete="new-password" />
                  </Form.Item>

                  <Form.Item
                    name="rentalPropertyApartmentNumber"
                    label="Apartment, Suite, Unit"
                  >
                    <Input autoComplete="new-password" />
                  </Form.Item>

                  <Form.Item
                    name="rentalPropertyCity"
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

                  <Form.Item
                    name="rentalPropertyState"
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

                  <Form.Item
                    name="rentalPropertyZipCode"
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

                  <Form.Item
                    name="rentalPropertyMontlyIncome"
                    label="Monthly rental income"
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

                  <Text
                    content={'Rental property information'}
                    fontWeight="bold"
                  />

                  <Form.Item
                    name="rentalPropertyValue"
                    label="Property Value"
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
                    name="rentalPropertyStatus"
                    label="Property Status"
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
                      //onChange={residencyOnChange}
                    >
                      <Option value="retained">Retained</Option>
                      <Option value="sold">Sold</Option>
                      <Option value="pendingSale">Pending Sale</Option>
                    </Select>
                  </Form.Item>

                  <Form.Item
                    name="rentalPropertyMonthlyInsurancePremium"
                    label="What is your monthly insurance premium?"
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
                    name="rentalPropertyMonthlyPropertyTax"
                    label="What is your monthly property tax?"
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
                    name="rentalPropertyHOA"
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
                  </Form.Item>
                  {showHOATextBox && (
                    <Form.Item
                      name="rentalPropertyMonthlyHOAamount"
                      label="Monthly HOA amount"
                      rules={[
                        {
                          required: false,
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
                    name="rentalPropertyMonthlyMortgagePayment"
                    label="Monthly Mortgage Payment"
                    rules={[
                      {
                        required: true,
                        message: '*Required',
                      },
                    ]}
                  >
                    <Radio.Group onChange={handleMonthlyMortgageChange}>
                      <Radio value="1">Yes</Radio>
                      <Radio value="2">No</Radio>
                    </Radio.Group>
                  </Form.Item>
                  {showMortgagePaymentTextBox && (
                    <Form.Item
                      name="rentalIncomeMonthlyMortagePayment"
                      label="Monthly Mortgage Payment"
                      rules={[
                        {
                          required: false,
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

                  <Form.Item {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit" {...button}>
                      Continue
                    </Button>
                  </Form.Item>
                </Form>
              </ContactFromWrapper>
            </Box>
          </Box>
        </Container>
      </Box>
    </SectionMainWrapper>
  );
};

RentalPropertyIncomeSection.propTypes = {
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

RentalPropertyIncomeSection.defaultProps = {
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
    content: '',
    fontSize: ['20px', '26px', '30px', '36px', '40px'],
    lineHeight: ['30px', '32px', '40px', '50px', '55px'],
    fontWeight: '700',
    color: '#32325d',
    letterSpacing: '-0.010em',
    mb: '20px',
    textAlign: ['center', 'center'],
  },

  description: {
    content: 'Tell us about you rental property.',
    fontSize: '20px',
    fontWeight: '700',
    color: '#525f7f',
    lineHeight: '28px',
    mb: ['25px', '25px', '30px', '30px', '45px'],
    textAlign: ['center', 'center'],
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

const RentalPropertyIncomeSectionRedux = connect(
  mapStateToProps,
  mapDispatchToProps
)(RentalPropertyIncomeSection);

export default RentalPropertyIncomeSectionRedux;
