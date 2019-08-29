/**
 * 
 */
package com.univers.architecture.transporter.service;

import java.util.List;

import com.univers.architecture.transporter.model.TaskExecution;
import org.h2.util.Task;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * @author sabir
 *
 */
public interface ITaskExecutionService {

	public List<TaskExecution> getAllTaskExecution();
	public Page<TaskExecution> getAllTaskExecution(Pageable pageable);
}
