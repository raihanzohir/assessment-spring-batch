package com.backend.technical.assessment.controller;

import com.backend.technical.assessment.dto.ApiErrorResponse;
import com.backend.technical.assessment.dto.TransactionHistoryDescriptionOnly;
import com.backend.technical.assessment.service.TransactionHistoryService;
import com.backend.technical.assessment.util.ApiResponseStatus;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/transactions")
@RequiredArgsConstructor
public class TransactionHistoryController {

    private Logger logger = LoggerFactory.getLogger(TransactionHistoryController.class);

    private final TransactionHistoryService service;

    @GetMapping()
    public ResponseEntity<?> allTransactions(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        return new ResponseEntity<>(service.getAllTransactions(page, size), HttpStatus.OK);
    }

    @GetMapping("/search")
    public ResponseEntity<?> findTransactionByCustomerIdOrAccountNumberOrDescription(
            @RequestParam(required = false, defaultValue = "") String customerId,
            @RequestParam(required = false, defaultValue = "") String accountNo,
            @RequestParam(required = false, defaultValue = "") String description,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        System.out.println("accountNo = " + accountNo);
        Pageable pageable = PageRequest.of(page, size);
        return new ResponseEntity<>(service.findTransactionByCustomerIdOrAccountNumberOrDescription(customerId, accountNo, description, pageable), HttpStatus.OK);
    }

    @PatchMapping("/update/{id}")
    public ResponseEntity<?> updateTransactionHistoryDescription(@PathVariable("id") Long id, @RequestBody TransactionHistoryDescriptionOnly partialUpdate) throws Exception {
        try {
            return new ResponseEntity<>(service.updateTransactionHistoryDescriptionOnly(id, partialUpdate), HttpStatus.OK);
        } catch (Exception e) {
            logger.error(e.getMessage());
            e.printStackTrace();
            ApiErrorResponse apiErrorResponse = ApiErrorResponse.builder()
                    .status(ApiResponseStatus.ERROR)
                    .responseDetails("Record Not Found")
                    .build();
            return new ResponseEntity<>(apiErrorResponse, HttpStatus.BAD_REQUEST);
        }

    }

}
