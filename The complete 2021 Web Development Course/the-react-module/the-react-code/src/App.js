import './App.css';
import Home from './components/home';
import TheDay from './components/the-day';
import MathUse from './components/math-use';
import Card from './components/card';

function App() {
  return (
    <div className="App">
      <Card
        name="Random Image"
        source="https://picsum.photos/300"
        tel="111-222-3333"
        email="a@b.com"
      />
      <Card
        name="Random Image 2"
        source="https://picsum.photos/300"
        tel="123-456-7890"
        email="a@b.com"
      />
    </div>
  );
}

export default App;
