package com.g03.ecass.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.g03.ecass.pojos.entity.User;

@Repository
public interface IUserRepository extends JpaRepository<User, Integer> {
	@Query("select u from User u where u.email=:email and u.password=:password")
	User authenticateUser(String email, String password);
	@Query("select u from User u where u.email=:email ")
	User getUserByEmail(String email);



}
