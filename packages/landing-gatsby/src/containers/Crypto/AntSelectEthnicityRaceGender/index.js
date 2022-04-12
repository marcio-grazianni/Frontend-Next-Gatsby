import React, { useState } from 'react';
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
}) => {
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    values['applicationStep'] = '/moreUserInfo/';

    console.log('onFinish values ', values);

    userToken = JSON.parse(localStorage.getItem('jwt'));
    console.log('More User info: userToken', userToken);
    console.log('values.gender.value', values.gender);
    currentUser.gender = values.gender;
    console.log('current user gender', currentUser.gender);
    currentUser.ethnicity = values.ethnicity;
    currentUser.race = values.race;
    currentUser.applicationStep = '/finalApplicationCheck/';
    console.log('currentUser with ownership updates', currentUser);

    //showLoader();
    updateUserInfo(currentUser, userToken);

    //hideLoader();

    navigate('/finalApplicationCheck/');
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
                  <Text content={'What is your ethnicity?'} fontWeight="bold" />
                  <Form.Item
                    name="agreement"
                    valuePropName="ethnicityHispanicOrLatino"
                  >
                    <Checkbox>Hispanic or Latino?</Checkbox>
                  </Form.Item>

                  <Form.Item
                    name="agreement"
                    valuePropName="EthnicityDoNotWishToProvide"
                    {...tailFormItemLayout}
                  >
                    <Checkbox>Mexican</Checkbox>
                  </Form.Item>

                  <Form.Item
                    name="agreement"
                    valuePropName="ethnicityPuertoRican"
                    {...tailFormItemLayout}
                  >
                    <Checkbox>Puerto Rican</Checkbox>
                  </Form.Item>

                  <Form.Item
                    name="agreement"
                    valuePropName="ethnicityCuban"
                    {...tailFormItemLayout}
                  >
                    <Checkbox>Cuban</Checkbox>
                  </Form.Item>

                  <Form.Item
                    name="agreement"
                    valuePropName="ethnicityOtherHispanicOrLatino"
                    {...tailFormItemLayout}
                  >
                    <Checkbox>Other Hispanic or Latino</Checkbox>
                  </Form.Item>

                  <Form.Item
                    name="agreement"
                    valuePropName="ethnicityPuertoRican"
                  >
                    <Checkbox>Not Hispanic or Latino</Checkbox>
                  </Form.Item>

                  <Form.Item
                    name="agreement"
                    valuePropName="EthnicityDoNotWishToProvide"
                  >
                    <Checkbox>
                      I do not wish to provide this information
                    </Checkbox>
                  </Form.Item>

                  <Text content={'What is your race?'} fontWeight="bold" />

                  <Form.Item
                    name="agreement"
                    valuePropName="EthnicityDoNotWishToProvide"
                  >
                    <Checkbox>American Indian or Alaskan Native</Checkbox>
                  </Form.Item>

                  <Form.Item name="agreement" valuePropName="ethnicityAsian">
                    <Checkbox>Asian</Checkbox>
                  </Form.Item>

                  <Form.Item
                    name="agreement"
                    valuePropName="ethnicityChinese"
                    {...tailFormItemLayout}
                  >
                    <Checkbox>Chinese</Checkbox>
                  </Form.Item>

                  <Form.Item
                    name="agreement"
                    valuePropName="ethnicityFilipino"
                    {...tailFormItemLayout}
                  >
                    <Checkbox>Filipino</Checkbox>
                  </Form.Item>

                  <Form.Item
                    name="agreement"
                    valuePropName="ethnicityJapanese"
                    {...tailFormItemLayout}
                  >
                    <Checkbox>Japanese</Checkbox>
                  </Form.Item>

                  <Form.Item
                    name="agreement"
                    valuePropName="ethnicityKorean"
                    {...tailFormItemLayout}
                  >
                    <Checkbox>Korean</Checkbox>
                  </Form.Item>

                  <Form.Item
                    name="agreement"
                    valuePropName="ethnicityVietnamese"
                    {...tailFormItemLayout}
                  >
                    <Checkbox>Vietnamese</Checkbox>
                  </Form.Item>

                  <Form.Item
                    name="agreement"
                    valuePropName="ethnicityOtherAsian"
                    {...tailFormItemLayout}
                  >
                    <Checkbox>Other Asian</Checkbox>
                  </Form.Item>

                  <Form.Item
                    name="agreement"
                    valuePropName="raceBlackOrAfricanAmerican"
                  >
                    <Checkbox>Black or African American</Checkbox>
                  </Form.Item>

                  <Form.Item
                    name="agreement"
                    valuePropName="raceNativeAmericanOrOtherPacificIslander"
                  >
                    <Checkbox>
                      Native Hawaian or Other Pacific Islander
                    </Checkbox>
                  </Form.Item>

                  <Form.Item
                    name="agreement"
                    valuePropName="ethnicityNativeHawaiian"
                    {...tailFormItemLayout}
                  >
                    <Checkbox>Native Hawaiian</Checkbox>
                  </Form.Item>

                  <Form.Item
                    name="agreement"
                    valuePropName="ethnicityGuamanianOrChamorro"
                    {...tailFormItemLayout}
                  >
                    <Checkbox>Guamanian or Chamorro</Checkbox>
                  </Form.Item>

                  <Form.Item
                    name="agreement"
                    valuePropName="ethnicitySamoan"
                    {...tailFormItemLayout}
                  >
                    <Checkbox>Samoan</Checkbox>
                  </Form.Item>

                  <Form.Item
                    name="agreement"
                    valuePropName="ethnicityOtherPacificIslander"
                    {...tailFormItemLayout}
                  >
                    <Checkbox>Other Pacific Islander</Checkbox>
                  </Form.Item>

                  <Form.Item name="agreement" valuePropName="raceWhite">
                    <Checkbox>White</Checkbox>
                  </Form.Item>

                  <Form.Item name="agreement" valuePropName="raceDoNotProvide">
                    <Checkbox>
                      I do not wish to provide this information
                    </Checkbox>
                  </Form.Item>

                  <Text content={'What is your sex?'} fontWeight="bold" />

                  <Form.Item name="agreement" valuePropName="sexMale">
                    <Checkbox>Male</Checkbox>
                  </Form.Item>

                  <Form.Item name="agreement" valuePropName="sexFemale">
                    <Checkbox>Female</Checkbox>
                  </Form.Item>

                  <Form.Item name="agreement" valuePropName="sexDoNotProvide">
                    <Checkbox>
                      I do not wish to provide this information
                    </Checkbox>
                  </Form.Item>

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
  currentUser: state.root.currentUser,
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
