package com.g03.ecass.service.impls;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.g03.ecass.dao.ICartRepository;
import com.g03.ecass.dao.ICategoryRepository;
import com.g03.ecass.dao.IOrdersDetailsRepository;
import com.g03.ecass.dao.IOrdersRepository;
import com.g03.ecass.dao.IPaymentDetailsRepository;
import com.g03.ecass.dao.IPaymentRepository;
import com.g03.ecass.dao.IProductRepository;
import com.g03.ecass.dao.IUserRepository;
import com.g03.ecass.dto.PaymentDTO;
import com.g03.ecass.exception.NotFoundException;
import com.g03.ecass.pojos.entity.Cart;
import com.g03.ecass.pojos.entity.Category;
import com.g03.ecass.pojos.entity.Gateway;
import com.g03.ecass.pojos.entity.OrderDetails;
import com.g03.ecass.pojos.entity.OrderStatus;
import com.g03.ecass.pojos.entity.Orders;
import com.g03.ecass.pojos.entity.Payment;
import com.g03.ecass.pojos.entity.PaymentDetails;
import com.g03.ecass.pojos.entity.Products;
import com.g03.ecass.pojos.entity.Status;
import com.g03.ecass.pojos.entity.User;
import com.g03.ecass.service.interfaces.ICustomerServices;

@Service
@Transactional
public class CustomerServicesImpl implements ICustomerServices {

	@Autowired
	private IProductRepository productRepo;

	@Autowired
	private ICartRepository cartRepo;

	@Autowired
	private IUserRepository userRepo;

	@Autowired
	private IOrdersRepository ordersRepo;

	@Autowired
	private IOrdersDetailsRepository ordersDetailsRepo;

	@Autowired
	private IPaymentDetailsRepository paymentRepo;

	@Autowired
	private ICategoryRepository catRepo;

	// private static int deliveryBoyId;

	@Override
	public List<Products> getAllProduct(int categoryId) {
		List<Products> list = productRepo.getAllProduct(categoryId);
		List<Products> lt = new ArrayList<Products>();
		int index = 0;
		for (index = 0; index < list.size(); index++) {
			Products p = list.get(index);
			if (p.getQuantity() > 0)
				lt.add(p);
		}
		return lt;
	}

	@Override
	public List<Products> getAllProductlowtohigh(int categoryId) {
		List<Products> list = productRepo.getAllProductlowtohigh(categoryId);
		List<Products> lt = new ArrayList<Products>();
		int index = 0;
		for (index = 0; index < list.size(); index++) {
			Products p = list.get(index);
			if (p.getQuantity() > 0)
				lt.add(p);
		}
		return lt;
	}

	@Override
	public List<Products> getAllProducthightolow(int categoryId) {
		List<Products> list = productRepo.getAllProducthightolow(categoryId);
		List<Products> lt = new ArrayList<Products>();
		int index = 0;
		for (index = 0; index < list.size(); index++) {
			Products p = list.get(index);
			if (p.getQuantity() > 0)
				lt.add(p);
		}
		return lt;
	}

	@Override
	public Products getProductById(int productId) {
		Optional<Products> optionalProducts = productRepo.findById(productId);
		Products products = optionalProducts
				.orElseThrow(() -> new NotFoundException("Sorry product not found with id : " + productId));

		return products;
	}

	@Override
	public String addProductToCart(Cart c) {
		Cart ct = cartRepo.save(c);
		if (ct != null)
			return "!!! Items Added to Cart !!!";
		return "product not added";
	}

	@Override
	public List<Cart> getCartByuserId(int userId) {
		return cartRepo.getCartByuserId(userId);
	}

	@Override
	public Double getCartTotalAmt(int userId) {
		return cartRepo.getCartTotalAmt(userId);
	}

	@Override
	public Double getCartTotalSavingAmt(int userId) {
		double famt = cartRepo.getCartTotalAmt(userId);
		double tamt = cartRepo.getCartTotalSAmt(userId);
		return (tamt - famt);
	}

	@Override
	public String deleteItemFromCart(int cartId) {
		cartRepo.deleteById(cartId);
		return "Items Deleted from Cart";
	}

	@Override
	public List<Products> getProductListByName(String productName) {
		List<Products> list = productRepo.getProductListByName(productName);
		List<Products> lt = new ArrayList<Products>();
		int index = 0;
		for (index = 0; index < list.size(); index++) {
			Products p = list.get(index);
			if (p.getQuantity() > 0)
				lt.add(p);
		}
		return lt;
	}

