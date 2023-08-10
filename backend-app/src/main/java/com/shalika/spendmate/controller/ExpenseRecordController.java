package com.shalika.spendmate.controller;

import com.shalika.spendmate.exception.ResourceNotFoundException;
import com.shalika.spendmate.model.Expense;
import com.shalika.spendmate.repository.ExpenseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.*;


import java.time.Instant;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.logging.Logger;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/app/")
public class ExpenseRecordController {
    private static final Logger LOGGER = Logger.getLogger(ExpenseRecordController.class.getName());

    @Autowired
    private ExpenseRepository expenseRepository;

    @GetMapping("expenses")
    public @ResponseBody Iterable<Expense> getExpenses() {
        return expenseRepository.findAll();
    }

    @PostMapping("expenses")
    public @ResponseBody Expense createExpense(@RequestBody Expense exp) {
        return expenseRepository.save(exp);
    }

    @GetMapping("expenses/{id}")
    public ResponseEntity<Expense> getExpenseById(@PathVariable Long id) {
        Expense record = expenseRepository.findById(id).orElseThrow(()-> new ResourceNotFoundException("No Expenses found"));
        return ResponseEntity.ok(record);
    }

    @PutMapping("expenses/{id}")
    public Expense updateExpense(@PathVariable Long id, @RequestBody Expense exp) {
        Expense record = expenseRepository.findById(id).orElseThrow(()-> new ResourceNotFoundException("No Expenses found"));
        record.setAmount(exp.getAmount());
        record.setCategory_id(exp.getCategory_id());
        LOGGER.info(String.format("Received parameter: %s", exp.getCategory_id()));

        record.setCurrency_id(exp.getCurrency_id());
        record.setDate(exp.getDate());
        record.setDescription(exp.getDescription());
        record.setType(exp.getType());
        return expenseRepository.save(record);
    }

    @DeleteMapping("expenses/{id}")
    public ResponseEntity<?> removeEmployee(@PathVariable Long id) {
        Expense record = expenseRepository.findById(id).orElseThrow(()-> new ResourceNotFoundException("No Expenses found"));
        expenseRepository.delete(record);

            return ResponseEntity.ok(new Object() {
                public final Long deletedId = id;
                public final String message = "Resource deleted successfully";
                public final Instant timestamp = Instant.now();
            });
        }

}
