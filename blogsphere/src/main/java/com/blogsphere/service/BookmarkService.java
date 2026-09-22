package com.blogsphere.service;

import com.blogsphere.entity.Bookmark;
import com.blogsphere.repository.BookmarkRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
 
@Service
public class BookmarkService {

    private final BookmarkRepository bookmarkRepository;

    public BookmarkService(BookmarkRepository bookmarkRepository) {
        this.bookmarkRepository = bookmarkRepository;
    }

    // Add bookmark
    public Bookmark addBookmark(Bookmark bookmark) {

        Optional<Bookmark> existingBookmark =
                bookmarkRepository.findByBlogIdAndAuthor(
                        bookmark.getBlogId(),
                        bookmark.getAuthor()
                );

        // Prevent duplicate bookmark
        if (existingBookmark.isPresent()) {
            return existingBookmark.get();
        }

        return bookmarkRepository.save(bookmark);
    }

    // Get all bookmarks of a user
    public List<Bookmark> getBookmarksByAuthor(String author) {

        return bookmarkRepository.findByAuthor(author);
    }

    // Check whether user bookmarked a blog
    public boolean hasBookmarked(
            Long blogId,
            String author) {

        return bookmarkRepository
                .findByBlogIdAndAuthor(blogId, author)
                .isPresent();
    }

    // Remove bookmark
    public void removeBookmark(
            Long blogId,
            String author) {

        Optional<Bookmark> existingBookmark =
                bookmarkRepository.findByBlogIdAndAuthor(
                        blogId,
                        author
                );

        if (existingBookmark.isPresent()) {

            bookmarkRepository.delete(
                    existingBookmark.get()
            );

        } else {

            throw new RuntimeException(
                    "Bookmark not found"
            );
        }
    }
}