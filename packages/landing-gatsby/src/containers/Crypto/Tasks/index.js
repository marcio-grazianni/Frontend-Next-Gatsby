//cash back refi select-offer

import React, { Fragment, useState, useEffect } from 'react';
import { navigate } from 'gatsby';
import { connect } from 'react-redux';
import Heading from 'common/src/components/Heading';
import Button from 'common/src/components/Button';
import Text from 'common/src/components/Text';
import Container from 'common/src/components/UI/Container';
import PropTypes from 'prop-types';
import DeclarationsPage1SectionRedux from '../DeclarationsPage1';
import DeclarationsPage2SectionRedux from '../DeclarationsPage2';
import { updateUserInfo } from '../../../actions';
import { loadState } from '../../../store';
import { Form, Collapse, Radio, Input, Select, Space } from 'antd';
//get offer details back from heroku backend node.js (max amount and terms)
//side bar with loan flow
import SectionWrapper, {
  PricingArea,
  InnerWrapper,
  PricingCard,
} from './pricingPolicy.style';
import { Router } from 'react-router';
import Tasks from '../../../pages/Dashboard/tasks';
import AntEthnicityRaceGenderDropdownSectionRedux from '../RefiComponents/RefiEthnicityRaceGender';
import RefiResidencyMarriage from '../RefiComponents/RefiResidencyMarriage';
import RefiEmploymentSectionRedux from '../RefiComponents/RefiEmployment';
import { flex } from 'styled-system';

//loan explanation
const { Panel } = Collapse;
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

