package com.g03.ecass.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.g03.ecass.pojos.entity.Orders;
import com.g03.ecass.pojos.entity.Payment;
import com.g03.ecass.pojos.entity.PaymentDetails;

@Repository
public interface IPaymentDetailsRepository extends JpaRepository<PaymentDetails, Integer> {
	@Query("select p from Payment p  where p.order=:orders")
	Payment findByOrder(Orders orders);

}
