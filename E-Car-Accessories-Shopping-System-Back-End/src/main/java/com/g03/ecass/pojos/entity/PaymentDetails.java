package com.g03.ecass.pojos.entity;

import java.time.LocalDate;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.validation.constraints.NotNull;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import com.g03.ecass.dto.InChargeRequestDto.Currency;

@Entity
public class PaymentDetails extends BaseEntity {
	private double amount;
	@Enumerated(EnumType.STRING)
	private Currency currency;

	private String reciptEmail;

	private String chId;

	@NotNull
	@Column(name = "payment_gateway", length = 20, nullable = false)
	@Enumerated(EnumType.STRING)
	private Gateway paymentGateway;
	@NotNull
	private LocalDate paymentDate;
	@NotNull
	@Column(name = "payment_status", length = 20, nullable = false)
	@Enumerated(EnumType.STRING)
	private Status paymentStatus;
	@OneToOne(cascade = CascadeType.REMOVE)
	@JoinColumn(name = "order_id")
	private Orders order;
	@OneToOne(cascade = CascadeType.REMOVE)
	@JoinColumn(name = "user_id")
	private User user;

	public PaymentDetails() {
		// TODO Auto-generated constructor stub
	}

	public PaymentDetails(double amount, Currency currency, String reciptEmail, String chId,
			@NotNull Gateway paymentGateway, @NotNull LocalDate paymentDate, @NotNull Status paymentStatus) {
		super();
		this.amount = amount;
		this.currency = currency;
		this.reciptEmail = reciptEmail;
		this.chId = chId;
		this.paymentGateway = paymentGateway;
		this.paymentDate = paymentDate;
		this.paymentStatus = paymentStatus;
	}

	public double getAmount() {
		return amount;
	}

	public void setAmount(double amount) {
		this.amount = amount;
	}

	public Currency getCurrency() {
		return currency;
	}

	public void setCurrency(Currency currency) {
		this.currency = currency;
	}

	public String getReciptEmail() {
		return reciptEmail;
	}

	public void setReciptEmail(String reciptEmail) {
		this.reciptEmail = reciptEmail;
	}

	public String getChId() {
		return chId;
	}

	public void setChId(String chId) {
		this.chId = chId;
	}

	public Gateway getPaymentGateway() {
		return paymentGateway;
	}

	public void setPaymentGateway(Gateway paymentGateway) {
		this.paymentGateway = paymentGateway;
	}

	public LocalDate getPaymentDate() {
		return paymentDate;
	}

	public void setPaymentDate(LocalDate paymentDate) {
		this.paymentDate = paymentDate;
	}

	public Status getPaymentStatus() {
		return paymentStatus;
	}

	public void setPaymentStatus(Status paymentStatus) {
		this.paymentStatus = paymentStatus;
	}

	public Orders getOrder() {
		return order;
	}

	public void setOrder(Orders order) {
		this.order = order;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	@Override
	public String toString() {
		return "PaymentDetails [amount=" + amount + ", currency=" + currency + ", reciptEmail=" + reciptEmail
				+ ", chId=" + chId + ", paymentGateway=" + paymentGateway + ", paymentDate=" + paymentDate
				+ ", paymentStatus=" + paymentStatus + "]";
	}

}
