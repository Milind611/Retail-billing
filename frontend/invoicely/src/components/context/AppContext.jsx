import { createContext,useState,useEffect } from "react";
import { fetchCategories } from './../../Service/CategoryService';
import { fetchitems } from "../../Service/ItemService";
import CartItems from './../CartItems/CartItems';

export const AppContext = createContext(null);


export const AppContextProvider = (props) => {
const [categories, setCategories] = useState([]);
const [itemsData, setItemsData] = useState([]);
const [cartItems, setCartItems] = useState([])



const addToCart =(item)=>{

 const existingItem= cartItems.find(cartItem => cartItem.name === item.name)
 if(existingItem){
  setCartItems(cartItems.map(cartItem=> cartItem.name === item.name ? {...cartItem,quantity:cartItem.quantity +1} : cartItem ))

 }else{
  setCartItems([...cartItems,{...item,quantity:1}]);
 }
}

const removeFromCart= (itemId)=>{
setCartItems(cartItems.filter(item => item.itemId !== itemId))
}

const updateQuantity= (itemId,newQuantity)=>{
setCartItems(cartItems.map(item => item.itemId === itemId ? {...item,quantity:newQuantity}: item))
}

const [auth, setAuth] = useState({
  token:null,
  role:null
})

useEffect(() => {
async function loadData() {

  if(localStorage.getItem("token") && localStorage.getItem("role")){
    setAuthData(
      localStorage.getItem("token"),
      localStorage.getItem("role")
    );
  }
  const response = await fetchCategories();
  const itemResponse = await fetchitems();
  setCategories(response.data)
  setItemsData(itemResponse.data)
  
}
loadData();
}, [])

const setAuthData= (token,role)=>{
  setAuth({token,role})
}

const clearCart =()=>{
  setCartItems([])
}

  const contextValue = {

    categories,
    setCategories,
    auth,
    setAuthData,
    itemsData,
    setItemsData,
    addToCart,
    cartItems,
    removeFromCart,
    updateQuantity,
    clearCart

  };

  return (
    <AppContext.Provider value={contextValue}>
      {props.children}
    </AppContext.Provider>
  );
};
