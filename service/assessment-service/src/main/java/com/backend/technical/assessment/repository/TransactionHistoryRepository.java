package com.backend.technical.assessment.repository;

import com.backend.technical.assessment.entity.TransactionHistory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface TransactionHistoryRepository extends JpaRepository<TransactionHistory, Long> {

    Page<TransactionHistory> findAll(Pageable pageable);

    @Query("""
            SELECT t FROM TransactionHistory t WHERE 
            t.customerId = :searchParam OR 
            t.accountNumber = :searchParam OR 
            LOWER(t.description) LIKE LOWER(CONCAT('%', :searchParam, '%')) 
            """)
    Page<TransactionHistory> findByCustomerIdOrAccountNumberOrDescriptionContainingIgnoreCase(
            @Param("searchParam") String searchParam, Pageable pageable);
}
