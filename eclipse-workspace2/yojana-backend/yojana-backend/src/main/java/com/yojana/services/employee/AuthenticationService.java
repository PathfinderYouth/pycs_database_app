package com.yojana.services.employee;


import javax.inject.Inject;
import javax.naming.AuthenticationException;
import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;

import com.yojana.access.CredentialManager;
import com.yojana.helpers.JWTHelper;
import com.yojana.model.employee.Credential;
import com.yojana.response.APIResponse;
import com.yojana.response.errors.ErrorMessage;

@Path("/auth")
public class AuthenticationService {

    @Inject
    private CredentialManager credManager;

    // Helper for password encryption
    private JWTHelper passwordHelper;

    // Provides authentication support
    public AuthenticationService() {
        passwordHelper = new JWTHelper();
    }

    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    // Authenticates a user
    public Response authenticateUser(Credential auth) {
    	APIResponse res = new APIResponse();
        try {
            authenticate(auth.getUsername(), auth.getPassword());

            final String token = passwordHelper.encrypt(auth.getUsername());
            res.getData().put("token", token);
            return Response.ok().entity(res).build();
        } catch (final AuthenticationException e) {
        	res.getErrors().add(new ErrorMessage(Response.Status.UNAUTHORIZED.getStatusCode(), "Unable to authenticate user", null));
            return Response.status(Status.UNAUTHORIZED).entity(res).build();
        }
    }

    // Helper for authentication
    // TODO: Implement JWT
    private void authenticate(String username, String password) throws AuthenticationException {
        final Credential stored = credManager.find(username);
        if (stored == null) {
            throw new AuthenticationException("Cannot find user with the provided username");
        }
        if (!(password.contentEquals(stored.getPassword()))) {
            throw new AuthenticationException("Invalid password ! Please try again");
        }
    }
}
