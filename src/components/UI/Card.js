import { Fragment } from "react";
import '../UI/Card.css';

const Card = (props)=>{
    return (
        <div className="card_layout">
             {props.children}
        </div>
    )
}


export default Card;
