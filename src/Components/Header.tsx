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
        Exchange Rates
      </NavLink>
      <NavLink
        to="/converter"
        activeClassName="selected"
      >
        Converter Page
      </NavLink>
    </div>
  );
};

export default Header;
