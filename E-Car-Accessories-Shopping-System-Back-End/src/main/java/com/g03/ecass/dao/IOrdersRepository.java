package com.g03.ecass.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.g03.ecass.pojos.entity.Orders;
import com.g03.ecass.pojos.entity.User;

@Repository
public interface IOrdersRepository extends JpaRepository<Orders, Integer> {

	//@Query("select o from Orders o where o.user=:user")
	List<Orders> findByselectedCustomer(User user);
	
	//List<Orders> findBySelectedDeliveryBoy(User user);

}
