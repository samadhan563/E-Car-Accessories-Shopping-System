package com.g03.ecass.service.interfaces;

public interface IStripeService {

	void chargeNewCard(String token, Double amount);
	

}
