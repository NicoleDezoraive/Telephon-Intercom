import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Buildings from "./components/Buildings";
import BuildingInfo from './components/BuildingInfo';
import "./style.css"

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={Buildings} />
          <Route path="/building/:buildingId" component={BuildingInfo} />
        </Switch>
      </Router>
    </div>
    
  );
}

export default App;
