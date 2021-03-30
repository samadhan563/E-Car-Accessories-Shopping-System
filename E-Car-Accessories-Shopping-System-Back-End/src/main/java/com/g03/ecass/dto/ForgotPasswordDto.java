package com.g03.ecass.dto;

import javax.persistence.Column;

import com.sun.istack.NotNull;

public class ForgotPasswordDto {
	@NotNull
	@Column(length = 20, nullable = false)
	private String email;
	@Column(length = 20, nullable = false)
	private String password;
	@Column(length = 20, nullable = false)
	private String confirmPassword;

	public ForgotPasswordDto() {
		// TODO Auto-generated constructor stub
	}

	public ForgotPasswordDto(String email, String password, String confirmPassword) {
		super();
		this.email = email;
		this.password = password;
		this.confirmPassword = confirmPassword;
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

	@Override
	public String toString() {
		return "ForgotPasswordDto [email=" + email + ", password=" + password + ", confirmPassword=" + confirmPassword
				+ "]";
	}

}
