package com.g03.ecass.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.g03.ecass.pojos.entity.Orders;
import com.g03.ecass.pojos.entity.Payment;

@Repository
public interface IPaymentRepository extends JpaRepository<Payment, Integer> {
	@Query("select p from Payment p  where p.order=:orders")
	Payment findByOrder(Orders orders);

}
