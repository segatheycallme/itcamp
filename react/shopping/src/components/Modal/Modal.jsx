import "./Modal.css"

export default function Modal({ modal, setModal }) {
  const show = modal.hasOwnProperty("title")
  const title = modal.title //"Are you sure that you want to remove this item from the cart?"
  const actionConfirm = modal.confirm;
  const actionCancel = modal.cancel;

  return (
    <>
      {show ?
        <div className="modal-bg" onClick={(e) => { if (e.target = "div.modal-bg") { setModal({}) } }}>
          <div className="modal">
            <h1>{title}</h1>
            <div className="buttons">
              <button style={{ background: "#aaa" }} onClick={actionConfirm}>Yes</button>
              <button style={{ background: "#f00" }} onClick={actionCancel}>No</button>
            </div>
          </div>
        </div>
        :
        <div />
      }
    </>
  )
}
