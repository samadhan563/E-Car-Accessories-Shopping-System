package com.g03.ecass.utils;

import static java.time.LocalDate.now;

import java.time.LocalDate;
import java.time.Period;
import java.util.List;

import com.g03.ecass.exception.UserHandlingException;
import com.g03.ecass.pojos.entity.User;
import com.sun.el.parser.ParseException;

public class UserValidationUtils {

	static final int MIN_LENGTH;
	static final int MAX_LENGTH;
	static final LocalDate currentDate;
	static {
		MIN_LENGTH = 8;
		MAX_LENGTH = 30;
		currentDate = now();
	}

	public static User valdateAllInput(List<User> users, User user) throws UserHandlingException, ParseException {
		nameValidation(user.getFirstName());
		nameValidation(user.getLastName());
		userDOB(user.getDateOfBirth());
		emailIdValidation(user.getEmail());
		emailIdDuplication(users, user.getEmail());
		passwordValidation(user.getPassword(), user.getConfirmPassword());
		return user;
	}

	public static User valdateAllInput(User user) throws UserHandlingException, ParseException {
		nameValidation(user.getFirstName());
		nameValidation(user.getLastName());
		emailIdValidation(user.getEmail());
		passwordValidation(user.getPassword(), user.getConfirmPassword());
		return user;
	}

	public static void nameValidation(String name) throws UserHandlingException {
		String regexp = "^[A-Za-z]\\w{3,15}$";
		if (!name.matches(regexp))
			throw new UserHandlingException("Invalid name....name can not contain number and name length 3 to 15");
	}

	public static void emailIdValidation(String emailId) throws UserHandlingException {
		if (!emailId.contains("@") || !emailId.endsWith(".com") || emailId.length() < MIN_LENGTH
				|| emailId.length() > MAX_LENGTH)
			throw new UserHandlingException("Invalid EmailId....");

	}

	public static LocalDate userDOB(LocalDate userDob) throws UserHandlingException, ParseException {
		if (Period.between(userDob, currentDate).getYears() < 10)
			throw new UserHandlingException("Invalid user age ..user age should be > 10 years...");
		return userDob;
	}

	public static void emailIdDuplication(List<User> users, String email) throws UserHandlingException {
		for (User user : users) {
			if (email.equals(user.getEmail()))
				throw new UserHandlingException("EmailId already exist....");

		}
	}

	public static void passwordValidation(String password, String confirmPassword) throws UserHandlingException {
		String regexp = "((?=.*\\d)(?=.*[a-z])(?=.*[#@$*]).{8,16})";
		if (password.equals(confirmPassword)) {
			if (!password.matches(regexp))
				throw new UserHandlingException(
						"Password length should be more than 8 or less than 16 and contais Special charactor");
		} else
			throw new UserHandlingException("Password not matched.....");

	}

}
