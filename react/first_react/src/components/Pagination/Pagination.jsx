import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import "./Pagination.css";
import { useEffect } from "react";

export default function Navbar(props) {
  const arr = [];
  for (let i = 0; i < props.numPages; i++) {
    arr.push(i + 1)
  }

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth"
    })
  }, [props.currentPage])

  return (
    <div className="pagination">
      <button className="pag-button" disabled={props.currentPage <= 1} onClick={() => {
        props.setCurrentPage(props.currentPage - 1)
      }}><FaArrowLeft style={{ color: props.currentPage <= 1 ? "#666" : "#000" }} /></button>
      {arr.map((num) => {
        return <button
          className={num == props.currentPage ? "pag-button current" : "pag-button"}
          onClick={() => {
            props.setCurrentPage(num)
          }}><span>{num}</span></button>
      })}
      <button className="pag-button" disabled={props.currentPage >= props.numPages} onClick={() => {
        props.setCurrentPage(props.currentPage + 1)
      }}><FaArrowRight style={{ color: props.currentPage >= props.numPages ? "#666" : "#000" }} /></button>
    </div>
  );
}
