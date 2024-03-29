import { Fragment, useContext } from "react";
import classes from "../Meal Item/MealItem.module.css";
import CartContext from "../../store/cart_context";
import MealInputForm from "./MealForm";

const MealItem = (props) => {
   
    const CartItems = useContext(CartContext);

    const AddItemToCart = (entered_amt,mealName,mealPrice,meal_ID)=>{
        console.log(entered_amt,mealName,mealPrice,meal_ID)

        CartItems.addItem({
            name:mealName,
            price:mealPrice,
            amount:+entered_amt,
            id:meal_ID
        });
        console.log(CartItems.items);
    };

    return (
        <Fragment>
            {  //instead of whole object recieving we can also get, one item of object at a time.

                props.mealitm.map((meal, ind) => {
                    return <li className={classes['meal']} key={ind}>
                            <div>
                                <div>
                                    <h3>{meal.name}</h3>
                                    <div className={classes['description']}>{meal.description}</div>
                                    <div className={classes['price']}>{`$${meal.price.toFixed(2)}`}</div>
                                </div>
                            </div>
                            <div><MealInputForm id={meal.id} add_ItemtoCart = {(amt)=>{AddItemToCart(amt,meal.name,meal.price,meal.id)}} /></div>
                        </li>
                })
            }
        </Fragment>
    )
}

export default MealItem;

// --------------------Important Note----------------------
/*
Here we are passing AddItemToCart func as prop to MealInputForm , but here our condition is like we need to pass 
 some additional parameters to the same function so , to do that we will accept parametrs from function (amt) while defining prop,
 like above then in arrow function call over function with required parameters , so will have values in that way and in InputForm 
 we are passing only one value that's why accepting one single param ,no of value pass = no of parametrs accept
 */