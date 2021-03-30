package com.g03.ecass.pojos.entity;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Transient;
import javax.validation.constraints.NotNull;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import org.hibernate.validator.constraints.Length;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "user")
public class User extends BaseEntity {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	@NotNull	
	@Column(name = " first_name", length = 15)
	private String firstName;
	@NotNull
	@Column(name = " last_name", length = 20)
	private String lastName;
	@NotNull
	@Column(name = "date_of_birth")
	private LocalDate dateOfBirth;
	@NotNull
	@Column(name = "phone_number", nullable = false)
	private String phoneNumber;
	@NotNull
	@Column(name = " email", length = 30, unique = true)
	private String email;
	@NotNull
	@Column(name = " password", length = 16)
	private String password;
	@Transient
	private String confirmPassword;
	@JsonIgnore
//	@OnDelete(action = OnDeleteAction.CASCADE)
	@OneToMany(mappedBy = "selectedUser", cascade = {CascadeType.PERSIST, CascadeType.REMOVE}, orphanRemoval = true)
	List<OrderDetails> orderDetails = new ArrayList<>();
	@OnDelete(action = OnDeleteAction.NO_ACTION)
	@OneToMany(mappedBy = "selectedCustomer", cascade = CascadeType.PERSIST, orphanRemoval = true)
	@JsonIgnore
	List<Orders> orders = new ArrayList<>();

	public User() {
		System.out.println("User class no argument constructor invoked");
	}
	
	public User(
			@NotNull @Length(max = 15, min = 3, message = "First name length should in between 2 to 15 .....") @Length(max = 15, min = 3, message = "Last name length should in between 2 to 15 .....") String firstName,
			@NotNull String lastName, @NotNull LocalDate dateOfBirth, @NotNull String phoneNumber,
			@NotNull String email, @NotNull String password, String confirmPassword) {
		super();
		this.firstName = firstName;
		this.lastName = lastName;
		this.dateOfBirth = dateOfBirth;
		this.phoneNumber = phoneNumber;
		this.email = email;
		this.password = password;
		this.confirmPassword = confirmPassword;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public LocalDate getDateOfBirth() {
		return dateOfBirth;
	}

	public void setDateOfBirth(LocalDate dateOfBirth) {
		this.dateOfBirth = dateOfBirth;
	}

	public String getPhoneNumber() {
		return phoneNumber;
	}

	public void setPhoneNumber(String phoneNumber) {
		this.phoneNumber = phoneNumber;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getConfirmPassword() {
		return confirmPassword;
	}

	public void setConfirmPassword(String confirmPassword) {
		this.confirmPassword = confirmPassword;
	}

	public List<OrderDetails> getOrderDetails() {
		return orderDetails;
	}

	public void setOrderDetails(List<OrderDetails> orderDetails) {
		this.orderDetails = orderDetails;
	}

	public List<Orders> getOrders() {
		return orders;
	}

	public void setOrders(List<Orders> orders) {
		this.orders = orders;
	}

	@Override
	public String toString() {
		return "User [firstName=" + firstName + ", lastName=" + lastName + ", dateOfBirth=" + dateOfBirth
				+ ", phoneNumber=" + phoneNumber + ", email=" + email + ", password=" + password + ", confirmPassword="
				+ confirmPassword + ", orderDetails=" + orderDetails + ", orders=" + orders + "]";
	}

}
