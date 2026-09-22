package com.blogsphere.controller;

import com.blogsphere.entity.User;
import com.blogsphere.entity.Blog;
import com.blogsphere.entity.Comment;
import com.blogsphere.repository.UserRepository;
import com.blogsphere.repository.BlogRepository;
import com.blogsphere.repository.CommentRepository;
import com.blogsphere.entity.Report;
import com.blogsphere.repository.ReportRepository;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "*")
public class AdminController {

    private final UserRepository userRepository;
    private final BlogRepository blogRepository;
    private final CommentRepository commentRepository;
    private final ReportRepository reportRepository;

    public AdminController(
        UserRepository userRepository,
        BlogRepository blogRepository,
        CommentRepository commentRepository,
        ReportRepository reportRepository) {

    this.userRepository = userRepository;
    this.blogRepository = blogRepository;
    this.commentRepository = commentRepository;
    this.reportRepository = reportRepository;
}

    // Get all users
    @GetMapping("/users")
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // Get all blogs
    @GetMapping("/blogs")
    public List<Blog> getAllBlogs() {
        return blogRepository.findAll();
    }

    // Get all comments
    @GetMapping("/comments")
    public List<Comment> getAllComments() {
        return commentRepository.findAll();
    }
    @GetMapping("/reports")
    public List<Report> getAllReports() {
    return reportRepository.findAll();
    }
}