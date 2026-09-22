package com.blogsphere.service;

import com.blogsphere.dto.LoginRequest;
import com.blogsphere.dto.LoginResponse;
import com.blogsphere.entity.User;
import com.blogsphere.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository,
                       PasswordEncoder passwordEncoder) {

        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }
  
    public User registerUser(User user) {

        Optional<User> existingUser =
            userRepository.findByEmail(user.getEmail());

        if (existingUser.isPresent()) {
              throw new RuntimeException("Email already registered");
        }

        user.setPassword(
            passwordEncoder.encode(user.getPassword())
        );

       return userRepository.save(user);
   }  

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public Optional<User> getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }
    public LoginResponse loginUser(LoginRequest request) {

    Optional<User> userOptional =
            userRepository.findByEmail(request.getEmail());

    if (userOptional.isEmpty()) {
        throw new RuntimeException("Invalid email or password");
    }

    User user = userOptional.get();

    if (!passwordEncoder.matches(
            request.getPassword(),
            user.getPassword())) {

        throw new RuntimeException("Invalid email or password");
    }

    return new LoginResponse(
            user.getId(),
            user.getName(),
            user.getEmail(),
            user.getRole()
    );
   }
   public void deleteUser(Long id) {

    if (!userRepository.existsById(id)) {
        throw new RuntimeException("User not found");
    }

    userRepository.deleteById(id);
}
}