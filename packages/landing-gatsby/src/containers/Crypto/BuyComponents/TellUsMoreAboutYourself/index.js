import React, { useEffect, useState } from 'react';
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
import { updateUserInfo } from '../../../../actions';
import Cleave from 'cleave.js/react';
import "cleave.js/dist/addons/cleave-phone.us";
// import styles from "./reasons.module.css"
import './reason.css';
//import { Radio } from 'antd';
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

const TellUsMore = ({
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

  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [mobilePhone, setMobilePhone] = useState(null);
  const [googleAddress, setGoogleAddress] = useState(null);
  const [propertyAddress, setPropertyAddress] = useState(null);
  const [state, setState] = useState(null);
  const [city, setCity] = useState(null);
  const [zipCode, setZipCode] = useState(null);

  const handleChangeFirstName = (e) => {
    console.log('residence radio checked', e.target.value);
	console.log("currentUser", currentUser)
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

  const onFinish = async () => {
	  Object.assign(
		 currentUser,
		{
			borrower: {
				firstName: firstName,
				lastName: lastName,
				contactPointTelephoneValue: mobilePhone,
				contactPointRoleType: "Mobile",
				addressLineText: propertyAddress,
				cityName: city,
				stateCode: state,
				postalCode: zipCode,
			}
		}
	  )

    console.log('onFinish values ', currentUser);
    updateUserInfo(currentUser, userToken);
    navigate('/creditIncomeAssets');
  };
  useEffect(() => {
	  console.log("currentUser", currentUser)
    // make api call first time u come to the page or do a browser reload
  }, [currentUser]);

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

                 
                <Heading
                  content={'Current address'}
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
					  !propertyAddress || 
					  !state ||
					  !city ||
					  !zipCode
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

TellUsMore.propTypes = {
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

TellUsMore.defaultProps = {
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
  currentUser: state.root.currentUser?.user,
  userToken: state.root.currentUser?.token,
});

const mapDispatchToProps = (dispatch) => {
  return {
    updateUserInfo: (currentUser, userToken) =>
      dispatch(updateUserInfo(currentUser, userToken)),
  };
};

const TellUsMoreRedux = connect(
  mapStateToProps,
  mapDispatchToProps
)(TellUsMore);

export default TellUsMoreRedux;
