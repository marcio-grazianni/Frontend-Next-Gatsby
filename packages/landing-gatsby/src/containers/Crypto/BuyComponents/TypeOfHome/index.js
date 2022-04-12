import React, { useState } from 'react';
import { connect } from 'react-redux';
import { navigate } from 'gatsby';
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

const TypeOfHome = ({
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

  /* const [state, setState] = useState({
    price: '',
    currency: 'usd',
    policy: 'oneTime',
  }); */

  const [primaryResidence, setPrimaryResidence] = useState(null);
  const [propertyType, setPropertyType] = useState(null);
  const [propertyUsageType, setPropertyUsageType] = useState(null);


  /* const handleFormData = (value, name) => {
    setState({
      ...state,
      [name]: value,
    });
  }; */
  const handlePropertyUsageType = (e) => {
    console.log('radio checked', e.target.value);
    setPropertyUsageType(e.target.value);
  };

  const handlePropertyType = (e) => {
    console.log('radio checked', e.target.value);
    setPropertyType(e.target.value);
  };

/*   const handleChangeStatedPropertyValue = (e) => {
	
    console.log('statedPropertyValue', e.target.value);
    setStatedPropertyValue(e.target.value);
	
  }; */

  const onFinish = async (value) => {
    localStorage.setItem('propertyUsageType', JSON.stringify(propertyUsageType));
    localStorage.setItem('propertyType', JSON.stringify(propertyType));
	
	/* //change property value from string to int
	var statedPropertyValueToConvert = statedPropertyValue
	var statedPropertyValueToConvert = statedPropertyValueToConvert.replace(
		/,/g,
		''
	  );
	statedPropertyValueToConvert = Number(statedPropertyValueToConvert);
	console.log('statedPropertyValue after convert', statedPropertyValueToConvert);
	localStorage.setItem('statedPropertyValue', JSON.stringify(statedPropertyValueToConvert)); */

    navigate('/buy-pages/addRealEstateAgent/');
  };

  //   require('./reasons.module.css');//
  return (
    <SectionMainWrapper>
      <Box {...sectionWrapper}>
        <Container /* className="containerClassReasons" */>
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
                content={'Tell us more about the property you are purchasing'}
                fontWeight="bold"
                {...title}
              />
		 <div className="containerClassReasons">
              <li>
                <span>
                  <label style={{ fontSize: '19px', cursor: 'pointer' }}>
                    <input
                      type="radio"
                      value="PrimaryResidence"
                      name="propertyUsageType"
                      id="radio1"
                      style={{ visibility: 'hidden' }}
                      onChange={handlePropertyUsageType}
                    />
                    <span>Primary residence</span>
                  </label>
                </span>
              </li>
              <p></p>

              <li>
                <label style={{ fontSize: '19px', cursor: 'pointer' }}>
                  <input
                    type="radio"
                    value="SecondHome"
                    name="propertyUsageType"
                    id="radio2"
                    style={{ visibility: 'hidden' }}
                    onChange={handlePropertyUsageType}
                  />
                  <span>Second home</span>
                </label>
              </li>
              <p></p>

              <li>
                <label style={{ fontSize: '19px', cursor: 'pointer' }}>
                  <input
                    type="radio"
                    value="Investment"
                    name="propertyUsageType"
                    id="radio3"
                    style={{ visibility: 'hidden' }}
                    onChange={handlePropertyUsageType}
                  />

                  <span>Investment</span>
                </label>
              </li>

              <p></p>

              <p></p>
              <Heading
                content={'What property type would this be?'}
                fontWeight="bold"
                {...title}
              />
              <li>
                <span>
                  <label style={{ fontSize: '19px', cursor: 'pointer' }}>
                    <input
                      type="radio"
                      value="SingleFamily"
                      name="propertyType"
                      id="radio1"
                      style={{ visibility: 'hidden' }}
                      onChange={handlePropertyType}
                    />
                    <span>Single family</span>
                  </label>
                </span>
              </li>

              <p></p>
			  

              <li>
                <label style={{ fontSize: '19px', cursor: 'pointer' }}>
                  <input
                    type="radio"
                    value="TownhouseOrCondo"
                    name="propertyType"
                    id="radio2"
                    style={{ visibility: 'hidden' }}
                    onChange={handlePropertyType}
                  />
                  <span>Townhouse or Condo</span>
                </label>
              </li>

              <p></p>
              <li>
                <label style={{ fontSize: '19px', cursor: 'pointer' }}>
                  <input
                    type="radio"
                    value="2Units"
                    name="propertyType"
                    id="radio3"
                    style={{ visibility: 'hidden' }}
                    onChange={handlePropertyType}
                  />

                  <span>2 units</span>
                </label>
              </li>

			  <p></p>
              <li>
                <label style={{ fontSize: '19px', cursor: 'pointer' }}>
                  <input
                    type="radio"
                    value="3to4Units"
                    name="propertyType"
                    id="radio3"
                    style={{ visibility: 'hidden' }}
                    onChange={handlePropertyType}
                  />

                  <span>3 to 4 units</span>
                </label>
              </li>
			  </div>
			  <p></p>
{/* 			  <Heading
                content={'Estimated home value'}
                fontWeight="bold"
                {...title}
              />
              <p></p>
			  <div className="homeValue">
                <Form.Item
                  name="statedPropertyValue"
                  label=""
                  onChange={handleChangeStatedPropertyValue}
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
              </div> */}
              <p></p>
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
                  disabled={!propertyType || !propertyUsageType /*||  !statedPropertyValue */}
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

TypeOfHome.propTypes = {
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

TypeOfHome.defaultProps = {
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

const mapStateToProps = ({ root: { currentUser } }) => ({
	currentUser: currentUser?.user,
	userToken: currentUser?.token,
  });

const mapDispatchToProps = (dispatch) => {
  return {
    updateUserInfo: (currentUser, userToken) =>
      dispatch(updateUserInfo(currentUser, userToken)),
  };
};

const TypeOfHomeRedux = connect(
  mapStateToProps,
  mapDispatchToProps
)(TypeOfHome);

export default TypeOfHomeRedux;
