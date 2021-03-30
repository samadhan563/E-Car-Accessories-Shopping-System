import React from 'react';
import {
  Nav,
  NavLink,
  Bars,
  NavMenu,
  NavBtn,
  NavBtnLink
} from './NavbarElements';
import logo from "../logo.jpg"

const Navbar = () => {
  return (
    <>
      <Nav>
        <NavLink to='/admin'>
          <img src={logo} alt='logo' class="img-fluid"
            alt="Logo"
            width="90px"
            height="90px" />
        </NavLink>
        <Bars />
        <NavMenu >
          <NavLink to='/all-category' activeStyle>
           <h6 > List Category</h6>
        </NavLink>
          <NavLink to='/products' activeStyle>
          <h6>List  Products</h6>
          </NavLink>
          <NavLink to='/list' activeStyle>
          <h6> List Users</h6>
          </NavLink>
          <NavLink to='/order-list' activeStyle>
          <h6>Orders List</h6>
          </NavLink>
          <NavLink to='/logout' activeStyle>
          <h6> Sign Out</h6>
          </NavLink>
        </NavMenu>
        <NavBtn>
          <NavBtnLink to='/logout'>Sign Out</NavBtnLink>
        </NavBtn>
      </Nav>
    </>
  );
};

export default Navbar;
