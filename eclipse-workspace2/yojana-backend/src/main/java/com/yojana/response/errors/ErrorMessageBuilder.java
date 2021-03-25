/**
 * 
 */
package com.yojana.response.errors;

import javax.ws.rs.core.Response;

/**
 * @author yogeshverma
 *
 */
public final class ErrorMessageBuilder {
	
	public static ErrorMessage badRequest(String message, String details) {
		return new ErrorMessage(
				Response.Status.BAD_REQUEST.getStatusCode(),
				message,
				details);
	}
	
	public static ErrorMessage notFound(String message, String details) {
		return new ErrorMessage(
				Response.Status.NOT_FOUND.getStatusCode(),
				message,
				details
				);
	}
	
	public static ErrorMessage notFoundSingle(String entityType, String id, String details) {
		return notFound(
				"Could not find " + entityType + "with id: " + id,
				details
				);
	}

	public static ErrorMessage notFoundMultiple(String entityType, String details) {
		return notFound(
				"There are no " + entityType + "'s at the moment",
				details
				);
	}

}
