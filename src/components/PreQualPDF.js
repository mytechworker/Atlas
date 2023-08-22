import dateFormat from 'dateformat';
import logo_img from "../images/logo.png";
import equal_housing_logo_img from "../images/equal-housing-logo.png";
import "../styles/PDF.css"

const PreQualPDF = ({
    Atlas_Loan_Scenario, 
    totalLoanAmount, 
        contactDetails,
        user}) => {

    const numberWithCommas = (num) => {
        if(num !== null){
            return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        }else{
            return num
        }
      }
    return (
    <html>
        <body>
            <div className="main-content">
                <div className="mail-heading">
                        <img src={logo_img} style={{"padding":"5px 5px 5px 0px",width:"310px",height:"72px"}} />
                        <h1>YOUR HOME PURCHASE PREQUALIFICATION</h1>
                </div>
                <div className="mail-body">
                    <p>{dateFormat(new Date(),"mmmm d, yyyy")}</p>
                    <p>Dear {contactDetails.firstName},</p>
                    <p>Congratulations! Based on the information you have provided to us,
                    we have determined that you are prequalified for a home purchase loan at the following requirements and terms:</p>
                    <h1>Home Price:	${numberWithCommas(Atlas_Loan_Scenario.houseValue)}</h1>
                    <table>
                        <tbody>
                            <tr>
                                <td>Property Location</td>
                                <td>{Atlas_Loan_Scenario.propertyCounty}, {Atlas_Loan_Scenario.propertyState}</td>
                            </tr>
                            <tr>
                                <td>Property Type</td>
                                <td>{Atlas_Loan_Scenario.propertyType}</td>
                            </tr>
                            <tr>
                                <td>Occupancy Type</td>
                                <td>{Atlas_Loan_Scenario.occupancy}</td>
                            </tr>
                            <tr>
                                <td>Down Payment</td>
                                <td>${numberWithCommas(Atlas_Loan_Scenario.houseValue - Atlas_Loan_Scenario.baseLoanAmount)}</td>
                            </tr>
                            <tr>
                                <td>Loan Amount</td>
                                <td>{numberWithCommas(totalLoanAmount)}</td>
                            </tr>
                            <tr>
                                <td>Loan Program</td>
                                <td>{Atlas_Loan_Scenario.loanType} {Atlas_Loan_Scenario.loanProduct}</td>
                            </tr>
                            <tr>
                                <td>Credit Score</td>
                                <td>{numberWithCommas(Atlas_Loan_Scenario.creditScore)}</td>
                            </tr>
                            <tr>
                                <td>Annual Income</td>
                                <td>{numberWithCommas(Atlas_Loan_Scenario.annualIncome)}</td>
                            </tr>
                            
                        </tbody>
                    </table>
                    <p>
                    This prequalification letter is subject to verification of all information provided by you as well as 
                    additional requirements that may be required to underwrite your loan. This is not a commitment to lend.
                    This pre-qualification is a preliminary determination only and is subject to underwriter approval.
                    </p>
                    <p>
                    I look forward to having the opportunity to provide you with the best homebuying experience in the market.
                    If you have any questions or concerns, please don't hesitate to call the number below.
                    </p>
                    <div className="sign-info">
                    <p>
                    Sincerely,
                    </p>
                        <img src={user.signatureImage} style={{"padding":"5px 5px 5px 0px",width:"80px",height:"60px"}}/>
                    </div>
                </div>
                <div className="mail-info">
                    <div>
                        <p>{user.firstName} {user.lastName}</p>
                        <p>Mortgage Loan Officer</p>
                        <p>NMLS ID: {user.nmlsId}</p>
                        <p>O: {user.phone} E: {user.email}</p>
                    </div>
                    <div>
                    <img src={equal_housing_logo_img} style={{"padding":"5px 5px 5px 0px",width:"80px",height:"60px"}} />
                    </div>
                </div>
            </div>
        </body>
    </html>
    ) 
}

export default PreQualPDF;