import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { navigate } from 'gatsby';
import PropTypes from 'prop-types';
import Box from 'common/src/components/Box';
import {
  Form,
  Input,
  InputNumber,
  Radio,
  Tooltip,
  Cascader,
  Select,
  Row,
  Col,
  Checkbox,
  Button,
  AutoComplete,
} from 'antd';
import Text from 'common/src/components/Text';
import Heading from 'common/src/components/Heading';
//import Button from 'common/src/components/Button';
import UploadImage from 'common/src/components/Upload';
import FeatureBlock from 'common/src/components/FeatureBlock';
import Container from 'common/src/components/UI/Container';
import WebcamCapture from 'common/src/components/WebCam';
import Cleave from 'cleave.js/react';
import ContactFromWrapper, {
  SectionMainWrapper,
} from './IdentityVerifContainer.style';
import { updateUserInfo, sendFile } from '../../../../actions';

const { Option } = Select;

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

const RefiResidencyMarriage = ({
  sectionWrapper,
  row,
  contactForm,
  secTitleWrapper,
  button,
  note,
  title,
  description,
  currentUser,
  userToken,
  updateUserInfo,
  sendFile,
  setHideResidencyDropDown
}) => {
  const [state, setState] = useState('null');
  const [form] = Form.useForm();
  const [formValues, setFormValues] = useState();
  const [imageEmpty, setImageEmpty] = useState();
  const [renderContinueButton, setRenderContinueButton] = useState(false);
  const [CitizenshipResidencyType, setCitizenshipResidencyType] = useState(null);
  const [MaritalStatusType, setMaritalStatusType] = useState(false);
  const [DomesticRelationshipIndicator, setDomesticRelationshipIndicator] = useState(false);
  const [DomesticRelationshipType, setDomesticRelationshipType] = useState(null);
  const [SelfDeclaredMilitaryServiceIndicator, setSelfDeclaredMilitaryServiceIndicator] = useState(false);
  const [showVeteranServicesExpirationBox, setshowVeteranServicesExpirationBox] = useState(false);
  const [MilitaryStatusType, setMilitaryStatusType] = useState(null);

  const subtractTasksAmount = (e) => {
	Object.assign(	
		currentUser.miscellaneous, 
			{ 
				tasksLeft: currentUser.miscellaneous.tasksLeft -1,
			}
		)	
  }

  const triggerRenderUploadBox = () => {
    console.log('state', state);
    setState('renderUploadBox');
    console.log('in render upload');
    console.log('state', state);
  };

  const residencyOnChange = (value) => {
    setCitizenshipResidencyType(value);
    console.log('in residencyOnChange');
    console.log('CitizenshipResidencyType', CitizenshipResidencyType);
  };

  const MaritalStatusTypeOnChange = (value) => {
    console.log('MaritalStatusType', MaritalStatusType);
    setMaritalStatusType(value);
    console.log('in MaritalStatusTypeOnChange');
    console.log('MaritalStatusType', MaritalStatusType);
  };

  const DomesticRelationshipIndicatorOnChange = (e) => {
    setDomesticRelationshipIndicator(e.target.value);
  };

  const DomesticRelationshipTypeOnChange = (value) => {
    console.log('in MaritalStatusTypeOnChange');
    setDomesticRelationshipType(value);
    console.log('DomesticRelationshipType', DomesticRelationshipType);
  };

  const triggerRenderCameraBox = () => {
    console.log('state', state);
    setState('renderCameraBox');
    console.log('in render camera');
    console.log('state', state);
  };

  const handleArmedServicesChange = (e) => {
    setSelfDeclaredMilitaryServiceIndicator(e.target.checked);
    console.log('SelfDeclaredMilitaryServiceIndicator', SelfDeclaredMilitaryServiceIndicator);
  };

  const handleMilitaryStatusType = (e) => {
	  setMilitaryStatusType(e.target.value)
  }

  const handleVeteranServicesExpirationChange = (e) => {
    setshowVeteranServicesExpirationBox(e.target.checked);
    console.log(
      'showVeteranServicesExpirationBox',
      showVeteranServicesExpirationBox
    );
  };

  const handleChange = (field, value) => {
    console.log('got here==>>', field, 'vaa==>>', value);
    const newFormValues = {
      ...formValues,
      [field]: value,
    };
    //set state to detect if image is uploaded and rerender of needed
    if (value) {
      setImageEmpty(false);
      setRenderContinueButton(true);
    } else {
      setImageEmpty(true);
      setRenderContinueButton(false);
    }
    setFormValues(newFormValues);
  };

  //transform image to binary data (blob)
  function DataURIToBlob(dataURI) {
    const splitDataURI = dataURI.split(',');
    const byteString =
      splitDataURI[0].indexOf('base64') >= 0
        ? atob(splitDataURI[1])
        : decodeURI(splitDataURI[1]);
    const mimeString = splitDataURI[0].split(':')[1].split(';')[0];

    const ia = new Uint8Array(byteString.length);
    for (let i = 0; i < byteString.length; i++)
      ia[i] = byteString.charCodeAt(i);

    return new Blob([ia], { type: mimeString });
  }

  const onFinish = async (values) => {
	  console.log("values", values)
    console.log("maritcalrelationship type", values.DomesticRelationshipIndicator)
	if(currentUser.borrower.declaration1) {
		Object.assign(currentUser.borrower.declaration1, {
			CitizenshipResidencyType: values.CitizenshipResidencyType,
		})
	}
	else{
		Object.assign(currentUser.borrower, {
			declaration1: {
				CitizenshipResidencyType: values.CitizenshipResidencyType,
			}
		})
	}

	Object.assign(currentUser.borrower, {
		MaritalStatusType: values.MaritalStatusType,
	})

	if(values.DomesticRelationshipIndicator === true){
		console.log("in relationship type")
	Object.assign(currentUser.borrower, {
		DomesticRelationshipIndicator: values.DomesticRelationshipIndicator,
		DomesticRelationshipStateCode: values.DomesticRelationshipStateCode,
		DomesticRelationshipType: values.DomesticRelationshipType
	})}
	if(values.SelfDeclaredMilitaryServiceIndicator === true){
		console.log("in relationship type")
		Object.assign(currentUser.borrower, {
			SelfDeclaredMilitaryServiceIndicator: values.SelfDeclaredMilitaryServiceIndicator,
			MilitaryStatusType: MilitaryStatusType,
			MilitaryServiceExpectedCompletionDate : values.MilitaryServiceExpectedCompletionDate,
			SpousalVABenefitsIndicator: values.SpousalVABenefitsIndicator
		})}

    //validate governmentID upload, if not, render a require message and exit

    if (imageEmpty) {
      return;
    }
	console.log("currentUser marriage page sent", currentUser)
    //send ID type
	subtractTasksAmount()
	setHideResidencyDropDown(true)
    updateUserInfo(currentUser, userToken);

    /*   //send ID file
    console.log('Identity Verif: formValues', formValues.governmentID);
    const file = formValues.governmentID;
    sendFile(file, userToken, 'governmentID'); */

  };

  useEffect(() => {
    console.log('isImageEmpty', imageEmpty);
  });

  return (
   /*  <SectionMainWrapper> */
     /*  <Box {...sectionWrapper}> */
	 <div>
       {/*  <Container className="containerClass">
			 */}
          {/* <Box {...secTitleWrapper}>
            <FeatureBlock
              //title= {<Heading title="Just a few more steps until you're approved" />}
              title={<Heading {...title} />}
              description={<Text {...description} />}
            />
          </Box> */}
         {/*  <Box {...row}>
            <Box {...contactForm}> */}
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
                  <Form.Item
                    name="CitizenshipResidencyType"
                    label="What is your residency status?"
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
                      onChange={residencyOnChange}
                    >
                      <Option value="USCitizen">US Citizen</Option>
                      <Option value="PermanentResidentAlien">
                        US Permanent Resident
                      </Option>
                      <Option value="NonPermanentResidentAlien">
                        Non-permanent Resident Alien
                      </Option>
                    </Select>
                  </Form.Item>

                  {renderContinueButton && (
                    <Form.Item {...tailFormItemLayout}>
                      <Button type="primary" htmlType="submit" {...button}>
                        Continue
                      </Button>
                    </Form.Item>
                  )}
                </Form>
              </ContactFromWrapper>
              {/*                 
              {!renderContinueButton && (
              <Button
                onClick={() => triggerRenderUploadBox()}
                //{...button}
                title="Upload Image"
              />
              )}
 */}
              {/*             {!renderContinueButton && (
              <Button
                onClick={() => triggerRenderCameraBox()}
                //{...button}
                title="Take a photo"
              />
              )}
        */}

              {imageEmpty && (
                <p
                  style={{
                    //color: 'red',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  Please upload an image
                </p>
              )}

              {CitizenshipResidencyType === 'PermanentResidentAlien' && (
                <Text content={'Upload Green Card Front'} fontWeight="bold" />
              )}

              {CitizenshipResidencyType === 'PermanentResidentAlien' && (
                <UploadImage
                  onDrop={(val) => {
                    console.log(
                      'Image uploaded from image drop into handleChange',
                      val[0]
                    );
                    handleChange('greenCard', val[0]);
                  }}
                />
              )}

              {CitizenshipResidencyType === 'PermanentResidentAlien' && (
                <Text content={'Upload Green Card Back'} fontWeight="bold" />
              )}

              {CitizenshipResidencyType === 'PermanentResidentAlien' && (
                <UploadImage
                  onDrop={(val) => {
                    console.log(
                      'Image uploaded from image drop into handleChange',
                      val[0]
                    );
                    handleChange('greenCard', val[0]);
                  }}
                />
              )}

              {CitizenshipResidencyType === 'NonPermanentResidentAlien' && (
                <Text
                  content={'Upload EAD or Visa (Front)'}
                  fontWeight="bold"
                />
              )}
              {CitizenshipResidencyType === 'NonPermanentResidentAlien' && (
                <UploadImage
                  onDrop={(val) => {
                    console.log(
                      'Image uploaded from image drop into handleChange',
                      val[0]
                    );
                    handleChange('greenCard', val[0]);
                  }}
                />
              )}

              {CitizenshipResidencyType === 'NonPermanentResidentAlien' && (
                <Text content={'Upload EAD or Visa (Back)'} fontWeight="bold" />
              )}

              {CitizenshipResidencyType === 'NonPermanentResidentAlien' && (
                <UploadImage
                  onDrop={(val) => {
                    console.log(
                      'Image uploaded from image drop into handleChange',
                      val[0]
                    );
                    handleChange('greenCard', val[0]);
                  }}
                />
              )}

              {state === 'renderCameraBox' && (
                <WebcamCapture
                  onCapture={(val) => {
                    const file = DataURIToBlob(val);

                    const governmentIDFile = new File(
                      [file],
                      'governmentID.jpeg'
                    );
                    console.log(
                      'webcamVal into handlechange==>>',
                      governmentIDFile
                    );
                    handleChange('governmentID', governmentIDFile);
                  }}
                />
              )}
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
                  <Form.Item
                    name="MaritalStatusType"
                    label="Marital Status"
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
                      onChange={MaritalStatusTypeOnChange}
                    >
                      <Option value="Unmarried">
                        Unmarried (single, divorced, widowed, civil union,
                        domestic partnership, registered reciprocal beneficary
                        relationship)
                      </Option>
                      <Option value="Married">Married/spouse</Option>
                      <Option value="Seperated">Seperated</Option>
                    </Select>
                  </Form.Item>

                  {(MaritalStatusType === 'Seperated' ||
                    MaritalStatusType === 'Unmarried') && (
                    <Form.Item
                      name="DomesticRelationshipIndicator"
                      label="Is there a person who is not your legal spouse, but who currently has real property rights similar
					  to those of a legal spouse, as a result of a Civil Union, Domestic Partnership, or 
					  Registered Reciprocal Beneficiary Relationship?"
                      rules={[
                        {
                          required: true,
                          message: '*Required',
                        },
                      ]}
                    >
                      <Radio.Group
                        onChange={DomesticRelationshipIndicatorOnChange}
                      >
                        <Radio value={true}>Yes</Radio>
                        <Radio value={false}>No</Radio>
                      </Radio.Group>
                    </Form.Item>
                  )}

                  {DomesticRelationshipIndicator && (
                    <Form.Item
                      name="DomesticRelationshipType"
                      label="Relationship type"
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
                        onChange={DomesticRelationshipTypeOnChange}
                      >
                        <Option value="CivilUnion">Civil Union</Option>
                        <Option value="DomesticPartnership">
                          Domestic Partnership
                        </Option>
                        <Option value="RegisteredReciprocalBeneficiaryRelationship">
                          Registered Reciprocal Beneficiary Relationship
                        </Option>
                        <Option value="Other">Other</Option>
                      </Select>
                    </Form.Item>
                  )}

                  {DomesticRelationshipIndicator && (
                    <Form.Item
                      name="DomesticRelationshipStateCode"
                      label="State this union was formed"
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
                      >
                        <Option value="AL">AL</Option>
                        <Option value="AK">AK</Option>
                        <Option value="AZ">AZ</Option>
                        <Option value="AR">AR</Option>
                        <Option value="CA">CA</Option>
                        <Option value="CO">CO</Option>
                        <Option value="CT">CT</Option>
                        <Option value="DE">DE</Option>
                        <Option value="FL">FL</Option>
                        <Option value="GA">GA</Option>
                        <Option value="HI">HI</Option>
                        <Option value="ID">ID</Option>
                        <Option value="IL">IL</Option>
                        <Option value="IN">IN</Option>
                        <Option value="IA">IA</Option>
                        <Option value="KS">KS</Option>
                        <Option value="KY">KY</Option>
                        <Option value="LA">LA</Option>
                        <Option value="ME">ME</Option>
                        <Option value="MD">MD</Option>
                        <Option value="MA">MA</Option>
                        <Option value="MI">MI</Option>
                        <Option value="MN">MN</Option>
                        <Option value="MS">MS</Option>
                        <Option value="MO">MO</Option>
                        <Option value="MT">MT</Option>
                        <Option value="NE">NE</Option>
                        <Option value="NV">NV</Option>
                        <Option value="NH">NH</Option>
                        <Option value="NJ">NJ</Option>
                        <Option value="NM">NM</Option>
                        <Option value="NY">NY</Option>
                        <Option value="NC">NC</Option>
                        <Option value="ND">ND</Option>
                        <Option value="OH">OH</Option>
                        <Option value="OK">OK</Option>
                        <Option value="OR">OR</Option>
                        <Option value="PA">PA</Option>
                        <Option value="RI">RI</Option>
                        <Option value="SC">SC</Option>
                        <Option value="SD">SD</Option>
                        <Option value="TN">TN</Option>
                        <Option value="TX">TX</Option>
                        <Option value="UT">UT</Option>
                        <Option value="VT">VT</Option>
                        <Option value="VA">VA</Option>
                        <Option value="WA">WA</Option>
                        <Option value="WV">WV</Option>
                        <Option value="WI">WI</Option>
                        <Option value="WY">WY</Option>
                      </Select>
                    </Form.Item>
                  )}

                  <Form.Item
                    name="SelfDeclaredMilitaryServiceIndicator"
                    valuePropName="checked"
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
                      checked={SelfDeclaredMilitaryServiceIndicator}
                      onChange={handleArmedServicesChange}
                    >
                      Check this box if you (or your deceased spouse) ever
                      served, or are you currently serving in the United States
                      Armed Forces
                    </Checkbox>
                  </Form.Item>
					  
                  {SelfDeclaredMilitaryServiceIndicator && (
                    <Form.Item
                      name="MilitaryStatusType"
					  //value={"Veteran"}
                    >
						<Radio.Group buttonStyle="solid">
                      <Radio
                        value={"ActiveDuty"}
						onClick={handleMilitaryStatusType}
						style={{
							marginTop: '10px'
						}}
                      >
                        Currently serving on active duty with projected
                        expiration date of service/tour
                      </Radio>

					  {(MilitaryStatusType == "ActiveDuty") && (
                    <Form.Item
                      name="MilitaryServiceExpectedCompletionDate"
                      label="Projected expiration date of service/tour"
					  style={{
						marginTop: '10px'
						}}
                      rules={[
                        {
                          required: true,
                          message: '*Required',
                        },
                      ]}
                    >
                      <Cleave
                        className="ant-input"
                        placeholder="MM-DD-YYYY"
                        options={{ date: true, datePattern: ['m', 'd', 'Y'] }}
                      />
                    </Form.Item>
                  )}

					  <p></p>
					  <Radio value={"Veteran"} 
					  style={{
						  marginTop: '10px'
					  }}
					  	onClick={handleMilitaryStatusType}
					  >
                        Currently retired, discharged, or seperated from service
                      </Radio>
					  <p></p>
					  <Radio value={"ReservaNationalGuardNeverActivated"}
					  	onClick={handleMilitaryStatusType}
						  style={{
							marginTop: '10px'
						}}
						  >
                        Only period of service was a non-activated member of the
                        Reserve or National Guard
                      </Radio>
					  <p></p>
					  <Radio value={"SpousalVABenefitsIndicator"}
					  	onClick={handleMilitaryStatusType}
						  style={{
							marginTop: '10px'
						}}
					  >
						  Surviving Spouse</Radio>
					  </Radio.Group>
                    </Form.Item>
                  )}

                  <Form.Item {...tailFormItemLayout}>
                    <Button
                      //type="primary"
                      htmlType="submit"
                      {...button}
                    >
                      Submit
                    </Button>
                  </Form.Item>
                </Form>
              </ContactFromWrapper>
          {/*   </Box>
          </Box> */}
       {/*  </Container> */}
		</div>
     /*  </Box> */
    /* </SectionMainWrapper> */
  );
};

RefiResidencyMarriage.propTypes = {
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

RefiResidencyMarriage.defaultProps = {
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
    content: 'A couple more details about you to continue',
    fontSize: '16px',
    fontWeight: '400',
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
    sendFile: (file, userToken, route) =>
      dispatch(sendFile(file, userToken, route)),
  };
};

const RefiResidencyMarriageRedux = connect(
  mapStateToProps,
  mapDispatchToProps
)(RefiResidencyMarriage);

export default RefiResidencyMarriageRedux;
