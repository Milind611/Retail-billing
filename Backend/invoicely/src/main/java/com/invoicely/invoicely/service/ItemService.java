package com.invoicely.invoicely.service;

import com.invoicely.invoicely.io.ItemRequest;
import com.invoicely.invoicely.io.ItemResponse;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;


public interface ItemService {
    ItemResponse add(ItemRequest request, MultipartFile file);

    List<ItemResponse>  fetchItems();

    void delete (String itemId);
}
