import React, { useEffect, useState } from "react";
import logo from "../images/Atlas_logo_grey.png";
import { useParams, useHistory, useLocation, Link } from "react-router-dom";
import axios from "axios";

const AtlasLoanPage = () => {
  // const params = useParams();
  const search = useLocation().search;
  const history = useHistory();

  const [contactDetails, setContactDetails] = useState();
  const [popUp, setPopUp] = useState(false);
  const [popUpData, setPopUpData] = useState({
    ele: "",
    principalInterestVal: 0,
    estimatedCashToCloseVal: 0,
  });

  useEffect(() => {
    document.body.style.backgroundColor = "white";

    const contextData = new URLSearchParams(search).get("context");
    // const system = new URLSearchParams(search).get("signature");
    if (contextData) {
      let base64ToString = Buffer.from(contextData, "base64").toString();
      const parseData = JSON.parse(base64ToString);
      let system = "FollowUpBoss";
      getData(parseData.person.id, system);
    }

    // getData(params.personId);
  }, []);

  const getData = async (id, system) => {
    await axios
      .get(
        `https://atlas-admin.keystonefunding.com/api/contact/details-by-sales-sytem?salesSystemId=${id}&salesSystem=${system}`
      )
      .then((res) => {
        console.log("res", res.data.data);
        setContactDetails(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleHover = (ele, principalInterestVal, estimatedCashToCloseVal) => {
    setPopUpData({
      ele: ele,
      principalInterestVal: principalInterestVal,
      estimatedCashToCloseVal: estimatedCashToCloseVal,
    });
    setPopUp(true);
  };

  const handleClick = (loanId) => {
    const ids = { loanid: loanId, rateid: undefined };
    localStorage.setItem("ids", JSON.stringify(ids));
    window.open("/home", "_blank");
  };

  const handleRateClick = (rateId) => {
    const ids = { loanid: undefined, rateid: rateId };
    localStorage.setItem("ids", JSON.stringify(ids));
    window.open("/home", "_blank");
  };

  let loanType = "";
  let loanProduct = "";

  const numberWithCommas = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <>
      <div className="mainFrame">
        <div className="framediv">
          {/* <div className="head-logo">
            <img src={logo} alt="logo" />
            <span>Atlas</span>
          </div> */}
          <div className="frame-box">
            <div className="head-logo head-logo-2">
              <svg
                width="14"
                height="19"
                viewBox="0 0 14 19"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7 11.7637C6.7031 11.7637 6.46154 11.514 6.46154 11.207C6.46154 10.9828 6.59059 10.7815 6.79033 10.694C7.03145 10.5885 7.31999 10.6785 7.58219 10.9411C7.79577 11.155 8.13666 11.1494 8.34357 10.9287C8.55052 10.7079 8.54509 10.3555 8.33154 10.1416C8.08844 9.89811 7.81821 9.72603 7.53846 9.62892V8.98047C7.53846 8.67305 7.29738 8.42383 7 8.42383C6.70263 8.42383 6.46154 8.67305 6.46154 8.98047V9.63252C6.43099 9.64376 6.40055 9.65564 6.37036 9.66885C5.77156 9.93102 5.38462 10.5348 5.38462 11.207C5.38462 12.1278 6.10928 12.877 7 12.877C7.29691 12.877 7.53846 13.1267 7.53846 13.4336C7.53846 13.6669 7.39613 13.8772 7.1843 13.9569C6.90771 14.061 6.58575 13.9198 6.30101 13.5693C6.10975 13.3339 5.77013 13.3034 5.54239 13.5011C5.31466 13.6988 5.28512 14.0499 5.47638 14.2853C5.76747 14.6436 6.1063 14.8893 6.46158 15.013V15.6602C6.46158 15.9676 6.70267 16.2168 7.00004 16.2168C7.29741 16.2168 7.5385 15.9676 7.5385 15.6602V15.008C7.54331 15.0063 7.54812 15.0048 7.55289 15.003C8.18838 14.7637 8.61538 14.133 8.61538 13.4336C8.61538 12.5128 7.89072 11.7637 7 11.7637Z"
                  fill="#2CC14E"
                ></path>
                <path
                  d="M11.9868 8.35922C11.3469 7.5453 10.6153 6.89685 9.81217 6.43054C9.9437 6.26967 10.0475 6.08104 10.1145 5.87081C10.3775 5.04294 9.99334 4.05954 9.01288 3.73918L10.3874 1.26157C10.5608 0.948887 10.405 0.550629 10.0706 0.450137C9.07681 0.151443 8.04375 0 7 0C5.95625 0 4.92319 0.151443 3.92941 0.450137C3.59463 0.55074 3.43944 0.949258 3.61265 1.26157L4.98712 3.73921C4.01053 4.05795 3.62155 5.0399 3.88565 5.87126C3.95245 6.08093 4.0562 6.26944 4.18812 6.43039C3.38491 6.8967 2.65325 7.54523 2.0132 8.35922C0.733779 9.98636 0 12.0388 0 13.9902C0 18.0385 3.12476 19 7 19C10.878 19 14 18.0369 14 13.9902C14 12.0388 13.2662 9.98636 11.9868 8.35922ZM4.89986 1.34403C5.58683 1.19073 6.29059 1.11328 7 1.11328C7.7094 1.11328 8.41317 1.19073 9.10014 1.34403L7.91434 3.4816C7.307 3.39395 6.69318 3.39399 6.08569 3.48164L4.89986 1.34403ZM5.25165 4.82036C6.17834 4.50612 7.14786 4.44656 8.09042 4.64134L8.09379 4.64201C8.31349 4.68758 8.53171 4.74688 8.74759 4.8201C9.02979 4.91625 9.184 5.23179 9.09149 5.52299C9.02426 5.73388 8.84674 5.87913 8.63793 5.90265C8.10105 5.72887 7.55343 5.64062 7 5.64062C6.44768 5.64062 5.90114 5.7285 5.3653 5.90158C5.15326 5.87902 4.97531 5.73273 4.90865 5.52351C4.816 5.23179 4.97022 4.91621 5.25165 4.82036ZM7 17.8941C2.79296 17.8941 1.07692 16.7579 1.07692 13.9902C1.07692 12.315 1.73934 10.4725 2.84882 9.06144C4.0189 7.57339 5.49313 6.75391 7 6.75391C8.65868 6.75391 10.1095 7.73664 11.1512 9.06144C12.2607 10.4725 12.9231 12.315 12.9231 13.9902C12.9231 16.7579 11.207 17.8941 7 17.8941Z"
                  fill="#2CC14E"
                ></path>
              </svg>
              <span>Loan Scenarios</span>
            </div>
            <div style={{ position: "relative" }}>
              <div className="loan-td">
                {contactDetails &&
                  contactDetails?.loanScenarios.map((ele, index) => {
                    let totalLoanAmountVal = 0;
                    let governmentFundingFeeVal = 0;
                    let loanTermVal = 0;
                    let principalInterestVal = 0;
                    let estimatedCashToCloseVal = 0;

                    contactDetails?.rateCampaings.map((item) => {
                      if (item.loanScenarioId === ele.id) {
                        loanType = ele.loanType;
                        loanProduct = ele.loanProduct;
                      }
                    });

                    if (ele.isFinancedFundingFeeMI) {
                      totalLoanAmountVal = Number(ele.baseLoanAmount);
                    } else if (
                      ele.mortgageInsurancePremiumType === "Single Premium"
                    ) {
                      totalLoanAmountVal =
                        Number(ele.baseLoanAmount) +
                        (Number(ele.annualMortgageInsuranceRate) *
                          Number(ele.baseLoanAmount)) /
                          100;
                    } else {
                      governmentFundingFeeVal =
                        (Number(ele.baseLoanAmount) *
                          Number(ele.governmentFundingFeePercent)) /
                        100;
                      totalLoanAmountVal =
                        Number(ele.baseLoanAmount) +
                        Number(governmentFundingFeeVal);
                    }
                    loanTermVal = ele.loanProduct.includes("ARM")
                      ? 360
                      : 12 * Number(ele.loanProduct.substring(0, 2));
                    principalInterestVal =
                      (totalLoanAmountVal *
                        (Number(ele.interestRate) / 1200) *
                        ((1 + Number(ele.interestRate) / 1200) ^ loanTermVal)) /
                      (((1 + Number(ele.interestRate) / 1200) ^ loanTermVal) -
                        1);

                    var HOIPremium = Math.round(
                      Number(ele.blockFnumMonthsPrepaidHOI) *
                        Number(ele.monthlyHOI)
                    );

                    var prepaidInterest = Math.round(
                      (Number(ele.blockFdaysPrepaidInterest) *
                        totalLoanAmountVal *
                        Number(ele.interestRate)) /
                        36000
                    );

                    var prepaidTaxes = Math.round(
                      Number(ele.blockFnumMonthsPrepaidTaxes) *
                        Number(ele.monthlyPropertyTax)
                    );

                    var HOI = Math.round(
                      Number(ele.blockGnumMonthsInsReserves) *
                        Number(ele.monthlyHOI)
                    );

                    var propertyTaxes = Math.round(
                      Number(ele.blockGnumMonthsTaxReserves) *
                        Number(ele.monthlyPropertyTax)
                    );

                    var dBlock =
                      Number(ele.blockADiscountFee) +
                      Number(ele.blockAOriginationFee) +
                      Number(ele.blockAprocessingFee) +
                      Number(ele.blockATaxService) +
                      Number(ele.blockBAppraisalFee) +
                      Number(ele.blockBCreditFees) +
                      Number(ele.blockBFloodCertification) +
                      Number(ele.blockBtaxReturnVerificationFee) +
                      Number(ele.blockBverificationEmployment) +
                      Number(ele.blockBhoaQuestionnaire) +
                      Number(ele.blockBcondoProjectApproval) +
                      Number(ele.blockBsinglePremiumMI) +
                      Number(governmentFundingFeeVal) +
                      Number(ele.blockCTitleServices) +
                      Number(ele.blockCSurvey);

                    var iBlock =
                      Number(ele.blockERecordingCharges) +
                      Number(ele.blockETransferTaxes) +
                      Number(HOIPremium) +
                      Number(prepaidInterest) +
                      Number(prepaidTaxes) +
                      Number(HOI) +
                      Number(propertyTaxes) +
                      Number(ele.blockHOwnersTitleInsPremium);

                    var jBlock = dBlock + iBlock - Number(ele.lenderCredit);
                    var secondM =
                      ele.secondMortgageRequest === "New 2nd mortgage"
                        ? Number(ele.secondMortgageBalance)
                        : 0;

                    var sellerC =
                      ele.loanPurpose === "Purchase"
                        ? Number(ele.sellerCredit)
                        : 0;

                    var salePriceOrPayoffs = 0;
                    if (ele.loanPurpose === "Purchase") {
                      salePriceOrPayoffs = Number(ele.houseValue);
                    }
                    if (ele.loanPurpose === "Refinance") {
                      salePriceOrPayoffs = Number(ele.currentLoanBalance);
                    }

                    estimatedCashToCloseVal =
                      salePriceOrPayoffs +
                      jBlock -
                      totalLoanAmountVal -
                      secondM -
                      sellerC -
                      Number(ele.otherCredits);

                    return (
                      <>
                        <div
                          className="loan-box"
                          onClick={(e) => {
                            handleClick(ele.id);
                          }}
                          onMouseEnter={() =>
                            handleHover(
                              ele,
                              principalInterestVal,
                              estimatedCashToCloseVal
                            )
                          }
                          onMouseLeave={() => setPopUp(false)}
                          key={index}
                        >
                          <div className="box-l">{ele.scenarioName}</div>
                        </div>
                      </>
                    );
                  })}
              </div>
              {popUpData && popUp ? (
                <div className="popUp">
                  <div className="popupmain">
                    <div className="hp-box popupbox">
                      <h5>
                        {popUpData?.ele?.scenarioName +
                          " " +
                          popUpData?.ele?.interestRate +
                          "% " +
                          "Cashout"}
                      </h5>
                      <div className="row hp-sub">
                        <div className="col-md-6 col-6">
                          <p>Rate</p>
                          <p>Upfront costs</p>
                          <p>Mo. payment</p>
                          <p>Cash to Close</p>
                        </div>
                        <div className="col-md-6 col-6 values">
                          <h4>{popUpData?.ele?.interestRate}%</h4>
                          <h4>
                            $
                            {Number(popUpData?.ele?.blockADiscountFee) +
                              Number(popUpData?.ele?.blockAOriginationFee) +
                              Number(popUpData?.ele?.blockAprocessingFee) +
                              Number(popUpData?.ele?.blockATaxService)}
                          </h4>
                          <h4>{Math.round(popUpData?.principalInterestVal)}</h4>
                          <h4>
                            {Math.sign(popUpData?.estimatedCashToCloseVal) ===
                            -1
                              ? "(" +
                                numberWithCommas(
                                  Math.abs(
                                    Math.round(
                                      popUpData?.estimatedCashToCloseVal
                                    )
                                  )
                                ) +
                                ")"
                              : numberWithCommas(
                                  Math.round(popUpData?.estimatedCashToCloseVal)
                                )}
                          </h4>
                        </div>
                        {/* <div className="col-md-3 col-6">
                        </div>
                        <div className="col-md-3 col-6">
                        </div> */}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
          <div className="frame-box">
            <div className="head-logo head-logo-2">
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3.39685 13.6713C3.20265 13.6705 3.01094 13.6276 2.83492 13.5455C2.6589 13.4635 2.50277 13.3442 2.3773 13.196C2.25182 13.0478 2.15998 12.8741 2.10811 12.687C2.05624 12.4998 2.04558 12.3037 2.07685 12.112L2.59248 8.93492L0.379585 6.64975C0.207987 6.47309 0.0882803 6.25264 0.0335614 6.01251C-0.0211574 5.77238 -0.00878104 5.52183 0.0693368 5.28827C0.147455 5.0547 0.288305 4.84712 0.476478 4.68823C0.664651 4.52934 0.892899 4.42526 1.13625 4.38738L4.13332 3.92738L5.45395 1.10612C5.56459 0.87878 5.73692 0.687136 5.95127 0.553065C6.16562 0.418994 6.41336 0.3479 6.66618 0.3479C6.91901 0.3479 7.16675 0.418994 7.3811 0.553065C7.59545 0.687136 7.76778 0.87878 7.87842 1.10612L9.19468 3.92335L12.1961 4.38738C12.4394 4.42526 12.6677 4.52934 12.8558 4.68823C13.044 4.84712 13.1848 5.0547 13.263 5.28827C13.3411 5.52183 13.3535 5.77238 13.2987 6.01251C13.244 6.25264 13.1243 6.47309 12.9527 6.64975L10.7421 8.92579L11.2558 12.1125C11.2966 12.3607 11.2667 12.6155 11.1695 12.8476C11.0723 13.0796 10.9116 13.2796 10.706 13.4246C10.5003 13.5695 10.258 13.6536 10.0067 13.6672C9.75548 13.6808 9.50548 13.6234 9.28539 13.5015L6.66788 12.0481L4.04712 13.5015C3.84837 13.6125 3.62453 13.671 3.39685 13.6713ZM6.66605 10.7134C6.89305 10.7136 7.11625 10.7717 7.31448 10.8823L9.93232 12.3361L9.42322 9.14859C9.39022 8.94175 9.40575 8.73007 9.46856 8.53026C9.53138 8.33045 9.63977 8.14797 9.78518 7.99722L11.9961 5.72072L8.99638 5.24515C8.7786 5.21176 8.57245 5.12508 8.39624 4.99281C8.22004 4.86054 8.07925 4.68678 7.98638 4.48698L6.67062 1.67058C6.66981 1.66823 6.66827 1.66603 6.66672 1.66408L5.34508 4.48765C5.25233 4.68728 5.11168 4.86089 4.93564 4.99304C4.7596 5.1252 4.55363 5.2118 4.33605 5.24515L1.33865 5.70515L3.54665 7.99682C3.69214 8.14753 3.8006 8.33 3.86347 8.52981C3.92635 8.72963 3.94192 8.94132 3.90895 9.14819L3.39302 12.3259L6.01735 10.8826C6.21564 10.7718 6.43893 10.7136 6.66605 10.7134Z"
                  fill="#FFC6AE"
                ></path>
              </svg>
              <span>Rate Campaigns</span>
            </div>
            <div className="loan-td">
              {contactDetails?.rateCampaings.map((ele, index) => {
                return (
                  <div
                    className="campa-box"
                    onClick={() => handleRateClick(ele.id)}
                    key={index}
                  >
                    <div className="box-l">
                      {loanType +
                        " " +
                        loanProduct +
                        "; " +
                        ele.additionalLoanProducts}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="frame-box">
            <div className="head-logo head-logo-2">
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13.4522 3.85697C13.7542 3.85697 13.999 3.61217 13.999 3.31018V2.73605C13.999 1.22739 12.7716 0 11.263 0C11.263 0 2.69174 0.00128497 2.67061 0.00377288C1.94914 0.0289801 1.25611 0.338575 0.756557 0.862021C0.244512 1.39853 -0.0224323 2.09635 0.00269291 2.83056C0.001654 2.84448 0.00110721 10.7172 0.00110721 10.7172C0.00110721 12.5273 1.47379 14 3.28395 14H11.263C12.7716 14 13.999 12.7726 13.999 11.264V7.11248C13.999 5.60382 12.7716 4.37643 11.263 4.37643H2.73505C1.85714 4.37643 1.1374 3.69026 1.09647 2.81429C1.07567 2.36888 1.2359 1.94369 1.54763 1.61703C1.86387 1.28568 2.308 1.09567 2.76611 1.09567C2.78226 1.09567 11.2629 1.09359 11.2629 1.09359C12.1686 1.09359 12.9054 1.83039 12.9054 2.73605V3.31018C12.9054 3.61217 13.1502 3.85697 13.4522 3.85697ZM2.73505 5.47002H11.263C12.1686 5.47002 12.9054 6.20682 12.9054 7.11248V11.264C12.9054 12.1696 12.1686 12.9064 11.263 12.9064H3.28395C2.07679 12.9064 1.09469 11.9243 1.09469 10.7172V4.92544C1.55203 5.268 2.12029 5.47002 2.73505 5.47002ZM11.8119 9.18821C11.8119 9.56569 11.5058 9.87171 11.1284 9.87171C10.2217 9.8357 10.222 8.54059 11.1284 8.50472C11.5058 8.50472 11.8119 8.81074 11.8119 9.18821ZM11.8119 2.73605C11.8119 2.43405 11.5671 2.18925 11.2651 2.18925H2.73508C2.00959 2.21812 2.01014 3.25422 2.73508 3.28284H11.2651C11.567 3.28284 11.8119 3.03804 11.8119 2.73605Z"
                  fill="#70C3FF"
                ></path>
              </svg>
              <span>Borrower Apps</span>
            </div>
            <div className="loan-td">
              {contactDetails?.scenarioCompare?.map((ele, index) => {
                return (
                  <div>
                    <div className="apps-box" key={index}>
                      <div className="box-l">{ele.displayName}</div>
                    </div>
                  </div>
                );
              })}
              {contactDetails?.preApprovalTool?.map((ele, index) => {
                return (
                  <div>
                    <div className="apps-box" key={index}>
                      <div className="box-l">{ele.displayName}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AtlasLoanPage;
