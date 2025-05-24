import React from 'react';
import './Sidebar.css';
import { assets } from '../../assets/assets';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-options">
        <NavLink to="/" className="sidebar-option">
          <img src={assets.statistic_icon} alt="Dashboard" />
          <p>Dashboard</p>
        </NavLink>

        <NavLink to="/add" className="sidebar-option">
          <img src={assets.add_icon} alt="Add Dish" />
          <p>Add Dish</p>
        </NavLink>

        <NavLink to="/list" className="sidebar-option">
          <img src={assets.list_items} alt="Manage Dishes" />
          <p>Manage Dishes</p>
        </NavLink>

        <NavLink to="/orders" className="sidebar-option">
          <img src={assets.order_track} alt="Orders Tracking" />
          <p>Orders Tracking</p>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
