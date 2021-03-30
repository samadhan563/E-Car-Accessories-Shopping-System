package com.g03.ecass.dto;

public class PaymentDTO {

	private String paymentType;

	private int orderId;
	private int userId;

	public PaymentDTO() {
		// TODO Auto-generated constructor stub
	}

	public PaymentDTO(String paymentType, int orderId, int userId) {
		super();
		this.paymentType = paymentType;
		this.orderId = orderId;
		this.userId = userId;
	}

	public String getPaymentType() {
		return paymentType;
	}

	public void setPaymentType(String paymentType) {
		this.paymentType = paymentType;
	}

	public int getOrderId() {
		return orderId;
	}

	public void setOrderId(int orderId) {
		this.orderId = orderId;
	}

	public int getUserId() {
		return userId;
	}

	public void setUserId(int userId) {
		this.userId = userId;
	}

	@Override
	public String toString() {
		return "PaymentDTO [paymentType=" + paymentType + ", orderId=" + orderId + ", userId=" + userId + "]";
	}

}
