import { AppRoutes } from "./routes/index";
import { BrowserRouter } from "react-router-dom";
import { Navigation } from "@nordcloud/gnui";
import Navbar from "./components/Navbar/Navbar";

import "./styles/style.scss";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
      <Navigation.Container>
        <Navigation.Item as="a" href="http://google.com" target="_blank">
          Google
        </Navigation.Item>
        <Navigation.Item as="a" href="http://google.com" target="_blank">
          Google
        </Navigation.Item>
        <Navigation.Item as="a" href="http://google.com" target="_blank">
          Google
        </Navigation.Item>
      </Navigation.Container>
      <Navbar />
    </div>
  );
}

export default App;
