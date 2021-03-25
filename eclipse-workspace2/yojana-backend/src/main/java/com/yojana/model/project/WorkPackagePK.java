package com.yojana.model.project;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Embeddable;

@Embeddable
public class WorkPackagePK implements Serializable {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 5367737215515859701L;

	@Column(name = "WorkPackageID")
	private String id;
	
	@Column(name = "ProjectID", insertable = false, updatable = false)
	private String projectID;
	
	public WorkPackagePK() {
	}

	public WorkPackagePK(String id, String projectID) {
		this.id = id;
		this.projectID = projectID;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getProjectID() {
		return projectID;
	}

	public void setProjectID(String projectID) {
		this.projectID = projectID;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((id == null) ? 0 : id.hashCode());
		result = prime * result + ((projectID == null) ? 0 : projectID.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		WorkPackagePK other = (WorkPackagePK) obj;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		if (projectID == null) {
			if (other.projectID != null)
				return false;
		} else if (!projectID.equals(other.projectID))
			return false;
		return true;
	}

}
