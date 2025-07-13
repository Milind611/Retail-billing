package com.invoicely.invoicely.service;

import com.invoicely.invoicely.io.UserRequest;
import com.invoicely.invoicely.io.Userresponse;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface UserService {
    Userresponse createUser(UserRequest userRequest);

    String getUserRole(String email);

    List<Userresponse> readUsers();

    void deleteUser(String id);
}
