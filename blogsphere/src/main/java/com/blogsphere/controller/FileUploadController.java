package com.blogsphere.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

@RestController
@RequestMapping("/api/upload")
@CrossOrigin(origins = "*")
public class FileUploadController {

    private final String uploadDir = "uploads/";

    @PostMapping
    public String uploadImage(@RequestParam("file") MultipartFile file)
            throws IOException {

        if (file.isEmpty()) {
            throw new RuntimeException("Please select an image");
        }

        Path uploadPath = Paths.get(uploadDir);

        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }

        String originalFileName = file.getOriginalFilename();

        String extension = "";

        if (originalFileName != null &&
            originalFileName.contains(".")) {

            extension =
                    originalFileName.substring(
                            originalFileName.lastIndexOf(".")
                    );
        }

        String fileName =
                UUID.randomUUID().toString() + extension;

        Path filePath =
                uploadPath.resolve(fileName);

        Files.copy(
                file.getInputStream(),
                filePath
        );

        return "https://blogsphere-backend-9raa.onrender.com/uploads/" + fileName;
    }
}