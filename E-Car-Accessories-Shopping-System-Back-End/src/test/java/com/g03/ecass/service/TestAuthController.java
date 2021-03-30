package com.g03.ecass.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.time.LocalDate;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.g03.ecass.controller.AuthenticationController;
import com.g03.ecass.controller.UserController;
import com.g03.ecass.dto.LoginRequest;
import com.g03.ecass.dto.ResponseDTO;
import com.g03.ecass.dto.UserDto;
import com.g03.ecass.pojos.entity.User;
import com.g03.ecass.service.interfaces.IUserServices;

@WebMvcTest(controllers = UserController.class)
class TestAuthController {
	@InjectMocks
	private AuthenticationController controller;
	@Autowired
	private MockMvc mockMvc;
	@Autowired
	private ObjectMapper mapper;

	@MockBean // replaces ProductService by it's mock (method are not delegated to actual
	// implementation class)

	private IUserServices userServices;
	UserDto userDto;

	@BeforeEach
	void setUp() throws Exception {
		MockitoAnnotations.initMocks(this);
		userDto = new UserDto();
		userDto.setId(1);
		userDto.setFirstName("Samadhan");
		userDto.setLastName("Gaikwad");
		userDto.setDateOfBirth(LocalDate.parse("1997-02-19"));
		userDto.setEmail("samadhan563@gmail.com");
		userDto.setPhoneNumber("9527644283");
	}

	@Test
	void testCreateAccount() throws Exception {
		/*
		 * User user = new User(); user.setId(1); user.setFirstName("Samadhan");
		 * user.setLastName("Gaikwad");
		 * user.setDateOfBirth(LocalDate.parse("1997-02-19"));
		 * user.setEmail("samadhan563@gmail.com"); user.setPhoneNumber("9527644283");
		 * 
		 */
		when(userServices.authenticateUser(new LoginRequest("samadhan563@gmail.com", "sama"))).thenReturn(userDto);

		ResponseDTO<?> login = controller.login(new LoginRequest("samadhan563@gmail.com", "sama"));
		
		assertNotNull(login.getResult());
		System.out.println(login.getResult());
		// assertEquals(user, authenticateUser);
		assertEquals("Samadhan", login.getResult());

	//	when(userServices.getAllUser()).thenReturn(user);

		User user = new User("Achal", "Jaiswal", LocalDate.parse("1999-01-10"), "9527644283", "achal05@gmail.com",
				"achal#123", "achal#123");
		user.setId(100);

		when(userServices.createAccount(any(User.class))).thenReturn(user);
		mockMvc.perform(post("/customers/signup"). // performs a post request

				content(jsonString(user)). // setting request body as p
				contentType(MediaType.APPLICATION_JSON)) // setting request's content type header
				.andExpect(status().isOk()).// chks if HttpStatus is OK
				andExpect(jsonPath("$.firstName").value("Achal")).// in the response : json key(product name) : grain
				andExpect(jsonPath("$.id").value(100));

	}

	public String jsonString(Object obj) throws Exception {

		return mapper.writeValueAsString(obj);

	}

}