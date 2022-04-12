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
import GoogleAddressSearch from '../../GoogleAutoComplete';


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

const HowLongCurrentAddressSection = ({
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

  const onFinish = async (values) => {
    values['applicationStep'] = '/moreUserInfo/';

    console.log('onFinish values ', values);

    userToken = JSON.parse(localStorage.getItem('jwt'));
    currentUser.residenceMonthsLived = values.residenceMonthsLived;
    currentUser.residenceYearsLived = values.residenceYearsLived;
	currentUser.borrowerAddressLineText = propertyAddress
	currentUser.borrowerCityName = city
	currentUser.borrowerStateCode = state
	currentUser.borrowerPostalCode = zipCode

    currentUser.applicationStep = '/refi-pages/declarationsPage1/';

    //showLoader();
    updateUserInfo(currentUser, userToken);

	
    //hideLoader();

    navigate('/refi-pages/declarationsPage1/');
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
                  <Text content={'Your current address'} fontWeight="bold" />
{/* 
                  <Text content={currentUser?.propertyAddress} />
                  <Text
                    content={
                      currentUser?.city +
                      ', ' +
                      currentUser?.state +
                      ' ' +
                      currentUser?.zipCode
                    }
                  /> */}


                <Heading
                  content={'What is your current address?'}
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
					componentRestrictions={{ country: "us" }}
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

                  <Text
                    content={
                      'How long have you lived at the address listed above?'
                    }
                    fontWeight="bold"
                  />

                  <Form.Item
                    name="residenceYearsLived"
                    label="Years"
                    rules={[
                      {
                        required: true,
                        message: '*Required',
                      },
                    ]}
                  >
                    <Cleave
                      className="ant-input"
                      options={{
                        numeral: true,
                        numeralIntegerScale: 3,
                        numeralPositiveOnly: true,
                        //prefix: '$',
                        signBeforePrefix: true,
                        stripLeadingZeroes: true,
                      }}
                    />
                  </Form.Item>

                  <Form.Item
                    name="residenceMonthsLived"
                    label="Months"
                    rules={[
                      {
                        required: true,
                        message: '*Required',
                      },
                    ]}
                  >
                    <Cleave
                      className="ant-input"
                      options={{
                        numeral: true,
                        numeralIntegerScale: 2,
                        numeralPositiveOnly: true,
                        //prefix: '$',
                        signBeforePrefix: true,
                        stripLeadingZeroes: true,
                      }}
                    />
                  </Form.Item>

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

HowLongCurrentAddressSection.propTypes = {
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

HowLongCurrentAddressSection.defaultProps = {
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
    content: 'Tell us how long you have lived at your current address.',
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

const HowLongCurrentAddressSectionRedux = connect(
  mapStateToProps,
  mapDispatchToProps
)(HowLongCurrentAddressSection);

export default HowLongCurrentAddressSectionRedux;
