import "../Styles/Gig.css";
export const Gig = ({
  gigImg,
  gigUserName,
  gigProfilePic,
  gigTitle,
  gigAverageRating,
  gigDeliveredProjects,
  gigStartingPrice,
}) => {
  return (
    <div>
      <div className="gig__card_parent">
        <img src={gigImg} />
        <div className="gig__card">
          <div className="user__info__gig">
            <div clsasName="asd">
              <img src={gigProfilePic} />
              <p>{gigUserName}</p>
            </div>
            <div className="heart__icon">
              <img src="./imgs/heart.svg" />
            </div>
          </div>
          <p className="gig_title">{gigTitle}</p>
          <div className="gig_rating_order">
            <img src="./imgs/star.svg" />
            <span className="gig_rating_number">{gigAverageRating}</span>
            <span className="gig_orders_number">({gigDeliveredProjects})</span>
          </div>
          <div className="gig_price">
            <span className="intro__text">Starting at</span>
            <span className="gig_starting_price">{gigStartingPrice}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
