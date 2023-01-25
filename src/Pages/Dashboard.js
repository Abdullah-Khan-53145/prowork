import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  collection,
  query,
  where,
  getDocs,
  setDoc,
  addDoc,
  getDoc,
  doc,
  onSnapshot,
  orderBy,
} from "firebase/firestore";
import { storage, db } from "../firebase";
import { Gig } from "../Components/Gig";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import "../Styles/Dashboard.css";

const Dashboard = ({ user, AllGigs }) => {
  const navigate = useNavigate();
  const [chatOpen, setChatOpen] = useState(false);
  const [newGig, setNewGig] = useState(false);
  const [chats, setChats] = useState([]);
  const [frd, setFrd] = useState(-1);
  const [messages, setMessages] = useState([]);

  const [OrderModal, setOrderModal] = useState({
    status: false,
    data: {},
  });
  const [orders, setOrders] = useState([]);
  const [purchase, setPurchase] = useState([]);
  const [finalFile, setFinalFile] = useState(null);
  const [loading, setLoading] = useState(null);
  const [mesg, setMesg] = useState("");

  const [CosOrderModal, setCosOrderModal] = useState({
    status: false,
    data: {},
  });
  const [myGigs, setMyGigs] = useState(AllGigs);
  const [reviewInfo, setReviewInfo] = useState({
    rating: "",
    review: "",
  });

  const friends = [
    { name: "John Doe", profilePic: "/imgs/dummy-pic.svg" },
    { name: "Jane Smith", profilePic: "/imgs/dummy-pic.svg" },
  ];
  const handleSubmit = async (e) => {
    e.preventDefault();

    const docRef = await addDoc(
      collection(db, "messages" + "/" + chats[frd].id + "/" + "msgs"),
      {
        sender: user.email.split("@")[0],
        text: mesg,
        index: messages.length,
      }
    );
    console.log("Document written with ID: ", docRef.id);
    setMesg("");
    e.target.scrollTo({ bottom: 0, behavior: "smooth" });
    // e.target.scrollTop = e.target.scrollHeight;
    console.log({
      sender: user.email.split("@")[0],
      message: mesg,
      index: messages.length,
    });
  };
  // const messages = [
  //   { text: "Hey, how's it going?", sender: "John Doe", color: "#8d021f" },
  //   {
  //     text: "I'm good, thanks for asking! How about you?",
  //     sender: "Me",
  //     color: "#ca323f",
  //   },
  // ];

  const getChats = async () => {
    const q = query(collection(db, "messages"));
    let chatarr = [];
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      if (
        doc.data()?.users[0].username === user.email.split("@")[0] ||
        doc.data()?.users[1].username === user.email.split("@")[0]
      ) {
        chatarr.push({
          id: doc.id,
          otherUser:
            doc.data()?.users[0].username === user.email.split("@")[0]
              ? doc.data()?.users[1].username
              : doc.data()?.users[0].username,
          otherUserProfile:
            doc.data()?.users[0].username === user.email.split("@")[0]
              ? doc.data()?.users[1].profile_pic
              : doc.data()?.users[0].profile_pic,
        });
      }
      // doc.data() is never undefined for query doc snapshots
    });
    setChats(chatarr);
  };
  const handleOpenOrder = (order) => {
    setOrderModal({ status: true, data: order });
    console.log(order);
    setChatOpen(!chatOpen);
  };

  const getOrders = async () => {
    let orderarr = [];
    const q = query(collection(db, "orders"), where("buyuid", "==", user.uid));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      orderarr.push({
        ...doc.data(),
        id: doc.id,
      });
      console.log(doc.id, " => ", doc.data());
    });
    setOrders(orderarr.filter((order) => order.status === "pending"));
  };
  const getPurchase = async () => {
    let orderarr = [];
    const q = query(collection(db, "orders"), where("cosuid", "==", user.uid));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      orderarr.push({
        ...doc.data(),
        id: doc.id,
      });
      console.log(doc.id, " => ", doc.data());
    });
    setPurchase(orderarr);
  };
  const addReview = async (e, gigId) => {
    e.preventDefault();
    const docRef = doc(db, "gigs", gigId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      await setDoc(doc(db, "gigs", gigId), {
        ...docSnap.data(),
        reviews: [
          ...docSnap.data().reviews,
          {
            ...reviewInfo,
            username: user.email.split("@")[0],
          },
        ],
      });
      setReviewInfo({
        rating: "",
        review: "",
      });
      setCosOrderModal({ status: false, data: "" });
    } else {
      console.log("No such document!");
    }
  };

  const deliverOrder = (e, order) => {
    e.preventDefault();
    setLoading(true);
    const metadata = {
      contentType: ".zip,.rar,.7zip",
    };

    const storageRef = ref(storage, "orders/" + finalFile.name);
    const uploadTask = uploadBytesResumable(storageRef, finalFile, metadata);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      (error) => {
        console.log(error.code);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          console.log("File available at", downloadURL);

          await setDoc(doc(db, "orders", order.id), {
            ...order,
            delivery_file: downloadURL,
            status: "done",
          });
          setLoading(false);
        });
      }
    );
  };
  const handleChange = (e) => {
    let File = e.target.files[0];
    if (File === "" || File === undefined) {
      return;
    }
    setFinalFile(File);
  };
  useEffect(() => {
    setMyGigs(AllGigs.filter((gig) => gig.uid === user.uid));
    getOrders();
    getChats();
    getPurchase();
  }, [AllGigs]);
  const getMessages = (id) => {
    const q = query(
      collection(db, "messages" + "/" + id + "/" + "msgs"),
      orderBy("index")
    );
    const real = onSnapshot(q, (querySnapshot) => {
      setMessages(querySnapshot.docs.map((doc) => doc.data()));
    });
  };

  return (
    <>
      <div
        style={{ display: OrderModal.status ? "block" : "none" }}
        className="dashboard-delivery-modal-background"
      >
        <div class="dashboard-delivery-modal">
          <div class="dashboard-delivery-modal-content">
            <div class="dashboard-delivery-modal-header">
              <span
                onClick={() => setOrderModal({ status: false, data: "" })}
                class="dashboard-delivery-close-button"
              >
                &times;
              </span>
              <h2>Delivery Details</h2>
            </div>
            <div class="dashboard-delivery-modal-body">
              <p>
                <b>Gig Package:</b>
                <span class="dashboard-delivery-gig-package">
                  {OrderModal.data.gig_package}
                </span>
              </p>
              <p>
                <b>Customer Name:</b>
                <span class="dashboard-delivery-customer-name">
                  {OrderModal.data.costomer_name}
                </span>
              </p>
              <hr />
              <div class="dashboard-delivery-customer-description-dominate">
                Customer Description:
                <br />
                <span class="dashboard-delivery-customer-description">
                  {OrderModal.data.costomer_description}
                </span>
              </div>
              <hr />
            </div>
            <form
              onSubmit={(e) => deliverOrder(e, OrderModal.data)}
              class="dashboard-delivery-modal-footer"
            >
              <p>
                Upload delivery files(Upload a ZIP file):
                <input
                  type="file"
                  class="dashboard-delivery-delivery-files"
                  accept=".zip,.rar,.7zip"
                  onChange={handleChange}
                  required
                />
              </p>
              <button class="dashboard-delivery-delivery-button" type="submit">
                {loading ? (
                  <a>
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
                  </a>
                ) : (
                  <a>Deliver</a>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
      <div
        style={{ display: CosOrderModal.status ? "block" : "none" }}
        className="dashboard-delivery-modal-background"
      >
        <div class="dashboard-delivery-modal">
          <div class="dashboard-delivery-modal-content">
            <div class="dashboard-delivery-modal-header">
              <span
                onClick={() => setCosOrderModal({ status: false, data: "" })}
                class="dashboard-delivery-close-button"
              >
                &times;
              </span>
              <h2>
                {CosOrderModal.data.status === "pending"
                  ? "ORDER NOT READY"
                  : "ORDER READY"}
              </h2>
            </div>
            <div class="dashboard-delivery-modal-body">
              <p>
                <b>Download Files</b>
              </p>
              <button
                class="dashboard-delivery-delivery-button"
                type="submit"
                disabled={CosOrderModal.data.status === "pending"}
              >
                <a
                  href={
                    CosOrderModal.data.status === "pending"
                      ? "#"
                      : CosOrderModal.data.delivery_file
                  }
                  download={!CosOrderModal.data.status === "pending"}
                >
                  Download
                </a>
              </button>

              <hr />
              <div class="dashboard-delivery-customer-description-dominate">
                Add a Review
                <br />
                <span class="dashboard-delivery-customer-description">
                  {CosOrderModal.data.costomer_description}
                </span>
              </div>
              <hr />
            </div>
            <form
              onSubmit={(e) => addReview(e, CosOrderModal.data.gig_id)}
              class="dashboard-delivery-modal-footer"
            >
              <p className="costomer_input">
                Rating
                <br />
                <input
                  type="number"
                  max="5"
                  min="0"
                  value={reviewInfo.rating}
                  onChange={(e) =>
                    setReviewInfo({ ...reviewInfo, rating: e.target.value })
                  }
                  class="dashboard-delivery-delivery-files"
                  required
                />
              </p>
              <p className="costomer_review costomer_input">
                Review
                <br />
                <textarea
                  type="text"
                  rows={3}
                  value={reviewInfo.review}
                  onChange={(e) =>
                    setReviewInfo({ ...reviewInfo, review: e.target.value })
                  }
                  class="dashboard-delivery-delivery-files"
                  required
                />
              </p>
              <button
                class="dashboard-delivery-delivery-button"
                type="submit"
                disabled={CosOrderModal.data.status === "pending"}
              >
                <a>Save Review</a>
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className="dashboard_container">
        <div className="dashboard_right-sidebar">
          <div className="dashboard_friends-list">
            {chats.map((chat, index) => (
              <button
                key={index}
                className="dashboard_friend"
                onClick={() => {
                  setFrd(index);
                  getMessages(chat.id);
                }}
                style={{
                  border: frd === index ? "1px solid lightgray" : "none",
                  cursor: "pointer",
                }}
              >
                <img src={chat.otherUserProfile} alt={chat.name} />
                <span>{chat.otherUser}</span>
              </button>
            ))}
          </div>
          <div className="dashboard_orders">
            <h2>My Purchased Orders</h2>
            <div className="dashboard_order-list">
              {purchase.map((order, index) => (
                <div
                  class="dashboard-card"
                  onClick={() =>
                    setCosOrderModal({ status: true, data: order })
                  }
                >
                  <div class="dashboard-card-header">
                    <h2 class="dashboard-card-title">{order.gig_title}</h2>
                  </div>
                  <div class="dashboard-card-body">
                    <p class="dashboard-card-text">
                      Order Date:{" "}
                      <span class="dashboard-delivery-days">
                        {order.order_date}
                      </span>
                    </p>
                    <p class="dashboard-card-text">
                      Delivery Date:{" "}
                      <span class="dashboard-delivery-days">
                        {order.delivery_date}
                      </span>
                    </p>
                    <p class="dashboard-card-text">
                      Status:{" "}
                      <span class="dashboard-delivery-days">
                        {order.status}
                      </span>
                    </p>
                  </div>
                </div>
              ))}{" "}
            </div>
          </div>
        </div>

        <div className="dashboard_chat-box">
          <div className="dashboard_messages">
            {messages.map((message, index) => (
              <div className="dashboard_mid">
                <div
                  key={index}
                  className="dashboard_message"
                  style={{
                    color: message.color,
                    alignItems:
                      message.sender === user.email.split("@")[0]
                        ? "flex-end"
                        : "flex-start",
                  }}
                >
                  <span>{message.sender}</span> <p> {message.text}</p>
                </div>
              </div>
            ))}
          </div>
          <form onSubmit={handleSubmit} class="dashboard_message-form">
            <div class="dashboard_message-input-container">
              <input
                type="text"
                value={mesg}
                onChange={(e) => setMesg(e.target.value)}
                placeholder="Type your message here"
                class="dashboard_message-input"
              />
              <button type="submit" class="dashboard_send-message-button">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="dashboard_send-icon"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                  />
                </svg>
              </button>
            </div>
          </form>
        </div>

        <div className="dashboard_main-content">
          <div className="dashboard_orders">
            <h2>Orders</h2>
            <div className="dashboard_order-list">
              {orders.map((order, index) => (
                <div
                  class="dashboard-card"
                  onClick={() => handleOpenOrder(order)}
                >
                  <div class="dashboard-card-header">
                    <h2 class="dashboard-card-title">{order.gig_title}</h2>
                  </div>
                  <div class="dashboard-card-body">
                    <p class="dashboard-card-text">
                      Costomer Name:{" "}
                      <span class="dashboard-delivery-days">
                        {order.costomer_name}
                      </span>
                    </p>
                    <p class="dashboard-card-text">
                      Package:{" "}
                      <span class="dashboard-delivery-days">
                        {order.gig_package}
                      </span>
                    </p>

                    <p class="dashboard-card-text">
                      Order price:{" "}
                      <span class="dashboard-order-price">{order.price}</span>
                    </p>
                  </div>
                </div>
              ))}{" "}
            </div>
          </div>
          <div className="dashboard_my-gigs">
            <h2>My Gigs</h2>
            <div className="dashboard_gig-list">
              {myGigs.map((gig, index) => {
                if (user.uid === gig.uid) {
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
                }
              })}
            </div>
            <button
              disabled={myGigs.length >= 3}
              className="dashboard_add-gig-button"
              onClick={() => navigate("/make-a-gig")}
            >
              + Add New Gig
            </button>
          </div>
          {newGig && (
            <div className="dashboard_new-gig-form">
              {/* form to add a new gig */}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  user: state.userState.user,
  AllGigs: state.AllGigsState,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
