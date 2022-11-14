package com.rahul.productsbackend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.rahul.productsbackend.model.User;
import com.rahul.productsbackend.service.UserService;

@RestController
@RequestMapping("/users/")
@CrossOrigin(origins = "*")
public class UserController {

	@Autowired
	private UserService userService;
	
	@Autowired
	private BCryptPasswordEncoder bCryptPasswordEncoder;
	
	@PostMapping
	public User createUser(@RequestBody User user) throws Exception {
		System.out.println("cheching test 123");
		user.setPassword(this.bCryptPasswordEncoder.encode(user.getPassword()));
		return this.userService.createUser(user);
	}

	@GetMapping("{email}")
	public User getUser(@PathVariable("email") String email) {
		return this.userService.getUser(email);
	}
	
	@DeleteMapping("{email}")
	public void deleteUser(@PathVariable("email") String email) {
		this.userService.deleteUser(email);
	}
	
	@PutMapping
	public User updateUser(@RequestBody User user) throws Exception {
		return this.userService.createUser(user);
	}

}
