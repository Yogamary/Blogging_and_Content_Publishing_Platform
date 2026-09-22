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

    // Create a new blog
    public Blog createBlog(Blog blog) {
        return blogRepository.save(blog);
    }

    // Get all blogs
    public List<Blog> getAllBlogs() {
        return blogRepository.findAll();
    }


// Get blogs created by an author
public List<Blog> getBlogsByAuthor(String author) {
    return blogRepository.findByAuthor(author);
}


    // Get one blog by ID
    public Optional<Blog> getBlogById(Long id) {
        return blogRepository.findById(id);
    }

    // Update a blog
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
    

        return blogRepository.save(blog);
    }

    // Delete a blog
    public void deleteBlog(Long id) {

        if (!blogRepository.existsById(id)) {
            throw new RuntimeException("Blog not found");
        }

        blogRepository.deleteById(id);
    }


}