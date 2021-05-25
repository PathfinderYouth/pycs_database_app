package com.yojana.access;

import java.io.Serializable;
import java.util.List;

import javax.ejb.Stateless;
import javax.enterprise.context.Dependent;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import javax.transaction.Transactional;

import com.yojana.model.project.Project;
import com.yojana.model.project.WorkPackage;
import com.yojana.model.project.WorkPackagePK;

@Dependent
@Stateless
public class WorkPackageManager implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = -8709713671106036600L;
	
	@PersistenceContext(unitName="comp4911-pms-rest-jpa") EntityManager em;
	
	/** find an employee with id. */
	public WorkPackage find(WorkPackagePK key) {
        return em.find(WorkPackage.class, key);
    }
	
	/** add an employee. */
	@Transactional
	public void persist(WorkPackage workPackage) {
		if (workPackage.getParentWPId() != null) {
			WorkPackage parent = find(new WorkPackagePK(workPackage.getParentWPId(), 
					workPackage.getWorkPackagePk().getProjectID()));
			parent.setAllocatedBudget(parent.getAllocatedBudget() - workPackage.getAllocatedBudget());
			parent.setInitialEstimate(parent.getInitialEstimate() - workPackage.getInitialEstimate());
			parent.setLowestLevel(false);
			em.merge(parent);
		} else {
			Project parent = workPackage.getProject();
			parent.setBudget(parent.getBudget() - workPackage.getAllocatedBudget());
			parent.setInitialEstimate(parent.getInitialEstimate() - workPackage.getInitialEstimate());
			em.merge(parent);
		}
        em.persist(workPackage);
    }
	
	/** update an employee. */
	@Transactional
	public void merge(WorkPackage workPackage) {
        em.merge(workPackage);
    }
	
	/** remove an employee. */
	@Transactional
	public void remove(WorkPackage workPackage, WorkPackagePK key) {
        workPackage = find(key);
        em.remove(workPackage);
    }
	
	public List<WorkPackage> getAll(String projectId) {       
		TypedQuery<WorkPackage> query = em.createQuery("select w from WorkPackage w where w.workPackagePk.projectID = :projectId",
                WorkPackage.class); 
		query.setParameter("projectId", projectId);
        List<WorkPackage> workPackages = query.getResultList();
        return workPackages;
    }

}
