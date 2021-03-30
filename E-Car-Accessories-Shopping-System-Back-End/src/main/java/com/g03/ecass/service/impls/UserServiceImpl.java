package com.g03.ecass.service.impls;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.g03.ecass.dao.IAddressRepository;
import com.g03.ecass.dao.IOrdersRepository;
import com.g03.ecass.dao.IUserRepository;
import com.g03.ecass.dto.ForgotPasswordDto;
import com.g03.ecass.dto.LoginRequest;
import com.g03.ecass.dto.UserDto;
import com.g03.ecass.exception.UserHandlingException;
import com.g03.ecass.pojos.entity.UserAddress;
import com.g03.ecass.pojos.entity.Orders;
import com.g03.ecass.pojos.entity.User;
import com.g03.ecass.service.interfaces.IUserServices;
import com.g03.ecass.utils.UserValidationUtils;
import com.sun.el.parser.ParseException;

@Service
@Transactional
public class UserServiceImpl implements IUserServices {
	@Autowired
	private IUserRepository userRepo;

	@Autowired
	private IAddressRepository addressrepo;

	@Autowired
	private IOrdersRepository orderRepo;

	@Override
	public UserDto authenticateUser(LoginRequest loginRequest) {
		User user = userRepo.authenticateUser(loginRequest.getEmail(), loginRequest.getPassword());

		UserDto userDto = new UserDto();
		BeanUtils.copyProperties(user, userDto, "password");
		return userDto;
	}

	@Override
	public List<User> getAllUser() {
		return userRepo.findAll();
	}

	@Override
	public UserDto getUserById(int id) {
		User user = userRepo.findById(id).get();

		UserDto userDto = new UserDto();
		BeanUtils.copyProperties(user, userDto);
		return userDto;
	}

	@Override
	public UserDto deleteUserById(int id) {
		User user = userRepo.findById(id).get();
		userRepo.deleteById(id);
		UserDto userDto = new UserDto();
		BeanUtils.copyProperties(user, userDto);
		return userDto;
	}

	@Override
	public User createAccount(User user) throws UserHandlingException, ParseException {

		UserValidationUtils.valdateAllInput(userRepo.findAll(), user);
		User u = userRepo.save(user);
		UserAddress add = new UserAddress();
		add.setCity("Pune");
		add.setState("Maharashtra");
		add.setCurrentUser(u);
		addressrepo.save(add);
		return u;
	}

	@Override
	public User editProfile(int userId, User newUser) {
		User user = userRepo.findById(userId).get();
		user.setFirstName(newUser.getFirstName());
		user.setLastName(newUser.getLastName());
		user.setPhoneNumber(newUser.getPhoneNumber());
		if (newUser.getPassword() != null)
			user.setPassword(newUser.getPassword());
		if (newUser.getConfirmPassword() != null)
			user.setConfirmPassword(newUser.getConfirmPassword());
		user.setDateOfBirth(newUser.getDateOfBirth());
		System.out.println(newUser);
		System.out.println(user);
		return userRepo.save(user);
	}

	@Override
	public String forgotPassword(ForgotPasswordDto chgPass) throws UserHandlingException {
		User user = userRepo.getUserByEmail(chgPass.getEmail());
		UserValidationUtils.passwordValidation(chgPass.getPassword(), chgPass.getConfirmPassword());
		user.setPassword(chgPass.getPassword());
		userRepo.save(user);
		return "Password Updated successfully";
	}

	@Override
	public String changePassword(int userId, String pwd) {
		User u = userRepo.findById(userId).get();
		u.setPassword(pwd);
		userRepo.save(u);
		return "Password Changed successfully";
	}

	@Override
	public UserAddress getAddress(int userId) {
		return addressrepo.findById(userId).get();
	}

	@Override
	public String editAddress(int userId, UserAddress address) {
		UserAddress add = addressrepo.findById(userId).get();
		System.out.println("address : " + add);
		if (add != null) {
			add.setArea(address.getArea());
			add.setCity(address.getCity());
			add.setFlatNo(address.getFlatNo());
			add.setPinCode(address.getPinCode());
			add.setSocietyName(address.getSocietyName());
			add.setState(address.getState());
		}
		return "Address Changed successfully";
	}

	@Override
	public UserAddress getAddressDetails(int orderId) {
		Orders od = orderRepo.findById(orderId).get();
		User u = od.getSelectedCustomer();
		return addressrepo.findById(u.getId()).get();
	}

}
