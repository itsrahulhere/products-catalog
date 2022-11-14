package com.rahul.productsbackend.serviceimpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.rahul.productsbackend.model.User;
import com.rahul.productsbackend.repo.UserRepository;
import com.rahul.productsbackend.service.UserService;


@Service
public class UserServiceImpl implements UserService {

	@Autowired
	private UserRepository userRepository;

	//@Autowired
	//private BCryptPasswordEncoder bCryptPasswordEncoder;

	@Override
	public User addUser(User user) {
		//user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
		userRepository.save(user);
		return user;
	}

	@Override
	public User createUser(User user) throws Exception {
		 User local = this.userRepository.findByEmail(user.getEmail());
		 if (local != null) {
			 System.out.println("User is already there!");
			 throw new Exception("User already present!");
		 } else {
			local = this.userRepository.save(user);
		 }
		 return local;
	}

	@Override
	public User getUser(String email) {
		return this.userRepository.findByEmail(email);
	}

	@Override
	public void deleteUser(String email) {
		User entity = userRepository.findByEmail(email);
		userRepository.delete(entity);
	}

}
