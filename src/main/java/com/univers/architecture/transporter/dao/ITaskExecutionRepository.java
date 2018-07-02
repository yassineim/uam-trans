/**
 * 
 */
package com.univers.architecture.transporter.dao;

import org.springframework.data.repository.CrudRepository;

import com.univers.architecture.transporter.model.TaskExecution;

/**
 * @author sabir
 *
 */
public interface ITaskExecutionRepository extends CrudRepository<TaskExecution, String> {

}
