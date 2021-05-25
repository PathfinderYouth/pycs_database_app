package com.yojana.services.employee;


import java.net.URI;
import java.util.List;
import java.util.UUID;

import javax.inject.Inject;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.PATCH;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import com.yojana.access.EmployeeManager;
import com.yojana.access.LeaveRequestManager;
import com.yojana.access.ProjectManager;
import com.yojana.access.WorkPackageManager;
import com.yojana.model.employee.Employee;
import com.yojana.model.employee.LeaveRequest;
import com.yojana.model.employee.LeaveRequestType;
import com.yojana.model.project.Project;
import com.yojana.model.project.WorkPackage;
import com.yojana.model.project.WorkPackagePK;
import com.yojana.response.APIResponse;
import com.yojana.response.errors.ErrorMessageBuilder;
import com.yojana.security.annotations.AuthenticatedEmployee;
import com.yojana.security.annotations.Secured;

@Path("/leaverequest")
@Secured
public class LeaveRequestService {
	
	@Inject
	// Provides access to the employee table
	private EmployeeManager employeeManager;
	
	@Inject
	// Provides access to the project table
	private LeaveRequestManager leaveManager;

	@POST
	@Consumes("application/json")
	@Produces("application/json")
	// Inserts a timesheet ain't the database
	public Response persist(LeaveRequest leave) {
		APIResponse res = new APIResponse();
		if (leave.getEmpId() > 0) {
			final Employee emp = employeeManager.find(leave.getEmpId());
			if (emp == null) {
				ErrorMessageBuilder.notFound("Could not find employee for timesheet", null);
				return Response.status(Response.Status.NOT_FOUND).entity(res).build();
			}
			leave.setEmployee(emp);
		}
		UUID uuid = UUID.randomUUID();
		leave.setId(uuid.toString());
		leaveManager.persist(leave);
		return Response.created(URI.create("/leave/" + leave.getId())).entity(res).build();
	}

	@GET
	@Produces("application/json")
	// Gets a list of all requests
	public Response getAll() {
		final APIResponse res = new APIResponse();
		List<LeaveRequest> projects = leaveManager.getAll();
		if (projects == null) {
			res.getErrors().add(ErrorMessageBuilder.notFoundMultiple("Leave Reuest", null));
			return Response.status(Response.Status.NOT_FOUND).entity(res).build();
		}
		res.getData().put("leaveRequest", projects);
		return Response.ok().entity(res).build();
	}

	@GET
    @Path("/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	// Finds Request using id
	public Response find(@PathParam("id") String id) {
		LeaveRequest leave = leaveManager.find(id);
		APIResponse res = new APIResponse();
		if (leave == null) {
			res.getErrors().add(ErrorMessageBuilder.notFoundSingle("Leave Request",
					id + "",
					null
					));
			return Response.status(Response.Status.NOT_FOUND).entity(res).build();
		}
        res.getData().put("leaveRequest", leave);
        return Response.ok().entity(res).build();
	}
	
	@DELETE
	@Path("/{id}")
	@Produces("application/json")
	public Response del(@PathParam("id") String id) {
		APIResponse res = new APIResponse();
		LeaveRequest leave = leaveManager.find(id);
		leaveManager.remove(leave, id);
		res.getData().put("leaveRequest", leave);
		return Response.ok().entity(new APIResponse()).build();	
	}
	
	@PATCH
	@Path("/")
	@Consumes("application/json")
	@Produces("application/json")
	public Response change(LeaveRequest req) {
		APIResponse res = new APIResponse();
		leaveManager.merge(req);
		res.getData().put("leaveRequest", req);
		return Response.ok().entity(res).build();	
	}
	

	@GET
	@Consumes("application/json")
	@Produces("application/json")
	// Gets a list of all requests
	public Response getByType(LeaveRequest req) {
		final APIResponse res = new APIResponse();
		System.out.print(req.getType().toString());
		List<LeaveRequest> projects = leaveManager.findByType(req.getType().toString());
		if (projects == null) {
			res.getErrors().add(ErrorMessageBuilder.notFoundMultiple("Leave Reuest", null));
			return Response.status(Response.Status.NOT_FOUND).entity(res).build();
		}
		res.getData().put("leaveRequest", projects);
		return Response.ok().entity(res).build();
	}

	@GET
	@Path("/emp/{id}")
	@Produces("application/json")
	public Response getWorkPackages(@PathParam("id") String projectId) {
		final APIResponse res = new APIResponse();
		List<LeaveRequest> projects = leaveManager.findByEmp(projectId);
		if (projects == null) {
			res.getErrors().add(ErrorMessageBuilder.notFoundMultiple("Leave Reuest", null));
			return Response.status(Response.Status.NOT_FOUND).entity(res).build();
		}
		res.getData().put("leaveRequest", projects);
		return Response.ok().entity(res).build();
	}
}
