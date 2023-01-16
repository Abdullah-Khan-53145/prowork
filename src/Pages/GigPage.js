import { useParams } from "react-router-dom";
import Loading from "../Components/Loading";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useEffect, useState } from "react";
import "../Styles/GigPage.css";
export const GigPage = () => {
  const packages = ["Basic", "Standard", "Gold"];
  const [gig, setGig] = useState(null);
  const [selPack, setSelPack] = useState(0);

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
  useEffect(() => {
    window.scrollTo(0, 0);
    getGig();
  }, []);
  return (
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
                <button className="primary_btn">Purchase</button>
              </div>
              <button className="secondary_btn">Contact Seller</button>
            </div>
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
};
