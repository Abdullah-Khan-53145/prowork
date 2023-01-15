import { Gig } from "./Gig";
// import gigs from "../gigs.json";
import "../Styles/PopularGigs.css";
import Loading from "./Loading";
import { useEffect, useState } from "react";
import { collection, query, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { Link } from "react-router-dom";

export const PopularGigs = () => {
  const [gigs, setGigs] = useState([]);
  const getGigs = async () => {
    let gigarr = [];
    const q = query(collection(db, "gigs"));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      gigarr.push({ ...doc.data(), id: doc.id });
    });
    setGigs(gigarr);
    console.log(gigs);
  };

  useEffect(() => {
    getGigs();
  }, []);

  return (
    <div className="popular_gig_parent">
      <div className="popular_gigs_child">
        <h1>Popular Gigs</h1>
        {gigs.length !== 0 ? (
          <div className="popular_gigs">
            {gigs.map((gig) => (
              <Link to={`/gig/${gig.id}`}>
                <Gig
                  gigImg={gig.gig_img}
                  gigUserName={gig.username}
                  gigProfilePic={gig.profile_pic}
                  gigTitle={gig.gig_title}
                  gigAverageRating={gig.average_rating}
                  gigDeliveredProjects={gig.delivered_projects}
                  gigStartingPrice={gig.packages[0].price}
                />
              </Link>
            ))}
          </div>
        ) : (
          <Loading />
        )}
      </div>
    </div>
  );
};
