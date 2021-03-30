package com.g03.ecass.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.g03.ecass.dto.AdminDto;
import com.g03.ecass.dto.LoginRequest;
import com.g03.ecass.dto.ResponseDTO;
import com.g03.ecass.dto.UserDto;
import com.g03.ecass.service.interfaces.IAdminService;
import com.g03.ecass.service.interfaces.IUserServices;


@RestController
@CrossOrigin
@RequestMapping("/auth")
public class AuthenticationController {

	@Autowired
	private IUserServices userServices;
	@Autowired
	private IAdminService adminServices;

	@PostMapping("/login")
	public ResponseDTO<?> login(@RequestBody LoginRequest loginRequest) {
		try {
			UserDto authenticatedUser = userServices.authenticateUser(loginRequest);
			System.out.println(authenticatedUser);
			return new ResponseDTO<>(HttpStatus.OK, "Login successfully",authenticatedUser);
			
		} catch (Exception e) {
			try {
				AdminDto authenticatedAdmin = adminServices.authenticateAdmin(loginRequest);
				return new ResponseDTO<>(HttpStatus.OK, "Login successfully",authenticatedAdmin);
			} catch (Exception exc) {
				return new ResponseDTO<>(HttpStatus.INTERNAL_SERVER_ERROR," Incorrect password or email", null);
			}
		}
	}

}
