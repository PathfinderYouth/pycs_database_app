package com.yojana.security;

import java.sql.SQLException;

import javax.enterprise.context.RequestScoped;
import javax.enterprise.event.Observes;
import javax.enterprise.inject.Produces;
import javax.inject.Inject;

import com.yojana.access.CredentialManager;
import com.yojana.access.EmployeeManager;
import com.yojana.model.employee.Credential;
import com.yojana.model.employee.Employee;
import com.yojana.security.annotations.AuthenticatedEmployee;

@RequestScoped
public class AuthenticatedEmployeeProducer {

    @Inject
    private CredentialManager credManager;
    
    @Inject
    private EmployeeManager empManager;

    @Produces
    @RequestScoped
    @AuthenticatedEmployee
    private Employee authenticatedEmployee;

    // Sets the authenticated employee in the database
    public void handleAuthenticationEvent(@Observes @AuthenticatedEmployee String username) throws SQLException {
        final Credential cred = credManager.find(username);
        final Employee emp = empManager.find(cred.getEmpID());
        authenticatedEmployee = emp;
    }
}
