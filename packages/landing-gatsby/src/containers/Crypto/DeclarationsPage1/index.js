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
import ContactFromWrapper, { SectionMainWrapper } from '../contact.style';
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

const DeclarationsPage1Section = ({
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
  setHideDeclarations1DropDown
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
    console.log('onFinish values ', values);
	if(currentUser.borrower.declaration) {
		Object.assign(currentUser.borrower.declaration1, {
				HomeownerPastThreeYearsType: values.HomeownerPastThreeYears,
				IntentToOccupyType: values.IntentToOccupy,
				PropertyProposedCleanEnergyLienIndicator: values.PropertyProposedCleanEnergyLienIndicator,
				UndisclosedBorrowedFundsIndicator: values.UndisclosedBorrowedFundsIndicator,
				UndisclosedCreditApplicationIndicator: values.UndisclosedCreditApplicationIndicator,
				UndisclosedMortgageApplicationIndicator: values.UndisclosedMortgageApplicationIndicator,
  			    //SpecialBorrowerSellerRelationshipIndicator: SpecialBorrowerSellerRelationshipIndicator || null,

			})
			
		}
	else{	
		Object.assign(currentUser.borrower, {
			declaration1: {
				HomeownerPastThreeYearsType: values.HomeownerPastThreeYears,
				IntentToOccupyType: values.IntentToOccupy,
				PropertyProposedCleanEnergyLienIndicator: values.PropertyProposedCleanEnergyLienIndicator,
				UndisclosedBorrowedFundsIndicator: values.UndisclosedBorrowedFundsIndicator,
				UndisclosedCreditApplicationIndicator: values.UndisclosedCreditApplicationIndicator,
				UndisclosedMortgageApplicationIndicator: values.UndisclosedMortgageApplicationIndicator,
  			    //SpecialBorrowerSellerRelationshipIndicator: SpecialBorrowerSellerRelationshipIndicator || null,
			}
		})
	}
	subtractTasksAmount() 
	setHideDeclarations1DropDown(true)
  	updateUserInfo(currentUser, userToken);
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
              /> */
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
                  name="IntentToOccupy"
                  label="Will you occupy the property as your primary residence?"
                  rules={[
                    {
                      required: true,
                      message: '*Required',
                    },
                  ]}
                >
                  <Radio.Group buttonStyle="solid">
                    <Radio.Button value={"Yes"}>Yes</Radio.Button>
                    <Radio.Button value={"No"}>No</Radio.Button>
                  </Radio.Group>
                </Form.Item>

				  {currentUser?.loan.termsOfLoan.loanPurposeType == "Purchase" && (
				<Form.Item
                  name="SpecialBorrowerSellerRelationshipIndicator"
                  label="Do you have a family relationship or business affiliation with the seller of the property?"
                  rules={[
                    {
                      required: true,
                      message: '*Required',
                    },
                  ]}
                >
                  <Radio.Group buttonStyle="solid">
                    <Radio.Button value={"Yes"}>Yes</Radio.Button>
                    <Radio.Button value={"No"}>No</Radio.Button>
                  </Radio.Group>
                </Form.Item>
				)}

                <Form.Item
                  name="UndisclosedBorrowedFundsIndicator"
                  label="Are you borrowing any money for this real estate transaction (e.g., money for your closing costs or down payment) or obtaining any money from another party, such as the seller or realtor, that you have not disclosed on this loan application?"
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
                  name="HomeownerPastThreeYears"
                  label="Have you had an ownership interest in another property in the last three years?"
                  rules={[
                    {
                      required: true,
                      message: '*Required',
                    },
                  ]}
                >
                  <Radio.Group buttonStyle="solid">
                    <Radio.Button value={"Yes"}>Yes</Radio.Button>
                    <Radio.Button value={"No"}>No</Radio.Button>
                  </Radio.Group>
                </Form.Item>

                <Form.Item
                  name="UndisclosedMortgageApplicationIndicator"
                  label="Have you or will you be applying for a mortgage loan on another property (not the property securing this loan) on or before closing this transaction that is not disclosed on this loan application?"
                  rules={[
                    {
                      required: true,
                      message: '*Required',
                    },
                  ]}
                >
                  <Radio.Group buttonStyle="solid">
                    <Radio.Button value={true}>Yes</Radio.Button>
                    <Radio.Button value={false}>No</Radio.Button>
                  </Radio.Group>
                </Form.Item>

                <Form.Item
                  name="UndisclosedCreditApplicationIndicator"
                  label="Have you or will you be applying for any new credit (e.g., installment loan, credit card, etc.) on or before closing this loan that is not disclosed on this application?"
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
                  name="PropertyProposedCleanEnergyLienIndicator"
                  label="Will this property be subject to a lien that could take priority over the first mortgage lien, such as a clean energy lien paid through your property taxes (e.g., the Property Assessed Clean Energy Program)?"
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
/*            </Box>
          </Box>
        </Container>
      </Box>
    </SectionMainWrapper> */
  );
};

DeclarationsPage1Section.propTypes = {
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

DeclarationsPage1Section.defaultProps = {
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

const DeclarationsPage1SectionRedux = connect(
  mapStateToProps,
  mapDispatchToProps
)(DeclarationsPage1Section);

export default DeclarationsPage1SectionRedux;
