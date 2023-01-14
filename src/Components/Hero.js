import "../Styles/Hero.css";
export const Hero = () => {
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
          <div class="search-bar">
            <input type="text" placeholder="Search for Services" />
            <button className="primary_btn">Search</button>
          </div>
        </div>
      </section>
    </div>
  );
};
