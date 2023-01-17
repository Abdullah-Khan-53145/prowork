import React from "react";
import "../Styles/Aboutus.css";
function AboutusPage() {
  return (
    <div className="about__us__parent">
      <div className="about_info">
        <img src="/imgs/about-illus.svg" />
      </div>
      <div className="about_info">
        <h1 class="about-us-title">About Us</h1>
        <div class="about-us-content">
          <div class="about-us-image">
            <img src="/imgs/logo.png" alt="proWork logo" />
          </div>
          <div class="about-us-text">
            <p>
              proWork is a platform that connects freelancers with clients
              looking for high-quality work. Our mission is to provide a simple
              and efficient way for freelancers to showcase their skills and for
              clients to find the right talent for their projects.
            </p>
            <p>
              We believe that freelancing is the future of work and that the gig
              economy will continue to grow. That's why we're committed to
              making it easy for freelancers to find work and for clients to
              find the right freelancers for their projects.
            </p>
            <p>
              Our team is made up of experienced freelancers and industry
              experts who understand the needs of both clients and freelancers.
              We're constantly working to improve our platform and make it the
              best it can be.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutusPage;
