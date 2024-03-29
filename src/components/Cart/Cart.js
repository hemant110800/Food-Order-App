import { useContext } from 'react';
import Modal from '../UI/Model';
import classes from './Cart.module.css';
import CartContext from '../store/cart_context';
import CartItem from './CartItem';

const Cart = (props)=>{
    const IteminCart = useContext(CartContext);
    
    const addCartHandler = (item)=>{
      // item.amount = 1;
      console.log(item);
      IteminCart.addItem({...item,amount:1}); //to update existing item obj
    }

    const removeCartHandler = (id)=>{
      IteminCart.removeItem(id);
       console.log(id);
    }
    
    const cartItems = (
        <ul className={classes['cart-items']}>
          {
          IteminCart.items.map((item) => {
           return <CartItem name={item.name} price={item.price} onAdd={addCartHandler.bind(null,item)} onRemove={removeCartHandler.bind(null,item.id)} amount={item.amount} key={item.id} />
          })
          }
        </ul>
      );
    
    
    return (
        <Modal hide_modal = {props.hideModal}>
          {cartItems}
          <div className={classes.total}>
            <span>Total Amount</span>
            <span>{`$${IteminCart.totalAmount.toFixed(2)}`}</span>
          </div>
          <div className={classes.actions}>
            <button className={classes['button--alt']} onClick={props.hideModal}>Close</button>
            <button className={classes.button}>Order</button>
          </div>
        </Modal>
      );
}

export default Cart;