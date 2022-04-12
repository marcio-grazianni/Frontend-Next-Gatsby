import styled from 'styled-components';

const PageWithNavBarStylingWrapper = styled.section`
.componentWithNavbar {  
	paddingLeft: 270px;
  	@media (max-width: 768px) {
    	paddingLeft: 0px;
  	}
}
`;

export default PageWithNavBarStylingWrapper;
