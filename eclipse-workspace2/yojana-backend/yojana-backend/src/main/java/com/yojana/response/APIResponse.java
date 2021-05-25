package com.yojana.response;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.yojana.response.errors.ErrorMessage;

public class APIResponse implements Serializable  {

    /**
	 * 
	 */
	private static final long serialVersionUID = 3513348536578943403L;

	private List<ErrorMessage> errors;

    private Map<String, Object> data;
    
    public APIResponse() {
    	this.errors = new ArrayList<ErrorMessage>();
    	this.data = new HashMap<String, Object>();
	}
    

	public APIResponse(Map<String, Object> data) {
		this();
		this.data = data;
	}

	public APIResponse(List<ErrorMessage> errors) {
		this();
		this.errors = errors;
	}

	public List<ErrorMessage> getErrors() {
		return errors;
	}

	public void setErrors(List<ErrorMessage> errors) {
		this.errors = errors;
	}

	public Map<String, Object> getData() {
		return data;
	}

	public void setData(Map<String, Object> data) {
		this.data = data;
	}
}
