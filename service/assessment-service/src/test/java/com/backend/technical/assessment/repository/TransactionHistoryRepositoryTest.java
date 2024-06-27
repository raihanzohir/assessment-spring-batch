package com.backend.technical.assessment.repository;

import com.backend.technical.assessment.dto.TransactionHistoryDescriptionOnly;
import com.backend.technical.assessment.entity.AppUser;
import com.backend.technical.assessment.entity.TransactionHistory;
import lombok.RequiredArgsConstructor;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@RequiredArgsConstructor
public class TransactionHistoryRepositoryTest {

    @Autowired
    private TransactionHistoryRepository repository;

    @Test
    public void testFindAllTransactions() {

        List<TransactionHistory> transactions = repository.findAll();

        assertThat(transactions).hasSize(94);
    }

    @Test
    public void testFindTransactionByRecordId() {

        Long recordId = 1L;
        Optional<TransactionHistory> transaction = repository.findById(recordId);

        assertThat(transaction).isPresent();
    }

    @Test
    public void testFindTransactionByRecordId_NotFound() {

        Long recordId = 100L;
        Optional<TransactionHistory> transaction = repository.findById(recordId);

        assertThat(transaction).isNotPresent();
    }

    @Test
    public void testFindByCustomerIdOrAccountNumberOrDescriptionContaining() {

        String customerId = "222";
        String accountNo = "8872838283";
        String description = "FUND";
        Pageable pageable = PageRequest.of(0, 10);
        Page<TransactionHistory> transactions = repository.findByCustomerIdOrAccountNumberOrDescriptionNative(customerId, accountNo, description, pageable);

        assertThat(transactions).hasSize(10);
    }

    @Test
    public void testUpdateTransaction_DescriptionOnly() {

        TransactionHistory transactionHistory = new TransactionHistory();
        String toUpdateDescription = "EDIT 3 - 3rd Party FUND TRANSFER";
        TransactionHistoryDescriptionOnly transactionHistoryDescriptionOnly = TransactionHistoryDescriptionOnly.builder()
                .id(1L)
                .description(toUpdateDescription)
                .build();
        transactionHistory.setId(transactionHistoryDescriptionOnly.getId());
        transactionHistory.setDescription(transactionHistoryDescriptionOnly.getDescription());
        TransactionHistory updatedTransactionHistory = repository.save(transactionHistory);

        String updatedDescription = updatedTransactionHistory.getDescription();

        assertThat(updatedDescription).isEqualTo(toUpdateDescription);
    }
}
