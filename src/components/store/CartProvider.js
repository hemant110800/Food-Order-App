import { useReducer } from "react";
import CartContext from "./cart_context";

const cartReducer = (state, action) => {
    if (action.type === "Add") {
        var updatedItemList = [];
        let new_itm = true;
        //    let totalPrice = 0;

        for (var itm = 0; itm < state.items.length; itm++) {
            // console.log(itm)
            if (state.items[itm].id == action.value.id) {
                state.items[itm].amount += action.value.amount;
                // state.items[itm].price += action.value.price;
                updatedItemList.push(state.items[itm]);
                new_itm = false;
            }
            else {
                updatedItemList.push(state.items[itm]);
            }

            //   totalPrice+=state.items[itm].price*state.items[itm].amount;
        }

        if (new_itm) {
            updatedItemList.push(action.value);
            // totalPrice+=action.value.price*action.value.amount;
        }

        var updatedTotalAmt = state.totalAmountAdded + action.value.price * action.value.amount;
        return ({ items: updatedItemList, totalAmountAdded: updatedTotalAmt })
    }
    else {

        var updatedItemList = [];
        //  let totalPrice = 0;
        var itembyId_index = state.items.findIndex((itm) => itm.id === action.id);
        var selectedItemtoRemove = state.items[itembyId_index];

        if (selectedItemtoRemove.amount == 1) {
            updatedItemList = state.items.filter((item) => { return item.id != action.id });
        }
        else {
            // Here we directly changing state.items obj instead we just try to maintain this
            // selectedItemtoRemove.amount -= 1;
            const updatedItm = {...selectedItemtoRemove,amount:selectedItemtoRemove.amount-1};

            // updatedItemList = state.items;
            //if i try to change updatedItemList , state.items will also change , so will use 
            updatedItemList = [...state.items];
            //remove dependency now we can change one easily

            updatedItemList[itembyId_index] = updatedItm;
            //update final list by updated obj at that index;
        }

        //Alternate approach
        // state.items.forEach(itm => {

        //     // console.log(itm)
        //     if (itm.id == action.id) {
        //         itm.amount -= 1;
        //         if (itm.amount >= 1) {
        //             updatedItemList.push(itm);
        //         }
        //     }
        //     else {
        //         updatedItemList.push(itm);
        //     }
        //     //   console.log(state.items[itm].price,state.items[itm].amount)
        //     totalPrice += itm.price * itm.amount;

        // });
        var updatedTotalAmt = state.totalAmountAdded - selectedItemtoRemove.price;
        return ({ items: updatedItemList, totalAmountAdded: updatedTotalAmt })
    }

}

const CartProvider = (props) => {

    const defaultCartState = {
        items: [],
        totalAmountAdded: 0
    }
    const [cartDetails, dispatchcard] = useReducer(cartReducer, defaultCartState)

    const addItemtoCart = (item) => {
        dispatchcard({ "type": "Add", "value": item })
    }
    const removeItemfromCart = (id) => {
        dispatchcard({ "type": "Remove", "id": id })
    }

    const cartItem = {
        items: cartDetails.items, //list of items in cart
        totalAmount: cartDetails.totalAmountAdded, //indicates total price of all items added to cart
        addItem: (item) => { addItemtoCart(item) },
        removeItem: (id) => { removeItemfromCart(id) }
    }


    return (
        <CartContext.Provider value={cartItem}>
            {props.children}
        </CartContext.Provider>
    )
}


export default CartProvider;