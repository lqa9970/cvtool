<<<<<<< HEAD
import {AppRoutes} from "./routes/index"
import { BrowserRouter } from "react-router-dom";
=======
import { Navigation } from "@nordcloud/gnui"
import Navbar from "./components/Navbar/Navbar"
>>>>>>> 34039e4 (Configure testing)

function App() {
  return (
    <div className="App">
<<<<<<< HEAD
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
=======
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
>>>>>>> 34039e4 (Configure testing)
    </div>
  )
}

export default App
