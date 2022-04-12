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

const RefinanceReasons = ({
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

  /* const [state, setState] = useState({
    price: '',
    currency: 'usd',
    policy: 'oneTime',
  }); */

  const [refiReason, setRefiReason] = useState(null);
  const [closingCosts, setClosingCosts] = useState(null);

  /* const handleFormData = (value, name) => {
    setState({
      ...state,
      [name]: value,
    });
  }; */
  const handleChange = (e) => {
    console.log('radio checked', e.target.value);
    setRefiReason(e.target.value);
  };

  const handleClosingCostsChange = (e) => {
    console.log('radio checked', e.target.value);
    setClosingCosts(e.target.value);
  };

  const onFinish = async (value) => {
    console.log('onFinish values ', refiReason);

    localStorage.setItem('financingPurpose', JSON.stringify(refiReason));

    navigate('/propertyAddress/');
  };

  //   require('./reasons.module.css');//
  return (
    <SectionMainWrapper>
      <Box {...sectionWrapper}>
        <Container className="containerClassReasons">
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
                content={'Why do you want to refinance?'}
                fontWeight="bold"
                {...title}
              />

              <li>
                <span>
                  <label style={{ fontSize: '19px', cursor: 'pointer' }}>
                    <input
                      type="radio"
                      value="lowerPayment"
                      name="radio"
                      id="radio1"
                      style={{ visibility: 'hidden' }}
                      onChange={handleChange}
                    />
                    <span>Lower my monthly payment</span>
                  </label>
                </span>
              </li>
              <p></p>

              <li>
                <label style={{ fontSize: '19px', cursor: 'pointer' }}>
                  <input
                    type="radio"
                    value="cashOut"
                    name="radio"
                    id="radio2"
                    style={{ visibility: 'hidden' }}
                    onChange={handleChange}
                  />
                  <span>
                    Take cash out to pay for other expenses (home improvement,
                    emergency fund, college tuition)
                  </span>
                </label>
              </li>
              <p></p>

              <li>
                <label style={{ fontSize: '19px', cursor: 'pointer' }}>
                  <input
                    type="radio"
                    value="payOffSooner"
                    name="radio"
                    id="radio3"
                    style={{ visibility: 'hidden' }}
                    onChange={handleChange}
                  />

                  <span>Pay off my existing mortgage sooner</span>
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
                    value="consolidate"
                    name="radio"
                    id="radio4"
                    style={{ visibility: 'hidden' }}
                    onChange={handleChange}
                  />

                  <span>
                    Consolidate high-interest debts into a single payment
                  </span>
                </label>
              </li>
              <p></p>

              <li>
                <label style={{ fontSize: '19px', cursor: 'pointer' }}>
                  <input
                    type="radio"
                    value="5"
                    name="radio"
                    id="radio5"
                    style={{ visibility: 'hidden' }}
                    onChange={handleChange}
                  />
                  <span>Other</span>
                </label>
              </li>

              <p></p>
              {refiReason !== null && (
                <Heading
                  content={
                    'If eligible, would you be interested in paying little to no upfront closing costs?'
                  }
                  fontWeight="bold"
                  {...title}
                />
              )}
              {refiReason !== null && (
                <li>
                  <span>
                    <label style={{ fontSize: '19px', cursor: 'pointer' }}>
                      <input
                        type="radio"
                        value="yes"
                        name="radio2"
                        id="radio1"
                        style={{ visibility: 'hidden' }}
                        onChange={handleClosingCostsChange}
                      />
                      <span>Yes</span>
                    </label>
                  </span>
                </li>
              )}
              <p></p>
              {refiReason !== null && (
                <li>
                  <label style={{ fontSize: '19px', cursor: 'pointer' }}>
                    <input
                      type="radio"
                      value="no"
                      name="radio2"
                      id="radio2"
                      style={{ visibility: 'hidden' }}
                      onChange={handleClosingCostsChange}
                    />
                    <span>No</span>
                  </label>
                </li>
              )}
              <p></p>
              {refiReason !== null && (
                <li>
                  <label style={{ fontSize: '19px', cursor: 'pointer' }}>
                    <input
                      type="radio"
                      value="decideLater"
                      name="radio2"
                      id="radio3"
                      style={{ visibility: 'hidden' }}
                      onChange={handleClosingCostsChange}
                    />

                    <span>I'll decide later</span>
                  </label>
                </li>
              )}
              <p></p>
              <Form.Item {...tailFormItemLayout}>
                <p></p>
                <p></p>
                <Button
                  type="primary"
                  title="Next"
                  htmlType="submit"
                  {...button}
                  onClick={onFinish}
                  disabled={!refiReason || !closingCosts}
                ></Button>
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

RefinanceReasons.propTypes = {
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

RefinanceReasons.defaultProps = {
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

const RefinanceReasonsRedux = connect(
  mapStateToProps,
  mapDispatchToProps
)(RefinanceReasons);

export default RefinanceReasonsRedux;
