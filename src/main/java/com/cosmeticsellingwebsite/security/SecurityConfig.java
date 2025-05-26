package com.cosmeticsellingwebsite.security;


//import com.cosmeticsellingwebsite.filter.JwtFilter;

import com.cosmeticsellingwebsite.enums.RoleEnum;
import com.cosmeticsellingwebsite.security.oauth.CustomAuthenticationFailureHandler;
import com.cosmeticsellingwebsite.security.oauth.CustomOAuth2UserService;
import com.cosmeticsellingwebsite.security.oauth.OAuth2LoginSuccessHandler;
import com.cosmeticsellingwebsite.service.impl.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.servlet.server.CookieSameSiteSupplier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;
import org.springframework.security.web.header.writers.ReferrerPolicyHeaderWriter;
import org.springframework.security.web.header.writers.StaticHeadersWriter;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.session.web.http.CookieSerializer;
import org.springframework.session.web.http.DefaultCookieSerializer;

import java.util.Arrays;

@Configuration
@EnableWebSecurity
@CrossOrigin
public class SecurityConfig {
    //    @Autowired
//    @Lazy


    private final OAuth2LoginSuccessHandler oauth2LoginSuccessHandler;
    @Autowired
    CustomAuthenticationSuccessHandler customAuthenticationSuccessHandler;
    @Autowired
    private CustomOAuth2UserService customOAuth2UserService;

    public SecurityConfig(@Lazy OAuth2LoginSuccessHandler oauth2LoginSuccessHandler) {
        this.oauth2LoginSuccessHandler = oauth2LoginSuccessHandler;
    }

    @Bean
    public OAuth2LoginSuccessHandler oauth2LoginSuccessHandler(PasswordEncoder passwordEncoder) {
        return new OAuth2LoginSuccessHandler(passwordEncoder);
    }

    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public UserDetailsService userDetailsService() {
        return new UserService();
    }

    @Bean
    public CookieSameSiteSupplier cookieSameSiteSupplier() {
        return CookieSameSiteSupplier.ofStrict(); // Thay đổi từ Lax sang Strict
    }

    @Bean
    public CookieSerializer cookieSerializer() {
        DefaultCookieSerializer serializer = new DefaultCookieSerializer();
        serializer.setUseHttpOnlyCookie(true);           // ⚠️ Bắt buộc để sửa lỗi ZAP
        serializer.setUseSecureCookie(true);             // ⚠️ Bắt buộc nếu dùng HTTPS
        serializer.setSameSite("Strict");                // 🔒 Tăng bảo mật CSRF
        return serializer;
    }

    @Bean
    public CookieCsrfTokenRepository cookieCsrfTokenRepository() {
        CookieCsrfTokenRepository repo = new CookieCsrfTokenRepository();
        repo.setCookieHttpOnly(true);     // ✅ fix ZAP
        repo.setCookiePath("/");
        repo.setCookieName("XSRF-TOKEN");
        return repo;
    }



    @Bean
        public CorsConfigurationSource corsConfigurationSource() {
            CorsConfiguration configuration = new CorsConfiguration();
            configuration.setAllowedOrigins(Arrays.asList("http://127.0.0.1:5500"));
            configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
            configuration.setAllowedHeaders(Arrays.asList("*"));
            configuration.setAllowCredentials(true);
            UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
            source.registerCorsConfiguration("/api/**", configuration);
            return source;
        }



