import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { navigate } from 'gatsby';
import PropTypes from 'prop-types';
import Box from 'common/src/components/Box';
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
  Button as AntButton,
  AutoComplete,
} from 'antd';
import Text from 'common/src/components/Text';
import Heading from 'common/src/components/Heading';
import Button from 'common/src/components/Button';
import UploadImage from 'common/src/components/Upload';
import FeatureBlock from 'common/src/components/FeatureBlock';
import Container from 'common/src/components/UI/Container';
import WebcamCapture from 'common/src/components/WebCam';

import ContactFromWrapper, {
  SectionMainWrapper,
} from './IdentityVerifContainer.style';
import { updateUserInfo, sendFile } from '../../../actions';

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

export const idType = [
  {
    label: "US Driver's License",
    value: "US DRIVER'S LICENSE",
  },
  {
    label: 'US Passport',
    value: 'US PASSPORT',
  },
];

const IdentityVerif = ({
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
}) => {
  const [state, setState] = useState('null');
  const [form] = Form.useForm();
  const [formValues, setFormValues] = useState();
  const [imageEmpty, setImageEmpty] = useState();
  const [renderContinueButton, setRenderContinueButton] = useState(false);

  const triggerRenderUploadBox = () => {
    console.log('state', state);
    setState('renderUploadBox');
    console.log('in render upload');
    console.log('state', state);
  };

  const triggerRenderCameraBox = () => {
    console.log('state', state);
    setState('renderCameraBox');
    console.log('in render camera');
    console.log('state', state);
  };

  const handleChange = (field, value) => {
    console.log('got here==>>', field, 'vaa==>>', value);
    const newFormValues = {
      ...formValues,
      [field]: value,
    };
    //set state to detect if image is uploaded and rerender of needed
    if (value) {
      setImageEmpty(false)
      setRenderContinueButton(true)
    } else {
      setImageEmpty(true)
      setRenderContinueButton(false)

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
    values["applicationStep"] = '/linkAccounts/';

    //validate governmentID upload, if not, render a require message and exit
    
    if (imageEmpty) {
      return;
    }

    //get token
    userToken = JSON.parse(localStorage.getItem('jwt'));
    console.log('Identity Verif: userToken', userToken);
    
    //set Values of this page into currentUser
    currentUser = currentUser.user
    currentUser.idType = values.idType;
    currentUser.applicationStep = '/linkAccounts/';
    console.log('Identity Verif: currentUser with ID updates', currentUser);

    //send ID type
    updateUserInfo(currentUser, userToken);
  
    //send ID file
    console.log("Identity Verif: formValues", formValues.governmentID)  
    const file = formValues.governmentID
    sendFile(file, userToken, 'governmentID')

    navigate('/linkAccounts/');
  };


  useEffect(() => {
    console.log("isImageEmpty", imageEmpty)
  })

  return (
    <SectionMainWrapper>
      <Box {...sectionWrapper}>
        <Container className="containerClass">
          <Box {...secTitleWrapper}>
            <FeatureBlock
              //title= {<Heading title="Just a few more steps until you're approved" />}
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
                  style={{width:'60%'}}
                >      
                  <Form.Item
                    name="idType"
                    label="ID type"
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
                    <Option value="usDriversLicense">US drivers license</Option>
                    <Option value="passport">US passport</Option>
                  </Select>
                  </Form.Item>
                  
                  {renderContinueButton && (
                  <Form.Item {...tailFormItemLayout}>
                  <AntButton type="primary" htmlType="submit"
                    {...button}
                  >
                  Continue
          
                    </AntButton>
                  </Form.Item>
                  )}
                  </Form>  
              </ContactFromWrapper>
                     
              {!renderContinueButton && (
              <Button
                onClick={() => triggerRenderUploadBox()}
                //{...button}
                title="Upload Image"
              />
              )}

              {!renderContinueButton && (
              <Button
                onClick={() => triggerRenderCameraBox()}
                //{...button}
                title="Take a photo"
              />
              )}
               <p>

               </p>
               {imageEmpty && (
                      <p style={{ 
						  //color: 'red', 
						  justifyContent: "center", alignItems: "center" }}>Please upload an image</p>
                      )}

              {state === 'renderUploadBox' && (
                <UploadImage
                  onDrop={(val) => {
                    console.log('Image uploaded from image drop into handleChange', val[0]);
                    handleChange('governmentID', val[0]);
                  }}
                />
              )}
              <p>
                
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
              </p>
            </Box>
          </Box>
        </Container>
      </Box>
    </SectionMainWrapper>
  );
};

IdentityVerif.propTypes = {
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

IdentityVerif.defaultProps = {
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
    content: 'Verify your identity',
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
      "Let's upload a picture of your ID.  If taking a picture, hold your hands steady and use adequate light",
    fontSize: '16px',
    fontWeight: '400',
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
    sendFile: (file, userToken, route) => dispatch(sendFile(file, userToken, route)),
  };
};

const IdentityVerifRedux = connect(
  mapStateToProps,
  mapDispatchToProps
)(IdentityVerif);

export default IdentityVerifRedux;
