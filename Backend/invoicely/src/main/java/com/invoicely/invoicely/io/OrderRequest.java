package com.invoicely.invoicely.io;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class OrderRequest {
    private String CustomerName;
    private String phoneNumber;

    private List<OrderItemRequest> cartItems;

    private Double subTotal;
    private Double tax;
    private Double grandTotal;
    private String PaymentMethod;

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    @Builder
    public static class OrderItemRequest{
        public String itemId;
        private String name;
        private Double price;
        private Integer quantity;
    }
}
