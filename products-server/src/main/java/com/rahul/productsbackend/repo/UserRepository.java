package com.rahul.productsbackend.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.rahul.productsbackend.model.User;

@Repository
public interface UserRepository extends  JpaRepository<User, String> {
   public User findByEmail(String email);
}
