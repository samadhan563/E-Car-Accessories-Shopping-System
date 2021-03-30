package com.g03.ecass.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.when;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import com.g03.ecass.dao.IUserRepository;
import com.g03.ecass.dto.LoginRequest;
import com.g03.ecass.dto.UserDto;
import com.g03.ecass.exception.UserHandlingException;
import com.g03.ecass.pojos.entity.User;
import com.g03.ecass.service.impls.UserServiceImpl;
import com.sun.el.parser.ParseException;

class TestForUserServiceImpl {
	@Mock
	private IUserRepository userRepo;
	@InjectMocks
	private UserServiceImpl userService;

	@SuppressWarnings("deprecation")
	@BeforeEach
	void setUp() throws Exception {
		MockitoAnnotations.initMocks(this);
	}

	@Test
	void testAuthenticateUser() {
		User user = new User();
		user.setId(1);
		user.setFirstName("Samadhan");
		user.setLastName("Gaikwad");
		user.setDateOfBirth(LocalDate.parse("1997-02-19"));
		user.setEmail("samadhan563@gmail.com");
		user.setPhoneNumber("9527644283");
		when(userRepo.authenticateUser(anyString(), anyString())).thenReturn(user);
		UserDto authenticateUser = userService.authenticateUser(new LoginRequest("samadhan563@gmail.com", "sama#123"));
		assertNotNull(authenticateUser);
		System.out.println(authenticateUser);
		// assertEquals(user, authenticateUser);
		assertEquals("Samadhan", authenticateUser.getFirstName());
	}

	@Test
	void testAuthenticateUserFailure() {
		User user = new User();
		user.setId(1);
		user.setFirstName("Samadhan");
		user.setLastName("Gaikwad");
		user.setDateOfBirth(LocalDate.parse("1997-02-19"));
		user.setEmail("samadhan@gmail.com");
		user.setPhoneNumber("9527644283");
		when(userRepo.authenticateUser(anyString(), anyString())).thenReturn(user);
		UserDto authenticateUser = userService.authenticateUser(new LoginRequest("samadhan@gmail.com", "sama#123"));
		assertNotNull(authenticateUser);
		System.out.println(authenticateUser);
		assertEquals(user.getFirstName(), authenticateUser.getFirstName());
	}

	@Test
	void testAuthenticateUser_Exception() {
		when(userRepo.authenticateUser(anyString(), anyString())).thenReturn(null);
		assertThrows(Exception.class, () -> {
			userService.authenticateUser(new LoginRequest("samadhan563@gmail.com", "sama#123"));
		});

	}

	@Test
	void testGetAllUser_Failure() {
		List<User> users = new ArrayList<>();
		User user1 = new User();
		user1.setId(1);
		user1.setFirstName("Samadhan");
		user1.setLastName("Gaikwad");
		user1.setDateOfBirth(LocalDate.parse("1997-02-19"));
		user1.setEmail("samadhan@gmail.com");
		user1.setPassword("sama#123");
		user1.setPhoneNumber("9527644283");
		user1.setConfirmPassword("sama#123");
		users.add(user1);
		when(userRepo.findAll()).thenReturn(users);
		List<User> allUser = userService.getAllUser();
		assertNotNull(allUser);
		System.out.println(allUser.get(1));
		assertEquals(user1, allUser.get(1));
	}

	// test case for get all user ----> success case :)
	@Test
	void testGetAllUser_Sucess() {
		List<User> users = new ArrayList<>();
		User user1 = new User();
		user1.setId(1);
		user1.setFirstName("Samadhan");
		user1.setLastName("Gaikwad");
		user1.setDateOfBirth(LocalDate.parse("1997-02-19"));
		user1.setEmail("samadhan@gmail.com");
		user1.setPassword("sama#123");
		user1.setPhoneNumber("9527644283");
		user1.setConfirmPassword("sama#123");

		users.add(user1);
		when(userRepo.findAll()).thenReturn(users);
		List<User> allUser = userService.getAllUser();
		assertNotNull(allUser);
		System.out.println(allUser.get(0));
		assertEquals(user1, allUser.get(0));
	}

	@Test
	void testCreateAccount() throws UserHandlingException, ParseException {
		User user = new User();
		user.setId(4);
		user.setFirstName("Samadhan");
		user.setLastName("Gaikwad");
		user.setDateOfBirth(LocalDate.parse("1997-02-19"));
		user.setEmail("samadhan@gmail.com");
		user.setPassword("sama#123");
		user.setPhoneNumber("9527644283");
		user.setConfirmPassword("sama#123");
		when(userRepo.save(new User(anyString(), anyString(), LocalDate.parse("1997-02-19"), anyString(), anyString(),
				anyString(), anyString()))).thenReturn(user);
		User newUser = userService.createAccount(user);
		assertNotNull(newUser);
		System.out.println(newUser);
		assertEquals(user.getFirstName(), newUser.getFirstName());
	}

}
