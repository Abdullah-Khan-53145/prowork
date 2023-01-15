import "../Styles/Footer.css";
export const Footer = () => {
  return (
    <footer>
      <div class="categories">
        <img src="./imgs/logo.png" />
        <div className="footer__text">
          <ul>
            <b>Important Links</b>
            <li>
              <a href="#">Home</a>
            </li>
            <li>
              <a href="#">About</a>
            </li>
            <li>
              <a href="#">Services</a>
            </li>
            <li>
              <a href="#">Contact</a>
            </li>
          </ul>
          <ul>
            <b>Categories</b>
            <li>
              <a href="#">Web Development</a>
            </li>
            <li>
              <a href="#">Mobile Development</a>
            </li>
            <li>
              <a href="#">Cross Platform Development</a>
            </li>
            <li>
              <a href="#">Desktop Development</a>
            </li>
          </ul>
        </div>
      </div>
      <div class="copyright">Copyright © 2022 My Website</div>
    </footer>
  );
};
