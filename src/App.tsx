import { Navigation } from "@nordcloud/gnui";


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
        </Navigation.Container>;
    </div>
  );
}

export default App;
