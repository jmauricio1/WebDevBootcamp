import "./App.css";
import Card from "./components/card";
import emojis from "./emojipedia";

function App() {
  return (
    <div className="App">
      <h1>
        <span>emoji dictionary</span>
      </h1>
      <dl className="dictionary">
        {emojis.map((element) => {
            return <Card
              key={element.id}
              emojiImg={element.emoji}
              emojiName={element.name}
              desc={element.meaning}
            />
        })}
      </dl>
    </div>
  );
}

export default App;
