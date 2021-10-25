import React from 'react';
import {
  NavLink,
} from 'react-router-dom'

const Header = () => {
  return (
    <div>
      <NavLink
        to="/exchange"
        activeClassName="selected"
      >
        Exchange
      </NavLink>
      <NavLink
        to="/converter"
        activeClassName="selected"
      >
        Converter page
      </NavLink>
    </div>
  );
};

export default Header;
