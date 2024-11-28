package com.cosmeticsellingwebsite.security.oauth;

import com.cosmeticsellingwebsite.entity.Customer;
import com.cosmeticsellingwebsite.entity.Role;
import com.cosmeticsellingwebsite.entity.User;
import com.cosmeticsellingwebsite.enums.RoleEnum;
import com.cosmeticsellingwebsite.repository.RoleRepository;
import com.cosmeticsellingwebsite.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class CustomOAuth2UserService extends DefaultOAuth2UserService{

	@Autowired
	private UserRepository userRepository;
	@Autowired
	RoleRepository roleRepository;
	@Override
	public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
//		OAuth2User oauth2User = super.loadUser(userRequest);
		OAuth2User oauth2User = new DefaultOAuth2UserService().loadUser(userRequest);
//		return new CustomOAuth2User(oauth2User);
		// Lấy thông tin email từ Google
		String email = oauth2User.getAttribute("email");

		// Tìm người dùng trong database
		User user = userRepository.findByEmail(email)
				.orElseGet(() -> {
					// Nếu chưa tồn tại, tạo mới và lưu vào database
					Customer newUser = new Customer();
					newUser.setEmail(email);
					newUser.setFullname(oauth2User.getAttribute("name"));
					Role role = roleRepository.findByRoleName(RoleEnum.CUSTOMER).orElseGet(() -> {
						Role newRole = new Role();
						newRole.setRoleName(RoleEnum.CUSTOMER);
						return roleRepository.save(newRole);
					});
					newUser.setRole(role);
					return userRepository.save(newUser);
				});

		// Trả về CustomOAuth2User với userId từ database
		return new CustomOAuth2User(oauth2User, user.getUserId());
	}
	
}