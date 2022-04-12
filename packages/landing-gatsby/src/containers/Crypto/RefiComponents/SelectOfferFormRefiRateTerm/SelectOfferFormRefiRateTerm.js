//cash back refi select-offer

import React, { Fragment, useState, useEffect } from 'react';
import { navigate } from 'gatsby';
import { connect } from 'react-redux';
import Heading from 'common/src/components/Heading';
import Button from 'common/src/components/Button';
import Text from 'common/src/components/Text';
import Container from 'common/src/components/UI/Container';
import { updateUserInfo, getMortechRates } from '../../../../actions';
import { loadState } from '../../../../store';
import { Table, Modal, Dropdown, Form, Menu, Space, InputNumber, Input } from 'antd';
import Cleave from 'cleave.js/react';
//get offer details back from heroku backend node.js (max amount and terms)
//side bar with loan flow
import SectionWrapper, {
  PricingArea,
  InnerWrapper,
  PricingCard,
  RateCardWrapper
} from './pricingPolicy.style';
import { Router } from 'react-router';
//loan explanation
import crown from 'common/src/assets/image/appModern/crown.svg';
//option to add autopay at reduced fee

//get loan amount selected by user

//option to enroll in partner bank account or credit union
//const maxLoan = 50000;
//save and continue button
function SelectOfferContainer({ 
	currentUser, 
	userToken, 
	updateUserInfo,
	getMortechRates,
	}) {	
	const [form] = Form.useForm();
	const [purchasePrice, setPurchasePrice] = useState(null);
  	const [downPayment, setDownPayment] = useState(null);
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [rateSelected, setRateSelected] = useState(null);
	const [APRSelected, setAPRSelected] = useState(0);
  	const [pointsSelected, setPointsSelected] = useState(0);
  	const [monthlyPaymentSelected, setMonthlyPaymentSelected] = useState(0);
	const [loanAmount, setLoanAmount] = useState(null);
	const [showOrHideDropDownTerm, setShowOrHideDropDownTerm] = useState(null);
	const [showOrHideDropDownPurchasePrice, setShowOrHideDropDownPurchasePrice] = useState(null);
	const [showOrHideDropDownDownPayment, setShowOrHideDropDownDownPayment] = useState(null);
	const [inputPurchasePrice, setInputPurchasePrice] = useState(null);
	const [inputDownPayment, setInputDownPayment] = useState(null);
	const [inputTerm, setInputTerm] = useState({
		inputAmortizationType: String,
		inputLoanAmortiazationPeriodCount: Number,
		inputloanAmortizationPeriodType: String,
	});
	const [amortizationType, setAmortizationType] = useState(null);
	const [loanAmortizationPeriodCount, setLoanAmortizationPeriodCount] = useState(null);
	const [loanAmortizationPeriodType, setLoanAmortizationPeriodType] = useState(null);
	const [inputDownPaymentTooHigh, setInputDownPaymentTooHigh] = useState(null);
	const [inputPurchasePriceTooHigh, setInputPurchasePriceTooHigh] = useState(null);
	const [downPaymentPercent, setDownPaymentPercent] = useState(null);


  const showModal = (rate, APR, piti, points) => {
	setRateSelected(rate)
    setAPRSelected(APR);
    setPointsSelected(points);
    setMonthlyPaymentSelected(piti);

    console.log('in show modal');
    setIsModalVisible(true);
  };

  const handleOk = (currentUser, userToken) => {
    setIsModalVisible(false);

    Object.assign(currentUser?.loan.termsOfLoan, 
		{	
			noteRatePercent: rateSelected,
			aprPercent: APRSelected,
			pointsSelected: pointsSelected,
			monthlyPaymentSelected: monthlyPaymentSelected,
		})

    updateUserInfo(currentUser, userToken);
    //update user model with loanAmountSelected */
    navigate('/Dashboard/tasks/');
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  //dynamically create data depending on amount in preQualOffer array

  const columns = [
    {
      title: <b>Lowest payment</b>,
      dataIndex: 'rate,APR',
      render: (text, record) => (
        <a>
          <b>{record.rate}% ({record.APR})%</b>
		  <p></p>
		   Rate(APR)
		</a>
      ),
    },
    {
      title: <b>Monthly payment</b>,
      dataIndex: 'piti',
      render: (text) => (
        <a>
          <b>${text}</b>
		  <p></p>
		   Principal and Interest
        </a>
      ),
    },
	{
		title: <b>Points</b>,
		dataIndex: 'points',
		render: (text) => (
		  <a>
			<b>${text.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</b>
			<p></p>
			 Points
		  </a>
		),
	  },
    {
      //title: 'Action',//render modal onClick with terms in modal
      key: 'action',
      render: (text) => (
        <Button
          style={{ float: 'right' }}
          title={'Select'}
          onClick={() => showModal(text)}
        />
      ),
    },
  ];

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        'selectedRows: ',
        selectedRows
      );
    },
  };

  var data
  if(currentUser?.loan.preApproval.ratesReturned[0]) {
  data = currentUser?.loan.preApproval.ratesReturned;
}

  const termMenu = (
	<Menu >
	  <Menu.Item onClick={(e)=>handleTerm("Fixed", 30, "Year")} >
		  30-year fixed
	  </Menu.Item>
	  <Menu.Item onClick={(e)=>handleTerm("Fixed", 20, "Year")}>
		  20 year-fixed
	  </Menu.Item>
	  <Menu.Item onClick={(e)=>handleTerm("Fixed", 15, "Year")}>
		  15-year fixed
	  </Menu.Item>
	  <Menu.Item onClick={(e)=>handleTerm("Adjustable", 10, "Year")}>
		  10/6m adjustable
	  </Menu.Item>
	  <Menu.Item onClick={(e)=>handleTerm("Adjustable", 7, "Year")}>
		  7/6m adjustable
	  </Menu.Item>
	  <Menu.Item onClick={(e)=>handleTerm("Adjustable", 5, "Year")}>
		  5/6m adjustable
	  </Menu.Item>
	  	<Button
		  	title="Apply"
		  	onClick={(e)=>{
				e.stopPropagation();
				e.preventDefault()
				handleApplyTerm(e)}}
			 >
		</Button>
	</Menu>
  );

  const handleShowOrHideDropDownTerm = () => {
	//console.log("handle or show Term")
  setShowOrHideDropDownTerm(showOrHideDropDownTerm => !showOrHideDropDownTerm)
} 

