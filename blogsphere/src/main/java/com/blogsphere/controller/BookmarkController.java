package com.blogsphere.controller;

import com.blogsphere.entity.Bookmark;
import com.blogsphere.service.BookmarkService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bookmarks")
@CrossOrigin(origins = "*")
public class BookmarkController {

    private final BookmarkService bookmarkService;

    public BookmarkController(
            BookmarkService bookmarkService) {

        this.bookmarkService = bookmarkService;
    }

    // Add bookmark
    @PostMapping
    public Bookmark addBookmark(
            @RequestBody Bookmark bookmark) {

        return bookmarkService.addBookmark(bookmark);
    }

    // Get all bookmarks of a user
    @GetMapping("/user/{author}")
    public List<Bookmark> getBookmarksByAuthor(
            @PathVariable String author) {

        return bookmarkService
                .getBookmarksByAuthor(author);
    }

    // Check whether user bookmarked a blog
    @GetMapping("/blog/{blogId}/user/{author}")
    public boolean hasBookmarked(
            @PathVariable Long blogId,
            @PathVariable String author) {

        return bookmarkService
                .hasBookmarked(blogId, author);
    }

    // Remove bookmark
    @DeleteMapping("/blog/{blogId}/user/{author}")
    public String removeBookmark(
            @PathVariable Long blogId,
            @PathVariable String author) {

        bookmarkService.removeBookmark(
                blogId,
                author
        );

        return "Bookmark removed successfully";
    }
}