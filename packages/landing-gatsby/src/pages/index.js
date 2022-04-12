import React, { Fragment } from 'react';
import { Provider } from 'react-redux';
import Sticky from 'react-stickynode';
import { ThemeProvider } from 'styled-components';
import { cryptoTheme } from 'common/src/theme/crypto';
import { ResetCSS } from 'common/src/assets/css/style';
import { GlobalStyle, ContentWrapper } from '../containers/Crypto/crypto.style';
import { DrawerProvider } from 'common/src/contexts/DrawerContext';
import Navbar from '../containers/Crypto/Navbar';
import Banner from '../containers/Crypto/BannerSection';
import MagazineLogos from '../containers/Crypto/MagazineLogos';
import MagazineLogosCopy from '../containers/Crypto/MagazineLogosCopy';
import TestimonialSlider from '../containers/Crypto/TestimonialSlider';
/* import Testimonial from '../containers/Crypto/Testimonial'; */
import Transactions from '../containers/Crypto/Transaction';
import AppVideo from '../containers/Crypto/AppVideo';
import BetaSection from '../containers/Crypto/BetaSectionEdit';
import LoanCard from '../containers/Crypto/MortgageDataCard';
import ControlSections from '../containers/Crypto/ControlSection';
import Footer from '../containers/Crypto/Footer';
import SEO from '../components/seo';
import store from '../store';

const App = () => {
  console.log(cryptoTheme);
  return (
    <ThemeProvider theme={cryptoTheme}>
      <Provider store={store}>
        <Fragment>
          <SEO title="Harris | Simple, Online, Fast" />
          <ResetCSS />
          <GlobalStyle />
          <ContentWrapper>
            <Sticky
              top={0}
              innerZ={9999}
              inactiveClass="sticky-nav-active"
              activeClass="sticky-nav-active"
            >
              <DrawerProvider>
                <Navbar />
              </DrawerProvider>
            </Sticky>
            <Banner />
            {/*  <MagazineLogos /> */}
            <MagazineLogosCopy />
            <Transactions />
            <LoanCard />
            {/* <ControlSections /> */}

            <AppVideo />
            {/* <BetaSection/> */}

            {/* <div
              class="trustpilot-widget"
              data-locale="en-US"
              data-template-id="53aa8807dec7e10d38f59f32"
              data-businessunit-id="60ff18dff7a0cd0001770ddb"
              data-style-height="150px"
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
            </div> */}

            <TestimonialSlider />

            {/* <Testimonial /> */}
            <Footer />
          </ContentWrapper>
        </Fragment>
      </Provider>
    </ThemeProvider>
  );
};

export default App;
