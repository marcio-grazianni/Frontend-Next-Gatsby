import React from 'react';
import {
  ProSidebar,
  Menu,
  MenuItem,
  SubMenu,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
} from 'react-pro-sidebar';
import './Sidebar.scss';
import './Sidebar.css';
import { connect } from 'react-redux';
import { navigate } from 'gatsby';
import Logo from 'common/src/assets/image/crypto/logo.png';
import Image from 'common/src/components/Image';
import { toggleSidebar } from '../../../actions';
import { BsCircle, BsCheckCircle } from 'react-icons/bs';
import { FaCheckCircle } from 'react-icons/fa';
import { checkmarkCircled } from 'react-icons-kit/ionicons/checkmarkCircled';
import { Icon } from 'react-icons-kit';
//import sidebarBg from './assets/bg1.jpg';


const SideBarContainer = ({
  image,
  collapsed,
  rtl,
  showSidebar,
  toggleSidebar,
  currentUser,
}) => {
  return (
    <div className="sidebar">
      <ProSidebar
        /* image={image ? sidebarBg : false} */
        className="sidebar"
        rtl={rtl}
        collapsed={collapsed}
        toggled={showSidebar}
        breakPoint="md"
        onToggle={toggleSidebar}
        overflow="auto !important;"
      >
        <SidebarHeader
          style={{
            paddingTop: '60px',
            fontSize: '20px',
          }}
        >
          <div
            style={{
              padding: '24px',
              textTransform: 'uppercase',
              fontWeight: 'bold',
              fontSize: 14,
              letterSpacing: '1px',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            <Image src={Logo} />
            <b>Harris Technologies</b>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <Menu iconShape="circle">
            {/* <MenuItem icon={<BsCircle />}>
              <Icon icon={checkmarkCircled} />
              Select Offer
            </MenuItem> */}
            <MenuItem

				/* icon={<BsCircle />} */>
					Overview
			</MenuItem>
            <MenuItem
				/* icon={<BsCircle />} */
				suffix={<span className="badge blue"> {currentUser?.miscellaneous.tasksLeft} </span>}
				onClick={(e) => navigate('/Dashboard/tasks/')}>
					Tasks

			</MenuItem>
            <MenuItem
				/* icon={<BsCircle />} */
				onClick={(e) => navigate('/buy-pages/buySelectOffer/')}
				>Rates
			</MenuItem>
            <MenuItem
				/* icon={<BsCircle />} */
				onClick={(e) => navigate('/Dashboard/preApprovalLetter/')}
					>
					Pre-approval Letter
			</MenuItem>
{/*             <MenuItem
				icon={<BsCircle />}>
					Submit
			</MenuItem> */}
            <MenuItem
				/* icon={<BsCircle />} */>
					My team
			</MenuItem>
            {/* <MenuItem icon={<BsCircle />}>Sign Documents</MenuItem> */}

            {/* <SubMenu title="Components" icon={<FaHeart />} >
      <MenuItem>Component 1</MenuItem>
      <MenuItem>Component 2</MenuItem>
    </SubMenu> */}
          </Menu>
          <p></p>
          Your offer details
          <p></p>
          <li>APR</li>
          <li>{currentUser?.APRSelected}</li>
          <li>Monthly Payment</li>
          <li>{currentUser?.monthlyPaymentSelected}</li>
          <li>Term</li>
          <li>---</li>
        </SidebarContent>

        <SidebarFooter></SidebarFooter>
      </ProSidebar>
    </div>
  );
};

const mapStateToProps = ({ root: { currentUser, showSidebar } }) => ({
  currentUser: currentUser?.user,
  userToken: currentUser?.token,
  showSidebar,
});

const mapDispatchToProps = (dispatch) => {
	return {
	  /*updateUserInfo: (currentUser, userToken) =>
		dispatch(updateUserInfo(currentUser, userToken)),*/
        toggleSidebar: () => dispatch(toggleSidebar()),
	};
  };

const SideBarContainerRedux = connect(
  mapStateToProps,
  mapDispatchToProps
)(SideBarContainer);

export default SideBarContainerRedux;
