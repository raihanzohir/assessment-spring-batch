package com.backend.technical.assessment.service;

import com.backend.technical.assessment.dto.TransactionHistoryDescriptionOnly;
import com.backend.technical.assessment.entity.TransactionHistory;
import com.backend.technical.assessment.exception.RecordNotFoundException;
import com.backend.technical.assessment.repository.TransactionHistoryRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class TransactionHistoryService {

    private Logger logger = LoggerFactory.getLogger(TransactionHistoryService.class);

    private final TransactionHistoryRepository repository;

    public Page<TransactionHistory> getAllTransactions(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return repository.findAll(pageable);
    }

    public Optional<TransactionHistory> findTransactionById(Long id) {

        return repository.findById(id);
    }

    public Page<TransactionHistory> findTransactionByCustomerIdOrAccountNumberOrDescription(String customerId, String accountNumber, String description, Pageable pageable) {
        if(!"".equals(description)) {
            description = "%" + description + "%";
        }
        return repository.findByCustomerIdOrAccountNumberOrDescriptionCustom(customerId, accountNumber, description, pageable);
    }

    @Transactional
    public TransactionHistory updateTransactionHistoryDescriptionOnly(Long id, TransactionHistoryDescriptionOnly updateDTO) throws Exception {

        Optional<TransactionHistory> optionalTransactionInfo = repository.findById(id);
        if (optionalTransactionInfo.isPresent()) {
            TransactionHistory transactionHistory = optionalTransactionInfo.get();
            transactionHistory.setDescription(updateDTO.getDescription());
            return repository.save(transactionHistory);
        } else {
            throw new RecordNotFoundException("No Transaction found for Update", HttpStatus.BAD_REQUEST);
        }
    }
}
