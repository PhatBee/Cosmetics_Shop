package com.cosmeticsellingwebsite.service.impl;

import com.cosmeticsellingwebsite.dto.AddressForOrderDTO;
import com.cosmeticsellingwebsite.dto.UserDTO;
import com.cosmeticsellingwebsite.entity.Address;
import com.cosmeticsellingwebsite.entity.Role;
import com.cosmeticsellingwebsite.entity.User;
import com.cosmeticsellingwebsite.enums.RoleEnum;
import com.cosmeticsellingwebsite.repository.AddressRepository;
import com.cosmeticsellingwebsite.repository.PersonalInformationRepository;
import com.cosmeticsellingwebsite.repository.RoleRepository;
import com.cosmeticsellingwebsite.service.interfaces.IPersonalInformationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class PersonalInformationService implements IPersonalInformationService {
    @Autowired
    private PersonalInformationRepository repository;

    @Autowired
    private AddressRepository addressRepository;
    @Autowired
    private RoleRepository roleRepository;
    @Override
    public UserDTO fetchPersonalInfo(Long userID) {
        Optional<User> userEntityOpt = repository.findById(userID);
        if (userEntityOpt.isPresent()) {
            User userEntity = userEntityOpt.get();

            // Chuyển đổi địa chỉ sang DTO
            List<AddressForOrderDTO> addressDTOs = userEntity.getAddresses().stream()
                    .map(address -> new AddressForOrderDTO(
                            address.getAddressId(),
                            address.getReceiverName(),
                            address.getReceiverPhone(),
                            address.getAddress(),
                            address.getProvince(),
                            address.getDistrict(),
                            address.getWard()))
                    .collect(Collectors.toList());

            UserDTO userDTO = new UserDTO();
            userDTO.setUserId(userEntity.getUserId());
            userDTO.setName(userEntity.getFullname());
            userDTO.setEmail(userEntity.getEmail());
            userDTO.setPassword(userEntity.getPassword());
            userDTO.setGender(userEntity.getGender());
            userDTO.setPhone(userEntity.getPhone());
            userDTO.setRole(userEntity.getRole());
            userDTO.setAddresses(addressDTOs); // Gán danh sách địa chỉ
            return userDTO;
        }
        return null;
    }

    // Lưu thông tin cá nhân vào cơ sở dữ liệu
    @Override
    public boolean savePersonalInfo(UserDTO userDTO, Long userID) {
        try {
            if (userID == null) {
                return false; // Không thể lưu nếu userID không tồn tại
            }

            Optional<User> existingUserOpt = repository.findById(userID);
            if (!existingUserOpt.isPresent()) {
                return false; // Không thể lưu nếu user không tồn tại
            }

            User existingUser = existingUserOpt.get();

            // Cập nhật thông tin user
            existingUser.setFullname(userDTO.getName());
            existingUser.setEmail(userDTO.getEmail());
            existingUser.setPhone(userDTO.getPhone());
            existingUser.setPassword(userDTO.getPassword() != null && !userDTO.getPassword().isEmpty()
                    ? userDTO.getPassword()
                    : existingUser.getPassword());
            existingUser.setGender(userDTO.getGender());
            Role role = roleRepository.findByRoleName(RoleEnum.CUSTOMER).orElseGet(() -> {
                Role newRole = new Role();
                newRole.setRoleName(RoleEnum.CUSTOMER);
                return roleRepository.save(newRole);
            });
            existingUser.setRole(userDTO.getRole() != null ? userDTO.getRole() : role);



            // Xử lý thông tin địa chỉ
            AddressForOrderDTO addressDTO = userDTO.getAddress();
            if (addressDTO != null) {
                Address addressEntity = addressDTO.getAddressId() != null
                        ? addressRepository.findById(addressDTO.getAddressId()).orElse(new Address())
                        : new Address();

                addressEntity.setReceiverName(addressDTO.getReceiverName());
                addressEntity.setReceiverPhone(addressDTO.getReceiverPhone());
                addressEntity.setAddress(addressDTO.getAddress());
                addressEntity.setProvince(addressDTO.getProvince());
                addressEntity.setDistrict(addressDTO.getDistrict());
                addressEntity.setWard(addressDTO.getWard());
                addressEntity.setUser(existingUser); // Liên kết với User hiện tại

                addressRepository.save(addressEntity); // Lưu địa chỉ mới hoặc cập nhật
            }

            repository.save(existingUser); // Lưu hoặc cập nhật user
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    @Override
    public Optional<User> findUserById(Long userID) {
        return repository.findById(userID);
    }
}
