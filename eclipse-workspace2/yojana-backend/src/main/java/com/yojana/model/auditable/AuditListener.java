package com.yojana.model.auditable;

import java.util.Date;

import javax.persistence.PrePersist;
import javax.persistence.PreUpdate;

public class AuditListener {
	 
    @PrePersist
    public void setCreatedOn(Auditable auditable) {
        Audit audit = auditable.getAudit();
 
        if(audit == null) {
            audit = new Audit();
            auditable.setAudit(audit);
        }
 
        audit.setCreatedAt(new Date());
        audit.setUpdatedAt(new Date());
    }
 
    @PreUpdate
    public void setUpdatedOn(Auditable auditable) {
        Audit audit = auditable.getAudit();

        audit.setUpdatedAt(new Date());
    }
}