const handleApplyTerm = () => {
	//console.log("handle apply term", inputTerm)
  setShowOrHideDropDownTerm(showOrHideDropDownTerm => !showOrHideDropDownTerm)
  setAmortizationType(inputTerm.inputAmortizationType)
  setLoanAmortizationPeriodCount(inputTerm.inputLoanAmortiazationPeriodCount)
  setLoanAmortizationPeriodType(inputTerm.inputloanAmortizationPeriodType)
  //valuesUpdated(currentUser, userToken)
} 

const handleTerm = (amortizationType, loanAmortizationPeriodCount, loanAmortizationPeriodType) => {
	//console.log("handleTerm function", amortizationType, loanAmortizationPeriodCount, loanAmortizationPeriodType)
	setInputTerm({	inputAmortizationType: amortizationType, 
					inputLoanAmortiazationPeriodCount: loanAmortizationPeriodCount, 
					inputloanAmortizationPeriodType: loanAmortizationPeriodType});				
};


  const purchasePriceMenu = (
	<Menu >
		<Menu.Item>
	  <Form.Item
              name="displayAmount"
              //label="Purchase price"
              initialValue={purchasePrice || currentUser?.loan.termsOfLoan.purchasePrice}
              onChange={(e) => {
				e.stopPropagation();
				e.preventDefault()
				handlePurchasePrice(e)}}
			  value={purchasePrice}
			  validateFirst={true}
      		  validateTrigger="onBlur"
              rules={[
                {
                  required: true,
                  message: '*Required',
                },
              ]}
            >
			<Cleave
                className="ant-input"
                name="purchasePrice"
              	label="Purchase price"
                options={{
                  numeral: true,
                  numeralIntegerScale: 7,
                  numeralPositiveOnly: true,
                  //prefix: '$',
                  signBeforePrefix: true,
                  stripLeadingZeroes: true,
                }}
			/>
			 </Form.Item>
			 </Menu.Item>
			 <Menu.Item>
	  		{inputPurchasePriceTooHigh && (
		  		"Based on your information, purchase price must be less than " + " "  + (currentUser.loan.preApproval.preApprovalMaxPurchasePrice)
	  			)}
	  		</Menu.Item> 
			 <Menu.Item>
		  	<Button
		  		title="Apply"
		  		onClick={(e)=>{
					e.stopPropagation();
					e.preventDefault()
					handleApplyPurchasePrice(e)}}
				  >
		  	</Button>
			</Menu.Item>
	</Menu>
  );

  
  const handleShowOrHideDropDownPurchasePrice = () => {
	//console.log("handle or show purchase price")
  setShowOrHideDropDownPurchasePrice(showOrHideDropDownPurchasePrice => !showOrHideDropDownPurchasePrice)
} 

  

  const handlePurchasePrice = (e) => {
	//console.log("handle purchasePrice function")
	const purchasePriceNumber = parseFloat(e.target.value.replace(/,/g, ''))
    setInputPurchasePrice(purchasePriceNumber);
	if (!downPayment) {
		setDownPayment(currentUser.loan.termsOfLoan.downPayment)
      setLoanAmount(purchasePriceNumber - downPayment);
    } else {
      setLoanAmount(purchasePriceNumber - downPayment);
    }
};

