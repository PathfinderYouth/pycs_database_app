package com.yojana.model.timesheet;

import java.io.Serializable;
import java.util.UUID;

 
/**External class containing PK columns of TimesheetRow. 
 * A class representing the Composite primary key of a Timesheet Row.
 * PK/FK = timesheetID, workpackageId, projectId.
 * 
 * @author Abeer Haroon
 * @version 1.0
 * */
public class TimesheetRowPK implements Serializable {
    
    //class members
    private static final long serialVersionUID = 1L;

    //instance members
    /**Timesheet ID. */
    private UUID timesheetId;
    
    /**Work Package ID */
    private String workPackageId;
    
    /**Project ID */
    private String projectId;

    //getters and setters--------------------------
    
    /**@return work package ID. */
    public String getWorkPackageId() {
        return workPackageId;
    }
    public String getProjectId() {
		return projectId;
	}
	public void setProjectId(String projectId) {
		this.projectId = projectId;
	}
	/**@param workPackageid is the work package Id to be set. */
    public void setWorkPackageId(String workPackageId) {
        this.workPackageId = workPackageId;
    }

	public UUID getTimesheetId() {
		return timesheetId;
	}
	public void setTimesheetId(UUID timesheetId) {
		this.timesheetId = timesheetId;
	}
	public TimesheetRowPK() {}
	public TimesheetRowPK(UUID timesheetId, String projectId, String workPackageId) {
      this.timesheetId = timesheetId;
      this.projectId = projectId;
      this.workPackageId = workPackageId;
    }
	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((projectId == null) ? 0 : projectId.hashCode());
		result = prime * result + ((timesheetId == null) ? 0 : timesheetId.hashCode());
		result = prime * result + ((workPackageId == null) ? 0 : workPackageId.hashCode());
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
		TimesheetRowPK other = (TimesheetRowPK) obj;
		if (projectId == null) {
			if (other.projectId != null)
				return false;
		} else if (!projectId.equals(other.projectId))
			return false;
		if (timesheetId == null) {
			if (other.timesheetId != null)
				return false;
		} else if (!timesheetId.equals(other.timesheetId))
			return false;
		if (workPackageId == null) {
			if (other.workPackageId != null)
				return false;
		} else if (!workPackageId.equals(other.workPackageId))
			return false;
		return true;
	}
}
