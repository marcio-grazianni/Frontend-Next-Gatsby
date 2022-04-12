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
import BannerSectionNoWords from '../../containers/Crypto/BannerSectionNoWords';
import SEO from '../../components/seo';
import TasksContainerRedux from '../../containers/Crypto/Tasks';
import store from '../../store';
import SideNavBar from '../../containers/Crypto/SideNavBar/Sidebar';
import Footer from '../../containers/Crypto/Footer';

//get offer details back from heroku backend node.js (max amount and terms)

//side bar with loan flow

//loan explanation

//option to add autopay at reduced fee

//option to enroll in partner bank account or credit union

//save and continue button

const Tasks = () => {
  //console.log("return full page loaderrrrr==>>", store);
  console.log('return full page loader==>>', store.getState().root);
  const { loading } = store.getState().root;

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
                {/*  <BannerSectionNoWords /> */}

                <TasksContainerRedux />
                {/* <Footer /> */}
              </div>
            </div>
          </ContentWrapper>
        </Fragment>
      </Provider>
    </ThemeProvider>
  );
};

export default Tasks;
