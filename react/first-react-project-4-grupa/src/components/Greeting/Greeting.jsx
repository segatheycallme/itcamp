import "./Greeting.css";

function Greeting(props) {
  return (
    <div className="greeting-wrapper">
      {/* eslint-disable-next-line react/prop-types */}
      <h1 className="greeting-title">Dobro dosli na {props.appName}</h1>
      {/* eslint-disable-next-line react/prop-types */}
      <h2 className="greeting-subtitle ">{props.fullName}</h2>
    </div>
  );
}

export default Greeting;
