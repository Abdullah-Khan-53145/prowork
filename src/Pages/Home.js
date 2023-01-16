import Hero from "../Components/Hero";
import Services from "../Components/Services";
import AllGigs from "../Components/AllGigs";
export const Home = () => {
  return (
    <>
      <Hero />
      <Services />
      <AllGigs title="Popular Gigs" />
    </>
  );
};
