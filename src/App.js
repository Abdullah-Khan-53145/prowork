import { useEffect } from "react";
import "./App.css";
import { setAllGigsAPI } from "./actions";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Footer } from "./Components/Footer";
import Header from "./Components/Header";
import { Home } from "./Pages/Home";
import GigPage from "./Pages/GigPage";
import { connect } from "react-redux";
import SearchPage from "./Pages/SearchPage";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import MakeAGigPage from "./Pages/MakeAGigPage";
import Dashboard from "./Pages/Dashboard";
import AboutusPage from "./Pages/AboutusPage";
import { ContactUsPage } from "./Pages/ContactUsPage";

function App({ setAllGigs }) {
  useEffect(() => {
    setAllGigs();
  }, []);
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
    {
      path: "/log-in",
      element: (
        <>
          <Login />
        </>
      ),
    },
    {
      path: "/sign-up",
      element: (
        <>
          <Signup />
        </>
      ),
    },
    {
      path: "/make-a-gig",
      element: (
        <>
          <Header />
          <MakeAGigPage />
        </>
      ),
    },
    {
      path: "/user-dashboard",
      element: (
        <>
          <Header />
          <Dashboard />
        </>
      ),
    },
    {
      path: "/about",
      element: (
        <>
          <Header />
          <AboutusPage />
        </>
      ),
    },
    {
      path: "/contact",
      element: (
        <>
          <Header />
          <ContactUsPage />
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

const mapStateToProps = (state) => ({
  AllGigs: state.AllGigsState,
  search: state.searchState,
});

const mapDispatchToProps = (dispatch) => ({
  setAllGigs: () => dispatch(setAllGigsAPI()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
