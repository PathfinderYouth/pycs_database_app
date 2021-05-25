package com.yojana.model.timesheet;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.Date;
import java.util.UUID;
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

import org.hibernate.annotations.Type;

import com.yojana.model.auditable.Audit;
import com.yojana.model.auditable.AuditListener;
import com.yojana.model.auditable.Auditable;
import com.yojana.model.employee.Employee;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
/**
 * Represents a timesheet.
 *
 * @author Adam Krawchuk
 * @version 1.0
 */

@Entity
@Table(name = "Timesheet")
@EntityListeners(AuditListener.class)
public class Timesheet implements Auditable, Serializable {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = -215084024326246226L;

	@Embedded
	private Audit audit;
	
    /**
     * Represents the timesheet id
     */
	@Id
    @Column(name = "TimesheetID", unique = true, columnDefinition = "uuid-char", updatable = false, insertable = false)
	@Type(type="uuid-char")
    private UUID id;
	
    /**
     * Represents the ID of the employee
     */
	@ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "EmpID")
	@JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private Employee employee;
	
	@Column(name = "EmpID", updatable = false, insertable = false)
	private int ownerId;

    /**
     * Represents the end of the week
     */
	@JsonDeserialize(using = LocalDateDeserializer.class)  
	@JsonSerialize(using = LocalDateSerializer.class)  
	@Column(name = "Endweek")
    private LocalDate endWeek;

	/**
     * Represents the ID of the reviewer
     */
	@ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ReviewedBy")
	@JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private Employee reviewer;
	
	@Column(name = "ReviewedBy", updatable = false, insertable = false)
	private int reviewerId;
    
    /**
     * Represents the signature of the employee
     */
    @Column(name = "Signature")
    private String signature;
    
    /**
     * Represents the feedback of the reviewer
     */
    @Column(name = "Feedback")
    private String feedback;
    
    /**
     * Represents the status of the timesheet
     */
    @Enumerated(EnumType.STRING)
    @Column(name = "Status", columnDefinition = "enum")
    private TimesheetStatus status;
    
    /**
     * Represents the overtime
     */
    @Column(name = "Overtime")
    private Integer overtime;
    
    /**
     * Represents the flextime
     */
    @Column(name = "Flextime")
    private Integer flextime;
    
    /**
     * The time it was approved
     */
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "ApprovedAt")
    private Date approvedAt;
    
    /**
     * no parameter constructor
     */
    public Timesheet() {
    }

    /**
     * @param employee
     * @param endWeek
     */
    public Timesheet(Employee employee, LocalDate endWeek) {
        super();
        this.employee = employee;
        this.endWeek = endWeek;
    }

    public Audit getAudit() {
		return audit;
	}

	public void setAudit(Audit audit) {
		this.audit = audit;
	}


	public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public Employee getEmployee() {
		return employee;
	}

	public void setEmployee(Employee employee) {
		this.employee = employee;
	}
	
	public void setOwnerId(int ownerId) {
		this.ownerId = ownerId;
	}

	public int getOwnerId() {
		return ownerId;
	}

	public LocalDate getEndWeek() {
		return endWeek;
	}

	public void setEndWeek(LocalDate endWeek) {
		this.endWeek = endWeek;
	}

	public Employee getReviewer() {
		return reviewer;
	}

	public void setReviewer(Employee reviewer) {
		this.reviewer = reviewer;
	}

	public int getReviewerId() {
		return reviewerId;
	}

	public String getSignature() {
		return signature;
	}

	public void setSignature(String signature) {
		this.signature = signature;
	}

	public String getFeedback() {
		return feedback;
	}

	public void setFeedback(String feedback) {
		this.feedback = feedback;
	}

	public Integer getOvertime() {
		return overtime;
	}

	public void setOvertime(Integer overtime) {
		this.overtime = overtime;
	}

	public Integer getFlextime() {
		return flextime;
	}

	public void setFlextime(Integer flextime) {
		this.flextime = flextime;
	}

	public Date getApprovedAt() {
		return approvedAt;
	}

	public void setApprovedAt(Date approvedAt) {
		this.approvedAt = approvedAt;
	}

	public void setStatus(TimesheetStatus status) {
		this.status = status;
	}

	/**
     * @return the status
     */
    public String getStatus() {
        return status.name();
    }
}