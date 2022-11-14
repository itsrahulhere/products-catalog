package com.rahul.productsbackend.service;

import java.util.List;
import java.util.Set;

import com.rahul.productsbackend.model.Product;

public interface ProductService {
	public Product addProduct(Product product);
	
	public Product updateProduct(Product product);
	
	public Set<Product> getProducts();
	
	public Product getProduct(Integer productId);
	
	public void deleteProduct(Integer productId);

	public Set<Product> getSearchProduct(String str);
}
