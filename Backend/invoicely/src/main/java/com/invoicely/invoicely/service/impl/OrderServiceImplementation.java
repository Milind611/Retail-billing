package com.invoicely.invoicely.service.impl;

import com.invoicely.invoicely.entity.OrderEntity;
import com.invoicely.invoicely.entity.OrderItemEntity;
import com.invoicely.invoicely.io.*;
import com.invoicely.invoicely.repository.OrderEntityRepository;
import com.invoicely.invoicely.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;
@Service
public class OrderServiceImplementation implements OrderService {
    @Autowired
    private  OrderEntityRepository orderEntityRepository;
    @Override
    public OrderResponse createOrder(OrderRequest request) {
OrderEntity newOrder =  convertToOrderEntity(request);

        PaymentDetails paymentDetails = new PaymentDetails();
        paymentDetails.setStatus(newOrder.getPaymentMethod() == PaymentMethod.CASH ? PaymentDetails.PaymentStatus.COMPLETED : PaymentDetails.PaymentStatus.PENDING);
    newOrder.setPaymentDetails(paymentDetails);
 List<OrderItemEntity> orderItems=  request.getCartItems().stream()
            .map(this :: convertToOrderItemEntity)
            .collect(Collectors.toList());

    newOrder.setItems(orderItems);
newOrder =    orderEntityRepository.save(newOrder);
return convertToresponse(newOrder);

    }

    private OrderResponse convertToresponse(OrderEntity newOrder) {
      return  OrderResponse.builder()
                .orderId(newOrder.getOrderId())
                .CustomerName(newOrder.getCustomerName())
                .phoneNumber(newOrder.getPhoneNumber())
                .subTotal(newOrder.getSubTotal())
                .tax(newOrder.getTax())
                .grandTotal(newOrder.getGrandTotal())
                .PaymentMethod(newOrder.getPaymentMethod())
                .items(newOrder.getItems().stream()
                        .map(this :: convertToItemresponse)
                        .collect(Collectors.toList()))
                .paymentDetails(newOrder.getPaymentDetails())
                .createdAt(newOrder.getCreatedAt())
                .build();
    }

    private OrderResponse.OrderItemResponse convertToItemresponse(OrderItemEntity orderItemEntity) {
        return OrderResponse.OrderItemResponse.builder()
                .itemId(orderItemEntity.getItemId())
                .name(orderItemEntity.getName())
                .price(orderItemEntity.getPrice())
                .quantity(orderItemEntity.getQuantity())
                .build();

    }

    private OrderItemEntity convertToOrderItemEntity(OrderRequest.OrderItemRequest orderItemRequest) {
    return         OrderItemEntity.builder()
                .itemId(orderItemRequest.itemId)
                .name(orderItemRequest.getName())
                .price(orderItemRequest.getPrice())
                .quantity(orderItemRequest.getQuantity())
                .build();
    }

    private OrderEntity convertToOrderEntity(OrderRequest request) {
    return    OrderEntity.builder()
                .CustomerName(request.getCustomerName())
                .phoneNumber(request.getPhoneNumber())
                .subTotal(request.getSubTotal())
                .tax(request.getTax())
                .grandTotal(request.getGrandTotal())
                .paymentMethod(PaymentMethod.valueOf(request.getPaymentMethod()))
                .build();
    }

    @Override
    public void deleteOrder(String orderId) {
OrderEntity existingOrder = orderEntityRepository.findByOrderId(orderId).orElseThrow(()-> new RuntimeException("Order not found"));
orderEntityRepository.delete(existingOrder);
    }

    @Override
    public List<OrderResponse> getLatestOrders() {
  return orderEntityRepository.findAllByOrderByCreatedAtDesc()
                .stream()
                .map(this::convertToresponse)
                .collect(Collectors.toList());

    }

    @Override
    public OrderResponse verifyPayment(PaymentVerificationRequest request) {
       OrderEntity existingOrder= orderEntityRepository.findByOrderId(request.getOrderId()).orElseThrow(()-> new RuntimeException("orderNotFound"));

       if(!verifyRazorpaySignature(request.getRazorpayOrderId(),request.getRazorpayPaymentId(),request.getRazorpaySignature())){
           throw new RuntimeException("Payment Verification Failed");
       }
       PaymentDetails paymentDetails = existingOrder.getPaymentDetails();
       paymentDetails.setRazorpayOrderId(request.getRazorpayOrderId());
       paymentDetails.setRazorpayPaymentId(request.getRazorpayPaymentId());
       paymentDetails.setRazorpaySignature(request.getRazorpaySignature());
       paymentDetails.setStatus(PaymentDetails.PaymentStatus.COMPLETED);
       existingOrder= orderEntityRepository.save(existingOrder);
       return  convertToresponse(existingOrder);
    }

    private boolean verifyRazorpaySignature(String razorpayOrderId, String razorpayPaymentId, String razorpaySignature) {
        return true;
    }
}
