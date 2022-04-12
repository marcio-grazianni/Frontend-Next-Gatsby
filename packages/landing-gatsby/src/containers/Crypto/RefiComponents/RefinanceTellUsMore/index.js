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
  const [form] = Form.useForm();

  const [primaryResidence, setPrimaryResidence] = useState(null);
  const [propertyType, setPropertyType] = useState(null);
  const [statedPropertyValue, setStatedPropertyValue] = useState(null);

  const handleChangePrimaryResidence = (e) => {
    console.log('residence radio checked', e.target.value);
    setPrimaryResidence(e.target.value);
  };

  const handleChangePropertyType = (e) => {
    console.log('property radio checked', e.target.value);
    setPropertyType(e.target.value);
  };

  const handleChangeStatedPropertyValue = (e) => {
    console.log('statedPropertyValue', e.target.value);
    setStatedPropertyValue(e.target.value);
  };

  const onFinish = async (values) => {
    console.log(
      'onFinish values ',
      primaryResidence,
      propertyType,
      statedPropertyValue
    );
    localStorage.setItem('primaryResidence', JSON.stringify(primaryResidence));
    localStorage.setItem('propertyType', JSON.stringify(propertyType));
    localStorage.setItem(
      'statedPropertyValue',
      JSON.stringify(statedPropertyValue)
    );
    navigate('/email/');
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
                content={'Tell us more about the property you are refinancing'}
                fontWeight="bold"
                {...title}
              />

              <div className="containerClassReasons">
                <li>
                  <span>
                    <label style={{ fontSize: '19px', cursor: 'pointer' }}>
                      <input
                        type="radio"
                        value="primaryResidence"
                        name="radio"
                        id="radio1"
                        style={{ visibility: 'hidden' }}
                        onChange={handleChangePrimaryResidence}
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
                      value="secondHome"
                      name="radio"
                      id="radio2"
                      style={{ visibility: 'hidden' }}
                      onChange={handleChangePrimaryResidence}
                    />
                    <span>Second home</span>
                  </label>
                </li>
                <p></p>

                <li>
                  <label style={{ fontSize: '19px', cursor: 'pointer' }}>
                    <input
                      type="radio"
                      value="investment"
                      name="radio"
                      id="radio3"
                      style={{ visibility: 'hidden' }}
                      onChange={handleChangePrimaryResidence}
                    />

                    <span>Investment</span>
                  </label>
                </li>
                <p></p>
                <Heading
                  content={'What type of property would this be?'}
                  fontWeight="bold"
                  {...title}
                />

                <li>
                  <span>
                    <label style={{ fontSize: '19px', cursor: 'pointer' }}>
                      <input
                        type="radio"
                        value="singleFamily"
                        name="radioPropertyType"
                        id="radio1"
                        style={{ visibility: 'hidden' }}
                        onChange={handleChangePropertyType}
                      />
                      <span>Single Family</span>
                    </label>
                  </span>
                </li>
                <p></p>

                <li>
                  <label style={{ fontSize: '19px', cursor: 'pointer' }}>
                    <input
                      type="radio"
                      value="townhouseCondo"
                      name="radioPropertyType"
                      id="radio2"
                      style={{ visibility: 'hidden' }}
                      onChange={handleChangePropertyType}
                    />
                    <span>Townhouse or Condo</span>
                  </label>
                </li>
                <p></p>

                <li>
                  <label style={{ fontSize: '19px', cursor: 'pointer' }}>
                    <input
                      type="radio"
                      value="2to4Units"
                      name="radioPropertyType"
                      id="radio3"
                      style={{ visibility: 'hidden' }}
                      onChange={handleChangePropertyType}
                    />

                    <span>2 to 4 units</span>
                  </label>
                </li>
              </div>
              <p></p>

              <Heading
                content={'Estimated home value'}
                fontWeight="bold"
                {...title}
              />

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
                      !propertyType || !primaryResidence || !statedPropertyValue
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

const RefinanceTellUsMoreRedux = connect(
  mapStateToProps,
  mapDispatchToProps
)(RefinanceTellUsMore);

export default RefinanceTellUsMoreRedux;
