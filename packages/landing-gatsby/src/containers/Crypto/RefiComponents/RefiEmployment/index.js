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

const RefiEmploymentSection = ({
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
  setHideEmploymentDropDown,
}) => {
  const [form] = Form.useForm();
  const [EmploymentStatusType, setEmploymentStatusType] = useState(null);

  const subtractTasksAmount = (e) => {
	Object.assign(	
		currentUser.miscellaneous, 
			{ 
				tasksLeft: currentUser.miscellaneous.tasksLeft -1,
			}
		)	
  }
  
  const handleEmploymentStatusType = (e) => {
	  if(e.target.checked == true){
		setEmploymentStatusType(e.target.value)
	  }
	  else{
		setEmploymentStatusType('Previous')
	  }
  }

  const onFinish = async (values) => {
    console.log('onFinish values ', values);



	Object.assign(currentUser.borrower, {
		Employment: {
			Address: {
				AddressLineText: values.AddressLineText,
				CityName: values.CityName,
				CountryCode: values.CountryCode,
				PostalCode: values.PostalCode,
				StateCode: values.StateCode,
			},
			LEGAL_ENTITY_DETAIL_FullName: values.LEGAL_ENTITY_DETAIL_FullName,
			EmploymentBorrowerSelfEmployedIndicator: values.EmploymentBorrowerSelfEmployedIndicator,
			EmploymentClassificationType: values.EmploymentClassificationType,
			EmploymentPositionDescription: values.EmploymentPositionDescription,
			EmploymentStartDate: values.EmploymentStartDate,
			EmploymentStatusType: EmploymentStatusType,
			EmploymentTimeInLineOfWorkMonthsCount: values.EmploymentTimeInLineOfWorkMonthsCount,
			SpecialBorrowerEmployerRelationshipIndicator: values.SpecialBorrowerEmployerRelationshipIndicator,
			ContactPointTelephoneValue: values.ContactPointTelephoneValue,
		}
	})
    console.log('currentUser with ownership updates', currentUser);
    subtractTasksAmount()
    //showLoader();
    updateUserInfo(currentUser, userToken);
	setHideEmploymentDropDown(true)
    //hideLoader();
    //open modal, add additinal income?  then conditional render to incomeSources or howlongLived
  };

  return (
 /*    <SectionMainWrapper>
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
                    name="EmploymentClassificationType"
                    label="Employment Type?"
                    rules={[
                      {
                        required: true,
                        message: '*Required',
                      },
                    ]}
                  >
                    <Select
                      placeholder="Select"
                      allowClear
                      //onChange={residencyOnChange}
                    >
                      <Option value="FULL-TIME">Full-Time employment</Option>
                      <Option value="PART-TIME">Part-time employment</Option>
                      <Option value="SELF-EMPLOYED">Self-employed</Option>
                      <Option value="RETIRED">Retired</Option>
                      <Option value="UNEMPLOYED/FURLOUGHED">
                        Unemployed/furloughed
                      </Option>
                      <Option value="ALIMONY, PUBLIC ASSISTANCE PROGRAM, CHILD SUPPORT, OR SEPERATE MAINTENANCE PAYMENTS">
                        Alimony, public assistance program, child support, or
                        seperate maintenance payments
                      </Option>
                    </Select>
                  </Form.Item>

                  <Form.Item
                    name="SpecialBorrowerEmployerRelationshipIndicator"
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
                    <Checkbox>I am employed by a family member.</Checkbox>
                  </Form.Item>

                  <Form.Item
                    name="LEGAL_ENTITY_DETAIL_FullName"
                    label="Employer Name"
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
                    name="ContactPointTelephoneValue"
                    label="Contact Phone number"
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
                    name="AddressLineText"
                    label="Address"
                    rules={[
                      {
                        required: true,
                        message: '*Required',
                      },
                    ]}
                  >
                    <Input autoComplete="new-password" />
                  </Form.Item>

                  <Form.Item
                    name="employerApartmentNumber"
                    label="Apartment, Suite, Unit"
                  >
                    <Input autoComplete="new-password" />
                  </Form.Item>

                  <Form.Item
                    name="CityName"
                    label="City"
                    rules={[
                      {
                        required: true,
                        message: '*Required',
                      },
                    ]}
                  >
                    <Input autoComplete="new-password" />
                  </Form.Item>

                  <Form.Item
                    name="StateCode"
                    label="State abbreviation"
                    rules={[
                      {
                        required: true,
                        message: '*Required',
                      },
                      {
                        max: 2,
                        message: 'Please only use two characters',
                      },
                      {
                        min: 2,
                        message: 'Please input a valid state',
                      },
                      {
                        pattern: /[a-zA-Z]+/,
                        message: 'Letters only',
                      },
                    ]}
                  >
                    <Input autoComplete="new-password" />
                  </Form.Item>

                  <Form.Item
                    name="PostalCode"
                    label="Zip Code"
                    rules={[
                      {
                        required: true,
                        message: '*Required',
                      },
                      {
                        pattern: /^\d{5}(?:[-\s]\d{4})?$/,
                        message: 'Please enter a valid zip code',
                      },
                      {
                        min: 5,
                        message: '*Must be at least 5 digits',
                      },
                    ]}
                  >
                    <Input autoComplete="new-password" />
                  </Form.Item>
                  <Text
                    content={'Tell us about your role:'}
                    fontWeight="bold"
                  />

                  <Form.Item
                    name="EmploymentPositionDescription"
                    label="Job Title"
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
                    name="annualBaseSalary"
                    label="Annual Base Salary"
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

                  <Form.Item
                    name="employerStartDate"
                    label="Start date"
                    rules={[
                      {
                        required: true,
                        message: '*Required',
                      },
                    ]}
                  >
                    <Cleave
                      className="ant-input"
                      placeholder="01/01/2019"
                      options={{ date: true, datePattern: ['m', 'd', 'Y'] }}
                    />
                  </Form.Item>

                  <Form.Item
                    name="employerEndDate"
                    label="End date"
                    rules={[
                      {
                        required: true,
                        message: '*Required',
                      },
                    ]}
                  >
                    <Cleave
                      className="ant-input"
                      placeholder="01/01/2019"
                      options={{ date: true, datePattern: ['m', 'd', 'Y'] }}
                    />
                  </Form.Item>

                  <Form.Item
                    name="EmploymentStatusType"
                    valuePropName="checked"
					value="Current"
                    //initialValue={false}
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
					onChange={handleEmploymentStatusType}
						value="Current">
							I am currently employed here.</Checkbox>
                  </Form.Item>

                  <Form.Item {...tailFormItemLayout}>
                    <Button 
					//type="primary" 
					htmlType="submit" {...button}>
                      Submit
                    </Button>
                  </Form.Item>
                </Form>
/*               </ContactFromWrapper>
            </Box>
          </Box>
        </Container>
      </Box>
    </SectionMainWrapper> */
  );
};

RefiEmploymentSection.propTypes = {
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

RefiEmploymentSection.defaultProps = {
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
    //colors: 'primaryWithBg',
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
    content: "Next, we'll need some information about your employmer",
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

const RefiEmploymentSectionRedux = connect(
  mapStateToProps,
  mapDispatchToProps
)(RefiEmploymentSection);

export default RefiEmploymentSectionRedux;
