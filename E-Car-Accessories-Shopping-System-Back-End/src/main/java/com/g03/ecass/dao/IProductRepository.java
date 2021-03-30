package com.g03.ecass.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.g03.ecass.pojos.entity.Category;
import com.g03.ecass.pojos.entity.Products;

@Repository
public interface IProductRepository extends JpaRepository<Products, Integer> {
	@Query("select p from Products p join fetch p.category where p.category.id=:cId")
	List<Products> getAllProduct(@Param("cId")int cId);
	
	@Query("select p from Products p join fetch p.category where p.category.id=:cId order by p.finalPrice")
	List<Products> getAllProductlowtohigh(@Param("cId")int cId);
	
	@Query("select p from Products p join fetch p.category where p.category.id=:cId order by p.finalPrice desc")
	List<Products> getAllProducthightolow(@Param("cId")int cId);

	@Query("select p from Products p join fetch p.category where p.productName LIKE :pName%")
	List<Products> getProductListByName(@Param("pName")String pName);

	Products findByProductName(String productName);
	
	
	
	//List<Products> findBySelectedCategory(Category c);

}
