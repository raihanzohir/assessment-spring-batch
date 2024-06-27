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

    @Query("SELECT th FROM TransactionHistory th WHERE th.customerId = :customerId OR th.accountNumber = :accountNo OR th.description LIKE :description")
    Page<TransactionHistory> findByCustomerIdOrAccountNumberOrDescriptionNative(String customerId, String accountNo, String description, Pageable pageable);

    // Not worked :(
    Page<TransactionHistory> findByCustomerIdOrAccountNumberOrDescriptionContainingIgnoreCase(String customerId, String accountNo, String description, Pageable pageable);
}
