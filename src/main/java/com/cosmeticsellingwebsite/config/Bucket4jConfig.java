
package com.cosmeticsellingwebsite.config;

import io.github.bucket4j.Bandwidth;
import io.github.bucket4j.Bucket;
import io.github.bucket4j.Refill;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.time.Duration;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Configuration
public class Bucket4jConfig implements WebMvcConfigurer {

    // Cache để lưu trữ các bucket theo địa chỉ IP
    private final Map<String, Bucket> cache = new ConcurrentHashMap<>();
    private final Map<String, Bucket> voucherCache = new ConcurrentHashMap<>();

    // Cấu hình rate limit chung
    private Bucket createNewBucket() {
        Refill refill = Refill.intervally(10, Duration.ofSeconds(10)); // 10 tokens every 10 seconds
        Bandwidth limit = Bandwidth.classic(10, refill);
        return Bucket.builder().addLimit(limit).build();
    }

    // Cấu hình rate limit cho endpoint voucher
    private Bucket createVoucherBucket() {
        Refill refill = Refill.intervally(2, Duration.ofSeconds(5)); // 2 requests every 5 seconds
        Bandwidth limit = Bandwidth.classic(2, refill);
        return Bucket.builder().addLimit(limit).build();
    }

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        // Interceptor cho rate limit chung
//        registry.addInterceptor(new HandlerInterceptor() {
//            @Override
//            public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
//                String ip = getClientIp(request);
//                Bucket bucket = cache.computeIfAbsent(ip, k -> createNewBucket());
//
//                if (bucket.tryConsume(1)) {
//                    return true; // Cho phép request
//                } else {
//                    response.setStatus(HttpStatus.TOO_MANY_REQUESTS.value());
//                    response.getWriter().write("Too many requests for general endpoint");
//                    return false; // Từ chối request
//                }
//            }
//        }).addPathPatterns("/**") // Áp dụng cho tất cả các URL
//          .excludePathPatterns("/customer/voucher/**"); // Loại trừ endpoint voucher

        // Interceptor cho rate limit của endpoint voucher
        registry.addInterceptor(new HandlerInterceptor() {
            @Override
            public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
                String ip = getClientIp(request);
                Bucket bucket = voucherCache.computeIfAbsent(ip, k -> createVoucherBucket());

                if (bucket.tryConsume(1)) {
                    return true; // Cho phép request
                } else {
                    response.setStatus(HttpStatus.TOO_MANY_REQUESTS.value());
                    response.getWriter().write("Too many requests for voucher endpoint");
                    return false; // Từ chối request
                }
            }
        }).addPathPatterns("/customer/voucher/**"); // Chỉ áp dụng cho endpoint voucher
    }

    private String getClientIp(HttpServletRequest request) {
        String xfHeader = request.getHeader("X-Forwarded-For");
        if (xfHeader == null || xfHeader.isEmpty() || !xfHeader.contains(request.getRemoteAddr())) {
            return request.getRemoteAddr();
        }
        return xfHeader.split(",")[0];
    }
}