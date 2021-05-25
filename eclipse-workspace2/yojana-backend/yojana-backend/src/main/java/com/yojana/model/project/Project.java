package com.yojana.model.project;

import java.io.Serializable;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Embedded;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.yojana.model.auditable.Audit;
import com.yojana.model.auditable.AuditListener;
import com.yojana.model.auditable.Auditable;
import com.yojana.model.employee.Employee;

@Entity
@Table(name = "Project")
@EntityListeners(AuditListener.class)
public class Project  implements Auditable, Serializable {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 7569341008564405379L;
	
	@Embedded
	private Audit audit;
	
	@Id
	@Column(name = "ProjectID", unique = true)
	private String id;
	
	@Column(name = "ProjectName")
    private String name;
	
	@Column(name = "Budget")
    private float budget;
	
	@Column(name = "InitialEstimate")
    private float initialEstimate;
	
	@Column(name = "Description", columnDefinition="TEXT")
	private String description;
	
	@Enumerated(EnumType.STRING)
    @Column(name = "Status", columnDefinition = "enum")
    private ProjectStatus status;
	
	/**
     * Represents the project manager
     */
	@ManyToOne(fetch = FetchType.EAGER, cascade = {CascadeType.MERGE})
    @JoinColumn(name = "ProjectManagerID")
    private Employee projectManager;
	
	@Column(name = "ProjectManagerID", insertable = false, updatable = false)
	private int projectManagerId;
	
	@ManyToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	@JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @JoinTable(
        name = "ProjectEmployee", 
        joinColumns = { @JoinColumn(name = "ProjectID") }, 
        inverseJoinColumns = { @JoinColumn(name = "EmpID") }
    )
    private Set<Employee> employees;

	public Audit getAudit() {
		return audit;
	}

	public void setAudit(Audit audit) {
		this.audit = audit;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public float getBudget() {
		return budget;
	}

	public void setBudget(float budget) {
		this.budget = budget;
	}

	public float getInitialEstimate() {
		return initialEstimate;
	}

	public void setInitialEstimate(float initialEstimate) {
		this.initialEstimate = initialEstimate;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public ProjectStatus getStatus() {
		return status;
	}

	public void setStatus(ProjectStatus status) {
		this.status = status;
	}

	public Employee getProjectManager() {
		return projectManager;
	}

	public void setProjectManager(Employee projectManager) {
		this.projectManager = projectManager;
	}

	public int getProjectManagerId() {
		return projectManagerId;
	}

	public void setProjectManagerId(int projectManagerId) {
		this.projectManagerId = projectManagerId;
	}

	public Set<Employee> getEmployees() {
		return employees;
	}

	public void setEmployees(Set<Employee> employees) {
		this.employees = employees;
	}

}
