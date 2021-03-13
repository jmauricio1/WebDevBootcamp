import "./App.css";
import Login from "./components/login";

var isLoggedIn = false;
var userIsRegistered = false;

function App() {
  return (
    <div className="App">
      {/*isLoggedIn ? <h1>Hello</h1> : <Login />*/}
      {userIsRegistered ? <Login /> : <Login register="true" />}
    </div>
  );
}

export default App;
