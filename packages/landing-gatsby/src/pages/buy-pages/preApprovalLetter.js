import React, { Fragment } from 'react';
import { Provider } from 'react-redux';
import Sticky from 'react-stickynode';
import { ThemeProvider } from 'styled-components';
import { cryptoTheme } from 'common/src/theme/crypto';
import { ResetCSS } from 'common/src/assets/css/style';
import { GlobalStyle, ContentWrapper } from '../../containers/Crypto/crypto.style';
import { DrawerProvider } from 'common/src/contexts/DrawerContext';
import Navbar from '../../containers/Crypto/Navbar';
import BannerSectionNoWords from '../../containers/Crypto/BannerSectionNoWords';

import Container from 'common/src/components/UI/Container';

// Requiring function causes error during builds
// as the code tries to reference window

// Wrap the require in check for window
//if (typeof window !== `undefined`) {
//  const Post = require("../containers/Crypto/PostPDF/post")
//}

//const Post = typeof window !== `undefined` ? require("../containers/Crypto/PostPDF/post") : null

//import Post from '../containers/Crypto/PostPDF/post';
import SEO from '../../components/seo';
import store from '../../store';
import FinalApplicationCheckContainerRedux from '../../containers/Crypto/FinalApplicationCheckContainer';

const PreApprovalLetter = () => {
  return (
    <ThemeProvider theme={cryptoTheme}>
      <Provider store={store}>
        <Fragment>
          <SEO title="Harris | Simple, Online, Fast" />
          <ResetCSS />
          <GlobalStyle />
          <ContentWrapper>
            <Sticky top={0} innerZ={9999} activeClass="sticky-nav-active">
              <DrawerProvider>
                <Navbar />
              </DrawerProvider>
            </Sticky>
            <BannerSectionNoWords />
            <FinalApplicationCheckContainerRedux />
            {/* <Post/> */}
          </ContentWrapper>
        </Fragment>
      </Provider>
    </ThemeProvider>
  );
};

export default PreApprovalLetter;
