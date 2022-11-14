package com.rahul.productsbackend.serviceimpl;

import java.util.LinkedHashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.rahul.productsbackend.model.Delivery;
import com.rahul.productsbackend.repo.DeliveryRepository;
import com.rahul.productsbackend.service.DeliveryService;

@Service
public class DeliveryServiceImpl implements DeliveryService {

	@Autowired
	private DeliveryRepository deliveryRepository;
	
	@Override
	public Delivery addDelivery(Delivery delivery) {
		return this.deliveryRepository.save(delivery);
	}

	@Override
	public Set<Delivery> findAllDelivery() {
		return new LinkedHashSet<>(this.deliveryRepository.findAll());
	}

	@Override
	public Delivery findOneDelivery(int productcode, int pincode) {
		return this.deliveryRepository.findByProductCodeAndPincode(productcode, pincode);
	}



	
	

}
