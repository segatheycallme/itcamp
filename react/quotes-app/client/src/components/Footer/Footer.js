import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <div className="footer">
      <hr className="line" />
      <p className="footerp">More about our Authors:</p>
      <div className="footer-authors">
        <a
          href="https://www.britannica.com/biography/Oscar-Wilde"
          className="aauthor"
          target="_blank"
          rel="noreferrer"
        >
          Oscar Wilde
        </a>
        <a
          href="https://www.britannica.com/biography/Albert-Einstein"
          className="aauthor"
          target="_blank"
          rel="noreferrer"
        >
          Albert Einstein
        </a>
        <a
          href="https://www.britannica.com/biography/Frank-Zappa"
          className="aauthor"
          target="_blank"
          rel="noreferrer"
        >
          Frank Zappa
        </a>
        <a
          href="https://www.britannica.com/biography/Robert-Frost"
          className="aauthor"
          target="_blank"
          rel="noreferrer"
        >
          Robert Frost
        </a>
        <a
          href="https://www.britannica.com/biography/Mae-West"
          className="aauthor"
          target="_blank"
          rel="noreferrer"
        >
          Mae West
        </a>
        <a
          href="https://www.britannica.com/biography/Cicero"
          className="aauthor"
          target="_blank"
          rel="noreferrer"
        >
          Marcus Tullius Cicero
        </a>
        <a
          href="https://www.britannica.com/biography/Mahatma-Gandhi"
          className="aauthor"
          target="_blank"
          rel="noreferrer"
        >
          Mahatma Gandhi
        </a>
      </div>
      <div className="footer-end">
        <p>Dženan Košuta</p>
        <p>© Copyright 2022</p>
        <p>
          View other projects on
          <a
            href="https://github.com/dzenankosuta?tab=repositories"
            target="_blank"
            rel="noreferrer"
            style={{ position: "relative", top: ".4rem", left: ".5rem" }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-brand-github svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="#009988"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M9 19c-4.3 1.4 -4.3 -2.5 -6 -3m12 5v-3.5c0 -1 .1 -1.4 -.5 -2c2.8 -.3 5.5 -1.4 5.5 -6a4.6 4.6 0 0 0 -1.3 -3.2a4.2 4.2 0 0 0 -.1 -3.2s-1.1 -.3 -3.5 1.3a12.3 12.3 0 0 0 -6.2 0c-2.4 -1.6 -3.5 -1.3 -3.5 -1.3a4.2 4.2 0 0 0 -.1 3.2a4.6 4.6 0 0 0 -1.3 3.2c0 4.6 2.7 5.7 5.5 6c-.6 .6 -.6 1.2 -.5 2v3.5" />
            </svg>
          </a>
        </p>
      </div>
    </div>
  );
};

export default Footer;
