package com.invoicely.invoicely.io;

import lombok.Builder;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;

import java.sql.Timestamp;

@Builder
@Data
public class CategoryResponse {
    private String categoryId;
    private String name;
    private String description;
    private String bgColor;

    private Timestamp createdAt;

    private Timestamp updatedAt;
    private String imgUrl;
    private Integer items;
}
