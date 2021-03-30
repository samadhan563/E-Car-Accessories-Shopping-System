package com.g03.ecass.service.impls;

import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.g03.ecass.dao.ICategoryRepository;
import com.g03.ecass.exception.NotFoundException;
import com.g03.ecass.pojos.entity.Category;
import com.g03.ecass.service.interfaces.ICategoryServices;

@Service
@Transactional
public class CategoryServicesImpl implements ICategoryServices {

	@Autowired
	private ICategoryRepository categoryDao;

	@Override
	public List<Category> getAllCategory() {
		List<Category> category = categoryDao.findAll();
		System.out.println(category);
		return category;
	}

	@Override
	public Category addCategory(Category category) {
		// List<Products> products = category.getProducts();
		return categoryDao.save(category);
	}

	@Override
	public Category getCategoryById(int id) {
		Optional<Category> optionalUser = categoryDao.findById(id);
		Category category = optionalUser.orElseThrow(() -> new NotFoundException("Sorry category not found with id : " + id));
		return category;
	}

	@Override
	public Category updateCategory(Category newCategory, int id) {
		Optional<Category> optionalCategory = categoryDao.findById(id);
		Category category = optionalCategory.orElseThrow(() -> new NotFoundException("Sorry category not found with id : " + id));
		category.setCategoryName(newCategory.getCategoryName());
		//category.setProducts(category.getProducts());
		return categoryDao.save(newCategory);
		
	}
	
	@Override
	public Category deleteCategory(int id) {
		Optional<Category> optionalUser = categoryDao.findById(id);
		Category category = optionalUser.orElseThrow(() -> new NotFoundException("Sorry category not found with id : " + id));
		categoryDao.deleteById(id);
		return category;
	}

}
