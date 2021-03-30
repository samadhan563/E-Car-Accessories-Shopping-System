package com.g03.ecass.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.g03.ecass.dto.UserDto;
import com.g03.ecass.pojos.entity.Admin;
import com.g03.ecass.service.interfaces.IAdminService;

@RestController
@RequestMapping("/admin")
@CrossOrigin
public class AdminController {
	@Autowired
	private IAdminService adminServices;
	
	public AdminController() {
		System.out.println("Admin  controller default constructor invoked.....");
	}

	@GetMapping("/show")
	public List<Admin> getAll() {
		return adminServices.getAllAdmin();
	}

	@PostMapping("/register")
	public ResponseEntity<?> registerNewAdmin(@RequestBody Admin newAdmin) {
		System.out.println("PostMapping for registration invoked");
		try {
			Admin registerNewAdmin = adminServices.registerNewAdmin(newAdmin);
			System.out.println("RegisterSucessfully " + registerNewAdmin);
			return new ResponseEntity<>(registerNewAdmin, HttpStatus.CREATED);

		} catch (Exception e) {
			return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	/*
	 * @GetMapping("/show/users") public ResponseEntity<?> getAllUsers() {
	 * System.out.println("PostMapping for registration invoked"); try {
	 * List<UserDto> users = adminServices.getAllUsers();
	 * System.out.println("All Users " + users); return new ResponseEntity<>(users,
	 * HttpStatus.CREATED);
	 * 
	 * } catch (Exception e) { return new ResponseEntity<>(e.getMessage(),
	 * HttpStatus.OK); } }
	 */
	

}
