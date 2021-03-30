package com.g03.ecass.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.g03.ecass.pojos.entity.UserAddress;

@Repository
public interface IAddressRepository extends JpaRepository<UserAddress, Integer> {

}
