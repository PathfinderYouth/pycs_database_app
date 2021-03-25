/**
 *
 */
package com.yojana.security;

import java.io.IOException;

import javax.annotation.Priority;
import javax.enterprise.event.Event;
import javax.inject.Inject;
import javax.ws.rs.Priorities;
import javax.ws.rs.container.ContainerRequestContext;
import javax.ws.rs.container.ContainerRequestFilter;
import javax.ws.rs.core.HttpHeaders;
import javax.ws.rs.core.Response;
import javax.ws.rs.ext.Provider;

import com.yojana.helpers.JWTHelper;
import com.yojana.security.annotations.Secured;

/**
 * @author yogeshverma
 *
 */
@Secured
@Provider
@Priority(Priorities.AUTHENTICATION)
public class AuthenticationFilter implements ContainerRequestFilter {

    private static final String REALM = "backend";
    private static final String AUTHENTICATION_SCHEME = "Bearer";

    @Inject
    @com.yojana.security.annotations.AuthenticatedEmployee
    // Event to be fired on successful authentication
    private Event<String> userAuthenticatedEvent;

    @Override
    // Filters requests and checks if user is authenticated
    public void filter(ContainerRequestContext requestContext) throws IOException {

        // Get the Authorization header from the request
        final String authorizationHeader = requestContext.getHeaderString(HttpHeaders.AUTHORIZATION);

        // Validate the Authorization header
        if (!isTokenBasedAuthentication(authorizationHeader)) {
            abortWithUnauthorized(requestContext);
            return;
        }

        // Extract the token from the Authorization header
        final String token = authorizationHeader.substring(AUTHENTICATION_SCHEME.length()).trim();

        try {
            // Validate the token
            validateToken(token);
        } catch (final Exception e) {
            abortWithUnauthorized(requestContext);
        }
    }

    // Checks if token exists on the header
    private boolean isTokenBasedAuthentication(String authorizationHeader) {

        // Check if the Authorization header is valid
        // It must not be null and must be prefixed with "Bearer" plus a whitespace
        // The authentication scheme comparison must be case-insensitive
        return authorizationHeader != null
                && authorizationHeader.toLowerCase().startsWith(AUTHENTICATION_SCHEME.toLowerCase() + " ");
    }

    // Aborts the request
    private void abortWithUnauthorized(ContainerRequestContext requestContext) {

        // Abort the filter chain with a 401 status code response
        // The WWW-Authenticate header is sent along with the response
        requestContext.abortWith(Response.status(Response.Status.UNAUTHORIZED)
                .header(HttpHeaders.WWW_AUTHENTICATE, AUTHENTICATION_SCHEME + " realm=\"" + REALM + "\"").build());
    }

    // Validates the token
    private void validateToken(String token) throws Exception {
        // Check if the token was issued by the server and if it's not expired
        // Throw an Exception if the token is invalid
        JWTHelper jwtHelper = new JWTHelper();
        userAuthenticatedEvent.fire(jwtHelper.validate(token));
    }
}