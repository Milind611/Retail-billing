package com.invoicely.invoicely.controller;

import com.invoicely.invoicely.io.OrderResponse;
import com.invoicely.invoicely.io.PaymentRequest;
import com.invoicely.invoicely.io.PaymentVerificationRequest;
import com.invoicely.invoicely.io.RazorpayOrderResponse;
import com.invoicely.invoicely.service.OrderService;
import com.invoicely.invoicely.service.Razorpayservice;
import com.razorpay.RazorpayException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/payments")
public class PaymentController {
    @Autowired
    private Razorpayservice razorpayservice;

            @Autowired
    private OrderService orderService;

            @PostMapping("/create")

            @ResponseStatus(HttpStatus.CREATED)
            public RazorpayOrderResponse createRazorpayOrder(@RequestBody PaymentRequest request) throws RazorpayException{
                return  razorpayservice.createOrder(request.getAmount(),request.getCurrency());
            }

    @PostMapping("/verify")
    public OrderResponse verifyPayments(@RequestBody PaymentVerificationRequest request){
 return orderService.verifyPayment(request);
    }



        }
