/**
 * 
 */
package com.univers.architecture.transporter.web;

import java.util.List;

import com.querydsl.core.types.Predicate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.querydsl.binding.QuerydslPredicate;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
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

	@RequestMapping(value = "/pageableTaskExecution")
	public Page<TaskExecution> index(@QuerydslPredicate(root = TaskExecution.class) Predicate predicate,
				 Pageable pageable) {
		return this.taskExecutionService.getAllTaskExecution(predicate, pageable);
	}
}
