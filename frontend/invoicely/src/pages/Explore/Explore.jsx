import React, { useContext,useState } from 'react'
import './Explore.css'
import { AppContext } from '../../components/context/AppContext';
import DisplayCategory from '../../components/DisplayCategory/DisplayCategory';
import DisplayItems from '../../components/DisplsyItems/DisplayItems';
import CustomerForm from '../../components/CustomerForm/CustomerForm';
import CartItems from '../../components/CartItems/CartItems';
import CartSumaary from '../../components/CartSummary/CartSummary';
const Explore = () => {
 const {categories} =  useContext(AppContext)
 const [selectedCategory, setSelectedCategory] = useState("")
 const [customerName, setCustomerName] = useState("")
 const [mobileNumber, setMobileNumber] = useState("")
  return (
    <div className="explore-container text-light" >
      <div className="left-column">
        <div className="first-row " style={{overflowY:'auto'}}>
        <DisplayCategory categories={categories} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
        </div>

        <hr className='horizontal-line'/>

        <div className="second-row"  style={{overflowY:'auto'}}>
          <DisplayItems  selectedCategory={selectedCategory}/>
        </div>
    

      </div>
      <div className="right-column d-flex flex-column">
      <div className="customer-form-conatiner"  style={{height:'15%'}}>
    <CustomerForm  
    customerName={customerName}
    setCustomerName={setCustomerName}
    mobileNumber={mobileNumber}
    setMobileNumber={setMobileNumber}
    />
      </div>
        <hr className='my-3 text-light'/>
      <div className="cart-items-conatiner"  style={{height:'55%',overflowY:'auto'}}>
       <CartItems/>
      </div>


      <div className="cart-summary-conatiner"  style={{height:'40%'}}>
        <CartSumaary
         customerName={customerName}
    setCustomerName={setCustomerName}
    mobileNumber={mobileNumber}
    setMobileNumber={setMobileNumber}
        />
      </div>


</div>
       </div>
  )
}

export default Explore