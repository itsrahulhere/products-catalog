package com.rahul.productsbackend.serviceimpl;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.rahul.productsbackend.model.User;
import com.rahul.productsbackend.repo.UserRepository;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

	@Autowired
	private UserRepository userRepository;

	@Override
	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {

		User user = userRepository.findByEmail(email);
		System.out.println(user + "\n\n\n\n\n\n");
		if (user != null) {
			return new org.springframework.security.core.userdetails.User(user.getEmail(), user.getPassword(),
					new ArrayList<>());
		} else {
			throw new UsernameNotFoundException("No user found");
		}

	}

}
