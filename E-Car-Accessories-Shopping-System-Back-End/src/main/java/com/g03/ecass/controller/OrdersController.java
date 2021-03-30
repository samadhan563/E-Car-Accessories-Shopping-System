package com.g03.ecass.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.g03.ecass.service.interfaces.IOrdersServices;

@RestController
@CrossOrigin
@RequestMapping("orders")
public class OrdersController {

	@Autowired
	private IOrdersServices ordersService;

	public OrdersController() {

	}

	@GetMapping("/show")
	public ResponseEntity<?> getAllOrders() {
		try {
			return new ResponseEntity<>(ordersService.getAllOrders(), HttpStatus.ACCEPTED);
		} catch (Exception e) {
			return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@GetMapping("/user/{uId}")
	public @ResponseBody ResponseEntity<?> getOrdersByUserId(@PathVariable int uId) {
		try {
			return new ResponseEntity<>(ordersService.getOrdersByUserId(uId), HttpStatus.CREATED);
		} catch (Exception e) {
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}

	}

	@GetMapping("/get/{oId}")
	public @ResponseBody ResponseEntity<?> getOrdersById(@PathVariable int oId) {
		try {
			return new ResponseEntity<>(ordersService.getOrdersById(oId), HttpStatus.CREATED);
		} catch (Exception e) {
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}

	}
	@GetMapping("/orderdpaymentlist/{oId}")
	public @ResponseBody ResponseEntity<?> getPaymentDetailsByOrder(@PathVariable int oId) {
		try {
			return new ResponseEntity<>(ordersService.getPaymentDetailsByOrder(oId), HttpStatus.CREATED);
		} catch (Exception e) {
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}

	}

	@GetMapping("/orderdetailslist/{orderId}")
	public ResponseEntity<?> getOrdersDetailsList(@PathVariable int orderId) {
		System.out.println("in getOrdersDetailsList: " + orderId);
		try {
			return new ResponseEntity<>(ordersService.getOrdersDetailsList(orderId), HttpStatus.OK);
		} catch (RuntimeException e) {
			System.out.println("err in getOrdersDetailsList : " + e);
			return new ResponseEntity<>("Order Details List Not Added", HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@PutMapping("/delivered/{oId}")
	public @ResponseBody ResponseEntity<?> cancelOrdersById(@PathVariable int oId) {
		try {
			return new ResponseEntity<>(ordersService.deliveredOrdersById(oId), HttpStatus.CREATED);
		} catch (Exception e) {
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}

	}

}