const handleApplyPurchasePrice = () => {
	if(inputPurchasePrice < currentUser.loan.preApproval.preApprovalMaxPurchasePrice + 1) {
		//console.log("handle apply purchase price")
  		setShowOrHideDropDownPurchasePrice(showOrHideDropDownPurchasePrice => !showOrHideDropDownPurchasePrice)
  		setPurchasePrice(inputPurchasePrice)
		setInputPurchasePriceTooHigh(false)
	}
	else{
		setInputPurchasePriceTooHigh(true)
	}	  
  //valuesUpdated(currentUser, userToken)
} 

  const downPaymentMenu = (
	<Menu style={{whiteSpace: 'normal', height: 'auto', width: '100%'}}>
		<Menu.Item style={{whiteSpace: 'normal', height: 'auto', width: '100%'}} >
	  <Form.Item
              name="downPayment"
              //label="Down payment"
              initialValue={downPayment || currentUser?.loan.termsOfLoan.downPayment}
              onChange={(e) => handleDownPayment(e)}
			  value={downPayment}
              rules={[
                {
                  required: true,
                  message: '*Required',
                },
              ]}
            >
	  			 <Cleave
                className="ant-input"
                name="downPayment"
              	label="Down payment"
                options={{
                  numeral: true,
                  numeralIntegerScale: 7,
                  numeralPositiveOnly: true,
                  //prefix: '$',
                  signBeforePrefix: true,
                  stripLeadingZeroes: true,
                }}
			/>	
			</Form.Item>

	  </Menu.Item>
	  <Menu.Item>
	  {inputDownPaymentTooHigh && (
		  "Based on your assets reported, down payment must be less than " + " "  + (currentUser.loan.preApproval.preApprovalDownPayment)
	  )}
	  </Menu.Item>
	  <Menu.Item>
		 <Button
		  	title="Apply"
			  onClick={(e)=>handleApplyDownPayment(e)} 
			>
			</Button>
		</Menu.Item>
	</Menu>
  );

  const handleShowOrHideDropDownDownPayment = () => {
	//console.log("handle or show down payment")
	setShowOrHideDropDownDownPayment(showOrHideDropDownDownPayment => !showOrHideDropDownDownPayment)
} 

  const handleDownPayment = (e) => {
	//console.log("handle down payment function")
	const purchaseDownPayment = parseFloat(e.target.value.replace(/,/g, ''))
    setInputDownPayment(purchaseDownPayment);
    if (!purchasePrice) {
      setLoanAmount(
        currentUser.loan.termsOfLoan.purchasePrice - purchaseDownPayment);
		setPurchasePrice(currentUser.loan.termsOfLoan.purchasePrice)	
    } else {
      setLoanAmount(purchasePrice - purchaseDownPayment);
    }
	//console.log("hide dropdown in downpayment function")
  };

  const handleApplyDownPayment = () => {
	if(inputDownPayment < currentUser.loan.preApproval.preApprovalDownPayment + 1 ) {
		setShowOrHideDropDownDownPayment(showOrHideDropDownDownPayment => !showOrHideDropDownDownPayment)
		setDownPayment(inputDownPayment)
		setInputDownPaymentTooHigh(false)
		
	}
	else {
		setInputDownPaymentTooHigh(true)
	}
	
	//valuesUpdated(currentUser, userToken)
} 

  const valuesUpdated = async (currentUser, userToken) => {
	  //console.log("down payment percent", ([currentUser?.loan.termsOfLoan.downPayment.toFixed(2)]/[currentUser?.loan.termsOfLoan.baseLoanAmount.toFixed(2)] * 100.00).toFixed(1))
	  //console.log("term before currentUser",amortizationType, loanAmortizationPeriodCount, loanAmortizationPeriodType)
	Object.assign(currentUser?.loan.termsOfLoan, 
		{	
			baseLoanAmount: loanAmount || currentUser?.loan.termsOfLoan.baseLoanAmount,
			downPayment: downPayment || currentUser?.loan.termsOfLoan.downPayment,
			//ltv: LTV,
			//dti
			purchasePrice: purchasePrice || currentUser?.loan.termsOfLoan.purchasePrice,
			amortizationType: amortizationType || currentUser?.loan.termsOfLoan.amortizationType,
			loanAmortizationPeriodCount: loanAmortizationPeriodCount || currentUser?.loan.termsOfLoan.loanAmortizationPeriodCount,
			loanAmortizationPeriodType: loanAmortizationPeriodType || "Year", 
		})
	Object.assign(currentUser, 
		{ mortech: { 	
			targetPrice: "-999",
			}
		}); 
		//console.log("currentUser sent to getMortechRates", currentUser)
	await getMortechRates(currentUser, userToken);
  } 
  
  useEffect(() => {
    // make api call first time u come to the page or do a browser reload

	 valuesUpdated(currentUser, userToken)
	 var downPaymentPercentFuntion =  ((downPayment || currentUser?.loan.termsOfLoan.downPayment)/(purchasePrice || currentUser?.loan.termsOfLoan.purchasePrice)*100.0)
	 console.log(typeof downPaymentPercent, downPaymentPercent)
	 downPaymentPercentFuntion = downPaymentPercentFuntion.toFixed(1)
	 setDownPaymentPercent(downPaymentPercentFuntion)
  }, [purchasePrice, downPayment, loanAmortizationPeriodType, loanAmortizationPeriodCount, downPaymentPercent]);

  return (
    <SectionWrapper>
      <Container>
        <PricingArea>
          <InnerWrapper>
            <PricingCard display="flex">
              <div className="card-header">
                <Heading
                  as="h3"
                  content={'See what rates you can get today'}
                  textAlign="center"
                  fontFamily={'Sans'}
                  fontWeight="bold"
                />
              </div>

              <div className="card-body">
                <ul className="feature-list">
                  <Text content="Personalize your loan"></Text>

                  <Text
                    content="Harris allows you to tailor your loan for 
                              what you need. Simply select your loan amount, select 
                              your origination fee, term length and you're all set. A 
                              higher origination fee will give you a lower rate."
                  ></Text>
                  <p></p>
                  <Text content="Your max purchase price is"></Text>
				  <Text content={currentUser?.loan.preApproval.preApprovalMaxPurchasePrice}></Text>
				  <Text content="Your max loan is"></Text>
				  <Text content={currentUser?.loan.preApproval.preApprovalMaxLoan}></Text>
				  <Text content="Your max down payment is"></Text>
				  <Text content={currentUser?.loan.preApproval.preApprovalDownPayment}></Text>
                </ul>
              </div>
            </PricingCard>

{/* ########################################################################################################### */}

			
			{/* three select boxes, term, purchase price, down payment */}
			<div>
			<Dropdown
					name="termDropdown" 
					overlay={termMenu}
					onClick={(e) => {
						e.stopPropagation();
						e.preventDefault()
						handleShowOrHideDropDownTerm(e)}}
					visible={showOrHideDropDownTerm}	
					placement="bottomLeft">
						
        		<Button
					title={
						'Term: ' + 
						(loanAmortizationPeriodCount || currentUser?.loan.termsOfLoan.loanAmortizationPeriodCount) + ' ' + "Year" + " " + (amortizationType || currentUser?.loan.termsOfLoan.amortizationType) + " ▼"}>
				</Button>
      		</Dropdown>
			  &nbsp;
			<Dropdown  
					name="purchaseDropdown"
					trigger={["click"]}
			  		overlay={purchasePriceMenu} 
					  onClick={(e) => {
						e.stopPropagation();
						e.preventDefault()
						handleShowOrHideDropDownPurchasePrice(e)}}
					visible={showOrHideDropDownPurchasePrice} 
					placement="bottomLeft">
        		<Button
					title={'Purchase Price' + ' $' + (purchasePrice || currentUser?.loan.termsOfLoan.purchasePrice) + " ▼"}
					
					>
				</Button>
      		</Dropdown>
			  &nbsp;
			<Dropdown 
					name="downPaymentDropdown"
			  		overlay={downPaymentMenu} 
					  onClick={(e) => {
						e.stopPropagation();
						handleShowOrHideDropDownDownPayment(e)}} 
					visible={showOrHideDropDownDownPayment} 
					placement="bottomLeft"
					>
        		<Button
					title={'Down payment' + ' $' + (downPayment || (currentUser?.loan.termsOfLoan.downPayment)) + " " + (downPaymentPercent  || ((currentUser?.loan.termsOfLoan.downPayment.toFixed(2))/(currentUser?.loan.termsOfLoan.baseLoanAmount.toFixed(2)) * 100.0).toFixed(1) ) + "%" + " " + " ▼"}
					>
				</Button>
      		</Dropdown>
			  </div>
			  &nbsp;

{/* #######################################################################################################*/}
			{data == undefined && (
				"We could not find rates for these selections, please select other options"
			)}
			
			
			{data !== undefined && (			
			<PricingCard display="flex">
			<span className="tag">
                <img src={crown} alt="Crown" /> Lowest monthly payment
              </span>
			  <RateCardWrapper>
              <div >
                <Heading as="h3" content={data[0].rate + "%/(" + data[0].APR + "%)"} />
                <Text content={`Rate/APR`} />
			  </div>
			  <div>
                <Heading as="h3" content={'$' + data[0].piti.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} />
                <Text content={`Principal and interest`} />
              </div>
			  <div >
                <Heading as="h3" content={'$' + data[0].points.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} />
                <Text content={`Points`} />
              </div>
			  <div >
			  <Button
                  title={'Select'}
                  //go to last completed step
                  onClick={e => showModal(data[0].rate, data[0].APR, data[0].piti, data[0].points)}
				  />
				</div>
				</RateCardWrapper>
            </PricingCard>
			)}
			{data !== undefined && data[1] &&(	
			<PricingCard display="flex">
			  <RateCardWrapper>
              <div >
                <Heading as="h3" content={data[1].rate + "%/(" + data[1].APR + "%)"} />
                <Text content={`Rate/APR`} />
			  </div>
			  <div>
                <Heading as="h3" content={'$' + data[1].piti.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} />
                <Text content={`Principal and interest`} />
              </div>
			  <div >
                <Heading as="h3" content={'$' + data[1]?.points.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} />
                <Text content={`Points`} />
              </div>
			  <div >
			  <Button
                  title={'Select'}
                  //go to last completed step
                  onClick={e => showModal(data[1].rate, data[1].APR, data[1].piti, data[1].points)}
				  />
				</div>
				</RateCardWrapper>
            </PricingCard>
			)}
			{data !== undefined && data[2] &&(	
			<PricingCard display="flex">
			  <RateCardWrapper>
              <div >
                <Heading as="h3" content={data[2].rate + "%/(" + data[2].APR + "%)"} />
                <Text content={`Rate/APR`} />
			  </div>
			  <div>
                <Heading as="h3" content={'$' + data[2].piti.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} />
                <Text content={`Principal and interest`} />
              </div>
			  <div >
                <Heading as="h3" content={'$' + data[2].points.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} />
                <Text content={`Points`} />
              </div>
			  <div >
			  <Button
                  title={'Select'}
                  //go to last completed step
                  onClick={e => showModal(data[2].rate, data[2].APR, data[2].piti, data[2].points)}
				  />
				</div>
				</RateCardWrapper>
            </PricingCard>
			)}
			{data !== undefined && data[3] &&(
			<PricingCard display="flex">
			  <RateCardWrapper>
              <div >
                <Heading as="h3" content={data[3].rate + "%/(" + data[3].APR + "%)"} />
                <Text content={`Rate/APR`} />
			  </div>
			  <div>
                <Heading as="h3" content={'$' + data[3].piti.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} />
                <Text content={`Principal and interest`} />
              </div>
			  <div >
                <Heading as="h3" content={'$' + data[3].points.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} />
                <Text content={`Points`} />
              </div>
			  <div >
			  <Button
                  title={'Select'}
                  //go to last completed step
                  onClick={e => showModal(data[3].rate, data[3].APR, data[3].piti, data[3].points)}
				  />
				</div>
				</RateCardWrapper>
            </PricingCard>
			)}
			{data !== undefined && data[4] &&(
			<PricingCard display="flex">
			  <RateCardWrapper>
              <div >
                <Heading as="h3" content={data[4].rate + "%/(" + data[4].APR + "%)"} />
                <Text content={`Rate/APR`} />
			  </div>
			  <div>
                <Heading as="h3" content={'$' + data[4].piti.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} />
                <Text content={`Principal and interest`} />
              </div>
			  <div >
                <Heading as="h3" content={'$' + data[4].points.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} />
                <Text content={`Points`} />
              </div>
			  <div >
			  <Button
                  title={'Select'}
                  //go to last completed step
                  onClick={e => showModal(data[4].rate, data[4].APR, data[4].piti, data[4].points)}
				  />
				</div>
				</RateCardWrapper>
            </PricingCard>
			)}
			{data !== undefined && data[5] &&(
			<PricingCard display="flex">
			<span className="tag">
                <img src={crown} alt="Crown" /> Standard mortgage
              </span>
			  <RateCardWrapper>
              <div >
                <Heading as="h3" content={data[5].rate + "%/(" + data[5].APR + "%)"} />
                <Text content={`Rate/APR`} />
			  </div>
			  <div>
                <Heading as="h3" content={'$' + data[5].piti.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} />
                <Text content={`Principal and interest`} />
              </div>
			  <div >
                <Heading as="h3" content={'$' + data[5].points.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} />
                <Text content={`Points`} />
              </div>
			  <div >
			  <Button
                  title={'Select'}
                  //go to last completed step
                  onClick={e => showModal(data[5].rate, data[5].APR, data[5].piti, data[5].points)}
				  />
				</div>
				</RateCardWrapper>
            </PricingCard>
			)}
			{data !== undefined && data[6] &&(
			<PricingCard display="flex">
			<span className="tag">
                <img src={crown} alt="Crown" /> Lowest closing costs
              </span>
			  <RateCardWrapper>
              <div >
                <Heading as="h3" content={data[6].rate + "%/(" + data[6].APR + "%)"} />
                <Text content={`Rate/APR`} />
			  </div>
			  <div>
                <Heading as="h3" content={'$' + data[6].piti.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} />
                <Text content={`Principal and interest`} />
              </div>
			  <div >
                <Heading as="h3" content={'$' + data[6].points.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} />
                <Text content={`Points`} />
              </div>
			  <div >
			  <Button
                  title={'Select'}
                  //go to last completed step
                  onClick={e => showModal(data[6].rate, data[6].APR, data[6].piti, data[6].points)}
				  />
				</div>
				</RateCardWrapper>
            </PricingCard>
			)}

            {/* <PricingCard>	
              <Table columns={columns} dataSource={lowestPaymentsRates} pagination={false} 
			  		style={{fontFamily: "sans-serif",
					  textAlign: "center",
					 borderCollapse: 'collapse',
						borderSpacing: '0 1em' }}
					  span={6}
			  		/>
              <p></p>
			  <Table columns={columns} dataSource={standardRate} pagination={false} 
			  		style={{fontFamily: "sans-serif",
					  textAlign: "center",
					 borderCollapse: 'collapse',
						borderSpacing: '0 1em' }}
					  span={6}
			  		/>
				<p></p>
				<Table columns={columns} dataSource={lowestClosingCosts} pagination={false} 
			  		style={{fontFamily: "sans-serif",
					  textAlign: "center",
					 borderCollapse: 'collapse',
						borderSpacing: '0 1em' }}
					  span={6}
			  		/>

			  
              <Text
                style={{ float: 'left' }}
                content={`Money saved per month`}
              />
            </PricingCard> */}
            <Modal
              visible={isModalVisible}
              onOk={() => handleOk(currentUser, userToken)}
              onCancel={handleCancel}
            >
              <Heading
                as="h3"
                content={'Does this rate look good?'}
                textAlign="center"
                fontFamily={'Sans'}
                fontWeight="bold"
              />
              <Text content="If it does, we'll automatically update your loan costs on your Loan Estimate page."></Text>
              <Text content={'RATE/APR ' + " " + rateSelected + " " +  "(" + APRSelected.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "%)"}></Text>
              <Text content={'Term: ' + 
						(loanAmortizationPeriodCount || currentUser?.loan.termsOfLoan.loanAmortizationPeriodCount) + ' ' + "Year" + " " + (amortizationType || currentUser?.loan.termsOfLoan.amortizationType)}></Text>
              <Text content={'Points $' + pointsSelected.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}></Text>
              <Text
                content={
                  'Per month (principal and interest) $' + monthlyPaymentSelected.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }
              ></Text>
            </Modal>
          </InnerWrapper>
        </PricingArea>
      </Container>
    </SectionWrapper>
  );
}



/* 
const mapStateToProps = ({ root: { currentUser } }) => ({
  currentUser: currentUser?.user,
  userToken: currentUser?.token,
}) */ 
const mapStateToProps = (state) => ({
	currentUser: state.root.currentUser?.user,
	userToken: state.root.currentUser?.token,
  });

const mapDispatchToProps = (dispatch) => {
  return {
    updateUserInfo: (currentUser, userToken) =>
      dispatch(updateUserInfo(currentUser, userToken)),
	getMortechRates: (currentUser, userToken) =>
      dispatch(getMortechRates(currentUser, userToken)),  
  };
};

const SelectOfferContainerRedux = connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectOfferContainer);
export default SelectOfferContainerRedux;
//export default selectOfferContainer;
