package com.activateNow.backend.service;

import com.activateNow.backend.dto.UserRequest;
import com.activateNow.backend.entity.User;
import com.activateNow.backend.repository.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User createUser(UserRequest request) {

        User user = new User();

        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPan(request.getPan());
        user.setPhone(request.getPhone());

        return userRepository.save(user);
    }

    public User getFirstUser() {
        return userRepository.findById(1L).orElse(null);
    }
}