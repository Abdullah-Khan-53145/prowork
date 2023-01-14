import "./App.css";
import { Header } from "./Components/Header";
import { Hero } from "./Components/Hero";
import { PopularGigs } from "./Components/PopularGigs";
import { Services } from "./Components/Services";

function App() {
  return (
    <div className="App">
      <Header />
      <Hero />
      <Services />
      <PopularGigs />
    </div>
  );
}

export default App;
