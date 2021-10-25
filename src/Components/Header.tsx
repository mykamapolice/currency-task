import React from 'react';
import {
  NavLink,
} from 'react-router-dom'
import {Menu} from "antd";

const Header = () => {
  return (
    <div className='header'>
      <Menu  mode="horizontal">
        <Menu.Item key="exchange">
          <NavLink
            to="/exchange"
            activeClassName="selected"
          >
            Exchange Rates
          </NavLink>
        </Menu.Item>
        <Menu.Item key="converter">
          <NavLink
            to="/converter"
            activeClassName="selected"
          >
            Converter Page
          </NavLink>
        </Menu.Item>
      </Menu>
    </div>
  );
};

export default Header;
