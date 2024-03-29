import { Fragment, useContext, useState, useEffect } from "react";
import MealsImg from '../../assets/images/meals.jpg'
import classes from "../Layout/Header.module.css";
import cartIcon from '../../assets/images/cartIcon.svg';
import CartContext from "../store/cart_context";

const Header = (props) => {

    const [btnisHighlighted,setbtnisHighlighted] = useState(false);

    const CartItems = useContext(CartContext);
   console.log(CartItems.items);
    var totalItemsCart = CartItems.items.reduce((prev,curr)=>{return prev+curr.amount},0)
    var class_add = btnisHighlighted==true?classes.button +" "+classes.bump:classes.button;
    console.log(class_add)
    // we need to remove again animated class to see effect of animation each time items is changing.

    useEffect(()=>{
        setbtnisHighlighted(true); // component will render again
        console.log("use effect runs")
        // we need to remove animated bump class to see the effect next time.
        setTimeout(()=>{
            setbtnisHighlighted(false);
        },300)
        
    },[CartItems.items])

    return (
        <Fragment>
            <header className={classes.header} >
                <h1>React Meals</h1>
                <button className={class_add} onClick = {props.showModal}>
                    <span className={classes.icon}>
                        <img src={cartIcon} alt="CartIcon"></img>
                    </span>
                    <span>Your Cart</span>
                    <span className={classes.badge}>{totalItemsCart}</span>
                </button>
            </header>
            <div className={classes['main-image']}>
                <img src={MealsImg} alt="A Table Full of Meals."></img>
            </div>
        </Fragment>
    )
}

export default Header;