package com.yojana.model.employee;

import java.io.Serializable;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Embedded;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.yojana.model.auditable.Audit;
import com.yojana.model.auditable.AuditListener;
import com.yojana.model.auditable.Auditable;
import com.yojana.model.project.WorkPackage;

/**
 * Represents an employee.
 * @author Yogesh Verma
 * @version 1.0
 */

@Entity
@Table(name = "Employee")
@EntityListeners(AuditListener.class)
/* Implements auditable since this entity needs to be time-tracked */
public class Employee implements Auditable, Serializable {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1016424160017320304L;

	@Embedded
	private Audit audit;
	
    /**
     * Represents the number of an employee
     */
	@Id
    @Column(name = "EmpID", unique = true)
	@GeneratedValue(strategy=GenerationType.IDENTITY)
    private int id;
	
    /**
     * Represents the first name of the employee
     */
	
	@Column(name = "EmpName")
    private String fullName;
	
	/**
	 * FetchType.LAZY means don't load the credential when employees
	 * are requested.
	 * JsonProperty.Access.WRITE_ONLY prevents the LazyInitializationException
	 * This happens because JSON tries to add the credential property as well
	 * but since we have specified it's lazy loaded, it doesn't exist at that moment.
	 * This annotation says "Unless we're trying to do a write action to an employee
	 * , ignore the Credential"
	 */
	@OneToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL, mappedBy = "emp", orphanRemoval = true)
	private Credential credential;
	
	public Employee() {}

    /**
     * Three parameter constructor. Creates the initial employees who have access as
     * well as the admin
     *
     * @param empNum
     * @param empName
     * @param id
     */
    public Employee(final int empId, final String empName) {
        this.id = empId;
        this.fullName = empName;
    }

	public Credential getCredential() {
		return credential;
	}

	public void setCredential(Credential credential) {
		this.credential = credential;
	}

	/**
	 * Get the ID of an employee
	 * @return Id
	 */
	public int getId() {
		return id;
	}

	/**
	 * Set the ID of an employee
	 * @param id
	 */
	public void setId(int id) {
		this.id = id;
	}

	public String getFullName() {
		return fullName;
	}

	/**
	 * Set the full name of an employee
	 * @param fullName
	 */
	public void setFullName(String fullName) {
		this.fullName = fullName;
	}

	public Audit getAudit() {
		return audit;
	}

	public void setAudit(Audit audit) {
		this.audit = audit;
	}

    @Override
    public String toString() {
        return "Employee [audit=" + audit + ", id=" + id + ", fullName=" + fullName + ", credential=" + credential
                + "]";
    }

    
}