package com.g03.ecass.service.interfaces;

import java.util.List;

import com.g03.ecass.pojos.entity.Products;

public interface IProductServices {
	List<Products> getProduct();

	Products addProduct(Products product, int categeory);

	Products getProductById(int id);

	Products updateProduct(Products product, int pId);

	List<Products> fetchProductsByCategoryId(int id);

	Products deleteProduct(int pId);

	Products addProduct(Products product, String catName);

}
