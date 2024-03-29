import { useState } from "react";
import Input from "../../UI/Input";
import '../Meal Item/MealForm.css';
const MealInputForm = (props)=>{

    const [amt,setAmt] = useState(1);
    const [amtValidity,setValid] = useState(true);
    const Inputchng = (e)=>{
      console.log(e.target.value)

      if(+e.target.value<1 || +e.target.value>5){
          setValid(false);
          return;
      }
      else if(e.target.value.trim().length == 0){
        setValid(false);
        return;
      }
      else{
        setValid(true);
      setAmt(+e.target.value);
      }
      //adding + sign to convert into integer value because will always get string value from Input field , no matter of type(number)
    }

    //Here instead of useState we can also use ref , and using forwardRef we can make use of ref and access latest value though ref.current.value

    const amt_handler = (event,id)=>{
      event.preventDefault();
        console.log(id,amt);
        props.add_ItemtoCart(amt);
    }

    return (
        <form className = "form">
            <Input label="Amount" input={{type:"number",id:'amount_'+props.id,min:1,max:5,step:1,defaultValue:1,onChange:Inputchng}} />
            <button onClick={(e)=>{amt_handler(e,props.id)}}>+ Add</button>
            {!amtValidity && <p style={{color:"red"}}>Please enter a valid amount(1-5)</p>}
        </form>
    )
}

export default MealInputForm;

/* Above Case also we have defined onClck event and normally we were passing reference of function and while 
defining function on top we are accepting event as parameter ,now let say our requirement is to pass
additional parameters to same function , so here only we will call function and pass required parametere
, we will accept (e) as parameter and with other argumnet call function and while defining function accept that 
many parameters.  */