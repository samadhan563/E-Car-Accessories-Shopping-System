package com.g03.ecass.service.impls;

import java.io.IOException;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.g03.ecass.dao.IProductImageRepository;
import com.g03.ecass.pojos.entity.ProductImage;
import com.g03.ecass.service.interfaces.IProductImageService;

@Service
@Transactional
public class ProductImageServiceImpl implements IProductImageService {
	@Autowired
	private IProductImageRepository imgRepo;

	@Override
	public ProductImage findByProductName(String productName, MultipartFile file) {
		try {
			ProductImage i = new ProductImage();
			i.setProductName(productName);
			i.setImage(file.getBytes());
			i.setImageContentType(file.getContentType());
			i.setFileName(file.getOriginalFilename());
			imgRepo.save(i);
		} catch (IOException e) {
			e.printStackTrace();
		}
		return null;
	}

	public ProductImage getImageByName(String productName) {
		return imgRepo.findByProductName(productName);
	}
}
