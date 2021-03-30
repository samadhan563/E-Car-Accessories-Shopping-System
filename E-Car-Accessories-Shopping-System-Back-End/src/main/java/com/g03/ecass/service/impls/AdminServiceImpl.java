package com.g03.ecass.service.impls;

import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.g03.ecass.dao.IAdminRepository;
import com.g03.ecass.dao.IUserRepository;
import com.g03.ecass.dto.AdminDto;
import com.g03.ecass.dto.LoginRequest;
import com.g03.ecass.exception.NotFoundException;
import com.g03.ecass.pojos.entity.Admin;
import com.g03.ecass.service.interfaces.IAdminService;

@Service
@Transactional
public class AdminServiceImpl implements IAdminService {
	@Autowired
	private IAdminRepository adminDao;
	@Autowired
	private IUserRepository userDao;

	@Override
	public Admin registerNewAdmin(Admin newAdmin) {
		return adminDao.save(newAdmin);
	}

	@Override
	public List<Admin> getAllAdmin() {

		return adminDao.findAll();
	}

	@Override
	public AdminDto getAdminById(int id) {
		Optional<Admin> optionalAdmin = adminDao.findById(id);
		Admin admin = optionalAdmin.orElseThrow(() -> new NotFoundException("Sorry user not found with id : " + id));
		AdminDto adminDto = new AdminDto();
		BeanUtils.copyProperties(admin, adminDto, "password");
		return adminDto;
	}

	@Override
	public AdminDto updateAdminById(int id, Admin a) {
		Optional<Admin> optionalAdmin = adminDao.findById(id);
		Admin admin = optionalAdmin.orElseThrow(() -> new NotFoundException("Sorry admin not found with id : " + id));
		admin.setFirstName(a.getFirstName());
		admin.setLastName(a.getLastName());
		admin.setEmail(a.getEmail());
		admin.setPassword(a.getPassword());
		AdminDto adminDto = new AdminDto();
		BeanUtils.copyProperties(adminDao.save(admin), adminDto, "password");
		return adminDto;
	}

	@Override
	public AdminDto authenticateAdmin(LoginRequest loginRequest) {
		Admin authenticateAdmin = adminDao.authenticateAdmin(loginRequest.getEmail(), loginRequest.getPassword());
		AdminDto adminDto = new AdminDto();
		BeanUtils.copyProperties(authenticateAdmin, adminDto, "password");
		return adminDto;
	}

}
