package com.g03.ecass.service.interfaces;

import java.util.List;

import com.g03.ecass.pojos.entity.OrderDetails;
import com.g03.ecass.pojos.entity.OrderStatus;
import com.g03.ecass.pojos.entity.Orders;
import com.g03.ecass.pojos.entity.Payment;

public interface IOrdersServices {




	List<Orders> getAllOrders();

	Orders getOrdersById(int oId);

	Orders cancelOrdersById(int oId);

	List<Orders> getOrdersByUserId(int uId);

	Orders setStatus(int id, OrderStatus status);

	List<OrderDetails> getOrdersDetailsList(int orderId);

	Orders deliveredOrdersById(int oId);

	Payment getPaymentDetailsByOrder(int oId);

}
