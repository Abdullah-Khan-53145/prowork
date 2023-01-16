import { setSearchAPI } from "../actions";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import "../Styles/Services.css";

const data = [
  {
    icon: "./imgs/card-1.svg",
    title: "Advanced matching algorithm",
    description:
      "Our freelancing platform utilizes an advanced matching algorithm that takes into account various factors such as skills, experience, and project history to connect businesses with the most suitable freelancers for their needs. This ensures that businesses are able to find the best talent for their projects, while freelancers are able to find relevant and high-paying job opportunities.",
  },
  {
    icon: "./imgs/card-2.svg",
    title: "Seamless collaboration tools",
    description:
      "Our platform offers a variety of collaboration tools such as project management, file sharing, and real-time communication, which allows for a smooth and seamless workflow, making it easy for businesses and freelancers to stay on track and meet deadlines.",
  },
  {
    icon: "./imgs/card-3.svg",
    title: "Dedicated support team",
    description:
      "Our platform has a dedicated support team that is available to assist businesses and freelancers with any issues or questions they may have, they are available 24/7 and can be reached through live chat, phone, and email. This ensures that businesses and freelancers have access to the support they need to succeed on our platform.",
  },
  {
    icon: "./imgs/card-4.svg",
    title: "Payment protection",
    description:
      "Our platform has a secure payment system that ensures that freelancers are paid promptly and businesses are protected from fraud, it also offer escrow service for larger projects",
  },
  {
    icon: "./imgs/card-5.svg",
    title: "Review and rating system",
    description:
      "Our platform allows freelancers and businesses to leave reviews and ratings for each other, which helps other users to make informed decisions when choosing who to work with.",
  },
  {
    icon: "./imgs/card-6.svg",
    title: "Customized search filter",
    description:
      "Our platform allows businesses to filter the search results by skills, experience, location, and other criteria, which makes it easy for them to find the best freelancers for their projects.",
  },
];
const Services = ({ search, setSearch }) => {
  const filters = [
    "All",
    "Web Development",
    "Mobile Development",
    "AI Development",
    "Game Development",
  ];
  const [_filter, _setFilter] = useState("all");
  useEffect(() => {
    setSearch({ ...search, filter: _filter });
  }, [_filter]);
  return (
    <div className="services__parent">
      <section className="services__child">
        <div className="services__Heading">
          <div>
            <h1>
              Stand out from the crowd with our innovative approach to
              freelancing
            </h1>
            <div>
              {filters.map((filter) => (
                <button
                  style={{
                    backgroundColor:
                      filter.toLowerCase() === _filter
                        ? "#8d021f"
                        : "transparent",
                    color:
                      filter.toLowerCase() !== _filter ? "#8d021f" : "white",
                  }}
                  className="filter"
                  onClick={() => _setFilter(filter.toLowerCase())}
                >
                  {filter}
                </button>
              ))}
            </div>
            <Link to="/search-gig" className="primary_btn">
              Search By filters
            </Link>
          </div>
        </div>
        <div className="services__card">
          {data.map((service) => (
            <div className="card">
              <img src={service.icon} />
              <h2>{service.title}</h2>
              <p>{service.description}</p>
            </div>
          ))}
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

export default connect(mapStateToProps, mapDispatchToProps)(Services);
