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
} from 'antd';
import ContactFromWrapper, { SectionMainWrapper } from './contact.style';
import PropTypes from 'prop-types';
import Box from 'common/src/components/Box';
import Text from 'common/src/components/Text';
import Heading from 'common/src/components/Heading';
import Container from 'common/src/components/UI/Container';
import FeatureBlock from 'common/src/components/FeatureBlock';
import GoogleaAddressSearch from '../GoogleAutoComplete';
import { createUsers, getUser, showLoader, hideLoader } from '../../../actions';
import FullPageLoader from '../FullPageLoader/FullPageLoader';

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
  annualIncome: '0',
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

  const onFinish = async (values) => {
    values['applicationStep'] = '/selectOffer/';
    values['loanNumber'] = '1048';
    values['loanType'] = 'Home equity line of credit';

    console.log('onFinish values ', values);
    showLoader();
    setFormSubmitted(true);
    await createUsers(values);

    hideLoader();

    navigate('/selectOffer/');
  };

  const onChangeValue = (val) => {
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

  console.log('google address===>', googleAddress);

  useEffect(() => {
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
                    <GoogleaAddressSearch onChangeValue={onChangeValue} />
                    <p></p>

                    {googleAddress !== null && (
                      <Form.Item
                        name="propertyAddress"
                        label="Property address"
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
                      name="primaryResidence"
                      label="Is this your primary residence?"
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
                        <Option value="HOME">yes</Option>
                        <Option value="no">no</Option>
                      </Select>
                    </Form.Item>

                    <Form.Item
                      name="financingPurpose"
                      label="Financing purpose"
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
                        <Option value="DEBT CONSOLIDATION">
                          Debt consolidation
                        </Option>
                        <Option value="HOME IMPROVEMENT">
                          Home improvement
                        </Option>
                        <Option value="MAJOR PURCHASE">Major purchase</Option>
                        <Option value="OTHER">Other</Option>
                      </Select>
                    </Form.Item>

                    <Form.Item
                      name="firstName"
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

                    <Form.Item
                      name="lastName"
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

                    <Form.Item name="suffix" label="Suffix">
                      <Select placeholder="Select" allowClear>
                        <Option value="JR">Jr</Option>
                        <Option value="SR">Sr</Option>
                        <Option value="I">I</Option>
                        <Option value="II">II</Option>
                        <Option value="III">III</Option>
                        <Option value="IV">IV</Option>
                      </Select>
                    </Form.Item>

                    <Form.Item
                      name="dateOfBirth"
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

                    <Form.Item
                      name="annualIncome"
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
                      name="otherIncome"
                      label="Annual gross household salary income including bonus"
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
                          prefix: '$',
                          signBeforePrefix: true,
                          stripLeadingZeroes: true,
                        }}
                      />
                    </Form.Item>

                    <Form.Item
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
                    </Form.Item>

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

                    <Form.Item
                      name="agreement"
                      valuePropName="checked"
                      rules={[
                        {
                          validator: (_, value) =>
                            value
                              ? Promise.resolve()
                              : Promise.reject('Should accept agreement'),
                        },
                      ]}
                      {...tailFormItemLayout}
                    >
                      <Checkbox>
                        I agree to the{' '}
                        <a href="">terms of service and privacy policy</a>
                      </Checkbox>
                    </Form.Item>
                    <Form.Item {...tailFormItemLayout}>
                      <Button
                        type="primary"
                        htmlType="submit"
                        color="white"
                        //onClick={blank()}
                        {...button}
                      >
                        See your offer
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
    content: "Fill out the form below to see today's rates",
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
