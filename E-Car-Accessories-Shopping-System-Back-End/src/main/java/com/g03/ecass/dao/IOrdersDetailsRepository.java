package com.g03.ecass.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.g03.ecass.pojos.entity.OrderDetails;
import com.g03.ecass.pojos.entity.Orders;

@Repository
public interface IOrdersDetailsRepository extends JpaRepository<OrderDetails, Integer> {
	@Query("select o from OrderDetails o  where o.selectedOrder=:odr")
	List<OrderDetails> findBySelectedOrder(Orders odr);
	
	
}
