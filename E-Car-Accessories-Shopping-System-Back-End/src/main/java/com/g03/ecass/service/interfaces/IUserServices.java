package com.g03.ecass.service.interfaces;

import java.util.List;

import com.g03.ecass.dto.ForgotPasswordDto;
import com.g03.ecass.dto.LoginRequest;
import com.g03.ecass.dto.UserDto;
import com.g03.ecass.exception.UserHandlingException;
import com.g03.ecass.pojos.entity.UserAddress;
import com.g03.ecass.pojos.entity.User;
import com.sun.el.parser.ParseException;

public interface IUserServices {

	UserDto authenticateUser(LoginRequest loginRequest);

	User createAccount(User user) throws UserHandlingException, ParseException;

	User editProfile(int userId, User user);

	String changePassword(int userId, String pwd);

	UserAddress getAddress(int userId);

	String editAddress(int userId, UserAddress address);

	UserAddress getAddressDetails(int orderId);

	List<User> getAllUser();

	UserDto getUserById(int id);

	UserDto deleteUserById(int id);

	String forgotPassword(ForgotPasswordDto chgPass) throws UserHandlingException;

}
