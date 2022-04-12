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

const RetirementIncomeSection = ({
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
  const [showPensionAmountBox, setShowPensionAmountBox] = useState(false);
  const [show401KAmountBox, setShow401KAmountBox] = useState(false);
  const [showIRAAmountBox, setShowIRAAmountBox] = useState(false);
  const [showKeoghAmountBox, setShowKeoghAmountBox] = useState(false);

  const handlePensionChange = (e) => {
    setShowPensionAmountBox(e.target.checked);
    console.log('showPensionAmountBox', showPensionAmountBox);
  };
  const handle401KChange = (e) => {
    setShow401KAmountBox(e.target.checked);
    console.log('show401KAmountBox', show401KAmountBox);
  };
  const handleIRAChange = (e) => {
    setShowIRAAmountBox(e.target.checked);
    console.log('showIRAAmountBox', showIRAAmountBox);
  };
  const handleKeoghChange = (e) => {
    setShowKeoghAmountBox(e.target.checked);
    console.log('showKeoghAmountBox', showKeoghAmountBox);
  };

  const onFinish = async (values) => {
    console.log('onFinish values ', values);
    userToken = JSON.parse(localStorage.getItem('jwt'));
    currentUser.retirementIncomePensionAnnuities =
      values.retirementIncomePensionAnnuities;
    currentUser.retirementIncomePensionAnnuitiesMonthlyAmount =
      values.retirementIncomePensionAnnuitiesMonthlyAmount;
    currentUser.retirementIncome401k = values.retirementIncome401k;
    currentUser.retirementIncome401kMonthlyAmount =
      values.retirementIncome401kMonthlyAmount;
    currentUser.retirementIncomeIRAAccount = values.retirementIncomeIRAAccount;
    currentUser.retirementIncomeIRAAccountMonthlyAmount =
      values.retirementIncomeIRAAccountMonthlyAmount;
    currentUser.retirementIncomeKeogh = values.retirementIncomeKeogh;
    currentUser.retirementIncomeKeoghMonthlyAmount =
      values.retirementIncomeKeoghMonthlyAmount;

    //showLoader();

    //hideLoader();

    if (currentUser.incomeRentalIncome) {
      currentUser.applicationStep = '/refi-pages/rentalProperty/';
      updateUserInfo(currentUser, userToken);
      navigate('/refi-pages/rentalProperty/');
    } else if (currentUser.incomeChildSupportAlimonyMaintenanceIncome) {
      currentUser.applicationStep = '/refi-pages/childSupportAlimony/';
      updateUserInfo(currentUser, userToken);
      navigate('/refi-pages/childSupportAlimony/');
    } else if (currentUser.incomeAdditionalIncome) {
      currentUser.applicationStep =
        '/refi-pages/interestDividendsHousingGovernmentTrustOther/';
      updateUserInfo(currentUser, userToken);
      navigate('/refi-pages/interestDividendsHousingGovernmentTrustOther/');
    } else {
      console.log('in else, how long address');
      currentUser.applicationStep = '/refi-pages/howLongCurrentAddress/';
      updateUserInfo(currentUser, userToken);
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
                    content={'Which of the following income do you have?'}
                    fontWeight="bold"
                  />

                  <Form.Item
                    name="retirementIncomePensionAnnuities"
                    valuePropName="checked"
                    initialValue={false}
                    /* rules={[
                        {
                          validator: (_, value) =>
                            value
                              ? Promise.resolve()
                              : Promise.reject('Should accept agreement'),
                        },
                      ]} */
                  >
                    <Checkbox
                      checked={showPensionAmountBox}
                      onChange={handlePensionChange}
                    >
                      I have retirement pensions and/or annuities.
                    </Checkbox>
                  </Form.Item>

                  {showPensionAmountBox && (
                    <Form.Item
                      name="retirementIncomePensionAnnuitiesMonthlyAmount"
                      label="Monthly pension/retirement income"
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
                    name="retirementIncome401k"
                    valuePropName="checked"
                    initialValue={false}
                    /* rules={[
                        {
                          validator: (_, value) =>
                            value
                              ? Promise.resolve()
                              : Promise.reject('Should accept agreement'),
                        },
                      ]} */
                  >
                    <Checkbox
                      checked={show401KAmountBox}
                      onChange={handle401KChange}
                    >
                      I have a 401(k) account and I'm receiving monthly income
                      from it.
                    </Checkbox>
                  </Form.Item>

                  {show401KAmountBox && (
                    <Form.Item
                      name="retirementIncome401kMonthlyAmount"
                      label="Monthly disbursement from your 401(k) account"
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
                    name="retirementIncomeIRAAccount"
                    valuePropName="checked"
                    initialValue={false}
                    /* rules={[
                        {
                          validator: (_, value) =>
                            value
                              ? Promise.resolve()
                              : Promise.reject('Should accept agreement'),
                        },
                      ]} */
                  >
                    <Checkbox
                      checked={showIRAAmountBox}
                      onChange={handleIRAChange}
                    >
                      I have an IRA account and I'm receiving monthly income
                      from it.
                    </Checkbox>
                  </Form.Item>

                  {showIRAAmountBox && (
                    <Form.Item
                      name="retirementIncomeIRAAccountMonthlyAmount"
                      label="Monthly disbursement from your IRA account"
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
                    name="retirementIncomeKeogh"
                    valuePropName="checked"
                    initialValue={false}
                    /* rules={[
                        {
                          validator: (_, value) =>
                            value
                              ? Promise.resolve()
                              : Promise.reject('Should accept agreement'),
                        },
                      ]} */
                  >
                    <Checkbox
                      checked={showKeoghAmountBox}
                      onChange={handleKeoghChange}
                    >
                      I have a Keogh account and I'm receiving monthly income
                      from it.
                    </Checkbox>
                  </Form.Item>

                  {showKeoghAmountBox && (
                    <Form.Item
                      name="retirementIncomeKeoghMonthlyAmount"
                      label="Monthly disbursement from your Keogh account"
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

RetirementIncomeSection.propTypes = {
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

RetirementIncomeSection.defaultProps = {
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
    content: 'Next, tell use more about your retirement income.',
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

const RetirementIncomeSectionRedux = connect(
  mapStateToProps,
  mapDispatchToProps
)(RetirementIncomeSection);

export default RetirementIncomeSectionRedux;
