package com.blogsphere.controller;

import com.blogsphere.entity.Report;
import com.blogsphere.service.ReportService;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reports")
@CrossOrigin(origins = "*")
public class ReportController {

    private final ReportService reportService;

    public ReportController(ReportService reportService) {
        this.reportService = reportService;
    }

    @PostMapping
    public Report createReport(@RequestBody Report report) {
        return reportService.createReport(report);
    }

    @GetMapping
    public List<Report> getAllReports() {
        return reportService.getAllReports();
    }

    @DeleteMapping("/{id}")
    public String deleteReport(@PathVariable Long id) {
        reportService.deleteReport(id);
        return "Report deleted successfully";
    }
}