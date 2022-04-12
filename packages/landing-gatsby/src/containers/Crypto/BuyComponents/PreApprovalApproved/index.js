import React, { Fragment, useState } from 'react';
import { navigate } from 'gatsby';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Box from 'common/src/components/Box';
import Text from 'common/src/components/Text';
import Heading from 'common/src/components/Heading';
import Button from 'common/src/components/Button';
import FeatureBlock from 'common/src/components/FeatureBlock';
import Container from 'common/src/components/UI/Container';
import BannerBG from 'common/src/assets/image/crypto/white_bg1.svg';
//import BannerBG from 'common/src/assets/image/crypto/shutterstock_1106309045.jpg';
//import BannerBG from 'common/src/assets/image/crypto/1888500697-huge.jpg';
//import BannerBG from 'common/src/assets/image/crypto/shutterstock_658946836.jpg';
import BannerWrapper, { BgImageWrapper } from './bannerSection.style';
import { SectionMainWrapper } from '../../contact.style';

import { updateUserInfo } from '../../../../actions';
import PreApprovalLetter from 'common/src/assets/image/PreApprovalLetter-1.png';
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

const PreApprovalApprovedComponent = ({
  row,
  row2,
  col,
  title,
  btnStyle,
  imageArea,
  description,
  outlineBtnStyle,
}) => {
  const [whereLooking, setWhereLooking] = useState(null);

  const onFinish = async () => {
    navigate('/Dashboard/preApprovalLetter/');
  };

  const handleChangeWhereLooking = (e) => {
    console.log('statedPropertyValue', e.target.value);
    /* setWhereLooking(e.target.value); */
  };

  const ButtonGroup = () => (
    <Fragment>
      <Box
        className="row"
        {...row}
        style={{ marginBottom: '20px', paddingBotton: '20px' }}
      >
        <Box
          className="colright"
          {...col}
          style={{
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
          }}
        >
          <Button onClick={onFinish} title="Go to your Pre-Approval Letter" {...btnStyle} />
        </Box>
      </Box>
    </Fragment>
  );
 
  return (
  /*   <BannerWrapper id="banner_section"> */
  <SectionMainWrapper>
      <Container>
        <Box className="row" {...row}>
          <Box
            className="colleft"
            {...col} /* style={{ flexDirection: 'column' }} */
          >
            <FeatureBlock
              title={
                <Heading
                  content="You're pre-approved!
				  Shopping around just got a whole lot easier."
                  {...title}
                />
              }
              description={
                <Text
                  content="Based on your info, we created your custom pre-approval letter. It shows what you’re qualified for and is totally editable. So you can edit and make an offer in just a few clicks."
                  {...description}
                />
              }
              button={<ButtonGroup />}
            />
          </Box>
          <Box
            className="colright"
            {...col}
            style={{
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <p></p>
            <p></p>
            {/* <ReactPlayer
            		className='react-player fixed-bottom'
            		url={ExplainerVideoFile}
					playing={true}
					loop={true}
					muted={true}
					width='90%'
            		height='90%'
            		controls = {false}
					playsinline
            /> */}
            <img src={PreApprovalLetter} width="50%" height="50%" />
          </Box>
        </Box>
        <Box className="row" {...row2}>
         
        </Box>
      </Container>
	  </SectionMainWrapper>
  );
};

PreApprovalApprovedComponent.propTypes = {
  title: PropTypes.object,
  btnStyle: PropTypes.object,
  description: PropTypes.object,
  contentStyle: PropTypes.object,
  discountText: PropTypes.object,
  discountAmount: PropTypes.object,
  outlineBtnStyle: PropTypes.object,
};

PreApprovalApprovedComponent.defaultProps = {
  row: {
    flexBox: true,
    flexWrap: 'wrap',
    ml: '-15px',
    mr: '-15px',
  },
  row2: {
    flexBox: true,
    flexWrap: 'wrap',
    ml: '-30px',
    mr: '-15px',
  },
  imageAreaRow: {
    flexDirection: 'row-reverse',
  },
  col: {
    pr: '15px',
    pl: '15px',
    width: [1, 1 / 2, 1 / 2, 1 / 2, 1 / 2],
    flexBox: true,
    alignSelf: 'center',
  },
  imageArea: {
    width: ['0%', '0%', '21%', '17%', '25%'],
    ml: 'auto',
  },
  title: {
    fontSize: ['26px', '34px', '42px', '42px', '47px'],
    fontWeight: '600',
    color: '#000000',
    letterSpacing: '-0.025em',
    mb: ['20px', '25px'],
    lineHeight: '1.31',
	paddingTop: '80px',
  },
  description: {
    fontSize: ['14px', '16px', '18px', '18px', '20px'],
    color: '#000000',
    lineHeight: '30px',
    mb: '0',
    maxWidth: '550px',
  },
  btnStyle: {
    minWidth: ['120px', '156px'],
    fontSize: '15px',
    fontWeight: '700',
    borderRadius: '6px',
  },
  outlineBtnStyle: {
    minWidth: ['130px', '156px'],
    fontSize: '16px',
    fontWeight: '700',
    color: '#fff',
    p: '5px 10px',
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
  
const PreApprovalApprovedComponentRedux = connect(
  mapStateToProps,
  mapDispatchToProps
)(PreApprovalApprovedComponent);

export default PreApprovalApprovedComponentRedux;
