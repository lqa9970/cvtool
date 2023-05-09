import { BrowserRouter } from 'react-router-dom';

import './stylesheet/style.scss';

import { AppRoutes } from './routes';
import NotificationsComponent from './components/Notifications/Notifications';
import { NotificationProvider } from './context/NotificationContext';

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <NotificationProvider>
          <AppRoutes />
          <NotificationsComponent />
        </NotificationProvider>
      </BrowserRouter>
    </div>
  );
};

export default App;
