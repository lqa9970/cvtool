import { Navigation } from "@nordcloud/gnui"
import Navbar from "./components/Navbar/Navbar"

function App() {
  return (
    <div className="App">
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
  )
}

export default App
