package com.yojana.model.auditable;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

@Embeddable
public class Audit {
	@Temporal(TemporalType.TIMESTAMP)
    @Column(name = "CreatedAt")
    private Date createdAt;
 
	@Temporal(TemporalType.TIMESTAMP)
    @Column(name = "UpdatedAt")
    private Date updatedAt;

	public Date getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(Date createdAt) {
		this.createdAt = createdAt;
	}

	public Date getUpdatedAt() {
		return updatedAt;
	}

	public void setUpdatedAt(Date updatedAt) {
		this.updatedAt = updatedAt;
	}
}
