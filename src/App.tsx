import { BrowserRouter } from "react-router-dom";

import "./stylesheet/style.scss";

import NotificationsComponent from "./components/Notifications/Notifications";
import { ActivityProvider } from "./context/ActivityContext";
import { NotificationProvider } from "./context/NotificationContext";
import { AppRoutes } from "./routes";

function App() {
  return (
    <div id="App">
      <BrowserRouter>
        <NotificationProvider>
          <ActivityProvider>
            <AppRoutes />
            <NotificationsComponent />
          </ActivityProvider>
        </NotificationProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
