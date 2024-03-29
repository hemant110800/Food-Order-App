import { useState } from "react";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import CartProvider from "./components/store/CartProvider";
import Cart from "./components/Cart/Cart";

function App() {

   const [cart_modal,setModal] = useState(false);

   const close_modal = ()=>{
    console.log("Modal closing")  
    setModal(false);
   }

   const open_modal = ()=>{
    console.log("Modal opening")
      setModal(true);
   }

  return (
    <CartProvider>
      {
       cart_modal &&
      <Cart showModal = {open_modal} hideModal = {close_modal}></Cart>
     }
      <Header cartModalstate = {cart_modal} showModal = {open_modal}></Header>
      <main>
        <Meals></Meals>
      </main>
    </CartProvider>
  );
}

export default App;
