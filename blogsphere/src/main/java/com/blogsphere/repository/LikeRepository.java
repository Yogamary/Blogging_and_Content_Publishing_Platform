package com.blogsphere.repository;

import com.blogsphere.entity.Like;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface LikeRepository extends JpaRepository<Like, Long> {

    List<Like> findByBlogId(Long blogId);

    Optional<Like> findByBlogIdAndAuthor(Long blogId, String author);

}