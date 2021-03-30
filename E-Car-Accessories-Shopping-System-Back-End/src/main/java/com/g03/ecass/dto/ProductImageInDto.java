package com.g03.ecass.dto;

import org.springframework.web.multipart.MultipartFile;

public class ProductImageInDto {
	private String productName;
	private MultipartFile productImage;

	public ProductImageInDto() {
		// TODO Auto-generated constructor stub
	}

	public ProductImageInDto(String productName, MultipartFile productImage) {
		super();
		this.productName = productName;
		this.productImage = productImage;
	}

	public String getProductName() {
		return productName;
	}

	public void setProductName(String productName) {
		this.productName = productName;
	}

	public MultipartFile getProductImage() {
		return productImage;
	}

	public void setProductImage(MultipartFile productImage) {
		this.productImage = productImage;
	}

	@Override
	public String toString() {
		return "ProductImageInDto [productName=" + productName + ", productImage=" + productImage + "]";
	}

}