	public int addOrder(int userId, double totalPrice) {
		Orders order = new Orders();
		order.setDeliveryDate(LocalDate.now().plusDays(2));
		order.setOrderDeliveryStatus(OrderStatus.PENDING);
		order.setOrderDate(LocalDate.now());
		order.setTotalPrice(totalPrice);
		order.setSelectedCustomer(userRepo.findById(userId).get());
		return ordersRepo.save(order).getId();
	}

	@Override
	public OrderDetails addOrdersDetails(int userId, int orderId) {
		OrderDetails orderDetails = null;
		Orders orders = ordersRepo.findById(orderId).get();
		User user = userRepo.findById(userId).get();
		List<Cart> items = cartRepo.getCartByuserId(userId);
		for (Cart cart : items) {
			Products p = productRepo.findByProductName(cart.getProductName());
			if (p.getQuantity() > 0) {
				int qty = p.getQuantity() - 1;
				p.setQuantity(qty);
				OrderDetails od = new OrderDetails();
				od.setFinalPrice(cart.getFinalPrice());
				od.setProductName(cart.getProductName());
				od.setQuantity(cart.getQuantity());
				od.setSelectedOrder(orders);
				od.setSelectedUser(user);
				orderDetails = ordersDetailsRepo.save(od);
			}
		}

		cartRepo.deleteByUserId(userId);
		return orderDetails;
	}

	@Override
	public String addPayment(PaymentDTO paymentDTO) {
		PaymentDetails payment = new PaymentDetails();
		payment.setPaymentDate(LocalDate.now());
		payment.setPaymentStatus(Status.PAID);
		if (paymentDTO.getPaymentType().equals("CREDIT"))
			payment.setPaymentGateway(Gateway.CREDIT);
		if (paymentDTO.getPaymentType().equals("DEBIT"))
			payment.setPaymentGateway(Gateway.DEBIT);
		if (paymentDTO.getPaymentType().equals("COD"))
		{
			payment.setPaymentGateway(Gateway.CASH_ON_DELIVERY);
			payment.setPaymentStatus(Status.PENDING);
		}
		User user = userRepo.findById(paymentDTO.getUserId()).get();
		payment.setUser(user);
		Orders o = ordersRepo.findById(paymentDTO.getOrderId()).get();
		payment.setOrder(o);
		payment.setAmount(o.getTotalPrice());
		paymentRepo.save(payment);
		return "Payment Done";
	}

	@Override
	public List<Orders> getOrdersList(int userId) {
		System.out.println("get order list invoked ");
		return ordersRepo.findByselectedCustomer(userRepo.findById(userId).get());
	}

	@Override
	public Orders cancelOrder(int orderId) {
		Orders order = ordersRepo.findById(orderId).get();
		order.setOrderDeliveryStatus(OrderStatus.CANCELD);
		List<OrderDetails> list = ordersDetailsRepo.findBySelectedOrder(ordersRepo.findById(orderId).get());
		for (OrderDetails orderDetails : list) {
			Products product = productRepo.findByProductName(orderDetails.getProductName());
			product.setQuantity(product.getQuantity() + orderDetails.getQuantity());
			productRepo.save(product);
		}
		return ordersRepo.save(order);
	}

	@Override
	public List<OrderDetails> getOrdersDetailsList(int orderId) {
		List<OrderDetails> list = ordersDetailsRepo.findBySelectedOrder(ordersRepo.findById(orderId).get());
		System.out.println("list : " + list);
		return list;
	}

	@Override
	public String updateCartItems(int userId) {
		List<Cart> list = cartRepo.findByUserId(9999);
		for (Cart cart : list) {
			cart.setUserId(userId);
		}
		return "Cart Updated";
	}

	@Override
	public String deliveredOrder(int orderId) {
		Orders o = ordersRepo.findById(orderId).get();
		if(!o.getOrderDeliveryStatus().equals(OrderStatus.CANCELD))
			o.setOrderDeliveryStatus(OrderStatus.DELIVERED);
		return "Order delivered";
	}

	@Override
	public List<Orders> getAllOrderList() {
		return ordersRepo.findAll();
	}

	@Override
	public List<Category> getAllCategoryList() {
		return catRepo.findAll();
	}

	@Override
	public List<Products> getProductAll() {
		return productRepo.findAll();
	}

}
