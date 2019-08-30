package com.univers.architecture.transporter.dao;

import com.querydsl.core.types.dsl.StringExpression;
import com.querydsl.core.types.dsl.StringPath;
import com.univers.architecture.transporter.model.QTaskExecution;
import com.univers.architecture.transporter.model.TaskExecution;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;
import org.springframework.data.querydsl.binding.QuerydslBinderCustomizer;
import org.springframework.data.querydsl.binding.QuerydslBindings;
import org.springframework.data.querydsl.binding.SingleValueBinding;
import org.springframework.data.repository.PagingAndSortingRepository;

import javax.annotation.Nonnull;
import javax.validation.constraints.NotNull;

/**
 * @author sabir
 *
 */
public interface ITaskExecutionRepository
        extends PagingAndSortingRepository<TaskExecution, String>, QuerydslPredicateExecutor<TaskExecution>,
        QuerydslBinderCustomizer<QTaskExecution> {
    @Override
    default void customize(QuerydslBindings bindings, @Nonnull QTaskExecution taskExecution) {
        bindings.bind(String.class)
                .first((SingleValueBinding<StringPath, String>) (stringPath, str) -> stringPath.containsIgnoreCase(str));
    }
}
