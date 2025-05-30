package com.cosmeticsellingwebsite.service.captcha;

import com.google.common.cache.CacheBuilder;
import com.google.common.cache.CacheLoader;
import com.google.common.cache.LoadingCache;
import org.springframework.stereotype.Service;

import java.util.concurrent.TimeUnit;

@Service
public class ReCaptchaAttemptService {
    private final int MAX_ATTEMPT = 4;
    private final LoadingCache<String, Integer> attemptsCache;

    public ReCaptchaAttemptService() {
        this.attemptsCache = CacheBuilder.newBuilder()
                .expireAfterWrite(4, TimeUnit.HOURS)
                .build(new CacheLoader<>() {
                    public Integer load(String key) {
                        return 0;
                    }
                });
    }

    public void reCaptchaSucceeded(String key) {
        attemptsCache.invalidate(key);
    }

    public void reCaptchaFailed(String key) {
        int attempts = attemptsCache.getUnchecked(key);
        attemptsCache.put(key, ++attempts);
    }

    public boolean isBlocked(String key) {
        return attemptsCache.getUnchecked(key) >= MAX_ATTEMPT;
    }
}
