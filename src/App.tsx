
import { Route, Switch } from "react-router-dom";
import { InfoProvider } from "./Context/getContext";
import Login from "./components/login/Login";
import { ToastContainer } from "react-toastify";
import Home from "./components/home/Home";
import Signup from "./components/signup/Signup";

function App() {
  return (
    <InfoProvider>
      <ToastContainer />
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/" component={Home} />
      </Switch>
    </InfoProvider>
    );
  }
  
  export default App;
  