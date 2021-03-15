//import "./App.css";
import Login from "./components/login";
import Submission from './components/submission';
import CompStates from './components/comp-states';
import CompStatePrac from './components/comp-state-prac';
import SpreadPrac from './components/spread-prac';
import ToDoList from './components/to-do-list';

var isLoggedIn = false;
var userIsRegistered = false;

function App() {
  return (
    <div className="container">
      {/*isLoggedIn ? <h1>Hello</h1> : <Login />*/}
      {/*userIsRegistered ? <Login /> : <Login register="true" />*/}
      {/*<Submission />*/}
      {/*<CompStates />*/}
      {/*<CompStatePrac />*/}
      {/*<SpreadPrac /> */}
      <ToDoList />
    </div>
  );
}

export default App;
