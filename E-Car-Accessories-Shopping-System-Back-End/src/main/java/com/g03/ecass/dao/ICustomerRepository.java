package com.g03.ecass.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.g03.ecass.pojos.entity.User;

@Repository
public interface ICustomerRepository extends JpaRepository<User, Integer> {

}
