import axios from "axios";

export const createRazorpayOrder = async (data)=>{
return await axios.post(`http://localhost:8080/api/v1.0/payments/create`,{headers:{'Authorization': `Bearer ${localStorage.getItem('token')}`}})
}

export const verifyPayment = async(paymentData) =>{
return await axios.post(`http://localhost:8080/api/v1.0/payments/verify`,{headers:{'Authorization': `Bearer ${localStorage.getItem('token')}`}})
  
}