    // Configures the security filter chain
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {
        return httpSecurity
                .sessionManagement(session -> session
                        .maximumSessions(1) // Chỉ cho phép 1 phiên đăng nhập cùng lúc
                        .maxSessionsPreventsLogin(false) // Không cấm đăng nhập nếu đạt giới hạn
                )
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))
//                .csrf(csrf -> csrf.disable()) // Disable CSRF protection

                .csrf(csrf -> csrf
                        .csrfTokenRepository(cookieCsrfTokenRepository())  // dùng bean custom

                        .ignoringRequestMatchers(
                                "/api/**",
                                "/oauth2/**",
                                "/auth/register"
                        )
                )

                // Sau đó sử dụng trong securityFilterChain (Spring Security 6.1+):
                // Cấu hình Security Headers cải tiến
                // Cấu hình Security Headers cải tiến (Spring Security 6.1+)
                .headers(headers -> headers
                        // Frame Options
                        .frameOptions(frameOptions -> frameOptions.deny())
                        // Content Type Options
                        .contentTypeOptions(Customizer.withDefaults())
                        // HSTS
                        .httpStrictTransportSecurity(hstsConfig -> hstsConfig
                                .maxAgeInSeconds(31536000)
                                .includeSubDomains(true)
                        )
                        // Referrer Policy (Spring Security 6.1+ syntax)
                        .referrerPolicy(referrerPolicy -> referrerPolicy
                                .policy(ReferrerPolicyHeaderWriter.ReferrerPolicy.STRICT_ORIGIN_WHEN_CROSS_ORIGIN)
                        )
                        // CSP cải tiến (Spring Security 6.1+ syntax)
                        .contentSecurityPolicy(cspConfig -> cspConfig
                                .policyDirectives(buildImprovedContentSecurityPolicy())
                        )
                        // Custom headers cho Permissions Policy
                        .addHeaderWriter(new StaticHeadersWriter("Permissions-Policy",
                                "camera=(), microphone=(), geolocation=(self)"))
                )
