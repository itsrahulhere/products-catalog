package com.rahul.productsbackend.service;

import com.rahul.productsbackend.model.User;

public interface UserService {
	
	public User addUser(User user);

	public User createUser(User user) throws Exception;

	public User getUser(String email);

	public void deleteUser(String email);

}
