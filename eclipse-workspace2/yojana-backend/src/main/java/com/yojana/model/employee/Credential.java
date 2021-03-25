package com.yojana.model.employee;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Embedded;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.MapsId;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.yojana.model.auditable.Audit;
import com.yojana.model.auditable.AuditListener;
import com.yojana.model.auditable.Auditable;
import com.fasterxml.jackson.annotation.JsonProperty;

/**
 * This class represents credentials for employees to log in to
 *
 * @author Yogesh Verma
 * @version 1.0
 *
 */

@Entity
@Table(name = "Credential")
@NamedQueries({
	@NamedQuery(name = "Credential.findByUsername", query = "SELECT c FROM Credential c WHERE c.username = :username")
})
@EntityListeners(AuditListener.class)
public class Credential implements Auditable {
	
	@Embedded
	private Audit audit;

	/**
	 * Represents the id of the employee
	 */
	@Id
	private int id;

	/**
	 * Foreign key reference to the credential table's EmpID column
	 */
	@JoinColumn(name = "EmpID")
	@MapsId
	@OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	@JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
	private Employee emp;
	
	/**
	 * Foreign key reference to the credential table's EmpID column
	 */
	@Column(name = "EmpID", updatable = false, insertable = false)
	private int empID;
	
	/**
	 * Represents the username of the login phase
	 */
	@Column(name = "EmpUserName")
	private String username;
	
	/**
	 * Represents the password of the login phase
	 */
	@Column(name = "EmpPassword")
	@JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
	private String password;
	
	public Credential() {}
	
	public Credential(String password, String username) {
		this.password = password;
		this.username = username;
	}

	public int getId() {
		return id;
	}

	public void setId(int empId) {
		this.id = empId;
	}

	public Employee getEmp() {
		return emp;
	}

	public void setEmp(Employee emp) {
		this.emp = emp;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public int getEmpID() {
		return empID;
	}

	public void setEmpID(int empID) {
		this.empID = empID;
	}

	public Audit getAudit() {
		return audit;
	}

	public void setAudit(Audit audit) {
		this.audit = audit;
	}

}