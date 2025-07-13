package com.invoicely.invoicely.service;


import com.invoicely.invoicely.io.CategoryRequest;
import com.invoicely.invoicely.io.CategoryResponse;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface CategoryService {


    CategoryResponse add(CategoryRequest request, MultipartFile file);

    List<CategoryResponse> read();

    void delete(String categoryId);
}
