import React from 'react';
import { Link } from 'react-router-dom';

export const Footer = () => {

  return <>
    <div className="footer">
      <Link 
        to="/" 
        className="button-icon footer-button footer-button-search" 
      />
      <Link 
        to="/profile" 
        className="button-icon footer-button footer-button-home" 
      />
    </div>
  </>
} 
