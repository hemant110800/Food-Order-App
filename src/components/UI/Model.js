import ReactDOM from "react-dom";
import './Model.css';
const Backdrop = (props) => {
    return (
    <div className="backdrop" onClick={props.onClick}></div>
    )
}

const ModelOverlay = (props) => {
    return (
        <div className="modal">
          {props.children}
        </div>
    )
}

const Modal = (props) => {
    return (
        <div>
            {ReactDOM.createPortal(<Backdrop onClick = {props.hide_modal}/>, document.getElementById("modal_BackdropContainer"))}
            {ReactDOM.createPortal(<ModelOverlay>{props.children}</ModelOverlay>, document.getElementById("modal_overlayContainer"))}
        </div>
    )
}


export default Modal;