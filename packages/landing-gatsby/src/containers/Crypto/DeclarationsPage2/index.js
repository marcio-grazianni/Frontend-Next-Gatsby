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
import ContactFromWrapper, { SectionMainWrapper } from './contact.style';
import PropTypes from 'prop-types';
import Box from 'common/src/components/Box';
import Text from 'common/src/components/Text';
import Heading from 'common/src/components/Heading';
import Container from 'common/src/components/UI/Container';
import FeatureBlock from 'common/src/components/FeatureBlock';
import { updateUserInfo } from '../../../actions';
import { flex } from 'styled-system';

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

const DeclarationsPage2Section = ({
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
  setHideDeclarations2DropDown
}) => {
  const [form] = Form.useForm();

  const subtractTasksAmount = (e) => {
	Object.assign(	
		currentUser.miscellaneous, 
			{ 
				tasksLeft: currentUser.miscellaneous.tasksLeft -1,
			}
		)	
  }  

  const onFinish = async (values) => {

	  if(currentUser.borrower.declaration2) {
		Object.assign(currentUser.borrower.declaration, {
			  BankruptcyIndicator: values.BankruptcyIndicator,
			  OutstandingJudgmentsIndicator: values.OutstandingJudgementsIndicator,
			  PartyToLawsuitIndicator: values.PartyToLawsuitIndicator,
			  PresentlyDelinquentIndicator: values.PresentlyDelinquentIndicator,
			  PriorPropertyDeedInLieuConveyedIndicator: values.PriorPropertyDeedInLieuConveyedIndicator,
			  PriorPropertyForeclosureCompletedIndicator: values.PriorPropertyForeclosureCompletedIndicator,
			  PriorPropertyShortSaleCompletedIndicator: values.PriorPropertyShortSaleCompletedIndicator,
			  UndisclosedComakerOfNoteIndicator: values.UndisclosedComakerOfNoteIndicator,
		})
	  }
	  else{
		Object.assign(currentUser.borrower, {
			declaration2: {
			  BankruptcyIndicator: values.BankruptcyIndicator,
			  OutstandingJudgmentsIndicator: values.OutstandingJudgementsIndicator,
			  PartyToLawsuitIndicator: values.PartyToLawsuitIndicator,
			  PresentlyDelinquentIndicator: values.PresentlyDelinquentIndicator,
			  PriorPropertyDeedInLieuConveyedIndicator: values.PriorPropertyDeedInLieuConveyedIndicator,
			  PriorPropertyForeclosureCompletedIndicator: values.PriorPropertyForeclosureCompletedIndicator,
			  PriorPropertyShortSaleCompletedIndicator: values.PriorPropertyShortSaleCompletedIndicator,
			  UndisclosedComakerOfNoteIndicator: values.UndisclosedComakerOfNoteIndicator,
			}
		})
	  }
	subtractTasksAmount()   
	setHideDeclarations2DropDown(true)
    updateUserInfo(currentUser, userToken);
    /* navigate('/refi-pages/submitApplication/'); */
  };

  return (
/*     <SectionMainWrapper>
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
              <Text
                content={
                  'We are required to ask these declarations questions regarding your subject property and money for this loan. If you need any assistance please give us a call.'
                }
                fontWeight="bold"
              /> 
              <ContactFromWrapper> */
              <Form
                //{...formItemLayout}
                form={form}
                layout="vertical"
                name="register"
                onFinish={onFinish}
                scrollToFirstError
                style={{ width: '60%' }}
              >
                <Form.Item
                  name="UndisclosedComakerOfNoteIndicator"
                  label="Are you a co-signer or guarantor on any debt or loan that is not disclosed on this application?"
                  rules={[
                    {
                      required: true,
                      message: '*Required',
                    },
                  ]}
                >
                  <Radio.Group buttonStyle="solid">
                    <Radio.Button value={"true"}>Yes</Radio.Button>
                    <Radio.Button value={"false"}>No</Radio.Button>
                  </Radio.Group>
                </Form.Item>

                <Form.Item
                  name="OutstandingJudgementsIndicator"
                  label="Are there any outstanding judgements against you?"
                  rules={[
                    {
                      required: true,
                      message: '*Required',
                    },
                  ]}
                >
                  <Radio.Group buttonStyle="solid">
                    <Radio.Button value={"true"}>Yes</Radio.Button>
                    <Radio.Button value={"false"}>No</Radio.Button>
                  </Radio.Group>
                </Form.Item>

                <Form.Item
                  name="PresentlyDelinquentIndicator"
                  label="Are you currently delinquent or in default on a Federal debt?"
                  rules={[
                    {
                      required: true,
                      message: '*Required',
                    },
                  ]}
                >
                  <Radio.Group buttonStyle="solid">
                    <Radio.Button value={"true"}>Yes</Radio.Button>
                    <Radio.Button value={"false"}>No</Radio.Button>
                  </Radio.Group>
                </Form.Item>

                <Form.Item
                  name="PartyToLawsuitIndicator"
                  label="Are you a party to a lawsuit in which you potentialy have any personal financial liability?"
                  rules={[
                    {
                      required: true,
                      message: '*Required',
                    },
                  ]}
                >
                  <Radio.Group buttonStyle="solid">
                    <Radio.Button value={"true"}>Yes</Radio.Button>
                    <Radio.Button value={"false"}>No</Radio.Button>
                  </Radio.Group>
                </Form.Item>

                <Form.Item
                  name="PriorPropertyDeedInLieuConveyedIndicator"
                  label="Have you conveyed title to any property in lieu of foreclosure in the past 7 years?"
                  rules={[
                    {
                      required: true,
                      message: '*Required',
                    },
                  ]}
                >
                  <Radio.Group buttonStyle="solid">
                    <Radio.Button value={"true"}>Yes</Radio.Button>
                    <Radio.Button value={"false"}>No</Radio.Button>
                  </Radio.Group>
                </Form.Item>

                <Form.Item
                  name="PriorPropertyShortSaleCompletedIndicator"
                  label="Within the past 7 years, have you completed a pre-forclosure sale or short sale, whereby the property was sold to a third party and the Lender agreed to accept less than the outstanding mortgage balance due?"
                  rules={[
                    {
                      required: true,
                      message: '*Required',
                    },
                  ]}
                >
                  <Radio.Group buttonStyle="solid">
                    <Radio.Button value={"true"}>Yes</Radio.Button>
                    <Radio.Button value={"false"}>No</Radio.Button>
                  </Radio.Group>
                </Form.Item>

                <Form.Item
                  name="PriorPropertyForeclosureCompletedIndicator"
                  label="Have you had property foreclosed upon in the last 7 years?"
                  rules={[
                    {
                      required: true,
                      message: '*Required',
                    },
                  ]}
                >
                  <Radio.Group buttonStyle="solid">
                    <Radio.Button value={"true"}>Yes</Radio.Button>
                    <Radio.Button value={"false"}>No</Radio.Button>
                  </Radio.Group>
                </Form.Item>

                <Form.Item
                  name="BankruptcyIndicator"
                  label="Have you declared bankruptcy with the past 7 years?"
                  rules={[
                    {
                      required: true,
                      message: '*Required',
                    },
                  ]}
                >
                  <Radio.Group buttonStyle="solid">
                    <Radio.Button value={"true"}>Yes</Radio.Button>
                    <Radio.Button value={"false"}>No</Radio.Button>
                  </Radio.Group>
                </Form.Item>

                <Form.Item {...tailFormItemLayout}>
                  <Button type="primary" htmlType="submit" {...button}>
                    Submit
                  </Button>
                </Form.Item>
              </Form>
              /*  </ContactFromWrapper>
	           </Box>
          </Box>
        </Container>
      </Box>
    </SectionMainWrapper> */
  );
};

DeclarationsPage2Section.propTypes = {
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

DeclarationsPage2Section.defaultProps = {
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
	style: { background: '#131176', color: 'white'},
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
    content: 'Answer whether these declarations apply to you.',
    fontSize: '20px',
    fontWeight: '700',
    color: '#525f7f',
    lineHeight: '28px',
    mb: ['25px', '25px', '30px', '30px', '45px'],
    textAlign: ['center', 'center'],
  },
};

const mapStateToProps = (state) => ({
    currentUser: state.root.currentUser?.user,
  userToken: state.root.currentUser?.token,
});

const mapDispatchToProps = (dispatch) => {
  return {
    updateUserInfo: (currentUser, userToken) =>
      dispatch(updateUserInfo(currentUser, userToken)),
  };
};

const DeclarationsPage2SectionRedux = connect(
  mapStateToProps,
  mapDispatchToProps
)(DeclarationsPage2Section);

export default DeclarationsPage2SectionRedux;
