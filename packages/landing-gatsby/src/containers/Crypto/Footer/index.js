import React from 'react';
import PropTypes from 'prop-types';
import { useStaticQuery, graphql } from 'gatsby';
import Box from 'common/src/components/Box';
import Text from 'common/src/components/Text';
import Image from 'common/src/components/Image';
import Heading from 'common/src/components/Heading';
import Select from 'common/src/components/Select';
import Container from 'common/src/components/UI/Container';
import ContactSections from '../Contact';
import FooterWrapper, { List, ListItem, BgImageWrapper } from './footer.style';
import AppImage from 'common/src/assets/image/crypto/footerapp.svg';
import PlaystoreImage from 'common/src/assets/image/crypto/footerplay.svg';
import FooterBG from 'common/src/assets/image/crypto/footer-bg.svg';
import Logo from 'common/src/assets/image/crypto/logoNotClear.png';

const Footer = ({ row, col, colOne, colTwo, titleStyle }) => {
  const Data = useStaticQuery(graphql`
    query {
      cryptoJson {
        menuWidget {
          id
          title
          menuItems {
            id
            text
            url
          }
        }
        Language_NAMES {
          label
          value
        }
      }
    }
  `);

  return (
    <FooterWrapper id="footerSection">
      {/*  <ContactSections /> */}

      <BgImageWrapper>
        {/* <Image src={FooterBG} alt="Footer background" /> */}
      </BgImageWrapper>
      <Container noGutter mobileGutter width="1200px">
        <Box className="row mainRow" {...row}>
          <Box {...colOne}>
            <Box className="imageWrapper">
              <Image src={Logo} />
            </Box>
            <Heading
              content="Harris Technologies is dedicated to making homeownership faster and simpler, with superior customer support along the way."
              {...titleStyle}
            />
            <div
              className="trustedsite-trustmark"
              data-type="202"
              data-width="120"
              data-height="50"
            ></div>
            {/* <Select
              options={Data.cryptoJson.Language_NAMES}
              placeholder="English"
              className="Language_search_select"
              aria-label="Language_search_input"
            /> */}
            {/*}
            <Heading
              className="appDownload"
              content="Download The App"
              {...titleStyle}
              /> 
            <Box className="imageWrapper">
              <a href="https://www.apple.com/ios/app-store/">
                <Image src={AppImage} alt="App Image" />
              </a>
              <a href="https://play.google.com/store/apps">
                <Image src={PlaystoreImage} alt="PlaystoreImage Image" />
              </a>
            </Box> */}
          </Box>
          {/* End of footer logo column */}
          <Box {...colTwo}>
            {Data.cryptoJson.menuWidget.map((widget) => (
              <Box className="col" {...col} key={widget.id}>
                <Heading content={widget.title} {...titleStyle} />
                <List>
                  {widget.menuItems.map((item) => (
                    <ListItem key={`list__item-${item.id}`}>
                      <a className="ListItem" href={item.url}>
                        {item.text}
                      </a>
                    </ListItem>
                  ))}
                </List>
              </Box>
            ))}
          </Box>
          {/* End of footer List column */}
        </Box>
        <Box className="row copyRight" {...row} style={{ paddingTop: '15px' }}>
          <Text
            content="Improve Technologies, Inc DBA Harris | NMLS#2122435 - For licensing information, go to www.nmlsconsumeraccess.org.
			Improve Technologies is not a lender, but retains certain mortgage broker licenses to comply with various
			state requirements. Improve Technologies, Inc: 25661 Huron St., Loma Linda, CA, 92354
			Copyright 2020 @Improve Technologies.  "
            className="copyRightText"
          />
        </Box>
      </Container>
    </FooterWrapper>
  );
};

// Footer style props
Footer.propTypes = {
  row: PropTypes.object,
  col: PropTypes.object,
  colOne: PropTypes.object,
  colTwo: PropTypes.object,
  titleStyle: PropTypes.object,
  textStyle: PropTypes.object,
};

// Footer default style
Footer.defaultProps = {
  // Footer row default style
  row: {
    flexBox: true,
    flexWrap: 'wrap',
    ml: '-4px',
    mr: '-4px',
  },
  // Footer col one style
  colOne: {
    width: ['100%', '30%', '33%', '33%'],
    mb: ['30px', 0],
    pl: ['0px', 0],
    pr: ['0px', '0px', 0],
  },
  // Footer col two style
  colTwo: {
    width: ['100%', '70%', '67%', '67%'],
    flexBox: true,
    flexWrap: 'wrap',
  },
  // Footer col default style
  col: {
    width: ['100%', 1 / 3, 1 / 3, 1 / 3],
    pl: [0, '15px'],
    pr: [0, '15px'],
    mb: ['30px', '30px'],
  },
  // widget title default style
  titleStyle: {
    color: '#000000',
    fontSize: ['13px', '14px', '14px', '16px', '16px'],
    fontWeight: '400',
    lineHeight: '1.34',
    mb: ['15px', '18px', '18px', '20px', '30px'],
    fontFamily: 'Poppins',
    marginRight: '30px',
  },
  // Default logo size
  logoStyle: {
    width: '128px',
    mb: '15px',
  },
  // widget text default style
  textStyle: {
    color: '#FFFFFF',
    fontSize: '16px',
    mb: '12px',
    fontWeight: '600',
    fontFamily: 'Lato',
  },
};

export default Footer;
