import './App.css';
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from './firebase';
import Navbar from './components/Navbar/Navbar.jsx';


function App() {

  const [user] = useAuthState(auth);

  const signUp = () => {
    console.log("User will sign up...");
  };

  const logIn = () => {
    console.log("Logging user in...");
  };

  return (
    <div className="App">
      <Navbar 
        user={user}
        signUp={signUp}
        logIn={logIn}
      />
    </div>
  );
}

export default App;
