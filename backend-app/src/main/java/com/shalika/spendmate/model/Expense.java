package com.shalika.spendmate.model;

import com.shalika.spendmate.controller.ExpenseRecordController;
import jakarta.persistence.*;

import java.util.Date;
import java.util.logging.Logger;
import java.util.logging.Logger;

@Table(name = "expenses")
@Entity
public class Expense {
    private static final Logger LOGGER = Logger.getLogger(Expense.class.getName());

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "amount")
    private float amount;

    @Column(name = "category_id")
    private Integer category_id;

    public Expense() {

    }

    public Expense(Long id) {
        super();
        this.id = id;
    }
    @Column(name = "currency_id")
    private Integer currency_id;

    @Column(name = "description")
    private String description;

    @Column(name = "date")
    private Date date;

    @Column(name = "type")
    private Integer type;

    public void setId(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }

    public float getAmount() {
        return amount;
    }

    public void setAmount(float amount) {
        this.amount = amount;
    }

    public Integer getCategory_id() {
        return category_id;
    }

    public void setCategory_id(Integer category_id) {
        this.category_id = category_id;
    }

    public Integer getCurrency_id() {
        return currency_id;
    }

    public void setCurrency_id(Integer currency_id) {
        this.currency_id = currency_id;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public Integer getType() {
        return type;
    }

    public void setType(Integer type) {
        this.type = type;
    }
}
