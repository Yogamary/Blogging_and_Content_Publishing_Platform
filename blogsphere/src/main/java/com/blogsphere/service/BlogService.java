
package com.blogsphere.service;

import com.blogsphere.entity.Blog;
import com.blogsphere.repository.BlogRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BlogService {

    private final BlogRepository blogRepository;

    public BlogService(BlogRepository blogRepository) {
        this.blogRepository = blogRepository;
    }

    // Create a new blog or draft
    public Blog createBlog(Blog blog) {
        if (blog.getStatus() == null || blog.getStatus().isBlank()) {
            blog.setStatus("PUBLISHED");
        }

        validateStatus(blog.getStatus());

        return blogRepository.save(blog);
    }

    // Get published blogs for Explore
    public List<Blog> getAllBlogs() {
        return blogRepository.findAll()
                .stream()
                .filter(blog ->
                        blog.getStatus() == null
                        || blog.getStatus().equalsIgnoreCase("PUBLISHED"))
                .toList();
    }

    // Get all blogs, including drafts, for one author
    public List<Blog> getBlogsByAuthor(String author) {
        return blogRepository.findByAuthor(author);
    }

    // Get one blog by ID
    public Optional<Blog> getBlogById(Long id) {
        return blogRepository.findById(id);
    }

    // Update an existing blog
    public Blog updateBlog(Long id, Blog blogDetails) {
        Optional<Blog> existingBlog =
                blogRepository.findById(id);

        if (existingBlog.isEmpty()) {
            throw new RuntimeException("Blog not found");
        }

        Blog blog = existingBlog.get();

        blog.setTitle(blogDetails.getTitle());
        blog.setContent(blogDetails.getContent());
        blog.setImageUrl(blogDetails.getImageUrl());
        blog.setCategory(blogDetails.getCategory());

        if (blogDetails.getStatus() != null
                && !blogDetails.getStatus().isBlank()) {
            validateStatus(blogDetails.getStatus());
            blog.setStatus(blogDetails.getStatus());
        }

        return blogRepository.save(blog);
    }

    // Delete a blog
    public void deleteBlog(Long id) {
        if (!blogRepository.existsById(id)) {
            throw new RuntimeException("Blog not found");
        }

        blogRepository.deleteById(id);
    }

    // Allow only supported statuses
    private void validateStatus(String status) {
        if (!"PUBLISHED".equalsIgnoreCase(status)
                && !"DRAFT".equalsIgnoreCase(status)) {
            throw new IllegalArgumentException(
                    "Status must be PUBLISHED or DRAFT");
        }
    }
}
