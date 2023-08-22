import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { Button } from "react-bootstrap";

const Setting = () => {
  const [user, setUser] = useState({});
  const [inputFiles, setInputFiles] = useState({
    file: null,
    base64URL: "",
  });

  const [fileSizeError, setFileSizeError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const ref = useRef();

  useEffect(() => {
    getUser();
  }, []);

  const getUser = () => {
    const userId = { id: 1 };
    axios({
      method: "get",
      url: "https://atlas-admin.keystonefunding.com/api/user/details",
      params: userId,
    })
      .then((res) => {
        // console.log(res.data.data)
        setUser(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getBase64 = (file) => {
    return new Promise((resolve) => {
      let fileInfo;
      let baseURL = "";
      // Make new FileReader
      let reader = new FileReader();

      // Convert the file to base64 text
      reader.readAsDataURL(file);

      // on reader load somthing...
      reader.onload = () => {
        // Make a fileInfo Object
        // console.log("Called", reader);
        baseURL = reader.result;
        // console.log(baseURL);
        resolve(baseURL);
      };

      reader.onerror = function (error) {
        console.log('Error: ', error);
    };
      //   console.log(fileInfo);
    });
  };

  const handleFileInputChange = (e) => {
    // console.log(e.target.files[0]);
    let { file } = inputFiles;
    file = e.target.files[0];

    getBase64(file)
      .then((result) => {
        file["base64"] = result;
        // console.log("File Is", file);
        setInputFiles({
          base64URL: result,
          file,
        });
      })
      .catch((err) => {
        console.log(err);
      });

    setInputFiles({
      file: e.target.files[0],
    });
  };

  const handleSave = () => {
    // console.log(inputFiles?.base64URL);

    const file = Math.round(inputFiles?.file?.size / 1024);
    if (file >= 100) {
      //less than 100kb
      setFileSizeError(true);
      setInputFiles({
        file: null,
        base64URL: "",
      });
      setErrorMessage("Image size must be less than 100 KB");
    } else if (inputFiles?.base64URL !== "" && inputFiles?.base64URL !== undefined ) {
      var formData = new FormData();
      formData.append("signatureImage", inputFiles?.base64URL);
      formData.append("id", user.id);

      axios
        .post("https://atlas-admin.keystonefunding.com/api/user/update", formData)
        .then((res) => {
          setErrorMessage("");
          setFileSizeError(false);
          console.log("file accepted");
          // console.log("res -->", res);
          setInputFiles({
            file: null,
            base64URL: "",
          });
          getUser();
          ref.current.value = "";
        })
        .catch((err) => {
          console.log("err --->", err);
        });
    }
  };
  return (
    <div className="maindiv">
      <div className="setting-page">
        <div className="stone-sec setting-sec">
          <div className="stone-text">
            <div className="setting">
              <i className="fas fa-cog fa-2x settingIcon"></i>
              <h3>Settings</h3>
              <div className="settingBody">
                <h6 style={{lineHeight:"1.4"}}>
                  Most changes to settings need to be made by the System
                  Administrator.
                </h6>
              </div>
            </div>
          </div>
          <div className="setting-details">
            <div className="text-details">
              <div className="texts">
                <p className="text-prop">Name</p>
                <p>{user?.firstName + " " + user?.lastName}</p>
              </div>
              <div className="texts">
                <p className="text-prop">Title</p>
                <p>{user.title}</p>
              </div>
              <div className="texts">
                <p className="text-prop">NMLS ID</p>
                <p>{user?.nmlsId ? user?.nmlsId : ""}</p>
              </div>
              <div className="texts">
                <p className="text-prop">Signature</p>
                <div className="right-text">
                  <img
                    className="signature-img"
                    src={
                      inputFiles?.base64URL
                        ? inputFiles?.base64URL
                        : user?.signatureImage
                    }
                  />
                  <input
                    ref={ref}
                    className="imgSelector"
                    type="file"
                    onChange={(e) => handleFileInputChange(e)}
                    hidden
                  ></input>
                  <button
                    className="updateFileBtn"
                    onClick={() => ref.current.click()}
                  >
                    Update Image
                  </button>
                </div>
              </div>
              <div className="texts">

                {fileSizeError && (
                  <span className="errorMessage" style={{width:"67%" ,color: "red" }}>
                    {errorMessage}
                  </span>
                )}
                </div>
            </div>
            <div className="seperator">
              <h6>CONTACT INFORMATION</h6>
            </div>
          </div>
          <div className="setting-details">
            <div className="text-details">
              <div className="texts">
                <p className="text-prop">Email</p>
                <p>{user?.email ? user?.email : ""}</p>
              </div>
              <div className="texts">
                <p className="text-prop">Phone</p>
                <p>{user?.phone ? user?.phone : ""}</p>
              </div>
              <div className="texts">
                <p className="text-prop">Office Address</p>
                <p>
                  {user?.officeAddressStreet +
                    ", " +
                    user?.officeAddressCity +
                    ", " +
                    user?.officeAddressState +
                    ", " +
                    user?.officeAddressZip}
                </p>
              </div>
            </div>
            <div className="seperator">
              <h6>SALES SYSTEM</h6>
            </div>
          </div>
          <div className="setting-details">
            <div className="text-details">
              <div className="texts">
                <p className="text-prop">Sales System</p>
                <p>Follow Up Boss</p>
              </div>
              <div className="texts">
                <p className="text-prop">Sales System ID</p>
                <p>{user?.followUpBossUserId}</p>
              </div>
            </div>
            <div className="seperator2"></div>
          </div>
          <div className="saveSetting">
            <button className="save" onClick={() => handleSave()}>
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Setting;
