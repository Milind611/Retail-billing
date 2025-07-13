package com.invoicely.invoicely.service;

import com.invoicely.invoicely.io.OrderRequest;
import com.invoicely.invoicely.io.OrderResponse;
import com.invoicely.invoicely.io.PaymentVerificationRequest;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface OrderService {
   OrderResponse createOrder(OrderRequest request);

   void deleteOrder (String orderId);

   List<OrderResponse> getLatestOrders();

  OrderResponse verifyPayment(PaymentVerificationRequest request);
}
