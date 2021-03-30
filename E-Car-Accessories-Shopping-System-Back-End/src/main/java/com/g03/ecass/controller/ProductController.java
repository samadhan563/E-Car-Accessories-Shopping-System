package com.g03.ecass.controller;

import java.util.List;

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

import com.g03.ecass.pojos.entity.Products;
import com.g03.ecass.service.interfaces.IProductServices;

@RestController
@CrossOrigin
@RequestMapping("product")
public class ProductController {

	@Autowired
	private IProductServices productServices;

	public ProductController() {

	}

	@GetMapping("/show")
	public ResponseEntity<?> showProduct() {
		System.out.println("GetMapping for add product invoked");
		try {
			List<Products> allProduct = productServices.getProduct();
			System.out.println("RegisterSucessfully " + allProduct);
			return new ResponseEntity<>(allProduct, HttpStatus.CREATED);

		} catch (Exception e) {
			System.out.println(e);
			return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	@GetMapping("/show/{id}")
	public ResponseEntity<?> getProductById(@PathVariable int id) {
		System.out.println("GetMapping for add product invoked");
		try {
			Products allProduct = productServices.getProductById(id);
			System.out.println("RegisterSucessfully " + allProduct);
			return new ResponseEntity<>(allProduct, HttpStatus.CREATED);

		} catch (Exception e) {
			return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	@GetMapping("/list/{id}")
	public ResponseEntity<?> fetchProductsByCategoryId(@PathVariable int id) {
		System.out.println("GetMapping for add product invoked");
		try {
			List<Products> allProduct = productServices.fetchProductsByCategoryId(id);
			System.out.println("RegisterSucessfully " + allProduct);
			return new ResponseEntity<>(allProduct, HttpStatus.CREATED);

		} catch (Exception e) {
			return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@PostMapping("/add-by-cat-name/{catName}")
	//public ResponseEntity<?> addProduct(@RequestBody ProductsDto product, @PathVariable int catId) {
		public ResponseEntity<?> addProduct(@RequestBody Products product, @PathVariable String catName) {		
		System.out.println("PostMapping for add product invoked");
		try {
			
			System.out.println(product);
			//System.out.println(product.getImageUrl().toString());
			Products addProduct = productServices.addProduct(product,catName);
			System.out.println("RegisterSucessfully " + addProduct);
			return new ResponseEntity<>(addProduct, HttpStatus.CREATED);
			//return ResponseEntity.ok(product);

		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	@PostMapping(value = "/add/{catId}")
	//public ResponseEntity<?> addProduct(@RequestBody ProductsDto product, @PathVariable int catId) {
		public ResponseEntity<?> addProduct(@RequestBody Products product, @PathVariable int catId) {		
		System.out.println("PostMapping for add product invoked");
		try {
			
			System.out.println(product);
			//System.out.println(product.getImageUrl().toString());
			Products addProduct = productServices.addProduct(product,catId);
			System.out.println("RegisterSucessfully " + addProduct);
			return new ResponseEntity<>(addProduct, HttpStatus.CREATED);
			//return ResponseEntity.ok(product);

		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	@PutMapping("/update/{pId}")
	public ResponseEntity<?> updateProduct(@RequestBody Products product, @PathVariable int pId) {
		System.out.println("PutMapping for add product invoked"+product);
		try {
			Products updatedProduct = productServices.updateProduct(product,pId);
			System.out.println("Product added Sucessfully " + updatedProduct);
			return new ResponseEntity<>(updatedProduct, HttpStatus.CREATED);

		} catch (Exception e) {
			return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	@DeleteMapping("/delete/{pId}")
	public ResponseEntity<?> deleteProduct( @PathVariable int pId) {
		System.out.println("Delete Mapping for delete product invoked");
		try {
			Products updatedProduct = productServices.deleteProduct(pId);
			System.out.println("RegisterSucessfully " + updatedProduct);
			return new ResponseEntity<>("Removed Successfully", HttpStatus.CREATED);

		} catch (Exception e) {
			return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

}
