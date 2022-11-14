package com.rahul.productsbackend.controller;

import java.security.Principal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.rahul.productsbackend.config.JwtUtil;
import com.rahul.productsbackend.model.JwtRequest;
import com.rahul.productsbackend.model.JwtResponse;
import com.rahul.productsbackend.serviceimpl.UserDetailsServiceImpl;

@RestController
@CrossOrigin("*")
public class AuthenticateController {

	@Autowired
	private UserDetailsServiceImpl userDetailsServiceImpl;

	@Autowired
	private JwtUtil jwtUtil;

	@Autowired
	private AuthenticationManager authenticationManager;

	@PostMapping("/token")
	public ResponseEntity<?> genrateToken(@RequestBody JwtRequest jwtRequest) throws Exception {
		System.out.println("hello sadasdasd");
		System.out.println(jwtRequest.getPassword() + jwtRequest.getUsername());
		try {
			this.authenticationManager.authenticate(
					new UsernamePasswordAuthenticationToken(jwtRequest.getUsername(), jwtRequest.getPassword()));
		} catch (Exception e) {
//			e.printStackTrace();
			throw new Exception("Bad crednitails");
		}

		UserDetails userDetails = this.userDetailsServiceImpl.loadUserByUsername(jwtRequest.getUsername());
		String token = this.jwtUtil.generateToken(userDetails);
		System.out.println(token);
		return ResponseEntity.ok(new JwtResponse(token));

	}
	
	@GetMapping("/current-user")
	public User getCurrentUser(Principal principal) {
		return (User)this.userDetailsServiceImpl.loadUserByUsername(principal.getName());
	}

}
