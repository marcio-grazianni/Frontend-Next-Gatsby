import React, { useState } from 'react';
import { connect } from 'react-redux';
import { navigate } from 'gatsby';
import Cleave from "cleave.js/react";
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
import ContactFromWrapper, { SectionMainWrapper } from './contact.style';
import PropTypes from 'prop-types';
import Box from 'common/src/components/Box';
import Text from 'common/src/components/Text';
import Heading from 'common/src/components/Heading';
import Container from 'common/src/components/UI/Container';
import FeatureBlock from 'common/src/components/FeatureBlock';
import { updateUserInfo } from '../../../actions';

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



const AntMoreInfoSelect = ({
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
  loading
}) => {
  const [form] = Form.useForm();


  const onFinish = async (values) => {
    values["applicationStep"] = '/ethnicityRaceGender/';

    console.log('onFinish values ', values);

    userToken = JSON.parse(localStorage.getItem('jwt'));
    console.log('More User info: userToken', userToken);
    console.log("values", values.gender)
    currentUser.maritalStatus = values.maritalStatus;
    console.log("current user marital status", currentUser.maritalStatus)
    currentUser.incomeSource = values.incomeSource;
    currentUser.ownershipType = values.ownershipType;
    currentUser.socialSecurityNumberOrTIN = values.socialSecurityNumberOrTIN
    currentUser.applicationStep = 'ethnicityRaceGender';
    console.log('currentUser with ownership updates', currentUser);

    //showLoader();
    await updateUserInfo(currentUser, userToken);
  
    //hideLoader();
   
    navigate('/ethnicityRaceGender/');
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
              <ContactFromWrapper >
              
               
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
        name="maritalStatus"
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
        >
          <Option value="UNMARRIED">Unmarried</Option>
          <Option value="MARRIED/SPOUSE">Married/Spouse</Option>
          <Option value="CIVIL UNION">Civil Union</Option>
          <Option value="DOMESTIC PARTNERSHIP">Domestic Partnership</Option>

        </Select>
      </Form.Item>

      <Form.Item
        name="incomeSource"
        label="Income Source"
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
          <Option value="FULL-TIME">Full-Time employment</Option>
          <Option value="PART-TIME">Part-time employment</Option>
          <Option value="SELF-EMPLOYED">Self-employed</Option>
          <Option value="RETIRED">Retired</Option>
          <Option value="UNEMPLYED/FURLOUGHED">Unemployed/furloughed</Option>
          <Option value="ALIMONY, PUBLIC ASSISTANCE PROGRAM, CHILD SUPPORT, OR SEPERATE MAINTENANCE PAYMENTS">Alimony, public assistance program, child support, or seperate maintenance payments</Option>
        </Select>
      </Form.Item>


      <Form.Item
        name="ownershipType"
        label="Ownership Type"
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
          <Option value="SOLE OWNER">Sole Owner</Option>
          <Option value="JOINT OWNER">Joint Owner</Option>
          <Option value="TRUST">Trust</Option>
          <Option value="OTHER">Other</Option>


        </Select>
      </Form.Item>

      <Form.Item
        name="socialSecurityNumberOrTIN"
        label="Social security number or individual taxpayer identification number"
        rules={[
          {
            required: true,
            message: '*Required',
          },
        ]}
      >
        <Cleave
        className='ant-input'
        options={{  delimiters: ['-', '-'],
                    numericOnly: true,
                    uppercase: true,
                    blocks: [3, 2, 4]}}
        />
        
      </Form.Item>

      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit"
          {...button}
          >
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

AntMoreInfoSelect.propTypes = {
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

AntMoreInfoSelect.defaultProps = {
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
    content: "Just a few more things until you're approved!",
    fontSize: ['20px', '26px', '30px', '36px', '40px'],
    lineHeight: ['30px', '32px', '40px', '50px', '55px'],
    fontWeight: '700',
    color: '#32325d',
    letterSpacing: '-0.010em',
    mb: '20px',
    textAlign: ['center', 'center'],
  },

  description: {
    content: 'The federal government requests the below information to prevent discrimination. You are not required to provide the below information and it will not impact your application, approval, or rate.',
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
    };
  };
  
  const AntMoreInfoSelectRedux = connect(
    mapStateToProps,
    mapDispatchToProps
  )(AntMoreInfoSelect);
  
  export default AntMoreInfoSelectRedux;