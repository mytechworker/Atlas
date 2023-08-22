import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import axios from "axios";
import ReactPaginate from "react-paginate";
import { useHistory } from "react-router-dom";

const Hometable = (props) => {
  const [tableArr, setTableArr] = useState();
  const [tableTotal, setTableTotal] = useState();
  const [pageCount, setPageCount] = useState();
  const [currentPage, setcurrentPage] = useState(1);
  const [itemsPerPage, setitemsPerPage] = useState(50);
  const [LoanScen, setLoanScen] = useState()

  const history = useHistory();

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const handlePageClick = (data) => {
    let selected = data.selected;
    setcurrentPage(selected + 1);
  };

  useEffect(() => {
    getData("");
  }, [currentPage, props.name]);

  async function getData() {
    try {
      var result = {
        userId: 1,
        page: 1,
      };
      if (currentPage) {
        result.page = currentPage;
      }
      if (props.name) {
        if (currentPage) {
          result.page = currentPage;
        }
        result.search = props.name;
      }

      const data = await axios({
        method: "get",
        url: "https://atlas-admin.keystonefunding.com/api/contact/list",
        params: result,
      }).then((res) => {
        if (res.status === 200) {
          setTableArr(res.data.data);
          setPageCount(Math.ceil(res.data.totalResults / itemsPerPage));
          setTableTotal(res.data.totalResults);
        }
      });
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    getmyData("", "");
  }, []);
  const getmyData = (filed, order) => {
    if (order === "ASC") {
      const myData = []
        .concat(tableArr)
        .sort((a, b) => {
          if (filed === "firstName+lastName") {
            return `${a.firstName} ${a.lastName}` >
              `${b.firstName} ${b.lastName}`
              ? 1
              : -1;
          }
          return a[filed] > b[filed] ? 1 : -1;
        })
        .map((item) => {
          return item;
        });
      setTableArr(myData);
    }
    if (order === "DESC") {
      const myData = []
        .concat(tableArr)
        .sort((a, b) => {
          if (filed === "firstName+lastName") {
            return `${a.firstName} ${a.lastName}` >
              `${b.firstName} ${b.lastName}`
              ? -1
              : 1;
          }
          return a[filed] < b[filed] ? 1 : -1;
        })
        .map((item) => {
          return item;
        });
      setTableArr(myData);
    }
  };
  // console.log("tableArr", tableArr);

  const handleLoanPage = (loanId, rateId) => {
    history.push({
      pathname: "/home",
      state: { id: loanId, RId: rateId },
    });
  };

  const getDays = (date) => {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = today.getFullYear();
    today = yyyy + "-" + mm + "-" + dd;
    var startDate = Date.parse(today);
    var endDate = Date.parse(date);
    var timeDiff = startDate - endDate;
    var daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    return isNaN(daysDiff) ? "" : daysDiff + " days ago";
    // return daysDiff + " days ago";
  };

  let loanType = "";
  let loanProduct = "";
  const numberWithCommas = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  useEffect(() => {
  let loanScen = []

  if(tableArr && tableArr.length !== 0){
    tableArr?.map((t, index) => {
      t.loanScenarios.map((l, index) => {
        loanScen.push(l)
      })
    })
    setLoanScen(loanScen) 
  }
},[tableArr])

  return (
    <>
      <div className="td-main">
        <div className="tablemain">
          <Table>
            <tr className="head-td">
              <th>
                <div className="thblock">
                  Name
                  <span>
                    <button
                      type="button"
                      onClick={() => {
                        getmyData("firstName+lastName", "ASC");
                      }}
                    >
                      <svg
                        width="11"
                        height="7"
                        viewBox="0 0 11 7"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M1 5.5L5.5 1L10 5.5"
                          stroke="#CCCCCC"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        getmyData("firstName+lastName", "DESC");
                      }}
                    >
                      <svg
                        width="11"
                        height="7"
                        viewBox="0 0 11 7"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M1 1L5.5 5.5L10 1"
                          stroke="#CCCCCC"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  </span>
                </div>
              </th>
              <th>
                <div className="thblock">
                  Stage
                  <span>
                    <button
                      type="button"
                      onClick={() => {
                        getmyData("stage", "ASC");
                      }}
                    >
                      <svg
                        width="11"
                        height="7"
                        viewBox="0 0 11 7"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M1 5.5L5.5 1L10 5.5"
                          stroke="#CCCCCC"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        getmyData("stage", "DESC");
                      }}
                    >
                      <svg
                        width="11"
                        height="7"
                        viewBox="0 0 11 7"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M1 1L5.5 5.5L10 1"
                          stroke="#CCCCCC"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  </span>
                </div>
              </th>
              <th className="cre-1">
                <div className="thblock">
                  Created
                  <span>
                    <button
                      type="button"
                      onClick={() => {
                        getmyData("createdDate", "ASC");
                      }}
                    >
                      <svg
                        width="11"
                        height="7"
                        viewBox="0 0 11 7"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M1 5.5L5.5 1L10 5.5"
                          stroke="#CCCCCC"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        getmyData("createdDate", "DESC");
                      }}
                    >
                      <svg
                        width="11"
                        height="7"
                        viewBox="0 0 11 7"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M1 1L5.5 5.5L10 1"
                          stroke="#CCCCCC"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  </span>
                </div>
              </th>
              <th className="loan-1">
                <div className="thblock">Loan Scenarios</div>
              </th>
              <th className="loan-2">
                <div className="thblock">Campaigns</div>
              </th>
              <th>
                <div className="thblock">Borrower Apps</div>
              </th>
            </tr>
            {tableArr
              ?.slice(indexOfFirstItem, indexOfLastItem)
              ?.map((element, index) => {
                return (
                  <>
                    <tr key={index}>
                      <td>
                        <img className="users-img" src={element?.pictureURL} />
                        &nbsp;&nbsp;
                        {element?.firstName} {element?.lastName}
                      </td>
                      <td>{element?.stage}</td>
                      <td>{getDays(element?.createdDate)}</td>
                      <td>
                        <div className="loan-td">
                          {element?.loanScenarios?.map((ele, index) => {
                            let totalLoanAmountVal = 0;
                            let governmentFundingFeeVal = 0;
                            let loanTermVal = 0;
                            let principalInterestVal = 0;
                            let estimatedCashToCloseVal = 0;

                            element.rateCampaings.map((item) => {
                              if (item.loanScenarioId === ele.id) {
                                loanType = ele.loanType;
                                loanProduct = ele.loanProduct;
                              }
                            });

                            if (ele.isFinancedFundingFeeMI) {
                              totalLoanAmountVal = Number(ele.baseLoanAmount);
                            } else if (
                              ele.mortgageInsurancePremiumType ===
                              "Single Premium"
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
                                ((1 + Number(ele.interestRate) / 1200) ^
                                  loanTermVal)) /
                              (((1 + Number(ele.interestRate) / 1200) ^
                                loanTermVal) -
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

                            var jBlock =
                              dBlock + iBlock - Number(ele.lenderCredit);
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
                              salePriceOrPayoffs = Number(
                                ele.currentLoanBalance
                              );
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
                                <div className="loan-box" key={index}>
                                  <div
                                    className="box-l"
                                    onClick={() => handleLoanPage(ele.id)}
                                  >
                                    {ele.scenarioName}
                                  </div>
                                  <div className="hp-main">
                                    <div className="hp-box">
                                      <h5>
                                        {ele.scenarioName +
                                          " " +
                                          ele.interestRate +
                                          "% " +
                                          "Cashout"}
                                      </h5>
                                      <div className="row hp-sub">
                                        <div className="col-md-3">
                                          <p>Rate</p>
                                          <h4>{ele.interestRate}%</h4>
                                        </div>
                                        <div className="col-md-3">
                                          <p>Upfront costs</p>
                                          <h4>
                                            $
                                            {Math.round(Number(ele.blockADiscountFee) +
                                              Number(ele.blockAOriginationFee) +
                                              Number(ele.blockAprocessingFee) +
                                              Number(ele.blockATaxService))}
                                          </h4>
                                        </div>
                                        <div className="col-md-3">
                                          <p>Mo. payment</p>
                                          <h4>
                                            {Math.round(principalInterestVal)}
                                          </h4>
                                        </div>
                                        <div className="col-md-3">
                                          <p>Cash to Close</p>
                                          <h4>
                                            {Math.sign(
                                              estimatedCashToCloseVal
                                            ) === -1
                                              ? "(" +
                                                numberWithCommas(
                                                  Math.abs(
                                                    Math.round(
                                                      estimatedCashToCloseVal
                                                    )
                                                  )
                                                ) +
                                                ")"
                                              : numberWithCommas(
                                                  Math.round(
                                                    estimatedCashToCloseVal
                                                  )
                                                )}
                                          </h4>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </>
                            );
                          })}
                        </div>
                      </td>

                      <td>
                        <div className="loan-td">
                          {element?.rateCampaings?.map((ele, index) => {
                            let names
                            if(LoanScen && LoanScen.length !== 0){
                              names = LoanScen?.filter(x => x.id == ele.loanScenarioId)
                            }
                            return (
                              <div className="campa-box" key={index}>
                                <div
                                  className="box-l"
                                  onClick={() =>
                                    handleLoanPage(ele.loanScenarioId, ele.id)
                                  }
                                >
                                  {names && names[0].scenarioName}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </td>
                      <td>
                        <div className="loan-td">
                          {element?.scenarioCompare?.map((ele, index) => {
                            return (
                              <div>
                                <div className="apps-box" key={index}>
                                  <div className="box-l">{ele.displayName}</div>
                                </div>
                              </div>
                            );
                          })}
                          {element?.preApprovalTool?.map((ele, index) => {
                            return (
                              <div>
                                <div className="apps-box" key={index}>
                                  <div className="box-l">
                                    {ele.displayName}
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </td>
                    </tr>
                  </>
                );
              })}
          </Table>
        </div>
      </div>
      <ReactPaginate
        previousLabel={"Previous"}
        nextLabel={"Next"}
        breakLabel={"..."}
        breakClassName={"break-me"}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName={"pagination"}
        activeClassName={"active"}
      />
    </>
  );
};
export default Hometable;
