package com.yojana.services.timesheet;

import java.net.URI;
import java.sql.SQLException;
import java.util.List;
import java.util.UUID;

import javax.inject.Inject;
import javax.websocket.server.PathParam;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.PATCH;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.Response;

import com.yojana.access.TimesheetManager;
import com.yojana.access.TimesheetRowManager;
import com.yojana.model.timesheet.TimesheetRow;
import com.yojana.response.APIResponse;
import com.yojana.response.errors.ErrorMessageBuilder;


@Path("/timesheets")
public class TimesheetRowService {
	
	@Inject
	// Provides access to the TimesheetRow table
	private TimesheetRowManager timesheetrowManager;
	
	@Inject
	// Provides access to the TimesheetRow table
	private TimesheetManager timesheetManager;
	
	
	@POST
	@Path("/{id}/rows")
    @Consumes("application/json")
	// Inserts a timesheetrow into the database
	public Response persist(@PathParam("id") UUID timesheetId, TimesheetRow timesheetrow) throws SQLException {
		timesheetrow.setTimesheet(timesheetManager.find(timesheetId));
		UUID uuid1 = UUID.randomUUID();
		timesheetrow.setProjectId(String.valueOf(uuid1));
		UUID uuid2 = UUID.randomUUID();
		timesheetrow.setWorkPackageId(String.valueOf(uuid2));
		timesheetrowManager.persist(timesheetrow);
		return Response.created(URI.create("/timesheetrows/" + timesheetrow.getTimesheet().getId() + "/" + timesheetrow.getProjectId() + "/" + timesheetrow.getWorkPackageId())).build();
		
		
	}
	
	@GET
    @Path("/{id}/rows")
    @Produces("application/json")
	// Gets a list of all timesheetrows for a timesheet
	public Response getAllForTimesheet(@PathParam("id") UUID timesheetId) throws SQLException {
		List<TimesheetRow> timesheetRows = timesheetrowManager.getAllForTimesheet(timesheetId); 
		APIResponse res = new APIResponse();
        if (timesheetRows == null) {
            res.getErrors().add(ErrorMessageBuilder.notFoundSingle("timesheet", timesheetId.toString(), null));
             return Response.status(Response.Status.NOT_FOUND).entity(res).build();
        }
        res.getData().put("timesheetRows", timesheetRows);
        return Response.ok().entity(res).build();
	}
	

}
