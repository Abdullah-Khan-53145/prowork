import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { setSearchAPI } from "../actions";
import { connect } from "react-redux";
import "../Styles/Hero.css";
const Hero = ({ search, setSearch }) => {
  const [key, setKey] = useState("");
  const navigate = useNavigate();
  const handleClick = (e) => {
    e.preventDefault();
    setSearch({ ...search, key: key });
    navigate("/search-gig");
  };
  return (
    <div className="hero__main">
      <section class="hero">
        <div className="hero__clip">
          <img src="./imgs/hero-illus.png" />
        </div>
        <div class="container">
          <h1>
            Find top-tier talent for your <span>business</span>
          </h1>
          <p>
            Our platform connects businesses and entrepreneurs with skilled
            professionals from around the world.
          </p>
          <form onSubmit={handleClick} class="search-bar">
            <input
              type="text"
              placeholder="Search for Services"
              value={key}
              onChange={(e) => setKey(e.target.value)}
            />
            <button className="primary_btn" type="submit">
              Search
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};
const mapStateToProps = (state) => ({
  search: state.searchState,
});

const mapDispatchToProps = (dispatch) => ({
  setSearch: (key) => dispatch(setSearchAPI(key)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Hero);
