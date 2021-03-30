package com.g03.ecass.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.g03.ecass.dto.InChargeRequestDto;
import com.g03.ecass.dto.InChargeRequestDto.Currency;
import com.g03.ecass.dto.ResponseDTO;
import com.g03.ecass.pojos.entity.PaymentDetails;
import com.g03.ecass.service.impls.StripeService;
import com.stripe.exception.StripeException;

@RestController
@RequestMapping("/stripe")
@CrossOrigin
public class StripeController {

	@Autowired
	private StripeService paymentService;

	public StripeController() {

	}

	@PostMapping("/paymentintent")
	public ResponseDTO<?> charge(@RequestBody InChargeRequestDto chargeRequest) throws StripeException {
		System.out.println(chargeRequest);
		chargeRequest.setDescription("Example charge");
		chargeRequest.setCurrency(Currency.INR);
		try {
			PaymentDetails charge = paymentService.charge(chargeRequest);
			return new ResponseDTO<>(HttpStatus.OK, "Payment Sucessfull.......",charge);
		} catch (Exception e) {
			//e.printStackTrace();
			return new ResponseDTO<>(HttpStatus.INTERNAL_SERVER_ERROR, "failed to pay.", null);
		}

	}

}