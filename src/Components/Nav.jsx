import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";


const Nav = () => {
  return (
    <>
    <section id="Landing-page">
      <nav>
        <figure><FontAwesomeIcon icon="fa-brands fa-spotify" className="spotify-logo"/></figure>
        <ul className="nav-links-list">
          <li className="nav-link"><a href="" className="nav-link-anchor link-hover-effect link-hover-effect-black link-hover-effect--white no-cursor">Home</a></li>
          <li className="nav-link"><a href="" className="nav-link-anchor link-hover-effect link-hover-effect-black link-hover-effect--white no-cursor">Find Featured Songs</a></li>
          <li className="nav-link"><a href="" className="nav-link-anchor link-hover-effect link-hover-effect-black link-hover-effect--white no-cursor">Log in</a></li>
          <button className="btn_menu"><FontAwesomeIcon icon="fa-solid fa-caret-down" /></button>
          <li className="nav-link"><a href=""><FontAwesomeIcon icon="fa-solid fa-circle-half-stroke" spin/></a></li>
        </ul>
      </nav>
      </section>
    </>
  );
};

export default Nav;
