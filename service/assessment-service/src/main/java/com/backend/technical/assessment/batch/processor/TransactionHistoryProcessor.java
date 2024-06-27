package com.backend.technical.assessment.batch.processor;

import com.backend.technical.assessment.entity.TransactionHistory;
import org.springframework.batch.item.ItemProcessor;

public class TransactionHistoryProcessor implements ItemProcessor<TransactionHistory, TransactionHistory> {

    @Override
    public TransactionHistory process(TransactionHistory transactionHistory) {
        return transactionHistory;
    }

}
