import React from 'react';
import logo from '../logo.svg';
import '../css/menu.scss';
import '../css/music.scss';

const Menu = ({ menus }) => (
  <div className= "Menu">
    <div className= "left-area">
      <img src={logo} className="meet-logo" alt="Meet logo" />
    </div>
    <div className= "right-area">
      <ul>
        {menus.map((menu, idx) => (
          <li key={idx}>
            <a href={menu.url}>{menu.text}</a>
          </li>
        ))}
      </ul>
    </div>
  </div>
);
export default Menu;
