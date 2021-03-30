package com.g03.ecass.exception;

@SuppressWarnings("serial")
public class NotFoundException extends RuntimeException
{
	public NotFoundException(String message)
	{
		super(message);
	}

}
