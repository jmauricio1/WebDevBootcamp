import "./App.css";
import Home from "./components/home";
import TheDay from "./components/the-day";
import MathUse from "./components/math-use";
import Card from "./components/card";

import contacts from "./contacts";

function createCard(contact) {
  return <Card key={contact.id} index={contact.id} name={contact.name} source={contact.imgURL} tel={contact.phone} email={contact.email} />;
}

function App() {
  return <div className="App">{contacts.map(createCard)}</div>;
}

export default App;
