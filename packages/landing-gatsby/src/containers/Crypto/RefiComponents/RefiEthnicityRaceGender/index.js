import React, { useState,useEffect } from 'react';
import { connect } from 'react-redux';
import { navigate } from 'gatsby';
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
import { CollisionsOverlap } from 'tsparticles/Options/Classes/Particles/Collisions/CollisionsOverlap';

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

const EthnicityRaceGenderDropdownSection = ({
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
  setHideEthnicityDropdrown
}) => {
  const [form] = Form.useForm();
  const [HMDAEthnicityType, setHMDAEthnicityType] = useState(null);
  const [HMDAEthnicityOriginType, setHMDAEthnicityOriginType] = useState(null);
  const [HMDARaceType, setHMDARaceType] = useState(null);
  const [hispanicOrLatinoDropdown, setHispanicOrLatinoDropdown] = useState(null);
  const [asianDropdown, setAsianDropdown] = useState(null);
  const [HMDARaceDesignationType, setHMDARaceDesignationType] = useState(null);
  const [nativeHawaianDropdown, setNativeHawaianDropdown] = useState(null);
  const [HMDAEthnicityRefusalIndicator, setHMDAEthnicityRefusalIndicator] = useState(null);
  const [HMDARaceRefusalIndicator, setHMDARaceRefusalIndicator] = useState(null);
  const [HMDAGenderType, setHMDAGenderType] = useState(null);
  const [HMDAGenderRefusalIndicator, setHMDAGenderRefusalIndicator] = useState(null);

  const subtractTasksAmount = (e) => {
	Object.assign(	
		currentUser.miscellaneous, 
			{ 
				tasksLeft: currentUser.miscellaneous.tasksLeft -1,
			}
		)	
  }

  const handleHispanicOrLatinoDropdown = (e) => {
	  console.log(e.target.checked)
	  setHispanicOrLatinoDropdown(e.target.checked)
	  if(e.target.checked === true){
		  console.log("in hispanic or latino")
		setHMDAEthnicityType("HispanicOrLatino")
		setHMDAEthnicityRefusalIndicator(false)
	   }
	  else(
		setHMDAEthnicityType(null)

	  ) 
  }

  const handleNotHispanicOrLatinoCheckbox = (e) => {
	  if(e.target.checked === true){
		setHMDAEthnicityType("NotHispanicOrLatino")
		setHMDAEthnicityRefusalIndicator(false)
	  }
	  else{
		setHMDAEthnicityType(null)
		setHMDAEthnicityOriginType(null)
	  }
  }

  const handleHispanicOrLatinoDoNotProvide = (e) => {
	if(e.target.checked === true){
	setHMDAEthnicityType(null)
	setHMDAEthnicityRefusalIndicator(e.target.value)
	}
	else{
		setHMDAEthnicityType(null)
		setHMDAEthnicityOriginType(null)
	}
  }
  const handleHMDAEthnicityOriginType = (e) => {
	  console.log("ethnicity", e.target.value)
	  if(e.target.checked === true){
		setHMDAEthnicityOriginType(e.target.value)
	  }
	  else{
		setHMDAEthnicityOriginType(null)
	  }
	}	

	const handleHMDARaceType = (e) => {
		if(e.target.checked === true){
		setHMDARaceType(e.target.value)
		setHMDARaceRefusalIndicator(false)
		}
		else{
			setHMDARaceType(null)
		}
	}	

  const handleAsianDropdown = (e) => {
	console.log(e.target.checked)
	if(e.target.checked === true){
		setHMDARaceType('Asian')
		setAsianDropdown(e.target.checked)
	}
	else{
		setAsianDropdown(e.target.checked)
		setHMDARaceType(null)
	}
}

  const handleHMDARaceDesignationType = (e) => {
	if(e.target.checked === true){
		setHMDARaceDesignationType(e.target.value)
		setHMDARaceRefusalIndicator(false)
	}
	else{
		setHMDARaceDesignationType(null)
	}
  }

  const handleHMDARaceRefusalIndicator = (e) => {
	setHMDARaceRefusalIndicator(true)
  }

const handleNativeHawaianDropdown = (e) => {
	console.log(e.target.checked)
	setHMDARaceType("NativeHawaiianOrOtherPacificIslander")
	setNativeHawaianDropdown(e.target.checked)
}

  const handleGender = (e) => {
	  setHMDAGenderType(e.target.value)
	  setHMDAGenderRefusalIndicator(false)
  }

  const genderDoNotProvide = (e) => {
	setHMDAGenderRefusalIndicator(true)
	setHMDAGenderType(null)
  }

  const onFinish = async (values) => {
	  console.log("values", HMDAEthnicityType)
	Object.assign(currentUser.borrower, {
		GOVERNMENT_MONITORING: {
			ApplicationTakenMethodType: "Internet",
			//Ethnicity
			HMDAEthnicityCollectedBasedOnVisualObservationOrSurnameIndicator: false,
			HMDAEthnicityType: HMDAEthnicityType, //HispanicOrLatino, InformationNotProvidedByApplicantInMailInternetOrTelephoneApplication, NotApplicable, NotHispanicOrLatino 
			HMDAEthnicityOriginType: HMDAEthnicityOriginType, //Cuban, Mexican, Other, PuertoRican
			HMDAEthnicityRefusalIndicator: HMDAEthnicityRefusalIndicator,
			//Race
			HMDARaceCollectedBasedOnVisualObservationOrSurnameIndicator: false,
			HMDARaceType: HMDARaceType,
			HMDARaceRefusalIndicator: HMDARaceRefusalIndicator,
			HMDARaceDesignationType: HMDARaceDesignationType,
			//Gender
			HMDAGenderType: HMDAGenderType, //Female, Male
			HMDAGenderRefusalIndicator: HMDAGenderRefusalIndicator,
			HMDAGenderCollectedBasedOnVisualObservationOrSurnameIndicator: false,
		}
	})
	console.log("currentUser", currentUser)
	subtractTasksAmount()
	setHideEthnicityDropdrown(true)
    updateUserInfo(currentUser, userToken);

    //hideLoader();

	
  };

  useEffect(() => {
	console.log("HMDAEthnicityOriginType", HMDAEthnicityOriginType)
	  }, [HMDAEthnicityOriginType]);

  return (
    /*   <SectionMainWrapper>
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
      <Text content={'What is your ethnicity?'} fontWeight="bold" />
      <Form.Item
        name="ethnicityHispanicOrLatino"
        valuePropName="checked"
        initialValue={false}
		
      >
        <Checkbox
			onChange={handleHispanicOrLatinoDropdown}
		>Hispanic or Latino?</Checkbox>
      </Form.Item>

	  {hispanicOrLatinoDropdown && (
      <Form.Item
        name="Mexican"
        valuePropName="checked"
        {...tailFormItemLayout}
      >
        <Checkbox
			onChange={handleHMDAEthnicityOriginType}
			value={"Mexican"}
		>Mexican</Checkbox>
      </Form.Item>
	  )}
	  
	   {hispanicOrLatinoDropdown && (
      <Form.Item
        name="ethnicityPuertoRican"
        valuePropName="checked"
        initialValue={false}
        {...tailFormItemLayout}
      >
        <Checkbox
		onChange={handleHMDAEthnicityOriginType}
		value={"PuertoRican"}>
			Puerto Rican</Checkbox>
      </Form.Item>
		)}

		{hispanicOrLatinoDropdown && (
      <Form.Item
        name="ethnicityCuban"
        valuePropName="checked"
        initialValue={false}
        {...tailFormItemLayout}
      >
        <Checkbox
		onChange={handleHMDAEthnicityOriginType}
		value={"Cuban"}>
			Cuban</Checkbox>
      </Form.Item>
		)}

	{hispanicOrLatinoDropdown && (
      <Form.Item
        name="ethnicityOtherHispanicOrLatino"
        valuePropName="checked"
        initialValue={false}
        {...tailFormItemLayout}
      >
        <Checkbox
			onChange={handleHMDAEthnicityOriginType}
			value={"Other"}>
				Other Hispanic or Latino</Checkbox>
      </Form.Item>
		)}


      <Form.Item
        name="ethnicityNotHispanicOrLatino"
        valuePropName="checked"
        initialValue={false}
      >
        <Checkbox
			onChange={handleNotHispanicOrLatinoCheckbox}>
				Not Hispanic or Latino</Checkbox>
      </Form.Item>

      <Form.Item
        name="ethnicityDoNotWishToProvide"
        valuePropName="checked"
        initialValue={false}
      >
        <Checkbox
			value={true}
			onChange={handleHispanicOrLatinoDoNotProvide}>
		I do not wish to provide this information</Checkbox>
      </Form.Item>

      <Text content={'What is your race?'} fontWeight="bold" />

      <Form.Item
        name="ethnicityAmericaIndianOrAlaskanNative"
        valuePropName="checked"
        initialValue={false}
      >
        <Checkbox
			onChange={handleHMDARaceType}
			value={"AmericanIndianOrAlaskaNative"}
			>American Indian or Alaskan Native</Checkbox>
      </Form.Item>

      <Form.Item
        name="ethnicityAsian"
        valuePropName="checked"
        initialValue={false}
      >
        <Checkbox
			onChange={handleAsianDropdown}
			>Asian</Checkbox>
      </Form.Item>

		{asianDropdown && (
      <Form.Item
        name="ethnicityChinese"
        valuePropName="checked"
        initialValue={false}
        {...tailFormItemLayout}
      >
        <Checkbox
		onChange={handleHMDARaceDesignationType}
		value="Chinese"
			>Chinese</Checkbox>
      </Form.Item>
		)}

	{asianDropdown && (
      <Form.Item
        name="ethnicityFilipino"
        valuePropName="checked"
        initialValue={false}
        {...tailFormItemLayout}
      >
        <Checkbox
			onChange={handleHMDARaceDesignationType}
			value="Filipino">
				Filipino</Checkbox>
      </Form.Item>
		)}

	{asianDropdown && (
      <Form.Item
        name="ethnicityJapanese"
        valuePropName="checked"
        initialValue={false}
        {...tailFormItemLayout}
      >
        <Checkbox
			onChange={handleHMDARaceDesignationType}
			value="Japanese">
		Japanese</Checkbox>
      </Form.Item>
		)}

	{asianDropdown && (
      <Form.Item
        name="ethnicityKorean"
        valuePropName="checked"
        initialValue={false}
        {...tailFormItemLayout}
      >
        <Checkbox
		onChange={handleHMDARaceDesignationType}
		value="Korean">
			Korean</Checkbox>
      </Form.Item>
		)}

		{asianDropdown && (
      <Form.Item
        name="ethnicityVietnamese"
        valuePropName="checked"
        initialValue={false}
        {...tailFormItemLayout}
      >
        <Checkbox
		onChange={handleHMDARaceDesignationType}
		value="Vietnamese">
			Vietnamese</Checkbox>
      </Form.Item>
			)}

	{asianDropdown && (
      <Form.Item
        name="ethnicityOtherAsian"
        valuePropName="checked"
        initialValue={false}
        {...tailFormItemLayout}
      >
        <Checkbox
		onChange={handleHMDARaceDesignationType}
		value="Chinese">
			Other Asian</Checkbox>
      </Form.Item>
			)}

      <Form.Item
        name="raceBlackOrAfricanAmerican"
        valuePropName="checked"
        initialValue={false}
      >
        <Checkbox
			onChange={handleHMDARaceType}
			value={"BlackOrAfricanAmerican"}>
				Black or African American</Checkbox>
      </Form.Item>

      <Form.Item
        name="raceNativeAmericanOrOtherPacificIslander"
        valuePropName="checked"
        initialValue={false}
      >
        <Checkbox
			onChange={handleNativeHawaianDropdown}
			>Native Hawaian or Other Pacific Islander</Checkbox>
      </Form.Item>

		{nativeHawaianDropdown && (
      <Form.Item
        name="ethnicityNativeHawaiian"
        valuePropName="checked"
        initialValue={false}
        {...tailFormItemLayout}
      >
        <Checkbox
			onChange={handleHMDARaceDesignationType}
			value="NativeHawaiian">
				Native Hawaiian</Checkbox>
      </Form.Item>
		)}

		{nativeHawaianDropdown && (
      <Form.Item
        name="ethnicityGuamanianOrChamorro"
        valuePropName="checked"
        initialValue={false}
        {...tailFormItemLayout}
      >
        <Checkbox
			onChange={handleHMDARaceDesignationType}
			value="GuamanianOrChamorro">
				Guamanian or Chamorro</Checkbox>
      </Form.Item>
		)}

		{nativeHawaianDropdown && (
      <Form.Item
        name="ethnicitySamoan"
        valuePropName="checked"
        initialValue={false}
        {...tailFormItemLayout}
      >
        <Checkbox
			onChange={handleHMDARaceDesignationType}
			value="Samoan">
				Samoan</Checkbox>
      </Form.Item>
		)}

		{nativeHawaianDropdown && (
      <Form.Item
        name="ethnicityOtherPacificIslander"
        valuePropName="checked"
        initialValue={false}
        {...tailFormItemLayout}
      >
        <Checkbox
			onChange={handleHMDARaceDesignationType}
			value="Other">
				Other Pacific Islander</Checkbox>
      </Form.Item>
		)}

      <Form.Item name="raceWhite" valuePropName="checked" initialValue={false}>
        <Checkbox
			onChange={handleHMDARaceDesignationType}
			value="NativeHawaiian">
				White</Checkbox>
      </Form.Item>

      <Form.Item
        name="raceDoNotProvide"
        valuePropName="checked"
        initialValue={false}
      >
        <Checkbox
			value={true}
			onChange={handleHMDARaceRefusalIndicator}
			>I do not wish to provide this information</Checkbox>
      </Form.Item>

      <Text content={'What is your sex?'} fontWeight="bold" />

      <Form.Item valuePropName="checked" initialValue={false}>
        <Checkbox
			value={"Male"}
			onChange={handleGender}>
				Male
			</Checkbox>
      </Form.Item>

      <Form.Item name="sexFemale" valuePropName="checked" initialValue={false}>
        <Checkbox
			value={"Female"}
			onChange={handleGender}>
				Female</Checkbox>
      </Form.Item>

      <Form.Item
        name="sexDoNotProvide"
        valuePropName="checked"
        initialValue={false}
      >
        <Checkbox
			value={true}
			onChange={genderDoNotProvide}>
				I do not wish to provide this information</Checkbox>
      </Form.Item>

      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit" {...button}>
          Continue
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

EthnicityRaceGenderDropdownSection.propTypes = {
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

EthnicityRaceGenderDropdownSection.defaultProps = {
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
    content:
      'The federal government requests the below information to prevent discrimination. You are not required to provide the below information and it will not impact your application, approval, or rate.',
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
  };
};

const AntEthnicityRaceGenderDropdownSectionRedux = connect(
  mapStateToProps,
  mapDispatchToProps
)(EthnicityRaceGenderDropdownSection);

export default AntEthnicityRaceGenderDropdownSectionRedux;
