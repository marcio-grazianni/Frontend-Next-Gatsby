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
  Radio,
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
import Pdf from '../../../../documents/termsOfService.pdf';
import PdfElectronicCommunicationPolicy from '../../../../documents/electronicCommunicationsPolicy.pdf';

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

const RefiApplicationForm2Section = ({
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

  const onFinish = async (values) => {
    console.log('onFinish values ', values);

    userToken = JSON.parse(localStorage.getItem('jwt'));

    console.log('currentUser with updates', currentUser);

    //showLoader();
    updateUserInfo(currentUser, userToken);

    //show loader until backend finishes prequal offer
    //send a request to get the prequal offer rate, keep checking until exists

    navigate('/refi-pages/selectOfferRefiRateTerm/');
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
                  <Text content={'Personal information'} fontWeight="bold" />
                  <Form.Item
                    name="firstName"
                    label="Legal first name"
                    rules={[
                      {
                        required: true,
                        message: '*Required',
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    name="lastName"
                    label="Legal last name"
                    rules={[
                      {
                        required: true,
                        message: '*Required',
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item name="suffix" label="Suffix">
                    <Select placeholder="Select" allowClear>
					<Option value=""></Option>
                      <Option value="JR">Jr</Option>
                      <Option value="SR">Sr</Option>
                      <Option value="I">I</Option>
                      <Option value="II">II</Option>
                      <Option value="III">III</Option>
                      <Option value="IV">IV</Option>
                    </Select>
                  </Form.Item>

                  <Form.Item
                    name="dateOfBirth"
                    label="Date of birth"
                    rules={[
                      {
                        required: true,
                        message: '*Required',
                      },
                    ]}
                  >
                    <Cleave
                      className="ant-input"
                      placeholder="01/01/1968"
                      options={{ date: true, datePattern: ['m', 'd', 'Y'] }}
                    />
                  </Form.Item>

                  <Form.Item
                    name="phoneNumber"
                    label="Phone number"
                    rules={[
                      {
                        required: true,
                        message: '*Required',
                      },
                      {
                        min: 12,
                        message: '*Must be 10 digits',
                      },
                    ]}
                  >
                    <Cleave
                      className="ant-input"
                      placeholder="888 888 8888"
                      options={{ phone: true, phoneRegionCode: 'US' }}
                    />
                  </Form.Item>

                  <Form.Item
                    name="agreement"
                    valuePropName="checked"
                    rules={[
                      {
                        validator: (_, value) =>
                          value
                            ? Promise.resolve()
                            : Promise.reject('Should accept agreement'),
                      },
                    ]}
                    {...tailFormItemLayout}
                  >
                    <Checkbox>
                      I agree to the{' '}
                      <a href={Pdf} target="_blank">
                        terms of service.
                      </a>
                    </Checkbox>
                  </Form.Item>
                  <Form.Item
                    name="electronicPolicy"
                    valuePropName="checked"
                    rules={[
                      {
                        validator: (_, value) =>
                          value
                            ? Promise.resolve()
                            : Promise.reject('Should accept agreement'),
                      },
                    ]}
                    {...tailFormItemLayout}
                  >
                    <Checkbox>
                      I agree to the{' '}
                      <a
                        href={PdfElectronicCommunicationPolicy}
                        target="_blank"
                      >
                        electronic communications policy.
                      </a>
                    </Checkbox>
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

RefiApplicationForm2Section.propTypes = {
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

RefiApplicationForm2Section.defaultProps = {
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
    content: 'Tell us about yourself',
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
      'We will use this information so we can provide you with real, accurate loan options.',
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

const RefiApplicationForm2SectionRedux = connect(
  mapStateToProps,
  mapDispatchToProps
)(RefiApplicationForm2Section);

export default RefiApplicationForm2SectionRedux;
