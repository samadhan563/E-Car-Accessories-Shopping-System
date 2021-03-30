package com.g03.ecass.service.interfaces;

import java.util.List;

import com.g03.ecass.dto.AdminDto;
import com.g03.ecass.dto.LoginRequest;
import com.g03.ecass.dto.UserDto;
import com.g03.ecass.pojos.entity.Admin;
import com.g03.ecass.pojos.entity.User;

public interface IAdminService {
	
	Admin registerNewAdmin(Admin newAdmin);

	List<Admin> getAllAdmin();

	AdminDto getAdminById(int id);

	AdminDto updateAdminById(int id, Admin a);

	AdminDto authenticateAdmin(LoginRequest loginRequest);

}
