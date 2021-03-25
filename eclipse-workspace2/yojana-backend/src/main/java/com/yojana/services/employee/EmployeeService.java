package com.yojana.services.employee;

import java.net.URI;
import java.sql.SQLException;
import java.util.List;
import java.util.UUID;

import javax.inject.Inject;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.PATCH;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import com.yojana.access.EmployeeManager;
import com.yojana.access.TimesheetManager;
import com.yojana.model.employee.Employee;
import com.yojana.model.timesheet.Timesheet;
import com.yojana.response.APIResponse;
import com.yojana.response.errors.ErrorMessageBuilder;
import com.yojana.security.annotations.Secured;

@Secured
@Path("/employees")
public class EmployeeService {

    @Inject
    // Provides access to the employee table
    private EmployeeManager employeeManager;
    
    @Inject
    private TimesheetManager timesheetManager;
    
    @GET
    @Path("/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	// Finds an employee
	public Response find(@PathParam("id") int id) {
		Employee employee = employeeManager.find(id);
		APIResponse res = new APIResponse();
		if (employee == null) {
			res.getErrors().add(ErrorMessageBuilder.notFoundSingle("employee",
					id + "",
					null
					));
			return Response.status(Response.Status.NOT_FOUND).entity(res).build();
		}
        res.getData().put("employee", employee);
        return Response.ok().entity(res).build();
	}
	
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	// Inserts an employee in the database
	public Response persist(Employee employee) {
		APIResponse res = new APIResponse();
		employeeManager.persist(employee);
		res.getData().put("id", employee.getId());
		return Response
				.created(URI.create("/employees/" + employee.getId()))
				.entity(res)
				.build();
	}
	

	@PATCH
	@Path("/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	// Updates an existing employee
	public Response merge(Employee employee, @PathParam("id") int empId) {
		final Employee emp = employeeManager.find(empId);
		if (employee.getFullName() != null) {
			emp.setFullName(employee.getFullName());
		}
		employeeManager.merge(employee);
		return Response.ok().entity(new APIResponse()).build();
	}
	
	@DELETE
	@Path("/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	// Deletes an existing employee
	public Response remove(@PathParam("id") int empId) {
		final Employee emp = employeeManager.find(empId);
		employeeManager.remove(emp, empId);
		return Response.ok().entity(new APIResponse()).build();
	}
	
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	// Gets a list of all employees
	public Response getAll() throws SQLException {
		List<Employee> employees = employeeManager.getAll();
    	APIResponse res = new APIResponse();
		if (employees == null) {
			res.getErrors().add(ErrorMessageBuilder.notFoundMultiple("employee", null));
			return Response.status(Response.Status.NOT_FOUND).entity(res).build();
		}
        res.getData().put("employees", employees);
        return Response.ok().entity(res).build();
	}
	
	@GET
	@Path("//{id}")
	@Produces("application/json")
	// Gets a list of all timesheets for an id
	public Response getAllTimesheetsForEmployee(@PathParam("id") UUID empId) {
		final APIResponse res = new APIResponse();
		List<Timesheet> timesheets = timesheetManager.getAllForEmployee(empId);
		if (timesheets == null) {
			res.getErrors().add(ErrorMessageBuilder.notFoundMultiple("timesheet", null));
			return Response.status(Response.Status.NOT_FOUND).entity(res).build();
		}
		res.getData().put("timesheets", timesheets);
		return Response.ok().entity(res).build();
	}
}
