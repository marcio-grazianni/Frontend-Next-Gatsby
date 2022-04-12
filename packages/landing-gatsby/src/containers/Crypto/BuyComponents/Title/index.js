import React, { useState } from 'react';
import { connect } from 'react-redux';
import { navigate } from 'gatsby';
import { useStaticQuery, graphql } from 'gatsby';
//import 'antd/dist/antd.css';
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
  /* Button, */
  AutoComplete,
} from 'antd';
import ContactFromWrapper, { SectionMainWrapper } from '../../contact.style';
import Button from 'common/src/components/Button';
import PropTypes from 'prop-types';
import Box from 'common/src/components/Box';
import Text from 'common/src/components/Text';
import Heading from 'common/src/components/Heading';
import Container from 'common/src/components/UI/Container';
import FeatureBlock from 'common/src/components/FeatureBlock';
import { updateUserInfo } from '../../../../actions';
import RadioGroup from 'common/src/components/RadioGroup';
import Radio from 'common/src/components/Radio';
import Cleave from 'cleave.js/react';
// import styles from "./reasons.module.css"
import './buyProcess.css';
//import { Radio } from 'antd';

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

const TitleComponent = ({
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
  const [elseOnTitle, setElseOnTitle] = useState(false);
  const [coBorrower, setCoBorrower] = useState(false);
  const [addCoBorrowerSocialNow, setAddCoBorrowerSocialNow] = useState(false);

  const handleElseOnTitle = (e) => {
    console.log('else on title', e.target.value);
    setElseOnTitle(e.target.value);
  };

  const handleCoBorrower = (e) => {
    console.log('coBorrower', e.target.value);
    setCoBorrower(e.target.value);
  };

  const handleAddCoBorrowerSocialNow = (e) => {
    console.log('add social?', e.target.value);
    setAddCoBorrowerSocialNow(e.target.value);
  };

  const onFinish = async (value) => {

		updateUserInfo(currentUser, userToken);
	
    if(addCoBorrowerSocialNow == "true" && coBorrower == "true"){
		navigate('/buy-pages/addCoBorrower/')
	}
	else {
		navigate('/buy-pages/ownHomeOrOtherRealEstate/');
	}
  };

  React.useEffect(() => {
    setElseOnTitle(elseOnTitle);
    console.log(elseOnTitle);
  }, [elseOnTitle]);
  //   require('./reasons.module.css');//
  return (
    <SectionMainWrapper>
      <Box {...sectionWrapper}>
        <Container className="containerClassBuyProcess">
          <Box {...row}>
            <Form
              //{...formItemLayout}
              form={form}
              layout="vertical"
              name="register"
              onFinish={onFinish}
              scrollToFirstError
              style={{ width: '90%' }}
            >
              <Heading
                content={'Do you want anyone else to own the home with you?'}
                fontWeight="bold"
                {...title}
              />

				<Text
                    content={
                      'Somoene else can own the home with you, without having responsiblity for the loan.'
                    }
                    //fontWeight="bold"
                  />

              <div className="containerClassReasons">
                <li>
                  <span>
                    <label style={{ fontSize: '19px', cursor: 'pointer' }}>
                      <input
                        type="radio"
                        value="true"
                        name="radio"
                        id="radio1"
                        style={{ visibility: 'hidden' }}
                        onChange={handleElseOnTitle}
                      />
                      <span>Yes</span>
                    </label>
                  </span>
                </li>

                <li>
                  <label style={{ fontSize: '19px', cursor: 'pointer' }}>
                    <input
                      type="radio"
                      value="false"
                      name="radio"
                      id="radio2"
                      style={{ visibility: 'hidden' }}
                      onChange={handleElseOnTitle}
                    />
                    <span>No</span>
                  </label>
                </li>
                <p></p>
              </div>

              {elseOnTitle == 'true' && (
                <div className="homeValue">
                  <Heading
                    content={"Would you like to add them as a co-borrower?"}
                    fontWeight="bold"
                    {...title}
                  />
				
				<Text
                    content={
                      "This means your assets and income will be counted together. If you want to remove a co-borrower later, you'll have to start a new application"
                    }
                    //fontWeight="bold"
                  />

                  <div className="containerClassReasons">
                <li>
                  <span>
                    <label style={{ fontSize: '19px', cursor: 'pointer' }}>
                      <input
                        type="radio"
                        value="true"
                        name="radio1"
                        id="radio1"
                        style={{ visibility: 'hidden' }}
                        onChange={handleCoBorrower}
                      />
                      <span>Yes</span>
                    </label>
                  </span>
                </li>
             

                <li>
                  <label style={{ fontSize: '19px', cursor: 'pointer' }}>
                    <input
                      type="radio"
                      value="false"
                      name="radio1"
                      id="radio2"
                      style={{ visibility: 'hidden' }}
                      onChange={handleCoBorrower}
                    />
                    <span>No</span>
                  </label>
                </li>	
				<p></p>			
              	</div>
                </div>
              )}

				{elseOnTitle == 'true' && coBorrower == 'true' && (
                <div className="homeValue">
                  <Heading
                    content={"Are you ready to enter their Social Security Number now?"}
                    fontWeight="bold"
                    {...title}
                  />
                  <div className="containerClassReasons">
                <li>
                  <span>
                    <label style={{ fontSize: '19px', cursor: 'pointer' }}>
                      <input
                        type="radio"
                        value="true"
                        name="radio2"
                        id="radio1"
                        style={{ visibility: 'hidden' }}
                        onChange={handleAddCoBorrowerSocialNow}
                      />
                      <span>Yes</span>
                    </label>
                  </span>
                </li>

                <li>
                  <label style={{ fontSize: '19px', cursor: 'pointer' }}>
                    <input
                      type="radio"
                      value="false"
                      name="radio2"
                      id="radio2"
                      style={{ visibility: 'hidden' }}
                      onChange={handleAddCoBorrowerSocialNow}
                    />
                    <span>No</span>
                  </label>
                </li>
              	</div>
                </div>
              )}

              <Form.Item {...tailFormItemLayout}>
                <p></p>
                <div className="containerClassBuyProcess">
                  <Button
                    type="primary"
                    title="Next"
                    htmlType="submit"
                    {...button}
                    onClick={onFinish}
                    disabled={!elseOnTitle}
                  ></Button>
                </div>
              </Form.Item>
            </Form>
          </Box>
        </Container>
      </Box>
    </SectionMainWrapper>
  );
};

TitleComponent.propTypes = {
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

TitleComponent.defaultProps = {
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
    fontSize: ['26px', '34px', '42px', '42px', '42px'],
    fontWeight: '500',
    color: '#000000',
    letterSpacing: '-0.025em',
    mb: ['20px', '25px'],
    lineHeight: '1.31',
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
    content:
      "This means your assets and income will be counted together. If you want to remove a co-borrower later, you'll have to start a new application",
    fontSize: '16px',
    fontWeight: '400',
    color: '#525f7f',
    lineHeight: '28px',
    mb: ['25px', '25px', '30px', '30px', '45px'],
    /* textAlign: ['center', 'center'], */
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

const TitleComponentRedux = connect(
  mapStateToProps,
  mapDispatchToProps
)(TitleComponent);

export default TitleComponentRedux;
