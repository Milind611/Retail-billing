package com.invoicely.invoicely.entity;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "tbl_order_items")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class OrderItemEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
 private Long id;
 private String itemId;
 private String name;
 private Double price;
 private Integer quantity;

}
