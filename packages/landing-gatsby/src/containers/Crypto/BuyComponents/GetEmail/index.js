import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Cleave from 'cleave.js/react';
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
  Radio,
} from 'antd';
//import Button from 'common/src/components/Button';
import ContactFromWrapper, { SectionMainWrapper } from '../../contact.style';
//import ContentWrapper from '../contact.style';

import PropTypes from 'prop-types';
import Box from 'common/src/components/Box';
import Text from 'common/src/components/Text';
import Heading from 'common/src/components/Heading';
import Container from 'common/src/components/UI/Container';
import FeatureBlock from 'common/src/components/FeatureBlock';
import {
  createUsers,
  getUser,
  showLoader,
  hideLoader,
} from '../../../../actions';

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

const GetEmail = ({
  sectionWrapper,
  row,
  contactForm,
  secTitleWrapper,
  button,
  note,
  title,
  description,
  createUsers,
  showLoader,
  hideLoader,
  loading,
}) => {
  const [form] = Form.useForm();
  const [formSubmitted, setFormSubmitted] = useState(false);

  const onFinish = async (values) => {
    console.log('onFinish values ', values);
    values['financingPurpose'] = JSON.parse(
      localStorage.getItem('financingPurpose')
    );
    values['propertyType'] = JSON.parse(localStorage.getItem('propertyType'));
	values['statedPropertyValue'] = JSON.parse(localStorage.getItem('statedPropertyValue'));

    console.log('onFinish values ', values);
	//create object from local storage (becuase currentUser doesnt exist yet)
	var updateObject = {
		subjectProperty: {
			address: {
				addressLineText: JSON.parse(localStorage.getItem('propertyAddress')),
				addressUnitIdentifier: JSON.parse(localStorage.getItem('addressUnitIdentifier')),
				cityName: JSON.parse(localStorage.getItem('city')),
				stateCode: JSON.parse(localStorage.getItem('state')),
				postalCode: JSON.parse(localStorage.getItem('postalCode')),
			},
			propertyDetail: {
				propertyUsageType: JSON.parse(localStorage.getItem('propertyUsageType')),
				propertyType: JSON.parse(localStorage.getItem('propertyType')),

			}
		},
		loan: {
			termsOfLoan: {
				loanPurposeType: JSON.parse(localStorage.getItem('loanPurposeType')),
			}
		},
		miscellaneous: {
			applicationStep: '/buy-pages/tellUsAboutYourself/',
			whereInProcess: JSON.parse(localStorage.getItem('whereInProcess')),
			whenPlanToPurchase: JSON.parse(localStorage.getItem('whenPurchase')),
			realEstateAgent: {
				firstName: JSON.parse(localStorage.getItem('RealEstateAgentFirstName')),
				lastName: JSON.parse(localStorage.getItem('RealEstateAgentLastName')),
				email: JSON.parse(localStorage.getItem('RealEstateAgentEmail')),
				contactPointTelephoneValue: JSON.parse(localStorage.getItem('RealEstateAgentContactPointTelephoneValue')),
			},
		},
		email: values.email

	}
	console.log('onFinish values ', updateObject);
	//send object
    createUsers(updateObject);
    navigate('/buy-pages/tellUsAboutYourself/');
  };

  useEffect(() => {
    const now = new Date();

    //   read date from local storage
    const saved_item_str = localStorage.getItem('data');
    console.log('Saved Item', saved_item_str);
    if (saved_item_str) {
      const saved_item = JSON.parse(saved_item_str);
    }

    //   const item = {
    // 	address: "test address",
    // 	expirty: now.getTime() + 3600
    //   }

    //   localStorage.setItem("data", JSON.stringify(item));
    //   console.log("Just save");
  }, []); // <-- empty dependency array

  return (
    <SectionMainWrapper>
      <Box {...sectionWrapper}>
        <Container className="containerClass">
          <Box {...secTitleWrapper}>
          <Box {...row}>
            <Box {...contactForm}>
              <ContactFromWrapper>
                <Form
                  //{...formItemLayout}
                  form={form}
                  layout="vertical"
                  name="propertyAddress"
                  onFinish={onFinish}
                  scrollToFirstError
                  style={{ width: '80%' }}
                >
                  <Heading
                    content={'Your rates are almost ready'}
                    fontWeight="bold"
                    {...title}
                  />
                  <Text
                    content={
                      'Enter your email address to save your progress, then continue to see your rates'
                    }
                    fontWeight="bold"
                    {...description}
                  />

                  <Form.Item
                    name="email"
                    label="E-mail"
                    rules={[
                      {
                        type: 'email',
                        message: 'Please enter a valid E-mail',
                      },
                      {
                        required: true,
                        message: 'Please input your E-mail',
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item {...tailFormItemLayout}>
                    <Button
                      //type="submit" or "primary" not sure
                      htmlType="submit"
                      color="white"
                      /* onClick={onFinish} */
                      title="Continue"
                      {...button}
                    >
                      Continue
                    </Button>
                  </Form.Item>
                </Form>
              </ContactFromWrapper>
            </Box>
          </Box>
		  </Box>
        </Container>
      </Box>
    </SectionMainWrapper>
  );
};

GetEmail.propTypes = {
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

GetEmail.defaultProps = {
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
    content: 'Your rates are almost ready',
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
      'Enter your email address to save your progress, then continue to see your rates',
    fontSize: '16px',
    fontWeight: '400',
    color: '#525f7f',
    lineHeight: '28px',
    mb: ['25px', '25px', '30px', '30px', '45px'],
    textAlign: ['center', 'center'],
  },
};

const mapStateToProps = ({ root: { currrentUser, loading } }) => ({
  currrentUser,
  loading,
});

const mapDispatchToProps = (dispatch) => {
  return {
    createUsers: (formVals) => dispatch(createUsers(formVals)),
    getUser: (userId) => dispatch(getUser(userId)),
    showLoader: () => dispatch(showLoader()),
    hideLoader: () => dispatch(hideLoader()),
  };
};

const GetEmailRedux = connect(mapStateToProps, mapDispatchToProps)(GetEmail);

export default GetEmailRedux;
