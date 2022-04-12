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

const AddRealEstateAgentComponent = ({
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

  const [haveAgent, setHaveAgent] = useState(false);
  const [RealEstateAgentFirstName, setRealEstateAgentFirstName] = useState(null);
  const [RealEstateAgentLastName, setRealEstateAgentLastName] = useState(null);
  const [RealEstateAgentContactPointTelephoneValue, setRealEstateAgentContactPointTelephoneValue] = useState(null);
  const [RealEstateAgentEmail, setRealEstateAgentEmail] = useState(null);

  const handleHaveAgent = (e) => {
    console.log('have Agent', e.target.value);
    setHaveAgent(e.target.value);
  };

  const handleChangeFirstName = (e) => {
    console.log('residence radio checked', e.target.value);
    setRealEstateAgentFirstName(e.target.value);
  };

  const handleChangeLastName = (e) => {
    console.log('property radio checked', e.target.value);
    setRealEstateAgentLastName(e.target.value);
  };

  const handleChangeMobilePhone = (e) => {
    console.log('Value', e.target.value);
    setRealEstateAgentContactPointTelephoneValue(e.target.value);
  };

  const handleChangeEmail = (e) => {
    console.log('Value', e.target.value);
    setRealEstateAgentEmail(e.target.value);
  };

  const onFinish = async (value) => {
    if(haveAgent == "true") {
		localStorage.setItem('RealEstateAgentFirstName', JSON.stringify(RealEstateAgentFirstName));
		localStorage.setItem('RealEstateAgentLastName', JSON.stringify(RealEstateAgentLastName));
		localStorage.setItem('RealEstateAgentEmail', JSON.stringify(RealEstateAgentEmail));
		localStorage.setItem('RealEstateAgentContactPointTelephoneValue', JSON.stringify(RealEstateAgentContactPointTelephoneValue));
	}
   
    navigate('/buy-pages/buyEmail/');
  };

  React.useEffect(() => {
    setHaveAgent(haveAgent);
    console.log(haveAgent);
  }, [haveAgent]);
  //   require('./reasons.module.css');//
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
                content={'Do you already have a real estate agent?'}
                fontWeight="bold"
                {...title}
              />

              <div className="containerClassReasons">
                <li>
                  <span>
                    <label style={{ fontSize: '19px', cursor: 'pointer' }}>
                      <input
                        type="radio"
                        value="true"
                        name="radio"
                        id="radio1"
                        style={{ visibility: 'hidden' }}
                        onChange={handleHaveAgent}
                      />
                      <span>Yes</span>
                    </label>
                  </span>
                </li>
                <p></p>

                <li>
                  <label style={{ fontSize: '19px', cursor: 'pointer' }}>
                    <input
                      type="radio"
                      value="false"
                      name="radio"
                      id="radio2"
                      style={{ visibility: 'hidden' }}
                      onChange={handleHaveAgent}
                    />
                    <span>No</span>
                  </label>
                </li>
                <p></p>
              </div>

              {haveAgent == "true" && (
                <div className="homeValue">
                  <Heading
                    content={"Great, let's add their contact info here"}
                    fontWeight="bold"
                    {...title}
                  />
                  <Heading
                    content={"Great, let's add their contact info here"}
                    fontWeight="bold"
                    {...description}
                  />

                  <Form.Item
                    name="RealEstateAgentFirstName"
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
                    name="RealEstateAgentLastName"
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

                  <Form.Item
                    name="email"
                    label="E-mail"
					onChange={handleChangeEmail}
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
                </div>
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
                    disabled={!haveAgent}
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

AddRealEstateAgentComponent.propTypes = {
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

AddRealEstateAgentComponent.defaultProps = {
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
    content:
      'Adding your realtors contact details is a great way to make sure they stay informed on your application status',
    fontSize: '16px',
    fontWeight: '400',
    color: '#525f7f',
    lineHeight: '28px',
    mb: ['25px', '25px', '30px', '30px', '45px'],
    /* textAlign: ['center', 'center'], */
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

const AddRealEstateAgentComponentRedux = connect(
  mapStateToProps,
  mapDispatchToProps
)(AddRealEstateAgentComponent);

export default AddRealEstateAgentComponentRedux;
