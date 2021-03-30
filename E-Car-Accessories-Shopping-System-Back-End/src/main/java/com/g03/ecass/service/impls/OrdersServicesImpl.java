package com.g03.ecass.service.impls;

import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.g03.ecass.dao.IOrdersDetailsRepository;
import com.g03.ecass.dao.IOrdersRepository;
import com.g03.ecass.dao.IPaymentRepository;
import com.g03.ecass.dao.IUserRepository;
import com.g03.ecass.exception.NotFoundException;
import com.g03.ecass.pojos.entity.OrderDetails;
import com.g03.ecass.pojos.entity.OrderStatus;
import com.g03.ecass.pojos.entity.Orders;
import com.g03.ecass.pojos.entity.Payment;
import com.g03.ecass.pojos.entity.User;
import com.g03.ecass.service.interfaces.IOrdersServices;

@Service
@Transactional
public class OrdersServicesImpl implements IOrdersServices {
	@Autowired
	private IOrdersRepository ordersRepo;
	@Autowired
	private IOrdersDetailsRepository orderDetailsRepo;

	@Autowired
	private IUserRepository userRepo;
	@Autowired
	private IPaymentRepository paymentRepo;

	@Override
	public List<Orders> getAllOrders() {

		return ordersRepo.findAll();
	}

	@Override
	public Orders setStatus(int id, OrderStatus shipped) {
		Optional<Orders> optionalOrders = ordersRepo.findById(id);
		Orders orders = optionalOrders.orElseThrow(() -> new NotFoundException("Sorry cart not found with id : " + id));
		orders.setOrderDeliveryStatus(shipped);
		return ordersRepo.save(orders);
	}
	// helper method

	@Override
	public Orders getOrdersById(int oId) {
		Optional<Orders> optionalOrders = ordersRepo.findById(oId);
		Orders orders = optionalOrders
				.orElseThrow(() -> new NotFoundException("Sorry cart not found with id : " + oId));
		return orders;
	}
	@Override
	public Payment getPaymentDetailsByOrder(int oId) {
		Optional<Orders> optionalOrders = ordersRepo.findById(oId);
		Orders orders = optionalOrders
				.orElseThrow(() -> new NotFoundException("Sorry cart not found with id : " + oId));
		return paymentRepo.findByOrder(orders);
	}

	@Override
	public Orders cancelOrdersById(int oId) {
		Optional<Orders> optionalOrders = ordersRepo.findById(oId);
		Orders orders = optionalOrders
				.orElseThrow(() -> new NotFoundException("Sorry order not found with id : " + oId));
		orders.setOrderDeliveryStatus(OrderStatus.CANCELD);
		return ordersRepo.save(orders);
	}

	@Override
	public List<Orders> getOrdersByUserId(int uId) {
		Optional<User> optionalUser = userRepo.findById(uId);
		User user = optionalUser.orElseThrow(() -> new NotFoundException("Sorry cart not found with id : " + uId));
		return user.getOrders();
	}
	
	
	
	@Override
	public List<OrderDetails> getOrdersDetailsList(int orderId) {
		List<OrderDetails> list = orderDetailsRepo.findBySelectedOrder(ordersRepo.findById(orderId).get());
		System.out.println("list : " + list);
		return list;
	}

	@Override
	public Orders deliveredOrdersById(int oId) {
		Optional<Orders> optionalOrders = ordersRepo.findById(oId);
		Orders orders = optionalOrders
				.orElseThrow(() -> new NotFoundException("Sorry order not found with id : " + oId));
		if(!orders.getOrderDeliveryStatus().equals(OrderStatus.CANCELD))
		orders.setOrderDeliveryStatus(OrderStatus.DELIVERED);
		return ordersRepo.save(orders);
	}



	

}
