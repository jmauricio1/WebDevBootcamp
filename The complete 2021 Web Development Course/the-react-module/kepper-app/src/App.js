import "./App.css";

import Header from "./components/header";
import Footer from "./components/footer";
import Note from "./components/note";
import notes from "./notes";

function App() {
  return (
    <div className="App">
      <Header />
      {notes.map((element) => {
        return (
          <Note
            key={element.key}
            title={element.title}
            content={element.content}
          />
        );
      })}
      <Footer />
    </div>
  );
}

export default App;
