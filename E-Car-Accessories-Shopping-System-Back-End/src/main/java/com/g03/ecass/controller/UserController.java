package com.g03.ecass.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.g03.ecass.dto.ChangePasswordDto;
import com.g03.ecass.dto.ForgotPasswordDto;
import com.g03.ecass.dto.ResponseDTO;
import com.g03.ecass.dto.UserDto;
import com.g03.ecass.exception.UserHandlingException;
import com.g03.ecass.pojos.entity.UserAddress;
import com.g03.ecass.pojos.entity.User;
import com.g03.ecass.service.interfaces.IUserServices;

@RestController
@RequestMapping("/customers")
@CrossOrigin
public class UserController {
	@Autowired
	private IUserServices userService;

	public UserController() {
		System.out.println("in ctor of " + getClass().getName());
	}

	@GetMapping("/show/users")
	public ResponseDTO<?> getAllUsers() {
		System.out.println("PostMapping for registration invoked");
		try {
			List<User> allUser = userService.getAllUser();
			System.out.println("All Users " + allUser);
			return new ResponseDTO<>(HttpStatus.OK, "Users fetch", allUser);

		} catch (Exception e) {
			return new ResponseDTO<>(HttpStatus.INTERNAL_SERVER_ERROR, "User Not Added", null);
		}
	}

	@GetMapping("/show/users/{id}")
	public ResponseDTO<?> getUserById(@PathVariable int id) {
		System.out.println("PostMapping for registration invoked");
		try {
			UserDto user = userService.getUserById(id);
			System.out.println("All Users " + user);
			return new ResponseDTO<>(HttpStatus.OK, "Users fetch", user);

		} catch (Exception e) {
			return new ResponseDTO<>(HttpStatus.INTERNAL_SERVER_ERROR, "User not found....", null);
		}
	}

	@DeleteMapping("/delete/{id}")
	public ResponseDTO<?> deleteUserById(@PathVariable int id) {
		System.out.println("Delete Mapping for user invoked");
		try {
			UserDto user = userService.deleteUserById(id);
			System.out.println("All Users " + user);
			return new ResponseDTO<>(HttpStatus.OK, "Users fetch", user);

		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseDTO<>(HttpStatus.INTERNAL_SERVER_ERROR, "User not deleted....", null);
		}
	}

	@PostMapping("/signup")
	public ResponseDTO<?> createAccount(@RequestBody User user) {
		System.out.println("in createAccount: " + user);
		try {
			User createAccount = userService.createAccount(user);
			return new ResponseDTO<>(HttpStatus.OK, "User Added", createAccount);
		} catch (Exception e) {
			System.out.println("err in createAccount : " + e);
			return new ResponseDTO<>(HttpStatus.INTERNAL_SERVER_ERROR,  e.getMessage(), null);
		}
	}

	@PutMapping("/edit-profile/{userId}")
	public ResponseDTO<?> editProfile(@PathVariable int userId, @RequestBody User user) {
		System.out.println("in editProfile: " + user);
		try {
			return new ResponseDTO<>(HttpStatus.OK, "Edit User Success", userService.editProfile(userId, user));
		} catch (RuntimeException e) {
			System.out.println("err in editProfile : " + e);
			return new ResponseDTO<>(HttpStatus.INTERNAL_SERVER_ERROR, "Edit User Failed", null);
		}
	}

	@PutMapping("/forgot_pwd")
	public ResponseDTO<?> forgotPassword(@RequestBody ForgotPasswordDto chgPass) {
		System.out.println(chgPass);
		System.out.println("in Forgot Password: " + chgPass);
		try {
			return new ResponseDTO<>(HttpStatus.OK, "Password forgot successfully",
					userService.forgotPassword(chgPass));
		} catch (RuntimeException | UserHandlingException e) {
			System.out.println("err in changePassword : " + e);
			return new ResponseDTO<>(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage(), null);
		}
	}

	@PutMapping("/change_pwd")
	public ResponseDTO<?> changePassword(@RequestBody ChangePasswordDto chgPass) {
		System.out.println(chgPass);
		System.out.println("in changePassword: " + chgPass.getId() + "Pass : " + chgPass.getPassword());
		try {
			return new ResponseDTO<>(HttpStatus.OK, "Password Changed successfully",
					userService.changePassword(chgPass.getId(), chgPass.getPassword()));
		} catch (RuntimeException e) {
			System.out.println("err in changePassword : " + e);
			return new ResponseDTO<>(HttpStatus.INTERNAL_SERVER_ERROR, "Password Changed Failed", null);
		}
	}

	@GetMapping("/address/{userId}")
	public ResponseDTO<?> getAddress(@PathVariable int userId) {
		System.out.println("in userId: " + userId);
		try {
			return new ResponseDTO<>(HttpStatus.OK, "Address Added", userService.getAddress(userId));
		} catch (RuntimeException e) {
			System.out.println("err in userId : " + e);
			return new ResponseDTO<>(HttpStatus.INTERNAL_SERVER_ERROR, "Address Not Added", null);
		}
	}

	@PutMapping("/address/{userId}")
	public ResponseDTO<?> editAddress(@PathVariable int userId, @RequestBody UserAddress address) {
		System.out.println("in editAddress: " + userId + "Address : " + address);
		try {
			return new ResponseDTO<>(HttpStatus.OK, "Address Changed successfully",
					userService.editAddress(userId, address));
		} catch (RuntimeException e) {
			System.out.println("err in editAddress : " + e);
			return new ResponseDTO<>(HttpStatus.INTERNAL_SERVER_ERROR, "Address Changed Failed", null);
		}
	}

	@GetMapping("/addressdetails/{orderId}")
	public ResponseDTO<?> getAddressDetails(@PathVariable int orderId) {
		System.out.println("in getAddressDetails: " + orderId);
		try {
			return new ResponseDTO<>(HttpStatus.OK, "Address Added", userService.getAddressDetails(orderId));
		} catch (RuntimeException e) {
			System.out.println("err in getAddressDetails : " + e);
			return new ResponseDTO<>(HttpStatus.INTERNAL_SERVER_ERROR, "Address Not Added", null);
		}
	}
}
