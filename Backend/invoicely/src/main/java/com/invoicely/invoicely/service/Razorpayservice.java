package com.invoicely.invoicely.service;


import com.invoicely.invoicely.io.RazorpayOrderResponse;
import com.razorpay.RazorpayException;

public interface Razorpayservice {
   RazorpayOrderResponse createOrder(Double amount, String currency) throws RazorpayException;


}
