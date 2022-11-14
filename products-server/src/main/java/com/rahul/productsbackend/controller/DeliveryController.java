package com.rahul.productsbackend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.rahul.productsbackend.model.Delivery;
import com.rahul.productsbackend.service.DeliveryService;

@RestController
@CrossOrigin("*")
@RequestMapping("/delivery/")
public class DeliveryController {
	@Autowired
	private DeliveryService deliveryService;
	
	@PostMapping
	public ResponseEntity<Delivery> add(@RequestBody Delivery delivery) {
		return ResponseEntity.ok(this.deliveryService.addDelivery(delivery));
	}
	
	@GetMapping
	public ResponseEntity<?> deliveries() {
		return ResponseEntity.ok(this.deliveryService.findAllDelivery());
	}
	
	@GetMapping("{productcode}/{pincode}")
    public Delivery getDeliverable(@PathVariable("productcode") int productId,
            @PathVariable("pincode") int pincode) {
        System.out.println(productId + pincode);
        return deliveryService.findOneDelivery(productId, pincode);
    }
	
}
