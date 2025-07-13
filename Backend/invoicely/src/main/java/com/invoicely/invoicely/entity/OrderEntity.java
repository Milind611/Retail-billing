package com.invoicely.invoicely.entity;

import com.invoicely.invoicely.io.PaymentDetails;
import com.invoicely.invoicely.io.PaymentMethod;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "tbl_orders")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class OrderEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
private Long id;

private String orderId;
private String CustomerName;
private String phoneNumber;
private Double subTotal;
private Double tax;
private Double grandTotal;
private LocalDateTime createdAt;
@OneToMany(cascade = CascadeType.ALL,orphanRemoval = true)
@JoinColumn(name = "order_id")
private List<OrderItemEntity> items = new ArrayList<>();
@Embedded
private PaymentDetails paymentDetails;
@Enumerated(EnumType.STRING)
private PaymentMethod paymentMethod;
@PrePersist
protected void onCreate(){
    this.orderId ="ORD" +System.currentTimeMillis();
    this.createdAt = LocalDateTime.now();
}


}
