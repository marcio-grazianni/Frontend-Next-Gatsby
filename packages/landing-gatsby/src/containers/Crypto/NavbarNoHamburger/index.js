import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useStaticQuery, graphql, Link } from 'gatsby';
import NavbarWrapper from 'common/src/components/Navbar';
import Drawer from 'common/src/components/Drawer';
import Button from 'common/src/components/Button';
import Logo from 'common/src/components/UIElements/Logo';
import Box from 'common/src/components/Box';
import HamburgMenu from 'common/src/components/HamburgMenu';
import Container from 'common/src/components/UI/Container';
import { DrawerContext } from 'common/src/contexts/DrawerContext';
import ScrollSpyMenu from 'common/src/components/ScrollSpyMenu';
import { logoutUser, showLoader, hideLoader, toggleSidebar } from '../../../actions';
import LogoImage from 'common/src/assets/image/crypto/logo.png';
import LogoImageAlt from 'common/src/assets/image/crypto/logo.png';
import { navigate } from 'gatsby';
import MenuIcon from '@material-ui/icons/Menu';
import {useMediaQuery} from "@material-ui/core";

const NavbarNoHamburger = ({
  navbarStyle,
  logoStyle,
  button,
  togglerBtn,
  row,
  menuWrapper,
  logoutUser,
  loggedIn,
  currentUser,
  userToken,
  toggleSidebar,
}) => {
  const { state, dispatch } = useContext(DrawerContext);

  const mobile = useMediaQuery('(max-width:767px)');

  // Toggle drawer
  const toggleHandler = () => {
    dispatch({
      type: 'TOGGLE',
    });
  };

  const onLogOutClick = async (currentUser, userToken) => {
    console.log('logout currentUser', currentUser);
    console.log('logout token', userToken);

    logoutUser(currentUser, userToken);
    navigate('/');
  };
  /*
  const Data = useStaticQuery(graphql`
    query {
      cryptoJson {
        MENU_ITEMS {
          label
          path
          offset
        }
      }
    }
  `); */

  return (
    <NavbarWrapper {...navbarStyle} className="saas_navbar">
      <Container>
        <Box {...row}>
          <Logo
            href="/"
            logoSrc={LogoImage}
            title="Portfolio"
            logoStyle={logoStyle}
            className="main-logo"
          />
          <Logo
            href="/"
            logoSrc={LogoImageAlt}
            title="Portfolio"
            logoStyle={logoStyle}
            className="logo-alt"
          />
          <Box {...menuWrapper}>
            {/* <ScrollSpyMenu
              className="main_menu"
              menuItems={Data.cryptoJson.MENU_ITEMS}
              offset={-70}
            /> */}

            {/*  if not logged in, show log in, if logged in, show logout */}
            {loggedIn && (
              <Link className="navbar_button" to="/Dashboard/dashboard">
                <Button {...button} title="MY DASHBOARD" />
              </Link>
            )}
			&nbsp;
            {loggedIn && (
              <Button
                {...button}
                onClick={() => onLogOutClick(currentUser, userToken)}
                title="Log out"
              />
            )}
			&nbsp;
            {!loggedIn && (
              <Link className="navbar_button" to="/login">
                <Button {...button} title="MY DASHBOARD" />
              </Link>
            )}

            {/* <Drawer
              width="420px"
              placement="right"
              drawerHandler={<HamburgMenu barColor="#000000" />}
              open={state.isOpen}
              toggleHandler={toggleHandler}
            >
             <ScrollSpyMenu
                className="mobile_menu"
                menuItems={Data.cryptoJson.MENU_ITEMS}
                drawerClose={true}
                offset={-100}
              />

              <Link className="navbar_drawer_button" to="/login">
                <Button {...button} title="MY DASHBOARD" />
              </Link>
            </Drawer> */}
            { mobile && (
              <span onClick={toggleSidebar}>
                <HamburgMenu barColor="#000000" />
              </span>
            )}
          </Box>
        </Box>
      </Container>
    </NavbarWrapper>
  );
};

NavbarNoHamburger.propTypes = {
  navbarStyle: PropTypes.object,
  logoStyle: PropTypes.object,
  button: PropTypes.object,
  togglerBtn: PropTypes.object,
  row: PropTypes.object,
  menuWrapper: PropTypes.object,
};

NavbarNoHamburger.defaultProps = {
  navbarStyle: {
    minHeight: '70px',
    display: 'block',
    paddingLeft: '270px',
  },
  row: {
    flexBox: true,
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  logoStyle: {
    maxWidth: ['120px', '130px'],
  },
  button: {
    type: 'button',
    fontSize: '13px',
    fontWeight: '700',
    borderRadius: '4px',
    pl: '15px',
    pr: '15px',
    colors: 'secondaryWithBg',
    minHeight: 'auto',
    height: '40px',
    marginRight: '8px',
  },
  togglerBtn: {
    type: 'button',
    fontSize: '13px',
    fontWeight: '700',
    borderRadius: '4px',
    pl: '15px',
    pr: '15px',
    colors: 'secondaryWithBg',
    minHeight: 'auto',
    height: '40px',
  },
  menuWrapper: {
    flexBox: true,
    alignItems: 'center',
  },
};

const mapStateToProps = ({ root: { currentUser, loading, loggedIn } }) => ({
  currentUser: currentUser?.user,
  userToken: currentUser?.token,
  loading,
  loggedIn,
});

const mapDispatchToProps = (dispatch) => {
  return {
    logoutUser: (currentUser, userToken) =>
      dispatch(logoutUser(currentUser, userToken)),
    showLoader: () => dispatch(showLoader()),
    hideLoader: () => dispatch(hideLoader()),
    toggleSidebar: () => dispatch(toggleSidebar()),
  };
};

const NavbarNoHamburgerRedux = connect(
  mapStateToProps,
  mapDispatchToProps
)(NavbarNoHamburger);

export default NavbarNoHamburgerRedux;
