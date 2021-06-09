import logo from "./logo.svg";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import { WardUpsert } from "./components/WardUpsert";
import { WardList } from "./components/WardList";
import { Nav, Navbar } from "react-bootstrap";
import { AppNavBar } from "./common/AppNavBar";

function App() {
  return (
    <Router>
      <AppNavBar />

      <Switch>
        <Route path="/create-ward">
          <WardUpsert />
        </Route>

        <Route path="/list-ward">
          <WardList />
        </Route>

        <Route exact path="/">
          <WardList />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;