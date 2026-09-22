package com.blogsphere.controller;

import com.blogsphere.entity.User;
import com.blogsphere.service.UserService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.blogsphere.dto.LoginRequest;
import com.blogsphere.dto.LoginResponse; 
import java.util.List;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "*")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
public ResponseEntity<?> registerUser(@RequestBody User user) {

    try {

        return ResponseEntity.ok(
            userService.registerUser(user)
        );

    } catch (RuntimeException e) {

        return ResponseEntity
                .badRequest()
                .body(e.getMessage());
    }
}

    @GetMapping
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    @PostMapping("/login")
public ResponseEntity<?> loginUser(
        @RequestBody LoginRequest request) {

    try {

        return ResponseEntity.ok(
            userService.loginUser(request)
        );

    } catch (RuntimeException e) {

        return ResponseEntity
                .status(401)
                .body(e.getMessage());
    }
}
    @DeleteMapping("/{id}")
public String deleteUser(@PathVariable Long id) {

    userService.deleteUser(id);

    return "User deleted successfully";
}
}