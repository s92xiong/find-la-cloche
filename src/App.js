import './App.css';
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from './firebase';
import Navbar from './components/Navbar/Navbar.jsx';
import SearchBar from './components/SearchBar/SearchBar';


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
      <div className="App-container">
        <SearchBar />
      </div>
    </div>
  );
}

export default App;
