package com.yojana.model.auditable;

public interface Auditable {
	public Audit getAudit();
	public void setAudit(Audit audit);
}
