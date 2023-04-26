import { BrowserRouter } from 'react-router-dom';

import './styles/style.scss';

import { AppRoutes } from './routes';

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
