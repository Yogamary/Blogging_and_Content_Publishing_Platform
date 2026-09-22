package com.blogsphere.controller;

import com.blogsphere.entity.Like;
import com.blogsphere.service.LikeService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/likes")
@CrossOrigin(origins = "*")
public class LikeController {

    private final LikeService likeService;

    public LikeController(LikeService likeService) {
        this.likeService = likeService;
    }

    // Add a like
    @PostMapping
    public Like addLike(@RequestBody Like like) {

        return likeService.addLike(like);
    }

    // Get all likes for a blog
    @GetMapping("/blog/{blogId}")
    public List<Like> getLikesByBlogId(
            @PathVariable Long blogId) {

        return likeService.getLikesByBlogId(blogId);
    }

    // Get like count
    @GetMapping("/blog/{blogId}/count")
    public long getLikeCount(
            @PathVariable Long blogId) {

        return likeService.getLikeCount(blogId);
    }

    // Check whether a user has liked a blog
    @GetMapping("/blog/{blogId}/user/{author}")
    public boolean hasLiked(
            @PathVariable Long blogId,
            @PathVariable String author) {

        return likeService.hasLiked(blogId, author);
    }

    // Remove a like
    @DeleteMapping("/blog/{blogId}/user/{author}")
    public String removeLike(
            @PathVariable Long blogId,
            @PathVariable String author) {

        likeService.removeLike(blogId, author);

        return "Like removed successfully";
    }
}