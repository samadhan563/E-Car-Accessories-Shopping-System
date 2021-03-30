package com.g03.ecass.dto;

import java.util.List;

import com.g03.ecass.pojos.entity.Products;

public class CategoryDto {

	private Integer id;
	private String categoryName;
	private List<Products> products;

	public CategoryDto() {
	}

	public CategoryDto(Integer id, String categoryName) {
		super();
		this.id = id;
		this.categoryName = categoryName;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getCategoryName() {
		return categoryName;
	}

	public void setCategoryName(String categoryName) {
		this.categoryName = categoryName;
	}

	public List<Products> getProducts() {
		return products;
	}

	public void setProducts(List<Products> products) {
		this.products = products;
	}

	@Override
	public String toString() {
		return "Category [id=" + id + ", categoryName=" + categoryName + "]";
	}

}
