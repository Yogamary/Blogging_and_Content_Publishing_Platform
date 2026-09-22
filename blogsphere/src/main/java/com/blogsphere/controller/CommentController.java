package com.blogsphere.controller;

import com.blogsphere.entity.Comment;
import com.blogsphere.service.CommentService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/comments")
@CrossOrigin(origins = "*")
public class CommentController {

    private final CommentService commentService;

    public CommentController(CommentService commentService) {
        this.commentService = commentService;
    }

    // Add a comment
    @PostMapping
    public Comment addComment(@RequestBody Comment comment) {
        return commentService.addComment(comment);
    }

    // Get comments for a blog
    @GetMapping("/blog/{blogId}")
    public List<Comment> getCommentsByBlogId(
            @PathVariable Long blogId) {

        return commentService.getCommentsByBlogId(blogId);
    }

    // Delete a comment
    @DeleteMapping("/{id}")
    public String deleteComment(@PathVariable Long id) {

        commentService.deleteComment(id);

        return "Comment deleted successfully";
    }
}