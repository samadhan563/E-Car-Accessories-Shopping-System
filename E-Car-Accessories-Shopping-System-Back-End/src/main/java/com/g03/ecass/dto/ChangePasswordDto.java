package com.g03.ecass.dto;

import javax.persistence.Column;

import com.sun.istack.NotNull;

public class ChangePasswordDto {

	@NotNull
	private int id;
	@Column(length = 20, nullable = false)
	private String password;

	public ChangePasswordDto() {
		// TODO Auto-generated constructor stub
	}

	public ChangePasswordDto(int id, String password) {
		super();
		this.id = id;
		this.password = password;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	@Override
	public String toString() {
		return "ChangePasswordDto [id=" + id + ", password=" + password + "]";
	}

}
