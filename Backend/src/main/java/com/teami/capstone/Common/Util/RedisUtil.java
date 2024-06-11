//package com.teami.capstone.Common.Util;
//
//import lombok.RequiredArgsConstructor;
//import org.springframework.data.redis.core.RedisTemplate;
//import org.springframework.data.redis.core.StringRedisTemplate;
//import org.springframework.data.redis.core.ValueOperations;
//import org.springframework.stereotype.Service;
//
//import java.time.Duration;
//
//@Service
//@RequiredArgsConstructor
//public class RedisUtil {
//	private final RedisTemplate<String, Object> redisTemplate;
//	private final StringRedisTemplate stringRedisTemplate;//Redis에 접근하기 위한 Spring의 Redis 템플릿 클래스
//
//	public String getData(String key) {
//		ValueOperations<String, String> valueOperations = stringRedisTemplate.opsForValue();
//		return valueOperations.get(key);
//	}
//
//	public void setData(String key, String value) {
//		ValueOperations<String, String> valueOperations = stringRedisTemplate.opsForValue();
//		valueOperations.set(key, value);
//	}
//
//	public void setDataExpire(String key, String value, long duration) {
//		ValueOperations<String, String> valueOperations = stringRedisTemplate.opsForValue();
//		Duration expireDuration = Duration.ofSeconds(duration);
//		valueOperations.set(key, value, expireDuration);
//	}
//}
