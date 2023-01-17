import React, { useState } from "react";
import "../Styles/Contactus.css";
export const ContactUsPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setFormSubmitted(true);
    setFormData({
      name: "",
      email: "",
      message: "",
    });
  };

  return (
    <div className="contact-us-section">
      <div className="contact-us-form">
        <h1>Send us a Message</h1>
        <form onSubmit={handleSubmit}>
          <label className="contact-us-label">
            <h2> Name:</h2>
            <input
              className="contact-us-input"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </label>
          <label className="contact-us-label">
            <h2> Email:</h2>
            <input
              className="contact-us-input"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </label>
          <label className="contact-us-label">
            <h2> Message:</h2>
            <textarea
              className="contact-us-input contact-us-textarea"
              name="message"
              rows={5}
              value={formData.message}
              onChange={handleInputChange}
              required
            />
          </label>
          <button className="contact-us-submit-btn primary_btn" type="submit">
            Submit
          </button>
        </form>
        {formSubmitted && (
          <div className="contact-us-form-submitted">
            Message sent successfully!
          </div>
        )}
      </div>
      <div className="contact-us-image">
        <img src="/imgs/contact-illus.svg" alt="about illustration" />
      </div>
    </div>
  );
};
