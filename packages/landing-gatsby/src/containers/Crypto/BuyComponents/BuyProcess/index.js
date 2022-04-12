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
import RadioGroup from 'common/src/components/RadioGroup';
import Radio from 'common/src/components/Radio';
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

const BuyProcess = ({
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

  const [whereInProcess, setWhereInProcess] = useState(null);
  const [howCanHelp, setHowCanHelp] = useState(null);
  const [whenPurchase, setWhenPurchase] = useState(null);
  const [statedPropertyValue, setStatedPropertyValue] = useState(null);
  const [whereLooking, setWhereLooking] = useState(null);
  const [googleAddress, setGoogleAddress] = useState(null);
  const [propertyAddress, setPropertyAddress] = useState(null);
  const [addressUnitIdentifier, setAddressUnitIdentifier] = useState(null);
  const [state, setState] = useState(null);
  const [city, setCity] = useState(null);
  const [zipCode, setZipCode] = useState(null);

  const handleWhereInProcess = (e) => {
    console.log('radio checked', e.target.value);
    setWhereInProcess(e.target.value);
  };

  const handleHowCanHelp = (e) => {
    console.log('radio checked', e.target.value);
    setHowCanHelp(e.target.value);
  };

  const handleWhenPurchase = (e) => {
    console.log('radio checked', e.target.value);
    setWhenPurchase(e.target.value);
  };

  const handleChangeStatedPropertyValue = (e) => {
    console.log('statedPropertyValue', e.target.value);
    setStatedPropertyValue(e.target.value);
  };

  const handleChangeWhereLooking = (e) => {
    console.log('statedPropertyValue', e.target.value);
    setZipCode(e.target.value);
  };

  const handlePropertyAddress = (e) => {
    console.log('propertyAddress', e.target.value);
    setPropertyAddress(e.target.value);
  };

  const handleAddressUnitIdentifier = (e) => {
    console.log('AddressUnitIdentifier', e.target.value);
    setAddressUnitIdentifier(e.target.value);
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

  console.log('google address===>', googleAddress);

  const onFinish = async (values) => {
    console.log('onFinish values ', whereInProcess);

    localStorage.setItem('whereInProcess', JSON.stringify(whereInProcess));
    localStorage.setItem('howCanHelp', JSON.stringify(howCanHelp));
    localStorage.setItem('whenPurchase', JSON.stringify(whenPurchase));
    localStorage.setItem('propertyAddress', JSON.stringify(propertyAddress));
    localStorage.setItem(
      'addressUnitIdentifier',
      JSON.stringify(addressUnitIdentifier)
    );
    localStorage.setItem('city', JSON.stringify(city));
    localStorage.setItem('state', JSON.stringify(state));
    localStorage.setItem('postalCode', JSON.stringify(zipCode));

    navigate('/buy-pages/typeOfHome/');
  };

  React.useEffect(() => {
    setWhereInProcess(whereInProcess);
    setHowCanHelp(howCanHelp);
    setWhenPurchase(whenPurchase);
    setStatedPropertyValue(statedPropertyValue);

    setWhereLooking(whereLooking);
  }, [
    whereInProcess,
    howCanHelp,
    whenPurchase,
    statedPropertyValue,
    whereLooking,
  ]);

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
                content={'Where in the process are you?'}
                fontWeight="bold"
                {...title}
              />

              <div className="containerClassReasons">
                <li>
                  <span>
                    <label style={{ fontSize: '19px', cursor: 'pointer' }}>
                      <input
                        type="radio"
                        value="researching"
                        name="radio"
                        id="radio1"
                        style={{ visibility: 'hidden' }}
                        onChange={handleWhereInProcess}
                      />
                      <span>I'm just researching</span>
                    </label>
                  </span>
                </li>
                <p></p>

                <li>
                  <label style={{ fontSize: '19px', cursor: 'pointer' }}>
                    <input
                      type="radio"
                      value="goingToOpenHouses"
                      name="radio"
                      id="radio2"
                      style={{ visibility: 'hidden' }}
                      onChange={handleWhereInProcess}
                    />
                    <span>I'm going to open houses</span>
                  </label>
                </li>
                <p></p>

                <li>
                  <label style={{ fontSize: '19px', cursor: 'pointer' }}>
                    <input
                      type="radio"
                      value="makingOffers"
                      name="radio"
                      id="radio3"
                      style={{ visibility: 'hidden' }}
                      onChange={handleWhereInProcess}
                    />

                    <span>I'm making offers</span>
                  </label>
                </li>

                <p></p>

                <li>
                  <label
                    id="refiReasonInput"
                    style={{ fontSize: '19px', cursor: 'pointer' }}
                  >
                    <input
                      id="refiReasonInput"
                      type="radio"
                      value="signedPurchaseContract"
                      name="radio"
                      id="radio4"
                      style={{ visibility: 'hidden' }}
                      onChange={handleWhereInProcess}
                    />

                    <span>I have signed a purchase contract</span>
                  </label>
                </li>
                <p></p>

                <p></p>

                {whereInProcess !== null &&
                  whereInProcess !== 'signedPurchaseContract' && (
                    <Heading
                      content={"You're in the right spot. How can we help?"}
                      fontWeight="bold"
                      {...title}
                    />
                  )}

                {whereInProcess !== null &&
                  whereInProcess !== 'signedPurchaseContract' && (
                    <li>
                      <span>
                        <label style={{ fontSize: '19px', cursor: 'pointer' }}>
                          <input
                            type="radio"
                            value="preApprovalLetter"
                            name="radio2"
                            id="radio1"
                            style={{ visibility: 'hidden' }}
                            onChange={handleHowCanHelp}
                          />
                          <span>Get a Pre-approval Letter</span>
                        </label>
                      </span>
                    </li>
                  )}
                <p></p>
                {whereInProcess !== null &&
                  whereInProcess !== 'signedPurchaseContract' && (
                    <li>
                      <label style={{ fontSize: '19px', cursor: 'pointer' }}>
                        <input
                          type="radio"
                          value="howMuchCanIAfford"
                          name="radio2"
                          id="radio2"
                          style={{ visibility: 'hidden' }}
                          onChange={handleHowCanHelp}
                        />
                        <span>See how much I can afford</span>
                      </label>
                    </li>
                  )}
                <p></p>
                {whereInProcess !== null &&
                  whereInProcess !== 'signedPurchaseContract' && (
                    <li>
                      <label style={{ fontSize: '19px', cursor: 'pointer' }}>
                        <input
                          type="radio"
                          value="estimateAHomesCost"
                          name="radio2"
                          id="radio3"
                          style={{ visibility: 'hidden' }}
                          onChange={handleHowCanHelp}
                        />

                        <span>Estimate a home's cost</span>
                      </label>
                    </li>
                  )}
                <p></p>

                {whereInProcess !== null &&
                  whereInProcess !== 'signedPurchaseContract' && (
                    <li>
                      <label style={{ fontSize: '19px', cursor: 'pointer' }}>
                        <input
                          type="radio"
                          value="findAgent"
                          name="radio2"
                          id="radio3"
                          style={{ visibility: 'hidden' }}
                          onChange={handleHowCanHelp}
                        />

                        <span>Find a real estate agent</span>
                      </label>
                    </li>
                  )}
                <p></p>

                <p></p>
                {whereInProcess !== null &&
                  whereInProcess !== 'signedPurchaseContract' && (
                    <Heading
                      content={'When do you plan on purchasing your property?'}
                      fontWeight="bold"
                      {...title}
                    />
                  )}
                {whereInProcess !== null &&
                  whereInProcess !== 'signedPurchaseContract' && (
                    <li>
                      <span>
                        <label style={{ fontSize: '19px', cursor: 'pointer' }}>
                          <input
                            type="radio"
                            value="0-3 months"
                            name="radio3"
                            id="radio1"
                            style={{ visibility: 'hidden' }}
                            onChange={handleWhenPurchase}
                          />
                          <span>0-3 months</span>
                        </label>
                      </span>
                    </li>
                  )}
                <p></p>
                {whereInProcess !== null &&
                  whereInProcess !== 'signedPurchaseContract' && (
                    <li>
                      <label style={{ fontSize: '19px', cursor: 'pointer' }}>
                        <input
                          type="radio"
                          value="3-6 months"
                          name="radio3"
                          id="radio2"
                          style={{ visibility: 'hidden' }}
                          onChange={handleWhenPurchase}
                        />
                        <span>3-6 months</span>
                      </label>
                    </li>
                  )}
                <p></p>
                {whereInProcess !== null &&
                  whereInProcess !== 'signedPurchaseContract' && (
                    <li>
                      <label style={{ fontSize: '19px', cursor: 'pointer' }}>
                        <input
                          type="radio"
                          value="6+ months"
                          name="radio3"
                          id="radio3"
                          style={{ visibility: 'hidden' }}
                          onChange={handleWhenPurchase}
                        />

                        <span>6+ months</span>
                      </label>
                    </li>
                  )}
                <p></p>

                {whereInProcess !== null &&
                  whereInProcess !== 'signedPurchaseContract' && (
                    <li>
                      <label style={{ fontSize: '19px', cursor: 'pointer' }}>
                        <input
                          type="radio"
                          value="Not sure"
                          name="radio3"
                          id="radio3"
                          style={{ visibility: 'hidden' }}
                          onChange={handleWhenPurchase}
                        />

                        <span>Not sure</span>
                      </label>
                    </li>
                  )}
                <p></p>
              </div>

              {whereInProcess !== null &&
                whereInProcess !== 'signedPurchaseContract' && (
                  <div className="homeValue">
                    <Heading
                      content={'Where are you looking?'}
                      fontWeight="bold"
                      {...title}
                    />
                    <Form.Item
                      name="zipCode"
                      /* label="Zip Code" */
                      onChange={handleChangeWhereLooking}
                      placeholder="Zip Code"
                      rules={[
                        /* {
                            required: true,
                            message: '*Required',
                          }, */
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
                        placeholder="Zip Code"
                      />
                    </Form.Item>
                  </div>
                )}

              {whereInProcess == 'signedPurchaseContract' && (
                <Heading
                  content={'Great!  What is the address of the property?'}
                  fontWeight="bold"
                  {...title}
                />
              )}

              {whereInProcess == 'signedPurchaseContract' && (
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
                    componentRestrictions={{ country: 'us' }}
                  />
                </Form.Item>
              )}

              {googleAddress !== null &&
                whereInProcess == 'signedPurchaseContract' && (
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

              {googleAddress !== null &&
                whereInProcess == 'signedPurchaseContract' && (
                  <Form.Item
                    name="addressUnitIdentifier"
                    label="Apartment, Suite, Unit"
                  >
                    <Input
                      autoComplete="new-password"
                      onChange={handleAddressUnitIdentifier}
                    />
                  </Form.Item>
                )}

              {googleAddress !== null &&
                whereInProcess == 'signedPurchaseContract' && (
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
              {googleAddress !== null &&
                whereInProcess == 'signedPurchaseContract' && (
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
              {googleAddress !== null &&
                whereInProcess == 'signedPurchaseContract' && (
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

              <Form.Item {...tailFormItemLayout}>
                <p></p>
                <p></p>
                <div className="containerClassBuyProcess">
                  <Button
                    type="primary"
                    title="Next"
                    htmlType="submit"
                    {...button}
                    onClick={onFinish}
                    disabled={
                      (whereInProcess !== 'signedPurchaseContract' &&
                        (!howCanHelp || !whenPurchase || !zipCode)) ||
                      (whereInProcess == 'signedPurchaseContract' &&
                        !googleAddress)
                    }
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

BuyProcess.propTypes = {
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

BuyProcess.defaultProps = {
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
    content: '',
    fontSize: '16px',
    fontWeight: '400',
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

const BuyProcessRedux = connect(
  mapStateToProps,
  mapDispatchToProps
)(BuyProcess);

export default BuyProcessRedux;
