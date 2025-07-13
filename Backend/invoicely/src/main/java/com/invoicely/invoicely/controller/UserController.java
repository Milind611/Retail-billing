package com.invoicely.invoicely.controller;

import com.invoicely.invoicely.io.UserRequest;
import com.invoicely.invoicely.io.Userresponse;
import com.invoicely.invoicely.repository.UserRepository;
import com.invoicely.invoicely.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;


@RestController
@RequiredArgsConstructor
@RequestMapping("/admin")
public class UserController {
    @Autowired
    private UserService userService;
@Autowired
private PasswordEncoder passwordEncoder;

    @PostMapping("/register")
    public Userresponse registerUser(@RequestBody UserRequest request){
        try {
            String pass = request.getPassword();
            String newpass = passwordEncoder.encode(pass);
            request.setPassword(newpass);

        return userService.createUser(request);
        }catch (Exception e){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,"Unable to craete user");
        }
    }

    @GetMapping("/users")
    public List<Userresponse> readUsers(){
        return userService.readUsers();
    }

    @DeleteMapping("/users/{id}")
    public void deleteUser(@PathVariable String id ){
        try{
            userService.deleteUser(id);
        }catch (Exception e){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,"User not found ");

        }
    }
}
