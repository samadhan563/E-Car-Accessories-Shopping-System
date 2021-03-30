package com.g03.ecass.pojos.entity;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "order_details")
public class OrderDetails extends BaseEntity {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	@Column(length = 30)
	private String productName;
	private double finalPrice;
	private int quantity;
	@OnDelete(action = OnDeleteAction.NO_ACTION)
	@ManyToOne(fetch = FetchType.LAZY, cascade = {CascadeType.PERSIST, CascadeType.DETACH})
	@JoinColumn(name = "order_id", nullable = false)
	private Orders selectedOrder;
	@JsonIgnore
	//@OnDelete(action = OnDeleteAction.CASCADE)
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "customer_id", nullable = false)
	private User selectedUser;

	public OrderDetails() {
		System.out.println("in ctor of " + getClass().getName());
	}

	public OrderDetails(String productName, double finalPrice, int quantity) {
		super();
		this.productName = productName;
		this.finalPrice = finalPrice;
		this.quantity = quantity;
	}

	public String getProductName() {
		return productName;
	}

	public void setProductName(String productName) {
		this.productName = productName;
	}

	public double getFinalPrice() {
		return finalPrice;
	}

	public void setFinalPrice(double finalPrice) {
		this.finalPrice = finalPrice;
	}

	public int getQuantity() {
		return quantity;
	}

	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}

	public Orders getSelectedOrder() {
		return selectedOrder;
	}

	public void setSelectedOrder(Orders selectedOrder) {
		this.selectedOrder = selectedOrder;
	}

	public User getSelectedUser() {
		return selectedUser;
	}

	public void setSelectedUser(User selectedUser) {
		this.selectedUser = selectedUser;
	}

}
