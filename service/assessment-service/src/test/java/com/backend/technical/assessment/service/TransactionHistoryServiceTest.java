package com.backend.technical.assessment.service;

import com.backend.technical.assessment.entity.TransactionHistory;
import com.backend.technical.assessment.repository.TransactionHistoryRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.*;

public class TransactionHistoryServiceTest {

    @Mock
    private TransactionHistoryRepository repository;

    @InjectMocks
    private TransactionHistoryService service;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testGetAllTransactions() {

        service.getAllTransactions(0, 10);

        verify(repository, times(1)).findAll();

    }

    @Test
    public void testFindTransactionById() {

        Long id = 1L;
        Optional<TransactionHistory> foundTransaction = service.findTransactionById(id);

        assertThat(foundTransaction).isPresent();

//        when(repository.findById(1L)).thenReturn(Optional.of(foundTransaction));

//        assertThat(foundTransaction.get().getAccountNumber()).isEqualTo("8872838283");
    }

//    @Test
//    public void testFindByCustomerIdOrAccountNumberOrDescriptionContaining() {
//
//        String customerId = "222";
//        String accountNo = "8872838283";
//        String description = "FUND";
//        Pageable pageable = PageRequest.of(0, 10);
//        Page<TransactionHistory> transactions = repository.findByCustomerIdOrAccountNumberOrDescriptionNative(customerId, accountNo, description, pageable);
//
//        assertThat(transactions).hasSize(10);
//    }

}
