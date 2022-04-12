import React, { Fragment } from 'react';
import { Provider } from 'react-redux';
import Sticky from 'react-stickynode';
import { ThemeProvider } from 'styled-components';
import { cryptoTheme } from 'common/src/theme/crypto';
import { ResetCSS } from 'common/src/assets/css/style';
import {
  GlobalStyle,
  ContentWrapper,
} from '../../containers/Crypto/crypto.style';
import { DrawerProvider } from 'common/src/contexts/DrawerContext';
import NavbarNoHamburger from '../../containers/Crypto/NavbarNoHamburger';
import SEO from '../../components/seo';
import store from '../../store';
import LoanCardRedux from '../../containers/Crypto/DashboardEditPreApprovalLetter';
import Footer from '../../containers/Crypto/Footer';
import SideNavBar from '../../containers/Crypto/SideNavBar/Sidebar';

const Dashboard = () => {
  return (
    <ThemeProvider theme={cryptoTheme}>
      <Provider store={store}>
        <Fragment>
          <SEO title="Harris | Simple, Online, Fast" />
          <ResetCSS />
          <GlobalStyle />
          <ContentWrapper>
            <div className="flex">
              <SideNavBar />
              <div className="w-100">
                <Sticky top={0} innerZ={9999} activeClass="sticky-nav-active">
                  <DrawerProvider>
                    <NavbarNoHamburger />
                  </DrawerProvider>
                </Sticky>
                <LoanCardRedux />
                <Footer />
              </div>
            </div>
          </ContentWrapper>
        </Fragment>
      </Provider>
    </ThemeProvider>
  );
};

export default Dashboard;
