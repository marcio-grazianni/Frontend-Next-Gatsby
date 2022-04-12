import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import 'cleave.js/dist/addons/cleave-phone.us';
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
} from 'antd';
import ContactFromWrapper, { SectionMainWrapper } from '../contact.style';
import PropTypes from 'prop-types';
import Box from 'common/src/components/Box';
import Text from 'common/src/components/Text';
import Heading from 'common/src/components/Heading';
import Container from 'common/src/components/UI/Container';
import FeatureBlock from 'common/src/components/FeatureBlock';
import FullPageLoader from '../FullPageLoader/FullPageLoader';
import { loginUser, showLoader, hideLoader } from '../../../actions';

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

const LoginSection = ({
  sectionWrapper,
  row,
  contactForm,
  secTitleWrapper,
  button,
  note,
  title,
  description,
  loginUser,
  showLoader,
  hideLoader,
  loading,
  loggedIn,
  loginFail,
  currentUser,
}) => {
  const [form] = Form.useForm();
  const [loginResponse, setLoginResponse] = useState(null);

  const onFinish = async (values) => {
    console.log('onFinish values ', values);

    showLoader();
    //setFormSubmitted(true);
    await loginUser(values);
    hideLoader();
    setLoginResponse('Invalid username or password');
  };

  //run after every response (if action didnt route to dashboard, this runs)

  //upon first load or new refresh
  useEffect(() => {
    //setFirstRender(false);
  }, []);

  return (
    <SectionMainWrapper>
      {loading ? (
        <FullPageLoader />
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
                    <Text content={loginResponse} fontWeight="bold"></Text>
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
                      label="Password"
                      rules={[
                        {
                          required: true,
                          message: 'Please input your password',
                        },
                      ]}
                      hasFeedback
                    >
                      <Input.Password />
                    </Form.Item>

                    <Form.Item {...tailFormItemLayout}>
                      <Button
                        //type="primary"
                        htmlType="submit"
                        color="white"
                        //onClick={blank()}
                        title="Login"
                        {...button}
                      >
                        Login
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

LoginSection.propTypes = {
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

LoginSection.defaultProps = {
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
    content: 'Login',
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

/* 
const mapStateToProps = (state) => ({
  currentUser: state.root.currentUser,
  loading,
}); */

const mapStateToProps = ({
  root: { currrentUser, loading, loggedIn, loginFail },
}) => ({
  currrentUser,
  loading,
  loggedIn,
  loginFail,
});

const mapDispatchToProps = (dispatch) => {
  return {
    loginUser: (formVals) => dispatch(loginUser(formVals)),
    showLoader: () => dispatch(showLoader()),
    hideLoader: () => dispatch(hideLoader()),
  };
};

const LoginSectionRedux = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginSection);

export default LoginSectionRedux;
