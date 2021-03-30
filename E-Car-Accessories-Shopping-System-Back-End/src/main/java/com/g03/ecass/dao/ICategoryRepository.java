package com.g03.ecass.dao;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.g03.ecass.pojos.entity.Category;

@Repository
public interface ICategoryRepository extends JpaRepository<Category, Integer> {
	Category findByCategoryName(String categoryName);
}
