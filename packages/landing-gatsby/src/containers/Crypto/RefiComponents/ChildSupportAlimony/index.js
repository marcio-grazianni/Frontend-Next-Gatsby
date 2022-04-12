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
} from 'antd';
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

const ChildSupportAlimonySection = ({
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
  const [showChildSupportTextBox, setShowChildSupportTextBox] = useState(false);
  const [showAlimonyTextBox, setShowAlimonyTextBox] = useState(false);
  const [
    showSeperateMaintenaceTextBox,
    setSeperateMaintenaceTextBox,
  ] = useState(false);

  const handleChildSupportchange = (e) => {
    setShowChildSupportTextBox(e.target.checked);
  };

  const handleAlimonyChange = (e) => {
    setShowAlimonyTextBox(e.target.checked);
  };

  const handleMaintenanceChange = (e) => {
    setSeperateMaintenaceTextBox(e.target.checked);
  };

  const onFinish = async (values) => {
    console.log('onFinish values ', values);

    userToken = JSON.parse(localStorage.getItem('jwt'));

    currentUser.alimony = values.alimony;
    currentUser.alimonyDateOfBirthOfDependant =
      values.alimonyDateOfBirthOfDependant;
    currentUser.alimonyStartOfPayment = values.alimonyStartOfPayment;
    currentUser.childSupport = values.childSupport;
    currentUser.childSupportDateOfBirthOfDependant =
      values.childSupportDateOfBirthOfDependant;
    currentUser.childSupportMonthlyPaymentAmount =
      values.childSupportMonthlyPaymentAmount;
    currentUser.childSupportStartOfPayment = values.childSupportStartOfPayment;
    currentUser.seperateMaintenance = values.seperateMaintenance;
    currentUser.seperateMaintenanceAmount = values.seperateMaintenanceAmount;
    currentUser.seperateMaintenanceDateOfBirthOfDependant =
      values.seperateMaintenanceDateOfBirthOfDependant;
    currentUser.seperateMaintenanceStartOfPayment =
      values.seperateMaintenanceStartOfPayment;

    //showLoader();
    updateUserInfo(currentUser, userToken);

    //hideLoader();
    if (currentUser.incomeAdditionalIncome) {
      currentUser.applicationStep =
        '/refi-pages/interestDividendsHousingGovernmentTrustOther/';
      navigate('/refi-pages/interestDividendsHousingGovernmentTrustOther/');
    } else {
      navigate('/refi-pages/howLongCurrentAddress/');
    }
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
                  <Text
                    content={'Which of the following apply to you?'}
                    fontWeight="bold"
                  />

                  <Form.Item
                    name="childSupport"
                    valuePropName="checked"
                    initialValue={false}
                  >
                    <Checkbox
                      checked={showChildSupportTextBox}
                      onChange={handleChildSupportchange}
                    >
                      Child support
                    </Checkbox>
                  </Form.Item>

                  {showChildSupportTextBox && (
                    <Form.Item
                      name="childSupportStartOfPayment"
                      label="Start Date of payments"
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
                  )}

                  {showChildSupportTextBox && (
                    <Form.Item
                      name="childSupportDateOfBirthOfDependant"
                      label="Date of Birth of dependent(s)"
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
                  )}

                  {showChildSupportTextBox && (
                    <Form.Item
                      name="childSupportMonthlyPaymentAmount"
                      label="Monthly payment amount"
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
                  )}

                  <Form.Item
                    name="alimony"
                    valuePropName="checked"
                    initialValue={false}
                  >
                    <Checkbox
                      checked={showAlimonyTextBox}
                      onChange={handleAlimonyChange}
                    >
                      Alimony
                    </Checkbox>
                  </Form.Item>

                  {showAlimonyTextBox && (
                    <Form.Item
                      name="alimonyStartOfPayment"
                      label="Start Date of payments"
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
                  )}

                  {showAlimonyTextBox && (
                    <Form.Item
                      name="alimonyDateOfBirthOfDependant"
                      label="Date of Birth of dependent(s)"
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
                  )}

                  {showAlimonyTextBox && (
                    <Form.Item
                      name="alimony"
                      label="Monthly payment amount"
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
                  )}

                  <Form.Item
                    name="seperateMaintenance"
                    valuePropName="checked"
                    initialValue={false}
                  >
                    <Checkbox
                      checked={showSeperateMaintenaceTextBox}
                      onChange={handleMaintenanceChange}
                    >
                      Seperate Maintenance
                    </Checkbox>
                  </Form.Item>

                  {showSeperateMaintenaceTextBox && (
                    <Form.Item
                      name="seperateMaintenanceStartOfPayment"
                      label="Start Date of payments"
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
                  )}

                  {showSeperateMaintenaceTextBox && (
                    <Form.Item
                      name="seperateMaintenanceDateOfBirthOfDependant"
                      label="Date of Birth of dependent(s)"
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
                  )}

                  {showSeperateMaintenaceTextBox && (
                    <Form.Item
                      name="seperateMaintenanceAmount"
                      label="Monthly payment amount"
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
                  )}

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

ChildSupportAlimonySection.propTypes = {
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

ChildSupportAlimonySection.defaultProps = {
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
    content: 'Tell us about your child support or alimony',
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

const ChildSupportAlimonySectionRedux = connect(
  mapStateToProps,
  mapDispatchToProps
)(ChildSupportAlimonySection);

export default ChildSupportAlimonySectionRedux;
