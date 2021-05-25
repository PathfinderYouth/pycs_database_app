package com.yojana.services.employee;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.inject.Inject;
import javax.transaction.Transactional;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import com.yojana.access.CredentialManager;
import com.yojana.access.EmployeeManager;
import com.yojana.model.employee.Credential;
import com.yojana.model.employee.Employee;
import com.yojana.response.APIResponse;
import com.yojana.response.errors.ErrorMessageBuilder;

@Path("/credentials")
public class CredentialService {

	@Inject
	private CredentialManager credManager;
	
	@Inject
	private EmployeeManager empManager;

	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@Transactional
	public Response persist(Credential credentials) {
		APIResponse res = new APIResponse();
		if (credentials.getEmpID() > 0) {
			final Employee employee = empManager.find(credentials.getEmpID());
			if (employee == null) {
				res.getErrors().add(ErrorMessageBuilder.notFound("Cannot find corresponding employee for credential", null));
				return Response.status(Response.Status.NOT_FOUND).entity(res).build();
			}
			credentials.setEmp(employee);
		} else {
			res.getErrors().add(ErrorMessageBuilder.badRequest("No employee passed for the credentials", null));
			return Response.status(Response.Status.BAD_REQUEST).entity(res).build();
		}
		credManager.persist(credentials);
		return Response.ok().entity(res).build();
	}

	@DELETE
	@Path("/{id}")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	@Transactional
	public Response remove(@PathParam("id") int credID) {
		APIResponse res = new APIResponse();
		final Credential cred = credManager.find(credID);
		if (cred == null) {
			res.getErrors().add(ErrorMessageBuilder.notFound("Cannot find credential to be deleted", null));
			return Response.status(Response.Status.NOT_FOUND).entity(res).build();
		}
		credManager.remove(cred);
		return Response.ok().entity(res).build();
	}

	@GET
	@Produces(MediaType.APPLICATION_JSON)
	@Transactional
	public Response getAll() {
		final List<Credential> credentials = credManager.getAll();
    	Map<String, Object> data = new HashMap<String, Object>();
        data.put("credentials", credentials);
        return Response.ok().entity(new APIResponse(data)).build();
	}
}
