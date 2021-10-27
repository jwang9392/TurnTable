import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <a href="https://github.com/jwang9392/TurnTable" className="footer-container-items"><i className="fab fa-github"></i></a>
        <a href="https://www.linkedin.com/in/jason-wang-1425851a4/" className="footer-container-items"><i className="fab fa-linkedin-in"></i></a>
        
        <p>Inspired By: &nbsp;</p>
        <a href="https://www.opentable.com/" className="footer-container-items">OpenTable</a>
      </div>
    </footer>
  )
}

export default Footer;