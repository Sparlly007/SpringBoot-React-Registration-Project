package com.example.build.dto.DaysOffDtos;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

import com.example.build.model.DaysOff;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public class DaysOffOutputDto {

    private String email;

    private String startDate;

    private String endDate;

    @NotNull(message = "Note is required")
    @Size(min = 1, message = "Note is required")
    private String note;

    public DaysOffOutputDto() {
    }

    public DaysOffOutputDto(String email, LocalDate startDate, LocalDate endDate, String note) {
        this.email = email;
        this.startDate = startDate.getMonthValue() + '-' + startDate.getDayOfMonth() + "-" + startDate.getYear();
        this.endDate = endDate.getMonthValue() + '-' + endDate.getDayOfMonth() + "-" + endDate.getYear();;
        this.note = note;
    }
    

    public DaysOffOutputDto(DaysOff daysOff){
        this.email = daysOff.getEmail();
        this.startDate = daysOff.getStartDate().format(DateTimeFormatter.ofPattern("MM/dd/yyyy"));
        this.endDate = daysOff.getEndDate().format(DateTimeFormatter.ofPattern("MM/dd/yyyy"));
        this.note = daysOff.getNote();
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getStartDate() {
        return startDate;
    }

    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate.getMonthValue() + '-' + startDate.getDayOfMonth() + "-" + startDate.getYear();
    }

    public String getEndDate() {
        return endDate;
    }

    public void setEndDate(LocalDate endDate) {
        this.endDate = endDate.getMonthValue() + '-' + endDate.getDayOfMonth() + "-" + endDate.getYear();;
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }
}
