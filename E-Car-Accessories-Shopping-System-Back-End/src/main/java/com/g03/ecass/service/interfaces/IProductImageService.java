package com.g03.ecass.service.interfaces;

import org.springframework.web.multipart.MultipartFile;

import com.g03.ecass.pojos.entity.ProductImage;

public interface IProductImageService {
	ProductImage findByProductName(String pName, MultipartFile imageFile);
	
	ProductImage getImageByName(String productName);

}
