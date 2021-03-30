package com.g03.ecass.service.interfaces;

import java.util.List;

import com.g03.ecass.pojos.entity.Category;

public interface ICategoryServices {

	List<Category> getAllCategory();

	Category addCategory(Category category);

	Category getCategoryById(int id);

	Category updateCategory(Category category, int id);

	Category deleteCategory(int id);
	

}
