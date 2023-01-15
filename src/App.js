import "./App.css";
import { Footer } from "./Components/Footer";
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
      <Footer />
    </div>
  );
}

export default App;
