package com.yojana.model.employee;

import java.io.Serializable;
import java.util.Date;

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
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.yojana.access.LeaveRequestManager;
import com.yojana.model.auditable.AuditListener;

@Entity
@Table(name = "LeaveRequest")
@EntityListeners(AuditListener.class)
public class LeaveRequest  implements Serializable {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 7569341008564405379L;

	
	@Id
	@Column(name = "LeaveRequestID", unique = true)
	private String id;

	@Temporal(TemporalType.DATE)
    @Column(name = "StartDate")
    private Date startDate;

	@Temporal(TemporalType.DATE)
    @Column(name = "EndDate")
    private Date endDate;
	
	@Enumerated(EnumType.STRING)
    @Column(name = "TypeRequest", columnDefinition = "enum")
    private LeaveRequestType type;

	@Column(name = "Descrip", columnDefinition="TEXT")
	private String description;

	/**
     * Represents the ID of the employee
     */
	@ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "EmpID")
    private Employee employee;
	
	@Column(name = "EmpID", updatable = false, insertable = false)
	private Integer empId;

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}
	
	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Date getStartDate() {
		return startDate;
	}

	public void setStartDate(Date startDate) {
		this.startDate = startDate;
	}

	public Date getEndDate() {
		return endDate;
	}

	public void setEndDate(Date endDate) {
		this.endDate = endDate;
	}

	public LeaveRequestType getType() {
		return type;
	}

	public void setType(LeaveRequestType type) {
		this.type = type;
	}

	public Employee getEmployee() {
		return employee;
	}

	public void setEmployee(Employee employee) {
		this.employee = employee;
	}

	public Integer getEmpId() {
		return empId;
	}

	public void setEmpId(Integer empId) {
		this.empId = empId;
	}

}
