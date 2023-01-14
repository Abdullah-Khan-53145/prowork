import { Gig } from "./Gig";
import "../Styles/PopularGigs.css";
export const PopularGigs = () => {
  const gigs = [1, 2, 3, 4, 5, 6];
  return (
    <div className="popular_gig_parent">
      <h1>Popular Gigs</h1>
      <div className="popular_gigs_child">
        {gigs.map((gig) => (
          <Gig />
        ))}
      </div>
    </div>
  );
};
