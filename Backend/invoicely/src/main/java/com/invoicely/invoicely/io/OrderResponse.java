package com.invoicely.invoicely.io;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class OrderResponse {

    private String orderId;
    private String CustomerName;
    private String phoneNumber;

    private List<OrderResponse.OrderItemResponse> items;

    private Double subTotal;
    private Double tax;
    private Double grandTotal;
    private PaymentMethod PaymentMethod;

    private LocalDateTime createdAt;

    private PaymentDetails paymentDetails;

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    @Builder
    public static class OrderItemResponse{
        public String itemId;
        private String name;
        private Double price;
        private Integer quantity;
    }
}
