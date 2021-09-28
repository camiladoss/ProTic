import Index from 'pages';
import GestionUsuarios from 'pages/GestionUsuarios';
import Ventas from 'pages/Ventas';
import 'styles/styles.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path='/gestionUsuarios'>
            <GestionUsuarios />
          </Route>
          <Route path='/ventas'>
            <Ventas />
          </Route>
          <Route path=''>
            <Index />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;