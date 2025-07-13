package com.invoicely.invoicely.controller;

import com.invoicely.invoicely.io.AuthRequest;
import com.invoicely.invoicely.io.AuthResponse;
import com.invoicely.invoicely.service.UserService;
import com.invoicely.invoicely.service.impl.AppUserDetailsService;
import com.invoicely.invoicely.util.jwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import java.util.Map;

@RestController
@RequiredArgsConstructor
public class AuthController {

    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private AppUserDetailsService appUserDetailsService;
    @Autowired
    private jwtUtil jwtUtil;
    @Autowired
    private UserService userService;


    @PostMapping("/login")
    public AuthResponse login(@RequestBody AuthRequest authRequest) throws Exception {
        authenticate(authRequest.getEmail(),authRequest.getPassword());
        final UserDetails userDetails = appUserDetailsService.loadUserByUsername(authRequest.getEmail());
        final String jwtToken = jwtUtil.generateToken(userDetails);
        String role = userService.getUserRole(authRequest.getEmail());
        return new AuthResponse(authRequest.getEmail(),role,jwtToken);
    }

    private void authenticate(String email, String password) throws Exception {
        try{
authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(email,password));
        }catch (DisabledException e){
  throw new Exception("user disabled");
        }catch (BadCredentialsException e){
        throw new ResponseStatusException(HttpStatus.BAD_REQUEST," Bad Credentials");
        }
    }

    @PostMapping("/encode")
    public String encodePassword(@RequestBody Map<String,String> request ){
        return passwordEncoder.encode(request.get("password"));
    }

}
