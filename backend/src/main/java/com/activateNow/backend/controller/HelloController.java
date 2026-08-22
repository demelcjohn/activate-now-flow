package com.activateNow.backend.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import java.time.LocalTime;

@RestController
public class HelloController {

    @GetMapping("/test")
    public String test() {
        return "Test done at " + LocalTime.now().toString();
    }
}