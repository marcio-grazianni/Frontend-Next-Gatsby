import React, { Fragment, useState } from 'react';
import { navigate } from 'gatsby';
import PropTypes from 'prop-types';
import Box from 'common/src/components/Box';
import Text from 'common/src/components/Text';
import Heading from 'common/src/components/Heading';
import Button from 'common/src/components/Button';
import Image from 'common/src/components/Image';
import FeatureBlock from 'common/src/components/FeatureBlock';
import Container from 'common/src/components/UI/Container';
import Particles from '../Particle';
import { Icon } from 'react-icons-kit';
import { socialTwitter } from 'react-icons-kit/ionicons/socialTwitter';
import { facebook2 } from 'react-icons-kit/icomoon/facebook2';
import BannerBG from 'common/src/assets/image/crypto/white_bg1.svg';
//import BannerBG from 'common/src/assets/image/crypto/shutterstock_1106309045.jpg';
//import BannerBG from 'common/src/assets/image/crypto/1888500697-huge.jpg';
//import BannerBG from 'common/src/assets/image/crypto/shutterstock_658946836.jpg';
import BannerWrapper, { BgImageWrapper } from './bannerSection.style';
import ReactPlayer from 'react-player';
//import ExplainerVideoFile from 'common/src/assets/image/explainer.gif'
import AppVideoFile from 'common/src/assets/image/Chrisharrisglob-042.gif'; //import AppVideoFile from 'common/src/assets/image/Chrisharrisglob.m4v'
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

const BannerSection = ({
  row,
  row2,
  col,
  title,
  btnStyle,
  imageArea,
  description,
  outlineBtnStyle,
}) => {
  const [form] = Form.useForm();
  const [whereLooking, setWhereLooking] = useState(null);

  const onFinish = async () => {
	localStorage.setItem('postalCode', JSON.stringify(whereLooking));
    navigate('/buyOrRefi/');
  };

  const handleChangeWhereLooking = (e) => {
    console.log('Where looking', e.target.value);
   	setWhereLooking(e.target.value);
  };

  const ButtonGroup = () => (
    <Fragment>
      <Box
        className="row"
        {...row}
        style={{ marginBottom: '20px', paddingBotton: '20px' }}
      >
        <Box
          className="colleft"
          {...col}
          style={{ flexDirection: 'column', marginBottom: '0px' }}
        >
			<Form
              //{...formItemLayout}
              form={form}
              layout="vertical"
              name="register"
              onFinish={onFinish}
              scrollToFirstError
              style={{ width: '90%' }}
            >
          <Form.Item
            style={{ marginBottom: '0px' }}
            name="zipCode"
            /* label="Zip Code" */
            onChange={handleChangeWhereLooking}
            placeholder="Zip Code"
            rules={[
              /* {
                            required: true,
                            message: '*Required',
                          }, */
              {
                pattern: /^\d{5}(?:[-\s]\d{4})?$/,
                message: 'Please enter a valid zip code',
              },
              {
                min: 5,
                message: '*Must be at least 5 digits',
              },
            ]}
          >
            <Input
              autoComplete="new-password"
              placeholder="Zip Code"
              style={{ marginBottom: '0px', padding: '10px' }}
            />
          </Form.Item>
		  </Form>
        </Box>
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
          <Button onClick={onFinish} title="See today's rates" {...btnStyle} />
        </Box>
      </Box>
    </Fragment>
  );
  const ShareButtonGroup = () => (
    <Fragment>
      <Button
        title="Share on Twitter"
        variant="textButton"
        iconPosition="left"
        icon={<Icon icon={socialTwitter} />}
        {...outlineBtnStyle}
        className="btnWithoutColor"
      />
      <Button
        title="Share on Facebook"
        variant="textButton"
        iconPosition="left"
        icon={<Icon icon={facebook2} />}
        {...outlineBtnStyle}
        className="btnWithoutColor"
      />
    </Fragment>
  );
  return (
    <BannerWrapper id="banner_section">
      <Particles />
      <BgImageWrapper>
        <Image src={BannerBG} alt="banner background" />
      </BgImageWrapper>
      <Container>
        <Box className="row" {...row}>
          <Box
            className="colleft"
            {...col} /* style={{ flexDirection: 'column' }} */
          >
            <FeatureBlock
              title={
                <Heading
                  content="Save thousands by getting the right mortgage."
                  {...title}
                />
              }
              description={
                <Text
                  content="Save time, save money, and enjoy peace of mind.
                  Harris shops the mortgage market so you don’t have to."
                  {...description}
                />
              }
              button={ButtonGroup()}
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
            <img src={AppVideoFile} width="50%" height="50%" />
          </Box>
        </Box>
        <Box className="row" {...row2}>
          <div
            class="trustpilot-widget"
            data-locale="en-US"
            data-template-id="5419b732fbfb950b10de65e5"
            data-businessunit-id="60ff18dff7a0cd0001770ddb"
            data-style-height="24px"
            data-style-width="100%"
            data-theme="light"
          >
            <a
              href="https://www.trustpilot.com/review/improve-loans.com"
              target="_blank"
              rel="noopener"
            >
              Trustpilot
            </a>
          </div>
        </Box>
      </Container>
    </BannerWrapper>
  );
};

BannerSection.propTypes = {
  title: PropTypes.object,
  btnStyle: PropTypes.object,
  description: PropTypes.object,
  contentStyle: PropTypes.object,
  discountText: PropTypes.object,
  discountAmount: PropTypes.object,
  outlineBtnStyle: PropTypes.object,
};

BannerSection.defaultProps = {
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

export default BannerSection;
