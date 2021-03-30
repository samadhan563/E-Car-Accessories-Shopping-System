package com.g03.ecass.pojos.entity;


import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.persistence.Transient;
import javax.validation.constraints.NotNull;

@Entity
@Table(name = "admin")
public class Admin extends BaseEntity 
{
	/**
	 * 
	 */
	
	
	private static final long serialVersionUID = 1L;
	@NotNull
	@Column(name = " first_name", length = 20)
	private String firstName;
	@NotNull
	@Column(name = " last_name", length = 20)
	private String lastName;
	@NotNull
	@Column(name = " email", length = 40, unique = true)
	private String email;
	@NotNull
	@Column(name = " password", length = 16)
	private String password;
	@Transient
	private String confirmPassword;
	
	public Admin() {
		
	}

	public Admin(@NotNull String firstName, @NotNull String lastName, @NotNull String email, @NotNull String password,
			String confirmPassword) {
		super();
		this.firstName = firstName;
		this.lastName = lastName;
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
		return "Admin [firstName=" + firstName + ", lastName=" + lastName + ", email=" + email + ", password="
				+ password + ", confirmPassword=" + confirmPassword + ", getId()=" + getId() + "]";
	}
	
			
}
