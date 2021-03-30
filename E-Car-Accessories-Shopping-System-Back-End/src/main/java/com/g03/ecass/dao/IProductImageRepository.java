package com.g03.ecass.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.g03.ecass.pojos.entity.ProductImage;

@Repository
public interface IProductImageRepository extends JpaRepository<ProductImage, Integer> {
	ProductImage findByProductName(String productName);	
}
