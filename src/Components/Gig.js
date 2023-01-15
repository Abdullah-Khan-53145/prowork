import "../Styles/Gig.css";
export const Gig = () => {
  return (
    <div>
      <div className="gig__card_parent">
        <img src="https://mllj2j8xvfl0.i.optimole.com/cb:pJlS~36fbd/w:713/h:330/q:90/f:avif/https://s15165.pcdn.co/wp-content/uploads/2019/05/DrawKit.png" />
        <div className="gig__card">
        <div className="user__info__gig">
          <div clsasName="asd">
            <img src="https://via.placeholder.com/300x300.png?text=Dummy+Profile+Picture" />
            <p>User Name</p>
          </div>
          <div className="heart__icon">
            <img src="./imgs/heart.svg" />
          </div>
        </div>
        <p className="gig_title">
          I will create a unique website using Reactjs
        </p>
        <div className="gig_rating_order">
          <img src="./imgs/star.svg" />
          <span className="gig_rating_number">3.0</span>
          <span className="gig_orders_number">(36)</span>
        </div>
        <div className="gig_price">
          <span className="intro__text">Starting at</span>
          <span className="gig_starting_price">PKR 48,077</span>
        </div>
        </div>
      </div>
    </div>
  );
};
