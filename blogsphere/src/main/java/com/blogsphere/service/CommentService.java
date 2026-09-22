package com.blogsphere.service;

import com.blogsphere.entity.Comment;
import com.blogsphere.repository.CommentRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CommentService {

    private final CommentRepository commentRepository;

    public CommentService(CommentRepository commentRepository) {
        this.commentRepository = commentRepository;
    }

    // Add a comment
    public Comment addComment(Comment comment) {
        return commentRepository.save(comment);
    }

    // Get comments for a blog
    public List<Comment> getCommentsByBlogId(Long blogId) {
        return commentRepository.findByBlogId(blogId);
    }

    // Delete a comment
    public void deleteComment(Long id) {

        if (!commentRepository.existsById(id)) {
            throw new RuntimeException("Comment not found");
        }

        commentRepository.deleteById(id);
    }
}