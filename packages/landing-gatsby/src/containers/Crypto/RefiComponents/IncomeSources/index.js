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

const RefiIncomeSourcesSection = ({
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
    console.log('More User info: userToken', userToken);
    console.log(
      'current user incomeRetired401kIRAKeogh',
      values.incomeRetired401kIRAKeogh
    );
    currentUser.incomeRetired401kIRAKeogh = values.incomeRetired401kIRAKeogh;

    currentUser.incomeRentalIncome = values.incomeRentalIncome;
    console.log(
      'current user incomeRentalIncome',
      currentUser.incomeRentalIncome
    );

    currentUser.incomeChildSupportAlimonyMaintenanceIncome =
      values.incomeChildSupportAlimonyMaintenanceIncome;
    console.log(
      'current user incomeChildSupportAlimonyMaintenanceIncome',
      currentUser.incomeChildSupportAlimonyMaintenanceIncome
    );

    currentUser.incomeAdditionalIncome = values.incomeAdditionalIncome;
    console.log(
      'current user incomeAdditionalIncome',
      currentUser.incomeAdditionalIncome
    );

    //currentUser.applicationStep = '/refi-pages/identityVerif/';
    console.log('currentUser with ownership updates', currentUser);

    //hideLoader();
    //conditional navigate, go to first selected income source, if none, go to howLongLived
    if (values.incomeRetired401kIRAKeogh == true) {
      console.log('retirement income step');
      currentUser.applicationStep = '/refi-pages/retirementIncome/';
      updateUserInfo(currentUser, userToken);
      navigate('/refi-pages/retirementIncome/');
    } else if (values.incomeRentalIncome == true) {
      currentUser.applicationStep = '/refi-pages/rentalProperty/';
      updateUserInfo(currentUser, userToken);
      navigate('/refi-pages/rentalProperty/');
    } else if (values.incomeChildSupportAlimonyMaintenanceIncome == true) {
      currentUser.applicationStep = '/refi-pages/childSupportAlimony/';
      updateUserInfo(currentUser, userToken);
      navigate('/refi-pages/childSupportAlimony/');
    } else if (values.incomeAdditionalIncome == true) {
      currentUser.applicationStep =
        '/refi-pages/interestDividendsHousingGovernmentTrustOther/';
      navigate('/refi-pages/interestDividendsHousingGovernmentTrustOther/');
      updateUserInfo(currentUser, userToken);
    } else {
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
                    content={
                      'Please select all that apply to you:'
                    }
                    fontWeight="bold"
                  />

                  <Form.Item
                    name="incomeRetired401kIRAKeogh"
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
                    <Checkbox>
                      I am retired and/or have 401(k), IRA or Keogh Income.
                    </Checkbox>
                  </Form.Item>
                  <Text content={'You will need to provide the following:'} />
                  <Text content={'Monthly pension/retirement income'} />
                  <Text content={'Or'} />
                  <Text
                    content={
                      'For 401(k), IRA or Keough accounts, the current balance in the account'
                    }
                  />
                  <Text content={'We will verify by:'} />
                  <Text content={'Tax returns'} />
                  <Text content={'Linking to your existing accounts'} />

                  <Form.Item
                    name="incomeRentalIncome"
                    valuePropName="checked"
                    initialValue={false}
                    //valuePropName="veteran"
                    /* rules={[
                        {
                          validator: (_, value) =>
                            value
                              ? Promise.resolve()
                              : Promise.reject('Should accept agreement'),
                        },
                      ]} */
                  >
                    <Checkbox>I have rental income.</Checkbox>
                  </Form.Item>
                  <Text content={'You will need to provide the following:'} />
                  <Text content={'Rental property address '} />
                  <Text content={'Monthly rental income'} />
                  <Text
                    content={'A copy of your current lease (document upload'}
                  />
                  <Text
                    content={
                      'Current mortgage, tax, insurance, and HOA payments on the property.'
                    }
                  />
                  <Text content={'We will verify by:'} />
                  <Text
                    content={
                      'Reviewing your current lease and Schedule E (Form 1040) to confirm rental amount'
                    }
                  />
                  <Form.Item
                    name="incomeChildSupportAlimonyMaintenanceIncome"
                    valuePropName="checked"
                    initialValue={false}
                    //valuePropName="veteran"
                    /* rules={[
                        {
                          validator: (_, value) =>
                            value
                              ? Promise.resolve()
                              : Promise.reject('Should accept agreement'),
                        },
                      ]} */
                  >
                    <Checkbox>
                      I have a child support/alimony/seperate maintenance
                      income.
                    </Checkbox>
                  </Form.Item>

                  <Form.Item
                    name="incomeAdditionalIncome"
                    valuePropName="checked"
                    initialValue={false}
                    //valuePropName="veteran"
                    /* rules={[
                        {
                          validator: (_, value) =>
                            value
                              ? Promise.resolve()
                              : Promise.reject('Should accept agreement'),
                        },
                      ]} */
                  >
                    <Checkbox>I have additional income.</Checkbox>
                  </Form.Item>
                  <Text content={'You will need to provide the following:'} />
                  <Text content={'Monthly accounts received'} />
                  <Text content={'Monthly rental income'} />
                  <Text content={'We will verify by:'} />
                  <Text content={'Supporting documents you upload'} />
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

RefiIncomeSourcesSection.propTypes = {
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

RefiIncomeSourcesSection.defaultProps = {
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
    content: "Next, we'll need some information about your income sources",
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

const RefiIncomeSourcesSectionRedux = connect(
  mapStateToProps,
  mapDispatchToProps
)(RefiIncomeSourcesSection);

export default RefiIncomeSourcesSectionRedux;
