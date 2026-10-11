
package com.blogsphere.controller;

import com.blogsphere.service.FollowService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/follows")
@CrossOrigin(origins = "*")
public class FollowController {

    private final FollowService followService;

    public FollowController(FollowService followService) {
        this.followService = followService;
    }

    @PostMapping("/{followerId}/{followingId}")
    public ResponseEntity<?> followUser(
            @PathVariable Long followerId,
            @PathVariable Long followingId) {

        try {
            followService.followUser(followerId, followingId);

            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(Map.of("message", "User followed successfully"));

        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest()
                    .body(Map.of("error", e.getMessage()));
        }
    }

    @DeleteMapping("/{followerId}/{followingId}")
    public ResponseEntity<?> unfollowUser(
            @PathVariable Long followerId,
            @PathVariable Long followingId) {

        try {
            followService.unfollowUser(followerId, followingId);

            return ResponseEntity.ok()
                    .body(Map.of("message", "User unfollowed successfully"));

        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest()
                    .body(Map.of("error", e.getMessage()));
        }
    }

    @GetMapping("/{userId}/counts")
    public ResponseEntity<?> getFollowCounts(@PathVariable Long userId) {

        try {
            long followers = followService.getFollowerCount(userId);
            long following = followService.getFollowingCount(userId);

            return ResponseEntity.ok(Map.of(
                    "followers", followers,
                    "following", following
            ));

        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest()
                    .body(Map.of("error", e.getMessage()));
        }
    }

    
@GetMapping("/{userId}/status/{targetUserId}")
public ResponseEntity<?> getFollowStatus(
        @PathVariable Long userId,
        @PathVariable Long targetUserId) {

    try {
        boolean following =
                followService.isFollowing(userId, targetUserId);

        return ResponseEntity.ok(Map.of(
                "isFollowing", following
        ));

    } catch (IllegalArgumentException e) {
        return ResponseEntity.badRequest()
                .body(Map.of("error", e.getMessage()));
    }
}

@GetMapping("/{userId}/followers")
public ResponseEntity<?> getFollowers(@PathVariable Long userId) {
    try {
        return ResponseEntity.ok(followService.getFollowers(userId));
    } catch (IllegalArgumentException e) {
        return ResponseEntity.badRequest()
                .body(Map.of("error", e.getMessage()));
    }
}

@GetMapping("/{userId}/following")
public ResponseEntity<?> getFollowing(@PathVariable Long userId) {
    try {
        return ResponseEntity.ok(followService.getFollowing(userId));
    } catch (IllegalArgumentException e) {
        return ResponseEntity.badRequest()
                .body(Map.of("error", e.getMessage()));
    }
}

}
