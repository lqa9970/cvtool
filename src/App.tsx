import Navbar from "./components/Navbar/Navbar";
import { Container } from "semantic-ui-react";
import Dashboard from "./pages/Dashboard";

import "./styles/style.scss";

const App = () => {
  return (
    <div className="App" id="App">
        <Navbar />
        <Dashboard />
    </div>
  );
};

export default App;
