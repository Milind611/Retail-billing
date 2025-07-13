package com.invoicely.invoicely.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.invoicely.invoicely.io.ItemRequest;
import com.invoicely.invoicely.io.ItemResponse;
import com.invoicely.invoicely.service.ItemService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping
@RequiredArgsConstructor
public class ItemController {
    @Autowired
    private ItemService itemService;

    @PostMapping("/admin/items")
    public ItemResponse addItem(@RequestPart("item") String itemString, @RequestPart("file")MultipartFile file) throws JsonProcessingException {
        ObjectMapper objectMapper = new ObjectMapper();
        ItemRequest itemRequest = null;

        try {
          itemRequest =  objectMapper.readValue(itemString,ItemRequest.class);
        return   itemService.add(itemRequest,file);

        }catch (JsonProcessingException e){
            throw  new ResponseStatusException(HttpStatus.BAD_REQUEST,"Error Occured ");
        }
    }
    @GetMapping("/items")
    public List<ItemResponse> readItems(){
       return itemService.fetchItems();
    }

    @DeleteMapping("/admin/items/{itemId}")
    public void removeItem(@PathVariable String itemId){
        try{
            itemService.delete(itemId);
        }catch (Exception e){
    throw new ResponseStatusException(HttpStatus.NOT_FOUND,"Item not found");
        }
    }
    }

