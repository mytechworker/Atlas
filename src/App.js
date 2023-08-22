import logo from "./logo.svg";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Header1 from "./components/Header";
import Sidebar from "./components/Sidebar";
import Home from "./components/HomeMain";
import Home_2 from "./components/Home";
import Setting from "./components/Setting"
import AtlasLoanPage from "./components/iFrameFollowUpBoss.js";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  NavLink,
} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        {/* <Header1 /> */}
        <Sidebar />
        <Switch>
          <Route path="/allcontacts">
            <Home />
          </Route>
          <Route path="/home">
            <Home_2 />
          </Route>
          <Route path="/settings">
            <Setting />
          </Route>
          <Route path="/embeddedApp">
            <AtlasLoanPage />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
