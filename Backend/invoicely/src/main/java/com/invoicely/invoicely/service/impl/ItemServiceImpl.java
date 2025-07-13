package com.invoicely.invoicely.service.impl;

import com.invoicely.invoicely.entity.CategoryEntity;
import com.invoicely.invoicely.entity.ItemEntity;
import com.invoicely.invoicely.io.ItemRequest;
import com.invoicely.invoicely.io.ItemResponse;
import com.invoicely.invoicely.repository.CategoryRepository;
import com.invoicely.invoicely.repository.ItemRepository;
import com.invoicely.invoicely.service.FileUploadService;
import com.invoicely.invoicely.service.ItemService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ItemServiceImpl implements ItemService {
    @Autowired
    private FileUploadService fileUploadService;
    @Autowired
    private CategoryRepository categoryRepository;
    @Autowired
    private ItemRepository itemRepository;
    @Override
    public ItemResponse add(ItemRequest request, MultipartFile file) {
        String imgUrl = fileUploadService.uploadFile(file);
        ItemEntity newItem = convertToEntity(request);
        CategoryEntity existingCategory = categoryRepository.findByCategoryId(request.getCategoryId()).orElseThrow(()->new RuntimeException("Category Not Found"));
        newItem.setCategory(existingCategory);
        newItem.setImgUrl(imgUrl);
        newItem = itemRepository.save(newItem);
        return convertToRespose(newItem);


    }

    private ItemResponse convertToRespose(ItemEntity newItem) {
return ItemResponse.builder()
        .itemId(newItem.getItemId())
        .name(newItem.getName())
        .description(newItem.getDescription())
        .price(newItem.getPrice())
        .imgUrl(newItem.getImgUrl())
        .categoryName(newItem.getCategory().getName())
        .categoryId(String.valueOf(newItem.getCategory().getId()))
        .createdAt(newItem.getCreatedAt())
        .updatedAt(newItem.getUpdatedAt())
        .build();

    }

    private ItemEntity convertToEntity(ItemRequest request) {
    return ItemEntity.builder()
            .itemId(UUID.randomUUID().toString())
            .name(request.getName())
            .description(request.getDescription())
            .price(request.getPrice())
            .build();
    }

    @Override
    public List<ItemResponse> fetchItems() {
        return itemRepository.findAll()
                .stream()
                .map(itemEntity -> convertToRespose(itemEntity))
                .collect(Collectors.toList());

    }

    @Override
    public void delete(String itemId) {
       ItemEntity existingItem = itemRepository.findByItemId(itemId)
                .orElseThrow(()-> new RuntimeException("Item not found"+itemId));
boolean isFileDelete =      fileUploadService.deleteFile(existingItem.getImgUrl());

if(isFileDelete){
    itemRepository.delete(existingItem);

}else {
    throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR,"Unable to delete");
}
    }
}