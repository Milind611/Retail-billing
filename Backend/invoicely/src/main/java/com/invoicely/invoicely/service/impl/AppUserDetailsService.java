package com.invoicely.invoicely.service.impl;

import com.invoicely.invoicely.entity.UserEntity;
import com.invoicely.invoicely.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collections;
@Service
public class AppUserDetailsService implements UserDetailsService {
    @Autowired
    private  UserRepository userRepository;
 @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
       UserEntity  existingUser =  userRepository.findByEmail(email)
        .orElseThrow(() -> new UsernameNotFoundException("Email not found for "+ email));
       return new User(existingUser.getEmail(),existingUser.getPassword(), Collections.singleton(new SimpleGrantedAuthority(existingUser.getRole())));
    }
}
