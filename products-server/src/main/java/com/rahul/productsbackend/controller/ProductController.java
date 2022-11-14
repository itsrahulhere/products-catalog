package com.rahul.productsbackend.controller;

import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.rahul.productsbackend.model.Product;
import com.rahul.productsbackend.service.ProductService;

@RestController
@RequestMapping("/products")
@CrossOrigin("*")
public class ProductController {
	
	@Autowired
	private ProductService productService;
	
	@PostMapping
	public ResponseEntity<Product> addProduct(@RequestBody Product product){
		Product product1 = this.productService.addProduct(product);
		return ResponseEntity.ok(product1);
	}
	
	
	@GetMapping("/{id}")
	public Product getProduct(@PathVariable("id") Integer id) {
		return this.productService.getProduct(id);
	}
	
	@GetMapping
	public Set<Product> getAllProudct(){
		return this.productService.getProducts();
	}
	
	@GetMapping("/search/{str}")
	public Set<Product> getSearchProduct(@PathVariable("str") String str) {
		return this.productService.getSearchProduct(str);
	}
	


}
