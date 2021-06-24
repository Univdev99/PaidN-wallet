import './App.css';
import { BrowserRouter as Router, Switch, Route, } from "react-router-dom";
import NavBar from "./components/layout/NavBar/index";
import Login from "./pages/auth/access/index";
import routes from "./config/routes"

function App() {
  return (
    <Router className="App">
        <div>
            <NavBar />
            <Switch>
                <Route exact path="/">
                    <Login />
                </Route>
                {routes.map((route, index) => {
                    return route.component ? (
                        <Route
                            key={index}
                            path={route.path}
                            exact
                            name={route.name}
                        >
                          <route.component />
                        </Route>
                    ) : null;
                })}
            </Switch>
        </div>
    </Router>
  );
}

export default App;
