package com.activateNow.backend.controller;

import com.activateNow.backend.entity.User;
import com.activateNow.backend.service.UserService;
import org.springframework.web.bind.annotation.*;
import com.activateNow.backend.dto.UserRequest;

@RestController
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/user")
    public User receiveUser(@RequestBody UserRequest request) {

        return userService.createUser(request);
    }

    @GetMapping("/user1")
    public User getFirstUser() {
        return userService.getFirstUser();
    }
}