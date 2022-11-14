package com.rahul.productsbackend.serviceimpl;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.rahul.productsbackend.model.Product;
import com.rahul.productsbackend.repo.ProductRepository;
import com.rahul.productsbackend.service.ProductService;

@Service
public class ProductServiceImpl implements ProductService {

	@Autowired
	private ProductRepository productRepository;
	
	@Override
	public Product addProduct(Product product) {
		return this.productRepository.save(product);
	}

	@Override
	public Product updateProduct(Product product) {
		return this.productRepository.save(product);
	}

	@Override
	public Set<Product> getProducts() {
		return new LinkedHashSet<>(this.productRepository.findAll());
	}

	@Override
	public Product getProduct(Integer productId) {
		return this.productRepository.findById(productId).get();
	}

	@Override
	public void deleteProduct(Integer productId) {
		this.productRepository.deleteById(productId);
	}

	@Override
	public Set<Product> getSearchProduct(String str) {
		Set<Product> searchedItems =  new HashSet<>();
		
		Pattern p = Pattern.compile("[a-zA-Z]+"); 
        Matcher m = p.matcher(str);
          
        List<String> words = new ArrayList<>();
        
        while (m.find()) { 
        	words.add(m.group());
            System.out.println(m.group()); 
        } 
        
        for(String word: words) {
        	searchedItems.addAll(this.productRepository.getSearchProducts(word));
        }
        
        
        return searchedItems;
		//return this.productRepository.getSearchProducts(str);
	}

}
