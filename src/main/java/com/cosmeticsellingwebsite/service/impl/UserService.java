package com.cosmeticsellingwebsite.service.impl;

import com.cosmeticsellingwebsite.entity.*;
import com.cosmeticsellingwebsite.payload.request.AddAddressRequest;
import com.cosmeticsellingwebsite.payload.request.RegisterRequest;
import com.cosmeticsellingwebsite.payload.request.UserRequest;
import com.cosmeticsellingwebsite.payload.response.UserResponse;
import com.cosmeticsellingwebsite.repository.*;
import com.cosmeticsellingwebsite.security.UserPrincipal;
import com.cosmeticsellingwebsite.service.interfaces.IUserService;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService implements IUserService, UserDetailsService {
    @Autowired
    RoleRepository roleRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private AddressRepository addressRepository;

    //    add address
    @Override
    public void addAddress(AddAddressRequest addAddressRequest) {
        Optional<User> userOptional = userRepository.findById(addAddressRequest.getUserId());
        if (userOptional.isEmpty()) {
            throw new RuntimeException("User not found");
        }

        Address address = new Address();
        BeanUtils.copyProperties(addAddressRequest, address);
        address.setUser(userOptional.get());

        addressRepository.save(address);
    }

    @Override
    public List<Address> getAddresses(Long userId) {
        if (!userRepository.existsById(userId)) {
            throw new RuntimeException("User not found");
        }
        return addressRepository.findAllByUser_UserId(userId);
    }

    @Override
    public List<User> list() {
        return userRepository.findAll();
    }

    @Override
    public User findById(Long id) {
        Optional<User> userOptional = userRepository.findById(id);
        if (userOptional.isEmpty()) {
            throw new RuntimeException("User not found");
        }
        return userOptional.get();
    }

    @Override
    public void delete(Long id) {
        Optional<User> userOptional = userRepository.findById(id);
        if (userOptional.isEmpty()) {
            throw new RuntimeException("User not found");
        }
        userRepository.deleteById(id);
    }

    @Override
    public UserResponse update(UserRequest userRequest) {
        Optional<User> userOptional = userRepository.findById(userRequest.getUserId());
        if (userOptional.isEmpty()) {
            throw new RuntimeException("User not found");
        }
        User user = userOptional.get();
        UserResponse userResponse = new UserResponse();
        BeanUtils.copyProperties(user, userResponse);
        return userResponse;
    }

    @Override
    public void registerUser(RegisterRequest user) {
//        check unique username
        if (userRepository.existsByUsername(user.getUsername())) {
            throw new RuntimeException("Username already exists");
        }
        Role roleEntity = roleRepository.findByRoleName(user.getRole());
        User userEntity = new User();
        userEntity.setUsername(user.getUsername());
        userEntity.setPassword(passwordEncoder.encode(user.getPassword()));
        userEntity.setRole(roleEntity);
        userRepository.save(userEntity);
    }


    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<User> user = userRepository.findByUsername(username);
        return user.map(UserPrincipal::new)
                .orElseThrow(() -> new UsernameNotFoundException("UserName not found: " + username));
    }
}
