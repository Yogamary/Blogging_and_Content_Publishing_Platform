
package com.blogsphere.service;

import com.blogsphere.entity.Follow;
import com.blogsphere.entity.User;
import com.blogsphere.repository.FollowRepository;
import com.blogsphere.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class FollowService {

    private final FollowRepository followRepository;
    private final UserRepository userRepository;

    public FollowService(
            FollowRepository followRepository,
            UserRepository userRepository) {
        this.followRepository = followRepository;
        this.userRepository = userRepository;
    }

    @Transactional
    public void followUser(Long followerId, Long followingId) {

        if (followerId == null || followingId == null) {
            throw new IllegalArgumentException("User IDs are required");
        }

        if (followerId.equals(followingId)) {
            throw new IllegalArgumentException("You cannot follow yourself");
        }

        User follower = userRepository.findById(followerId)
                .orElseThrow(() -> new IllegalArgumentException(
                        "Follower user not found"));

        User following = userRepository.findById(followingId)
                .orElseThrow(() -> new IllegalArgumentException(
                        "User to follow not found"));

        if (followRepository.findByFollowerAndFollowing(follower, following)
                .isPresent()) {
            throw new IllegalArgumentException("You already follow this user");
        }

        Follow follow = new Follow();
        follow.setFollower(follower);
        follow.setFollowing(following);

        followRepository.save(follow);
    }

    @Transactional
    public void unfollowUser(Long followerId, Long followingId) {

        User follower = userRepository.findById(followerId)
                .orElseThrow(() -> new IllegalArgumentException(
                        "Follower user not found"));

        User following = userRepository.findById(followingId)
                .orElseThrow(() -> new IllegalArgumentException(
                        "User to unfollow not found"));

        Follow follow = followRepository
                .findByFollowerAndFollowing(follower, following)
                .orElseThrow(() -> new IllegalArgumentException(
                        "You do not follow this user"));

        followRepository.delete(follow);
    }

    public long getFollowerCount(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException(
                        "User not found"));

        return followRepository.countByFollowing(user);
    }

    public long getFollowingCount(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException(
                        "User not found"));

        return followRepository.countByFollower(user);
    }
    
public boolean isFollowing(Long followerId, Long followingId) {

    User follower = userRepository.findById(followerId)
            .orElseThrow(() -> new IllegalArgumentException(
                    "Follower user not found"));

    User following = userRepository.findById(followingId)
            .orElseThrow(() -> new IllegalArgumentException(
                    "User to check not found"));

    return followRepository
            .findByFollowerAndFollowing(follower, following)
            .isPresent();
}


public List<Map<String, Object>> getFollowers(Long userId) {
    User user = userRepository.findById(userId)
            .orElseThrow(() -> new IllegalArgumentException("User not found"));

    return followRepository.findByFollowing(user)
            .stream()
            .map(follow -> {
                User follower = follow.getFollower();

                return Map.<String, Object>of(
                        "id", follower.getId(),
                        "name", follower.getName(),
                        "role", follower.getRole()
                );
            })
            .collect(Collectors.toList());
}

public List<Map<String, Object>> getFollowing(Long userId) {
    User user = userRepository.findById(userId)
            .orElseThrow(() -> new IllegalArgumentException("User not found"));

    return followRepository.findByFollower(user)
            .stream()
            .map(follow -> {
                User following = follow.getFollowing();

                return Map.<String, Object>of(
                        "id", following.getId(),
                        "name", following.getName(),
                        "role", following.getRole()
                );
            })
            .collect(Collectors.toList());
}

}
