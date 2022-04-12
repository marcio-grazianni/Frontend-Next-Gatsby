import React, { Fragment, useState, useEffect } from 'react';
import { navigate } from 'gatsby';
import { connect } from 'react-redux';
import Button from 'common/src/components/Button';
import { sendFile, updateUserInfo } from '../../../actions';
import { loadState } from '../../../store';
import {
  pdf,
  BlobProvider,
  PDFViewer,
  PDFDownloadLink,
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from '@react-pdf/renderer';
import Container from 'common/src/components/UI/Container';
//side bar with loan flow

{
  /*
const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#E4E4E4',
    height: '100%',
    width: '100%'
  },
  section: {
    margin: 0,
    padding: 0,
    flexGrow: 1,
    height: 200
  },
  view: {
    width: '100%',
    height: '100%',
    padding: 0,
    backgroundColor: 'white',
  },
  image: {
    objectFit: 'cover',
  }
});
*/
}

const BORDER_COLOR = '#bfbfbf';
const BORDER_STYLE = 'solid';
const COL1_WIDTH = 30;
const COLN_WIDTH = (240 - COL1_WIDTH) / 3;
const styles = StyleSheet.create({
  body: {
    padding: 10,
  },
  table: {
    display: 'table',
    width: 'auto',
    borderStyle: BORDER_STYLE,
    borderColor: BORDER_COLOR,
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: {
    margin: 'auto',
    flexDirection: 'row',
  },
  tableCol1Header: {
    width: COL1_WIDTH + '%',
    borderStyle: BORDER_STYLE,
    borderColor: BORDER_COLOR,
    borderBottomColor: '#000',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableColHeader: {
    width: COLN_WIDTH + '%',
    borderStyle: BORDER_STYLE,
    borderColor: BORDER_COLOR,
    borderBottomColor: '#000',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableCol1: {
    width: COL1_WIDTH + '%',
    borderStyle: BORDER_STYLE,
    borderColor: BORDER_COLOR,
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableCol: {
    width: COLN_WIDTH + '%',
    borderStyle: BORDER_STYLE,
    borderColor: BORDER_COLOR,
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableCellHeader: {
    margin: 5,
    fontSize: 12,
    fontWeight: 500,
  },
  tableCell: {
    margin: 5,
    fontSize: 10,
  },
});

const FinalApplicationCheckContainer = ({
  currentUser,
  sendFile,
  userToken,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);

  console.log('isLoaded in component', isLoaded);
  console.log('current user==>>>', currentUser);

  const saveAndContinue = async (blob) => {
    console.log('got hereeeddd blob==>>', blob);

    userToken = JSON.parse(localStorage.getItem('jwt'));
    console.log('Final Application Check: userToken', userToken);

    try {
      const newPdfFile = new File([blob], 'yoo.pdf', {
        lastModified: new Date().getTime(),
      });
      console.log('newPdfFile==>>', newPdfFile);

      sendFile(newPdfFile, userToken, 'applicationForm');
      navigate('/identityVerif/');
    } catch (err) {
      console.log('errrrrr==>>', err);
    }
  };

  useEffect(() => {
    setIsLoaded(true);
    console.log('isLoaded in useEffect', isLoaded);
  }, []);

  const GeneratePDF = ({ styles, currentUser }) => (
    <Document>
      <Page style={styles.body}>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={styles.tableCol1Header}>
              <Text style={styles.tableCellHeader}>Application Date</Text>
            </View>
            <View style={styles.tableColHeader}>
              <Text style={styles.tableCellHeader}>
                {currentUser.createdAt.substr(0, 10)}
              </Text>
            </View>
          </View>

          <View style={styles.tableRow}>
            <View style={styles.tableCol1}>
              <Text style={styles.tableCell}>Loan Number</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>33251</Text>
            </View>
          </View>

          <View style={styles.tableRow}>
            <View style={styles.tableCol1}>
              <Text style={styles.tableCell}>Legal First Name</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{currentUser.firstName}</Text>
            </View>
          </View>

          <View style={styles.tableRow}>
            <View style={styles.tableCol1}>
              <Text style={styles.tableCell}>Legal Last Name</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{currentUser.lastName}</Text>
            </View>
          </View>

          <View style={styles.tableRow}>
            <View style={styles.tableCol1}>
              <Text style={styles.tableCell}>Property Address</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>
                {currentUser.propertyAddress}
              </Text>
            </View>
          </View>

          <View style={styles.tableRow}>
            <View style={styles.tableCol1}>
              <Text style={styles.tableCell}>Apt/Suite</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>
                {currentUser.apartmentNumber}
              </Text>
            </View>
          </View>

          <View style={styles.tableRow}>
            <View style={styles.tableCol1}>
              <Text style={styles.tableCell}>City</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{currentUser.city}</Text>
            </View>
          </View>

          <View style={styles.tableRow}>
            <View style={styles.tableCol1}>
              <Text style={styles.tableCell}>State</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{currentUser.state}</Text>
            </View>
          </View>

          <View style={styles.tableRow}>
            <View style={styles.tableCol1}>
              <Text style={styles.tableCell}>Zip Code</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{currentUser.zipCode}</Text>
            </View>
          </View>

          <View style={styles.tableRow}>
            <View style={styles.tableCol1}>
              <Text style={styles.tableCell}>
                Property Type Primary/Secondary/Investment
              </Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>
                {currentUser.primaryResidence}
              </Text>
            </View>
          </View>

          <View style={styles.tableRow}>
            <View style={styles.tableCol1}>
              <Text style={styles.tableCell}>Financing Purpose</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>
                {currentUser.financingPurpose}
              </Text>
            </View>
          </View>

          <View style={styles.tableRow}>
            <View style={styles.tableCol1}>
              <Text style={styles.tableCell}>Date of Birth</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{currentUser.dateOfBirth}</Text>
            </View>
          </View>

          <View style={styles.tableRow}>
            <View style={styles.tableCol1}>
              <Text style={styles.tableCell}>Social Security Number</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>
                {currentUser.socialSecurityNumberOrTIN}
              </Text>
            </View>
          </View>

          <View style={styles.tableRow}>
            <View style={styles.tableCol1}>
              <Text style={styles.tableCell}>Stated Income</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{currentUser.annualIncome}</Text>
            </View>
          </View>

          <View style={styles.tableRow}>
            <View style={styles.tableCol1}>
              <Text style={styles.tableCell}>
                Ownership Type (sole/joint trust
              </Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{currentUser.ownershipType}</Text>
            </View>
          </View>

          <View style={styles.tableRow}>
            <View style={styles.tableCol1}>
              <Text style={styles.tableCell}>Post-Loan Debt to Income %</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>
                Placeholder for debt to income
              </Text>
            </View>
          </View>

          <View style={styles.tableRow}>
            <View style={styles.tableCol1}>
              <Text style={styles.tableCell}>
                Post-Loan Combined Loan to Value %
              </Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Placeholder for LTV</Text>
            </View>
          </View>

          <View style={styles.tableRow}>
            <View style={styles.tableCol1}>
              <Text style={styles.tableCell}>Loan Term</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Loan Term</Text>
            </View>
          </View>

          <View style={styles.tableRow}>
            <View style={styles.tableCol1}>
              <Text style={styles.tableCell}>Loan Interest Rate/APR</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>APR</Text>
            </View>
          </View>

          <View style={styles.tableRow}>
            <View style={styles.tableCol1}>
              <Text style={styles.tableCell}>Loan Amount</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>
                {currentUser.loanAmountSelected}
              </Text>
            </View>
          </View>

          <View style={styles.tableRow}>
            <View style={styles.tableCol1}>
              <Text style={styles.tableCell}>Intitial Draw Amount</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Draw amount</Text>
            </View>
          </View>

          <View style={styles.tableRow}>
            <View style={styles.tableCol1}>
              <Text style={styles.tableCell}>Origination Fee</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Origination Fee</Text>
            </View>
          </View>

          <View style={styles.tableRow}>
            <View style={styles.tableCol1}>
              <Text style={styles.tableCell}>Broker Fee</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Broker Fee</Text>
            </View>
          </View>

          <View style={styles.tableRow}>
            <View style={styles.tableCol1}>
              <Text style={styles.tableCell}>Phone Number</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{currentUser.phoneNumber}</Text>
            </View>
          </View>

          <View style={styles.tableRow}>
            <View style={styles.tableCol1}>
              <Text style={styles.tableCell}>Email Address</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{currentUser.email}</Text>
            </View>
          </View>

          <View style={styles.tableRow}>
            <View style={styles.tableCol1}>
              <Text style={styles.tableCell}>Race</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{currentUser.race}</Text>
            </View>
          </View>

          <View style={styles.tableRow}>
            <View style={styles.tableCol1}>
              <Text style={styles.tableCell}>Ethnicicty</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{currentUser.ethnicity}</Text>
            </View>
          </View>

          <View style={styles.tableRow}>
            <View style={styles.tableCol1}>
              <Text style={styles.tableCell}>Sex</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{currentUser.gender}</Text>
            </View>
          </View>

          <View style={styles.tableRow}>
            <View style={styles.tableCol1}>
              <Text style={styles.tableCell}>Marital Status</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{currentUser.maritalStatus}</Text>
            </View>
          </View>

          <View style={styles.tableRow}>
            <View style={styles.tableCol1}>
              <Text style={styles.tableCell}>MLO Name</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Christopher Harris</Text>
            </View>
          </View>

          <View style={styles.tableRow}>
            <View style={styles.tableCol1}>
              <Text style={styles.tableCell}>MLO NMLS ID</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>563412</Text>
            </View>
          </View>

          <View style={styles.tableRow}>
            <View style={styles.tableCol1}>
              <Text style={styles.tableCell}>MLO Signature</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Christopher Harris</Text>
            </View>
          </View>

          <View style={styles.tableRow}>
            <View style={styles.tableCol1}>
              <Text style={styles.tableCell}>Lender Name</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Harris Technologies, Inc</Text>
            </View>
          </View>

          <View style={styles.tableRow}>
            <View style={styles.tableCol1}>
              <Text style={styles.tableCell}>Lender NMLS ID</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>fake number</Text>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );

  return (
    <Fragment>
      <Container>
        {isLoaded && (
          <PDFViewer height={'1000'} width={'100%'}>
            <GeneratePDF styles={styles} currentUser={currentUser} />
          </PDFViewer>
        )}

        {/*<Button
            onClick={() => saveAndContinue(currentUser, userToken)}
            //{...button}
            title="Save and continue"
          />*/}

        {isLoaded && (
          <BlobProvider
            document={<GeneratePDF styles={styles} currentUser={currentUser} />}
          >
            {({ blob, loading }) =>
              loading ? (
                'loading...'
              ) : (
                <Button
                  onClick={() => saveAndContinue(blob)}
                  title="Save and continue"
                />
              )
            }
          </BlobProvider>
        )}
      </Container>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  currentUser: state.root.currentUser,
});

const mapDispatchToProps = (dispatch) => {
  return {
    sendFile: (file, userToken, route) =>
      dispatch(sendFile(file, userToken, route)),
  };
};

const FinalApplicationCheckContainerRedux = connect(
  mapStateToProps,
  mapDispatchToProps
)(FinalApplicationCheckContainer);

export default FinalApplicationCheckContainerRedux;
