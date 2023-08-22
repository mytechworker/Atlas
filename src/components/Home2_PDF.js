import { useEffect, useState } from "react";
import dateFormat from 'dateformat';
import logo_img from "../images/logo.png";
import "../styles/PDF.css"

const Home2_PDF = ({
    totalHOIPremium,
    totalPrepaidInterest,
    totalPrepaidTaxes,
    totalHOI,
    totalPropertyTaxes,
    sale_Price_OR_Payoffs,
    secondMortgage,
    estimatedEscrow,
    Atlas_Loan_Scenario, 
    totalLoanAmount, 
    principalInterest,
     estimatedCashToClose,
     governmentFundingFee,
        blockA,
        blockB,
        blockC,
        blockD,
        blockE,
        blockF,
        blockG,
        blockH,
        blockI,
        blockJ,
        contactDetails,
        user}) => {

    const numberWithCommas = (num) => {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      }
    return (
    <html>
        <body>
            <div>
                <table>
                    <tbody>
                        <tr className="border-bottom">
                            <td className="leftCol border-left-0" style={{borderBottom:"0px",borderTop:"0px",borderLeft:"0px",width:"200px"}}>
                                <img className="pdfLogo" src={logo_img} style={{"padding":"5px 5px 5px 0px"}} />
                            </td>
                            <td className="rightCol border-left-0" style={{"lineHeight": "20px",width:"334px",borderBottom:"0px"}}>
                            <span className="line-height"> Prepared For: {contactDetails.firstName + " " + contactDetails.lastName}<br/></span>
                            <span className="line-height"> Prepared By: {user.firstName + " " + user.lastName}, NMLS #{user.nmlsId}<br/></span>
                            <span className="line-height"> Phone: {user.phone}<br/></span>
                            <span className="line-height"> Preparation Date: {dateFormat(Atlas_Loan_Scenario.dateUpdated,"mmmm d, yyyy")}
                                <br/></span>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="2" className="border-right-0" style={{"padding":"5px"}}>
                                <span className="line-height">The fees listed below are estimates, and your rate varies with market conditions until locked. Your actual rate, payment, and costs could be higher. Get an official Loan Estimate before choosing a loan.</span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <br/>
            <div>
            <table>
                <tbody>
                    <tr className="blueRow">
                        <td  className="td-heading" colSpan="2">ASSUMPTIONS</td>
                    </tr>
                    <tr style={{borderBottom:"0px",borderTop:"0px"}}>
                        <td className="leftCol odd-td-width border-right-0" style={{borderBottom:"0px",borderTop:"0px",borderLeft:"0px",width:"200px"}}>Loan Purpose:</td>
                        <td className="rightCol even-td-width" style={{borderBottom:"0px",borderTop:"0px",borderRight:"0px",width:"334px"}}>
                            {
                              Atlas_Loan_Scenario.loanPurpose === "Refinance" ?
                                Atlas_Loan_Scenario.isCashout === 1 ? "Refinance- Cash Out" : "Refinance- Rate/Term"
                              : (Atlas_Loan_Scenario.loanPurpose === "Purchase" ? "Purchase" : "")
                            }
                        </td>
                    </tr>
                    <tr style={{borderBottom:"0px",borderTop:"0px"}}>
                        <td className="leftCol odd-td-width border-right-0" style={{borderBottom:"0px",borderTop:"0px",borderLeft:"0px",width:"200px"}}>Location:</td>
                        <td className="rightCol even-td-width" style={{borderBottom:"0px",borderTop:"0px",borderRight:"0px",width:"334px"}}>
                            {Atlas_Loan_Scenario.propertyCountry + " County, " + Atlas_Loan_Scenario.propertyState}
                        </td>
                    </tr>
                    <tr style={{borderBottom:"0px",borderTop:"0px"}}>
                        <td className="leftCol odd-td-width border-right-0" style={{borderBottom:"0px",borderTop:"0px",borderLeft:"0px",width:"200px"}}>Est. Value/ Sale Price:</td>
                        <td className="rightCol even-td-width" style={{borderBottom:"0px",borderTop:"0px",borderRight:"0px",width:"334px"}}>
                            ${numberWithCommas(Math.round(Atlas_Loan_Scenario.houseValue))}
                        </td>
                    </tr>
                    <tr style={{borderBottom:"0px",borderTop:"0px"}}>
                        <td className="leftCol odd-td-width border-right-0" style={{borderBottom:"0px",borderTop:"0px",borderLeft:"0px",width:"200px"}}>Lock Period:</td>
                        <td className="rightCol even-td-width" style={{borderBottom:"0px",borderTop:"0px",borderRight:"0px",width:"334px"}}>
                            {Atlas_Loan_Scenario.lockPeriod}
                            </td>
                    </tr>
                    <tr style={{borderBottom:"0px",borderTop:"0px"}}>
                        <td className="leftCol odd-td-width border-right-0" style={{borderBottom:"0px",borderTop:"0px",borderLeft:"0px",width:"200px"}}>Credit Score:</td>
                        <td className="rightCol even-td-width" style={{borderBottom:"0px",borderTop:"0px",borderRight:"0px",width:"334px"}}>
                            {Atlas_Loan_Scenario.creditScore}
                            </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <br/>
        <div>
            <table>
                <tbody>
                    <tr className="blueRow">
                        <td  className="td-heading" colSpan="2">PROPOSED TERMS</td>
                    </tr>
                    <tr className="border-bottom">
                        <td className="leftCol border-right-0" style={{width:"200px"}}>Loan Program:</td>
                        <td className="rightCol" style={{width:"334px"}}>
                            {Atlas_Loan_Scenario.loanTypeSpecial} {Atlas_Loan_Scenario.loanProduct}
                            </td>
                    </tr>
                    <tr className="border-bottom">
                        <td className="leftCol border-right-0" style={{width:"200px"}}>Loan Amount:</td>
                        <td className="rightCol" style={{width:"334px"}}>
                            ${numberWithCommas(Math.round(totalLoanAmount))}
                        </td>
                    </tr>
                    <tr className="border-bottom">
                        <td className="leftCol border-right-0" style={{width:"200px"}}>Interest Rate:</td>
                        <td className="rightCol" style={{width:"334px"}}>
                            {Atlas_Loan_Scenario.interestRate}%
                            </td>
                    </tr>
                    <tr className="border-bottom">
                        <td className="leftCol border-right-0" style={{width:"200px"}}>Monthly Principal &amp; Interest:</td>
                        <td className="rightCol" style={{width:"334px"}}>
                            ${numberWithCommas(Math.round(principalInterest))}
                            <i style={{"fontSize": "8px"}}> <span>(See below for your Estimated Total Monthly Payment)</span></i>
                        </td>
                    </tr>
                    <tr className="border-bottom">
                        <td className="leftCol border-right-0" style={{width:"200px"}}>Prepayment Penalty:</td>
                        <td className="rightCol" style={{width:"334px"}}>NO</td>
                    </tr>
                    <tr>
                        <td className="leftCol border-right-0" style={{width:"200px"}}>Balloon Payment:</td>
                        <td className="rightCol" style={{width:"334px"}}>NO</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <br/>
        <div>
            <table>
                <tbody>
                    <tr className="blueRow">
                        <td className="td-heading"  colSpan="2">PROJECTED PAYMENTS</td>
                    </tr>
                    <tr className="border-bottom">
                        <td className="leftCol border-right-0" style={{width:"200px"}}>Principal &amp; Interest:</td>
                        <td className="rightCol" style={{width:"334px"}}>
                            ${numberWithCommas(Math.round(principalInterest))}
                        </td>
                    </tr>
                    <tr className="border-bottom">
                        <td className="leftCol border-right-0" style={{width:"200px"}}>Mortgage Insurance:</td>
                        <td className="rightCol" style={{width:"334px"}}>
                            ${numberWithCommas(Math.round(Atlas_Loan_Scenario.annualMortgageInsuranceRate * totalLoanAmount/1200))}
                        </td>
                    </tr>
                    <tr className="border-bottom">
                        <td className="leftCol border-right-0" style={{width:"200px"}}>Estimated Taxes:</td>
                        <td className="rightCol" style={{width:"334px"}}>
                            ${numberWithCommas(Math.round(Atlas_Loan_Scenario.monthlyPropertyTax))}
                        </td>
                    </tr>
                    <tr className="border-bottom">
                        <td className="leftCol border-right-0" style={{width:"200px"}}>Estimated Homeowners Insurance:</td>
                        <td className="rightCol" style={{width:"334px"}}>
                            ${numberWithCommas(Math.round(Atlas_Loan_Scenario.monthlyHOI))}
                        </td>
                    </tr>
                    { Atlas_Loan_Scenario.monthlyHOA !=0 ?
                        <tr className="border-bottom">
                            <td className="leftCol border-right-0" style={{width:"200px"}}>HOA Dues:</td>
                            <td className="rightCol" style={{width:"334px"}}>
                                ${numberWithCommas(Math.round(Atlas_Loan_Scenario.monthlyHOA))}
                            </td>
                        </tr>
                    : null}
                    <tr>
                        <td className="leftCol border-right-0"><strong  className="bold-500">Estimated Total Monthly Payment:</strong></td>
                        <td className="rightCol">
                        <strong  className="bold-500">
                            ${
                                numberWithCommas(Math.round(
                                    principalInterest
                                    + Atlas_Loan_Scenario.monthlyPropertyTax
                                    + Atlas_Loan_Scenario.monthlyHOI
                                    + (Atlas_Loan_Scenario.mortgageInsurancePremiumType === "Monthly" ? Atlas_Loan_Scenario.annualMortgageInsuranceRate * Atlas_Loan_Scenario.baseLoanAmount/12 : 0)
                                    + Atlas_Loan_Scenario.monthlyHOA
                                ))
                            }
                        </strong>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <br/>
        <div>
            <table>
                <tbody>
                    <tr className="blueRow">
                        <td className="td-heading"  colSpan="3">COSTS AT CLOSING</td>
                    </tr>
                    <tr className="border-bottom">
                        <td className="leftCol5 border-right-0" style={{width:"200px"}}><strong  className="bold-500">Estimated Closing Costs:</strong></td>
                        <td className="middleCol5" style={{borderRight:"0px",width:"50px"}}>
                            <strong  className="bold-500">${numberWithCommas(Math.round(blockJ))}</strong>
                        </td>
                        <td className="rightCol5" style={{borderLeft:"0px",width:"284px"}}>Includes lender fees and third-party fees (ie title fees, taxes, recording, etc)</td>
                    </tr>
                    <tr>
                        
                        <td className="leftCol5 border-right-0" style={{width:"200px"}}><strong  className="bold-500">Estimated Cash to Close:</strong></td>
                        {estimatedCashToClose > 0 ? 
                            <>
                                <td className="middleCol5" style={{borderRight:"0px",width:"50px"}}>
                                    <strong  className="bold-500">${numberWithCommas(Math.round(estimatedCashToClose))}</strong> 
                                </td>
                                <td className="rightCol5" style={{borderLeft:"0px",width:"284px"}}>Includes escrows and prepaids</td>
                            </>
                        :
                            <>
                                <td className="middleCol5" style={{borderRight:"0px",width:"50px"}}>
                                    <strong  className="bold-500">$0</strong> 
                                </td>
                                <td className="rightCol5" style={{borderLeft:"0px",width:"284px"}}>You will receive {" "}
                                    <strong  className="bold-500">${numberWithCommas(Math.abs(Math.round(estimatedCashToClose)))}</strong> {" "}
                                    cash at closing
                                </td>
                            </>
                        }
                    </tr>
                </tbody>
            </table>
        </div>
        { Atlas_Loan_Scenario.monthlyHOA === 0 ?
            <><br/><br/></>
        : null}
        <br/>
        <div>
            <p className="heading-h3"><b>Closing Cost Details</b></p>
            
            <table className="table-closing" style={{"display":"block"}}> 
                <tbody style={{border:0}}>
                    <tr style={{border:0}}>
                        <td style={{"verticalAlign": "top"}} style={{border:"0px"}}>
                            <table className="table-child1" style={{border:"0px"}}>
                                <tr className="blueRow">
                                    <td colSpan="2"  className="td-heading"  style={{fontSize:"12px"}}>Estimated Loan Costs</td>
                                </tr>
                                <tr  style={{borderBottom:"0px",borderTop:"0px",borderLeft:"0px",borderRight:"0px"}}>
                                    <td className="leftCol2 border-right-0" style={{borderBottom:"0px",borderTop:"0px",borderLeft:"0px",borderRight:"0px"}}><strong  className="bold-500">A. Origination Charges</strong></td>
                                    <td className="rightCol2" style={{borderBottom:"0px",borderTop:"0px",borderLeft:"0px",borderRight:"0px"}}>
                                        <strong  className="bold-500">${numberWithCommas(Math.round(blockA))}</strong>
                                    </td>
                                </tr>
                                {Atlas_Loan_Scenario.blockADiscountFee != 0 ? 
                                    <tr style={{borderBottom:"0px",borderTop:"0px",borderLeft:"0px",borderRight:"0px"}}>
                                        <td className="leftCol2 border-right-0" style={{borderBottom:"0px",borderTop:"0px",borderLeft:"0px",borderRight:"0px"}}>Loan Discount Fee (Points)</td>
                                        <td className="rightCol2" style={{borderBottom:"0px",borderTop:"0px",borderLeft:"0px",borderRight:"0px"}}>
                                            ${numberWithCommas(Math.round(Atlas_Loan_Scenario.blockADiscountFee))}
                                        </td>
                                    </tr>
                                : null}
                                {Atlas_Loan_Scenario.blockAprocessingFee != 0 ? 
                                    <tr style={{borderBottom:"0px",borderTop:"0px",borderLeft:"0px",borderRight:"0px"}}>
                                        <td className="leftCol2 border-right-0" style={{borderBottom:"0px",borderTop:"0px",borderLeft:"0px",borderRight:"0px"}}>Loan Processing Fee</td>
                                        <td className="rightCol2" style={{borderBottom:"0px",borderTop:"0px",borderLeft:"0px",borderRight:"0px"}}>
                                                ${numberWithCommas(Math.round(Atlas_Loan_Scenario.blockAprocessingFee))}
                                        </td>
                                    </tr>
                                : null}
                                {Atlas_Loan_Scenario.blockATaxService != 0 ? 
                                    <tr style={{borderBottom:"0px",borderTop:"0px",borderLeft:"0px",borderRight:"0px"}}>
                                        <td className="leftCol2 border-right-0" style={{borderBottom:"0px",borderTop:"0px",borderLeft:"0px",borderRight:"0px"}}>Tax Service Fee</td>
                                        <td className="rightCol2" style={{borderBottom:"0px",borderTop:"0px",borderLeft:"0px",borderRight:"0px"}}>
                                             ${numberWithCommas(Math.round(Atlas_Loan_Scenario.blockATaxService))}
                                        </td>
                                    </tr>
                                : null}
                                
                                <tr className="border-bottom" style={{borderBottom:"0px",borderTop:"0px",borderLeft:"0px",borderRight:"0px"}}>
                                    {Atlas_Loan_Scenario.blockAOriginationFee != 0 ? 
                                        <>
                                            <td className="leftCol2 border-right-0" style={{borderBottom:"0px",borderTop:"0px",borderLeft:"0px",borderRight:"0px"}}>Loan Origination Fees</td>
                                            <td className="rightCol2" style={{borderBottom:"0px",borderTop:"0px",borderLeft:"0px",borderRight:"0px"}}>
                                                ${numberWithCommas(Math.round(Atlas_Loan_Scenario.blockAOriginationFee))}
                                            </td>
                                        </>
                                    : null}
                                </tr>
                                <tr style={{borderBottom:"0px",borderTop:"0px",borderLeft:"0px",borderRight:"0px"}}>
                                    <td className="leftCol2 border-right-0" style={{borderBottom:"0px",borderTop:"0px",borderLeft:"0px",borderRight:"0px"}}><strong  className="bold-500">B. Services You Cannot Shop For</strong></td>
                                    <td className="rightCol2" style={{borderBottom:"0px",borderTop:"0px",borderLeft:"0px",borderRight:"0px"}}>
                                        <strong  className="bold-500">${numberWithCommas(Math.round(blockB))}</strong>
                                    </td>
                                </tr>
                                    {Atlas_Loan_Scenario.blockBAppraisalFee != 0 ? 
                                        <tr style={{borderBottom:"0px",borderTop:"0px",borderLeft:"0px",borderRight:"0px"}}>
                                            <td className="leftCol2 border-right-0" style={{borderBottom:"0px",borderTop:"0px",borderLeft:"0px",borderRight:"0px"}}>Appraisal</td>
                                            <td className="rightCol2" style={{borderBottom:"0px",borderTop:"0px",borderLeft:"0px",borderRight:"0px"}}>
                                            ${numberWithCommas(Math.round(Atlas_Loan_Scenario.blockBAppraisalFee))}
                                            </td>
                                        </tr>
                                    : null}
                                {Atlas_Loan_Scenario.blockBCreditFees != 0 ? 
                                    <tr style={{borderBottom:"0px",borderTop:"0px",borderLeft:"0px",borderRight:"0px"}}>
                                        <td className="leftCol2 border-right-0" style={{borderBottom:"0px",borderTop:"0px",borderLeft:"0px",borderRight:"0px"}}>Credit Report</td>
                                        <td className="rightCol2" style={{borderBottom:"0px",borderTop:"0px",borderLeft:"0px",borderRight:"0px"}}>
                                            ${numberWithCommas(Math.round(Atlas_Loan_Scenario.blockBCreditFees))}
                                        </td>
                                    </tr>
                                : null}
                                {Atlas_Loan_Scenario.blockBFloodCertification != 0 ? 
                                    <tr style={{borderBottom:"0px",borderTop:"0px",borderLeft:"0px",borderRight:"0px"}}>
                                        <td className="leftCol2 border-right-0" style={{borderBottom:"0px",borderTop:"0px",borderLeft:"0px",borderRight:"0px"}}>Flood Certification</td>
                                        <td className="rightCol2" style={{borderBottom:"0px",borderTop:"0px",borderLeft:"0px",borderRight:"0px"}}>
                                        ${numberWithCommas(Math.round(Atlas_Loan_Scenario.blockBFloodCertification))}
                                  
                                        </td>
                                    </tr>
                                : null}
                                {Atlas_Loan_Scenario.blockBhoaQuestionnaire != 0 ? 
                                    <tr style={{borderBottom:"0px",borderTop:"0px",borderLeft:"0px",borderRight:"0px"}}>
                                        <td className="leftCol2 border-right-0" style={{borderBottom:"0px",borderTop:"0px",borderLeft:"0px",borderRight:"0px"}}>Condo Questionnaire</td>
                                        <td className="rightCol2" style={{borderBottom:"0px",borderTop:"0px",borderLeft:"0px",borderRight:"0px"}}>
                                        ${numberWithCommas(Math.round(Atlas_Loan_Scenario.blockBhoaQuestionnaire))}
                                        </td>
                                    </tr>
                                : null}
                                {Atlas_Loan_Scenario.blockBcondoProjectApproval != 0 ? 
                                    <tr style={{borderBottom:"0px",borderTop:"0px",borderLeft:"0px",borderRight:"0px"}}>
                                        <td className="leftCol2 border-right-0" style={{borderBottom:"0px",borderTop:"0px",borderLeft:"0px",borderRight:"0px"}}>Condo Project Approval</td>
                                        <td className="rightCol2" style={{borderBottom:"0px",borderTop:"0px",borderLeft:"0px",borderRight:"0px"}}>
                                        ${numberWithCommas(Math.round(Atlas_Loan_Scenario.blockBcondoProjectApproval))}
                                        </td>
                                    </tr>
                                : null}
                                {Atlas_Loan_Scenario.blockBsinglePremiumMI != 0 ? 
                                    <tr style={{borderBottom:"0px",borderTop:"0px",borderLeft:"0px",borderRight:"0px"}}>
                                        <td className="leftCol2 border-right-0" style={{borderBottom:"0px",borderTop:"0px",borderLeft:"0px",borderRight:"0px"}}>Upfront Mortgage Insurance Premium</td>
                                        <td className="rightCol2" style={{borderBottom:"0px",borderTop:"0px",borderLeft:"0px",borderRight:"0px"}}>
                                        ${numberWithCommas(Math.round(Atlas_Loan_Scenario.blockBsinglePremiumMI))}
                                        </td>
                                    </tr>
                                : null}
                                {Atlas_Loan_Scenario.blockBtaxReturnVerificationFee != 0 ? 
                                    <tr style={{borderBottom:"0px",borderTop:"0px",borderLeft:"0px",borderRight:"0px"}}>
                                        <td className="leftCol2 border-right-0" style={{borderBottom:"0px",borderTop:"0px",borderLeft:"0px",borderRight:"0px"}}>Tax Return Verification Fee</td>
                                        <td className="rightCol2" style={{borderBottom:"0px",borderTop:"0px",borderLeft:"0px",borderRight:"0px"}}>
                                        ${numberWithCommas(Math.round(Atlas_Loan_Scenario.blockBtaxReturnVerificationFee))}
                                        </td>
                                    </tr>
                                : null}
                                {Atlas_Loan_Scenario.blockBverificationEmployment != 0 ? 
                                    <tr style={{borderBottom:"0px",borderTop:"0px",borderLeft:"0px",borderRight:"0px"}}>
                                        <td className="leftCol2 border-right-0" style={{borderBottom:"0px",borderTop:"0px",borderLeft:"0px",borderRight:"0px"}}>Verification of Employment</td>
                                        <td className="rightCol2" style={{borderBottom:"0px",borderTop:"0px",borderLeft:"0px",borderRight:"0px"}}>
                                        ${numberWithCommas(Math.round(Atlas_Loan_Scenario.blockBverificationEmployment))}
                                        </td>
                                    </tr>
                                : null}
                                <tr className="border-bottom" style={{borderBottom:"0px",borderTop:"0px",borderLeft:"0px",borderRight:"0px"}}>
                                    {governmentFundingFee != 0 ? 
                                        <>
                                            <td className="leftCol2 border-right-0" style={{borderBottom:"0px",borderTop:"0px",borderLeft:"0px",borderRight:"0px"}}>FHA, VA, or USDA Funding Fee</td>
                                            <td className="rightCol2" style={{borderBottom:"0px",borderTop:"0px",borderLeft:"0px",borderRight:"0px"}}>
                                                ${numberWithCommas(Math.round(governmentFundingFee))}
                                            </td>
                                        </>
                                    :null}
                                </tr>
                                <tr style={{borderBottom:"0px",borderTop:"0px",borderLeft:"0px",borderRight:"0px"}}>
                                    <td className="leftCol2 border-right-0" style={{borderBottom:"0px",borderTop:"0px",borderLeft:"0px",borderRight:"0px"}}><strong  className="bold-500">C. Services You Can Shop For</strong></td>
                                    <td className="rightCol2" style={{borderBottom:"0px",borderTop:"0px",borderLeft:"0px",borderRight:"0px"}}>
                                        <strong  className="bold-500">${numberWithCommas(Math.round(blockC))}</strong>
                                    </td>
                                </tr>
                                {Atlas_Loan_Scenario.blockCTitleServices != 0 ? 
                                    <tr style={{borderBottom:"0px",borderTop:"0px",borderLeft:"0px",borderRight:"0px"}}>
                                        <td className="leftCol2 border-right-0" style={{borderBottom:"0px",borderTop:"0px",borderLeft:"0px",borderRight:"0px"}}>Title Services &amp; Insurance</td>
                                        <td className="rightCol2" style={{borderBottom:"0px",borderTop:"0px",borderLeft:"0px",borderRight:"0px"}}>
                                            ${numberWithCommas(Math.round(Atlas_Loan_Scenario.blockCTitleServices))}
                                        </td>
                                    </tr>
                                : null}
                                {Atlas_Loan_Scenario.blockCSurvey != 0 ? 
                                
                                    <tr className="border-bottom" style={{borderBottom:"0px",borderTop:"0px",borderLeft:"0px",borderRight:"0px"}}>
                                        <td className="leftCol2 border-right-0" style={{borderBottom:"0px",borderTop:"0px",borderLeft:"0px",borderRight:"0px"}}>Survey (if required)</td>
                                        <td className="rightCol2" style={{borderBottom:"0px",borderTop:"0px",borderLeft:"0px",borderRight:"0px"}}>
                                        ${numberWithCommas(Math.round(Atlas_Loan_Scenario.blockCSurvey))}
                                        </td>
                                    </tr>
                                : null}
                                <tr style={{borderBottom:"0px",borderTop:"0px",borderLeft:"0px",borderRight:"0px"}}>
                                    <td className="leftCol2 border-right-0" height="20px" style={{borderBottom:"0px",borderTop:"0px",borderLeft:"0px",borderRight:"0px"}}>
                                        <strong  className="bold-500">D. Total Loan Costs (A&#43;B&#43;C)</strong></td>
                                    <td className="rightCol2" height="20px" style={{borderBottom:"0px",borderTop:"0px",borderLeft:"0px",borderRight:"0px"}}>
                                        <strong  className="bold-500">${numberWithCommas(Math.round(blockD))}</strong>
                                    </td>
                                </tr>
                            </table>
                        </td>
                        <td style={{"verticalAlign": "top",borderBottom:"0px",borderTop:"0px",borderLeft:"0px",borderRight:"0px"}}>
                            <table className="table-child2">
                                <tr className="blueRow">
                                    <td className="td-heading" colSpan="2">Other Costs</td>
                                </tr>
                                <tr style={{borderBottom:"0px",borderTop:"0px",borderLeft:"0px",borderRight:"0px"}}>
                                    <td className="leftCol2 border-right-0" style={{borderBottom:"0px",borderTop:"0px",borderLeft:"0px",borderRight:"0px"}}><strong  className="bold-500">E. Taxes &amp; Other Government Fees</strong></td>
                                    <td className="rightCol2" style={{borderBottom:"0px",borderTop:"0px",borderLeft:"0px",borderRight:"0px"}}>
                                        <strong  className="bold-500">${numberWithCommas(Math.round(blockE))}</strong>
                                    </td>
                                </tr>
                                {Atlas_Loan_Scenario.blockERecordingCharges != 0 ? 
                                    <tr style={{borderBottom:"0px",borderTop:"0px",borderLeft:"0px",borderRight:"0px"}}>
                                        <td className="leftCol2 border-right-0" style={{borderBottom:"0px",borderTop:"0px",borderLeft:"0px",borderRight:"0px"}}>Recording Fees &amp; Other Taxes</td>
                                        <td className="rightCol2" style={{borderBottom:"0px",borderTop:"0px",borderLeft:"0px",borderRight:"0px"}}>
                                            ${numberWithCommas(Math.round(Atlas_Loan_Scenario.blockERecordingCharges))}
                                        </td>
                                    </tr>
                                : null}
                                {Atlas_Loan_Scenario.blockETransferTaxes != 0 ? 
                                
                                    <tr className="border-bottom" style={{borderBottom:"0px",borderTop:"0px",borderLeft:"0px",borderRight:"0px"}}>
                                        <td className="leftCol2 border-right-0" style={{borderBottom:"0px",borderTop:"0px",borderLeft:"0px",borderRight:"0px"}}>Transfer Taxes (if required)</td>
                                        <td className="rightCol2" style={{borderBottom:"0px",borderTop:"0px",borderLeft:"0px",borderRight:"0px"}}>
                                        ${numberWithCommas(Math.round(Atlas_Loan_Scenario.blockETransferTaxes))}
                                        </td>
                                    </tr>
                                : null}
                                <tr style={{borderBottom:"0px",borderTop:"0px",borderLeft:"0px",borderRight:"0px"}}>
                                    <td className="leftCol2 border-right-0" style={{borderBottom:"0px",borderTop:"0px",borderLeft:"0px",borderRight:"0px"}}><strong  className="bold-500">F. Estimated Prepaids</strong></td>
                                    <td className="rightCol2" style={{borderBottom:"0px",borderTop:"0px",borderLeft:"0px",borderRight:"0px"}}>
                                        <strong  className="bold-500">${numberWithCommas(Math.round(blockF))}</strong>
                                    </td>
                                </tr>
                                {totalHOIPremium != 0 ? 
                                <>
                                    <tr style={{borderBottom:"0px",borderTop:"0px",borderLeft:"0px",borderRight:"0px"}}>
                                            <td className="leftCol2 border-right-0" style={{borderBottom:"0px",borderTop:"0px",borderLeft:"0px",borderRight:"0px"}}>Homeowner’s Insurance Premium</td>
                                            <td className="rightCol2" style={{borderBottom:"0px",borderTop:"0px",borderLeft:"0px",borderRight:"0px"}}>
                                            
                                            ${numberWithCommas(Math.round(totalHOIPremium))}
                                            </td>
                                        </tr>
                                    
                                    <tr style={{borderBottom:"0px",borderTop:"0px",borderLeft:"0px",borderRight:"0px"}}>
                                        <td className="leftCol2 border-right-0" style={{borderBottom:"0px",borderTop:"0px",borderLeft:"0px",borderRight:"0px"}}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                            <i>
                                                {numberWithCommas(Atlas_Loan_Scenario.blockFnumMonthsPrepaidHOI)}{" "}
                                                months at    
                                                    ${numberWithCommas(Atlas_Loan_Scenario.monthlyHOI)} {" "}
                                                per month
                                            </i>
                                        </td>
                                        <td className="rightCol2" style={{borderBottom:"0px",borderTop:"0px",borderLeft:"0px",borderRight:"0px"}}></td>
                                    </tr>
                                </>
                                :null}
                                 {totalPrepaidInterest != 0 ? 
                                <>
                                    <tr style={{borderBottom:"0px",borderTop:"0px",borderLeft:"0px",borderRight:"0px"}}>
                                            <td className="leftCol2 border-right-0" style={{borderBottom:"0px",borderTop:"0px",borderLeft:"0px",borderRight:"0px"}}>Prepaid Interest</td>
                                            <td className="rightCol2" style={{borderBottom:"0px",borderTop:"0px",borderLeft:"0px",borderRight:"0px"}}>
                                            
                                            ${numberWithCommas(Math.round(totalPrepaidInterest))}
                                            </td>
                                        </tr>
                                    
                                    <tr style={{borderBottom:"0px",borderTop:"0px",borderLeft:"0px",borderRight:"0px"}}>
                                        <td className="leftCol2 border-right-0" style={{borderBottom:"0px",borderTop:"0px",borderLeft:"0px",borderRight:"0px"}}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                            <i>
                                                ${numberWithCommas((totalLoanAmount *(Atlas_Loan_Scenario.interestRate/100)/360).toFixed(2)) }{" "}
                                                per day for      {" "}
                                                {numberWithCommas(Math.round(Atlas_Loan_Scenario.blockFdaysPrepaidInterest)) }{" "}
                                                days
                                            </i>
                                        </td>
                                        <td className="rightCol2" style={{borderBottom:"0px",borderTop:"0px",borderLeft:"0px",borderRight:"0px"}}></td>
                                    </tr>
                                </>
                                :null}
                                {totalPrepaidTaxes != 0 ? 
                                   <>
                                    <tr style={{borderBottom:"0px",borderTop:"0px",borderLeft:"0px",borderRight:"0px"}}>
                                            <td className="leftCol2 border-right-0" style={{borderBottom:"0px",borderTop:"0px",borderLeft:"0px",borderRight:"0px"}}>Prepaid Taxes</td>
                                            <td className="rightCol2" style={{borderBottom:"0px",borderTop:"0px",borderLeft:"0px",borderRight:"0px"}}>
                                                ${numberWithCommas(Math.round(totalPrepaidTaxes))}
                                            </td>
                                        </tr>
                                    
                                    <tr style={{borderBottom:"0px",borderTop:"0px",borderLeft:"0px",borderRight:"0px"}} className="border-bottom" >
                                        <td className="leftCol2 border-right-0" style={{borderBottom:"0px",borderTop:"0px",borderLeft:"0px",borderRight:"0px"}}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                            <i>
                                                {numberWithCommas((Atlas_Loan_Scenario.blockFnumMonthsPrepaidTaxes).toFixed(2))}{" "}
                                                months at    
                                                    ${numberWithCommas(Atlas_Loan_Scenario.monthlyPropertyTax)}{" "}
                                                per month
                                            </i>
                                        </td>
                                        <td className="rightCol2" style={{borderBottom:"0px",borderTop:"0px",borderLeft:"0px",borderRight:"0px"}}></td>
                                    </tr>
                                    </>
                                :null}
                                
                                <tr style={{borderBottom:"0px",borderTop:"0px",borderLeft:"0px",borderRight:"0px"}}>
                                    <td className="leftCol2 border-right-0" style={{borderBottom:"0px",borderTop:"0px",borderLeft:"0px",borderRight:"0px"}}><strong  className="bold-500">G. Estimated Escrow Payment</strong></td>
                                    <td className="rightCol2" style={{borderBottom:"0px",borderTop:"0px",borderLeft:"0px",borderRight:"0px"}}>
                                        <strong  className="bold-500">${numberWithCommas(Math.round(blockG))}</strong>
                                    </td>
                                </tr>
                                {totalHOI != 0 ?
                                       <>
                                            <tr style={{borderBottom:"0px",borderTop:"0px",borderLeft:"0px",borderRight:"0px"}}>
                                                    <td className="leftCol2 border-right-0" style={{borderBottom:"0px",borderTop:"0px",borderLeft:"0px",borderRight:"0px"}}>Homeowners Insurance</td>
                                                    <td className="rightCol2" style={{borderBottom:"0px",borderTop:"0px",borderLeft:"0px",borderRight:"0px"}}>
                                                        ${numberWithCommas(Math.round(totalHOI))}
                                                    </td>
                                                </tr>
                                            
                                            <tr style={{borderBottom:"0px",borderTop:"0px",borderLeft:"0px",borderRight:"0px"}}>
                                                <td className="leftCol2 border-right-0" style={{borderBottom:"0px",borderTop:"0px",borderLeft:"0px",borderRight:"0px"}}>&nbsp;&nbsp;&nbsp;&nbsp;
                                                    <i>
                                                        ${numberWithCommas(Atlas_Loan_Scenario.monthlyHOI)}{" "}
                                                        per month for    {" "}
                                                        {numberWithCommas(Math.round(Atlas_Loan_Scenario.blockGnumMonthsInsReserves))}{" "}
                                                        months
                                                    </i>
                                                </td>
                                                <td className="rightCol2" style={{borderBottom:"0px",borderTop:"0px",borderLeft:"0px",borderRight:"0px"}}></td>
                                            </tr>
                                        </>
                                :null}
                                {totalPropertyTaxes != 0 ? 
                                    <>
                                        <tr style={{borderBottom:"0px",borderTop:"0px",borderLeft:"0px",borderRight:"0px"}}>
                                            <td className="leftCol2 border-right-0" style={{borderBottom:"0px",borderTop:"0px",borderLeft:"0px",borderRight:"0px"}}>Property taxes</td>
                                            <td className="rightCol2" style={{borderBottom:"0px",borderTop:"0px",borderLeft:"0px",borderRight:"0px"}}>
                                            ${numberWithCommas(Math.round(totalPropertyTaxes))}
                                            </td>
                                        </tr>
                                    
                                    <tr className="border-bottom" style={{borderBottom:"0px",borderTop:"0px",borderLeft:"0px",borderRight:"0px"}}>
                                        <td className="leftCol2 border-right-0" style={{borderBottom:"0px",borderTop:"0px",borderLeft:"0px",borderRight:"0px"}}>&nbsp;&nbsp;&nbsp;&nbsp;
                                            <i>
                                                ${numberWithCommas(Atlas_Loan_Scenario.monthlyPropertyTax)}{" "}
                                                per month for {" "}   
                                                {numberWithCommas(Math.round(Atlas_Loan_Scenario.blockGnumMonthsTaxReserves))}{" "}
                                                months
                                            </i>
                                        </td>
                                        <td className="rightCol2" style={{borderBottom:"0px",borderTop:"0px",borderLeft:"0px",borderRight:"0px"}}></td>
                                    </tr>
                                    </>
                                :null}
                                <tr style={{borderBottom:"0px",borderTop:"0px",borderLeft:"0px",borderRight:"0px"}}>
                                    <td className="leftCol2 border-right-0" style={{borderBottom:"0px",borderTop:"0px",borderLeft:"0px",borderRight:"0px"}}><strong  className="bold-500">H. Other</strong></td>
                                    <td className="rightCol2" style={{borderBottom:"0px",borderTop:"0px",borderLeft:"0px",borderRight:"0px"}}>
                                        <strong  className="bold-500">${numberWithCommas(Math.round(blockH))}</strong>
                                    </td>
                                </tr>
                                
                                {Atlas_Loan_Scenario.blockHOwnersTitleInsPremium != 0 ? 
                                    <tr  style={{borderBottom:"0px",borderTop:"0px",borderLeft:"0px",borderRight:"0px"}}  className="border-bottom" >
                                        <td className="leftCol2 border-right-0" style={{borderBottom:"0px",borderTop:"0px",borderLeft:"0px",borderRight:"0px"}}>Owner&#39;s Title Insurance</td>
                                        <td className="rightCol2" style={{borderBottom:"0px",borderTop:"0px",borderLeft:"0px",borderRight:"0px"}}>
                                            ${numberWithCommas(Math.round(Atlas_Loan_Scenario.blockHOwnersTitleInsPremium))}
                                        </td>
                                    </tr>
                                :null}
                                
                                <tr style={{borderBottom:"0px",borderTop:"0px",borderLeft:"0px",borderRight:"0px"}}>
                                    <td className="leftCol2 border-right-0" height="20px" style={{borderBottom:"0px",borderTop:"0px",borderLeft:"0px",borderRight:"0px"}}>
                                        <strong  className="bold-500">I. Total Other Costs (E&#43;F&#43;G&#43;H)</strong>
                                    </td>                                        
                                    <td className="rightCol2" height="20px" style={{borderBottom:"0px",borderTop:"0px",borderLeft:"0px",borderRight:"0px"}}>
                                        <strong  className="bold-500">${numberWithCommas(Math.round(blockI))}</strong>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <br/>
        <div>
            <table  className="noBorderTable">
                <tbody style={{border:"0px"}}>
                    <tr className="blueRow">
                        <td className="td-heading" align="center" colSpan="4">Total Closing Costs</td>
                    </tr>
                    <tr style={{"padding":"5px 0"}} style={{border:"0px"}}>
                        <td className="leftCol6">&nbsp;</td>
                        <td className="middleColA6" align="right">
                            ${numberWithCommas(Math.round(blockD+blockI))}
                        </td>
                        <td className="middleColB6">&nbsp;</td>
                        <td className="rightCol6">Loan Costs + Other Costs (D+I)</td>
                    </tr>
                    <tr style={{border:"0px"}} >
                        <td className="operatorPadding leftCol6" align="right">&#8211;</td>
                        <td className="border-bottom middleColA6" align="right" style={{borderBottom:"1px"}}>
                            ${numberWithCommas(Math.round(Atlas_Loan_Scenario.lenderCredit))}
                        </td>
                        <td className="middleColB6">&nbsp;</td>
                        <td className="rightCol6">Lender Credits</td>
                    </tr>
                    <tr style={{border:"0px"}}>
                        <td className="operatorPadding leftCol6" width="290px" align="right">&#61;</td>
                        <td className="middleColA6" width="53px" align="right">
                            ${numberWithCommas(Math.round(blockJ))}
                        </td>
                        <td className="middleColB6">&nbsp;</td>
                        <td className="rightCol6"><strong  className="bold-500">Total Closing Costs (J)</strong></td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div>
            <table style={{marginTop:"16px"}} className="noBorderTable">
                <tbody style={{border:0}}>
                    <tr className="blueRow">
                        <td className="td-heading" align="center" colSpan="4">Estimated Cash to Close</td>
                    </tr>
                    <tr style={{border:"0px"}}>
                        <td className="leftCol6">&nbsp;</td>
                        <td className="middleColA6" align="right">
                            ${numberWithCommas(Math.round(sale_Price_OR_Payoffs))}
                        </td>
                        <td className="middleColB6">&nbsp;</td>
                        <td className="rightCol6">Sale Price/Payoffs</td>
                    </tr>
                    <tr style={{border:"0px"}}>
                        <td className="operatorPadding leftCol6" width="290px" align="right">&#43;</td>
                        <td className="middleColA6" align="right">
                            ${numberWithCommas(Math.round(blockJ))}
                        </td>
                        <td className="middleColB6">&nbsp;</td>
                        <td className="rightCol6">Total Closing Costs (J)</td>
                    </tr>
                    <tr style={{border:"0px"}}>
                        <td className="operatorPadding leftCol6" align="right">&#8211;</td>
                        <td className="middleColA6" align="right">
                            ${numberWithCommas(Math.round(totalLoanAmount))}
                        </td>
                        <td className="middleColB6">&nbsp;</td>
                        <td className="rightCol6">Total Loan Amount</td>
                    </tr>
                    {
                        secondMortgage !== 0 ?
                            <tr style={{border:"0px"}}>
                                <td className="operatorPadding leftCol6" align="right">&#8211;</td>
                                <td className="middleColA6" align="right">
                                    ${numberWithCommas(Math.round(secondMortgage))}
                                </td>
                                <td className="middleColB6">&nbsp;</td>
                                <td className="rightCol6">Second Mortgage</td>
                            </tr>
                       : null
                    }
                    {
                      Atlas_Loan_Scenario.loanPurpose === "Purchase" ?
                        <tr style={{border:"0px"}}>
                            <td className="operatorPadding leftCol6" align="right">&#8211;</td>
                            <td className="middleColA6" align="right">
                                ${numberWithCommas(Math.round(Atlas_Loan_Scenario.sellerCredit))}
                            </td>
                            <td className="middleColB6">&nbsp;</td>
                            <td className="rightCol6">Seller Credit</td>
                        </tr>
                    :null}
                    <tr style={{border:"0px"}}>
                        <td className="operatorPadding leftCol6" align="right">
                        &#8211;
                        </td>
                        <td className="border-bottom middleColA6" align="right"  style={{borderBottom:"1px"}}>
                            ${numberWithCommas(Math.round(Atlas_Loan_Scenario.otherCredits))}
                        </td>
                        <td className="middleColB6">&nbsp;</td>
                        <td className="rightCol6">Other Credits and Adjustments</td>
                    </tr>
                    <tr style={{border:"0px"}}>
                        <td className="operatorPadding leftCol6" align="right">&#61;</td>
                            <td className="middleColA6" align="right">
                                { 
                                    Math.sign(estimatedCashToClose) === -1 ?
                                    <b>(${numberWithCommas(Math.abs(Math.round(estimatedCashToClose)))})</b>
                                    :
                                    <b>${numberWithCommas(Math.round(estimatedCashToClose))}</b>
                                }
                            </td>
                        <td className="middleColB6">&nbsp;</td>
                        <td className="rightCol6"><strong  className="bold-500">Estimated Cash to Close From (To) Borrower</strong></td>
                    </tr>
                </tbody>
            </table>
        </div>
        {/* <div>
            <table style={{border:0}}>
                <tbody style={{border:0}}>
                    <tr style={{border:0}}>
                        <td align="center" style={{border:0}}>
                            <p className="heading-h4"><b>Please Review Your Options on the Bottom of Page 3</b></p>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
         */}
        <div style={{"pageBreakAfter": "always"}}></div>
        <div>
            <table className="ConsiderationsTable">
                <tbody>
                    <tr className="blueRow">
                        <td  className="td-heading" colSpan="2">Other Considerations</td>
                    </tr>
                    <tr style={{borderTop:"0px",borderBottom:"0px"}}>
                        <td className="leftCol4 border-right-0"><strong  className="bold-500">Rate Changes</strong></td>
                        <td className="rightCol4 lineheight" style={{borderLeft:"0px"}}>Rates change multiple times daily until rate is locked. Factors affecting rate include property state, lock period, loan-to-value, credit, and debt-to-income ratio</td>
                    </tr>
                    <tr style={{borderTop:"0px",borderBottom:"0px"}}>
                        <td className="leftCol4 border-right-0"><strong  className="bold-500">Escrow Account</strong></td>
                        <td className="rightCol4 lineheight" style={{borderLeft:"0px"}}>If this is a refinance transaction,<span>&nbsp;</span> 
                       
                               <span className="border-bottom text-bold">funds held in escrow by your current loan</span> 
                               <span className="border-bottom text-bold"> servicer will be returned to you in approximately 30 days following </span>
                                                <span className="border-bottom text-bold">settlement.</span>
                        </td>
                    </tr>
                    <tr style={{borderTop:"0px",borderBottom:"0px"}}>
                        <td className="leftCol4 border-right-0"><strong  className="bold-500">First Payment</strong></td>
                        <td className="rightCol4 lineheight" style={{borderLeft:"0px"}}>Your payment of a partial month’s interest at settlement (a prepaid charge) constitutes the first payment on your new loan and 
                        
                        <span>&nbsp;</span> <span className="border-bottom text-bold">you will not have to make a </span> 
                               <span className="border-bottom text-bold">mortgage payment until the beginning of the second month after </span>
                               <span className="border-bottom text-bold">settlement, </span>e.g., close in November, your first scheduled payment will be January.
                            
                        </td>
                    </tr>
                    <tr style={{borderTop:"0px",borderBottom:"0px"}}>
                        <td className="leftCol4 border-right-0"><strong  className="bold-500">Home Owner’s Insurance</strong></td>
                        <td className="rightCol4 lineheight">This loan requires a homeowner's insurance on the property or, in the case of condominiums, an HO-6 insurance policy. You may obtain
                            this insurance policy from a company of your choice.
                        </td>
                    </tr>
                    <tr style={{borderTop:"0px",borderBottom:"0px"}}>
                        <td className="leftCol4 border-right-0"><strong  className="bold-500">Origination Fee</strong></td>
                        <td className="rightCol4 lineheight">The Origination Fee represents the total fees we pay outside parties for their services - the processing, underwriting, a pre-fund
                                                audit, and warehouse bank draw fee.
                        </td>
                    </tr>
                    <tr style={{borderTop:"0px",borderBottom:"0px"}}>
                        <td className="leftCol4 border-right-0"><strong  className="bold-500">New Escrow Account &amp; Prepaid</strong></td>
                        <td className="rightCol4 lineheight">
                            Based on the estimated escrow information, we have conservatively set aside {Atlas_Loan_Scenario.blockGnumMonthsTaxReserves} months of property taxes 
                            and {Atlas_Loan_Scenario.blockGnumMonthsInsReserves} months of hazard insurance premiums for payment at settlement to populate your new escrow account.
                             Additionally, we estimated the prepaid interest at {Atlas_Loan_Scenario.blockFdaysPrepaidInterest} days.<span>&nbsp;</span>  
                             
                               <span className="border-bottom text-bold">Both the prepaid interest and the </span> 
                               <span className="border-bottom text-bold">amount required for the escrow account will be adjusted to match your </span> 
                               <span className="border-bottom text-bold">specific requirements once the loan is locked, a settlement date is finalized;</span> 
                               <span className="border-bottom text-bold"> and escrow amount are verified.</span>
                               </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div>
            <table>
                <tbody>
                    <tr className="blueRow">
                        <td className="td-heading" >Options</td>
                    </tr>
                    <tr style={{borderTop:"0px",borderBottom:"0px"}}>
                        <td className="oneCol"  style={{borderTop:"0px",borderBottom:"0px"}}><strong  className="bold-500">You have options available to you either based on your Loan-to-Value (LTV) or the interest rate you choose:</strong></td>
                    </tr>
                    <tr style={{borderTop:"0px",borderBottom:"0px"}}>
                        <td className="oneCol"  style={{borderTop:"0px",borderBottom:"0px"}}><span className="border-bottom">If this is a refinance transaction</span>, you might be able to increase the loan amount to reduce the amount needed at settlement; 
                                                you may also select a lower interest rate to save money in interest over the life of the loan, or, on the other hand, you may 
                                                select a higher interest rate and the resultant premium provided by the lender can be used to lower your costs at closing/settlement.  
                                                Discuss the available options with your Mortgage Consultant.
                        </td>
                    </tr>
                    <tr className="border-bottom" style={{borderTop:"0px",borderBottom:"0px"}}>
                        <td className="oneCol"  style={{borderTop:"0px",borderBottom:"0px"}}><span  className="border-bottom">If this is a purchase transaction</span>, you may select a lower interest rate to save money in interest over the life of the loan, 
                                                or, on the other hand, you may select a higher interest rate and the resultant premium provided by the lender can be used to lower 
                                                your costs at closing/settlement.  Discuss the available options with your Mortgage Consultant.
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        </body>
    </html>
    ) 
}

export default Home2_PDF;