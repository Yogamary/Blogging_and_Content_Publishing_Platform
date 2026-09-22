package com.blogsphere.controller;

import com.blogsphere.entity.Blog;
import com.blogsphere.service.BlogService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/blogs")
@CrossOrigin(origins = "*")
public class BlogController {

    private final BlogService blogService;

    public BlogController(BlogService blogService) {
        this.blogService = blogService;
    }

    // Create a blog
    @PostMapping
    public Blog createBlog(@RequestBody Blog blog) {
        return blogService.createBlog(blog);
    }

    // Get all blogs
    @GetMapping
    public List<Blog> getAllBlogs() {
        return blogService.getAllBlogs();
    }

    // Get one blog
    @GetMapping("/{id}")
    public Blog getBlogById(@PathVariable Long id) {
        return blogService.getBlogById(id)
                .orElseThrow(() -> new RuntimeException("Blog not found"));
    }

    // Update a blog
    @PutMapping("/{id}")
    public Blog updateBlog(
            @PathVariable Long id,
            @RequestBody Blog blog) {

        return blogService.updateBlog(id, blog);
    }

    // Delete a blog
    @DeleteMapping("/{id}")
    public String deleteBlog(@PathVariable Long id) {

        blogService.deleteBlog(id);

        return "Blog deleted successfully";
    }

// Get blogs created by a specific author
@GetMapping("/my/{author}")
public List<Blog> getMyBlogs(@PathVariable String author) {
    return blogService.getBlogsByAuthor(author);
}
}
