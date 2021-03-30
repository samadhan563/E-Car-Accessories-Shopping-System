package com.g03.ecass.service.impls;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.PostConstruct;
import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.g03.ecass.dao.IOrdersRepository;
import com.g03.ecass.dao.IPaymentDetailsRepository;
import com.g03.ecass.dao.IUserRepository;
import com.g03.ecass.dto.InChargeRequestDto;
import com.g03.ecass.dto.InChargeRequestDto.Currency;
import com.g03.ecass.pojos.entity.Gateway;
import com.g03.ecass.pojos.entity.Orders;
import com.g03.ecass.pojos.entity.PaymentDetails;
import com.g03.ecass.pojos.entity.Status;
import com.g03.ecass.pojos.entity.User;
import com.stripe.Stripe;
import com.stripe.model.Charge;

@Service
@Transactional
public class StripeService {
	@Value("${STRIPE_SECRET_KEY}")
	private String secretKey;
	@Autowired
	private IUserRepository userRepo;
	@Autowired
	private IPaymentDetailsRepository paymentDetailsRepo;
	@Autowired
	private IOrdersRepository ordersRepo;

	@PostConstruct
	public void init() {
		Stripe.apiKey = secretKey;
	}

	public PaymentDetails charge(InChargeRequestDto chargeRequest) throws Exception {
		List<Object> paymentMethodTypes = new ArrayList<>();
		paymentMethodTypes.add("card");
		Map<String, Object> chargeParams = new HashMap<>();
		chargeParams.put("amount", Math.round(chargeRequest.getAmount())*100);
		System.out.println(Math.round(chargeRequest.getAmount()));
		chargeParams.put("currency", chargeRequest.getCurrency());
		chargeParams.put("description", chargeRequest.getDescription());
		chargeParams.put("receipt_email", chargeRequest.getStripeEmail());
		chargeParams.put("source", chargeRequest.getStripeToken());
		Charge create = Charge.create(chargeParams);
		PaymentDetails paymentDetails = new PaymentDetails();
		paymentDetails.setAmount(create.getAmount()/100);
		paymentDetails.setChId(create.getId());
		paymentDetails.setPaymentGateway(Gateway.CARD);
		paymentDetails.setPaymentDate(LocalDate.now());
		paymentDetails.setPaymentStatus(Status.PAID);
		paymentDetails.setReciptEmail(create.getReceiptEmail());
		paymentDetails.setCurrency(Currency.INR);
		User user = userRepo.findById(chargeRequest.getUserId()).get();
		paymentDetails.setUser(user);
		Orders o = ordersRepo.findById(chargeRequest.getOrderId()).get();
		paymentDetails.setOrder(o);
		//System.out.println(create);
		return paymentDetailsRepo.save(paymentDetails);
	}

}