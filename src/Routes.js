import './App.css';
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from './firebase';
import Navbar from './components/Navbar/Navbar.jsx';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './components/Home/Home';


function Routes() {

  const [user] = useAuthState(auth);

  return (
    <BrowserRouter>
      <div className="App">
        
        <Navbar 
          user={user}
        />
        
        <Switch>
          
          <Route 
            exact path="/" 
            render={ () => <Home /> } 
          />
          
        </Switch>

      </div>
    </BrowserRouter>
  );
}

export default Routes;
