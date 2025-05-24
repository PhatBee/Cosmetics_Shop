package com.cosmeticsellingwebsite.service.image;

import com.cloudinary.Cloudinary;
import com.cosmeticsellingwebsite.exception.CustomException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.*;

@Service
public class ImageService {
    // Đường dẫn thư mục lưu ảnh, bạn có thể cấu hình đường dẫn này trong file application.properties
    @Value("${image.upload-dir}")
    private String uploadDir;
    @Autowired
    Cloudinary cloudinary;

    public String uploadCloudinary(MultipartFile file) {
        try {
            var uploadResult = cloudinary.uploader().upload(file.getBytes(), Map.of());
            return uploadResult.get("url") != null ? (String)uploadResult.get("url") : null;
        } catch (IOException e) {
            throw new RuntimeException("Failed to upload image to Cloudinary", e);
        }
    }
    private static final List<String> ALLOWED_IMAGE_TYPES = Arrays.asList("image/jpeg", "image/png", "image/gif");
    private static final List<String> ALLOWED_EXTENSIONS = Arrays.asList("jpg", "jpeg", "png", "gif");

    public String saveImage(MultipartFile imageFile) throws IOException {
        if (imageFile.isEmpty()) {
            throw new CustomException("Uploaded file is empty.");
        }
        String contentType = imageFile.getContentType();
        if (contentType == null || !ALLOWED_IMAGE_TYPES.contains(contentType.toLowerCase())) {
            throw new CustomException("Invalid file type. Only JPEG, PNG, GIF are allowed. Found: " + contentType);
        }
        String originalFilename = imageFile.getOriginalFilename();
        String extension = getFileExtension(originalFilename);
        if (extension == null || !ALLOWED_EXTENSIONS.contains(extension.toLowerCase())) {
            throw new CustomException("Invalid file extension. Only JPG, JPEG, PNG, GIF are allowed.");
        }

        // Kiểm tra thư mục đã tồn tại chưa, nếu chưa thì tạo mới
        File directory = new File(uploadDir);
        if (!directory.exists()) {
            directory.mkdirs();
        }

        // Tạo tên file duy nhất để tránh trùng lặp
        String fileExtension = getFileExtension(Objects.requireNonNull(imageFile.getOriginalFilename()));
        String uniqueFileName = UUID.randomUUID().toString() + "." + fileExtension;

        // Lưu file vào thư mục
        Path path = Paths.get(uploadDir + File.separator + uniqueFileName);
        Files.write(path, imageFile.getBytes());

        // Trả về đường dẫn tới file vừa lưu (có thể là URL hoặc tên file)
        return uniqueFileName;  // Hoặc URL, tùy vào cách bạn cấu hình truy cập ảnh
    }

    // Hàm lấy đuôi file (ví dụ: jpg, png, ...)
    private String getFileExtension(String filename) {
        String extension = "";
        int i = filename.lastIndexOf('.');
        if (i > 0) {
            extension = filename.substring(i + 1);
        }
        return extension;
    }
}