const TasksContainer = ({ 
	title,
	description,
	button,
	currentUser, 
	userToken, 
	updateUserInfo }) => {
  const [form] = Form.useForm();
  const [BorrowerResidencyBasisType, setBorrowerResidencyBasisType] = useState(null);
  const [BorrowerRentAmount, setBorrowerRentAmount] = useState(null);
  const [hideBorrowerResidencyBasisTypeDropDown, setHideBorrowerResidencyBasisTypeDropDown] = useState(null);
  const [hideDeclarations1DropDown, setHideDeclarations1DropDown] = useState(null);
  const [hideDeclarations2DropDown, setHideDeclarations2DropDown] = useState(null);
  const [hideResidencyDropDown, setHideResidencyDropDown] = useState(null);
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [suffix, setSuffix] = useState(null);
  const [hideConfirmLegalNameDropDown, setHideConfirmLegalNameDropDown] = useState(null);
  const [confirmMailingAddress, setConfirmMailingAddress] = useState(null);
  const [hideConfirmMailingAddress, setHideConfirmMailingAddress] = useState(null);
  const [hideEthnicityDropdrown, setHideEthnicityDropdrown] = useState(null);
  const [hideEmploymentDropDown, setHideEmploymentDropDown] = useState(null);
  const [addCoborrower, setAddCoborrower] = useState(null);

  const subtractTasksAmount = (e) => {
	Object.assign(	
		currentUser.miscellaneous, 
			{ 
				tasksLeft: currentUser.miscellaneous.tasksLeft -1,
			}
		)	
  }  

  const handleBorrowerResidencyBasisType = (e) => {
	console.log(e.target.value)
	setBorrowerResidencyBasisType(e.target.value)
	if(e.target.value == "LivingRentFree")
		setBorrowerRentAmount("0")
	}

  const handleBorrowerRentAmount = (e) => {
	  console.log(e.target.value)
 	  setBorrowerRentAmount(e.target.value)
	  }

  const submitBorrowerResidencyBasisType = (e) => {
	  console.log("borrower rent amount", typeof BorrowerRentAmount)
	  	Object.assign(currentUser.borrower, {
			  residences: {
				BorrowerResidencyBasisType: BorrowerResidencyBasisType,
				BorrowerResidencyType: "Current",
				BorrowerRentAmount: BorrowerRentAmount || null,
			  }
		  })
		subtractTasksAmount()  
		updateUserInfo(currentUser, userToken);
		setHideBorrowerResidencyBasisTypeDropDown(true)
		}

  const handleFirstName = (e) => {
	  setFirstName(e.target.value)
  }

  const handleLastName = (e) => {
	setLastName(e.target.value)
}

const handleSuffix = (e) => {
	setSuffix(e)
}

  const submitConfirmFullLegalName = (e) => {
	  	Object.assign(currentUser.borrower, {
				firstName: firstName,
				lastName: lastName,
				suffix: suffix,
				nameConfirmed: true,
		  })
		subtractTasksAmount()   
		updateUserInfo(currentUser, userToken);
		setHideConfirmLegalNameDropDown(true)
		}

  const handleConfirmMailingAddress = (e) => {
	setConfirmMailingAddress(e.target.value)
  }

  const submitMailingAddress = (e) => {
		Object.assign(currentUser.borrower, {
				AddressType: confirmMailingAddress,
		})
		subtractTasksAmount() 
		updateUserInfo(currentUser, userToken);
		setHideConfirmMailingAddress(true)
		}		

  const handleAddCoborrower = (e) => {  
	setAddCoborrower(e.target.value)
  }

  const submitCoborrower = (e) => {
	Object.assign(currentUser, {
		coBorrower: {
			coBorrowerExists: addCoborrower,
		},
	})
	subtractTasksAmount() 
	updateUserInfo(currentUser, userToken);
  }

  const onFinish = async (values) => {
    console.log('onFinish values ', values);
  };

  useEffect(() => {
	console.log("currentUser", currentUser)
    // make api call first time u come to the page or do a browser reload
  }, [hideBorrowerResidencyBasisTypeDropDown]);

  const saveAndContinue = (currentUser, userToken) => {
    //send loanSelected to store and Database
    //action to send data

    updateUserInfo(currentUser, userToken);
    //update user model with loanAmountSelected
  };

  return (
    <SectionWrapper>
      <Container>
        <PricingArea>
          <InnerWrapper>
		  {(currentUser?.miscellaneous.tasksLeft !== 0) && (
		  <Heading
                content={"Let's get your application finished"}
                fontWeight="bold"
                {...title}
              />
			)}  
			{(currentUser?.miscellaneous.tasksLeft !== 0) && (
				 <Text
                  content="Now that you're pre-approved, we need some details to create your full application. 
				  If anything doesn't make sense, reach out and we can help."
                  {...description}
                />
			)} 
			{(currentUser?.miscellaneous.tasksLeft !== 0) && (
				<Text
                  content="Ready to complete"
                  {...description}
                />
			)} 	
			
			{(currentUser?.miscellaneous.tasksLeft === 0) && 
				currentUser?.loan.termsOfLoan.noteRatePercent && (
				<Heading
				content="Congratulations, your application has been submitted!  We'll reach out shortly for you to submit a few documents."
				{...title}
			  />
			)}	

			{(currentUser?.miscellaneous.tasksLeft === 0) && 
				!currentUser?.loan.termsOfLoan.noteRatePercent && (
				<Heading
				content="Please select your rate to finish your application"
				{...title}
			  />
			)}

            <Collapse /* activeKey={activePanel} */ 
					destroyInactivePanel={true} 
					expandIconPosition={"right"}>

			{!(currentUser?.borrower.residences) && (
              <Panel
                //showArrow={false}
                header="Add details about your living situation at 25661 Huron Street"
                key="1"
              >
                <p>How would you describe your living situation?</p>
				<li>
                  <span>
                    <label style={{ fontSize: '12px', cursor: 'pointer' }}>
                      <input
                        type="radio"
                        value="Own"
                        name="radio1"
                        id="radio1"
                        //style={{ visibility: 'hidden' }}
                        onChange={handleBorrowerResidencyBasisType}
                      />
                      <span>Own</span>
                    </label>
                  </span>
                </li>
				
                <li>
                  <label style={{ fontSize: '12px', cursor: 'pointer' }}>
                    <input
                      type="radio"
                      value="Rent"
                      name="radio1"
                      id="radio2"
                      //style={{ visibility: 'hidden' }}
                      onChange={handleBorrowerResidencyBasisType}
                    />
                    <span>Rent</span>
                  </label>
                </li>	

				{BorrowerResidencyBasisType == "Rent" && (
				<label style={{ fontSize: '12px', cursor: 'pointer' }}>
				<Form.Item
                    name="BorrowerRentAmount"
                    label="What is the current monthly rent payment?"
                    rules={[
                      {
                        required: true,
                        message: '*Required',
                      },
                    ]}
                  >
					<li>
                    <Input
                      autoComplete="new-password"
                      onChange={handleBorrowerRentAmount}
                    />
					</li>
                  </Form.Item>
				  </label>
				)}

				<li>
                  <label style={{ fontSize: '12px', cursor: 'pointer' }}>
                    <input
                      type="radio"
                      value="LivingRentFree"
					  label="Rent"
                      name="radio1"
                      id="radio3"
                      //style={{ visibility: 'hidden' }}
                      onChange={handleBorrowerResidencyBasisType}
                    />
                    <span>Live rent-free</span>
                  </label>
                </li>	
				<p></p>
				<li>
				<Button
              		type="primary"
              		title="Submit"
              		htmlType="submit"
              		{...button}
              		onClick={submitBorrowerResidencyBasisType}
            	></Button>
			</li>
			  </Panel>
			)}
			{!(currentUser?.borrower.declaration1) && (
              <Panel
                //showArrow={false}
                header="Confirm your occupancy intent for the property"
                key="3"
              >
                <p></p>
                <DeclarationsPage1SectionRedux setHideDeclarations1DropDown={setHideDeclarations1DropDown}></DeclarationsPage1SectionRedux>
              </Panel>
			  )}
			  {!(currentUser?.borrower.MaritalStatusType) && (
              <Panel
                //showArrow={false}
                header="Residency, marital, and military status"
                key="4"
              >
                <RefiResidencyMarriage setHideResidencyDropDown={setHideResidencyDropDown}></RefiResidencyMarriage>
              </Panel>
			  )}
			  {!(currentUser?.borrower.declaration2) && (
              <Panel
                //showArrow={false}
                header="Declarations relating to you" 
                key="6"
              >
				  <DeclarationsPage2SectionRedux setHideDeclarations2DropDown={setHideDeclarations2DropDown}></DeclarationsPage2SectionRedux>
              </Panel>
			  )}

			{!(currentUser?.borrower.nameConfirmed) && (
              <Panel
                //showArrow={false}
                header="Confirm your full legal name"
                key="7"
              >
				 {!(currentUser?.borrower.nameConfirmed) && (
                <p>We're asking this because this is the name that we'll include on all your documents, rather than a nickname. We just want to double-check that we've got everything right.</p>
				)}
				{!(currentUser?.borrower.nameConfirmed) && (
			  	<p>Please be sure to include your full middle name, not just the initial.</p>
				  )}

				{!(currentUser?.borrower.nameConfirmed) && (
				  <Form
                //{...formItemLayout}
                form={form}
                layout="vertical"
                name="verifyName"
                scrollToFirstError
                style={{ width: '60%' }}
              		>
				  <Form.Item
                      name="firstName"
                      label="Legal first name"
					  initialValue={currentUser?.borrower.firstName}
					  onChange={handleFirstName}
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
					  initialValue={currentUser?.borrower.lastName}
					  onChange={handleLastName}
                      rules={[
                        {
                          required: true,
                          message: '*Required',
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>

                    <Form.Item name="suffix" label="Suffix"
					
					initialValue={currentUser?.borrower.suffix}
					>
                      <Select 
					  	placeholder="Select" 
						allowClear
						onSelect={handleSuffix}
					>
                        <Option value="JR">Jr</Option>
                        <Option value="SR">Sr</Option>
                        <Option value="I">I</Option>
                        <Option value="II">II</Option>
                        <Option value="III">III</Option>
                        <Option value="IV">IV</Option>
                      </Select>
					  </Form.Item>
					  <Form.Item>
					  <Button
              				type="primary"
              				title="Submit"
              				htmlType="submit"
              				{...button}
              				onClick={submitConfirmFullLegalName}
            	></Button>
                </Form.Item>
					</Form>
					 )}
			  </Panel>
			  )}

			  {!(currentUser?.borrower.AddressType) && (
              <Panel 
			  	//showArrow={false} 
			  	header="Confirm mailing address" key="8">
                <p>Do you receive your mail at {currentUser?.borrower.addressLineText}?</p>
				<li>
                  <span>
                    <label style={{ fontSize: '12px', cursor: 'pointer' }}>
                      <input
                        type="radio"
                        value="Mailing"
                        name="radio1"
                        id="radio1"
                        //style={{ visibility: 'hidden' }}
                        onChange={handleConfirmMailingAddress}
                      />
                      <span>Yes</span>
                    </label>
                  </span>
				  &nbsp;
                  <label style={{ fontSize: '12px', cursor: 'pointer' }}>
                    <input
                      type="radio"
                      value="NotMailing"
                      name="radio1"
                      id="radio2"
                      //style={{ visibility: 'hidden' }}
                      onChange={handleConfirmMailingAddress}
                    />
                    <span>No</span>
                  </label>
                </li>	
				<p></p>
				<Button
              				type="primary"
              				title="Submit"
              				htmlType="submit"
              				{...button}
              				onClick={submitMailingAddress}
            	></Button>
			  </Panel>
			  )}

			{!(currentUser?.coBorrower) && (
              <Panel 
			  	//showArrow={false} 
				  header="Add a co-borrower" key="9">
                <p>If you’d like to add a co-borrower to your application, please do so now. You won’t be able to add one later without starting over.</p>
				<li>
                  <span>
                    <label style={{ fontSize: '12px', cursor: 'pointer' }}>
                      <input
                        type="radio"
                        value={true}
                        name="radio1"
                        id="radio1"
                        //style={{ visibility: 'hidden' }}
                        onChange={handleAddCoborrower}
                      />
                      <span>Yes</span>
                    </label>
                  </span>
				  &nbsp;
                  <label style={{ fontSize: '12px', cursor: 'pointer' }}>
                    <input
                      type="radio"
                      value={false}
                      name="radio1"
                      id="radio2"
                      //style={{ visibility: 'hidden' }}
                      onChange={handleAddCoborrower}
                    />
                    <span>No</span>
                  </label>
                </li>
				<p></p>
				<Button
              				type="primary"
              				title="Submit"
              				htmlType="submit"
              				{...button}
              				onClick={submitCoborrower}
            	></Button>				
              </Panel>
			   )}

			  {!(currentUser?.borrower.GOVERNMENT_MONITORING) && (
              <Panel
                //showArrow={false}
                header="Government Requested Information for Christopher Harris to monitor lender compliance with Fair Lending laws"
                key="10"
              >
                <AntEthnicityRaceGenderDropdownSectionRedux setHideEthnicityDropdrown={setHideEthnicityDropdrown}></AntEthnicityRaceGenderDropdownSectionRedux>
              </Panel>
			  )}
			  {!(currentUser?.borrower.Employment) && (
			  <Panel
                //showArrow={false}
                header="Employment information"
                key="11"
              >
				  <RefiEmploymentSectionRedux setHideEmploymentDropDown={setHideEmploymentDropDown}></RefiEmploymentSectionRedux>
              </Panel>
			  )}
            </Collapse>

			
            {/* <Button
              //type="primary"
              htmlType="submit"
              color="white"
              onClick={() => saveAndContinue(currentUser, userToken)}
              title="Continue"
              //{...button}
            ></Button> */}
          </InnerWrapper>
        </PricingArea>
      </Container>
    </SectionWrapper>
  );
};

TasksContainer.propTypes = {
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


  TasksContainer.defaultProps = {
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
	  fontSize: `${20}`,
	  fontWeight: '600',
	  //borderRadius: '4px',
	  pl: '22px',
	  pr: '22px',
	  colors: 'primaryWithBg',
	  style: { background: '#131176', color: 'white'},
	  height: `${10}`,
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
	  fontSize: ['18px', '28px', '32px', '32px', '37px'],
	  fontWeight: '400',
	  color: '#000000',
	  letterSpacing: '-0.025em',
	  mb: ['20px', '25px'],
	  lineHeight: '1.31',
	  textAlign: ['left', 'left'],
	},
	btnStyle: {
	  minWidth: '156px',
	  fontSize: '14px',
	  fontWeight: '500',
	},
	label: {
	  fontSize: '28px',
	},
  
	description: {
	  //content:
		//'We will use this information so that we can provide you with real, accurate loan options.',
	  fontSize: ['10px', '12px', '18px', '18px', '20px'],
	  fontWeight: '400',
	  color: '#525f7f',
	  lineHeight: '28px',
	  mb: ['25px', '25px', '30px', '30px', '45px'],
	  textAlign: 'left',
	},
  };
  
const mapStateToProps = ({ root: { currentUser } }) => ({
  currentUser: currentUser?.user,
  userToken: currentUser?.token,
});

const mapDispatchToProps = (dispatch) => {
  return {
    updateUserInfo: (currentUser, userToken) =>
      dispatch(updateUserInfo(currentUser, userToken)),
  };
};

const TasksContainerRedux = connect(
  mapStateToProps,
  mapDispatchToProps
)(TasksContainer);
export default TasksContainerRedux;
