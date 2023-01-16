import { useEffect, useState } from "react";
import AllGigs from "../Components/AllGigs";
import { setSearchAPI } from "../actions";
import { connect } from "react-redux";
import "../Styles/SearchPage.css";
const SearchPage = ({ search, setSearch }) => {
  const filters = [
    "All",
    "Web Development",
    "Mobile Development",
    "AI Development",
    "Game Development",
  ];
  const [_filter, _setFilter] = useState(search.filter);
  const [search_, setSearch_] = useState(search.key);
  const handleClick = (e) => {
    e.preventDefault();
    setSearch({ ...search, key: search_ });
  };
  useEffect(() => {
    setSearch({ ...search, filter: _filter });
  }, [_filter]);
  return (
    <div className="search__page__parent">
      <div className="search_page_top">
        <form onSubmit={handleClick} class="search-bar">
          <input
            type="text"
            placeholder="Search for Services"
            value={search_}
            onChange={(e) => setSearch_(e.target.value)}
          />

          <button type="submit" className="primary_btn">
            Search
          </button>
        </form>
        <h2>Filters</h2>
        <div className="search_page_filter">
          {filters.map((filter) => (
            <button
              style={{
                backgroundColor:
                  filter.toLowerCase() === _filter ? "#8d021f" : "white",
                color: filter.toLowerCase() !== _filter ? "#8d021f" : "white",
              }}
              className="filter"
              onClick={() => _setFilter(filter.toLowerCase())}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>
      <AllGigs title="Search Result" key={search} />
    </div>
  );
};

const mapStateToProps = (state) => ({
  search: state.searchState,
});

const mapDispatchToProps = (dispatch) => ({
  setSearch: (key) => dispatch(setSearchAPI(key)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage);
