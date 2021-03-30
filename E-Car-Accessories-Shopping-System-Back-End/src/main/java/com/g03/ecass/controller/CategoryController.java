package com.g03.ecass.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.g03.ecass.pojos.entity.Category;
import com.g03.ecass.service.interfaces.ICategoryServices;

@CrossOrigin
@RestController
@RequestMapping("/category")
public class CategoryController {

	@Autowired
	private ICategoryServices categoryServices;

	public CategoryController() {

		System.out.println("Category Controller Invoked........");
	}

	@GetMapping("/show")
	public ResponseEntity<?> getAllCategory() {
		try {
			return new ResponseEntity<>(categoryServices.getAllCategory(), HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@GetMapping("/show/{id}")
	public ResponseEntity<?> getAllCategory(@PathVariable int id) {
		try {
			return new ResponseEntity<>(categoryServices.getCategoryById(id), HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@PostMapping("/add")
	public ResponseEntity<?> addCategory(@RequestBody Category category) {
		try {
			System.out.println(category);
			return new ResponseEntity<>(categoryServices.addCategory(category), HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
		}

	}
	
	@PutMapping("/update/{id}")
	public ResponseEntity<?> updateCategory(@RequestBody Category category, @PathVariable int id) {
		try {
			System.out.println(category);
			return new ResponseEntity<>(categoryServices.updateCategory(category, id), HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
		}

	}
	@DeleteMapping("/delete/{id}")
	public ResponseEntity<?> deleteCategory(@PathVariable int id) {
		try {
			return new ResponseEntity<>(categoryServices.deleteCategory( id), HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
		}

	}


}
