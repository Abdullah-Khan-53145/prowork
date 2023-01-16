import { useEffect } from "react";
import "./App.css";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import { Footer } from "./Components/Footer";
import { Header } from "./Components/Header";
import { Home } from "./Pages/Home";
import { GigPage } from "./Pages/GigPage";
import SearchPage from "./Pages/SearchPage";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <Header />
          <Home />
        </>
      ),
    },
    {
      path: "/gig/:id",
      element: (
        <>
          <Header />
          <GigPage />
        </>
      ),
    },
    {
      path: "/search-gig",
      element: (
        <>
          <Header />
          <SearchPage />
        </>
      ),
    },
  ]);
  return (
    <div className="App">
      <RouterProvider router={router} />
      <Footer />
    </div>
  );
}

export default App;
