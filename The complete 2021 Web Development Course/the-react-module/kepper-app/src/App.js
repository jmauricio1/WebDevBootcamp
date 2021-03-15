import "./App.css";

import Header from "./components/header";
import Footer from "./components/footer";
import Note from "./components/note";
import CreateArea from './components/create-area';
//import notes from "./notes";
import { useState } from "react";

function App() {
  const[notesArray, setArray] = useState([]);

  function addNote(newNote){
    setArray((previousValues) => {
      return [...previousValues, newNote];
    });
  }

  function deleteNote(id){
    setArray((previousValues) => {
      return previousValues.filter((note, index) => {
        return index !== id;
      });
    });
  }

  return (
    <div className="App">
      <Header />
      <CreateArea onClick={addNote}/>
      {notesArray.map((element, index) => {
        return (
          <Note
            key={index}
            id={index}
            title={element.title}
            content={element.content}
            onClick={deleteNote}
          />
        );
      })}
      <Footer />
    </div>
  );
}

export default App;
