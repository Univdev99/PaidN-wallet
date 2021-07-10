import './App.css';
import Login from "./pages/apps/auth/access/index";
import { Router } from 'react-chrome-extension-router';

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
