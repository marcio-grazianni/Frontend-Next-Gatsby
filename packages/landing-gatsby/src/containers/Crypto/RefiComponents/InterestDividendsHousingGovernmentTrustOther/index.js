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

const InterestDividendsHousingGovernmentTrustOtherSection = ({
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
  const [
    showInterestAndDividendsDropdown,
    setShowInterestAndDividendsDropdown,
  ] = useState(false);
  const [
    showInterestAndDividendsTextBox,
    setShowInterestAndDividendsTextBox,
  ] = useState(false);
  const [
    showCapitalGainsIncomeTextBox,
    setShowCapitalGainsIncomeTextBox,
  ] = useState(false);
  const [showNotesReceivableTextBox, setShowNotesReceivableTextBox] = useState(
    false
  );
  const [
    showHousingRelatedIncomeDropdown,
    setShowHousingRelatedIncomeDropdown,
  ] = useState(false);
  const [showBoarderIncomeTextBox, setShowBoarderIncomeTextBox] = useState(
    false
  );
  const [
    showHousingOrParsonageTextBox,
    setShowHousingOrParsonageTextBox,
  ] = useState(false);
  const [showFosterCareTextBox, setShowFosterCareTextBox] = useState(false);
  const [
    showGovernmentEmployerDropdown,
    setShowGovernmentEmployerDropdown,
  ] = useState(false);
  const [
    showGovernmentEmployerIncomeTextBox,
    setShowGovernmentEmployerIncomeTextBox,
  ] = useState(false);
  const [showSocialSecurityTextBox, setShowSocialSecurityTextBox] = useState(
    false
  );
  const [
    showUnemploymentBenefitsTextBox,
    setShowUnemploymentBenefitsTextBox,
  ] = useState(false);
  const [showVACompensationTextBox, setShowVACompensationTextBox] = useState(
    false
  );
  const [
    showDisabilityIncomeTextBox,
    setShowDisabilityIncomeTextBox,
  ] = useState(false);
  const [
    showPublicAssistanceIncomeTextBox,
    setShowPublicAssistanceIncomeTextBox,
  ] = useState(false);
  const [showMortgageCreditTextBox, setShowMortgageCreditTextBox] = useState(
    false
  );
  const [
    showDifferentialPaymentsTextBox,
    setShowDifferentialPaymentsTextBox,
  ] = useState(false);
  const [
    showRoyaltyTrustAutomobileIncomeDropdown,
    setShowRoyaltyTrustAutomobileIncomeDropdown,
  ] = useState(false);
  const [showRoyaltyTextBox, setShowRoyaltyTextBox] = useState(false);
  const [showTrustIncomeTextBox, setShowTrustIncomeTextBox] = useState(false);
  const [
    showAutomobileIncomeTextBox,
    setShowAutomobileIncomeTextBox,
  ] = useState(false);
  const [showOtherIncomeDropdown, setShowOtherIncomeDropdown] = useState(false);
  const [showOtherIncomeTextBox, setShowOtherIncomeTextBox] = useState(false);

  const handleInterestAndDividendsDropdown = (e) => {
    setShowInterestAndDividendsDropdown(e.target.checked);
  };

  const handleInterestAndDividendsTextBox = (e) => {
    setShowInterestAndDividendsTextBox(e.target.checked);
  };

  const handleCapitalGainsTextBox = (e) => {
    setShowCapitalGainsIncomeTextBox(e.target.checked);
  };

  const handleNotesReceivableTextBox = (e) => {
    setShowNotesReceivableTextBox(e.target.checked);
  };

  const handleHousingRelatedIncomeDropdown = (e) => {
    setShowHousingRelatedIncomeDropdown(e.target.checked);
  };

  const handleBorderIncomeTextBox = (e) => {
    setShowBoarderIncomeTextBox(e.target.checked);
  };

  const handleHousingOrParsonageIncomeTextBox = (e) => {
    setShowHousingOrParsonageTextBox(e.target.checked);
  };

  const handleFosterCareTextBox = (e) => {
    setShowFosterCareTextBox(e.target.checked);
  };

  const handleGovernmentEmployerIncomeDropdown = (e) => {
    setShowGovernmentEmployerDropdown(e.target.checked);
  };

  const handleSocialSecurityDropdown = (e) => {
    setShowSocialSecurityTextBox(e.target.checked);
  };

  const handleUnemploymentTextBox = (e) => {
    setShowUnemploymentBenefitsTextBox(e.target.checked);
  };

  const handleVATextBox = (e) => {
    setShowVACompensationTextBox(e.target.checked);
  };

  const handleDisabilityTextBox = (e) => {
    setShowDisabilityIncomeTextBox(e.target.checked);
  };

  const handlePublicAssistanceTextBox = (e) => {
    setShowPublicAssistanceIncomeTextBox(e.target.checked);
  };

  const handleMortgageCreditTextBox = (e) => {
    setShowMortgageCreditTextBox(e.target.checked);
  };

  const handleDifferentialPayments = (e) => {
    setShowDifferentialPaymentsTextBox(e.target.checked);
  };

  const handleRoyaltyTrustAutomobilePaymentsDropdown = (e) => {
    setShowRoyaltyTrustAutomobileIncomeDropdown(e.target.checked);
  };

  const handleRoyaltyPayments = (e) => {
    setShowRoyaltyTextBox(e.target.checked);
  };

  const handleTrustIncome = (e) => {
    setShowTrustIncomeTextBox(e.target.checked);
  };

  const handleAutomobileAllowance = (e) => {
    setShowAutomobileIncomeTextBox(e.target.checked);
  };

  const handleOtherIncomeDropdown = (e) => {
    setShowOtherIncomeDropdown(e.target.checked);
  };

  const handleOtherIncomeTextBox = (e) => {
    setShowOtherIncomeTextBox(e.target.checked);
  };

  const onFinish = async (values) => {
    values['applicationStep'] = '/moreUserInfo/';

    console.log('onFinish values ', values);

    userToken = JSON.parse(localStorage.getItem('jwt'));
    console.log('More User info: userToken', userToken);

    currentUser.interestAndDividendsIncome = values.interestAndDividendsIncome;
    currentUser.capitalGainsIncome = values.capitalGainsIncome;
    currentUser.notesReceivableAmount = values.notesReceivableAmount;
    currentUser.boarderIncomeAmount = values.boarderIncomeAmount;
    currentUser.housingOrParsonageIncomeAmount =
      values.housingOrParsonageIncomeAmount;
    currentUser.fosterCareIncomeAmount = values.fosterCareIncomeAmount;
    currentUser.socialSecurityIncomeAmount = values.socialSecurityIncomeAmount;
    currentUser.unemploymentBenefitIncomeAmount =
      values.unemploymentBenefitIncomeAmount;
    currentUser.vaCompensationAmount = values.vaCompensationAmount;
    currentUser.disabilityIncomeAmount = values.disabilityIncomeAmount;
    currentUser.publicAssistanceIncomeAmount =
      values.publicAssistanceIncomeAmount;
    currentUser.mortgageCreditCertificateIncomeAmount =
      values.mortgageCreditCertificateIncomeAmount;
    currentUser.mortgageDifferentialPaymentsAmount =
      values.mortgageDifferentialPaymentsAmount;
    currentUser.royaltyPaymentsAmount = values.royaltyPaymentsAmount;
    currentUser.trustIncomeAmount = values.trustIncomeAmount;
    currentUser.automobileAllowanceIncomeAmount =
      values.automobileAllowanceIncomeAmount;
    currentUser.otherIncomeAmount = values.otherIncomeAmount;

    currentUser.applicationStep = '/refi-pages/howLongCurrentAddress/';
    console.log('currentUser with ownership updates', currentUser);

    //showLoader();
    updateUserInfo(currentUser, userToken);

    //hideLoader();

    navigate('/refi-pages/howLongCurrentAddress/');
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
                      'Please select all the different types of income that you receive:'
                    }
                    fontWeight="bold"
                  />

                  <Form.Item
                    name="interestAndDividendsIncomeDropdown"
                    valuePropName="checked"
                    initialValue={false}
                  >
                    <Checkbox
                      checked={showInterestAndDividendsDropdown}
                      onChange={handleInterestAndDividendsDropdown}
                    >
                      ---- Interest and dividends, capital gains, and/or notes
                      receivable
                    </Checkbox>
                  </Form.Item>

                  {showInterestAndDividendsDropdown && (
                    <Form.Item
                      name="interestAndDividendsIncomeCheckbox"
                      valuePropName="checked"
                      initialValue={false}
                    >
                      <Checkbox
                        checked={showInterestAndDividendsTextBox}
                        onChange={handleInterestAndDividendsTextBox}
                      >
                        Interest and dividends income
                      </Checkbox>
                    </Form.Item>
                  )}

                  {showInterestAndDividendsTextBox &&
                    showInterestAndDividendsDropdown && (
                      <Form.Item
                        name="interestAndDividendsIncome"
                        label="Monthly amount of interest and dividends received in the past two years"
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

                  {showInterestAndDividendsDropdown && (
                    <Form.Item
                      name="capitalGainsIncomeCheckbox"
                      valuePropName="checked"
                      initialValue={false}
                    >
                      <Checkbox
                        checked={showCapitalGainsIncomeTextBox}
                        onChange={handleCapitalGainsTextBox}
                      >
                        CapitalGainsIncome
                      </Checkbox>
                    </Form.Item>
                  )}

                  {showCapitalGainsIncomeTextBox && (
                    <Form.Item
                      name="capitalGainsIncome"
                      label="Monthly amount of capital gains received in the past two years"
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

                  {showInterestAndDividendsDropdown && (
                    <Form.Item
                      name="notesReceivableCheckBox"
                      valuePropName="checked"
                      initialValue={false}
                    >
                      <Checkbox
                        checked={showNotesReceivableTextBox}
                        onChange={handleNotesReceivableTextBox}
                      >
                        Notes receivable income
                      </Checkbox>
                    </Form.Item>
                  )}

                  {showNotesReceivableTextBox &&
                    showInterestAndDividendsDropdown && (
                      <Form.Item
                        name="notesReceivableAmount"
                        label="Monthly amount of notest receivable in the past year"
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
                    name="housingRelatedIncomeCheckbox"
                    valuePropName="checked"
                    initialValue={false}
                  >
                    <Checkbox
                      checked={showHousingRelatedIncomeDropdown}
                      onChange={handleHousingRelatedIncomeDropdown}
                    >
                      ---- Housing-related income
                    </Checkbox>
                  </Form.Item>

                  {showHousingRelatedIncomeDropdown && (
                    <Form.Item
                      name="boarderIncome"
                      valuePropName="checked"
                      initialValue={false}
                    >
                      <Checkbox
                        checked={showHousingRelatedIncomeDropdown}
                        onChange={handleBorderIncomeTextBox}
                      >
                        Boarder income
                      </Checkbox>
                    </Form.Item>
                  )}

                  {showHousingRelatedIncomeDropdown &&
                    showBoarderIncomeTextBox && (
                      <Form.Item
                        name="boarderIncomeAmount"
                        label="Monthly amount of boarder income received in the past year"
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

                  {showHousingRelatedIncomeDropdown && (
                    <Form.Item
                      name="housingorParsonageIncome"
                      valuePropName="checked"
                      initialValue={false}
                    >
                      <Checkbox
                        checked={showHousingOrParsonageTextBox}
                        onChange={handleHousingOrParsonageIncomeTextBox}
                      >
                        Housing or parsonage income
                      </Checkbox>
                    </Form.Item>
                  )}

                  {showHousingRelatedIncomeDropdown &&
                    showHousingOrParsonageTextBox && (
                      <Form.Item
                        name="housingOrParsonageIncomeAmount"
                        label="Monthly amount of housing/parsonage income received in the past year"
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

                  {showHousingRelatedIncomeDropdown && (
                    <Form.Item
                      name="fosterCareIncome"
                      valuePropName="checked"
                      initialValue={false}
                    >
                      <Checkbox
                        checked={showFosterCareTextBox}
                        onChange={handleFosterCareTextBox}
                      >
                        Foster care income
                      </Checkbox>
                    </Form.Item>
                  )}

                  {showHousingRelatedIncomeDropdown && showFosterCareTextBox && (
                    <Form.Item
                      name="fosterCareIncomeAmount"
                      label="Monthly amount of foster care income received in the past year"
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
                    name="governmentEmployerDropdown"
                    valuePropName="checked"
                    initialValue={false}
                  >
                    <Checkbox
                      checked={showGovernmentEmployerDropdown}
                      onChange={handleGovernmentEmployerIncomeDropdown}
                    >
                      ---- Government/employer sponsored income
                    </Checkbox>
                  </Form.Item>

                  {showGovernmentEmployerDropdown && (
                    <Form.Item
                      name="socialSecurityIncomeCheckbox"
                      valuePropName="checked"
                      initialValue={false}
                    >
                      <Checkbox
                        checked={showSocialSecurityTextBox}
                        onChange={handleSocialSecurityDropdown}
                      >
                        Social security income
                      </Checkbox>
                    </Form.Item>
                  )}

                  {showGovernmentEmployerDropdown && showSocialSecurityTextBox && (
                    <Form.Item
                      name="socialSecurityIncomeAmount"
                      label="Monthly amount of foster care income received in the past year"
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

                  {showGovernmentEmployerDropdown && (
                    <Form.Item
                      name="unemploymentBenefitIncomeCheckbox"
                      valuePropName="checked"
                      initialValue={false}
                    >
                      <Checkbox
                        checked={showUnemploymentBenefitsTextBox}
                        onChange={handleUnemploymentTextBox}
                      >
                        Unemployment benefits
                      </Checkbox>
                    </Form.Item>
                  )}

                  {showGovernmentEmployerDropdown &&
                    showUnemploymentBenefitsTextBox && (
                      <Form.Item
                        name="unemploymentBenefitIncomeAmount"
                        label="Monthly amount of unemployment income received in the past year"
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

                  {showGovernmentEmployerDropdown && (
                    <Form.Item
                      name="vaCompensationCheckbox"
                      valuePropName="checked"
                      initialValue={false}
                    >
                      <Checkbox
                        checked={showVACompensationTextBox}
                        onChange={handleVATextBox}
                      >
                        VA Compensation
                      </Checkbox>
                    </Form.Item>
                  )}

                  {showGovernmentEmployerDropdown && showVACompensationTextBox && (
                    <Form.Item
                      name="vaCompensationAmount"
                      label="Monthly amount of unemployment income received in the past year"
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

                  {showGovernmentEmployerDropdown && (
                    <Form.Item
                      name="disabilityIncomeCheckbox"
                      valuePropName="checked"
                      initialValue={false}
                    >
                      <Checkbox
                        checked={showDisabilityIncomeTextBox}
                        onChange={handleDisabilityTextBox}
                      >
                        Disability Income
                      </Checkbox>
                    </Form.Item>
                  )}

                  {showGovernmentEmployerDropdown &&
                    showDisabilityIncomeTextBox && (
                      <Form.Item
                        name="disabilityIncomeAmount"
                        label="Monthly amount of disability income received in the past year"
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

                  {showGovernmentEmployerDropdown && (
                    <Form.Item
                      name="publicAssistanceIncomeCheckbox"
                      valuePropName="checked"
                      initialValue={false}
                    >
                      <Checkbox
                        checked={showPublicAssistanceIncomeTextBox}
                        onChange={handlePublicAssistanceTextBox}
                      >
                        Public assistance Income
                      </Checkbox>
                    </Form.Item>
                  )}

                  {showGovernmentEmployerDropdown &&
                    showPublicAssistanceIncomeTextBox && (
                      <Form.Item
                        name="publicAssistanceIncomeAmount"
                        label="Monthly amount of public assistance income received in the past year"
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

                  {showGovernmentEmployerDropdown && (
                    <Form.Item
                      name="mortgageCreditCertificateIncomeCheckbox"
                      valuePropName="checked"
                      initialValue={false}
                    >
                      <Checkbox
                        checked={showMortgageCreditTextBox}
                        onChange={handleMortgageCreditTextBox}
                      >
                        Mortgage credit certificate income
                      </Checkbox>
                    </Form.Item>
                  )}

                  {showGovernmentEmployerDropdown && showMortgageCreditTextBox && (
                    <Form.Item
                      name="mortgageCreditCertificateIncomeAmount"
                      label="Monthly amount"
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

                  {showGovernmentEmployerDropdown && (
                    <Form.Item
                      name="mortgageDifferentialPaymentsCheckbox"
                      valuePropName="checked"
                      initialValue={false}
                    >
                      <Checkbox
                        checked={showDifferentialPaymentsTextBox}
                        onChange={handleDifferentialPayments}
                      >
                        Monthly differential payments
                      </Checkbox>
                    </Form.Item>
                  )}

                  {showGovernmentEmployerDropdown &&
                    showDifferentialPaymentsTextBox && (
                      <Form.Item
                        name="mortgageDifferentialPaymentsAmount"
                        label="Monthly amount"
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
                    name="royaltyTrustAutomobileIncomeDropdown"
                    valuePropName="checked"
                    initialValue={false}
                  >
                    <Checkbox
                      checked={showRoyaltyTrustAutomobileIncomeDropdown}
                      onChange={handleRoyaltyTrustAutomobilePaymentsDropdown}
                    >
                      ---- Royalty/trust/automobile income
                    </Checkbox>
                  </Form.Item>

                  {showRoyaltyTrustAutomobileIncomeDropdown && (
                    <Form.Item
                      name="royaltyPaymentsCheckbox"
                      valuePropName="checked"
                      initialValue={false}
                    >
                      <Checkbox
                        checked={showRoyaltyTextBox}
                        onChange={handleRoyaltyPayments}
                      >
                        Royalty payments
                      </Checkbox>
                    </Form.Item>
                  )}

                  {showRoyaltyTrustAutomobileIncomeDropdown &&
                    showRoyaltyTextBox && (
                      <Form.Item
                        name="royaltyPaymentsAmount"
                        label="Monthly amount"
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

                  {showRoyaltyTrustAutomobileIncomeDropdown && (
                    <Form.Item
                      name="trustIncomeCheckbox"
                      valuePropName="checked"
                      initialValue={false}
                    >
                      <Checkbox
                        checked={showTrustIncomeTextBox}
                        onChange={handleTrustIncome}
                      >
                        Trust income
                      </Checkbox>
                    </Form.Item>
                  )}

                  {showRoyaltyTrustAutomobileIncomeDropdown &&
                    showTrustIncomeTextBox && (
                      <Form.Item
                        name="trustIncomeAmount"
                        label="Monthly amount"
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

                  {showRoyaltyTrustAutomobileIncomeDropdown && (
                    <Form.Item
                      name="automobileAllowanceIncomeCheckbox"
                      valuePropName="checked"
                      initialValue={false}
                    >
                      <Checkbox
                        checked={showAutomobileIncomeTextBox}
                        onChange={handleAutomobileAllowance}
                      >
                        Automobile allowance income
                      </Checkbox>
                    </Form.Item>
                  )}

                  {showRoyaltyTrustAutomobileIncomeDropdown &&
                    showAutomobileIncomeTextBox && (
                      <Form.Item
                        name="automobileAllowanceIncomeAmount"
                        label="Monthly amount"
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
                    name="otherIncomeDropdown"
                    valuePropName="checked"
                    initialValue={false}
                  >
                    <Checkbox
                      checked={showOtherIncomeDropdown}
                      onChange={handleOtherIncomeDropdown}
                    >
                      ---- Other income not listed
                    </Checkbox>
                  </Form.Item>

                  {showOtherIncomeDropdown && (
                    <Form.Item
                      name="otherIncomeCheckbox"
                      valuePropName="checked"
                      initialValue={false}
                    >
                      <Checkbox
                        checked={showOtherIncomeTextBox}
                        onChange={handleOtherIncomeTextBox}
                      >
                        Other income
                      </Checkbox>
                    </Form.Item>
                  )}

                  {showOtherIncomeDropdown && showOtherIncomeTextBox && (
                    <Form.Item
                      name="otherIncomeAmount"
                      label="Monthly amount"
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

InterestDividendsHousingGovernmentTrustOtherSection.propTypes = {
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

InterestDividendsHousingGovernmentTrustOtherSection.defaultProps = {
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
    content: "Next, we'll need some informationt about your income sources.",
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

const InterestDividendsHousingGovernmentTrustOtherSectionRedux = connect(
  mapStateToProps,
  mapDispatchToProps
)(InterestDividendsHousingGovernmentTrustOtherSection);

export default InterestDividendsHousingGovernmentTrustOtherSectionRedux;
