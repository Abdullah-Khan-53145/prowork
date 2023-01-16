import { Gig } from "./Gig";
import "../Styles/PopularGigs.css";
import Loading from "./Loading";
import { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { setAllGigsAPI } from "../actions";
import { NotFound } from "./NotFount";

const AllGigs = ({ title, AllGigs, setAllGigs, search }) => {
  const [gigs, setGigs] = useState([]);
  const [len, setlen] = useState(title === "Popular Gigs" ? 6 : 10000);

  useEffect(() => {
    setAllGigs(AllGigs);
  }, []);
  useEffect(() => {
    setGigs(
      AllGigs.filter(
        (gig) =>
          gig.gig_title.toLowerCase().includes(search.key.toLowerCase()) &&
          (gig.gig_cat.toLowerCase() === search.filter ||
            search.filter === "all")
      )
    );
  }, [AllGigs]);
  useEffect(() => {
    setGigs(
      AllGigs.filter(
        (gig) =>
          gig.gig_title.toLowerCase().includes(search.key.toLowerCase()) &&
          (gig.gig_cat.toLowerCase() === search.filter ||
            search.filter === "all")
      )
    );
  }, [search]);
  // I will develop an ecommerce website using shopify
  return (
    <div className="popular_gig_parent">
      <div className="popular_gigs_child">
        <h1>{title}</h1>

        {gigs.length !== 0 ? (
          <div className="popular_gigs">
            {gigs.map((gig, index) => {
              if (index < len)
                return (
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
                );
            })}
          </div>
        ) : (
          <>{<NotFound />}</>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  AllGigs: state.AllGigsState,
  search: state.searchState,
});

const mapDispatchToProps = (dispatch) => ({
  setAllGigs: () => dispatch(setAllGigsAPI()),
});

export default connect(mapStateToProps, mapDispatchToProps)(AllGigs);
