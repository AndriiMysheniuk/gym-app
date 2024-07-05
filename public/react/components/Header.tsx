import classNames from 'classnames';
import React, { useState } from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom'
import { Exercise } from '../types/Exercise';

type Props = {
  setIsWishlistActive: (value: boolean) => void
  isWishlistActive: boolean
  wishlist: Exercise[] | null
}

export const Header: React.FC<Props> = ({ setIsWishlistActive, isWishlistActive, wishlist }) => {

  /* const getLinkClass = () => classNames('nav-link', {
    'nav-link-active': isActive
  })
  */

  return <>
    <div className="header">
      <Link to="/" className="header-logo" />

      <div className="header-nav-cart">
        {/*      
        <NavLink to='/' className={getLinkClass}>
            Pages
        </NavLink>
        <NavLink to='/form' className={getLinkClass}>
          Form
        </NavLink>
        <NavLink to='/item' className={getLinkClass}>
          Item
        </NavLink>
        */}
        <Link to="/registration" className="header-button button-add-item">
          Log In
        </Link>
        <Link to="/wishlist" className="header-button-wishlist">
          {wishlist?.length}
        </Link>
      </div>
    </div>
  </>
} 
