import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
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
//import Button from 'common/src/components/Button';
import ContactFromWrapper, { SectionMainWrapper } from '../contact.style';
//import ContentWrapper from '../contact.style';

import PropTypes from 'prop-types';
import Box from 'common/src/components/Box';
import Text from 'common/src/components/Text';
import Heading from 'common/src/components/Heading';
import Container from 'common/src/components/UI/Container';
import FeatureBlock from 'common/src/components/FeatureBlock';
import GoogleAddressSearch from '../GoogleAutoComplete';
import { createUsers, getUser, showLoader, hideLoader } from '../../../actions';

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

const PropertyAddressSection = ({
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
    console.log('onFinish values ', values);

    localStorage.setItem(
      'propertyAddress',
      JSON.stringify(values.propertyAddress)
    );
    localStorage.setItem('city', JSON.stringify(values.city));
    localStorage.setItem('state', JSON.stringify(values.state));
    localStorage.setItem('zipCode', JSON.stringify(values.zipCode));

    navigate('/refi-pages/tellUsMore/');
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

  console.log('google address===>', googleAddress);

  useEffect(() => {
    const now = new Date();

    //   read date from local storage
    /* const saved_item_str = localStorage.getItem('data');
    console.log('Saved Item', saved_item_str);
    if (saved_item_str) {
      const saved_item = JSON.parse(saved_item_str);
    } */

    //   console.log("Just save");
  }, []); // <-- empty dependency array

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
                  name="propertyAddress"
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
                  <Form.Item {...tailFormItemLayout}>
                    <Button
                      //type="submit" or "primary" not sure
                      htmlType="submit"
                      color="white"
                      /* onClick={onFinish} */
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
    </SectionMainWrapper>
  );
};

PropertyAddressSection.propTypes = {
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

PropertyAddressSection.defaultProps = {
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
    content: 'Add your property to personalize your rates',
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

const PropertyAddressSectionRedux = connect(
  mapStateToProps,
  mapDispatchToProps
)(PropertyAddressSection);

export default PropertyAddressSectionRedux;
