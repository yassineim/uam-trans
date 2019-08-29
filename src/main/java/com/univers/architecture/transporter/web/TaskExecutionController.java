/**
 * 
 */
package com.univers.architecture.transporter.web;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.univers.architecture.transporter.model.TaskExecution;
import com.univers.architecture.transporter.service.ITaskExecutionService;

/**
 * @author sabir
 *
 */
@RestController
@RequestMapping("/api")
public class TaskExecutionController {

	@Autowired
	private ITaskExecutionService taskExecutionService;

	@GetMapping("/taskExecution")
	public List<TaskExecution> getAllTaskExecutions() {
		return this.taskExecutionService.getAllTaskExecution();
	}

	@GetMapping("/pageableTaskExecution")
	public Page<TaskExecution> getAllTaskExecutions(Pageable pageable) {
		return this.taskExecutionService.getAllTaskExecution(pageable);
	}
}
