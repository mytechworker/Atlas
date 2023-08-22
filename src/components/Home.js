import React, { useState, useEffect } from "react";
import {
  Button,
  Accordion,
  Card,
  Tabs,
  Tab,
  ModalTitle,
  ModalBody,
  ModalFooter,
} from "react-bootstrap";
import EdiText from "react-editext";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import axios from "axios";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PDFExport, savePDF } from "@progress/kendo-react-pdf";
import jsPDF from "jspdf";
import { renderToString, renderToStaticMarkup } from "react-dom/server";
import Home2_PDF from "./Home2_PDF";
import Loader from "react-loader-spinner";
import PreQualPDF from "./PreQualPDF";
import logo_img from "../images/logo.png";
import Header from "./Header";
import RateCampaign from "./RateCampaign";
import Select from "react-select";
import {useLocation, useHistory} from 'react-router-dom'
import moment from "moment";

const Home_2 = () => {

  const location = useLocation()
  const history  = useHistory()
  
  const IdObj = localStorage.getItem("ids")
  const parseIDs = JSON.parse(IdObj)

  useEffect(() => {


    if(location?.state?.RId === undefined){
      if(parseIDs?.loanid === undefined && parseIDs?.rateid !=="" && parseIDs?.rateid !== undefined){
        setIsRateCampaign(true);
        setIdToRatePage(parseIDs?.rateid)  
      }
    }else{
      setIsRateCampaign(true);
      setIdToRatePage(location?.state?.RId)
    }
  },[])

  // const container = React.useRef(null);
  const exportPDFWithMethod = () => {
    setIsLoading(true);
    var doc = new jsPDF("p", "pt", "a4");
    
    doc.html(
      renderToString(
        <Home2_PDF
          totalHOIPremium={totalHOIPremium}
          totalPrepaidInterest={totalPrepaidInterest}
          totalPrepaidTaxes={totalPrepaidTaxes}
          totalHOI={totalHOI}
          totalPropertyTaxes={totalPropertyTaxes}
          sale_Price_OR_Payoffs={sale_Price_OR_Payoffs}
          secondMortgage={secondMortgage}
          estimatedEscrow={estimatedEscrow}
          principalInterest={principalInterest}
          totalLoanAmount={totalLoanAmount}
          Atlas_Loan_Scenario={loanScenario}
          estimatedCashToClose={estimatedCashToClose}
          governmentFundingFee={governmentFundingFee}
          contactDetails={contactDetails}
          blockA={blockA}
          blockB={blockB}
          blockC={blockC}
          blockD={blockD}
          blockE={blockE}
          blockF={blockF}
          blockG={blockG}
          blockH={blockH}
          blockI={blockI}
          blockJ={blockJ}
          user={user}
        />
      ),
      {
        callback: function (doc) {
          doc.setProperties({
            title: "Atlas Loan Scenario",
            subject: "This is the subject",
            author: "Author Name",
            keywords: "generated, javascript, web 2.0, ajax",
            creator: "Creator Name",
          });

          var pageSize = doc.internal.pageSize;
          var pdf_pages = doc.internal.pages;
          var pageHeight = pageSize.height
            ? pageSize.height
            : pageSize.getHeight();

          doc.setFont("helvetica", "normal");
          doc.setTextColor(128, 128, 128);
          doc.setFontSize(8);

          var line1 =
            "Visit www.consumerfinance.gov/mortgage-estimate for general information and tools";
          var line2 = "Keystone Funding, Inc. NMLS ID: 144760";

          for (var i = 1; i < pdf_pages.length; i++) {
            // We are telling our pdfObject that we are now working on this page
            doc.setPage(i);
            // The 10,200 value is only for A4 landscape. You need to define your own for other page sizes
            doc.text(line1, 35, pageHeight - 40);
            doc.text(line2, 35, pageHeight - 30);
            doc.setFontSize(9);
            doc.text(
              "Page " + String(i) + " of " + String(pdf_pages.length - 1),
              pageSize.width - 50,
              pageHeight - 30,
              {
                align: "center",
              }
            );
          }
          setIsLoading(false);
          window.open(doc.output("bloburl"), "_blank");
        },
        margin: [60, 40, 60, 40],
        x: 32,
        y: 32,
      }
    );
  };

  const exportPreQualPDF = () => {

    const preQualHtml = renderToString(
      <PreQualPDF
        totalLoanAmount={totalLoanAmount}
        Atlas_Loan_Scenario={loanScenario}
        contactDetails={contactDetails}
        user={user}
      />
    )

    console.log("prequal", preQualHtml)

    setIsLoadingPreQualPDF(true);
    var doc = new jsPDF("p", "pt", "a4");
    doc.html(
      renderToString(
        <PreQualPDF
          totalLoanAmount={totalLoanAmount}
          Atlas_Loan_Scenario={loanScenario}
          contactDetails={contactDetails}
          user={user}
        />
      ),
      {
        callback: function (doc) {
          doc.setProperties({
            title: "Atlas Loan Scenario",
            subject: "This is the subject",
            author: "Author Name",
            keywords: "generated, javascript, web 2.0, ajax",
            creator: "Creator Name",
          });

          var pageSize = doc.internal.pageSize;
          var pdf_pages = doc.internal.pages;
          var pageHeight = pageSize.height
            ? pageSize.height
            : pageSize.getHeight();

          doc.setFont("helvetica", "normal");
          doc.setTextColor(34, 55, 110);
          doc.setFontSize(10);

          var footer_content =
            "KEYSTONE FUNDING |  CORPORATE NMLS ID: 144760  |  950 N WASHINGTON ST  |  ALEXANDRIA, VA 22314";

          for (var i = 1; i < pdf_pages.length; i++) {
            // We are telling our pdfObject that we are now working on this page
            doc.setPage(i);
            // doc.addImage(logo_img, 'png', 200, 30, 200, 100)
            // The 10,200 value is only for A4 landscape. You need to define your own for other page sizes
            doc.text(footer_content, 35, pageHeight - 30);
          }
          setIsLoadingPreQualPDF(false);
          window.open(doc.output("bloburl"), "_blank");
        },
        margin: [60, 40, 60, 40],
        x: 32,
        y: 32,
      }
    );
  };

  const [user, setUser] = useState({});
  const [loanTypeSelect, setLoanTypeSelect] = useState("");
  const [loanProductSelect, setLoanProductSelect] = useState("")
  const [rateLoanIdSelect, setRateLoanIdSelect] = useState("")
  const [loanTypeOp, setLoanTypeOp] = useState({});

  const [specialProgramSelect, setSpecialProgramSelect] = useState("");
  const [specialProgramOp, setSpecialProgramOp] = useState({});

  const [contactDetails, setContactDetails] = useState({
    id: 0,
    userId: 0,
    firstName: "",
    lastName: "",
    email: "",
    salesSystemId: 0,
    stage: "",
    commentsFromLead: "",
    createdDate: "",
    createdTime: "",
    dateTimeCreated: "",
    dateUpdated: "",
    dateDeleted: null,
    pictureURL: null,
    leadSource: null,
    loanScenarios: [],
    rateCampaings: [],
    scenarioCompare: [],
  });
  const [loanScenario, setLoanScenario] = useState({
    id: 0,
    contactId: 0,
    scenarioName: "",
    loanPurpose: "",
    cashoutRequest: 0,
    isPayingOffSecondMortgage: 0,
    isCashout: 0,
    propertyStreet: "",
    propertyStreet2: "",
    propertyCity: "",
    propertyZip: "",
    propertyState: "",
    propertyCounty: "",
    propertyType: "",
    creditScore: "",
    occupancy: "",
    isVaEligible: 0,
    isVaDisability: 0,
    isVaUsedBefore: 0,
    houseValue: 0,
    baseLoanAmount: 0,
    currentLoanBalance: 0,
    secondMortgageBalance: 0,
    loanProduct: "",
    loanType: "",
    currentLoanType: "",
    loanTypeSpecial: "",
    interestRate: 0,
    lockPeriod: "",
    loanPrice: 0,
    lenderCredit: 0,
    isFirstTimeHomeBuyer: 0,
    isTaxEscrowsWaived: 0,
    monthlyPropertyTax: 0,
    monthlyHOI: 0,
    blockAOriginationFee: 0,
    blockADiscountFee: 0,
    blockBAppraisalFee: 0,
    blockBCreditFees: 0,
    blockBFloodCertification: 0,
    blockATaxService: 0,
    blockCTitleServices: 0,
    blockCSurvey: 0,
    blockETransferTaxes: 0,
    blockERecordingCharges: 0,
    blockHOwnersTitleInsPremium: 0,
    dateCreated: "",
    dateUpdated: "",
    dateDeleted: null,
    governmentFundingFeePercent: 0,
    isFinancedFundingFeeMI: 0,
    annualMortgageInsuranceRate: 0,
    mortgageInsurancePremiumType: "",
    secondMortgageRequest: "",
    monthlyHOA: 0,
    blockAprocessingFee: 0,
    blockBtaxReturnVerificationFee: 0,
    blockBverificationEmployment: 0,
    blockBhoaQuestionnaire: 0,
    blockBcondoProjectApproval: 0,
    blockBsinglePremiumMI: 0,
    blockFdaysPrepaidInterest: 0,
    blockFnumMonthsPrepaidHOI: 0,
    blockGnumMonthsTaxReserves: 0,
    sellerCredit: 0,
    otherCredits: 0,
    isInsuranceEscrowsWaived: 0,
    blockGnumMonthsInsReserves: 0,
    blockFnumMonthsPrepaidTaxes: 0,
    annualIncome: 0,
    governmentFundingFee: 0,
    totalLoanAmount: 0,
  });

  const [address, setAddress] = useState({
    propertyStreet: "",
    propertyCity: "",
    propertyZip: "",
    propertyState: "",
  });

  const [loanModal, setLoanModal] = useState({
    baseLoanAmount: "",
    loanProduct: "",
    loanType: "",
    specialProgram: "",
  });

  const [descriptor, setDescriptor] = useState("");

  const [open, setOpen] = useState(false);
  const [openLoanModal, setOpenLoanModal] = useState(false);
  const [openRateModal, setOpenRateModal] = useState(false);
  const [deleteLoanModal, setDeleteModal] = useState(false)
  const [customMessage, setCustomMessage] = useState("")
  const [modalTitle, setModalTitle]= useState("")
  const [DeleteID, setDeleteID] = useState("")
  const [DeleteRateID,setDeleteRateID]= useState("")
  const [rateLoanScenarioId,setRateLoanScenarioId] = useState("")

  const [isEqual, setIsEqual] = useState();
  const [selectedValue, setSelectedValue] = useState();

  const propertyStateOptions = ["DC", "DE", "FL", "MD", "NJ", "PA", "VA"];

  const lockPeriodOptions = [
    "15 days",
    "30 days",
    "45 days",
    "60 days",
    "90 days",
  ];

  const loanProductOptions = [
    { label: "10-yr Fixed", value: "10-yr" },
    { label: "15-yr Fixed", value: "15-yr" },
    { label: "20-yr Fixed", value: "20-yr" },
    { label: "25-yr Fixed", value: "25-yr" },
    { label: "30-yr Fixed", value: "30-yr" },
    { label: "5/1 ARM", value: "5-1A" },
    { label: "5/5 ARM", value: "5-5A" },
    { label: "7/1 ARM", value: "7-1A" },
    { label: "10/1 ARM", value: "10-1A" },
  ];

  const [RateLoanOptions, setRateLoanOptions] = useState()
useEffect(() => {
  // console.log("sss",contactDetails)
  if(Object.values(contactDetails)!== "" || Object.values(contactDetails)!== null){
    const newData = contactDetails?.loanScenarios?.map((l, index) => {
        return {label:l.scenarioName, value:l.id}
      })
    setRateLoanOptions(newData)
  }
},[contactDetails])

// useEffect(() => {
//   console.log("options", RateLoanOptions)
// },[RateLoanOptions])

  const occupancyOptions = ["Owner-Occupied", "Second Home", "Investment"];

  const propertyCountryOptions = [
    "Accomack",
    "Adams",
    "Alachua",
    "Alamance",
    "Albany",
    "Albemarle",
    "Alexander",
    "Alexandria City",
    "Allegany",
    "Alleghany",
    "Allegheny",
    "Amelia",
    "Amherst",
    "Anne Arundel",
    "Anson",
    "Appomattox",
    "Arlington",
    "Armstrong",
    "Ashe",
    "Atlantic",
    "Augusta",
    "Avery",
    "Baker",
    "Baltimore",
    "Baltimore City",
    "Bath",
    "Bay",
    "Beaufort",
    "Beaver",
    "Bedford",
    "Bedford City",
    "Bergen",
    "Berks",
    "Bertie",
    "Bladen",
    "Blair",
    "Bland",
    "Botetourt",
    "Bradford",
    "Brevard",
    "Bristol City",
    "Bronx",
    "Broome",
    "Broward",
    "Brunswick",
    "Buchanan",
    "Buckingham",
    "Bucks",
    "Buena Vista City",
    "Buncombe",
    "Burke",
    "Burlington",
    "Butler",
    "Cabarrus",
    "Caldwell",
    "Calhoun",
    "Calvert",
    "Cambria",
    "Camden",
    "Cameron",
    "Campbell",
    "Cape May",
    "Carbon",
    "Caroline",
    "Carroll",
    "Carteret",
    "Caswell",
    "Catawba",
    "Cattaraugus",
    "Cayuga",
    "Cecil",
    "Centre",
    "Charles",
    "Charles City",
    "Charlotte",
    "Charlottesville City",
    "Chatham",
    "Chautauqua",
    "Chemung",
    "Chenango",
    "Cherokee",
    "Chesapeake City",
    "Chester",
    "Chesterfield",
    "Chowan",
    "Citrus",
    "Clarion",
    "Clarion",
    "Clarke",
    "Clay",
    "Clearfield",
    "Cleveland",
    "Clinton",
    "Collier",
    "Colonial Heights City",
    "Columbia",
    "Columbus",
    "Cortland",
    "Covington City",
    "Craig",
    "Craven",
    "Crawford",
    "Culpeper",
    "Cumberland",
    "Currituck",
    "Danville City",
    "Dare",
    "Dauphin",
    "Davidson",
    "Davie",
    "Delaware",
    "De Soto",
    "Dickenson",
    "Dinwiddie",
    "District of Columbia",
    "Dixie",
    "Dorchester",
    "Duplin",
    "Durham",
    "Dutchess",
    "Duval",
    "Edgecombe",
    "Elk",
    "Emporia City",
    "Erie",
    "Escambia",
    "Essex",
    "Fairfax",
    "Fairfax City",
    "Falls Church City",
    "Fauquier",
    "Fayette",
    "Flagler",
    "Floyd",
    "Fluvanna",
    "Forest",
    "Forsyth",
    "Franklin",
    "Franklin City",
    "Frederick",
    "Fredericksburg City",
    "Fulton",
    "Gadsden",
    "Galax City",
    "Garrett",
    "Gaston",
    "Gates",
    "Genesee",
    "Gilchrist",
    "Giles",
    "Glades",
    "Gloucester",
    "Goochland",
    "Graham",
    "Granville",
    "Grayson",
    "Greene",
    "Greensville",
    "Guilford",
    "Gulf",
    "Halifax",
    "Hamilton",
    "Hampton City",
    "Hanover",
    "Hardee",
    "Harford",
    "Harnett",
    "Harrisonburg City",
    "Haywood",
    "Henderson",
    "Hendry",
    "Henrico",
    "Henry",
    "Herkimer",
    "Hernando",
    "Hertford",
    "Highland",
    "Highlands",
    "Hillsborough",
    "Hoke",
    "Holmes",
    "Hopewell City",
    "Howard",
    "Hudson",
    "Hunterdon",
    "Huntingdon",
    "Hyde",
    "Indiana",
    "Indian River",
    "Iredell",
    "Isle of Wight",
    "Jackson",
    "James City",
    "Jefferson",
    "Johnston",
    "Jones",
    "Juniata",
    "Kent",
    "King and Queen",
    "King George",
    "Kings",
    "King William",
    "Lackawanna",
    "Lafayette",
    "Lake",
    "Lancaster",
    "Lawrence",
    "Lebanon",
    "Lee",
    "Lehigh",
    "Lenoir",
    "Leon",
    "Levy",
    "Lewis",
    "Lexington City",
    "Liberty",
    "Lincoln",
    "Livingston",
    "Loudoun",
    "Louisa",
    "Lunenburg",
    "Luzerne",
    "Lycoming",
    "Lynchburg City",
    "Macon",
    "Madison",
    "Manassas City",
    "Manassas Park City",
    "Manatee",
    "Marion",
    "Martin",
    "Martinsville City",
    "Mathews",
    "Mcdowell",
    "McKean",
    "Mecklenburg",
    "Mercer",
    "Miami-Dade",
    "Middlesex",
    "Mifflin",
    "Mitchell",
    "Monmouth",
    "Monroe",
    "Montgomery",
    "Montour",
    "Moore",
    "Morris",
    "Nash",
    "Nassau",
    "Nelson",
    "New Castle",
    "New Hanover",
    "New Kent",
    "Newport News City",
    "New York",
    "Niagara",
    "Norfolk City",
    "Northampton",
    "Northumberland",
    "Norton City",
    "Nottoway",
    "Ocean",
    "Okaloosa",
    "Okeechobee",
    "Oneida",
    "Onondaga",
    "Onslow",
    "Ontario",
    "Orange",
    "Orleans",
    "Osceola",
    "Oswego",
    "Otsego",
    "Page",
    "Palm Beach",
    "Pamlico",
    "Pasco",
    "Pasquotank",
    "Passaic",
    "Patrick",
    "Pender",
    "Perquimans",
    "Perry",
    "Person",
    "Petersburg City",
    "Philadelphia",
    "Pike",
    "Pinellas",
    "Pitt",
    "Pittsylvania",
    "Polk",
    "Poquoson City",
    "Portsmouth City",
    "Potter",
    "Powhatan",
    "Prince Edward",
    "Prince George",
    "Prince Georges",
    "Prince William",
    "Pulaski",
    "Putnam",
    "Queen Annes",
    "Queens",
    "Radford",
    "Randolph",
    "Rappahannock",
    "Rensselaer",
    "Richmond",
    "Richmond City",
    "Roanoke",
    "Roanoke City",
    "Robeson",
    "Rockbridge",
    "Rockingham",
    "Rockland",
    "Rowan",
    "Russell",
    "Rutherford",
    "Salem",
    "Salem City",
    "Sampson",
    "Santa Rosa",
    "Sarasota",
    "Saratoga",
    "Schenectady",
    "Schoharie",
    "Schuyler",
    "Schuylkill",
    "Scotland",
    "Scott",
    "Seminole",
    "Seneca",
    "Shenandoah",
    "Smyth",
    "Snyder",
    "Somerset",
    "Southampton",
    "Spotsylvania",
    "Saint Johns",
    "St. Lawrence",
    "Saint Lucie",
    "Saint Marys",
    "Stafford",
    "Stanly",
    "Staunton City",
    "Steuben",
    "Stokes",
    "Suffolk",
    "Suffolk City",
    "Sullivan",
    "Sumter",
    "Surry",
    "Susquehanna",
    "Sussex",
    "Suwannee",
    "Swain",
    "Talbot",
    "Taylor",
    "Tazewell",
    "Tioga",
    "Tompkins",
    "Transylvania",
    "Tyrrell",
    "Ulster",
    "Union",
    "Vance",
    "Venango",
    "Virginia Beach City",
    "Volusia",
    "Wake",
    "Wakulla",
    "Walton",
    "Warren",
    "Washington",
    "Watauga",
    "Wayne",
    "Waynesboro City",
    "Westchester",
    "Westmoreland",
    "Wicomico",
    "Wilkes",
    "Williamsburg City",
    "Wilson",
    "Winchester City",
    "Wise",
    "Worcester",
    "Wyoming",
    "Wythe",
    "Yadkin",
    "Yancey",
    "Yates",
    "York",
  ];

  const propertyTypeOptions = [
    "Single Family",
    "Single Family- PUD",
    "Condo",
    "Condo 5+",
    "Condotel",
    "Co-op",
    "Duplex",
    "Triplex",
    "Fourplex",
    "Manufactured",
  ];

  const loanPurposeOptions = ["Purchase", "Refinance"];

  const loanTypeSpecialOptions = [
    "N/A",
    "Home Possible",
    "HomeReady",
    "HomeReady/Possible",
    "CRA",
    "203k",
    "HomeStyle",
    "IRRRL",
    "Streamline",
    "HomePath",
    "HomeSteps",
  ];

  const loanTypeOptions = [
    "Conforming",
    "Fannie",
    "Freddie",
    "Non-Conforming",
    "FHA",
    "USDA",
    "VA",
  ];

  useEffect(() => {
    let tempObj = DescriptorObject.map((item, index) => {
      // console.log(item)
      return { label: Object.keys(item)[0], value: Object.keys(item)[0] };
    });
    setLoanTypeOp(tempObj);
  }, []);

  const DescriptorObject = [
    { Conforming: [{ id: "HomeReady/Possible", value: "HP/HR" }] },
    {
      Fannie: [
        { id: "HomeReady", value: "HomeReady" },
        { id: "HomePath", value: "HomePath" },
      ],
    },
    {
      Freddie: [
        { id: "Home Possible", value: "HomePossible" },
        { id: "HomeSteps", value: "HomeSteps" },
      ],
    },
    { "Non-Conforming": [{}] },
    {
      FHA: [
        { id: "Streamline", value: "FHA Stream" },
        { id: "203k", value: "FHA 203K" },
      ],
    },
    { USDA: [{ id: "Streamline", value: "USDA Stream" }] },
    { VA: [{ id: "IRRRL", value: "VA IRRRL" }] },
  ];


  const currentLoanTypeOptions = ["Conventional", "FHA", "USDA", "VA", "Other"];

  const mortgageInsurancePremiumTypeOptions = ["N/A","Monthly", "Single Premium"];

  const secondMortgageRequestOptions = [
    "N/A",
    "Payoff existing 2nd mortgage",
    "Re-subordinate existing 2nd mortgage",
    "New 2nd mortgage",
  ];

  const monthsOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  const [blockA, setBlockA] = useState(0);
  const [blockB, setBlockB] = useState(0);
  const [blockC, setBlockC] = useState(0);
  const [blockD, setBlockD] = useState(0);
  const [blockE, setBlockE] = useState(0);
  const [blockF, setBlockF] = useState(0);
  const [blockG, setBlockG] = useState(0);
  const [blockH, setBlockH] = useState(0);
  const [blockI, setBlockI] = useState(0);
  const [blockJ, setBlockJ] = useState(0);
  const [totalLoanAmount, setTotalLoanAmount] = useState(0);
  const [governmentFundingFee, setGovernmentFundingFee] = useState(0);
  const [leftSideLoanPurpose, setLeftSideLoanPurpose] = useState("");
  const [LTV_CLTV, setLTV_CLTV] = useState(0);
  const [totalHOIPremium, setTotalHOIPremium] = useState(0);
  const [totalPrepaidInterest, setTotalPrepaidInterest] = useState(0);
  const [totalPrepaidTaxes, setTotalPrepaidTaxes] = useState(0);
  const [totalHOI, setTotalHOI] = useState(0);
  const [totalPropertyTaxes, setTotalPropertyTaxes] = useState(0);
  const [estimatedEscrow, setEstimatedEscrow] = useState(0);
  const [principalInterest, setPrincipalInterest] = useState(0);
  const [sale_Price_OR_Payoffs, setSale_Price_OR_Payoffs] = useState(0);
  const [secondMortgage, setSecondMortgage] = useState(0);
  const [estimatedCashToClose, setEstimatedCashToClose] = useState(0);
  const [openRepriceModal, setOpenRepriceModal] = useState(false);
  const [link, setLink] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingPreQualPDF, setIsLoadingPreQualPDF] = useState(false);
  const [headers, setHeaders] = useState("");
  const [isRateCampaign, setIsRateCampaign] = useState(false);
  const [idToRatePage,setIdToRatePage] = useState("")

  const handleProps = (e) => {
    setHeaders(e);
  };

  useEffect(() => {
    if (openRepriceModal) {
      var eventMethod = window.addEventListener
        ? "addEventListener"
        : "attachEvent";
      var eventer = window[eventMethod];
      var messageEvent = eventMethod == "attachEvent" ? "onmessage" : "message";
  
      eventer(
        messageEvent,
        function (e) {
          var key = e.message ? "message" : "data";
          var data = e[key];
          if (data == "close-intelliquote-modal") {
            setOpenRepriceModal(false);
            getData()
          }
        },
        false
      );
    }
  },[openRepriceModal])
  

  useEffect(() => {
    let governmentFundingFeeVal =
      (Number(loanScenario.baseLoanAmount) *
        Number(loanScenario.governmentFundingFeePercent)) /
      100;
    setGovernmentFundingFee(governmentFundingFeeVal);

    let totalLoanAmountVal = 0;
    if (loanScenario.isFinancedFundingFeeMI === 0) {
      totalLoanAmountVal = Number(loanScenario.baseLoanAmount);
    } else if (loanScenario.mortgageInsurancePremiumType === "Single Premium") {
      totalLoanAmountVal =
        Number(loanScenario.baseLoanAmount) +
        (Number(loanScenario.annualMortgageInsuranceRate) *
          Number(loanScenario.baseLoanAmount)) /
          100;
    } else {
      totalLoanAmountVal =
        Number(loanScenario.baseLoanAmount) + Number(governmentFundingFeeVal);
    }
    setTotalLoanAmount(totalLoanAmountVal);

    // var FUVFundingFee = Math.round(Number(loanScenario.baseLoanAmount) * Number(loanScenario.governmentFundingFee));
    // setFHA_USDA_VA_FundingFee(FUVFundingFee);

    var LTV_CLTV = "";
    if (!loanScenario.secondMortgageBalance) {
      LTV_CLTV =
        Math.round(
          (100 * Number(loanScenario.baseLoanAmount)) /
            Number(loanScenario.houseValue)
        ) + "%";
    } else {
      if (Number(loanScenario.isPayingOffSecondMortgage) === 0) {
        var v = Math.round(
          (100 *
            (Number(loanScenario.baseLoanAmount) +
              Number(loanScenario.secondMortgageBalance))) /
            Number(loanScenario.houseValue)
        );
        LTV_CLTV =
          Math.round(
            (100 * Number(loanScenario.baseLoanAmount)) /
              Number(loanScenario.houseValue)
          ) +
          "% / " +
          v +
          "%";
      } else {
        LTV_CLTV =
          Math.round(
            (100 * Number(loanScenario.baseLoanAmount)) /
              Number(loanScenario.houseValue)
          ) + "%";
      }
    }
    setLTV_CLTV(LTV_CLTV);

    var HOIPremium = Math.round(
      Number(loanScenario.blockFnumMonthsPrepaidHOI) *
        Number(loanScenario.monthlyHOI)
    );
    setTotalHOIPremium(HOIPremium);

    var prepaidInterest = Math.round(
      (Number(loanScenario.blockFdaysPrepaidInterest) *
        totalLoanAmountVal *
        Number(loanScenario.interestRate)) /
        36000
    );
    setTotalPrepaidInterest(prepaidInterest);

    var prepaidTaxes = Math.round(
      Number(loanScenario.blockFnumMonthsPrepaidTaxes) *
        Number(loanScenario.monthlyPropertyTax)
    );
    setTotalPrepaidTaxes(prepaidTaxes);

    var HOI = Math.round(
      Number(loanScenario.blockGnumMonthsInsReserves) *
        Number(loanScenario.monthlyHOI)
    );
    setTotalHOI(HOI);

    var propertyTaxes = Math.round(
      Number(loanScenario.blockGnumMonthsTaxReserves) *
        Number(loanScenario.monthlyPropertyTax)
    );
    setTotalPropertyTaxes(propertyTaxes);

    setBlockA(
      Number(loanScenario.blockADiscountFee) +
        Number(loanScenario.blockAOriginationFee) +
        Number(loanScenario.blockAprocessingFee) +
        Number(loanScenario.blockATaxService)
    );

    setBlockB(
      Number(loanScenario.blockBAppraisalFee) +
        Number(loanScenario.blockBCreditFees) +
        Number(loanScenario.blockBFloodCertification) +
        Number(loanScenario.blockBtaxReturnVerificationFee) +
        Number(loanScenario.blockBverificationEmployment) +
        Number(loanScenario.blockBhoaQuestionnaire) +
        Number(loanScenario.blockBcondoProjectApproval) +
        Number(loanScenario.blockBsinglePremiumMI) +
        Number(governmentFundingFeeVal)
    );

    setBlockC(
      Number(loanScenario.blockCTitleServices) +
        Number(loanScenario.blockCSurvey)
    );

    var dBlock =
      Number(loanScenario.blockADiscountFee) +
      Number(loanScenario.blockAOriginationFee) +
      Number(loanScenario.blockAprocessingFee) +
      Number(loanScenario.blockATaxService) +
      Number(loanScenario.blockBAppraisalFee) +
      Number(loanScenario.blockBCreditFees) +
      Number(loanScenario.blockBFloodCertification) +
      Number(loanScenario.blockBtaxReturnVerificationFee) +
      Number(loanScenario.blockBverificationEmployment) +
      Number(loanScenario.blockBhoaQuestionnaire) +
      Number(loanScenario.blockBcondoProjectApproval) +
      Number(loanScenario.blockBsinglePremiumMI) +
      Number(governmentFundingFeeVal) +
      Number(loanScenario.blockCTitleServices) +
      Number(loanScenario.blockCSurvey);

    setBlockD(dBlock);

    setBlockE(
      Number(loanScenario.blockERecordingCharges) +
        Number(loanScenario.blockETransferTaxes)
    );

    setBlockF(
      Number(HOIPremium) + Number(prepaidInterest) + Number(prepaidTaxes)
    );

    setBlockG(Number(HOI) + Number(propertyTaxes));

    setBlockH(Number(loanScenario.blockHOwnersTitleInsPremium));

    var iBlock =
      Number(loanScenario.blockERecordingCharges) +
      Number(loanScenario.blockETransferTaxes) +
      Number(HOIPremium) +
      Number(prepaidInterest) +
      Number(prepaidTaxes) +
      Number(HOI) +
      Number(propertyTaxes) +
      Number(loanScenario.blockHOwnersTitleInsPremium);

    setBlockI(iBlock);

    var jBlock = dBlock + iBlock - Number(loanScenario.lenderCredit);

    setBlockJ(jBlock);

    var estimatedEscrowVal =
      Number(loanScenario.monthlyPropertyTax) + Number(loanScenario.monthlyHOI);
    setEstimatedEscrow(estimatedEscrowVal);

    var loanTerm = loanScenario?.loanProduct?.includes("ARM")
      ? 360
      : 12 * Number(loanScenario?.loanProduct?.substring(0, 2));

    var principalInterestVal =
      (totalLoanAmountVal *
        (Number(loanScenario.interestRate) / 1200) *
        ((1 + Number(loanScenario.interestRate) / 1200) ^ loanTerm)) /
      (((1 + Number(loanScenario.interestRate) / 1200) ^ loanTerm) - 1);

    setPrincipalInterest(principalInterestVal);

    var salePriceOrPayoffs = 0;
    if (loanScenario.loanPurpose === "Purchase") {
      salePriceOrPayoffs = Number(loanScenario.houseValue);
    }
    if (loanScenario.loanPurpose === "Refinance") {
      salePriceOrPayoffs = Number(loanScenario.currentLoanBalance);
    }
    setSale_Price_OR_Payoffs(salePriceOrPayoffs);

    var secondM =
      loanScenario.secondMortgageRequest === "New 2nd mortgage"
        ? Number(loanScenario.secondMortgageBalance)
        : 0;
    setSecondMortgage(secondM);

    var sellerC =
      loanScenario.loanPurpose === "Purchase"
        ? Number(loanScenario.sellerCredit)
        : 0;

    var estimatedCashToCloseVal = 0;
    estimatedCashToCloseVal =
      salePriceOrPayoffs +
      jBlock -
      totalLoanAmountVal -
      secondM -
      sellerC -
      Number(loanScenario.otherCredits);

    setEstimatedCashToClose(estimatedCashToCloseVal);

    if (
      loanScenario.loanPurpose === "Purchase" &&
      loanScenario.isFirstTimeHomeBuyer === 1
    ) {
      setLeftSideLoanPurpose("Purchase - FTHB");
    }
    if (
      loanScenario.loanPurpose === "Purchase" &&
      loanScenario.isFirstTimeHomeBuyer === 0
    ) {
      setLeftSideLoanPurpose("Purchase");
    }
    if (
      loanScenario.loanPurpose === "Refinance" &&
      loanScenario.isCashout === 1
    ) {
      setLeftSideLoanPurpose("Cashout Refinance");
    }
    if (
      loanScenario.loanPurpose === "Refinance" &&
      loanScenario.isCashout === 0
    ) {
      setLeftSideLoanPurpose("Rate/Term Refinance");
    }
  }, [loanScenario]);

  useEffect(() => {
    getData();
  }, []);


  async function getData(LID) {
    try {
      // let result = {
      //   id: location?.state?.id? location?.state?.id : 1 ,
      // };

      let result = {
        id:""
      }
      if(LID !== "" && LID !== null && LID !== undefined){
        result.id= LID
      }else{
        if(location?.state?.id === undefined){
          if(parseIDs?.rateid ===undefined && parseIDs?.loanid !=="" && parseIDs?.loanid !== undefined){
            result.id = parseIDs?.loanid
          }else{
            result.id = 1
          }
        }else{
          result.id = location?.state?.id
        }
      }

      await axios({
        method: "get",
        url: "https://atlas-admin.keystonefunding.com/api/loanscenario/details",
        params: result,
      })
        .then((res) => {
          if (res.status === 200) {
            setLoanScenario(res.data.data[0]);

            var contactId = {
              id: res.data.data[0].contactId,
            };

            return axios({
              method: "get",
              url: "https://atlas-admin.keystonefunding.com/api/contact/details",
              params: contactId,
            });
          }
        })
        .then((res) => {
          setContactDetails(res.data.data);
          // console.log("result-----",res);

          var userId = {
            id: res.data.data.userId,
          };

          return axios({
            method: "get",
            url: "https://atlas-admin.keystonefunding.com/api/user/details",
            params: userId,
          });
        })
        .then((res) => {
          setUser(res.data.data);
          // console.log("User-----",res);
        });
    } catch (e) {
      console.log(e);
    }
  }

  const onClick = (v, dropdownValue) => {
    setIsEqual(v);
    setSelectedValue(dropdownValue);
  };

  const onSelect = (v) => {
    console.log("Value--", v);
    setSelectedValue(v.value);
  };

  const handleSave = (val, field) => {
    console.log("event", val);
    console.log("val", field);

    var formData = new FormData();
    formData.append("id", loanScenario.id);
    formData.append(field, val);

    if(val === "N/A"){
      formData.append(field,null);
    }else{
      formData.append(field, val)
    }

    // console.log("keys", formData.get(field))

    // for (var value of formData.values()) {
    //   console.log(value);
    // }



    axios
      .post(
        `https://atlas-admin.keystonefunding.com/api/loanscenario/update`,
        formData
      )
      .then((res) => {
        setIsEqual("");
        setLoanScenario({ ...loanScenario, [field]: val });
        console.log("Update-------------------------", res);
        console.log(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setAddress({ ...address, [name]: value });
  };

  const ChangeNumberFormate = (num) => {
    if (num > 999 && num < 1000000) {
      return (num / 1000).toFixed(0) + "K"; // convert to K for number from > 1000 < 1 million
    } else if (num > 1000000) {
      return (num / 1000000).toFixed(1) + "M"; // convert to M for number from > 1 million
    } else if (num < 900) {
      return num; // if value < 1000, nothing to do
    }
  };

  const handleLoanModalChange = (event) => {
    const { name, value } = event.target;
    const newValue = ChangeNumberFormate(value);
    // console.log("--->", newValue)
    setLoanModal({ ...loanModal, [name]: value });
  };

  const handleLoanTypeSelect = (loanTypeSelect) => {
    setLoanTypeSelect(loanTypeSelect);
  };

  const handleLoanProductSelect = (loanProductSelect) => {
    console.log(loanProductSelect)
    setLoanProductSelect(loanProductSelect)
  }

  const handleRateLoanIdSelect = (rateLoanId) => {
    console.log(rateLoanId)
    setRateLoanIdSelect(rateLoanId)
  }

  const handleSpecialProgramSelect = (specialProgramSelect) => {
    console.log(specialProgramSelect);
    setSpecialProgramSelect(specialProgramSelect);
  };

  useEffect(() => {
    if (Object.keys(loanTypeSelect).length !== 0) {
      const newValue = DescriptorObject.find((item) => {
        // console.log(Object.keys(item)[0])
        return Object.keys(item)[0] === loanTypeSelect.value;
      });
      const testData = Object.values(newValue)[0].map((item) => {
        return { label: item.id, value: item.value };
      });
      console.log("===>", testData);
      setSpecialProgramOp(testData);
    }
  }, [loanTypeSelect]);

  const onOpenModal = () => {
    setAddress({
      propertyStreet: loanScenario.propertyStreet,
      propertyCity: loanScenario.propertyCity,
      propertyState: loanScenario.propertyState,
      propertyZip: loanScenario.propertyZip,
    });
    setOpen(true);
    console.log("open Modal");
  };

  const onOpenLoanModal = () => {
    setOpenLoanModal(true);
  };

  const onOpenRateModal = () => {
    setOpenRateModal(true)
  }

  const onCloseModal = () => setOpen(false);
  const onCloseLoanModal = () => setOpenLoanModal(false);
  const onCloseRateModal = () => setOpenRateModal(false);

  const onCloseDeleteLoanModal = () => {
    setDeleteModal(false)
    setDeleteID("")
    setDeleteRateID("")
    setCustomMessage("Please confirm deletion of this Loan Scenario")
  }


  const onOpenRepriceModal = () => {
    setLink(`https://argos.keystonefunding.com/intelliquote-modal/?id=${loanScenario.id}`)
    setOpenRepriceModal(true);
  };

  const onCloseRepriceModal = () => setOpenRepriceModal(false);

  const handleSubmit = () => {
    var formData = new FormData();
    formData.append("id", loanScenario.id);
    formData.append("propertyStreet", address.propertyStreet);
    formData.append("propertyCity", address.propertyCity);
    formData.append("propertyZip", address.propertyZip);
    formData.append("propertyState", address.propertyState);

    axios
      .post(
        `https://atlas-admin.keystonefunding.com/api/loanscenario/update`,
        formData
      )
      .then((res) => {
        setOpen(false);
        setIsEqual("");
        setLoanScenario({
          ...loanScenario,
          propertyStreet: address.propertyStreet,
          propertyCity: address.propertyCity,
          propertyState: address.propertyState,
          propertyZip: address.propertyZip,
        });
        setAddress({
          propertyStreet: "",
          propertyCity: "",
          propertyZip: "",
          propertyState: "",
        });
        console.log("Update-------------------------", res);
        console.log(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };


  const handleDeleteLoanScenario = () => {
      var formData = new FormData()  
    
    if(DeleteRateID){
      formData.append("id", DeleteRateID)
        axios.post(`https://atlas-admin.keystonefunding.com/api/ratecampaign/delete`
        ,formData)
        .then((res) => {
          // console.log("====> successfully deleted",DeleteRateID)
          // console.log("====> res",res)
          setDeleteRateID("")
          setDeleteModal(false)
          getData()
        })
        .catch((e) => {
          console.log(e)
        })
        
      }
      else if(DeleteID === rateLoanScenarioId){
        setCustomMessage("You Can't Delete")
      }
      else{
        formData.append("id", DeleteID)
        axios.post(`https://atlas-admin.keystonefunding.com/api/loanscenario/delete`
        ,formData)
        .then((res) => {
          // console.log("----> successfully deleted",DeleteID)
          // console.log("----> res",res)
          setDeleteModal(false)
          setDeleteID("")
          if(location?.state?.id === DeleteID){
            history.push({
              pathname:"/home",
            })
          }else if(parseIDs?.loanid === DeleteID){
            history.push({
              pathname:"/home",
            })
            localStorage.removeItem("ids")
          }
          getData()
        })
        .catch((e) => {
          console.log(e)
        })
        }
    }
  


  const handleLoanModalSubmit = () => {
    // console.log("submitted", loanModal, loanTypeSelect, specialProgramSelect)
    const newNumber = ChangeNumberFormate(loanModal.baseLoanAmount);
    let descriptor = "";
    let scenarioName = "";
    if (loanTypeSelect.label === "Conforming" && specialProgramSelect === "") {
      descriptor = "Conf";
    }
    if (loanTypeSelect.label === "Fannie" && specialProgramSelect === "") {
      descriptor = "Conf";
    }
    if (loanTypeSelect.label === "Freddie" && specialProgramSelect === "") {
      descriptor = "Conf";
    }
    if (
      loanTypeSelect.label === "Non-Conforming" &&
      specialProgramSelect === ""
    ) {
      descriptor = "Non-Conf";
    }
    if (loanTypeSelect.label === "FHA" && specialProgramSelect === "") {
      descriptor = "FHA";
    }
    if (loanTypeSelect.label === "USDA" && specialProgramSelect === "") {
      descriptor = "USDA";
    }
    if (loanTypeSelect.label === "VA" && specialProgramSelect === "") {
      descriptor = "VA";
    }
    if (descriptor === ""){
      scenarioName =
        specialProgramSelect.value +
        " " +
        loanProductSelect.value +
        " $" +
        newNumber;
    } else {
        scenarioName = descriptor + " " + loanProductSelect.value + " $" + newNumber;
    }
    console.log(loanProductSelect.value)
    console.log(scenarioName);
    var formData = new FormData()
    formData.append("contactId", contactDetails.id)
    formData.append("baseLoanAmount", loanModal.baseLoanAmount)
    formData.append("loanProduct", loanProductSelect.label)
    formData.append("loanType", loanTypeSelect.label)
    formData.append("loanTypeSpecial", specialProgramSelect.label)
    formData.append("scenarioName", scenarioName)
    

    axios
    .post(
      `https://atlas-admin.keystonefunding.com/api/loanscenario/create`,
      formData
      ).then((res) => {
        setOpenLoanModal(false)
        setLoanModal("")
        setSpecialProgramSelect("")
        setLoanProductSelect("")
        setLoanTypeSelect("")
        console.log("Created...........", res)
        console.log(res.data)
        getData(res.data.id)
      }).catch((e) => {
        console.log(e)
      })
  };


  const handleRateModalSubmit = () => {
    console.log("created.......", rateLoanIdSelect.value, contactDetails.id)

    var formData = new FormData()
    const CurrentDate = new Date()

    const day = moment(CurrentDate).format('dddd')
    formData.append("contactId", contactDetails.id)
    formData.append("loanScenarioId", rateLoanIdSelect.value)

    if(day === "Sunday" || day === "Monday" || day === "Tuesday" ||day === "Wednesday" ||day === "Thursday"){
      const startDate = moment(CurrentDate).add(1,'days').format('YYYY-MM-DD')
      formData.append("startDate", startDate)
    }
    else if(day === "Friday"){
      const startDate = moment(CurrentDate).add(3,'days').format('YYYY-MM-DD')
      formData.append("startDate", startDate)
    }
    else if(day === "Saturday"){
      const startDate = moment(CurrentDate).add(2,'days').format('YYYY-MM-DD')
      formData.append("startDate", startDate)
    }

    if(contactDetails.stage === "Lead" || contactDetails.stage == "Qualified Lead"){
      formData.append("isAppButtonDisplayed", 1)
    }else{
      formData.append("isAppButtonDisplayed", 0)
    }

    formData.append("frequency", "Daily (M-F)")
    // formData.append("selectedDays", null)

    axios
    .post(
      `https://atlas-admin.keystonefunding.com/api/ratecampaign/create`,
      formData
      ).then((res) => {
        console.log("Created...........", res.data.id)
        // console.log(res.data)
        setOpenRateModal(false)
        setRateLoanIdSelect("")
        getData()
        showRateCampain(res.data.id)
      }).catch((e) => {
        console.log(e)
      })    

  }

  const numberWithCommas = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };


  const showRateCampain = (id) => {
    setIsRateCampaign(true);
    setIdToRatePage(id)
  };

  const showLoanScenario = (index) => {
    setIsRateCampaign(false);
    const loanId = { id: index };
    axios({
      method: "get",
      url: "https://atlas-admin.keystonefunding.com/api/loanscenario/details",
      params: loanId,
    }).then((res) => {
      if (res.status === 200) {
        // console.log(`id: ${loanId.id} --->`, res.data.data);
        setLoanScenario(res.data.data[0]);
      }
    });
  };

  const deleteLoanScenario = (e, id, name) => {
    e.preventDefault()
    setCustomMessage("Please confirm deletion of this Loan Scenario")
    setDeleteModal(true)
    setModalTitle("'" + name + "'")

    setDeleteID(id)
    const rateId = contactDetails.rateCampaings.map((item) => {
      return item.id;
    });
    // console.log(rateId)
    const rId = {id:rateId[0]}
    axios({
      method:"get",
      url:"https://atlas-admin.keystonefunding.com/api/ratecampaign/details",
      params:rId
    }).then(res => {
      setRateLoanScenarioId(res.data.data.loanScenarioId)
    }).catch(e => {
      console.log(e)
    })
  };

  const deleteRateCampaign = (id) => {
    setCustomMessage("Please confirm deletion of this Rate Campaign")
    setDeleteRateID(id)
    setDeleteModal(true)
    setModalTitle("Rate Campaign")
  };

  return (
    <>
      {/* <Header value={handleProps} /> */}
      <ToastContainer />

      {/* create loan modal */}
      <Modal open={openLoanModal} onClose={onCloseLoanModal}>
        <div className="create-loan-scenario">
          <ModalTitle>New Loan Scenario</ModalTitle>
          <ModalBody>
              <div className="inputBox loanProduct" style={{ width: "100%" }}>
                <label>Loan Product</label>
                <Select
                maxMenuHeight={550}
                  value={loanProductSelect}
                  onChange={handleLoanProductSelect}
                  options={loanProductOptions}
                  placeholder="Loan Product"
                />
              </div>
              <div className="inputBox loanType" style={{ width: "100%" }}>
              <label>Loan Type</label>
                <Select
                // maxMenuHeight={100}
                  value={loanTypeSelect}
                  onChange={handleLoanTypeSelect}
                  options={loanTypeOp}
                  placeholder="Loan Type"
                />
              </div>
              <div
                className="inputBox specialProgram"
                style={{ width: "100%" }}
              >
                <label>Special Program</label>
                <Select
                  value={specialProgramSelect}
                  onChange={handleSpecialProgramSelect}
                  options={specialProgramOp}
                  placeholder="Special Program"
                />
              </div>
            <div className="inputBox">
            <label>Base Loan Amount</label>
              <input
                style={{height:"57px", width:"55%" }}
                type="number"
                name="baseLoanAmount"
                placeholder="Base Loan Amount"
                onChange={handleLoanModalChange}
                value={loanModal.baseLoanAmount}
              />
            </div>
          </ModalBody>
          <ModalFooter>
            <button className="cancel" onClick={onCloseLoanModal}>
              Cancel
            </button>

            <button className="save" onClick={handleLoanModalSubmit}>
              Create New Scenario
            </button>
          </ModalFooter>
        </div>
      </Modal>

      {/* create rateCampaign modal */}
      <Modal open={openRateModal} onClose={onCloseRateModal}>
        <div className="create-rate-campaign">
          <ModalTitle>New Rate Campaign</ModalTitle>
          <ModalBody>
              <div className="inputBox loanProduct" style={{ width: "100%" }}>
                <label>Loan Scenario</label>
                <Select
                  // maxMenuHeight={200}
                  value={rateLoanIdSelect}
                  onChange={handleRateLoanIdSelect}
                  options={RateLoanOptions}
                  placeholder="Loan Scenario"
                />
              </div>
          </ModalBody>
          <ModalFooter>
            <button className="cancel" onClick={onCloseRateModal}>
              Cancel
            </button>

            <button className="save" onClick={handleRateModalSubmit}>
            Create New Campaign
            </button>
          </ModalFooter>
        </div>
      </Modal>

      {/* delete modal */}
      <Modal open={deleteLoanModal} onClose={onCloseDeleteLoanModal}>
        <div className="delete-loan-scenario">
          <ModalTitle>Delete {modalTitle} </ModalTitle>
          <ModalBody>
            <h4>{customMessage}</h4>
          </ModalBody>
          <ModalFooter>
            <button className="cancel" onClick={onCloseDeleteLoanModal}>
              Cancel
            </button>
            <button className="delete" onClick={handleDeleteLoanScenario}>
              Delete
            </button>
          </ModalFooter>
        </div>
      </Modal>
      <div className="maindiv">
        <div className="pro-class">
          <div className="profile-sec">
            <div className="profile-main">
              <div className="profile">
                <img className="protb-img" src={contactDetails.pictureURL}/>
                <div className="text-pro">
                  <p>
                    {contactDetails.firstName + " " + contactDetails.lastName}
                  </p>
                  <h5>{contactDetails.stage}</h5>
                </div>
              </div>
              <div className="pro-main">
                <div className="pro-detail">
                  <div className="pro-detail-text">
                    <p>Loan Purpose</p>
                    <h3>{leftSideLoanPurpose}</h3>
                  </div>
                  <div className="pro-detail-text">
                    <p>Location</p>
                    <h3>
                      {loanScenario.propertyCounty +
                        " County, " +
                        loanScenario.propertyState}
                    </h3>
                  </div>
                  <div className="pro-detail-text">
                    <p>Occupancy</p>
                    <h3>{loanScenario.occupancy}</h3>
                  </div>
                  <div className="pro-detail-text">
                    <p>Credit Score</p>
                    <h3>{loanScenario.creditScore}</h3>
                  </div>
                  <div className="pro-detail-text">
                    <p>Comments from Lead</p>
                    <h3>{contactDetails.commentsFromLead}</h3>
                  </div>
                </div>
              </div>
              <div className="accro-pro">
                <Accordion defaultActiveKey="0">
                  <Card>
                    <Card.Header>
                      <Accordion.Toggle as={Button} variant="link" eventKey="0">
                        <div className="aco-left">
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
                            />
                            <path
                              d="M11.9868 8.35922C11.3469 7.5453 10.6153 6.89685 9.81217 6.43054C9.9437 6.26967 10.0475 6.08104 10.1145 5.87081C10.3775 5.04294 9.99334 4.05954 9.01288 3.73918L10.3874 1.26157C10.5608 0.948887 10.405 0.550629 10.0706 0.450137C9.07681 0.151443 8.04375 0 7 0C5.95625 0 4.92319 0.151443 3.92941 0.450137C3.59463 0.55074 3.43944 0.949258 3.61265 1.26157L4.98712 3.73921C4.01053 4.05795 3.62155 5.0399 3.88565 5.87126C3.95245 6.08093 4.0562 6.26944 4.18812 6.43039C3.38491 6.8967 2.65325 7.54523 2.0132 8.35922C0.733779 9.98636 0 12.0388 0 13.9902C0 18.0385 3.12476 19 7 19C10.878 19 14 18.0369 14 13.9902C14 12.0388 13.2662 9.98636 11.9868 8.35922ZM4.89986 1.34403C5.58683 1.19073 6.29059 1.11328 7 1.11328C7.7094 1.11328 8.41317 1.19073 9.10014 1.34403L7.91434 3.4816C7.307 3.39395 6.69318 3.39399 6.08569 3.48164L4.89986 1.34403ZM5.25165 4.82036C6.17834 4.50612 7.14786 4.44656 8.09042 4.64134L8.09379 4.64201C8.31349 4.68758 8.53171 4.74688 8.74759 4.8201C9.02979 4.91625 9.184 5.23179 9.09149 5.52299C9.02426 5.73388 8.84674 5.87913 8.63793 5.90265C8.10105 5.72887 7.55343 5.64062 7 5.64062C6.44768 5.64062 5.90114 5.7285 5.3653 5.90158C5.15326 5.87902 4.97531 5.73273 4.90865 5.52351C4.816 5.23179 4.97022 4.91621 5.25165 4.82036ZM7 17.8941C2.79296 17.8941 1.07692 16.7579 1.07692 13.9902C1.07692 12.315 1.73934 10.4725 2.84882 9.06144C4.0189 7.57339 5.49313 6.75391 7 6.75391C8.65868 6.75391 10.1095 7.73664 11.1512 9.06144C12.2607 10.4725 12.9231 12.315 12.9231 13.9902C12.9231 16.7579 11.207 17.8941 7 17.8941Z"
                              fill="#2CC14E"
                            />
                          </svg>
                          <p>Loan Scenarios</p>
                        </div>
                        <span>
                          <svg
                            onClick={onOpenLoanModal}
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <circle cx="10" cy="10" r="10" fill="#70C3FF" />
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M9.38284 13.6452C9.38284 13.986 9.65916 14.2623 10 14.2623C10.3409 14.2623 10.6172 13.986 10.6172 13.6452V10.6172H13.6452C13.986 10.6172 14.2623 10.3408 14.2623 9.99999C14.2623 9.65914 13.986 9.38282 13.6452 9.38282H10.6172V6.35484C10.6172 6.01398 10.3409 5.73767 10 5.73767C9.65916 5.73767 9.38284 6.01399 9.38284 6.35484V9.38282H6.35484C6.01398 9.38282 5.73767 9.65914 5.73767 9.99999C5.73767 10.3408 6.01399 10.6172 6.35484 10.6172H9.38284V13.6452Z"
                              fill="white"
                            />
                          </svg>
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
                        </span>
                      </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="0">
                      <Card.Body>
                        {contactDetails.loanScenarios &&
                          contactDetails.loanScenarios?.map((data, index) => (
                            <div
                            onClick={() => showLoanScenario(data.id)}
                              className="pro-detail-text new-pro"
                              key={index}
                            >
                              <h3 >
                                {data.scenarioName}
                              </h3>
                              <svg
                                onClick={(e) => deleteLoanScenario(e,data.id, data.scenarioName)}
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 512 512"
                                width="20.5"
                                height="25"
                              >
                                <path
                                  fill="#ff6767"
                                  d="M504.1,256C504.1,119,393,7.9,256,7.9C119,7.9,7.9,119,7.9,256C7.9,393,119,504.1,256,504.1C393,504.1,504.1,393,504.1,256z"
                                />
                                <path
                                  fill="#FFF"
                                  d="M285,256l72.5-84.2c7.9-9.2,6.9-23-2.3-31c-9.2-7.9-23-6.9-30.9,2.3L256,222.4l-68.2-79.2c-7.9-9.2-21.8-10.2-31-2.3c-9.2,7.9-10.2,21.8-2.3,31L227,256l-72.5,84.2c-7.9,9.2-6.9,23,2.3,31c4.1,3.6,9.2,5.3,14.3,5.3c6.2,0,12.3-2.6,16.6-7.6l68.2-79.2l68.2,79.2c4.3,5,10.5,7.6,16.6,7.6c5.1,0,10.2-1.7,14.3-5.3c9.2-7.9,10.2-21.8,2.3-31L285,256z"
                                />
                              </svg>
                            </div>
                          ))}
                        {/* <p>And this loan scenario is...</p> */}
                        {/* <div className="pro-detail-text new-pro">
                          <h3>FHA 30y 100K 2.000% PMI</h3>
                          <p>And this loan scenario is...</p>
                        </div>
                        <div className="pro-detail-text new-pro">
                          <h3>HP/HR 10-yr 1.4M PMI</h3>
                          <p>And this loan scenario is...</p>
                        </div> */}
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>
                  <div className="border-bottom"></div>
                </Accordion>
                <Accordion>
                  <Card>
                    <Card.Header>
                      <Accordion.Toggle as={Button} variant="link" eventKey="1">
                        <div className="aco-left">
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
                            />
                          </svg>
                          <p>Rate Campaigns</p>
                        </div>
                        <span>
                          <svg
                            onClick={onOpenRateModal}
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <circle cx="10" cy="10" r="10" fill="#70C3FF" />
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M9.38284 13.6452C9.38284 13.986 9.65916 14.2623 10 14.2623C10.3409 14.2623 10.6172 13.986 10.6172 13.6452V10.6172H13.6452C13.986 10.6172 14.2623 10.3408 14.2623 9.99999C14.2623 9.65914 13.986 9.38282 13.6452 9.38282H10.6172V6.35484C10.6172 6.01398 10.3409 5.73767 10 5.73767C9.65916 5.73767 9.38284 6.01399 9.38284 6.35484V9.38282H6.35484C6.01398 9.38282 5.73767 9.65914 5.73767 9.99999C5.73767 10.3408 6.01399 10.6172 6.35484 10.6172H9.38284V13.6452Z"
                              fill="white"
                            />
                          </svg>
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
                        </span>
                      </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="1">
                      <Card.Body>
                        {contactDetails?.rateCampaings?.map((data, index) => {
                          let RName
                          if(contactDetails && contactDetails?.loanScenarios.length !== 0){
                            RName = contactDetails?.loanScenarios.filter(x => x.id == data.loanScenarioId)
                          }
                          return(
                          <div onClick={() => showRateCampain(data.id)} className="pro-detail-text new-pro" key={index}>
                            <h3>
                              {RName[0].scenarioName}
                            </h3>
                            <svg
                              onClick={() => deleteRateCampaign(data.id)}
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 512 512"
                              width="20.5"
                              height="25"
                            >
                              <path
                                fill="#ff6767"
                                d="M504.1,256C504.1,119,393,7.9,256,7.9C119,7.9,7.9,119,7.9,256C7.9,393,119,504.1,256,504.1C393,504.1,504.1,393,504.1,256z"
                              />
                              <path
                                fill="#FFF"
                                d="M285,256l72.5-84.2c7.9-9.2,6.9-23-2.3-31c-9.2-7.9-23-6.9-30.9,2.3L256,222.4l-68.2-79.2c-7.9-9.2-21.8-10.2-31-2.3c-9.2,7.9-10.2,21.8-2.3,31L227,256l-72.5,84.2c-7.9,9.2-6.9,23,2.3,31c4.1,3.6,9.2,5.3,14.3,5.3c6.2,0,12.3-2.6,16.6-7.6l68.2-79.2l68.2,79.2c4.3,5,10.5,7.6,16.6,7.6c5.1,0,10.2-1.7,14.3-5.3c9.2-7.9,10.2-21.8,2.3-31L285,256z"
                              />
                            </svg>
                          </div>
                        )})}
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>
                  <div className="border-bottom"></div>
                </Accordion>
                <Accordion>
                  <Card>
                    <Card.Header>
                      <Accordion.Toggle as={Button} variant="link" eventKey="2">
                        <div className="aco-left">
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
                            />
                          </svg>
                          <p>Borrower Apps</p>
                        </div>
                        <span>
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <circle cx="10" cy="10" r="10" fill="#70C3FF" />
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M9.38284 13.6452C9.38284 13.986 9.65916 14.2623 10 14.2623C10.3409 14.2623 10.6172 13.986 10.6172 13.6452V10.6172H13.6452C13.986 10.6172 14.2623 10.3408 14.2623 9.99999C14.2623 9.65914 13.986 9.38282 13.6452 9.38282H10.6172V6.35484C10.6172 6.01398 10.3409 5.73767 10 5.73767C9.65916 5.73767 9.38284 6.01399 9.38284 6.35484V9.38282H6.35484C6.01398 9.38282 5.73767 9.65914 5.73767 9.99999C5.73767 10.3408 6.01399 10.6172 6.35484 10.6172H9.38284V13.6452Z"
                              fill="white"
                            />
                          </svg>
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
                        </span>
                      </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="2">
                      <Card.Body>
                        {contactDetails?.scenarioCompare?.map((data, index) => {
                          return (
                            <div className="pro-detail-text new-pro" key={index}>
                              <h3>{data.displayName}</h3>
                            </div>
                          )
                        })}
                        {contactDetails?.preApprovalTool?.map((data, index) => {
                            return(
                              <div className="pro-detail-text new-pro" key={index}>
                              <h3>{data.displayName}</h3>
                            </div>
                            )
                          })}
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>
                  {/* <div className="border-bottom"></div> */}
                </Accordion>
              </div>
            </div>
          </div>
          {isRateCampaign ? (
            <RateCampaign loanScenario={loanScenario} RateId={idToRatePage} />
          ) : (
            <div className="stone">
              <div className="stone-sec">
                <div className="stone-text">
                  <h1>{loanScenario.scenarioName}</h1>
                  <span className="updated-date">
                    Last Updated
                    <br />
                    {new Date(loanScenario.dateUpdated).toLocaleDateString(
                      "en-US"
                    )}
                  </span>
                </div>
                <div className="rate-sec">
                  <div className="rate-box">
                    <div className="rate-text">
                      <p>Interest Rate</p>
                      <h1>
                        {loanScenario.interestRate}
                        <svg
                          width="40"
                          height="34"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M0.232178 3.23432C0.232178 2.36937 0.480901 1.6922 0.978346 1.20282C1.4871 0.71344 2.13717 0.46875 2.92856 0.46875C3.71995 0.46875 4.36437 0.71344 4.86181 1.20282C5.37056 1.6922 5.62494 2.36937 5.62494 3.23432C5.62494 4.11066 5.37056 4.79351 4.86181 5.28289C4.36437 5.77227 3.71995 6.01696 2.92856 6.01696C2.13717 6.01696 1.4871 5.77227 0.978346 5.28289C0.480901 4.79351 0.232178 4.11066 0.232178 3.23432ZM11.1195 0.673607L4.45481 12.6236H2.14847L8.79616 0.673607H11.1195ZM2.9116 1.90275C2.28979 1.90275 1.97889 2.34661 1.97889 3.23432C1.97889 4.13342 2.28979 4.58296 2.9116 4.58296C3.21685 4.58296 3.45427 4.47485 3.62385 4.25861C3.79344 4.03099 3.87823 3.68956 3.87823 3.23432C3.87823 2.34661 3.55602 1.90275 2.9116 1.90275ZM7.6769 10.0458C7.6769 9.16949 7.92563 8.49232 8.42307 8.01432C8.93182 7.52494 9.58189 7.28025 10.3733 7.28025C11.1647 7.28025 11.8034 7.52494 12.2896 8.01432C12.787 8.49232 13.0357 9.16949 13.0357 10.0458C13.0357 10.9222 12.787 11.605 12.2896 12.0944C11.8034 12.5838 11.1647 12.8285 10.3733 12.8285C9.57059 12.8285 8.92052 12.5838 8.42307 12.0944C7.92563 11.605 7.6769 10.9222 7.6769 10.0458ZM10.3563 8.71425C9.71191 8.71425 9.3897 9.15811 9.3897 10.0458C9.3897 10.9449 9.71191 11.3945 10.3563 11.3945C10.9894 11.3945 11.306 10.9449 11.306 10.0458C11.306 9.15811 10.9894 8.71425 10.3563 8.71425Z"
                            fill="#2CC14E"
                          />
                        </svg>
                      </h1>
                    </div>
                  </div>
                  <div className="rate-box">
                    <div className="rate-text">
                      <p>Upfront Costs</p>
                      <h1>
                        <svg
                          width="40"
                          height="40"
                          viewBox="0 0 3 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M8.53571 10.2507C8.53571 10.8224 8.38875 11.3597 8.09482 11.8628C7.81265 12.3659 7.38939 12.7889 6.82504 13.1319C6.27246 13.4749 5.61405 13.6807 4.84984 13.7493V15.1384H3.70351V13.7493C2.59834 13.6464 1.70479 13.3091 1.02287 12.7375C0.340958 12.1658 0 11.4112 0 10.4737H2.15156C2.18684 10.9196 2.3338 11.2912 2.59246 11.5884C2.85112 11.8742 3.22147 12.0572 3.70351 12.1372V8.36425C2.91578 8.16988 2.27501 7.97552 1.78121 7.78115C1.28741 7.57535 0.864153 7.25522 0.511437 6.82076C0.170479 6.3863 0 5.79177 0 5.03718C0 4.08822 0.340958 3.30505 1.02287 2.68765C1.70479 2.05883 2.59834 1.69296 3.70351 1.59006V0.200928H4.84984V1.59006C5.88447 1.68153 6.71335 2.00166 7.33648 2.55045C7.97137 3.08782 8.32996 3.83097 8.41226 4.77993H6.2607C6.22543 4.4255 6.08434 4.11109 5.83744 3.83669C5.59054 3.55086 5.26134 3.3565 4.84984 3.2536V6.95796C5.63757 7.14089 6.27833 7.33526 6.77214 7.54105C7.26594 7.73542 7.68332 8.04983 8.02428 8.48429C8.36523 8.90732 8.53571 9.49613 8.53571 10.2507ZM2.04575 4.93428C2.04575 5.40304 2.18684 5.76891 2.46901 6.03187C2.76294 6.29483 3.17444 6.50635 3.70351 6.66641V3.20215C3.19795 3.25931 2.79233 3.43653 2.48664 3.73379C2.19271 4.03106 2.04575 4.43122 2.04575 4.93428ZM4.84984 12.1372C5.36715 12.0572 5.77278 11.8571 6.06671 11.537C6.36064 11.2054 6.5076 10.811 6.5076 10.3536C6.5076 9.8963 6.36064 9.54187 6.06671 9.29034C5.78453 9.02737 5.37891 8.81586 4.84984 8.65579V12.1372Z"
                            fill="#2CC14E"
                          />
                        </svg>
                        {numberWithCommas(Math.round(blockA))}
                      </h1>
                    </div>
                  </div>
                  <div className="rate-box">
                    <div className="rate-text">
                      <p>Monthly Payment</p>
                      <h1>
                        <svg
                          width="40"
                          height="40"
                          viewBox="0 0 3 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M8.53571 10.2507C8.53571 10.8224 8.38875 11.3597 8.09482 11.8628C7.81265 12.3659 7.38939 12.7889 6.82504 13.1319C6.27246 13.4749 5.61405 13.6807 4.84984 13.7493V15.1384H3.70351V13.7493C2.59834 13.6464 1.70479 13.3091 1.02287 12.7375C0.340958 12.1658 0 11.4112 0 10.4737H2.15156C2.18684 10.9196 2.3338 11.2912 2.59246 11.5884C2.85112 11.8742 3.22147 12.0572 3.70351 12.1372V8.36425C2.91578 8.16988 2.27501 7.97552 1.78121 7.78115C1.28741 7.57535 0.864153 7.25522 0.511437 6.82076C0.170479 6.3863 0 5.79177 0 5.03718C0 4.08822 0.340958 3.30505 1.02287 2.68765C1.70479 2.05883 2.59834 1.69296 3.70351 1.59006V0.200928H4.84984V1.59006C5.88447 1.68153 6.71335 2.00166 7.33648 2.55045C7.97137 3.08782 8.32996 3.83097 8.41226 4.77993H6.2607C6.22543 4.4255 6.08434 4.11109 5.83744 3.83669C5.59054 3.55086 5.26134 3.3565 4.84984 3.2536V6.95796C5.63757 7.14089 6.27833 7.33526 6.77214 7.54105C7.26594 7.73542 7.68332 8.04983 8.02428 8.48429C8.36523 8.90732 8.53571 9.49613 8.53571 10.2507ZM2.04575 4.93428C2.04575 5.40304 2.18684 5.76891 2.46901 6.03187C2.76294 6.29483 3.17444 6.50635 3.70351 6.66641V3.20215C3.19795 3.25931 2.79233 3.43653 2.48664 3.73379C2.19271 4.03106 2.04575 4.43122 2.04575 4.93428ZM4.84984 12.1372C5.36715 12.0572 5.77278 11.8571 6.06671 11.537C6.36064 11.2054 6.5076 10.811 6.5076 10.3536C6.5076 9.8963 6.36064 9.54187 6.06671 9.29034C5.78453 9.02737 5.37891 8.81586 4.84984 8.65579V12.1372Z"
                            fill="#2CC14E"
                          />
                        </svg>
                        {isNaN(numberWithCommas(Math.round(principalInterest)))
                          ? 0
                          : numberWithCommas(Math.round(principalInterest))}
                      </h1>
                    </div>
                  </div>
                  <div className="rate-box">
                    <div className="rate-text">
                      <p>Cash to Close</p>
                      <h1>
                        <svg
                          width="40"
                          height="40"
                          viewBox="0 0 3 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M8.53571 10.2507C8.53571 10.8224 8.38875 11.3597 8.09482 11.8628C7.81265 12.3659 7.38939 12.7889 6.82504 13.1319C6.27246 13.4749 5.61405 13.6807 4.84984 13.7493V15.1384H3.70351V13.7493C2.59834 13.6464 1.70479 13.3091 1.02287 12.7375C0.340958 12.1658 0 11.4112 0 10.4737H2.15156C2.18684 10.9196 2.3338 11.2912 2.59246 11.5884C2.85112 11.8742 3.22147 12.0572 3.70351 12.1372V8.36425C2.91578 8.16988 2.27501 7.97552 1.78121 7.78115C1.28741 7.57535 0.864153 7.25522 0.511437 6.82076C0.170479 6.3863 0 5.79177 0 5.03718C0 4.08822 0.340958 3.30505 1.02287 2.68765C1.70479 2.05883 2.59834 1.69296 3.70351 1.59006V0.200928H4.84984V1.59006C5.88447 1.68153 6.71335 2.00166 7.33648 2.55045C7.97137 3.08782 8.32996 3.83097 8.41226 4.77993H6.2607C6.22543 4.4255 6.08434 4.11109 5.83744 3.83669C5.59054 3.55086 5.26134 3.3565 4.84984 3.2536V6.95796C5.63757 7.14089 6.27833 7.33526 6.77214 7.54105C7.26594 7.73542 7.68332 8.04983 8.02428 8.48429C8.36523 8.90732 8.53571 9.49613 8.53571 10.2507ZM2.04575 4.93428C2.04575 5.40304 2.18684 5.76891 2.46901 6.03187C2.76294 6.29483 3.17444 6.50635 3.70351 6.66641V3.20215C3.19795 3.25931 2.79233 3.43653 2.48664 3.73379C2.19271 4.03106 2.04575 4.43122 2.04575 4.93428ZM4.84984 12.1372C5.36715 12.0572 5.77278 11.8571 6.06671 11.537C6.36064 11.2054 6.5076 10.811 6.5076 10.3536C6.5076 9.8963 6.36064 9.54187 6.06671 9.29034C5.78453 9.02737 5.37891 8.81586 4.84984 8.65579V12.1372Z"
                            fill="#2CC14E"
                          />
                        </svg>
                        {/* {numberWithCommas(Math.round(estimatedCashToClose))} */}
                        {Math.sign(estimatedCashToClose) === -1
                          ? "(" +
                            numberWithCommas(
                              Math.abs(Math.round(estimatedCashToClose))
                            ) +
                            ")"
                          : numberWithCommas(Math.round(estimatedCashToClose))}
                      </h1>
                    </div>
                  </div>
                </div>
                <div className="stone-btn">
                  <div className="st-btn">
                    <button onClick={onOpenRepriceModal}>Price Loan</button>
                    <Modal
                      open={openRepriceModal}
                      onClose={onCloseRepriceModal}
                    >
                      <div className="iframe-modal">
                        <ModalBody>
                          <iframe
                            src={link}
                            style={{ width: "100%", height: "610px" }}
                          />
                        </ModalBody>
                      </div>
                    </Modal>
                  </div>
                  <div className="st-btn">
                    <button>Title & Taxes</button>
                  </div>
                  <div className="st-btn">
                    <button
                      className="btn-create-pdf"
                      disabled={isLoading}
                      onClick={exportPDFWithMethod}
                      style={{ display: "flex" }}
                    >
                      <span>Scenario PDF</span>
                      {isLoading === true ? (
                        <Loader
                          type="Grid"
                          color="#FFFFFF"
                          height="25"
                          width="25"
                        />
                      ) : null}
                    </button>
                  </div>
                  <div className="st-btn">
                    <button
                      className="btn-create-pdf"
                      disabled={isLoadingPreQualPDF}
                      onClick={exportPreQualPDF}
                      style={{ display: "flex" }}
                    >
                      <span>Pre-Qual PDF</span>
                      {isLoadingPreQualPDF === true ? (
                        <Loader
                          type="Grid"
                          color="#FFFFFF"
                          height="25"
                          width="25"
                        />
                      ) : null}
                    </button>
                  </div>
                </div>
              </div>
              <div className="two-btn">
                <Tabs
                  defaultActiveKey="Loan Scenario"
                  id="uncontrolled-tab-example"
                >
                  <Tab eventKey="Loan Scenario" title="Loan Scenario">
                    <div className="price-tab second-tab">
                      <div className="price-box">
                        <div className="price-text">
                          <ul>
                            <li className="head-price">
                              <p>Loan Terms</p>
                            </li>

                            <li>
                              <p>Base Loan Amount ($)</p>
                              <div className="w100">
                                <EdiText
                                  viewContainerClassName="view-wrapper"
                                  type="text"
                                  value={loanScenario?.baseLoanAmount?loanScenario?.baseLoanAmount:"N/A"}
                                  tabIndex={1}
                                  onSave={(pass) => {
                                    handleSave(pass, "baseLoanAmount");
                                  }}
                                  submitOnUnfocus
                                  startEditingOnFocus
                                />
                              </div>
                            </li>
                            <li>
                              <p>LTV/CLTV (%)</p>
                              <span>{isNaN(LTV_CLTV) ? 0 : LTV_CLTV}</span>
                            </li>
                            <li>
                              <p>Total Loan Amount ($)</p>
                              <span>
                                {numberWithCommas(Math.round(totalLoanAmount))}
                              </span>
                            </li>
                            <li>
                              <p>Loan Product</p>
                              {isEqual === "loanProduct" ? (
                                <div className="dropdown-main">
                                  <div id="wrap">
                                    <Dropdown
                                      className="cust-select"
                                      options={loanProductOptions}
                                      onChange={onSelect}
                                      value={loanScenario.loanProduct}
                                      placeholder="Select an option"
                                    />
                                    <div className="btn-div">
                                      <button
                                        className="right-arrow icon-btn"
                                        onClick={() =>
                                          handleSave(
                                            selectedValue,
                                            "loanProduct"
                                          )
                                        }
                                      >
                                        &#10003;
                                      </button>
                                      <button
                                        className="cross-arrow icon-btn"
                                        onClick={() => onClick("", "")}
                                      >
                                        &#10005;
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              ) : (
                                <div
                                  className="main-div w100"
                                  onClick={() =>
                                    onClick(
                                      "loanProduct",
                                      loanScenario.loanProduct
                                    )
                                  }
                                >
                                  <div>
                                    <span>{loanScenario.loanProduct}</span>
                                    <button className="edit-arrow1 icon-btn1">
                                      &#9998;
                                    </button>
                                  </div>
                                </div>
                              )}
                            </li>

                            <li>
                              <p>Loan Type</p>
                              {isEqual === "loanType" ? (
                                <div className="dropdown-main">
                                  <div id="wrap">
                                    <Dropdown
                                      className="cust-select"
                                      options={loanTypeOptions}
                                      onChange={onSelect}
                                      value={loanScenario.loanType}
                                      placeholder="Select an option"
                                    />
                                    <div className="btn-div">
                                      <button
                                        className="right-arrow icon-btn"
                                        onClick={() =>
                                          handleSave(selectedValue, "loanType")
                                        }
                                      >
                                        &#10003;
                                      </button>
                                      <button
                                        className="cross-arrow icon-btn"
                                        onClick={() => onClick("", "")}
                                      >
                                        &#10005;
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              ) : (
                                <div
                                  className="main-div w100"
                                  onClick={() =>
                                    onClick("loanType", loanScenario.loanType)
                                  }
                                >
                                  <div>
                                    <span>{loanScenario?.loanType?loanScenario?.loanType:"N/A"}</span>
                                    <button className="edit-arrow1 icon-btn1">
                                      &#9998;
                                    </button>
                                  </div>
                                </div>
                              )}
                            </li>
                            <li>
                              <p>Special Program</p>
                              {isEqual === "loanTypeSpecial" ? (
                                <div className="dropdown-main">
                                  <div id="wrap">
                                    <Dropdown
                                      className="cust-select"
                                      options={loanTypeSpecialOptions}
                                      onChange={onSelect}
                                      value={loanScenario.loanTypeSpecial}
                                      placeholder="Select an option"
                                    />
                                    <div className="btn-div">
                                      <button
                                        className="right-arrow icon-btn"
                                        onClick={() =>
                                          handleSave(
                                            selectedValue,
                                            "loanTypeSpecial"
                                          )
                                        }
                                      >
                                        &#10003;
                                      </button>
                                      <button
                                        className="cross-arrow icon-btn"
                                        onClick={() => onClick("", "")}
                                      >
                                        &#10005;
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              ) : (
                                <div
                                  className="main-div w100"
                                  onClick={() =>
                                    onClick(
                                      "loanTypeSpecial",
                                      loanScenario.loanTypeSpecial
                                    )
                                  }
                                >
                                  <div>
                                    <span>
                                      { loanScenario?.loanTypeSpecial? loanScenario?.loanTypeSpecial === "null" ? "N/A" : loanScenario?.loanTypeSpecial : "N/A"}
                                    </span>
                                    <button className="edit-arrow1 icon-btn1">
                                      &#9998;
                                    </button>
                                  </div>
                                </div>
                              )}
                            </li>

                            <li>
                              <p>Interest Rate (%)</p>
                              <div className="w100">
                                <EdiText
                                  viewContainerClassName="view-wrapper"
                                  type="text"
                                  value={loanScenario?.interestRate?loanScenario?.interestRate:"N/A"}
                                  tabIndex={3}
                                  onSave={(pass) => {
                                    handleSave(pass, "interestRate");
                                  }}
                                  submitOnUnfocus
                                  startEditingOnFocus
                                />
                              </div>
                            </li>

                            <li>
                              <p>Lock Period</p>
                              {isEqual === "lockPeriod" ? (
                                <div className="dropdown-main">
                                  <div id="wrap">
                                    <Dropdown
                                      className="cust-select"
                                      options={lockPeriodOptions}
                                      onChange={onSelect}
                                      value={loanScenario.lockPeriod}
                                      placeholder="Select an option"
                                    />
                                    <div className="btn-div">
                                      <button
                                        className="right-arrow icon-btn"
                                        onClick={() =>
                                          handleSave(
                                            selectedValue,
                                            "lockPeriod"
                                          )
                                        }
                                      >
                                        &#10003;
                                      </button>
                                      <button
                                        className="cross-arrow icon-btn"
                                        onClick={() => onClick("", "")}
                                      >
                                        &#10005;
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              ) : (
                                <div
                                  className="main-div w100"
                                  onClick={() =>
                                    onClick(
                                      "lockPeriod",
                                      loanScenario.lockPeriod
                                    )
                                  }
                                >
                                  <div>
                                    <span>{loanScenario?.lockPeriod?loanScenario?.lockPeriod:"N/A" }</span>
                                    <button className="edit-arrow1 icon-btn1">
                                      &#9998;
                                    </button>
                                  </div>
                                </div>
                              )}
                            </li>

                            <li>
                              <p>Loan Price</p>
                              <div className="w100">
                                <EdiText
                                  viewContainerClassName="view-wrapper"
                                  type="text"
                                  value={loanScenario?.loanPrice? loanScenario?.loanPrice:"N/A"}
                                  tabIndex={4}
                                  onSave={(pass) => {
                                    handleSave(pass, "loanPrice");
                                  }}
                                  submitOnUnfocus
                                  startEditingOnFocus
                                />
                              </div>
                            </li>
                            <li>
                              <p>Lender Credit ($)</p>
                              <div className="w100">
                                <EdiText
                                  viewContainerClassName="view-wrapper"
                                  type="text"
                                  value={loanScenario?.lenderCredit?loanScenario?.lenderCredit:"N/A"}
                                  tabIndex={5}
                                  onSave={(pass) => {
                                    handleSave(pass, "lenderCredit");
                                  }}
                                  submitOnUnfocus
                                  startEditingOnFocus
                                />
                              </div>
                            </li>
                          </ul>
                        </div>

                        <div className="price-text">
                          <ul>
                            <li className="head-price">
                              <p>Gov. Funding Fee or Mortgage</p>
                            </li>
                            <li>
                              <p>Government Funding Fee ($)</p>
                              <div className="w100">
                                <EdiText
                                  viewContainerClassName="view-wrapper"
                                  type="text"
                                  value={
                                    loanScenario?.governmentFundingFeePercent?loanScenario?.governmentFundingFeePercent:"N/A"
                                  }
                                  tabIndex={6}
                                  onSave={(pass) => {
                                    handleSave(
                                      pass,
                                      "governmentFundingFeePercent"
                                    );
                                  }}
                                  submitOnUnfocus
                                  startEditingOnFocus
                                />
                              </div>
                            </li>
                            <li>
                              <p>Finance Funding Fee/MI</p>
                              <span>
                                <label className="lab-check">
                                  <input
                                    type="checkbox"
                                    checked={
                                      loanScenario.isFinancedFundingFeeMI
                                    }
                                    onChange={(pass) => {
                                      if (pass.target.checked) {
                                        handleSave(1, "isFinancedFundingFeeMI");
                                      } else {
                                        handleSave(0, "isFinancedFundingFeeMI");
                                      }
                                    }}
                                  />
                                  <span className="checkmark"></span>
                                </label>
                              </span>
                            </li>
                            <li>
                              <p>Mortgage Insurance Rate (%)</p>
                              <div className="w100">
                                <EdiText
                                  viewContainerClassName="view-wrapper"
                                  type="text"
                                  value={
                                    loanScenario?.annualMortgageInsuranceRate?loanScenario?.annualMortgageInsuranceRate:"N/A"
                                  }
                                  tabIndex={7}
                                  onSave={(pass) => {
                                    handleSave(
                                      pass,
                                      "annualMortgageInsuranceRate"
                                    );
                                  }}
                                  submitOnUnfocus
                                  startEditingOnFocus
                                />
                              </div>
                            </li>
                            <li>
                              <p>Premium Type</p>
                              {isEqual === "mortgageInsurancePremiumType" ? (
                                <div className="dropdown-main">
                                  <div id="wrap">
                                    <Dropdown
                                      className="cust-select"
                                      options={
                                        mortgageInsurancePremiumTypeOptions
                                      }
                                      onChange={onSelect}
                                      value={
                                        loanScenario.mortgageInsurancePremiumType
                                      }
                                      placeholder="Select an option"
                                    />
                                    <div className="btn-div">
                                      <button
                                        className="right-arrow icon-btn"
                                        onClick={() =>
                                          handleSave(
                                            selectedValue,
                                            "mortgageInsurancePremiumType"
                                          )
                                        }
                                      >
                                        &#10003;
                                      </button>
                                      <button
                                        className="cross-arrow icon-btn"
                                        onClick={() => onClick("", "")}
                                      >
                                        &#10005;
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              ) : (
                                <div
                                  className="main-div w100"
                                  onClick={() =>
                                    onClick(
                                      "mortgageInsurancePremiumType",
                                      loanScenario.mortgageInsurancePremiumType
                                    )
                                  }
                                >
                                  <div>
                                    <span>
                                      {
                                      loanScenario?.mortgageInsurancePremiumType ?  loanScenario?.mortgageInsurancePremiumType === "null" ? "N/A" : loanScenario?.mortgageInsurancePremiumType : "N/A"
                                    }
                                    </span>
                                    <button className="edit-arrow1 icon-btn1">
                                      &#9998;
                                    </button>
                                  </div>
                                </div>
                              )}
                            </li>
                          </ul>
                        </div>
                        <div className="price-text">
                          <ul>
                            <li className="head-price">
                              <p>Mortgage Insurance Rate</p>
                            </li>
                            <li>
                              <p>Second Mortgage Request </p>
                              {isEqual === "secondMortgageRequest" ? (
                                <div className="dropdown-main">
                                  <div id="wrap">
                                    <Dropdown
                                      className="cust-select"
                                      options={secondMortgageRequestOptions}
                                      onChange={onSelect}
                                      value={loanScenario.secondMortgageRequest}
                                      placeholder="Select an option"
                                    />
                                    <div className="btn-div">
                                      <button
                                        className="right-arrow icon-btn"
                                        onClick={() =>
                                          handleSave(
                                            selectedValue,
                                            "secondMortgageRequest"
                                          )
                                        }
                                      >
                                        &#10003;
                                      </button>
                                      <button
                                        className="cross-arrow icon-btn"
                                        onClick={() => onClick("", "")}
                                      >
                                        &#10005;
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              ) : (
                                <div
                                  className="main-div w100"
                                  onClick={() =>
                                    onClick(
                                      "secondMortgageRequest",
                                      loanScenario.secondMortgageRequest
                                    )
                                  }
                                >
                                  <div>
                                    <span>
                                      {loanScenario?.secondMortgageRequest ?  loanScenario?.secondMortgageRequest === "null" ? "N/A" : loanScenario?.secondMortgageRequest : "N/A"}
                                    </span>
                                    <button className="edit-arrow1 icon-btn1">
                                      &#9998;
                                    </button>
                                  </div>
                                </div>
                              )}
                            </li>
                            <li>
                              <p>Second Mortgage Balance ($)</p>
                              <div className="w100">
                                <EdiText
                                  viewContainerClassName="view-wrapper"
                                  type="text"
                                  value={loanScenario?.secondMortgageBalance?loanScenario?.secondMortgageBalance:"N/A"}
                                  tabIndex={8}
                                  onSave={(pass) => {
                                    handleSave(pass, "secondMortgageBalance");
                                  }}
                                  submitOnUnfocus
                                  startEditingOnFocus
                                />
                              </div>
                            </li>
                            <li>
                              <p>Payoff Second Mortgage</p>
                              <span>
                                <label className="lab-check">
                                  <input
                                    type="checkbox"
                                    checked={
                                      loanScenario.isPayingOffSecondMortgage
                                    }
                                    onChange={(pass) => {
                                      if (pass.target.checked) {
                                        handleSave(
                                          1,
                                          "isPayingOffSecondMortgage"
                                        );
                                      } else {
                                        handleSave(
                                          0,
                                          "isPayingOffSecondMortgage"
                                        );
                                      }
                                    }}
                                  />
                                  <span className="checkmark"></span>
                                </label>
                              </span>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="price-box pb-1">
                        <div className="price-text">
                          <ul>
                            <li className="head-price">
                              <p>Borrower Request and Profile</p>
                            </li>
                            <li>
                              <p>Loan Purpose</p>
                              {isEqual === "loanPurpose" ? (
                                <div className="dropdown-main">
                                  <div id="wrap">
                                    <Dropdown
                                      className="cust-select"
                                      options={loanPurposeOptions}
                                      onChange={onSelect}
                                      value={loanScenario.loanPurpose}
                                      placeholder="Select an option"
                                    />
                                    <div className="btn-div">
                                      <button
                                        className="right-arrow icon-btn"
                                        onClick={() =>
                                          handleSave(
                                            selectedValue,
                                            "loanPurpose"
                                          )
                                        }
                                      >
                                        &#10003;
                                      </button>
                                      <button
                                        className="cross-arrow icon-btn"
                                        onClick={() => onClick("", "")}
                                      >
                                        &#10005;
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              ) : (
                                <div
                                  className="main-div w100"
                                  onClick={() =>
                                    onClick(
                                      "loanPurpose",
                                      loanScenario.loanPurpose
                                    )
                                  }
                                >
                                  <div>
                                    <span>{loanScenario?.loanPurpose?loanScenario?.loanPurpose:"N/A"}</span>
                                    <button className="edit-arrow1 icon-btn1">
                                      &#9998;
                                    </button>
                                  </div>
                                </div>
                              )}
                            </li>
                            <li>
                              <p>Cashout Refinance</p>
                              <span>
                                <label className="lab-check">
                                  <input
                                    type="checkbox"
                                    checked={loanScenario.isCashout}
                                    onChange={(pass) => {
                                      if (pass.target.checked) {
                                        handleSave(1, "isCashout");
                                      } else {
                                        handleSave(0, "isCashout");
                                      }
                                    }}
                                  />
                                  <span className="checkmark"></span>
                                </label>
                              </span>
                            </li>
                            <li>
                              <p>Occupancy</p>
                              {isEqual === "occupancy" ? (
                                <div className="dropdown-main">
                                  <div id="wrap">
                                    <Dropdown
                                      className="cust-select"
                                      options={occupancyOptions}
                                      onChange={onSelect}
                                      value={loanScenario.occupancy}
                                      placeholder="Select an option"
                                    />
                                    <div className="btn-div">
                                      <button
                                        className="right-arrow icon-btn"
                                        onClick={() =>
                                          handleSave(selectedValue, "occupancy")
                                        }
                                      >
                                        &#10003;
                                      </button>
                                      <button
                                        className="cross-arrow icon-btn"
                                        onClick={() => onClick("", "")}
                                      >
                                        &#10005;
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              ) : (
                                <div
                                  className="main-div w100"
                                  onClick={() =>
                                    onClick("occupancy", loanScenario.occupancy)
                                  }
                                >
                                  <div>
                                    <span>{loanScenario?.occupancy?loanScenario?.occupancy:"N/A"}</span>

                                    <button className="edit-arrow1 icon-btn1">
                                      &#9998;
                                    </button>
                                  </div>
                                </div>
                              )}
                            </li>

                            <li>
                              <p>Current Loan Balance ($)</p>
                              <div className="w100">
                                <EdiText
                                  viewContainerClassName="view-wrapper"
                                  type="text"
                                  value={loanScenario?.currentLoanBalance?loanScenario?.currentLoanBalance:"N/A"}
                                  tabIndex={9}
                                  onSave={(pass) => {
                                    handleSave(pass, "currentLoanBalance");
                                  }}
                                  submitOnUnfocus
                                  startEditingOnFocus
                                />
                              </div>
                            </li>
                            <li>
                              <p>Cashout Request ($)</p>
                              <div className="w100">
                                <EdiText
                                  viewContainerClassName="view-wrapper"
                                  type="text"
                                  value={loanScenario?.cashoutRequest?loanScenario?.cashoutRequest:"N/A"}
                                  tabIndex={10}
                                  onSave={(pass) => {
                                    handleSave(pass, "cashoutRequest");
                                  }}
                                  submitOnUnfocus
                                  startEditingOnFocus
                                />
                              </div>
                            </li>
                            <li>
                              <p>Waives Tax Escrows</p>
                              <span>
                                <label className="lab-check">
                                  <input
                                    type="checkbox"
                                    checked={loanScenario.isTaxEscrowsWaived}
                                    onChange={(pass) => {
                                      if (pass.target.checked) {
                                        handleSave(1, "isTaxEscrowsWaived");
                                      } else {
                                        handleSave(0, "isTaxEscrowsWaived");
                                      }
                                    }}
                                  />
                                  <span className="checkmark"></span>
                                </label>
                              </span>
                            </li>
                            <li>
                              <p>Waives Insurance Escrows</p>
                              <span>
                                <label className="lab-check">
                                  <input
                                    type="checkbox"
                                    checked={
                                      loanScenario.isInsuranceEscrowsWaived
                                    }
                                    onChange={(pass) => {
                                      if (pass.target.checked) {
                                        handleSave(
                                          1,
                                          "isInsuranceEscrowsWaived"
                                        );
                                      } else {
                                        handleSave(
                                          0,
                                          "isInsuranceEscrowsWaived"
                                        );
                                      }
                                    }}
                                  />
                                  <span className="checkmark"></span>
                                </label>
                              </span>
                            </li>
                            <li>
                              <p>Credit Score</p>
                              <div className="w100">
                                <EdiText
                                  viewContainerClassName="view-wrapper"
                                  type="text"
                                  value={loanScenario?.creditScore?loanScenario?.creditScore:"N/A"}
                                  tabIndex={11}
                                  onSave={(pass) => {
                                    handleSave(pass, "creditScore");
                                  }}
                                  submitOnUnfocus
                                  startEditingOnFocus
                                />
                              </div>
                            </li>
                            <li>
                              <p>Annual Income ($)</p>
                              <div className="w100">
                                <EdiText
                                  viewContainerClassName="view-wrapper"
                                  type="text"
                                  value={loanScenario?.annualIncome?loanScenario?.annualIncome:"N/A"}
                                  tabIndex={11}
                                  onSave={(pass) => {
                                    handleSave(pass, "annualIncome");
                                  }}
                                  submitOnUnfocus
                                  startEditingOnFocus
                                />
                              </div>
                            </li>

                            <li>
                              <p>Current Loan Type</p>
                              {isEqual === "currentLoanType" ? (
                                <div className="dropdown-main">
                                  <div id="wrap">
                                    <Dropdown
                                      className="cust-select"
                                      options={currentLoanTypeOptions}
                                      onChange={onSelect}
                                      value={loanScenario.currentLoanType}
                                      placeholder="Select an option"
                                    />
                                    <div className="btn-div">
                                      <button
                                        className="right-arrow icon-btn"
                                        onClick={() =>
                                          handleSave(
                                            selectedValue,
                                            "currentLoanType"
                                          )
                                        }
                                      >
                                        &#10003;
                                      </button>
                                      <button
                                        className="cross-arrow icon-btn"
                                        onClick={() => onClick("", "")}
                                      >
                                        &#10005;
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              ) : (
                                <div
                                  className="main-div w100"
                                  onClick={() =>
                                    onClick(
                                      "currentLoanType",
                                      loanScenario.currentLoanType
                                    )
                                  }
                                >
                                  <div>
                                    <span>{loanScenario?.currentLoanType?loanScenario?.currentLoanType:"N/A"}</span>
                                    <button className="edit-arrow1 icon-btn1">
                                      &#9998;
                                    </button>
                                  </div>
                                </div>
                              )}
                            </li>
                            <li>
                              <p>First Time Home Buyer</p>
                              <span>
                                <label className="lab-check">
                                  <input
                                    type="checkbox"
                                    checked={loanScenario.isFirstTimeHomeBuyer}
                                    onChange={(pass) => {
                                      if (pass.target.checked) {
                                        handleSave(1, "isFirstTimeHomeBuyer");
                                      } else {
                                        handleSave(0, "isFirstTimeHomeBuyer");
                                      }
                                    }}
                                  />
                                  <span className="checkmark"></span>
                                </label>
                              </span>
                            </li>
                            <li>
                              <p>VA Eligible?</p>
                              <span>
                                <label className="lab-check">
                                  <input
                                    type="checkbox"
                                    checked={loanScenario.isVaEligible}
                                    onChange={(pass) => {
                                      if (pass.target.checked) {
                                        handleSave(1, "isVaEligible");
                                      } else {
                                        handleSave(0, "isVaEligible");
                                      }
                                    }}
                                  />
                                  <span className="checkmark"></span>
                                </label>
                              </span>
                            </li>
                            <li>
                              <p>VA Used Before?</p>
                              <span>
                                <label className="lab-check">
                                  <input
                                    type="checkbox"
                                    checked={loanScenario.isVaUsedBefore}
                                    onChange={(pass) => {
                                      if (pass.target.checked) {
                                        handleSave(1, "isVaUsedBefore");
                                      } else {
                                        handleSave(0, "isVaUsedBefore");
                                      }
                                    }}
                                  />
                                  <span className="checkmark"></span>
                                </label>
                              </span>
                            </li>
                            <li>
                              <p>VA Disability?</p>
                              <span>
                                <label className="lab-check">
                                  <input
                                    type="checkbox"
                                    checked={loanScenario.isVaDisability}
                                    onChange={(pass) => {
                                      if (pass.target.checked) {
                                        handleSave(1, "isVaDisability");
                                      } else {
                                        handleSave(0, "isVaDisability");
                                      }
                                    }}
                                  />
                                  <span className="checkmark"></span>
                                </label>
                              </span>
                            </li>
                          </ul>
                        </div>
                        <div className="price-text">
                          <ul>
                            <li className="head-price">
                              <p>Property Details</p>
                            </li>
                            <li>
                              <p>Address</p>
                              <div
                                className="main-div w100"
                                onClick={onOpenModal}
                              >
                                <div>
                                  <span>
                                    {loanScenario.propertyStreet +
                                      ", " +
                                      loanScenario.propertyCity +
                                      ", " +
                                      loanScenario.propertyState +
                                      ", " +
                                      loanScenario.propertyZip}
                                  </span>
                                  <button
                                    // onClick={onOpenModal}
                                    className="edit-arrow1 icon-btn1"
                                  >
                                    {" "}
                                    &#9998;
                                  </button>
                                </div>
                              </div>

                              <Modal open={open} onClose={onCloseModal}>
                                <div className="edit-Address">
                                  <ModalTitle> Edit Address</ModalTitle>
                                  <ModalBody>
                                    <div className="inputBox">
                                      <input
                                        type="text"
                                        name="propertyStreet"
                                        placeholder="propertyStreet"
                                        onChange={handleChange}
                                        value={address.propertyStreet}
                                      />
                                    </div>
                                    <div className="boxDetail">
                                      <div className="inputBox city">
                                        <input
                                          type="text"
                                          name="propertyCity"
                                          placeholder="propertyCity"
                                          onChange={handleChange}
                                          value={address.propertyCity}
                                        />
                                      </div>
                                      <div className="inputBox state">
                                        <Dropdown
                                          className="cust-select"
                                          options={propertyStateOptions}
                                          onChange={(e) =>
                                            setAddress({
                                              ...address,
                                              propertyState: e.value,
                                            })
                                          }
                                          value={address.propertyState}
                                          placeholder="State"
                                        />
                                      </div>
                                      <div className="inputBox pincode">
                                        <input
                                          type="text"
                                          name="propertyZip"
                                          placeholder="propertyZip"
                                          onChange={handleChange}
                                          value={address.propertyZip}
                                        />
                                      </div>
                                    </div>
                                  </ModalBody>
                                  <ModalFooter>
                                    <button
                                      className="cancel"
                                      onClick={onCloseModal}
                                    >
                                      Cancel
                                    </button>

                                    <button
                                      className="save"
                                      onClick={handleSubmit}
                                    >
                                      Save
                                    </button>
                                  </ModalFooter>
                                </div>
                              </Modal>
                            </li>
                            <li>
                              <p>County</p>
                              {isEqual === "propertyCounty" ? (
                                <div className="dropdown-main">
                                  <div id="wrap">
                                    <Dropdown
                                      className="cust-select"
                                      options={propertyCountryOptions}
                                      onChange={onSelect}
                                      value={loanScenario.propertyCounty}
                                      placeholder="Select an option"
                                    />
                                    <div className="btn-div">
                                      <button
                                        className="right-arrow icon-btn"
                                        onClick={() =>
                                          handleSave(
                                            selectedValue,
                                            "propertyCounty"
                                          )
                                        }
                                      >
                                        &#10003;
                                      </button>
                                      <button
                                        className="cross-arrow icon-btn"
                                        onClick={() => onClick("", "")}
                                      >
                                        &#10005;
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              ) : (
                                <div
                                  className="main-div w100"
                                  onClick={() =>
                                    onClick(
                                      "propertyCounty",
                                      loanScenario.propertyCounty
                                    )
                                  }
                                >
                                  <div>
                                    <span>{loanScenario?.propertyCounty?loanScenario?.propertyCounty:"N/A"}</span>
                                    <button className="edit-arrow1 icon-btn1">
                                      &#9998;
                                    </button>
                                  </div>
                                </div>
                              )}
                            </li>
                            <li>
                              <p>Property Type</p>
                              {isEqual === "propertyType" ? (
                                <div className="dropdown-main">
                                  <div id="wrap">
                                    <Dropdown
                                      className="cust-select"
                                      options={propertyTypeOptions}
                                      onChange={onSelect}
                                      value={loanScenario.propertyType}
                                      placeholder="Select an option"
                                    />
                                    <div className="btn-div">
                                      <button
                                        className="right-arrow icon-btn"
                                        onClick={() =>
                                          handleSave(
                                            selectedValue,
                                            "propertyType"
                                          )
                                        }
                                      >
                                        &#10003;
                                      </button>
                                      <button
                                        className="cross-arrow icon-btn"
                                        onClick={() => onClick("", "")}
                                      >
                                        &#10005;
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              ) : (
                                <div
                                  className="main-div w100"
                                  onClick={() =>
                                    onClick(
                                      "propertyType",
                                      loanScenario.propertyType
                                    )
                                  }
                                >
                                  <div>
                                    <span>{loanScenario?.propertyType?loanScenario?.propertyType:"N/A"}</span>
                                    <button className="edit-arrow1 icon-btn1">
                                      &#9998;
                                    </button>
                                  </div>
                                </div>
                              )}
                            </li>
                            <li>
                              <p>House Value ($)</p>
                              <div className="w100">
                                <EdiText
                                  viewContainerClassName="view-wrapper"
                                  type="text"
                                  value={loanScenario?.houseValue?loanScenario?.houseValue:"N/A"}
                                  tabIndex={13}
                                  onSave={(pass) => {
                                    handleSave(pass, "houseValue");
                                  }}
                                  submitOnUnfocus
                                  startEditingOnFocus
                                />
                              </div>
                            </li>
                            <li>
                              <p>Monthly HOA ($)</p>
                              <div className="w100">
                                <EdiText
                                  viewContainerClassName="view-wrapper"
                                  type="text"
                                  value={loanScenario?.monthlyHOA?loanScenario?.monthlyHOA:"N/A"}
                                  tabIndex={14}
                                  onSave={(pass) => {
                                    handleSave(pass, "monthlyHOA");
                                  }}
                                  submitOnUnfocus
                                  startEditingOnFocus
                                />
                              </div>
                            </li>
                            <li>
                              <p>Monthly Property Taxes ($)</p>
                              <div className="w100">
                                <EdiText
                                  viewContainerClassName="view-wrapper"
                                  type="text"
                                  value={loanScenario?.monthlyPropertyTax?loanScenario?.monthlyPropertyTax:"N/A"}
                                  tabIndex={15}
                                  onSave={(pass) => {
                                    handleSave(pass, "monthlyPropertyTax");
                                  }}
                                  submitOnUnfocus
                                  startEditingOnFocus
                                />
                              </div>
                            </li>
                            <li>
                              <p>Monthly HOI ($)</p>
                              <div className="w100">
                                <EdiText
                                  viewContainerClassName="view-wrapper"
                                  type="text"
                                  value={loanScenario?.monthlyHOI?loanScenario?.monthlyHOI:"N/A"}
                                  tabIndex={16}
                                  onSave={(pass) => {
                                    handleSave(pass, "monthlyHOI");
                                  }}
                                  submitOnUnfocus
                                  startEditingOnFocus
                                />
                              </div>
                            </li>
                          </ul>
                        </div>
                        <div className="price-text">
                          <ul>
                            <li className="head-price">
                              <p>Projected Monthly Payment</p>
                            </li>
                            <li>
                              <p>Principal & Interest ($)</p>
                              <span>
                                {isNaN(principalInterest.toFixed(2))
                                  ? 0
                                  : principalInterest.toFixed(2)}
                              </span>
                            </li>
                            <li>
                              <p>Estimated Escrow ($)</p>
                              <span>{estimatedEscrow}</span>
                            </li>
                            <li className="Total">
                              <p>
                                <b>Total Monthly Payment ($)</b>
                              </p>
                              <span className="text-val">
                                <b>
                                  {isNaN(
                                    Math.round(
                                      principalInterest + estimatedEscrow
                                    )
                                  )
                                    ? 0
                                    : Math.round(
                                        principalInterest + estimatedEscrow
                                      )}
                                </b>
                              </span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </Tab>
                  <Tab
                    eventKey="Closing Cost Details"
                    title="Closing Cost Details"
                  >
                    <div className="price-tab">
                      <div className="price-box">
                        <div className="price-text">
                          <ul>
                            <li className="head-price">
                              <p>A. Origination Charges </p>
                              <span>${numberWithCommas(blockA)}</span>
                            </li>
                            <li>
                              <p>Discount Fee </p>
                              <div className="w100">
                                <EdiText
                                  viewContainerClassName="view-wrapper"
                                  type="text"
                                  value={loanScenario?.blockADiscountFee?loanScenario?.blockADiscountFee:"N/A"}
                                  tabIndex={101}
                                  onSave={(pass) => {
                                    handleSave(pass, "blockADiscountFee");
                                  }}
                                  submitOnUnfocus
                                  startEditingOnFocus
                                />
                              </div>
                            </li>
                            <li>
                              <p>Origination Fee</p>
                              <div className="w100">
                                <EdiText
                                  viewContainerClassName="view-wrapper"
                                  type="text"
                                  value={loanScenario?.blockAOriginationFee?loanScenario?.blockAOriginationFee:"N/A"}
                                  tabIndex={102}
                                  onSave={(pass) => {
                                    handleSave(pass, "blockAOriginationFee");
                                  }}
                                  submitOnUnfocus
                                  startEditingOnFocus
                                />
                              </div>
                            </li>
                            <li>
                              <p>Processing Fee</p>
                              <div className="w100">
                                <EdiText
                                  viewContainerClassName="view-wrapper"
                                  type="text"
                                  value={loanScenario?.blockAprocessingFee?loanScenario?.blockAprocessingFee:"N/A"}
                                  tabIndex={103}
                                  onSave={(pass) => {
                                    handleSave(pass, "blockAprocessingFee");
                                  }}
                                  submitOnUnfocus
                                  startEditingOnFocus
                                />
                              </div>
                            </li>
                            <li>
                              <p>Tax Service</p>
                              <div className="w100">
                                <EdiText
                                  viewContainerClassName="view-wrapper"
                                  type="text"
                                  value={loanScenario?.blockATaxService?loanScenario?.blockATaxService:"N/A"}
                                  tabIndex={104}
                                  onSave={(pass) => {
                                    handleSave(pass, "blockATaxService");
                                  }}
                                  submitOnUnfocus
                                  startEditingOnFocus
                                />
                              </div>
                            </li>
                          </ul>
                        </div>
                        <div className="price-text">
                          <ul>
                            <li className="head-price">
                              <p>B. Services You Cannot Shop For</p>
                              <span>${numberWithCommas(blockB)}</span>
                            </li>
                            <li>
                              <p>Appraisal Fee</p>
                              <div className="w100">
                                <EdiText
                                  viewContainerClassName="view-wrapper"
                                  type="text"
                                  value={loanScenario?.blockBAppraisalFee?loanScenario?.blockBAppraisalFee:"N/A"}
                                  tabIndex={106}
                                  onSave={(pass) => {
                                    handleSave(pass, "blockBAppraisalFee");
                                  }}
                                  submitOnUnfocus
                                  startEditingOnFocus
                                />
                              </div>
                            </li>
                            <li>
                              <p>Credit Report Fees</p>
                              <div className="w100">
                                <EdiText
                                  viewContainerClassName="view-wrapper"
                                  type="text"
                                  value={loanScenario?.blockBCreditFees?loanScenario?.blockBCreditFees:"N/A"}
                                  tabIndex={107}
                                  onSave={(pass) => {
                                    handleSave(pass, "blockBCreditFees");
                                  }}
                                  submitOnUnfocus
                                  startEditingOnFocus
                                />
                              </div>
                            </li>
                            <li>
                              <p>Flood Certification Fee</p>
                              <div className="w100">
                                <EdiText
                                  viewContainerClassName="view-wrapper"
                                  type="text"
                                  value={loanScenario?.blockBFloodCertification?loanScenario?.blockBFloodCertification:"N/A"}
                                  tabIndex={108}
                                  onSave={(pass) => {
                                    handleSave(
                                      pass,
                                      "blockBFloodCertification"
                                    );
                                  }}
                                  submitOnUnfocus
                                  startEditingOnFocus
                                />
                              </div>
                            </li>
                            <li>
                              <p>Tax Return Verification Fee</p>
                              <div className="w100">
                                <EdiText
                                  viewContainerClassName="view-wrapper"
                                  type="text"
                                  value={
                                    loanScenario?.blockBtaxReturnVerificationFee?loanScenario?.blockBtaxReturnVerificationFee:"N/A"
                                  }
                                  tabIndex={109}
                                  onSave={(pass) => {
                                    handleSave(
                                      pass,
                                      "blockBtaxReturnVerificationFee"
                                    );
                                  }}
                                  submitOnUnfocus
                                  startEditingOnFocus
                                />
                              </div>
                            </li>
                            <li>
                              <p>Verification of Employment </p>
                              <div className="w100">
                                <EdiText
                                  viewContainerClassName="view-wrapper"
                                  type="text"
                                  value={
                                    loanScenario?.blockBverificationEmployment?loanScenario?.blockBverificationEmployment:"N/A"
                                  }
                                  tabIndex={110}
                                  onSave={(pass) => {
                                    handleSave(
                                      pass,
                                      "blockBverificationEmployment"
                                    );
                                  }}
                                  submitOnUnfocus
                                  startEditingOnFocus
                                />
                              </div>
                            </li>
                            <li>
                              <p>HOA Questionnaire</p>
                              <div className="w100">
                                <EdiText
                                  viewContainerClassName="view-wrapper"
                                  type="text"
                                  value={loanScenario?.blockBhoaQuestionnaire?loanScenario?.blockBhoaQuestionnaire:"N/A"}
                                  tabIndex={111}
                                  onSave={(pass) => {
                                    handleSave(pass, "blockBhoaQuestionnaire");
                                  }}
                                  submitOnUnfocus
                                  startEditingOnFocus
                                />
                              </div>
                            </li>
                            <li>
                              <p>Condo Project Approval</p>
                              <div className="w100">
                                <EdiText
                                  viewContainerClassName="view-wrapper"
                                  type="text"
                                  value={
                                    loanScenario?.blockBcondoProjectApproval?loanScenario?.blockBcondoProjectApproval:"N/A"
                                  }
                                  tabIndex={112}
                                  onSave={(pass) => {
                                    handleSave(
                                      pass,
                                      "blockBcondoProjectApproval"
                                    );
                                  }}
                                  submitOnUnfocus
                                  startEditingOnFocus
                                />
                              </div>
                            </li>
                            <li>
                              <p>Single Premium MI</p>
                              <div className="w100">
                                <EdiText
                                  viewContainerClassName="view-wrapper"
                                  type="text"
                                  value={loanScenario?.blockBsinglePremiumMI?loanScenario?.blockBsinglePremiumMI:"N/A"}
                                  tabIndex={113}
                                  onSave={(pass) => {
                                    handleSave(pass, "blockBsinglePremiumMI");
                                  }}
                                  submitOnUnfocus
                                  startEditingOnFocus
                                />
                              </div>
                            </li>
                            <li>
                              <p>FHA, USDA, VA Funding Fee</p>
                              <span>
                                {numberWithCommas(
                                  Math.round(governmentFundingFee)
                                )}
                              </span>
                            </li>
                          </ul>
                        </div>
                        <div className="price-text">
                          <ul>
                            <li className="head-price">
                              <p>C. Services You Can Shop For</p>
                              <span>${numberWithCommas(blockC)}</span>
                            </li>
                            <li>
                              <p>Title Services & Insurance</p>
                              <div className="w100">
                                <EdiText
                                  viewContainerClassName="view-wrapper"
                                  type="text"
                                  value={loanScenario?.blockCTitleServices?loanScenario?.blockCTitleServices:"N/A"}
                                  tabIndex={113}
                                  onSave={(pass) => {
                                    handleSave(pass, "blockCTitleServices");
                                  }}
                                  submitOnUnfocus
                                  startEditingOnFocus
                                />
                              </div>
                            </li>
                            <li>
                              <p>Survey</p>
                              <div className="w100">
                                <EdiText
                                  viewContainerClassName="view-wrapper"
                                  type="text"
                                  value={loanScenario?.blockCSurvey?loanScenario?.blockCSurvey:"N/A"}
                                  tabIndex={114}
                                  onSave={(pass) => {
                                    handleSave(pass, "blockCSurvey");
                                  }}
                                  submitOnUnfocus
                                  startEditingOnFocus
                                />
                              </div>
                            </li>
                          </ul>
                        </div>
                        <div className="price-text">
                          <ul>
                            <li className="head-price">
                              <p>D. Total Loan Costs (A + B + C)</p>
                              <span>${numberWithCommas(blockD)}</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="price-box pb-1">
                        <div className="price-text">
                          <ul>
                            <li className="head-price">
                              <p>E. Taxes & Government Fees</p>
                              <span>${numberWithCommas(blockE)}</span>
                            </li>
                            <li>
                              <p>Recording Fees </p>
                              <div className="w100">
                                <EdiText
                                  viewContainerClassName="view-wrapper"
                                  type="text"
                                  value={loanScenario?.blockERecordingCharges?loanScenario?.blockERecordingCharges:"N/A"}
                                  tabIndex={115}
                                  onSave={(pass) => {
                                    handleSave(pass, "blockERecordingCharges");
                                  }}
                                  submitOnUnfocus
                                  startEditingOnFocus
                                />
                              </div>
                            </li>
                            <li>
                              <p>Transfer Taxes</p>
                              <div className="w100">
                                <EdiText
                                  viewContainerClassName="view-wrapper"
                                  type="text"
                                  value={loanScenario?.blockETransferTaxes?loanScenario?.blockETransferTaxes:"N/A"}
                                  tabIndex={116}
                                  onSave={(pass) => {
                                    handleSave(pass, "blockETransferTaxes");
                                  }}
                                  submitOnUnfocus
                                  startEditingOnFocus
                                />
                              </div>
                            </li>
                          </ul>
                        </div>
                        <div className="price-text-test">
                          <ul>
                            <li className="head-price">
                              <p>F. Prepaids</p>
                              <span>${numberWithCommas(blockF)}</span>
                            </li>

                            <li>
                              <div className="left-div">
                                <p>HOI Premium (</p>
                                <EdiText
                                  viewContainerClassName="testBT"
                                  value={loanScenario?.blockFnumMonthsPrepaidHOI?loanScenario?.blockFnumMonthsPrepaidHOI:"N/A"}
                                  tabIndex={119}
                                  type="text"
                                  // validationMessage=" "
                                  // validation={(val) => {
                                  //   if (
                                  //     (val.toString().length > 0 &&
                                  //       val.toString().length <= 2 &&
                                  //       val.toString() > 0) === false
                                  //   ) {
                                  //     toast.error(
                                  //       "Please type at max 2 characters only for zero,positive value."
                                  //     );
                                  //   }
                                  //   return true;
                                  // }}
                                  onSave={(pass) => {
                                    handleSave(
                                      pass,
                                      "blockFnumMonthsPrepaidHOI"
                                    );
                                  }}
                                  submitOnUnfocus
                                  startEditingOnFocus
                                />
                                months)
                              </div>
                              <div className="right-div">
                                <p>{numberWithCommas(totalHOIPremium)}</p>
                              </div>
                            </li>
                            <li>
                              <div className="left-div">
                                <p style={{ paddingRight: "5px" }}>
                                  Prepaid Interest for{" "}
                                </p>
                                <div className="">
                                  <EdiText
                                    viewContainerClassName="testBT"
                                    value={
                                      loanScenario?.blockFdaysPrepaidInterest?loanScenario?.blockFdaysPrepaidInterest:"N/A"
                                    }
                                    tabIndex={118}
                                    type="text"
                                    // validationMessage=" "
                                    // validation={(val) => {
                                    //   if (
                                    //     (val.toString().length > 0 &&
                                    //       val.toString().length <= 3 &&
                                    //       val.toString() > 0) === false
                                    //   ) {
                                    //     toast.error(
                                    //       "Please type at max 3 characters only for zero,positive value."
                                    //     );
                                    //   }
                                    //   return true;
                                    // }}
                                    onSave={(pass) => {
                                      handleSave(
                                        pass,
                                        "blockFdaysPrepaidInterest"
                                      );
                                    }}
                                    submitOnUnfocus
                                    startEditingOnFocus
                                  />
                                </div>
                                days
                              </div>
                              <div className="right-div">
                                <p>{numberWithCommas(totalPrepaidInterest)}</p>
                              </div>
                            </li>
                            <li>
                              <div className="left-div">
                                <p>Prepaid Taxes (</p>
                                <div className="">
                                  <EdiText
                                    viewContainerClassName="testBT"
                                    value={
                                      loanScenario?.blockFnumMonthsPrepaidTaxes?loanScenario?.blockFnumMonthsPrepaidTaxes:"N/A"
                                    }
                                    tabIndex={119}
                                    type="text"
                                    // validationMessage=" "
                                    // validation={(val) => {
                                    //   if (
                                    //     (val.toString().length > 0 &&
                                    //       val.toString().length <= 2 &&
                                    //       val.toString() > 0) === false
                                    //   ) {
                                    //     toast.error(
                                    //       "Please type at max 2 characters only for zero,positive value."
                                    //     );
                                    //   }
                                    //   return true;
                                    // }}
                                    onSave={(pass) => {
                                      handleSave(
                                        pass,
                                        "blockFnumMonthsPrepaidTaxes"
                                      );
                                    }}
                                    submitOnUnfocus
                                    startEditingOnFocus
                                  />
                                </div>
                                months)
                              </div>
                              <div className="right-div">
                                <p>{numberWithCommas(totalPrepaidTaxes)}</p>
                              </div>
                            </li>
                          </ul>
                        </div>
                        <div className="price-text-test">
                          <ul>
                            <li className="head-price">
                              <p>G. Initial Escrow Payment at Closing</p>
                              <span>${numberWithCommas(blockG)}</span>
                            </li>
                            <li>
                              <div className="left-div multi-line">
                                <p>Homeowner’s Insurance </p>
                                <div className="left-child">
                                  <p>
                                    ${loanScenario?.monthlyHOI?loanScenario?.monthlyHOI:"N/A"} per month for
                                  </p>
                                  {isEqual === "blockGnumMonthsInsReserves" ? (
                                    <div className="dropdown-main">
                                      <div id="wrap">
                                        <Dropdown
                                          className="cust-select"
                                          options={monthsOptions}
                                          onChange={onSelect}
                                          value={loanScenario?.blockGnumMonthsInsReserves?loanScenario?.blockGnumMonthsInsReserves.toString():"N/A"}
                                          placeholder="Select an option"
                                        />
                                        <div className="btn-div">
                                          <button
                                            className="right-arrow icon-btn"
                                            onClick={() =>
                                              handleSave(
                                                selectedValue,
                                                "blockGnumMonthsInsReserves"
                                              )
                                            }
                                          >
                                            &#10003;
                                          </button>
                                          <button
                                            className="cross-arrow icon-btn"
                                            onClick={() => onClick("", "")}
                                          >
                                            &#10005;
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                  ) : (
                                    <div
                                      className="main-div"
                                      onClick={() =>
                                        onClick(
                                          "blockGnumMonthsInsReserves",
                                          loanScenario.blockGnumMonthsInsReserves
                                        )
                                      }
                                    >
                                      <div>
                                        <span>
                                          {
                                            loanScenario?.blockGnumMonthsInsReserves?loanScenario?.blockGnumMonthsInsReserves:"N/A"
                                          }
                                        </span>
                                        <button className="edit-arrow1 icon-btn1">
                                          &#9998;
                                        </button>
                                      </div>
                                    </div>
                                  )}
                                  months
                                </div>
                              </div>
                              <div className="right-div">
                                <p>{numberWithCommas(totalHOI)}</p>
                              </div>
                            </li>
                            <li>
                              <div className="left-div multi-line">
                                <p>Property Taxes</p>
                                <div className="left-child">
                                  <p>
                                    ${loanScenario?.monthlyPropertyTax?loanScenario?.monthlyPropertyTax:"N/A"} per month
                                    for
                                  </p>
                                  {isEqual === "blockGnumMonthsTaxReserves" ? (
                                    <div className="dropdown-main">
                                      <div id="wrap">
                                        <Dropdown
                                          className="cust-select"
                                          options={monthsOptions}
                                          onChange={onSelect}
                                          value={loanScenario?.blockGnumMonthsTaxReserves?loanScenario?.blockGnumMonthsTaxReserves.toString():"N/A"}
                                          placeholder="Select an option"
                                        />
                                        <div className="btn-div">
                                          <button
                                            className="right-arrow icon-btn"
                                            onClick={() =>
                                              handleSave(
                                                selectedValue,
                                                "blockGnumMonthsTaxReserves"
                                              )
                                            }
                                          >
                                            &#10003;
                                          </button>
                                          <button
                                            className="cross-arrow icon-btn"
                                            onClick={() => onClick("", "")}
                                          >
                                            &#10005;
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                  ) : (
                                    <div
                                      className="main-div"
                                      onClick={() =>
                                        onClick(
                                          "blockGnumMonthsTaxReserves",
                                          loanScenario.blockGnumMonthsTaxReserves
                                        )
                                      }
                                    >
                                      <div>
                                        <span>
                                          {
                                            loanScenario?.blockGnumMonthsTaxReserves?loanScenario?.blockGnumMonthsTaxReserves:"N/A"
                                          }
                                        </span>
                                        <button className="edit-arrow1 icon-btn1">
                                          &#9998;
                                        </button>
                                      </div>
                                    </div>
                                  )}
                                  months
                                </div>
                              </div>
                              <div className="right-div">
                                <p>{numberWithCommas(totalPropertyTaxes)}</p>
                              </div>
                            </li>
                          </ul>
                        </div>
                        <div className="price-text">
                          <ul>
                            <li className="head-price">
                              <p>H. Other</p>
                              <span>${numberWithCommas(blockH)}</span>
                            </li>
                            <li>
                              <p>Owner's Title Insurance</p>
                              <div className="w100">
                                <EdiText
                                  viewContainerClassName="view-wrapper"
                                  type="text"
                                  value={
                                    loanScenario?.blockHOwnersTitleInsPremium?loanScenario?.blockHOwnersTitleInsPremium:"N/A"
                                  }
                                  tabIndex={122}
                                  onSave={(pass) => {
                                    handleSave(
                                      pass,
                                      "blockHOwnersTitleInsPremium"
                                    );
                                  }}
                                  submitOnUnfocus
                                  startEditingOnFocus
                                />
                              </div>
                            </li>
                          </ul>
                        </div>
                        <div className="price-text">
                          <ul>
                            <li className="head-price">
                              <p>I. Total Other Costs (E + F + G + H)</p>
                              <span>${numberWithCommas((blockI).toFixed(2))}</span>
                            </li>
                          </ul>
                        </div>
                        <div className="price-text">
                          <ul>
                            <li className="head-price">
                              <p>J. Total Closing Costs</p>
                              <span>
                                ${numberWithCommas(Math.round(blockJ))}
                              </span>
                            </li>
                            <li>
                              <p>D+I</p>
                              <span>{numberWithCommas((blockD + blockI).toFixed(2))}</span>
                            </li>
                            <li>
                              <p>Lender Credit </p>
                              <span>{loanScenario?.lenderCredit?loanScenario?.lenderCredit:"N/A"}</span>
                            </li>
                          </ul>
                        </div>
                        <div className="price-text">
                          <ul>
                            <li className="head-price">
                              <p>Estimated Cash to Close</p>
                            </li>
                            <li>
                              <p className="text-p">Sale Price/Payoffs</p>
                              <span className="text-val">
                                {numberWithCommas(
                                  Math.round(sale_Price_OR_Payoffs)
                                )}
                              </span>
                            </li>
                            <li>
                              <p className="text-p">Total Closing Costs (J) </p>
                              <p className="text-icon">+</p>
                              <span className="text-val">
                                {numberWithCommas(Math.round(blockJ))}
                              </span>
                            </li>
                            <li>
                              <p className="text-p">Total Loan Amount </p>
                              <p className="text-icon">-</p>
                              <span className="text-val">
                                {numberWithCommas(Math.round(totalLoanAmount))}
                              </span>
                            </li>
                            {secondMortgage !== 0 ? (
                              <li>
                                <p className="text-p">Second Mortgage</p>
                                <p className="text-icon">-</p>
                                <span className="text-val">
                                  {numberWithCommas(Math.round(secondMortgage))}
                                </span>
                              </li>
                            ) : null}
                            {loanScenario.loanPurpose === "Purchase" ? (
                              <li>
                                <p className="text-p">Seller Credit</p>
                                <p className="text-icon">-</p>
                                <div className="widthPX">
                                  <EdiText
                                    viewContainerClassName="view-wrapper"
                                    className="text-val"
                                    type="text"
                                    value={loanScenario?.sellerCredit?loanScenario?.sellerCredit:"N/A"}
                                    tabIndex={123}
                                    onSave={(pass) => {
                                      handleSave(pass, "sellerCredit");
                                    }}
                                    submitOnUnfocus
                                    startEditingOnFocus
                                  />
                                </div>
                              </li>
                            ) : null}
                            <li>
                              <p className="text-p">
                                Other Credits and Adjustments
                              </p>
                              <p className="text-icon">-</p>
                              <div className="widthPX">
                                <EdiText
                                  viewContainerClassName="view-wrapper"
                                  className="text-val"
                                  type="text"
                                  value={loanScenario?.otherCredits?loanScenario?.otherCredits:"N/A"}
                                  tabIndex={123}
                                  onSave={(pass) => {
                                    handleSave(pass, "otherCredits");
                                  }}
                                  submitOnUnfocus
                                  startEditingOnFocus
                                />
                              </div>
                            </li>
                            <li className="Total">
                              <p>
                                <b>Estimated Cash to Close</b>
                              </p>
                              <span className="text-val">
                                {Math.sign(estimatedCashToClose) === -1 ? (
                                  <b>
                                    (
                                    {numberWithCommas(
                                      Math.abs(Math.round(estimatedCashToClose))
                                    )}
                                    )
                                  </b>
                                ) : (
                                  <b>
                                    {numberWithCommas(
                                      Math.round(estimatedCashToClose)
                                    )}
                                  </b>
                                )}
                              </span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </Tab>
                </Tabs>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
export default Home_2;
