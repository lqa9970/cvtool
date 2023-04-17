import Navbar from "./components/Navbar/Navbar";
import { Container } from "semantic-ui-react";
import Dashboard from "./pages/Dashboard";
import { BrowserRouter } from "react-router-dom";

import "./styles/style.scss";

import { AppRoutes } from "./routes";

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </div>
  );
};

export default App;
