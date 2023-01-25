import { useNavigate, useParams } from "react-router-dom";
import Loading from "../Components/Loading";
import { doc, getDoc, collection, getDocs, addDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import "../Styles/GigPage.css";
import { setChatAPI } from "../actions";
const GigPage = ({ user }) => {
  const packages = ["Basic", "Standard", "Gold"];
  const [gig, setGig] = useState(null);
  const [selPack, setSelPack] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [customerInfo, setCustomerInfo] = useState({
    description: "",
  });
  const [cardInfo, setCardInfo] = useState({
    cardNumber: "",
    cvc: "",
    expirationDate: "",
  });
  const { id } = useParams();
  const getGig = async () => {
    const docRef = doc(db, "gigs", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      setGig(docSnap.data());
    } else {
      console.log("No such document!");
    }
  };
  // Functions
  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCustomerInfo({ ...customerInfo, [name]: value });
  };

  const handleCardInputChange = (event) => {
    const { name, value } = event.target;
    setCardInfo({ ...cardInfo, [name]: value });
  };
  const placeOrder = async () => {
    const docRef = await addDoc(collection(db, "orders"), {
      gig_package: packages[selPack],
      costomer_name: user.displayName,
      cosuid: user.uid,
      buyuid: gig.uid,
      costomer_description: customerInfo.description,
      order_date: getFinalDate(0),
      devlivery_date: getFinalDate(
        parseInt(gig.packages[selPack].delivery_time.split(" ")[0])
      ),
      gig_id: id,
      status: "pending",
      delivery_file: "",
    });
    console.log("Document written with ID: ", docRef.id);
    setLoading(true);
    setIsOpen(false);
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    setLoading(true);
    // Validation for card details
    if (!/^\d{16}$/.test(cardInfo.cardNumber)) {
      setError("Please enter a valid card number");
    } else if (!/^\d{3}$/.test(cardInfo.cvc)) {
      setError("Please enter a valid CVC");
    } else if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(cardInfo.expirationDate)) {
      setError("Please enter a valid expiration date (MM/YY)");
    } else {
      // Place order and close modal
      placeOrder();
    }
  };
  Date.prototype.addDays = function (days) {
    this.setDate(this.getDate() + parseInt(days));
    return this;
  };
  const getDate = (dateObj) => {
    var today = dateObj;
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = today.getFullYear();

    today = mm + "/" + dd + "/" + yyyy;
    return today;
  };
  const getFinalDate = (daysToAdd) => {
    var currentDate = new Date();
    currentDate.addDays(daysToAdd);
    return getDate(currentDate);
  };
  console.log(getFinalDate(0));
  const handleContact = async () => {
    console.log("clicked", `${user.uid}`);
    const querySnapshot = await getDocs(collection(db, `messages`));
    querySnapshot.forEach(async (doc) => {
      console.log("index");
      if (
        doc.data()?.users[0].username === gig.username ||
        doc.data()?.users[1].username === gig.username
      ) {
        navigate("/user-dashboard");
      } else {
        const docRef = await addDoc(collection(db, "messages"), {
          users: [
            { username: user.email.split("@")[0], profile_pic: user.photoURL },
            { username: gig.username, profile_pic: gig.profile_pic },
          ],
          messages: [],
        });
        console.log("Document written with ID: ", docRef.id);
        navigate("/user-dashboard");
      }
    });
  };
  // use Effect
  useEffect(() => {
    window.scrollTo(0, 0);
    getGig();
  }, []);
  return (
    <>
      {isOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2 className="modal-title">Place Order</h2>
            <form onSubmit={handlePlaceOrder}>
              <label className="modal-label">
                Order Description
                <textarea
                  required
                  className="modal-input modal-textarea"
                  name="description"
                  value={customerInfo.description}
                  onChange={handleInputChange}
                />
              </label>
              <hr className="modal-hr" />
              <label className="modal-label">
                Card Number
                <input
                  required
                  className="modal-input"
                  type="text"
                  name="cardNumber"
                  value={cardInfo.cardNumber}
                  onChange={handleCardInputChange}
                />
              </label>
              <div className="modal-card-cvc-date">
                <label className="modal-label">
                  CVC
                  <input
                    required
                    className="modal-input"
                    type="text"
                    name="cvc"
                    value={cardInfo.cvc}
                    onChange={handleCardInputChange}
                  />
                </label>
                <label className="modal-label">
                  Expiration Date
                  <input
                    required
                    className="modal-input"
                    type="text"
                    name="expirationDate"
                    value={cardInfo.expirationDate}
                    onChange={handleCardInputChange}
                  />
                </label>
              </div>
              <span className="modal_error">{error}</span>
              <div className="modal-buttons">
                <button className="primary_btn" type="submit">
                  {loading ? (
                    <>
                      <div class="btn-loading-animation">
                        <div
                          style={{ background: "#ca323f" }}
                          class="btn-loading-bar"
                        ></div>
                        <div
                          style={{ background: "#ca323f" }}
                          class="btn-loading-bar"
                        ></div>
                        <div
                          style={{ background: "#ca323f" }}
                          class="btn-loading-bar"
                        ></div>
                        <div
                          style={{ background: "#ca323f" }}
                          class="btn-loading-bar"
                        ></div>
                      </div>
                    </>
                  ) : (
                    "Place Order"
                  )}
                </button>
                <button className="primary_btn" onClick={handleClose}>
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      <div className="gig__page__parent">
        {gig ? (
          <div className="gig__page__child">
            <div className="gig__info">
              <span className="category">{gig.gig_cat}</span>
              <h1 className="buyer__gig__title">{gig.gig_title}</h1>
              <div className="buyer__info">
                <img src={gig.profile_pic} />
                <span className="buyer__username">{gig.username}n</span>
                <span className="buyer__rating">
                  <img src="/imgs/star.svg" />
                  <img src="/imgs/star.svg" />
                  <img src="/imgs/star.svg" />
                  <img src="/imgs/star.svg" />
                  <img src="/imgs/star.svg" />
                  <span className="buyer__average_rating">
                    {gig.average_rating}
                  </span>
                  <span className="buyer__delivered__orders">
                    ({gig.delivered_projects})
                  </span>
                </span>
              </div>
              <div className="gig__cover__img">
                <img src={gig.gig_img} />
              </div>
              <div className="Description">
                <h2 className="buyer__gig__heading">Description</h2>
                <p>{gig.gig_description}</p>
              </div>
              <div className="Reviews">
                <h2 className="buyer__gig__heading">Reviews</h2>
                <div className="costomer__all__reviews">
                  {gig.reviews.map((review) => (
                    <div className="costomer__reviews">
                      <h3>{review.username}</h3>
                      <span className="buyer__rating">
                        <img src="/imgs/star.svg" />
                        <img src="/imgs/star.svg" />
                        <img src="/imgs/star.svg" />
                        <img src="/imgs/star.svg" />
                        <img src="/imgs/star.svg" />
                        <span className="buyer__average_rating">
                          {review.rating}
                        </span>
                      </span>
                      <p>{review.review}</p>
                    </div>
                  ))}
                </div>
              </div>

              <button className="primary_btn">Contact Me</button>
            </div>
            <div className="gig__packages__parent">
              <div className="gig__packages__child">
                <div className="gig__packages__card">
                  <div className="packages__options">
                    {packages.map((pack, index) => (
                      <h3
                        style={{
                          borderBottom:
                            selPack === index ? "3px solid #8d021f" : "",
                          fontWeight: selPack === index ? "600" : "",
                          color: selPack === index ? "#8d021f" : "",
                        }}
                        onClick={() => setSelPack(index)}
                      >
                        {pack}
                      </h3>
                    ))}
                  </div>
                  <div className="price">
                    <h3>Price</h3>
                    <p>{gig.packages[selPack].price}</p>
                  </div>
                  <div className="description">
                    {gig.packages[selPack].description}
                  </div>
                  <div className="dev__time">
                    <img src="/imgs/clock.svg" />
                    <span>{gig.packages[selPack].delivery_time} delivery</span>
                  </div>
                  {!user && (
                    <span
                      style={{
                        margin: "0 3rem",
                        color: "red",
                        fontWeight: "600",
                      }}
                    >
                      Login before Purchasing or Contact
                    </span>
                  )}
                  <button
                    className="primary_btn"
                    onClick={handleOpen}
                    disabled={!user}
                  >
                    Purchase
                  </button>
                </div>
                <button onClick={handleContact} className="secondary_btn">
                  Contact Seller
                </button>
              </div>
            </div>
          </div>
        ) : (
          <Loading />
        )}
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  user: state.userState.user,
});

const mapDispatchToProps = (dispatch) => ({
  setChat: (payload) => dispatch(setChatAPI(payload)),
});
export default connect(mapStateToProps, mapDispatchToProps)(GigPage);
