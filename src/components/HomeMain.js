import React, { useState } from "react";
import Hometable from "./AllContacts";
import Header from "./Header";

const Home = () => {
  const [headers, setHeaders] = useState("");
  const handleProps = (e) => {
    setHeaders(e);
  };

  return (
    <>
      {/* <Header value={handleProps} /> */}
      <div className="maindiv">
        <Hometable name={headers} />
      </div>
    </>
  );
};
export default Home;
