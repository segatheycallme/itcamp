import { FaInstagram } from "react-icons/fa";
import { CiFacebook } from "react-icons/ci";
import { CiTwitter } from "react-icons/ci";
import "./Footer.css";

export default function Footer() {
  return (
    <footer>
      <div className="info">
        <h1>
          <span style={{ color: "#2d74b7" }}>tri</span>
          <span style={{ color: "#e27c1f" }}>va</span>
          <span style={{ color: "#a3171b" }}>go</span>
        </h1>
        <p>Stevana Nemanje 47 Novi Pazar 36300</p>
        <p>063-842-42-88</p>
        <p>hsaladin06@gmail.com</p>
      </div>
      <div className="icons">
        <FaInstagram size="2em" />
        <CiFacebook size="2em" />
        <CiTwitter size="2em" />
      </div>
    </footer>
  );
}
