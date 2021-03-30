package com.g03.ecass.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.g03.ecass.pojos.entity.Admin;

public interface IAdminRepository extends JpaRepository<Admin, Integer> {

	@Query(value = "select a from Admin a where a.email=:email and a.password=:password ")
	Admin authenticateAdmin(String email, String password);

}
