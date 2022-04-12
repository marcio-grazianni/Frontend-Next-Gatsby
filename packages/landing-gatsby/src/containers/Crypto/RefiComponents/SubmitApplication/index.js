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
  Radio,
} from 'antd';
import SectionWrapper, {
  ButtonGroup,
  PricingArea,
  InnerWrapper,
  PricingCard,
} from './pricingPolicy.style';
import ContactFromWrapper, { SectionMainWrapper } from '../../contact.style';
import PropTypes from 'prop-types';
import Box from 'common/src/components/Box';
import Text from 'common/src/components/Text';
import Heading from 'common/src/components/Heading';
import Container from 'common/src/components/UI/Container';
import FeatureBlock from 'common/src/components/FeatureBlock';
import { updateUserInfo } from '../../../../actions';

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

const SubmitApplicationSection = ({
  sectionWrapper,
  row,
  contactForm,
  secTitleWrapper,
  button,
  note,
  title,
  description,
  description2,
  currentUser,
  updateUserInfo,
  userToken,
  showLoader,
  hideLoader,
  loading,
}) => {
  const [form] = Form.useForm();
  const [socialSecurityNumberConfirm, setSocialSecurityNumberConfirm] =
    useState(false);

  const handleSocialSecurityNumberConfirm = (e) => {
    setSocialSecurityNumberConfirm(e.target.checked);
  };

  const onFinish = async (values) => {
    values['applicationStep'] = '/moreUserInfo/';

    currentUser.socialSecurityNumber = values.socialSecurityNumber;
    currentUser.socialSecurityNumberVerify = values.socialSecurityNumberVerify;

    console.log('onFinish values ', values);

    userToken = JSON.parse(localStorage.getItem('jwt'));

    currentUser.applicationStep = '/refi-pages/submitSuccess/';
    console.log('currentUser with ownership updates', currentUser);

    //showLoader();
    updateUserInfo(currentUser, userToken);

    //hideLoader();
    //go to sign docs page, or a page saying we will send them shortly

    navigate('/refi-pages/submitSuccess/');
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
            <FeatureBlock
              title={<Heading {...title} />}
              description={<Text {...description2} />}
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
                  style={{ width: '100%' }}
                >
                  <PricingCard>
                    <Heading as="h3" content={'Submit your application'} />
                    <Text
                      content={
                        'Provide us your hard credit consent to submit your application.  Once submitted, you will be able to sign your intial disclosures and lock your rate.  After your rate is locked, you will have a few action times before we start processing your application.'
                      }
                    />

                    <Form.Item
                      name="socialSecurityNumber"
                      label="Social security number"
                      rules={[
                        {
                          required: true,
                          min: 11,
                          message: '*Required',
                        },
                      ]}
                    >
                      <Cleave
                        className="ant-input"
                        options={{
                          delimiters: ['-', '-'],
                          numericOnly: true,
                          uppercase: true,
                          blocks: [3, 2, 4],
                        }}
                      />
                    </Form.Item>

                    <Form.Item
                      name="socialSecurityNumberVerify"
                      valuePropName="checked"
                      rules={[
                        {
                          required: true,
                          message: '*Required',
                        },
                      ]}
                    >
                      <Checkbox
                        checked={socialSecurityNumberConfirm}
                        onChange={handleSocialSecurityNumberConfirm}
                      >
                        Please confirm that you entered your SSN correctly
                      </Checkbox>
                    </Form.Item>

                    <Text
                      fontSize="12px"
                      content={
                        'By pressing "Submit", you authorize Harris to obtain your consumer credit report in order to evaluate your application and Harris account.  This hard credit pull may affect your credit score.'
                      }
                    />
                  </PricingCard>

                  <Form.Item /* {...tailFormItemLayout} */>
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

SubmitApplicationSection.propTypes = {
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

SubmitApplicationSection.defaultProps = {
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
    content:
      'Next, submit your application so you can sign your disclosures and lock your rate!',
    fontSize: '20px',
    fontWeight: '700',
    color: '#525f7f',
    lineHeight: '28px',
    mb: ['25px', '25px', '30px', '30px', '45px'],
    textAlign: ['center', 'center'],
  },

  description2: {
    content:
      'Rates can adjust quickly with the market and are subject to change prior to locking your rate.',
    fontSize: '14px',
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

const SubmitApplicationSectionRedux = connect(
  mapStateToProps,
  mapDispatchToProps
)(SubmitApplicationSection);

export default SubmitApplicationSectionRedux;
