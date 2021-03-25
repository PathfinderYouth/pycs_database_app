package com.yojana.response.mappers;


import java.util.ArrayList;

import javax.persistence.PersistenceException;
import org.hibernate.exception.ConstraintViolationException;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.ext.ExceptionMapper;
import javax.ws.rs.ext.Provider;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.yojana.response.APIResponse;
import com.yojana.response.errors.ErrorMessage;


@Provider
public class PersistenceExceptionMapper implements ExceptionMapper<PersistenceException> {

  private static final Logger LOGGER = LoggerFactory.getLogger(PersistenceExceptionMapper.class);

  public Response toResponse(final PersistenceException exception) {
    LOGGER.debug("Persistence failure", exception);
    Response response;
    if (exception.getCause() instanceof ConstraintViolationException) {
      final String details =
          "Violated "
              + ((ConstraintViolationException) exception.getCause()).getConstraintName()
              + " constraint.";
      
      APIResponse res = new APIResponse(new ArrayList<ErrorMessage>() {
		/**
		 * 
		 */
		private static final long serialVersionUID = 2503171845260662633L;

		{	add(new ErrorMessage(
              Response.Status.CONFLICT.getStatusCode(), "Constraint violation failure", details
    	  ));
    	  }
      });
      
      response =
          Response.status(Response.Status.CONFLICT)
              .type(MediaType.APPLICATION_JSON_TYPE)
              .entity(res)
              .build();
    } else {
      response =
          Response.status(Response.Status.INTERNAL_SERVER_ERROR)
              .type(MediaType.APPLICATION_JSON_TYPE)
              .entity(
                  new ErrorMessage(Response.Status.INTERNAL_SERVER_ERROR.getStatusCode(), "Persistence failure", exception.getMessage()))
              .build();
    }

    return response;
  }
}

