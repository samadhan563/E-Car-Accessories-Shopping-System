package com.g03.ecass.pojos.entity;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.validation.constraints.NotNull;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class Products extends BaseEntity implements Serializable {


	@NotNull
	@Column(length = 40)
	private String productName;
	@NotNull
	@Column(length = 40, unique = true)
	private String productModel;
	@NotNull
	@Column(length = 40, nullable = false)
	private String manufacture;
	@NotNull
	private double productPrice;
	@NotNull
	private int quantity;
	@NotNull
	@Column(length = 100, nullable = false)
	private String description;
	
	private double finalPrice;
	@Column(name = "discount_offer")
	private double discountOffer;
	@JsonIgnore
	@ManyToOne(fetch = FetchType.LAZY)
	@OnDelete(action = OnDeleteAction.CASCADE)
	@JoinColumn(name = "category_id", nullable = false)
	//@JsonIgnoreProperties("products")
	private Category category;

	public Products() {

	}

	public Products(@NotNull String productName, @NotNull String productModel, @NotNull String manufacture,
			@NotNull double productPrice, @NotNull int quantity, @NotNull String description, double discountOffer) {
		super();
		this.productName = productName;
		this.productModel = productModel;
		this.manufacture = manufacture;
		this.productPrice = productPrice;
		this.quantity = quantity;
		this.description = description;
		this.discountOffer = discountOffer;
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

	public Category getCategory() {
		return category;
	}

	public void setCategory(Category category) {
		this.category = category;
	}
	public double getFinalPrice() {
		return finalPrice;
	}

	public void setFinalPrice(double finalPrice) {
		this.finalPrice = finalPrice;
	}


	@Override
	public String toString() {
		return "Products [productName=" + productName + ", productModel=" + productModel + ", manufacture="
				+ manufacture + ", productPrice=" + productPrice + ", quantity=" + quantity + ", description="
				+ description + ", discountOffer=" + discountOffer + "]";
	}

}
