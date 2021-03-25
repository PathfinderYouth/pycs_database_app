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

@Dependent
@Stateless
public class ProjectManager implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = -8709713671106036600L;
	
	@PersistenceContext(unitName="comp4911-pms-rest-jpa") EntityManager em;
	
	/** find an employee with id. */
	public Project find(String id) {
        return em.find(Project.class, id);
    }
	
	/** add an employee. */
	@Transactional
	public void persist(Project project) {
        em.persist(project);
    }
	
	/** update an employee. */
	@Transactional
	public void merge(Project project) {
        em.merge(project);
    }
	
	/** remove an employee. */
	@Transactional
	public void remove(Project project, String id) {
        project = find(id);
        em.remove(project);
    }
	
	public List<Project> getAll() {       
		TypedQuery<Project> query = em.createQuery("select p from Project p",
                Project.class); 
        List<Project> projects = query.getResultList();
        return projects;
    }

}
