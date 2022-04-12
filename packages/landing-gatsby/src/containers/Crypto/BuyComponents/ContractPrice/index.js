import React, { useEffect, useState } from 'react';
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
import { updateUserInfo } from '../../../../actions';
import Cleave from 'cleave.js/react';
import "cleave.js/dist/addons/cleave-phone.us";
// import styles from "./reasons.module.css"
import './reason.css';
//import { Radio } from 'antd';
import GoogleAddressSearch from '../../GoogleAutoComplete';

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

const ContractPrice = ({
  sectionWrapper,
  row,
  contactForm,
  secTitleWrapper,
  button,
  note,
  title,
  refiReasons,
  description,
  currentUser,
  updateUserInfo,
  userToken,
  showLoader,
  hideLoader,
  loading,
}) => {
  const [form] = Form.useForm();
  const [purchasePrice, setPurchasePrice] = useState(null);
  const [downPayment, setDownPayment] = useState(null);

  const handlePurchasePrice = (e) => {
    setPurchasePrice(purchasePrice)
  }

  const handleDownPayment = (e) => {
	  setDownPayment(downPayment)
  }
 
const onFinish = async () => {
	  Object.assign(
		 currentUser.loan.termsOfLoan,
		{
			purchasePrice: purchasePrice,
			downPayment: downPayment,
		}
	  )

    console.log('onFinish values ', currentUser);
    updateUserInfo(currentUser, userToken);
    navigate('/creditIncomeAssets');
  };
  useEffect(() => {
	  console.log("currentUser", currentUser)
    // make api call first time u come to the page or do a browser reload
  }, [currentUser]);

  //   require('./reasons.module.css');//
  return (
    <SectionMainWrapper>
      <Box {...sectionWrapper}>
        <Container>
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
                content={'What is the price of the new property?'}
                //fontWeight="bold"
                {...title}
              />
				<p></p>
            <Form.Item
              name="displayAmount"
              label="Purchase price"
              onChange={handlePurchasePrice}
              rules={[
                {
                  required: true,
                  message: '*Required',
                },
              ]}
            >
              <Cleave
                className="ant-input"
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
				<p></p>
			<Form.Item
              name="downPayment"
              label="Down payment"
              onChange={handleDownPayment}
              rules={[
                {
                  required: true,
                  message: '*Required',
                },
/* 				{
					type: 'integer',
            		min: 0,
					max: currentUser.loan.preApproval.preApprovalMaxDownPayment,
					message: "Your maximum down payment is " + currentUser.loan.preApproval.preApprovalDownPayment + " " + "based on your assets given"
				}, */
              ]}
            >
              <Cleave
                className="ant-input"
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
             
              <Form.Item {...tailFormItemLayout}>
                <p></p>
                <p></p>
                <div className="containerClassReasons">
                  <Button
                    type="primary"
                    title="Next"
                    htmlType="submit"
                    {...button}
                    onClick={onFinish}
                    disabled={
                      !downPayment ||
                      !purchasePrice
                    }
                  ></Button>
                </div>
              </Form.Item>
              {/*  <li>
				<Button
				title={'Next'}
				onClick={onFinish}
				/>
</li> */}
            </Form>
          </Box>
        </Container>
      </Box>
    </SectionMainWrapper>
  );
};

ContractPrice.propTypes = {
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

ContractPrice.defaultProps = {
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
    fontSize: ['18px', '28px', '32px', '32px', '37px'],
    fontWeight: '400',
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
      'We will use this information so that we can provide you with real, accurate loan options.',
    fontSize: ['10px', '12px', '18px', '18px', '20px'],
    fontWeight: '400',
    color: '#525f7f',
    lineHeight: '28px',
    mb: ['25px', '25px', '30px', '30px', '45px'],
    //textAlign: ['center', 'center'],
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

const ContractPriceRedux = connect(
  mapStateToProps,
  mapDispatchToProps
)(ContractPrice);

export default ContractPriceRedux;
