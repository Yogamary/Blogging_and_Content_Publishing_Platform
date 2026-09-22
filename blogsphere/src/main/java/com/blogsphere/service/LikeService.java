package com.blogsphere.service;

import com.blogsphere.entity.Like;
import com.blogsphere.repository.LikeRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class LikeService {

    private final LikeRepository likeRepository;

    public LikeService(LikeRepository likeRepository) {
        this.likeRepository = likeRepository;
    }

    public Like addLike(Like like) {

        Optional<Like> existingLike =
                likeRepository.findByBlogIdAndAuthor(
                        like.getBlogId(),
                        like.getAuthor()
                );

        if (existingLike.isPresent()) {
            return existingLike.get();
        }

        return likeRepository.save(like);
    }

    public List<Like> getLikesByBlogId(Long blogId) {

        return likeRepository.findByBlogId(blogId);
    }

    public void removeLike(Long blogId, String author) {

        Optional<Like> existingLike =
                likeRepository.findByBlogIdAndAuthor(
                        blogId,
                        author
                );

        if (existingLike.isPresent()) {

            likeRepository.delete(existingLike.get());

        } else {

            throw new RuntimeException("Like not found");
        }
    }

    public long getLikeCount(Long blogId) {

        return likeRepository.findByBlogId(blogId).size();
    }

    public boolean hasLiked(Long blogId, String author) {

        return likeRepository
                .findByBlogIdAndAuthor(blogId, author)
                .isPresent();
    }
}