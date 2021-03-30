package com.g03.ecass.pojos.entity;
import java.util.Arrays;

import javax.persistence.*;

@Entity
@Table(name = "product_image")
public class ProductImage extends BaseEntity{
	@Column(length = 20,unique = true)
	private String productName;
	@Column(length = 100)
	private String fileName;
	@Lob
	private byte[] image;
	@Column(length = 30)
	private String imageContentType;

	public ProductImage() {
	}

	public String getProductName() {
		return productName;
	}

	public void setProductName(String productName) {
		this.productName = productName;
	}

	public byte[] getImage() {
		return image;
	}

	public void setImage(byte[] image) {
		this.image = image;
	}

	public String getImageContentType() {
		return imageContentType;
	}

	public void setImageContentType(String imageContentType) {
		this.imageContentType = imageContentType;
	}

	public String getFileName() {
		return fileName;
	}

	public void setFileName(String fileName) {
		this.fileName = fileName;
	}

	@Override
	public String toString() {
		return "ProductImage [productName=" + productName + ", image=" + Arrays.toString(image) +"]";
	}

	public ProductImage(String productName, byte[] image,String fileName) {
		super();
		this.productName = productName;
		this.image = image;
		this.fileName=fileName;
	}
}
