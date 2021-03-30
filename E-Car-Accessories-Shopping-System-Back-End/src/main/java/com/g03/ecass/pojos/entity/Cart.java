package com.g03.ecass.pojos.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
public class Cart extends BaseEntity {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	private int productId;
	
	@Column(length = 40)
	private String productName;

	@Column(length = 40)
	private String productModel;

	@Column(length = 40, nullable = false)
	private String manufacture;

	private double productPrice;

	private int quantity;

	@Column(length = 100, nullable = false)
	private String description;
	@Column(name = "discount_offer")
	private double discountOffer;
	private double finalPrice;
	
	@JsonIgnoreProperties
	private int userId;

	public Cart() {
		System.out.println("in ctor of " + getClass().getName());
	}

	public Cart(@NotNull String productName, @NotNull String productModel, @NotNull String manufacture,
			@NotNull double productPrice, @NotNull int quantity, @NotNull String description, double discountOffer,
			int userId) {
		super();
		this.productName = productName;
		this.productModel = productModel;
		this.manufacture = manufacture;
		this.productPrice = productPrice;
		this.quantity = quantity;
		this.description = description;
		this.discountOffer = discountOffer;
		this.userId = userId;
	}

	public String getProductName() {
		return productName;
	}

	public void setProductName(String productName) {
		this.productName = productName;
	}

	public String getProductModel() {
		return productModel;
	}

	public void setProductModel(String productModel) {
		this.productModel = productModel;
	}

	public String getManufacture() {
		return manufacture;
	}

	public void setManufacture(String manufacture) {
		this.manufacture = manufacture;
	}

	public double getProductPrice() {
		return productPrice;
	}

	public void setProductPrice(double productPrice) {
		this.productPrice = productPrice;
	}

	public int getQuantity() {
		return quantity;
	}

	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public double getDiscountOffer() {
		return discountOffer;
	}

	public void setDiscountOffer(double discountOffer) {
		this.discountOffer = discountOffer;
	}

	public int getUserId() {
		return userId;
	}

	public void setUserId(int userId) {
		this.userId = userId;
	}

	public int getProductId() {
		return productId;
	}

	public void setProductId(int productId) {
		this.productId = productId;
	}
	

	public double getFinalPrice() {
		return finalPrice;
	}

	public void setFinalPrice(double finalPrice) {
		this.finalPrice = finalPrice;
	}


	@Override
	public String toString() {
		return "Cart [productName=" + productName + ", productModel=" + productModel + ", manufacture=" + manufacture
				+ ", productPrice=" + productPrice + ", quantity=" + quantity + ", description=" + description
				+ ", discountOffer=" + discountOffer + ", userId=" + userId + "]";
	}



}
