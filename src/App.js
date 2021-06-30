import './App.css';
import Login from "./pages/auth/access/index";
import routes from "./config/routes"
import {
    goBack,
    goTo,
    popToTop,
    Link,
    Router,
    getCurrent,
    getComponentStack,
  } from 'react-chrome-extension-router';

function App() {
  return (
    <Router className="App">
        <div>
            
            <Login />
        </div>
    </Router>
  );
}

export default App;
