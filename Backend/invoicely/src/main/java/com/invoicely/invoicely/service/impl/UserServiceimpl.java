package com.invoicely.invoicely.service.impl;

import com.invoicely.invoicely.entity.UserEntity;
import com.invoicely.invoicely.io.UserRequest;
import com.invoicely.invoicely.io.Userresponse;
import com.invoicely.invoicely.repository.UserRepository;
import com.invoicely.invoicely.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserServiceimpl  implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;
    @Override
    public Userresponse createUser(UserRequest userRequest) {
        UserEntity newUser = convertToEntity(userRequest);
        newUser = userRepository.save(newUser);
            return convertoResponse(newUser);
    }

    private Userresponse convertoResponse(UserEntity newUser) {
    return Userresponse.builder()
            .name(newUser.getName())
            .email(newUser.getEmail())
            .userId(newUser.getUserId())
            .createdAt(newUser.getCreatedAt())
            .updatedAt(newUser.getUpdatedAt())
            .role(newUser.getRole())
            .build();
    }

    private UserEntity convertToEntity(UserRequest userRequest) {
        return UserEntity.builder()
                .userId(UUID.randomUUID().toString())
                .email(userRequest.getEmail())
                .password(userRequest.getPassword())
                .role(userRequest.getRole())
                .name(userRequest.getName())
                .build();
    }

    @Override
    public String getUserRole(String email) {
        UserEntity existingUser = userRepository.findByEmail(email)
                .orElseThrow(()-> new UsernameNotFoundException("User not Found  for email"+email));
        return existingUser.getRole();
    }

    @Override
    public List<Userresponse> readUsers() {
     return    userRepository.findAll()
                .stream()
            .map(user-> convertoResponse(user))
                .collect(Collectors.toList());
    }

    @Override
    public void deleteUser(String id) {
    UserEntity existingUser = userRepository.findByUserId(id)
            .orElseThrow(()-> new UsernameNotFoundException("User Not Found"));
    userRepository.delete(existingUser);
    }
}
