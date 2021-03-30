package com.g03.ecass.service.impls;

import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.g03.ecass.dao.ICategoryRepository;
import com.g03.ecass.dao.IProductRepository;
import com.g03.ecass.exception.NotFoundException;
import com.g03.ecass.pojos.entity.Category;
import com.g03.ecass.pojos.entity.Products;
import com.g03.ecass.service.interfaces.IProductServices;
@Service
@Transactional
public class ProductServicesImpl implements IProductServices {
	@Autowired
	private IProductRepository productDao;
	@Autowired
	private ICategoryRepository	  categoryDao;


	@Override
	public List<Products> getProduct() 
	{
		return productDao.findAll();
	}
	@Override
	public Products addProduct(Products product , int catId) {
		Category category = categoryDao.findById(catId).orElseThrow(()->new NotFoundException("Category Not Found"));
		System.out.println(category);
		product.setCategory(category);
		
		System.out.println(product.getCategory());
		return productDao.save(product);
	}
	@Override
	public Products addProduct(Products product, String catName) {
		Category category = categoryDao.findByCategoryName(catName);
		System.out.println(category);
		product.setCategory(category);
		
		System.out.println(product.getCategory());
		return productDao.save(product);
	}
	@Override
	public Products getProductById(int id) {
		Optional<Products> optionalProducts = productDao.findById(id);
		Products products = optionalProducts.orElseThrow(() -> new NotFoundException("Sorry product not found with id : " + id));
		return products;
	}
	@Override
	public Products updateProduct(Products newProduct, int pId) {
		System.out.println("Update product invoked with "+newProduct);
		Optional<Products> optionalProducts = productDao.findById(pId);
		Products products = optionalProducts.orElseThrow(() -> new NotFoundException("Sorry product not found with id : " + pId));
		products.setProductName(newProduct.getProductName());
		products.setProductModel(newProduct.getProductModel());
		products.setManufacture(newProduct.getManufacture());
		products.setDescription(newProduct.getDescription());
		products.setFinalPrice(newProduct.getFinalPrice());
		products.setQuantity(newProduct.getQuantity());
		products.setProductPrice(newProduct.getProductPrice());
		products.setDiscountOffer(newProduct.getDiscountOffer());
		
		return productDao.save(products);
	}
	@Override
	public List<Products> fetchProductsByCategoryId(int id) {
		Category category = categoryDao.findById(id).orElseThrow(()->new NotFoundException("Category Not Found"));
		System.out.println(category);
		
		return category.getProducts();
	}
	@Override
	public Products deleteProduct(int pId) {
		Products products = productDao.findById(pId)
				.orElseThrow(() -> new NotFoundException("Sorry user not found with id : " + pId));
		productDao.deleteById(pId);
		return products;
	}
	
}
