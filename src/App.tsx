import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ProtectedRoute from "./component/auth/ProtectedRoute";
import Login from "./pages/login/Login";
import Dashboard from "./pages/dashboard/Dashboard";
import Forbidden from "./pages/forbidden/Forbidden";
import Landing from "./pages/landing/Landing";

const App = () => {
  return (
    <>
      <Router>
        <Switch>

          <Route exact path="/">
            <Landing/>
          </Route>

          <Route exact path="/login">
            <Login/>
          </Route>

          <Route exact path="/dashboard">
            <ProtectedRoute component={Dashboard}/>
          </Route>

          <Route exact path="/forbidden">
            <Forbidden/>
          </Route>

        </Switch>
      </Router>
    </>
  );
}
 
export default App;