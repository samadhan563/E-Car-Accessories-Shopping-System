package com.g03.ecass.service.interfaces;

import java.util.List;

import com.g03.ecass.dto.PaymentDTO;
import com.g03.ecass.dto.UserDto;
import com.g03.ecass.pojos.entity.Cart;
import com.g03.ecass.pojos.entity.Category;
import com.g03.ecass.pojos.entity.OrderDetails;
import com.g03.ecass.pojos.entity.Orders;
import com.g03.ecass.pojos.entity.Products;

public interface ICustomerServices {
	
	List<Products> getAllProduct(int categoryId);
	
	List<Products> getAllProductlowtohigh(int categoryId);
	
	List<Products> getAllProducthightolow(int categoryId);
	
	Products getProductById(int productId);
	
	String addProductToCart(Cart c);
	
	List<Cart> getCartByuserId(int userId);
	
	Double getCartTotalSavingAmt(int userId);
	
	Double getCartTotalAmt(int userId);
	
	String deleteItemFromCart(int cartId);
	
	List<Products> getProductListByName(String productName);
	
	int addOrder(int userId, double totalPrice);
	
	OrderDetails addOrdersDetails(int userId, int OrderId);
	
	String addPayment(PaymentDTO paymentDTO);
	
	List<Orders> getOrdersList(int userId);
	
	List<OrderDetails> getOrdersDetailsList(int orderId);
	
	String updateCartItems(int userId);
	
	String deliveredOrder(int orderId);
	
	List<Orders> getAllOrderList();
	
	List<Category> getAllCategoryList();

	List<Products> getProductAll();

	Orders cancelOrder(int orderId);

}


