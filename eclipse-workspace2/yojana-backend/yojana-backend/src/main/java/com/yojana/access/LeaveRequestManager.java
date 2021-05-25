package com.yojana.access;

import java.io.Serializable;
import java.util.List;

import javax.ejb.Stateless;
import javax.enterprise.context.Dependent;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import javax.transaction.Transactional;

import com.yojana.model.employee.Employee;
import com.yojana.model.employee.LeaveRequest;
import com.yojana.model.project.Project;

@Dependent
@Stateless
public class LeaveRequestManager implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = -8709713671106036600L;
	
	@PersistenceContext(unitName="comp4911-pms-rest-jpa") EntityManager em;

	/** find a Leave Request with id. */
	public LeaveRequest find(String id) {
        return em.find(LeaveRequest.class, id);
    }

	/** find a Leave Request with id. */
	public List<LeaveRequest> findByEmp(String id) {
		int i = Integer.parseInt(id);
		TypedQuery<LeaveRequest> query = em.createQuery("select p from LeaveRequest p where p.empId = "+i,
                LeaveRequest.class); 
        List<LeaveRequest> leaves = query.getResultList();
        return leaves;
    }

	/** find a Leave Request with id. */
	public List<LeaveRequest> findByType(String id) {
		TypedQuery<LeaveRequest> query = em.createQuery("select p from LeaveRequest p where p.type = '"+id+"'",
                LeaveRequest.class); 
        List<LeaveRequest> leaves = query.getResultList();
        return leaves;
    }
	
	/** add a Leave Request. */
	@Transactional
	public void persist(LeaveRequest leave) {
        em.persist(leave);
    }
	
	/** update a Leave Request. */
	@Transactional
	public void merge(LeaveRequest leave) {
        em.merge(leave);
    }
	
	/** remove an Leave Request. */
	@Transactional
	public void remove(LeaveRequest leave, String id) {
        leave = find(id);
        em.remove(leave);
    }
	
	public List<LeaveRequest> getAll() {       
		TypedQuery<LeaveRequest> query = em.createQuery("select p from LeaveRequest p",
                LeaveRequest.class); 
        List<LeaveRequest> leaves = query.getResultList();
        return leaves;
    }

}
