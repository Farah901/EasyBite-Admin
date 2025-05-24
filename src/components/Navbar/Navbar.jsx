import "./Navbar.css";
import { assets } from "../../assets/assets";
import {Link} from 'react-router-dom'
const Navbar = () => {
  // Empty dependency array to run the effect only once
  return (
    <div>
      <div className="navbar">
          <Link to='/'><img className="logo" src={assets.logo} alt="" />
</Link>
        <div className="search-items">
          <i className="bi bi-search"></i>
          <input
            type="text"
            placeholder="Search ..."
            id="input-saerch"
          />
        </div>
        <div className="icons">
          <div className="msg-icon-container">
            <img className="msg-icon" src={assets.msg_icon} alt="" />
            <i></i>
          </div>
          <img className="profile" src={assets.profile_image} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