//
                .authorizeHttpRequests(auth -> auth
//                        STATIC_RESOURCES
                        .requestMatchers("/assets/**", "/showMsg.js", "/notification.js", "/error", "/error/**", " /login").permitAll()
//                        PUBLIC
                        .requestMatchers("/api/images/**", "/auth/**", "/oauth2/**", "/user/**", "/browser/**","/about", "/").permitAll()
//                        .requestMatchers("/shipper/**").hasRole("SHIPPER")
//                        .requestMatchers("/admin/**").hasRole("ADMIN")
//                        .requestMatchers("/manager/**").hasRole("MANAGER")
                        //home page public
                        .requestMatchers("/topSellingProducts","/topNewestProducts","/topHighestRatingProducts").permitAll()
                        .requestMatchers("/api/revenue/**").hasAnyRole("ADMIN", "MANAGER")
                        .requestMatchers("/customer/**").hasRole("CUSTOMER")
                        .requestMatchers(
                                "/admin/products/**",
                                "/admin/report/**",
                                "/admin/orders/**",
                                "/admin/revenue/**",
                                "/admin/categories/**",
                                "/admin/vouchers/**",
                                "/admin/stock/**",
                                "/admin/feedbacks/**",
                                "/admin/customers/**"

                        ).hasAnyRole("ADMIN", "MANAGER")
                        .requestMatchers("/admin/user/**").hasRole("ADMIN")
                        .anyRequest().authenticated()) // Require authentication for all other requests
                .formLogin(f -> f.loginPage("/auth/login").permitAll()
                        .loginProcessingUrl("/login")
                        .successHandler(customAuthenticationSuccessHandler)
//                        .failureUrl("/auth/login-failure")
                                .failureHandler(new CustomAuthenticationFailureHandler())
                )
                .logout(logout -> logout
                        .logoutUrl("/logout") // URL để gọi logout
                        .logoutSuccessUrl("/auth/login?logout") // Chuyển hướng sau khi logout thành công
                        .invalidateHttpSession(true) // Hủy session
                        .deleteCookies("JSESSIONID", "remember-me") // Xóa cookie session và remember-me
                        .permitAll() // Cho phép tất cả truy cập endpoint logout
                )
                .rememberMe(remember -> remember
                        .key("yourSecretRememberMeKey") // Replace with a strong, unique key
                        .userDetailsService(userDetailsService()) // Cần thiết để lấy thông tin người dùng
                        .tokenValiditySeconds(7*24*60*60) // 7 days
                        .useSecureCookie(true) // Chỉ gửi cookie qua HTTPS
                         )
                //nhớ tích chọn rememberMe lúc đăng nhập và hãy thử tắt trình duyệt đi rồi mở lại để xem kết quả nhé

                .authenticationProvider(authenticationProvider()) // Register the authentication provider
                .oauth2Login(oauth2 -> oauth2
                        .loginPage("/auth/login") // Custom login page
                        .userInfoEndpoint(userInfo -> userInfo
                                .userService(customOAuth2UserService) // Custom OAuth2 user service
                        )
                        .successHandler(oauth2LoginSuccessHandler) // Handle success
                )

                .build();
    }


    // Creates a DaoAuthenticationProvider to handle user authentication
    @Bean
    public AuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider authenticationProvider = new DaoAuthenticationProvider();
        authenticationProvider.setUserDetailsService(userDetailsService());
        authenticationProvider.setPasswordEncoder(passwordEncoder());
        return authenticationProvider;
    }


    // Defines an AuthenticationManager bean to manage authentication processes
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }

    private String buildImprovedContentSecurityPolicy() {
        return  "default-src 'self' http://127.0.0.1:5500 http://localhost:8081; " +
                // Scripts - cho phép inline và eval cho các trang dynamic
                "script-src 'self' https://www.gstatic.com http://127.0.0.1:5500 http://localhost:8081 https://cdn.jsdelivr.net https://code.jquery.com; " +
                // Styles - bao gồm Google Fonts và FontAwesome
                "style-src 'self' https://use.fontawesome.com http://127.0.0.1:5500 http://localhost:8081 https://cdn.jsdelivr.net https://cdnjs.cloudflare.com https://fonts.googleapis.com; " +
                // Fonts - bao gồm local fonts và Google Fonts
                "font-src 'self' https://fonts.googleapis.com/ https://use.fontawesome.com https://cdnjs.cloudflare.com http://127.0.0.1:5500 http://localhost:8081 https://fonts.gstatic.com data:; " +
                // Images - cho phép tất cả HTTPS và data URLs
                "img-src 'self' https://cdn.iconscout.com/ https://files.softicons.com/ https://cdn.haitrieu.com/ https://static.thcdn.com/ https://cdn.chanhtuoi.com/ https://scontent.fsgn5-9.fna.fbcdn.net http://127.0.0.1:5500 http://localhost:8081 http://localhost:8081/api/images https://via.placeholder.com https://www.facebook.com https://source.unsplash.com data:; " +
                // AJAX connections
                "connect-src 'self' http://127.0.0.1:5500 http://localhost:8081 https://www.google.com https://fonts.googleapis.com https://cdn.jsdelivr.net https://cdnjs.cloudflare.com; " +
                // Media files (video, audio)
                "media-src 'self' http://127.0.0.1:5500 http://localhost:8081 data:; " +
                // Child contexts (frames, workers)
                "child-src 'self'; " +
                // Web Workers
                "worker-src 'self' http://127.0.0.1:5500 http://localhost:8081 blob:; " +
                // Forms - chỉ cho phép submit đến cùng origin
                "form-action 'self'; " +
                // Frames - google
                "frame-src 'self' https://www.google.com/recaptcha/api2/; " +
                // Frame ancestors - THÊM DIRECTIVE NÀY ĐỂ KHẮC PHỤC LỖ HỔNG
                "frame-ancestors 'self'; " +
                // Objects/Plugins - không cho phép
                "object-src 'none'; " +
                // Base URI
                "base-uri 'self'; " +
                // Manifest files
                "manifest-src 'self'; " +
                // Prefetch/DNS
//                "prefetch-src 'self' " +
                // Script-src-elem
                "script-src-elem 'self' https://www.google.com/recaptcha/ https://www.gstatic.com http://127.0.0.1:5500 http://localhost:8081 https://cdn.jsdelivr.net https://code.jquery.com; "
                ;

//
    }


}