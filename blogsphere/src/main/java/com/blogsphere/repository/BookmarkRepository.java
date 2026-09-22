package com.blogsphere.repository;

import com.blogsphere.entity.Bookmark;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface BookmarkRepository
        extends JpaRepository<Bookmark, Long> {

    List<Bookmark> findByAuthor(String author);

    Optional<Bookmark> findByBlogIdAndAuthor(
            Long blogId,
            String author
    );
}