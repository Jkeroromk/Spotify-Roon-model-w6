import React from "react";
import Logo from "../assets/Gray and Black Simple Studio Logo_processed.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const Footer = () => {
  return (
    <section>
    <footer>
        <div className="footer__row">
          <a href="#" className="footer__anchor">
            <figure className="footer__logo">
              <img src={Logo} alt="Logo" className="footer_img" />
            </figure>
            <span className="footer__logo--popper">
              Top
              <FontAwesomeIcon icon="fa-arrow-up" className="footer-arrow" />
            </span>
          </a>
        </div>
        <div className="footer-container">
        <div className="footer__soical--list">
          <a
            href="https://github.com/Jkeroro69"
            className="footer__soical--links link-hover-effect link-hover-effect--white"
            target="_blank"
          >
            Github
          </a>
          <a
            href="https://www.linkedin.com/in/zexin-zou-4b7236155/"
            className="footer__soical--links link-hover-effect link-hover-effect--white"
            target="_blank"
          >
            linkedin
          </a>
          <a
            href="mailto:zzou2000@gmail.com"
            className="footer__soical--links link-hover-effect link-hover-effect--white"
            target="_blank"
          >
            Email
          </a>
          <a
            href="https://discord.gg/UVwaXxK77b"
            className="footer__soical--links link-hover-effect link-hover-effect--white"
            target="_blank"
          >
            Discord
          </a>
        </div>
        <div className="footer__copyright">Copyright © 2024 Zexin Zou</div>
        </div>
    </footer>
    </section>
  );
};

export default Footer;
